/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../@GlobalStyles';
import {getMyOrderInvoicesList, getMyOrdersList} from '../../../@Endpoints/Core/Tabs/EditProfile';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import OrderCard from './orderCard';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import InvoiceCard from './InvoiceCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const {COLOR :{APP_PINK_COLOR}} = Config;

const MyOrdersScreen = ({...props}) =>{
    const {navigation} = props;
    
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [invoiceData, setInvoiceData] = useState({});
    const [index, setIndex] = useState(1)

    useEffect(()=>{
        callApi();
        callApiOfGetInvoiceList();
    },[]);

    const callApi = () =>{
        getMyOrdersList()
            .then(res=>{
                setData(res.data);
            })
            .catch(()=>{
                Toast.show('Oops Something went wrong');
                setTimeout(()=>{
                    navigation.goBack();
                },400);
            })
            .finally(()=>setLoading(false));
    };

    const callApiOfGetInvoiceList = () => {
        getMyOrderInvoicesList()
        .then(res=>{
            console.log('Invoice API Response:', res.data);
            setInvoiceData(res.data);
        })
        .catch(()=>{
            Toast.show('Oops Something went wrong');
            setTimeout(()=>{
                navigation.goBack();
            },400);
        })
        .finally(()=>setLoading(false));
};

    const getData = () =>{
        const {order_list=[]} = data;
        if(!order_list.length) return <Text style={GlobalStyles.noDataFound}>No Orders found</Text>;
        return (
            <ScrollView>
                <View style={styles.container}>
                    {order_list.map((order,i)=>(<OrderCard key={i} orderDetail={order} />))}
                </View>
            </ScrollView>
        );
    };

    const getDataInvoice = () => {
        const {invoice=[]} = invoiceData;
        if(!invoice.length) return <Text style={GlobalStyles.noDataFound}>No Invoices found</Text>;
        return (
            <ScrollView>
                <View style={styles.container}>
                    {invoice.map((order,i)=>(<InvoiceCard key={i} invoiceDetail={order} />))}
                </View>
            </ScrollView>
        );
    }

    return(
        <SafeAreaView edges={['left', 'right']} style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'My Orders'} />
            <View style={{flexDirection:'row', width:'95%', alignSelf:'center', marginTop:20, justifyContent:'center'}}>
                <TouchableOpacity onPress={() => setIndex(1)} style={[index == 1 ? styles.activeTab : styles.inactiveTab, {marginRight:10}]}>
                    <Text style={{color: index == 1 ? '#fff' : APP_PINK_COLOR, fontSize:16, fontWeight:'bold'}}>My Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIndex(2)} style={[index == 2 ? styles.activeTab : styles.inactiveTab, {marginLeft:10}]}>
                    <Text style={{color: index == 2 ? '#fff' : APP_PINK_COLOR, fontSize:16, fontWeight:'bold'}}>My Invoices</Text>
                </TouchableOpacity>
            </View>
            {/* {loading? <ScreenLoader text={'Fetching details'} /> : getData()} */}
            {loading ? (
            <ScreenLoader text={'Fetching details'} />
            ) : (
                index == 1 ? getData() : getDataInvoice()
            )}
        </SafeAreaView>
    );
};

MyOrdersScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
    container:{
        padding:moderateScale(10)
    },
    activeTab: {
        backgroundColor: APP_PINK_COLOR, 
        width:'46.5%', 
        padding:10, 
        borderRadius:5, 
        alignItems:'center', 
    },
    inactiveTab: {
        backgroundColor: '#fff', 
        width:'46.5%', 
        padding:10, 
        borderRadius:5, 
        alignItems:'center',
        borderColor:APP_PINK_COLOR, 
        borderWidth:1
    }
});