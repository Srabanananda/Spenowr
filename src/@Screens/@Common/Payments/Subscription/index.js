/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState,useRef} from 'react';
import {SafeAreaView,Text,StyleSheet,View, ActivityIndicator,Alert,Platform} from 'react-native';
import { GlobalStyles } from '../../../../@GlobalStyles';
import DefaultHeader from '../../../../@GlobalComponents/DefaultHeader/index';
import { generateCashFreeToken } from '../../../../@Utils/helperFiles/Payment';
import { connect, useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { initiateSubscriptionPayment, verifySubscriptionPaymentWithServer } from '../../../../@Endpoints/Core/Payments/index';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
import PayModal from '../../../../@GlobalComponents/PayModal/index';
import * as userActions from '@Redux/actions/userActions';
import { getUserDetails } from '../../../../@Endpoints/Auth';
import usePlan from '../../../../@Utils/customHooks/usePlans';
import Config from '@Config/default';

// const {PAYMENTS:{APPLE_PAY:{OPTIONS,METHOD_DATA}}} = Config;

const {CASHFREE_APPID,CASHFREE_ENV,COLOR:{APP_PINK_COLOR}} = Config;

const SubscriptionPaymentScreen = ({...props}) =>{
    const {
        route:{params:{payLoad}},
        navigation,
        userDetails} = props;
    const {mobile, email, user_id, first_name, last_name} = userDetails;

    const payModalRef = useRef();
    const dispatch = useDispatch();

    const [loader, setLoader] = useState(true);
    const [willVerify, setWillVerify] = useState(false);
    const [genPayload, setGenPayLoad] = useState(null);
    const [isPaymentCancelled, setIsPaymentCancelled] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isFailed, setIsFailed] = useState(false);

    const currentPlan = usePlan(payLoad);

    useEffect(()=>{
        if(genPayload) getServerPayLoad();
        // else checkApplePay(); @TODO : Check if apple pay is available
    },[genPayload]);

    useEffect(()=>{
        // if(Platform.OS === 'android')
        setGenPayLoad(generatePayLoad());
    },[]);

    // const checkApplePay = () => {
    //     ApplePaymentRequest.canMakePayments()
    //         .then(canMakePayments => {
    //             if(canMakePayments){
    //                 initiateApplePay();
    //             }else{
    //                 Alert.alert('Apple Pay is not available on your device');
    //                 setLoader(false);
    //             }
    //         });
    // };

    // const initiateApplePay = () => {
    //     ApplePaymentRequest.show()
    //         .then(paymentResponse => {
    //             console.log('paymentResponse',paymentResponse);
    //         })
    //         .catch(error => {});
    // };

    // const DETAILS = {
    //     id: 'basic-example',
    //     displayItems: [
    //         {
    //             label: 'Movie Ticket',
    //             amount: { currency: 'USD', value: '15.00' }
    //         },
    //         {
    //             label: 'Grocery',
    //             amount: { currency: 'USD', value: '5.00' }
    //         }
    //     ],
    //     shippingOptions: [{
    //         id: 'economy',
    //         label: 'Economy Shipping',
    //         amount: { currency: 'USD', value: '0.00' },
    //         detail: 'Arrives in 3-5 days' // `detail` is specific to React Native Payments
    //     }],
    //     total: {
    //         label: 'Enappd Store',
    //         amount: { currency: 'USD', value: '20.00' }
    //     }
    // };

    // const ApplePaymentRequest = new PR(METHOD_DATA, DETAILS, OPTIONS);

    const updateProfile = () =>{
        getUserDetails()
            .then(res=>{
                const {data:{institute={},profileData={}}} = res;
                dispatch(userActions.updateUserDetails(institute,profileData));
            })
            .catch();
    };

    const generatePayLoad = () =>{
        if(currentPlan)
        {
            const {currency,key,price} = currentPlan;
            return {
                plan: key,
                orderAmount: price,
                orderCurrency: currency,
                customerEmail: email,
                userId: user_id,
                customerName : first_name+' '+last_name,
                customerPhone : mobile,
                shippingAddress: '',
                application: true,
            };
        }
        else
        {
            Toast.show('Current Plan Could not be found');
            setTimeout(()=>{navigation.goBack();},500);
        }
    };

    const getServerPayLoad = () =>{
        initiateSubscriptionPayment(genPayload)
            .then(res=>{
                const {data:{payment_list}} = res;
                handleCashFree(payment_list);
            })
            .catch(()=>{
                Toast.show('Oops could not initiate payment');
                setTimeout(()=>{navigation.goBack();},300);
            });
    };

    const handleCashFree = async(cashfree_payload) =>{
        generateCashFreeToken(cashfree_payload)
            .then(res=>{
                const {cftoken = ''} =res;
                if(cftoken.length){
                    cashfree_payload.appId = CASHFREE_APPID;
                    cashfree_payload.tokenData = cftoken;
                    startPayment('WEB',cashfree_payload);
                }
                else Toast.show('Oops, Couldnot Initiate Payment Process',Toast.LONG);
            })
            .catch(()=>{
                Toast.show('Oops could not initiate Cashfree');
                setTimeout(()=>{navigation.goBack();},300);
            });
    };

    function startPayment(mode,processObj) {
        setLoader(true);
        if (mode === 'UPI') {
            RNPgReactNativeSDK.startPaymentUPI(processObj, CASHFREE_ENV, responseHandler);
        } else {
            RNPgReactNativeSDK.startPaymentWEB(processObj, CASHFREE_ENV, responseHandler);
        }
    }

    const callServerVerification = (result) =>{
        verifySubscriptionPaymentWithServer(result.orderId)
            .then(res=>{
                const {data:{status}} = res;
                if(status === 'Cancelled')setIsVerified(false);
                else {
                    setIsVerified(true);
                    setTimeout(()=>{
                        navigation.popToTop();
                        navigation.navigate('Profile');
                    },1000);
                }
                updateProfile();
                payModalRef.current.dismissModal();
            })
            .catch(()=>{
                setTimeout(()=>{
                    Toast.show('Oops Verification Failed, Please connect Support');
                },200);
                setTimeout(()=>{
                    navigation.goBack();
                },600);
            })
            .finally(()=>{
                setWillVerify(false);
                setLoader(false);
            });
    };

    // Handle Payment Success | Failure from CashFree
    var responseHandler=(result)=> {
        try {
            const ParsedResult = JSON.parse(result);
            if(ParsedResult.txStatus === 'CANCELLED') {
                setIsPaymentCancelled(true);
                setLoader(false);
                setTimeout(()=>{navigation.goBack();},1000);
            }
            if(ParsedResult.txStatus === 'SUCCESS') {
                setWillVerify(true);
                setTimeout(()=>{
                    callServerVerification(ParsedResult);
                },10000);
            }

            if(ParsedResult.txStatus === 'FAILED') {
                setIsFailed(true);
                setTimeout(()=>{navigation.goBack();},1000);
            }

        } 
        catch(error) {
            payModalRef.current.dismissModal();
            Toast.show('Oops something went wrong');
        }
    };

    const renderScreenContent = () =>{
        return(
            <View style={styles.verifiedContainer}>
                {isVerified ?  <Text>You Have Successfully Purchased Your Subsciption !!</Text> : null}
                {isPaymentCancelled ?  <Text>Your Payment Is Cancelled</Text> : null}
                {isFailed? <Text>Oops, seems your payment has failed!! please wait</Text>: null}
                <ActivityIndicator color={APP_PINK_COLOR} />
            </View>
        );
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Subscription Payment'} showBackButton={false} >
                <Text> </Text>
            </DefaultHeader>
            {
                (willVerify || Platform.OS === 'android') ? 
                    <PayModal
                        loader={loader} 
                        onUpiCheckoutPressed={()=>startPayment('UPI')} 
                        onWebCheckoutPressed={()=>startPayment('WEB')} 
                        ref={payModalRef}
                        showCancelUI = {isPaymentCancelled}
                        showVerifyUI = {willVerify}
                    /> : null
            }
            {renderScreenContent()}
            
        </SafeAreaView>
    );
};

function mapStateToProps(state){
    return{
        userDetails : state.userObj.userProfile
    };
}

export default connect(mapStateToProps)(SubscriptionPaymentScreen);
const styles = StyleSheet.create({
    verifiedContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});