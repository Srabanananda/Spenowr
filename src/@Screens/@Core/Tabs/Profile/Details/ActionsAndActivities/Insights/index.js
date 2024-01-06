/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {View,Text,ScrollView,SafeAreaView} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Config from '../../../../../../../@Config/default';
import * as userActions from '../../../../../../../@Redux/actions/userActions';
import { getProfileInsights } from '../../../../../../../@Endpoints/Core/Tabs/EditProfile';
import ContributionsGraph from './Graphs/Contributions';
import EarningsGraph from './Graphs/Earnings';
import VisitCountGraph from './Graphs/VisitCount';
import { connect } from 'react-redux';
import ScreenLoader from '../../../../../../../@GlobalComponents/ScreenLoader';
import DefaultHeader from '../../../../../../../@GlobalComponents/DefaultHeader';

const {COLOR:{APP_THEME_COLOR,WHITE}} = Config;

const ProfileInsightsScreen = ({...props}) =>{

    const {updateUserInsights} = props;

    const [isLoading , setIsLoading] = useState(true);
    const [dataError , setDataError] = useState(false);

    useEffect(()=>{
        checkInsights();
    },[]);

    const checkInsights = () =>{
        getProfileInsights()
            .then(res=>{
                const {data} = res;
                updateUserInsights(data);
                setTimeout(()=>{setIsLoading(false);},300);
            })
            .catch(()=>{
                setDataError(true);
                setIsLoading(false);
            });
    };

    const renderGraphHeader = (headerText = 'GRAPHS') =>{
        return(
            <View 
                style={{
                    backgroundColor:APP_THEME_COLOR,
                    padding:moderateScale(10),
                    width:'95%',
                    marginVertical:moderateScale(10),
                    alignSelf:'center'
                }}
            >
                <Text style={{color:WHITE,fontWeight:'bold'}}>{headerText}</Text>
            </View>
        );
    };

    if(isLoading) return <ScreenLoader text={'Preparing Chart'} />;
    else{
        if(dataError)
            return (
                <View>
                    {renderGraphHeader('NO INSIGHT DATA FOUND')}
                </View>
            );
        return(
            <SafeAreaView>
                <DefaultHeader headerText={'Profile Insights'} />
                <ScrollView contentContainerStyle={{paddingBottom:moderateScale(80)}} showsVerticalScrollIndicator={false}>
                    {renderGraphHeader('MY PROFILE VISIT COUNT')}
                    <VisitCountGraph />
                    {renderGraphHeader('MY CONTRIBUTIONS')}
                    <ContributionsGraph />
                    {renderGraphHeader('MY EARNINGS')}
                    <EarningsGraph />
                </ScrollView>
            </SafeAreaView>
        );
    }

    
};

const mapStateToProps =() =>{
    return {};
};

const  mapDispatchToProp =(dispatch)=>({
    updateUserInsights:data =>
        dispatch(userActions.updateUserInsights(data))
});

export default connect(mapStateToProps,mapDispatchToProp)(ProfileInsightsScreen);