// /**
//  *  Created By @name Sukumar_Abhijeet
//  */
// import React, { useEffect,useState,useRef } from 'react';
// import { Text, View, ActivityIndicator } from 'react-native';
// import { generateCashFreeToken } from '../../../@Utils/helperFiles/Payment';
// import PropTypes from 'prop-types';
// import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
// import { GlobalStyles } from '../../../@GlobalStyles';
// import Toast from 'react-native-simple-toast';
// // import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
// import Config from '@Config/default';
// import PayModal from '../../../@GlobalComponents/PayModal/index';
// import { verifyPaymentWithServer } from '../../../@Endpoints/Core/Tabs/Shop';
// import DefaultButton from '../../../@GlobalComponents/DefaultButton';
// import { moderateScale } from 'react-native-size-matters';
// import * as shopActions from '@Redux/actions/shopActions';
// import { useDispatch } from 'react-redux';
// import { convertKeysToCamelCase } from '../../../@Utils/helperFiles/helpers';
// // import {
// //     CFDropCheckoutPayment, // //     CFEnvironment, // //     CFPaymentComponentBuilder, // //     CFPaymentModes, // //     CFSession, // //     CFThemeBuilder, // //     CFUPIIntentCheckoutPayment
// //   } from 'cashfree-pg-api-contract';
// //   import {
// //     CFErrorResponse, // //     CFPaymentGatewayService, // //   } from 'react-native-cashfree-pg-sdk';

// const {CASHFREE_APPID, CASHFREE_ENV} = Config;

// const ProductPaymentScreen = ({...props}) =>{

//     const payModalRef = useRef();
//     const dispatch = useDispatch();

//     const {route:{params}, navigation} = props;
// const tempPload=params?.payload
// const payload={...tempPload, //     orderId:tempPload?.order_id||tempPload?.orderId, //     orderAmount:tempPload?.order_amount||tempPload?.orderAmount}
//     const [loader, setLoader] = useState(true);
//     // const [cashFreeToken, setCashFreeToken] = useState(''); // USE THIS LATER TO STORE CASHFREE TOKEN;
//     const [isPaymentCancelled, setIsPaymentCancelled] = useState(false);
//     const [willVerify, setWillVerify] = useState(false);
//     const [isVerified, setIsVerified] = useState(false);

//     useEffect(()=>{
//         handleCashFree();
//     }, []);
// useEffect(() => {
//     CFPaymentGatewayService.setCallback({
//         onVerify(orderID){
//           console.log('orderId is :' + orderID);
//           payModalRef.current.dismissModal();
//           setIsVerified(true)
//           setLoader(false);
//         // callServerVerification(orderID)
//         }, //         onError(error, orderID) {
//           console.log(
//             'exception is : ' + JSON.stringify(error) + '\norderId is :' + orderID
//           );
//           if(error.code==="action_cancelled")setIsVerified(false)
//           payModalRef.current.dismissModal();
//           setWillVerify(false);
//           setLoader(false);
//         }, //       });

//   return () => {
//     CFPaymentGatewayService.removeCallback();
//   }
// }, [])

//     // VERIFY WITH SERVER AFTER CASHFREE PAYMENT
//     const callServerVerification = (orderID) =>{
//         verifyPaymentWithServer(orderID)
//             .then(res=>{
//                 const {data:{status}} = res;
//                 console.log('@#-> CASHFREE PAYMENT : ', JSON.stringify(res));
//                 if(status === 'Cancelled')setIsVerified(false);
//                 else setIsVerified(true);

//                 payModalRef.current.dismissModal();
//             })
//             .catch((error)=>{console.log("CASHFREE PAYMENT error : ", JSON.stringify(error));})
//             .finally(()=>{
//                 setWillVerify(false);
//                 setLoader(false);
//             });
//     };

//     // GENERATES CASHFREE TOKEN
//     const handleCashFree = async() =>{
//         console.log({payload});
//         generateCashFreeToken(payload)  
//             .then(res=>{
//                 console.log({res})
//                 // const {cftoken = ''} =res;
//                 console.log('@#-> handleCashFree : ', JSON.stringify(res.payment_session_id));
//                 if(res?.payment_session_id){
//                     // setCashFreeToken(cftoken);
//                     startPayment('WEB', res);
//                 }
//                 else Toast.show('Oops, Couldnot Initiate Payment Process', Toast.LONG);
//             })
//             .catch((e)=>{
//                 console.log({e});
//                 Toast.show('Oops could not initiate Payment');
//                 setTimeout(()=>{navigation.goBack();}, 300);
//             });
//     };

//     // Handle Payment INITIATION
//     function startPayment(mode, order) {

