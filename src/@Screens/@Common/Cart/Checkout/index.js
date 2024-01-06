/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, RefreshControl } from 'react-native';
import { getCheckoutDetails } from '../../../../@Endpoints/Core/Tabs/Shop';
import DefaultHeader from '../../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../@GlobalStyles';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { moderateScale } from 'react-native-size-matters';
import Address from './Address';
import Summary from './Summary';
import Coupon from './Coupon';
import FormHeader from '../../../../@GlobalComponents/FormHeader';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import { getCurrency } from '../../../../@Utils/helperFiles/CardDetails';
import Config from '@Config/default';
import { connect, useDispatch } from 'react-redux';
import { getPaymentLink } from '../../../../@Endpoints/Core/Tabs/Shop/index';
import { isObjectEmpty } from '@Utils/helperFiles/isObjectEmpty';
import * as shopActions from '@Redux/actions/shopActions';
import RedeemReward from './Reward';
import { useCurrency } from '../../../../@Context';
import * as moreActions from '@Redux/actions/moreActions';

const { COLOR: { LIGHTGREY, SUBNAME, WHITE } } = Config;

const ShoppingCartCheckoutScreen = ({ ...props }) => {

    const {
        navigation, userObj,
        shippingAddresses,route
    } = props;
    const dispatch = useDispatch();
    const {
        userProfile: {
            email,
            first_name,
            last_name,
            user_id
        },
        user: {
            default_address = ''
        }
    } = userObj;

    const [loading, setLoading] = useState(true);
    const { currency, setCurrency } = useCurrency();
    const [checkoutDetails, setCheckoutDetails] = useState();
    const [selectedAddressI, setSelectedAddressI] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState(0);
    const [payLoader, setPayLoader] = useState(false);
    const [internalLoader, setInternalLoader] = useState(false);

    const defaultAddress = shippingAddresses.findIndex(x => x.shipping_id === default_address);
    const country = useRef('');

    const onModalClose = (CountryID) => {
        dispatch(moreActions.fetchShippingAddressList());
        country.current = CountryID
    }

    useEffect(() => {
        if (defaultAddress !== -1) {
            country.current = shippingAddresses[defaultAddress]?.country;
            setSelectedAddressI(defaultAddress);
        }
        callApi();
    }, [currency]);

    useEffect(() => {
        if (selectedAddressI !== null) callApi();
    }, [selectedAddressI]);

    useEffect(() => {
        callApi();
    }, [country.current]);

    const handleAddressChange = (index) => {
        setSelectedAddressI(index);
        country.current = shippingAddresses[index]?.country;
    };

    const callApi = (coupon = '', reward_amount = '') => {
        setInternalLoader(true);
        dispatch(moreActions.fetchShippingAddressList());
        getCheckoutDetails(coupon, reward_amount, country.current, currency)
            .then(res => {
                try {

                    const { data = {} } = res;
                    const { shipping_address = [], addtocart = [], reward = {} } = data;
                    // setAddressList(shipping_address);
                    if (reward.status === 'failed') {
                        Toast.show(reward.reward_message);
                    }
                    if (addtocart.length) setCheckoutDetails(data);
                    else {
                        let data = {
                            currency: currency,
                            country: '1'
                        }
                        dispatch(shopActions.fetchCartDetails(data));
                        Toast.show('No Products added');
                        setTimeout(() => {
                            navigation.goBack();
                        }, 250);
                    }

                    setLoading(false);
                }
                catch (e) {
                    Toast.show('Oops could not initiate checkout');
                    setTimeout(() => {
                        navigation.goBack();
                    }, 300);
                }
            })
            .catch(() => {
                Toast.show('Oops could not initiate checkout');
                setTimeout(() => {
                    navigation.goBack();
                }, 300);
            })
            .finally(() => {
                setInternalLoader(false);
            });
    };

    const validateData = () => {
        try {
            const {
                total_shipping_price,
                coupon: { coupon_code = '' },
                discountAmount,
                total_price,
                shipping_address = [],
                total_price_witout_shipping_price,
                product_type = [],
            } = checkoutDetails;

            if (!shipping_address.length) {
                Toast.show('Please add shipping address');
                return;
            }

            setPayLoader(true);

            const {
                shipping_id = '',
                contact_number = '',
            } = shipping_address[selectedAddressI];

            const paymentLinkObj =
            {
                shippingAddress: shipping_id,
                orderAmount: total_price,
                total_product_amount: total_price_witout_shipping_price,
                orderCurrency: currency,
                customerEmail: email,
                userId: user_id,
                coupon_discount_amount: discountAmount,
                total_shipping_price: total_shipping_price,
                customerName: `${first_name} ${last_name}`,
                customerPhone: contact_number,
                couponCode: coupon_code,
                application: 'true',
                product_type: product_type.toString(),
                check_price: total_price,
                additional_information: '',
                product_info: '',
                country: country.current,
            };

            getPaymentLink(paymentLinkObj)
                .then(res => {
                    const { data: { payment_list } } = res;
                    console.log('payment Link : ', JSON.stringify(res))
                    // console.log("payment_list info : ",payment_list)
                    if (!isObjectEmpty(payment_list) && payment_list!=undefined)
                        navigation.navigate('ProductPay', { payload: payment_list });
                    else Toast.show('Fetching Payment List failed');
                })
                .catch((e) => {
                    console.log(e)
                    Toast.show('Oops Something went wrong getting the payment link');
                })
                .finally(() => setPayLoader(false));
        } catch (error) {
            Toast.show('oops something went wrong during validating data');
            setPayLoader(false);
        }
    };

    const getRewardContent = (currency, amount) => {
        if (amount === '0.00') return <Text style={styles.availReward}> No Rewards available </Text>;
        return <Text style={styles.availReward}>Reward Available : {getCurrency(currency)} {amount} </Text>;
    };

    const getData = () => {
        const {
            addtocart = [], coupon = {}, reward = {},
            reward: { reedem_ammount = 0, reward_ammount = 0 },
            total_price = '0',
            total_currency = '1',
            total_shipping_price = '0',
            discountAmount = '0',
            total_price_witout_shipping_price = '0',
        } = checkoutDetails;
        let mycurr = currency == 'INR' ? '1' : '2';
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={() => {
                            setLoading(true);
                            callApi();
                        }}
                        refreshing={loading}
                        title="Refreshing .."
                        titleColor={'#000'} />
                }
                showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Address addressList={shippingAddresses} defaultAddressIndex={defaultAddress} refreshData={callApi} setAddressIndexCallback={handleAddressChange} onEnd={onModalClose}/>
                    <Summary itemList={addtocart} refreshData={callApi} />
                    <Coupon couponData={coupon} refreshData={callApi} />
                    <RedeemReward couponData={coupon} redeemData={reward} refreshData={callApi} total_price_witout_shipping_price={total_price_witout_shipping_price} />

                    <View style={[GlobalStyles.primaryCard, styles.detailContainer]}>
                        <FormHeader headerText={'Price Details'} >
                            {getRewardContent(mycurr, reward_ammount)}
                        </FormHeader>
                        <View style={styles.detailInnerBox}>
                            <Text style={styles.detailText}>Price ({addtocart.length + ' Items'})</Text>
                            <Text style={styles.detailValue}>{getCurrency(mycurr)} {total_price_witout_shipping_price}</Text>
                        </View>
                        <View style={[styles.detailInnerBox, { borderWidth: 0 }]}>
                            <Text style={styles.detailText}>Discount</Text>
                            <Text style={styles.detailValue}>{getCurrency(mycurr)} {discountAmount}</Text>
                        </View>
                        <View style={styles.detailInnerBox}>
                            <Text style={styles.detailText}>Shipping Fee</Text>
                            <Text style={styles.detailValue}>{getCurrency(mycurr)} {total_shipping_price}</Text>
                        </View>
                        <View style={styles.detailInnerBox}>
                            <Text style={styles.detailText}>Reward Balance Redeemed</Text>
                            <Text style={styles.detailValue}>{getCurrency(mycurr)} {reedem_ammount}</Text>
                        </View>
                        <View style={styles.detailInnerBox}>
                            <Text style={styles.detailText}>Total</Text>
                            <Text style={styles.detailValue}>{getCurrency(mycurr)} {total_price}</Text>
                        </View>
                        <DefaultButton buttonText={'Pay Now'} onPress={() => validateData()} showLoader={payLoader || internalLoader} />
                    </View>
                </View>
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Cart Checkout'} showCurr={true} getSelectedCurrency={setCurrency}/>
            {loading ? <ScreenLoader text={'Updating...'} /> : getData()}
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {
        userObj: state.userObj,
        shippingAddresses: state.more.shippingAddressList,
    };
};

ShoppingCartCheckoutScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    shippingAddresses: PropTypes.array.isRequired,
    userObj: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ShoppingCartCheckoutScreen);

const styles = StyleSheet.create({
    container: {
        margin: moderateScale(10),
    },
    detailContainer: {
        padding: moderateScale(10),
        marginTop: moderateScale(10)
    },
    detailInnerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: moderateScale(15),
        borderColor: LIGHTGREY,
        borderBottomWidth: 1
    },
    detailText: {
        color: SUBNAME
    },
    detailValue: {
        fontWeight: 'bold'
    },
    availReward: {
        color: WHITE
    }
});
