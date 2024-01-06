/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getSellerEachOrderDetails } from '../../../../../../@Endpoints/Core/Tabs/MyAccount';
import DefaultHeader from '../../../../../../@GlobalComponents/DefaultHeader';
import FormHeader from '../../../../../../@GlobalComponents/FormHeader';
import ScreenLoader from '../../../../../../@GlobalComponents/ScreenLoader';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import { moderateScale } from 'react-native-size-matters';
import CartItem from '../../../../../../@GlobalComponents/CartItem';
import { GlobalStyles } from '../../../../../../@GlobalStyles';
import { getCurrency } from '../../../../../../@Utils/helperFiles/CardDetails';
import ShippingDetails from './ShippingDetails';
import HTML from 'react-native-render-html';

type Props = {
    route: {
        params: {
            OrderData: Object
        }
    }
}

const SellerOrderDetailsScreen = ({ ...props }: Props) => {
    const { route } = props;
    const { OrderData } = route.params;
    const { orderStatus, order_id, buyerName, sub_order_id } = OrderData;

    const [loader, setLoader] = useState(true);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        callApi();
    }, []);

    const callApi = () => {
        getSellerEachOrderDetails(order_id, buyerName, orderStatus)
            .then(res => {
                setDetails(res.data);
                setLoader(false);
            })
            .catch(() => {
                setLoader(false);
                Toast.show('Oops couldnot load order details', Toast.LONG);
            });
    };

    const getList = () => {
        const {
            order_list = [],
            discount_amount = '',
            currency = '1',
            final_order_amount = '',
            total_amount = '',
            shipping_amount = '',
            delhivery_address = '',
            subOrders = {},
        } = details;

        if (!loader && order_list.length)
            return (
                <ScrollView showsVerticalScrollIndicator={false} >
                    <FormHeader headerText={'Order Items'} />
                    {
                        order_list.map((item, i) => {
                            item.seller_name = item.seller_title;
                            item.cart_product_price = item.product_price;
                            return (
                                <CartItem
                                    containerStyles={{ marginVertical: moderateScale(5) }}
                                    isInactive item={item} key={i} refreshData={callApi} />
                            );
                        })
                    }
                    <FormHeader headerText={'Order Details'} />
                    <View style={[GlobalStyles.primaryCard, styles.detailContainer]}>
                        <View style={styles.detailInnerBox}>
                            <Text style={styles.detailText}>Price</Text>
                            <Text style={styles.detailValue}>{getCurrency(currency)} {total_amount}</Text>
                        </View>
                        <View style={[styles.detailInnerBox, { borderWidth: 0 }]}>
                            <Text style={styles.detailText}>Discount</Text>
                            <Text style={styles.detailValue}>{getCurrency(currency)} {discount_amount}</Text>
                        </View>
                        <View style={styles.detailInnerBox}>
                            <Text style={styles.detailText}>Shipping Fee</Text>
                            <Text style={styles.detailValue}>{getCurrency(currency)} {shipping_amount}</Text>
                        </View>
                        <View style={styles.detailInnerBox}>
                            <Text style={styles.detailText}>Total</Text>
                            <Text style={styles.detailValue}>{getCurrency(currency)} {final_order_amount}</Text>
                        </View>
                    </View>
                    <View style={[GlobalStyles.primaryCard, styles.detailContainer]}>
                        <HTML html={delhivery_address} />
                    </View>
                    {orderStatus === 'PAID' ? <ShippingDetails orderId={sub_order_id} subOrders={subOrders} /> : null}
                </ScrollView>
            );
        if (!loader && !order_list.length)
            return <Text style={{ alignSelf: 'center', marginTop: moderateScale(10) }}>No Order Detail Found</Text>;

        return <ScreenLoader text={'Fetching Orders Details..'} />;
    };

    return (
        <View style={styles.screenContainer}>
            <DefaultHeader headerText={`${sub_order_id}`} />
            <View style={styles.container}>
                {getList()}
            </View>
        </View>
    );
};

export default SellerOrderDetailsScreen;