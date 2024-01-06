/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {SafeAreaView,Text,StyleSheet,View} from 'react-native';
import { GlobalStyles } from '../../../../../../../@GlobalStyles/index';
import DefaultHeader from '../../../../../../../@GlobalComponents/DefaultHeader/index';
import { fetchMyEarnings } from '../../../../../../../@Endpoints/Core/Tabs/EditProfile';
import ScreenLoader from '../../../../../../../@GlobalComponents/ScreenLoader';
import Toast from 'react-native-simple-toast';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';

const {COLOR:{SUBNAME}} = Config;

const MyEarningsScreen = () =>{

    const [loading, setLoading] = useState(true);
    const [earnings, setEarnings] = useState([]);

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = () =>{
        fetchMyEarnings()
            .then(({data})=>{
                const {referUser=[]} = data;
                setEarnings(referUser);
            })
            .catch(()=>{
                Toast.show('Oops something went wrong');
            })
            .finally(()=>setLoading(false));
    };

    const renderEachEarning = (earning,i) =>{
        const {payment_amount,payment_source,payment_status,payment_message} = earning;
        
        return(
            <View key={i} style={[GlobalStyles.primaryCard,styles.card]}>
                <Text style={styles.source}>{payment_source}</Text>
                {payment_message ? <Text style={styles.message}>{payment_message}</Text> : null}
                <Text>Amount: {payment_amount}</Text>
                <Text>Status: {payment_status.toUpperCase()}</Text>
            </View>
        );
    };

    const getData = () =>{
        if(!earnings.length) return<Text style={GlobalStyles.noDataFound}>No Earnings Found</Text>;
        return(
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {
                    earnings.map((earning,i)=>renderEachEarning(earning,i))
                }
            </ScrollView>
        );
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'My Earnings'} />
            {loading? <ScreenLoader text={'Fetching...'} /> : getData()}
        </SafeAreaView>
    );
};

export default MyEarningsScreen;
const styles = StyleSheet.create({
    scrollContainer:{
        padding:moderateScale(20)
    },
    card:{
        marginBottom:moderateScale(10),
        padding:moderateScale(10)
    },
    source:{
        fontWeight:'bold',
        fontSize:moderateScale(14)
    },
    message:{
        color:SUBNAME,
        marginTop:moderateScale(2)
    }
});