/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import PropTypes from 'prop-types';
import { moderateScale } from 'react-native-size-matters';
import FormHeader from '../../../@GlobalComponents/FormHeader';
import Config from '@Config/default';
import { useNavigation } from '@react-navigation/native';
import BuyAgain from '../../../@GlobalComponents/CartItem/BuyAgain';
import moment from 'moment';

const { COLOR: { SUBANME } } = Config;

const OrderCard = ({ ...props }) => {
    const navigation = useNavigation();
    const { orderDetail } = props;
    const {
        orderid = '',
        product_order_status = '',
        orderStatus = '',
        paymentMode = '',
        sub_total_amount = '',
        creaed_date = '',
        txn_id_payment_gateway = '',
        orderCurrency = ''
    } = orderDetail;

    const getColorCode = () => {
        switch (orderStatus) {
            case 'Cancelled':
                return { color: '#cd2121' };
            case 'Not Applicable':
                return { color: '#cd2121' };
            case 'PAID':
                return { color: '#4CAF50' };
            case 'Payment Pending':
                return { color: '#FFC107' };
            default:
                return { color: '#FFC107' };
        }
    };

    return (
        <View style={[GlobalStyles.primaryCard, styles.container]}>
            <FormHeader headerText={`Order Id :  ${orderid}`} />
            <View style={styles.containerWrapper}>
                <Text style={styles.headerText}>
                    Order Status : <Text style={styles.dataText}>{product_order_status}</Text>
                </Text>
                <Text style={styles.headerText}>
                    Transaction Id : <Text style={styles.dataText}>{txn_id_payment_gateway}</Text>
                </Text>
                <Text style={styles.headerText}>
                    Amount : <Text style={styles.dataText}>{sub_total_amount} {orderCurrency} </Text>
                </Text>
                <Text style={styles.headerText}>
                    Order Date : <Text style={styles.dataText}>{creaed_date ? moment(creaed_date).format('MMMM Do YYYY') : ''}</Text>
                </Text>
                <Text style={styles.headerText}>
                    Payment Mode : <Text style={styles.dataText}>{paymentMode}</Text>
                </Text>
                <Text style={styles.headerText}>
                    Payment Status : <Text style={[styles.dataText, getColorCode()]}>{orderStatus}</Text>
                </Text>
                <View style={styles.buttonWrapper}>
                    <BuyAgain orderId={orderid} />
                    <TouchableOpacity onPress={() => navigation.navigate('OrderDetails', { orderDetail: orderDetail })} style={GlobalStyles.seeMoreButton}>
                        <Text style={GlobalStyles.seeMoreButtonText}>Order Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

OrderCard.propTypes = {
    orderDetail: PropTypes.object.isRequired,
};

export default OrderCard;


const styles = StyleSheet.create({
    container: {
        marginBottom: moderateScale(10),
    },
    containerWrapper: {
        padding: moderateScale(10)
    },
    headerText: {
        color: SUBANME,
        marginVertical: moderateScale(5)
    },
    dataText: {
        fontWeight: 'bold',
        fontSize: moderateScale(14),
    },
    buttonWrapper: {
        flexDirection: 'row',
        width: moderateScale(170),
        justifyContent: 'space-between',
        marginTop: moderateScale(10)
    }
});