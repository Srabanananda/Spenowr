/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import FormHeader from '../../../../../../@GlobalComponents/FormHeader';
import { GlobalStyles } from '../../../../../../@GlobalStyles';

const OrderCard = ({OrderData}) =>{
    const navigation = useNavigation();
    const {
        order_id,
        orderStatus,
        created_date="",
        sub_order_id,
        suborder_status,
        buyerName="",
        tracking_id,
    } = OrderData;

    const viewDetails = () =>{
        navigation.navigate('SellerOrderDetails',{OrderData});
    };

    const getOrderStatus = () =>{
        switch (suborder_status) {
        case '1':
            return 'Confirmed';
        case '2':
            return 'Shipped';
        case '3':
            return 'Delivered';
        default:
            return 'NA';
        }
    };

    return(
        <View style={[GlobalStyles.primaryCard,styles.orderCardWrapper]}>
            <FormHeader headerText={`Customer Name :  ${buyerName}`} />
            <View style={styles.lowerBox}>
                <View style={styles.dataBox}>
                    <Text style={styles.names}>ID :  </Text>
                    <Text style={styles.values}>{sub_order_id}</Text>
                </View>
                <View style={styles.dataBox}>
                    <Text style={styles.names}>Cust Ref. Id :  </Text>
                    <Text style={styles.values}>{order_id}</Text>
                </View>
                <View style={styles.dataBox}>
                    <Text style={styles.names}>Order Date :  </Text>
                    <Text style={styles.values}>{moment(created_date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                </View>
                <View style={styles.dataBox}>
                    <Text style={styles.names}>Payment Status :  </Text>
                    <Text style={styles.values}>{orderStatus}</Text>
                </View>
                <View style={styles.dataBox}>
                    <Text style={styles.names}>Order Status :  </Text>
                    <Text style={styles.values}>{getOrderStatus()}</Text>
                </View>
                <View style={styles.dataBox}>
                    <Text style={styles.names}>Tracking ID :  </Text>
                    <Text style={styles.values}>{tracking_id === '' ? 'Not Available' : tracking_id}</Text>
                </View>

                <View style={styles.buttonBox}>
                    <TouchableOpacity 
                        onPress={()=>viewDetails()} 
                        style={GlobalStyles.seeMoreButton}
                    >
                        <Text style={GlobalStyles.seeMoreButtonText}>Order Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

OrderCard.propTypes = {
    OrderData:PropTypes.object.isRequired
};

export default OrderCard;