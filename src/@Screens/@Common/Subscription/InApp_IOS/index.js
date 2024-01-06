/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useIAP } from 'react-native-iap';
import Toast from 'react-native-simple-toast';
import IOS_PLANS from '../../../../assets/JsonFiles/Subscription/plans_IOS.json';
import Carousel from 'react-native-snap-carousel';
import { moderateScale } from 'react-native-size-matters';
import { DEVICE_WIDTH } from '../../../../@Utils/helperFiles/DeviceInfoExtractor';
import Plan from '../Plan';
import { GlobalStyles } from '@GlobalStyles';
import { connect } from 'react-redux';
import { checkIosSubscriptionReceipt, initiateSubscriptionPayment } from '../../../../@Endpoints/Core/Payments';
import { useNavigation } from '@react-navigation/native';

type Props = {
    Subscriptions: Array,
    SUBSCRIPTION_LIST: Object,
    currentPlan: String,
    isFromReg: Boolean,
    selectedPlan: String,
    setPlan: Function,
    userDetails: Object
}

const InAppPurchaseIOS = ({ ...props }: Props) => {

    const {
        Subscriptions,
        SUBSCRIPTION_LIST,
        currentPlan,
        isFromReg,
        selectedPlan,
        setPlan,
        userDetails
    } = props;

    const navigation = useNavigation();

    const {mobile, email, user_id, first_name, last_name} = userDetails;
    const [orderId, setOrderId] = useState(null);

    const {
        connected,
        products,
        getProducts,
        getSubscriptions,
        finishTransaction,
        currentPurchase,
        currentPurchaseError,
        requestSubscription,
    } = useIAP();

    const [loader, setLoader] = useState(false);

    const selectedProd = products.find(prod => prod.title === SUBSCRIPTION_LIST[selectedPlan].label);

    useEffect(() => {
        if (connected) {
            getSubscriptions(IOS_PLANS);
            getProducts(IOS_PLANS);
        }
    }, [connected]);

    useEffect(() => {
        if (currentPurchase)
            checkCurrentPurchase(currentPurchase);
    }, [currentPurchase, finishTransaction]);

    useEffect(() => {
        if (currentPurchaseError) {
            Toast.show('Oops! Could not complete the transaction.');
            setLoader(false);
        }
    }, [currentPurchaseError]);

    const getServerPayLoad = (selectedProd) =>{
        initiateSubscriptionPayment(getPaymentInitiationPayload(selectedProd))
            .then(res=>{
                setOrderId(res?.data?.payment_list?.orderId);
                requestSubscription(selectedProd.productId);
            })
            .catch(()=>{
                Toast.show('Oops could not initiate payment');
                setLoader(false);
                setTimeout(()=>{navigation.goBack();},300);
            });
    };

    const validateReceipt = (purchase) => {
        setLoader(true);
        checkIosSubscriptionReceipt(selectedPlan, user_id, purchase, orderId,selectedProd)
            .then(() => {
                Toast.show('Subscription is activated, Please wait');
                setTimeout(()=>{
                    navigation.popToTop();
                    navigation.navigate('Profile');
                },1000);
            })
            .catch(() => {
                Toast.show('Oops Somehing went wrong');
            })
            .finally(()=>setLoader(false));
    };

    const getPaymentInitiationPayload = (selectedProd) => {
        return {
            plan: selectedProd?.productId,
            orderAmount: selectedProd?.price,
            orderCurrency: selectedProd?.currency,
            customerEmail: email,
            userId: userDetails?.user_id,
            customerName : first_name+' '+last_name,
            customerPhone : mobile,
            shippingAddress: '',
            application: true,
        };
    };

    const onUpgradeClickCallBack = () => {
        setLoader(true);
        try {
            if (selectedProd)  {
                getServerPayLoad(selectedProd);
            }
            else Toast.show('Product not found');
        } catch (error) {
            Toast.show('Oops Something went wrong');
            setLoader(false);
        }
    };

    const checkCurrentPurchase = async (purchase) => {
        if (purchase) {
            const receipt = purchase.transactionReceipt;
            setLoader(false);
            if (receipt)
                try {
                    // const ackResult = await finishTransaction(purchase);
                    if(orderId)validateReceipt(purchase);
                } catch (ackErr) {
                    Toast.show('Oops Could not acknowledge the transction');
                    setLoader(false);
                }
        }
    };

    const getPlans = ({ item, i }) => {
        if (SUBSCRIPTION_LIST[item])
            return <Plan
                currentPlan={currentPlan}
                isFromReg={isFromReg}
                key={i}
                onUpgradeClickCallBack={onUpgradeClickCallBack}
                plan={SUBSCRIPTION_LIST[item]}
                selectedPlan={selectedPlan}
                setPlan={setPlan}
                willShowLoader={loader}
            />;
        return <Text style={GlobalStyles.noDataFound}>No Plans Found</Text>;
    };

    return (
        <View style={styles.container}>
            <Carousel
                data={Subscriptions}
                firstItem={1}
                inactiveSlideOpacity={0.8}
                itemWidth={DEVICE_WIDTH - 70}
                renderItem={getPlans}
                sliderWidth={DEVICE_WIDTH}
            />
        </View>
    );
};

function mapStateToProps(state) {
    return {
        userDetails: state.userObj.userProfile
    };
}

export default connect(mapStateToProps)(InAppPurchaseIOS);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(10)
    }
});