//         let processObj = {...payload};
//         // processObj=convertKeysToCamelCase(processObj)
//         console.log({processObj})
//         // processObj.appId = CASHFREE_APPID;
//         // processObj.tokenData = token;
//        try {
//         const session = new CFSession(
//             order.payment_session_id, //             order.order_id, //             CFEnvironment.SANDBOX
//           );
//         setLoader(true);

//         if (mode === 'UPI') {
//             // const theme = new CFThemeBuilder().build()
//             const dropPayment = new CFUPIIntentCheckoutPayment(
//                 session, //                 null
//               );
//               CFPaymentGatewayService.doUPIPayment(dropPayment);
//             // RNPgReactNativeSDK.startPaymentUPI(processObj, CASHFREE_ENV, responseHandler);
//         } else {
//             // RNPgReactNativeSDK.startPaymentWEB(processObj, CASHFREE_ENV, responseHandler);
//             CFPaymentGatewayService.doWebPayment(JSON.stringify(session));
//         }
//        } catch (error) {
//         console.log(e.message);
//         Toast.show('Oops something went wrong');
//        }
//     }

//     // Handle Payment Success | Failure from CashFree
//     // var responseHandler=(result)=> {
//     //     dispatch(shopActions.fetchCartDetails());
//     //     try {
//     //         const ParsedResult = JSON.parse(result);
//     //         console.log('@#-> responseHandler : ', JSON.stringify(ParsedResult));
//     //         if(ParsedResult.txStatus === 'CANCELLED') {
//     //             setIsPaymentCancelled(true);
//     //             setLoader(false);
//     //         }
//     //         if(ParsedResult.txStatus === 'SUCCESS') {
//     //             console.log('@#-> ParsedResult.txStatus : SUCCESS', JSON.stringify(ParsedResult));
//     //             setWillVerify(true);
//     //             setTimeout(()=>{
//     //                 callServerVerification(result);
//     //             }, 10000);
//     //         }
//     //     } 
//     //     catch(error) {
//     //         payModalRef.current.dismissModal();
//     //         Toast.show('Oops something went wrong');
//     //     }
//     // };

//     const navigateToOrder = () =>{
//         navigation.replace('MyOrders');
//     };

//     const renderVerificationSuccessful = () =>{
//         return(
//             <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
//                 <Text>Payment Successful</Text>
//                 <DefaultButton buttonStyle={{width:moderateScale(160)}} buttonText={'My Orders'}  onPress={navigateToOrder} showLoader={false} />
//             </View>
//         );
//     };

//     const renderVerificationFailed = () =>{
//         if(loader) return null;
//         return(
//             <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
//                 <Text>Payment Verification Failed</Text>
//                 <DefaultButton buttonStyle={{width:moderateScale(160)}} buttonText={'My Orders'}  onPress={navigateToOrder} showLoader={false} />
//             </View>
//         );
//     };

//     return(
//         <SafeAreaView edges={['left', 'right']} style={GlobalStyles.GlobalContainer}>
//             <DefaultHeader headerText={isVerified ? 'Payment Successful' :  'Make Your Payment'} showBackButton={isVerified} >
//                 <Text> </Text>
//             </DefaultHeader>
//             {isVerified ? renderVerificationSuccessful() : renderVerificationFailed()}
//             {loader ? <ActivityIndicator /> : null}
//             <PayModal 
//                 loader={loader} 
//                 onUpiCheckoutPressed={()=>startPayment('UPI')} 
//                 onWebCheckoutPressed={()=>startPayment('WEB')} 
//                 ref={payModalRef}
//                 showCancelUI = {isPaymentCancelled}
//                 showVerifyUI = {willVerify}
//             />
//         </SafeAreaView>
//     );
// };

// ProductPaymentScreen.propTypes = {
//     navigation:PropTypes.object.isRequired, //     route:PropTypes.object.isRequired, // };

// export default ProductPaymentScreen;

// *  Created By @name Amit_Kumar_Singh
//  */
import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { generateCashFreeToken } from '../../../@Utils/helperFiles/Payment';
import PropTypes from 'prop-types';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../@GlobalStyles';
import Toast from 'react-native-simple-toast';

import Config from '@Config/default';
import PayModal from '../../../@GlobalComponents/PayModal/index';
import { verifyPaymentWithServer ,razorPayPaymentError,} from '../../../@Endpoints/Core/Tabs/Shop';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import * as shopActions from '@Redux/actions/shopActions';
import { useDispatch } from 'react-redux';
import { convertKeysToCamelCase } from '../../../@Utils/helperFiles/helpers';
import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaView } from 'react-native-safe-area-context';

const {RAZORPAY_TEST_ID,COLOR:{ORANGE},RAZORPAY_KEY_ID} = Config;

