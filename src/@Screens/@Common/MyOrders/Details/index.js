/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import DefaultHeader from '../../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../@GlobalStyles';
import Toast from 'react-native-simple-toast';
import { getMyOrdersDetails } from '../../../../@Endpoints/Core/Tabs/EditProfile';
import PropTypes from 'prop-types';
import CartItem from '../../../../@GlobalComponents/CartItem';
import { moderateScale } from 'react-native-size-matters';
import FormHeader from '../../../../@GlobalComponents/FormHeader';
import { getCurrency } from '../../../../@Utils/helperFiles/CardDetails';
import Config from '@Config/default';
import ErrorBoundary from 'react-native-error-boundary';
import FallBackUI from '@GlobalComponents/FallBackUI';
import WebView from 'react-native-webview';

const { COLOR: { LIGHTGREY, SUBNAME } } = Config;

const OrderDetailsScreen = ({ ...props }) => {
    const { route: { params: { orderDetail } }, navigation } = props;
    const {
        orderid,
        sub_total_amount,
        coupon_discount_amount = '',
        shipping_address = '',
    } = orderDetail;
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState(false);
    useEffect(() => {
        callApi();
    }, []);

    const callApi = () => {
        getMyOrdersDetails(orderid)
            .then(res => {
                const { data = {} } = res;
                setDetails(data);
            })
            .catch(() => {
                Toast.show('Oops Something went wrong');
                setTimeout(() => {
                    navigation.goBack();
                }, 400);
            })
            .finally(() => setLoading(false));
    };

    const getData = () => {
        const {
            user_order_list = [], currency = '1',
            delv_charges = '', total_product_amount = '',
        } = details;
        console.log('shipping_address',shipping_address);

        const alterData = (node) => {
            let { parent, data } = node;
            if (parent && parent.name === 'div') {
                if (parent && parent.name === 'span') {
                    return data + '<br>'
                }
            }
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <FormHeader headerText={'Order Items'} />
                    {user_order_list.map((item, i) => {
                        item.seller_name = item.seller_title;
                        item.cart_product_price = item.total_price;
                        return (
                            <ErrorBoundary FallbackComponent={FallBackUI} key={i}>
                                <CartItem containerStyles={{ marginVertical: moderateScale(5) }} isInactive item={item} refreshData={callApi} />
                            </ErrorBoundary>
                        );

                    }
                    )}
                    <FormHeader headerText={'Order Details'} />
                    <View style={[GlobalStyles.primaryCard, styles.detailContainer]}>
                        <View style={styles.detailInnerBox}>
                            <Text style={styles.detailText}>Price</Text>
                            <Text style={styles.detailValue}>{getCurrency(currency)} {total_product_amount}</Text>
                        </View>
                        <View style={[styles.detailInnerBox, { borderWidth: 0 }]}>
                            <Text style={styles.detailText}>Discount</Text>
                            <Text style={styles.detailValue}>{getCurrency(currency)} {coupon_discount_amount}</Text>
                        </View>
                        <View style={styles.detailInnerBox}>
                            <Text style={styles.detailText}>Shipping Fee</Text>
                            <Text style={styles.detailValue}>{getCurrency(currency)} {delv_charges}</Text>
                        </View>
                        <View style={styles.detailInnerBox}>
                            <Text style={styles.detailText}>Total</Text>
                            <Text style={styles.detailValue}>{getCurrency(currency)} {sub_total_amount}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyles.primaryCard, styles.detailContainer]}>
                        <Text style={styles.detailText}>Shipping Address</Text>
                        <WebView 
                            style={{height: moderateScale(150), width: '100%'}}
                            originWhitelist={['*']}
                            textZoom={350}
                            source={{ html: shipping_address }}
                        /> 
                    </View>
                </View>
            </ScrollView>
        );
    };
    return (
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={`Order - ${orderid}`} />
            {loading ? <ScreenLoader text={'Fetching details'} /> : getData()}
        </SafeAreaView>
    );
};

OrderDetailsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};


export default OrderDetailsScreen;

const styles = StyleSheet.create({
    container: {
        padding: moderateScale(10)
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
    }
});