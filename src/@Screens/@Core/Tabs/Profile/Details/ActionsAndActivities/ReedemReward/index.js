/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect,useState } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    ScrollView
} from 'react-native';
import { getRewardPoints } from '../../../../../../../@Endpoints/Core/Tabs/Common';
import DefaultHeader from '../../../../../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../../../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import moment from 'moment';

const {COLOR:{SUBNAME,GREEN,RED}} = Config;

const RedeemRewardScreen = () =>{

    const [loader, setLoader] = useState(true);
    const [earnings, setEarnings] = useState({rewardpoints:[]});

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = () =>{
        getRewardPoints()
            .then(res=>{
                const {data} = res;
                if(data) setEarnings(data);
            })
            .catch()
            .finally(()=>{
                setLoader(false);
            });
    };

    const getData = () =>{
        const {rewardpoints=[]} = earnings;
        if(!rewardpoints?.length) return <Text style={GlobalStyles.noDataFound} >No Reward Earnings Found !!</Text> ;
        return(
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {
                    rewardpoints?.map((reward,i)=>{
                        const { 
                            point_detail,
                            created_date,
                            earned_point,
                            redeemed_point,
                            approve_status,
                            redeem_status,
                            entity_type,
                            title
                        } = reward;
                        return(
                            <View key={i} style={[GlobalStyles.primaryCard,styles.card]}>
                                <View>
                                    {title ? <Text style={styles.title}>Title : {title}</Text> : null}
                                    {entity_type ? <Text style={styles.type}>Type : {entity_type}</Text> : null}
                                    <Text style={styles.details}>{point_detail}</Text>
                                    <Text style={styles.date}>{moment(created_date).format('MMMM Do YYYY, h A')}</Text>
                                </View>
                                <Text style={[styles.points,{color  : approve_status === '1' ? GREEN : RED }]}>
                                    {
                                        approve_status === '1' ? `+ ${earned_point}` : redeem_status === '1' ? `- ${redeemed_point}` : ''
                                    }
                                </Text>
                            </View>
                        );
                    })
                }
            </ScrollView>
        );
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Reward Earnings'} />
            {loader ? <ScreenLoader text={'Fetching ...'} /> :  getData()}
        </SafeAreaView>
    );
};

export default RedeemRewardScreen;

const styles = StyleSheet.create({
    container:{
        padding:moderateScale(10),
    },
    card:{
        padding:moderateScale(10),
        marginBottom:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems : 'center'
    },
    title:{
        fontWeight:'bold',
        fontSize:moderateScale(14)
    },
    type:{
        marginTop:moderateScale(2)
    },
    details:{
        marginTop:moderateScale(4),
        fontSize:moderateScale(11)
    },
    points:{
        fontWeight:'bold',
        fontSize:moderateScale(14)
    },
    date:{
        fontSize:moderateScale(10),
        marginTop:moderateScale(4),
        color:SUBNAME,
    }
});


{/* <LinearGradient 
        colors={['#1D2671','#200122']} 
        end={{ x: 1, y: 0 }} start={{ x: 0, y: 0 }} 
        style={styles.RedeemCard}
    >
        <Text style={styles.headText}>You Earn points for your contribution.</Text>
        <Text style={styles.desc}>You can earn 100 points for product sale.</Text>
        <LinearGradient 
            colors={['#1D2671','#200122']} 
            end={{ x: 1, y: 0 }} start={{ x: 0, y: 0 }} 
            style={styles.circleBox}
        >
            <Text style={styles.points}>{earnedPoints}</Text>
        </LinearGradient>
        <DefaultButton 
            buttonStyle={styles.btn} 
            buttonText={'Redeem Now'} 
            onPress={()=>showMssg()} 
            showLoader={false} 
            textStyle={styles.txt}
        />
    </LinearGradient>
    <LinearGradient 
        colors={['#200122','#6f0000']} 
        end={{ x: 1, y: 0 }} start={{ x: 0, y: 0 }} 
        style={styles.RedeemCard}
    >
        <Text style={styles.headText}>You Redeem the reward points earned.</Text>
        <Text style={styles.desc}>You can earn 100 points for product sale.</Text>
        <LinearGradient 
            colors={['#200122','#6f0000']} 
            end={{ x: 1, y: 0 }} start={{ x: 0, y: 0 }} 
            style={styles.circleBox}
        >
            <Text style={styles.points}>{redeemPoints}</Text>
        </LinearGradient>
    </LinearGradient> */}