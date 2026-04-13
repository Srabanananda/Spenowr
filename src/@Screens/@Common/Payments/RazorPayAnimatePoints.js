import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../@GlobalStyles';
import Toast from 'react-native-simple-toast';

import Config from '@Config/default';
import PayModal from '../../../@GlobalComponents/PayModal/index';
import { verifyPaymentWithServer, razorPayPaymentError, processVerifyPayment, razorpayFailedAnimate, razorpaySuccessAnimate } from '../../../@Endpoints/Core/Tabs/Shop';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import * as shopActions from '@Redux/actions/shopActions';
import { useDispatch } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaView } from 'react-native-safe-area-context';

const { RAZORPAY_TEST_ID, COLOR: { ORANGE }, RAZORPAY_KEY_ID } = Config;

const RazorPayAnimatePoints = (props) => {
  const { navigation, userObj, shippingAddresses, route: { params } } = props;
  const dispatch = useDispatch();

  const payModalRef = useRef();

  const tempPload = params?.payload;
  const payload = {
    ...tempPload,
    orderId: tempPload?.order_id || tempPload?.orderId,
    orderAmount: tempPload?.order_amount || tempPload?.orderAmount,
  };

  const [loader, setLoader] = useState(false);
  const [isPaymentCancelled, setIsPaymentCancelled] = useState(false);
  const [willVerify, setWillVerify] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isPaymentStarted, setIsPaymentStarted] = useState(false); // Track the start of the payment process

  const navigateToOrder = () => {
    navigation.replace('MyOrders');
  };

  const renderVerificationSuccessful = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Payment Successful</Text>
        {/* <DefaultButton buttonStyle={{ width: moderateScale(160) }} buttonText={'My Orders'} onPress={navigateToOrder} showLoader={false} /> */}
      </View>
    );
  };

  const renderVerificationFailed = () => {
    if (loader) return null;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{isPaymentCancelled ? 'Payment Cancelled' : 'Payment Verification Failed'}</Text>
        {/* <DefaultButton buttonStyle={{ width: moderateScale(160) }} buttonText={'My Orders'} onPress={navigateToOrder} showLoader={false} /> */}
      </View>
    );
  };

  const razorPaymentFunc = async () => {
    setIsPaymentStarted(true);
    setLoader(true);

    const options = {
      description: 'Product Buy',
      image: 'https://media.spenowr.com/images/theme/default/Spenow_Logo.png',
      currency: payload.currency,
      key: RAZORPAY_KEY_ID,
      amount: payload.amount,
      name: 'Spenowr',
      order_id: payload.id,
      prefill: {
        email: payload.customer_details.customer_email,
        contact: payload.userdata ? payload.userdata.customer_details.customer_phone : payload.customer_details.customer_phone,
        name: payload.userdata ? payload.userdata.customer_details.customer_name : payload.customer_details.customer_name,
      },
      theme: { color: ORANGE },
    };

    console.log("====options=======>", options);
    RazorpayCheckout.open(options)
      .then((data) => {
        console.log("======RazorpayCheckout=data=====>", data);
        setWillVerify(true);
        callServerVerification(data.razorpay_order_id);
      })
      .catch((error) => {
        console.log("========error=======>", error);
        if (error.error?.reason === 'payment_cancelled') {
          setIsPaymentCancelled(true);
        }
        const orderID = payload?.orderId || payload?.id; // Use a fallback order ID from payload
        console.log("Order ID used for failed verification:", payload?.orderId || payload?.id);
        // callServerVerification(data.razorpay_order_id);
        callServerVerification(orderID);
      })
      .finally(() => {
        setWillVerify(false);
        setLoader(false);
        payModalRef.current.dismissModal();
      });
  };

  const successPaymentAPI = async (orderID) => {
    try {
      const res = await razorpaySuccessAnimate(orderID); // Assuming successPaymentAPI is in shopActions
      console.log("Payment success API response:", JSON.stringify(res));
    } catch (error) {
      console.log("Payment success API error:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
  };
  
  const callServerVerification = async (orderID) => {
    console.log("====orderID=======>", orderID);
    try {
    setLoader(true); // Start loader before API call
      const res = await processVerifyPayment(orderID);
  
      // Log entire response for diagnostic purposes
      console.log("Full response from processVerifyPayment:", JSON.stringify(res, null, 2));
      console.log('res && res.data',res && res.data);
      if (res && res.data) {
        const { status, info } = res.data;
        console.log('====================================');
        console.log('res.data of process',res.data);
        console.log('====================================');
  
        // Check if status is directly available, else search in items
        if (status) {
          if (status.toLowerCase() === 'paid') {
            setIsVerified(true);
            await successPaymentAPI(orderID);
          } else {
            setIsVerified(false);
            callFailedVerification(orderID);
          }
        } 
        // else if (info?.items) {
        //   // Look for specific order in items
        //   const order = info.items.find(item => item.receipt === orderID);
        //   if (order && order.status) {
        //     console.log("Order found:", order);
        //     if (order.status.toLowerCase() === 'paid') {
        //       setIsVerified(true);
        //       await successPaymentAPI(orderID);
        //     } else {
        //       setIsVerified(false);
        //       callFailedVerification(orderID);
        //     }
        //   } else {
        //     console.log("Order not found in items or missing status");
        //     setIsVerified(false);
        //     callFailedVerification(orderID);
        //   }
        // } 
        else {
          console.log("Unexpected response structure:", JSON.stringify(res));
          callFailedVerification(orderID);
        }
      } else {
        console.log("Empty or invalid response from server:", JSON.stringify(res));
        callFailedVerification(orderID);
      }
    } catch (error) {
      console.log("RAZOR PAYMENT error : ", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      callFailedVerification(orderID);
    } finally {
      setWillVerify(false);
      setLoader(false);
      payModalRef.current.dismissModal();
    }
  };
  
  
  

  const callFailedVerification = async (orderId) => {
    await razorpayFailedAnimate(orderId)
      .then(res => {
        console.log("=====res===>", res);
        setIsVerified(false);
      })
      .catch((error) => { console.log("callFailedVerification error : ", JSON.stringify(error)); })
      .finally(() => {
        setWillVerify(false);
        setLoader(false);
        payModalRef.current.dismissModal();
      });
  };

  useEffect(() => {
    razorPaymentFunc();

    return () => {
      // Cleanup function to reset the states when the component unmounts
      setLoader(false);
      setIsPaymentStarted(false);
      setIsPaymentCancelled(false);
      setWillVerify(false);
      setIsVerified(false);
    };
  }, []);

  return (
    <SafeAreaView edges={['left', 'right']} style={GlobalStyles.GlobalContainer}>
      <DefaultHeader headerText={isPaymentStarted ? (isVerified ? 'Payment Successful' : 'Make Your Payment') : 'Processing Payment'} showBackButton={isVerified}>
        <Text> </Text>
      </DefaultHeader>
      {isPaymentStarted ? (
        isVerified ? renderVerificationSuccessful() : renderVerificationFailed()
      ) : (
        <ActivityIndicator size="large" color={ORANGE} />
      )}
      <PayModal
        loader={loader}
        onUpiCheckoutPressed={() => { }}
        onWebCheckoutPressed={() => { }}
        ref={payModalRef}
        showCancelUI={isPaymentCancelled}
        showVerifyUI={willVerify}
      />
    </SafeAreaView>
  );
};

export default RazorPayAnimatePoints;
