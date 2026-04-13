import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../@GlobalStyles';
import Toast from 'react-native-simple-toast';

import Config from '@Config/default';
import PayModal from '../../../@GlobalComponents/PayModal/index';
import { verifyPaymentWithServer, razorPayPaymentError } from '../../../@Endpoints/Core/Tabs/Shop';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import * as shopActions from '@Redux/actions/shopActions';
import { useDispatch } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaView } from 'react-native-safe-area-context';

const { RAZORPAY_TEST_ID, COLOR: { ORANGE }, RAZORPAY_KEY_ID } = Config;

const RazorPayPayment = (props) => {
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
        <DefaultButton buttonStyle={{ width: moderateScale(160) }} buttonText={'My Orders'} onPress={navigateToOrder} showLoader={false} />
      </View>
    );
  };

  const renderVerificationFailed = () => {
    if (loader) return null;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{isPaymentCancelled ? 'Payment Cancelled' : 'Payment Verification Failed'}</Text>
        <DefaultButton buttonStyle={{ width: moderateScale(160) }} buttonText={'My Orders'} onPress={navigateToOrder} showLoader={false} />
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
        callServerVerification(payload.receipt);
      })
      .catch((error) => {
        console.log("========error=======>", error);
        if (error.error?.reason === 'payment_cancelled') {
          setIsPaymentCancelled(true);
        }
        callServerVerification(payload.receipt);
      })
      .finally(() => {
        setWillVerify(false);
        setLoader(false);
        payModalRef.current.dismissModal();
      });
  };

  const callServerVerification = async (orderID) => {
    console.log("====orderID=======>", orderID);
    await verifyPaymentWithServer(orderID)
      .then(res => {
        const { data: { status } } = res;
        console.log('@#-> Razor payment : ', JSON.stringify(res));
        if (status === 'Cancelled') setIsVerified(false);
        else if (status.toLowerCase() === 'paid') setIsVerified(true);
        else setIsVerified(false);
      })
      .catch((error) => { console.log("RAZOR PAYMENT error : ", JSON.stringify(error)); })
      .finally(() => {
        setWillVerify(false);
        setLoader(false);
        payModalRef.current.dismissModal();
      });
  };

  const callFailedVerification = async (orderId) => {
    await razorPayPaymentError(orderId)
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

export default RazorPayPayment;
