/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect,useState,useRef } from 'react';
import {SafeAreaView,Text,View, ActivityIndicator} from 'react-native';
import { generateCashFreeToken } from '../../../@Utils/helperFiles/Payment';
import PropTypes from 'prop-types';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../@GlobalStyles';
import Toast from 'react-native-simple-toast';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
import Config from '@Config/default';
import PayModal from '../../../@GlobalComponents/PayModal/index';
import { verifyPaymentWithServer } from '../../../@Endpoints/Core/Tabs/Shop';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import * as shopActions from '@Redux/actions/shopActions';
import { useDispatch } from 'react-redux';

const {CASHFREE_APPID,CASHFREE_ENV} = Config;

const ProductPaymentScreen = ({...props}) =>{

    const payModalRef = useRef();
    const dispatch = useDispatch();

    const {route:{params:{payload}},navigation} = props;

    const [loader, setLoader] = useState(true);
    // const [cashFreeToken, setCashFreeToken] = useState(''); // USE THIS LATER TO STORE CASHFREE TOKEN;
    const [isPaymentCancelled, setIsPaymentCancelled] = useState(false);
    const [willVerify, setWillVerify] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(()=>{
        handleCashFree();
    },[]);

    // VERIFY WITH SERVER AFTER CASHFREE PAYMENT
    const callServerVerification = () =>{
        verifyPaymentWithServer(payload.orderId)
            .then(res=>{
                const {data:{status}} = res;
                console.log('@#-> CASHFREE PAYMENT : ', JSON.stringify(res));
                if(status === 'Cancelled')setIsVerified(false);
                else setIsVerified(true);

                payModalRef.current.dismissModal();
            })
            .catch((error)=>{console.log("CASHFREE PAYMENT error : ",JSON.stringify(error));})
            .finally(()=>{
                setWillVerify(false);
                setLoader(false);
            });
    };

    // GENERATES CASHFREE TOKEN
    const handleCashFree = async() =>{
        generateCashFreeToken(payload)
            .then(res=>{
                console.log(res)
                const {cftoken = ''} =res;
                console.log('@#-> handleCashFree : ', JSON.stringify(res));
                if(cftoken.length){
                    // setCashFreeToken(cftoken);
                    startPayment('WEB',cftoken);
                }
                else Toast.show('Oops, Couldnot Initiate Payment Process',Toast.LONG);
            })
            .catch(()=>{
                Toast.show('Oops could not initiate Payment');
                setTimeout(()=>{navigation.goBack();},300);
            });
    };

    // Handle Payment INITIATION
    function startPayment(mode,token) {
        const processObj = {...payload};
        console.log(processObj)
        processObj.appId = CASHFREE_APPID;
        processObj.tokenData = token;
        setLoader(true);
        if (mode === 'UPI') {
            RNPgReactNativeSDK.startPaymentUPI(processObj, CASHFREE_ENV, responseHandler);
        } else {
            RNPgReactNativeSDK.startPaymentWEB(processObj, CASHFREE_ENV, responseHandler);
        }
    }

    // Handle Payment Success | Failure from CashFree
    var responseHandler=(result)=> {
        dispatch(shopActions.fetchCartDetails());
        try {
            const ParsedResult = JSON.parse(result);
            console.log('@#-> responseHandler : ', JSON.stringify(ParsedResult));
            if(ParsedResult.txStatus === 'CANCELLED') {
                setIsPaymentCancelled(true);
                setLoader(false);
            }
            if(ParsedResult.txStatus === 'SUCCESS') {
                console.log('@#-> ParsedResult.txStatus : SUCCESS', JSON.stringify(ParsedResult));
                setWillVerify(true);
                setTimeout(()=>{
                    callServerVerification(result);
                },10000);
            }
        } 
        catch(error) {
            payModalRef.current.dismissModal();
            Toast.show('Oops something went wrong');
        }
    };

    const navigateToOrder = () =>{
        navigation.replace('MyOrders');
    };

    const renderVerificationSuccessful = () =>{
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Payment Successful</Text>
                <DefaultButton buttonStyle={{width:moderateScale(160)}} buttonText={'My Orders'}  onPress={navigateToOrder} showLoader={false} />
            </View>
        );
    };

    const renderVerificationFailed = () =>{
        if(loader) return null;
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Payment Verification Failed</Text>
                <DefaultButton buttonStyle={{width:moderateScale(160)}} buttonText={'My Orders'}  onPress={navigateToOrder} showLoader={false} />
            </View>
        );
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={isVerified ? 'Payment Successful' :  'Make Your Payment'} showBackButton={isVerified} >
                <Text> </Text>
            </DefaultHeader>
            {isVerified ? renderVerificationSuccessful() : renderVerificationFailed()}
            {loader ? <ActivityIndicator /> : null}
            <PayModal 
                loader={loader} 
                onUpiCheckoutPressed={()=>startPayment('UPI')} 
                onWebCheckoutPressed={()=>startPayment('WEB')} 
                ref={payModalRef}
                showCancelUI = {isPaymentCancelled}
                showVerifyUI = {willVerify}
            />
        </SafeAreaView>
    );
};

ProductPaymentScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
    route:PropTypes.object.isRequired,
};


export default ProductPaymentScreen;
