/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {ScrollView, View, Text} from 'react-native';
import { getSellerOrderList } from '../../../../../../@Endpoints/Core/Tabs/MyAccount';
import ScreenLoader from '../../../../../../@GlobalComponents/ScreenLoader';
import OrderCard from './OrderCard';
import styles from './styles';
import Toast from 'react-native-simple-toast';

const SellerReceivedOrder = () =>{

    const [orderList , setOrderList] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(()=>{
        apiCall();
    },[]);

    const apiCall = () =>{
        getSellerOrderList()
            .then(res=>{
                setLoader(false);
                const {data:{order_list=[]}} = res;
                setOrderList(order_list);
            })
            .catch(()=>{
                setLoader(false);
                Toast.show('Oops couldnot load Orders',Toast.LONG);
            });
    };

    const getList = () =>{
        if(!loader && orderList.length)
            return(
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        orderList.map((item,index)=>(
                            <OrderCard OrderData={item} key={index} />
                        ))
                    }
                </ScrollView>
            );
        if(!loader && !orderList.length)
            return <Text>No Orders Found</Text>;

        return <ScreenLoader text={'Fetching Orders List..'} />;
        
    };

    return(
        <View style={styles.container}>
            {getList()}
        </View>
    );
};

export default SellerReceivedOrder;