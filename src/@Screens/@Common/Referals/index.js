/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect,useState } from 'react';
import {SafeAreaView,View,Text, StyleSheet,ScrollView} from 'react-native';
import { getReferalsList } from '../../../@Endpoints/Core/Tabs/Common';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../@GlobalStyles';
import Toast from 'react-native-simple-toast';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import { moderateScale } from 'react-native-size-matters';
import { capitalize } from 'lodash';
import Config from '@Config/default';
import InviteFriends from './InviteFriend';

const {COLOR:{SUBNAME,APP_PINK_COLOR}} = Config;

const ReferalsScreen = ({...props}) =>{

    const [loading, setLoading] = useState(true);
    const [referals, setReferals] = useState([]);

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = () =>{
        getReferalsList()
            .then(res=>{
                const {data:{referUser=[]}} = res;
                setReferals(referUser);
            })
            .catch(()=>{
                Toast.show('Oops couldnot load details');
            })
            .finally(()=>{
                setLoading(false);
            });
    };

    const getStatus = (referal_status) =>{
        if(referal_status === '2') return 'Pending';
        else return 'Accepted';
    };

    const EachReferal = ({referal}) =>{
        const {referal_code='',first_name='',last_name='',email='',referal_status} = referal;
        return(
            <View style={[GlobalStyles.primaryCard,styles.card]}>
                <Text style={styles.name}>{`${capitalize(first_name)} ${last_name}`} <Text style={referal_status === '2' ? styles.status : styles.statusAccepted}>({getStatus(referal_status)})</Text></Text>
                <Text style={styles.email}>{email}</Text>
                <Text style={styles.email}>Referal Code : <Text style={styles.referalCode}>{referal_code}</Text> </Text>
            </View>
        );
    };

    const renderData = () =>{
        if(!referals.length) return <Text style={GlobalStyles.noDataFound}>No Referals yet!</Text>;
        return(
            <ScrollView style={styles.container}>
                {
                    referals.map((item,i)=>(
                        <EachReferal key={i} referal={item} />
                    ))
                }
            </ScrollView>
        );
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Your Referals'} >
                <InviteFriends onInviteComplete={callApi} />
            </DefaultHeader>
            {loading ? <ScreenLoader text={'Fetching Details'} /> : renderData()}
        </SafeAreaView>
    );
};

export default ReferalsScreen;

const styles = StyleSheet.create({
    container:{
        margin:moderateScale(10)
    },
    card:{
        padding:moderateScale(10),marginBottom:moderateScale(10)
    },
    name:{
        fontWeight:'bold',
        fontSize:moderateScale(16)
    },
    email:{
        color:SUBNAME,
        marginTop:moderateScale(5),
        fontSize:moderateScale(12)
    },
    referalCode:{
        color:APP_PINK_COLOR,
        fontWeight:'bold'
    },
    status:{
        fontWeight:'400',
        fontSize:moderateScale(12),
        color:APP_PINK_COLOR
    },
    statusAccepted:{
        fontWeight:'400',
        fontSize:moderateScale(12),
        color:'green'
    }
});