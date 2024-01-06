/**
 *  Created By @name Sukumar_Abhijeet
 */

import React, { useState,useEffect } from 'react';
import {
    FlatList,RefreshControl,
    Text
} from 'react-native';

import { fetchServiceCourseData } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import DefaultCard from './card';
import { moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import ScreenLoader from '../../../../../../../../@GlobalComponents/ScreenLoader';
import { useIsFocused } from '@react-navigation/native';

const MyServices = ({...props}) =>{

    const {mode,publicUserData} = props;
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);
    const [servicesList, setServicesList] = useState([]);  
    const [refreshing,setRefreshing] = useState(false);

    useEffect(()=>{
        if(isFocused)
            if(mode === 'PRIVATE') callApi();
            else setServicesList(publicUserData.courses);
    },[isFocused]);

    const onRefresh = () =>{
        if(mode === 'PRIVATE')
        {
            setRefreshing(true);
            callApi();
            setTimeout(()=>{setRefreshing(false);},500);
        }
    };

    const callApi =() => 
    {
        setLoading(true);
        fetchServiceCourseData()
            .then(res=>{
                const {data:{courses=[]}} = res;
                setServicesList(courses);
            })
            .catch()
            .finally(()=>setLoading(false));
    };

    const  _renderFlatListAdapter = ({ item }) => {
        return <DefaultCard cardData={item} mode={mode} refreshData={onRefresh} />;
    };

    if(loading)
        return <ScreenLoader text={'Fetching Courses..'} />;

    if(!loading && servicesList.length)
        return(
            <FlatList
                contentContainerStyle={{paddingTop:moderateScale(10)}}
                data={servicesList}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh} refreshing={refreshing}
                        title="Refreshing .."
                        titleColor={'#000'} />
                }
                renderItem={_renderFlatListAdapter}
                showsVerticalScrollIndicator={false}
            >
            </FlatList>
        );

    if(!loading && !servicesList.length)
        return<Text style={{alignSelf:'center',marginTop:moderateScale(20),fontSize:moderateScale(12)}}>No Services available</Text>;
    
    return null;
};

const mapStateToProps = (state) => {
    return {
        publicUserData: state.userObj.publicUserData
    };
};


export default connect(mapStateToProps)(MyServices);
