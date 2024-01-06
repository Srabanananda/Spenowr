/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {SafeAreaView,Text,View} from 'react-native';
import { GetTokenFromCashFree, initiateContestPayment } from '../../../@Endpoints/Core/Payments';
import Toast from 'react-native-simple-toast';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
import Config from '@Config/default';
import PropTypes from 'prop-types';
import { isObjectEmpty } from '../../../@Utils/helperFiles/isObjectEmpty';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../@GlobalStyles';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';

const {CASHFREE_APPID,CASHFREE_ENV,COLOR:{SUBNAME}} = Config;

const demoPayload = {
    application: true,
    contest_id: '6deb81696a412676886252220e11ff2f',
    contest_payment: 1,
    contest_type: 'Craftwork/Sculpture',
    customerEmail: 'sakti.mishra85@gmail.com',
    customerName: 'Sakti Mishra',
    customerPhone: '7978915803',
    media_id: '4d45c8b8a2752c2ffc2bbba8206283e7',
    orderAmount: '99.00',
    orderCurrency: 'USD',
    shippingAddress: '',
    userId: '5a3dd5072bd1603a3cb1b5a1e0417cd7',
};

const PaymentInitiationScreen = ({...props}) =>{
    const {route,navigation} = props;
    navigation.setOptions({ tabBarVisible: false });
    const {payload}  = route.params;
    // const payload = demoPayload;

    const [payObject, setPayObject] = useState(payload);
    const [cashFreeToken, setCashFreeToken] = useState('');
    const [loader, setLoader] = useState(true);
    const [loadingText, setLoadingText] = useState('Initiating Payment, Please wait..');

    useEffect(()=>{
        initiatePayment();
    },[]);

    const initiatePayment = () =>{
        payload.application = true;
        initiateContestPayment(payload)
            .then(res=>{
                const {data:{payment_list={},response_msg=''}} = res;
                if(!isObjectEmpty(payment_list))generateCashFreeToken(payment_list);
                else Toast.show(response_msg,Toast.LONG);
            })
            .catch((e)=>{
                console.log(e)
                Toast.show('Payment Initiation Failed, Please try after sometime',Toast.LONG);
                navigation.goBack();
            });
    };

    const generateCashFreeToken = (orderData)=>{
        GetTokenFromCashFree(orderData)
            .then(res=>{
                const {cftoken = ''} =res;
                if(cftoken.length){
                    setCashFreeToken(cftoken);
                    setPayObject(orderData);
                }
                else Toast.show('Oops, Couldnot Initiate Payment Process',Toast.LONG);
            })
            .catch(()=>{})
            .finally(()=>{
                setLoader(false);
            });
    };

    function startPayment(mode) {
        const processObj = {...payObject};
        processObj.appId = CASHFREE_APPID;
        processObj.tokenData = cashFreeToken;
        if (mode === 'UPI') {
            RNPgReactNativeSDK.startPaymentUPI(processObj, CASHFREE_ENV, responseHandler);
        } else {
            RNPgReactNativeSDK.startPaymentWEB(processObj, CASHFREE_ENV, responseHandler);
        }
    }

    var responseHandler=(result)=> {
        try {
            var output = '';
            var obj = JSON.parse(result, function (key, value) {
                if (key !=='') {
                    output = output + key + ' : ' + value + '\n';          
                }
            });
        } 
        catch(error) {}
    };

    if(loader) return<ScreenLoader text={loadingText} />;

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Payment Mode Selection'} showBackButton={false} >
                <Text> </Text>
            </DefaultHeader>
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                <DefaultButton buttonStyle={{width:'80%'}} buttonText={'WEB CHECKOUT'} onPress={()=>startPayment('WEB')}  showLoader={false} textStyle={{fontSize:12}} />
                <DefaultButton buttonStyle={{width:'80%'}} buttonText={'UPI CHECKOUT'}  onPress={()=>startPayment('UPI')} showLoader={false}  textStyle={{fontSize:12}} />
            </View>
            <Text style={{alignSelf:'center',marginBottom:10,color:SUBNAME}}>Please dont press back button</Text>
        </SafeAreaView>
    );
};

PaymentInitiationScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
    route:PropTypes.object.isRequired,
};

export default PaymentInitiationScreen;