const RazorPayPayment = (props) => {
    const { navigation, userObj, shippingAddresses, route:{params} } = props;
    const dispatch = useDispatch();
    // const {
    //   userProfile: { email, first_name, last_name, user_id },
    //   user: { default_address = "" },
    // } = userObj;
    
    const payModalRef = useRef();

const tempPload=params?.payload
const payload={...tempPload, 
    orderId:tempPload?.order_id||tempPload?.orderId,
    orderAmount:tempPload?.order_amount||tempPload?.orderAmount}
    const [loader, setLoader] = useState(false);
    // const [cashFreeToken, setCashFreeToken] = useState(''); // USE THIS LATER TO STORE CASHFREE TOKEN;
    const [isPaymentCancelled, setIsPaymentCancelled] = useState(false);
    const [willVerify, setWillVerify] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

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
               <Text> {isPaymentCancelled?'Payment Cancelled':'Payment Verification Failed'}</Text>
                <DefaultButton buttonStyle={{width:moderateScale(160)}} buttonText={'My Orders'}  onPress={navigateToOrder} showLoader={false} />
            </View>
        );
    };
    console.log("====razorPaymentFunc=orderID===>",payload)

const razorPaymentFunc=async()=>{

    var options = {
        description: 'Product Buy',
        image: 'https://media.spenowr.com/images/theme/default/Spenow_Logo.png',
        currency:payload.currency,
        key:RAZORPAY_KEY_ID,
        amount: payload.amount,
        name: 'Spenowr',
       order_id: payload.id,
        prefill: {
            email: payload.userdata.customer_details.customer_email,
            contact:payload.userdata? payload.userdata.customer_details.customer_phone:payload.customer_details.customer_phone,
            name: payload.userdata?payload.userdata.customer_details.customer_name:payload.customer_details.customer_name
        },
        theme: { color: ORANGE }
    }
    console.log("====options=======>",options)
    RazorpayCheckout.open(options).then((data) => {
    console.log("======RazorpayCheckout=data=====>",data)
    //    payModalRef.current.dismissModal();
    setWillVerify(true)
    setLoader(true); 
    callServerVerification(payload.receipt)
    }).catch((error) => {
        console.log("========error=======>",error)
        if(error.error?.reason=='payment_cancelled'){
            setIsPaymentCancelled(true)
        }
      callServerVerification(payload.receipt)
        //callFailedVerification(payload.receipt)
    })
    .finally(()=>{
       
        payModalRef.current.dismissModal();
       setWillVerify(false);
       setLoader(false);
    })
    
    
}

const callServerVerification = async(orderID) =>{
    console.log("====orderID=======>",orderID)
   await verifyPaymentWithServer(orderID)
        .then(res=>{
            const {data:{status}} = res;
            console.log('@#-> Razor payment : ', JSON.stringify(res));
            if(status === 'Cancelled')setIsVerified(false);
            else if(status.toLowerCase() ==='paid') setIsVerified(true)
            else setIsVerified(false); 
        })
        .catch((error)=>{console.log("RAZOR PAYMENT error : ",JSON.stringify(error));})
        .finally(()=>{
            setWillVerify(false);
            setLoader(false);
           payModalRef.current.dismissModal();
        });
};

const callFailedVerification=async(orderId)=>{
   await razorPayPaymentError(orderId)
   .then(res=>{
    console.log("=====res===>",res)
    setIsVerified(false); 
})
.catch((error)=>{console.log("callFailedVerification error : ",JSON.stringify(error));})
.finally(()=>{
    setWillVerify(false);
    setLoader(false);
   payModalRef.current.dismissModal();
});
}

useEffect(() => {
    razorPaymentFunc()
}, [])

  return (
    <SafeAreaView edges={['left', 'right']} style={GlobalStyles.GlobalContainer}>
    <DefaultHeader headerText={isVerified ? 'Payment Successful' :  'Make Your Payment'} showBackButton={isVerified} >
        <Text> </Text>
    </DefaultHeader>
    {isVerified ? renderVerificationSuccessful() : renderVerificationFailed()}
    {loader ? <ActivityIndicator /> : null}
    {/* <DefaultButton buttonStyle={{width:moderateScale(160)}} 
                buttonText={'Razor'}  
                onPress={()=>razorPaymentFunc()} 
                showLoader={false} /> */}
    <PayModal 
        loader={loader} 
        onUpiCheckoutPressed={()=>{}} 
        onWebCheckoutPressed={()=>{}} 
        ref={payModalRef}
        showCancelUI = {isPaymentCancelled}
        showVerifyUI = {willVerify}
    />
</SafeAreaView>
  )
}

export default RazorPayPayment