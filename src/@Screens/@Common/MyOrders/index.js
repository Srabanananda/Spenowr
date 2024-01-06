/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect,useState } from 'react';
import {SafeAreaView,StyleSheet,Text,View,ScrollView} from 'react-native';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../@GlobalStyles';
import {getMyOrdersList} from '../../../@Endpoints/Core/Tabs/EditProfile';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import OrderCard from './orderCard';
import { moderateScale } from 'react-native-size-matters';

const MyOrdersScreen = ({...props}) =>{
    const {navigation} = props;
    
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});


    useEffect(()=>{
        callApi();
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

    const getData = () =>{
        const {order_list=[]} = data;
        if(!order_list.length) return<Text style={GlobalStyles.noDataFound}>No Orders found</Text>;
        return (
            <ScrollView>
                <View style={styles.container}>
                    {order_list.map((order,i)=>(<OrderCard key={i} orderDetail={order} />))}
                </View>
            </ScrollView>
        );
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'My Orders'} />
            {loading? <ScreenLoader text={'Fetching details'} /> : getData()}
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
    }
});