/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, ScrollView, StyleSheet, View, TouchableOpacity, RefreshControl } from 'react-native';
import { getCartItems } from '../../../@Endpoints/Core/Tabs/Shop';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../@GlobalStyles';
import Toast from 'react-native-simple-toast';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import { moderateScale } from 'react-native-size-matters';
import CartItem from '../../../@GlobalComponents/CartItem';
import PropTypes from 'prop-types';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import Config from '@Config/default';
import { getCurrency } from '../../../@Utils/helperFiles/CardDetails';
import FormHeader from '../../../@GlobalComponents/FormHeader';
import { connect, useDispatch } from 'react-redux';
import * as shopActions from '@Redux/actions/shopActions';

import { useCurrency } from '../../../@Context';
const { COLOR: { LIGHTGREY, SUBNAME } } = Config;

const CartScreen = ({ ...props }) => {

    const { navigation, cartDetails, selectedCurency } = props;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { currency, setCurrency } = useCurrency();
    
    useEffect(() => {
        callApi();
    }, [currency]);

    const callApi = () => {
        setLoading(true);
        let data = {
            currency: currency,
            country: '1'
        }
        dispatch(shopActions.fetchCartDetails(data));
        getCartItems(data)
            .then()
            .catch(() => {
                Toast.show('Oops could not load cart details');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getData = () => {
        const {
            addtocart = [],
            total_price = 0,
            total_price_without_shipping = 0,
            total_shipping_price = 0,
            total_currency = '1',
        } = cartDetails;
        if (!addtocart.length) return (
            <>
                <Text style={GlobalStyles.noDataFound}>No Cart Items added</Text>
                <DefaultButton buttonStyle={styles.myOrderBtn} buttonText='My Orders' onPress={() => navigation.navigate('MyOrders')} />
            </>
        );
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={callApi}
                        title="Refreshing .."
                        titleColor={'#000'} />
                }
                showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {addtocart.map((item, i) => <CartItem containerStyles={{ marginBottom: moderateScale(10) }} item={item} key={i} refreshData={callApi} />)}
                    <View style={[GlobalStyles.primaryCard, styles.detailContainer]}>
                        <FormHeader headerText={'Order Details'} />
                        <View style={styles.detailInnerBox}>
                            <Text style={styles.detailText}>Price</Text>
                            <Text style={styles.detailValue}>{getCurrency(JSON.stringify(total_currency))} {total_price_without_shipping}</Text>
                        </View>
                        <View style={styles.detailInnerBox}>
                            <Text style={styles.detailText}>Shipping Fee</Text>
                            <Text style={styles.detailValue}>{getCurrency(JSON.stringify(total_currency))} {total_shipping_price}</Text>
                        </View>
                        <View style={styles.detailInnerBox}>
                            <Text style={styles.detailText}>Total</Text>
                            <Text style={styles.detailValue}>{getCurrency(JSON.stringify(total_currency))} {total_price}</Text>
                        </View>
                        <DefaultButton buttonText={'Place Order'} onPress={() => navigation.navigate('CartCheckout')} showLoader={false} />
                    </View>
                </View>
            </ScrollView>
        );
    };

    const checkNav = () => {
        navigation.popToTop();
        navigation.navigate('Shop');
    };

    return (
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'My Cart'} inCart={true} showCurr={true} getSelectedCurrency={setCurrency}>
                <TouchableOpacity onPress={checkNav} style={{ ...GlobalStyles.seeMoreButtonRev }}>
                    <Text style={GlobalStyles.seeMoreButtonTextRev} >Continue Shopping</Text>
                </TouchableOpacity>
            </DefaultHeader>
            {loading ? <ScreenLoader text={'Updating Cart'} /> : getData()}
        </SafeAreaView>
    );
};

CartScreen.propTypes = {
    cartDetails: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        cartDetails: state.shop.cartData
    };
};

export default connect(mapStateToProps)(CartScreen);


const styles = StyleSheet.create({
    container: {
        margin: moderateScale(10),
    },
    detailContainer: {
        padding: moderateScale(10)
    },
    orderDetailsText: {
        fontWeight: 'bold', fontSize: moderateScale(14),
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
    myOrderBtn: { width: 140, alignSelf: 'center' }
});