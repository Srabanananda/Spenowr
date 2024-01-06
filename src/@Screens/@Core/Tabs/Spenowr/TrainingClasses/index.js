/**
 *  Created By @name Ramakanta
 */
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, SafeAreaView,Text} from 'react-native';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import {getAllCourses} from '../../../../../@Endpoints/Core/Dialog/FindArtiest';
import EachCard from './Card';
import { moderateScale } from 'react-native-size-matters';
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import ArtistFilters, { getApiData } from '../Filters';

const TrainingClassesScreen = () =>{

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const formData = getApiData();
        callApi(0,formData);
    },[]);

    const callApi = (limit,dataSet) => {
        setLoading(true);
        getAllCourses(limit,dataSet)
            .then((response)=>{
                if(!limit)
                    setData(response.data.list);
                else
                    setData([...data, ...response.data.list]);
            }).catch()
            .finally(()=>{
                setLoading(false);
            });
    };

    const handleReload = () => {
        const formData = getApiData();
        callApi(data.length,formData);
    };

    const onRefresh = () =>{
        const formData = getApiData();
        setRefreshing(true);
        setData([]);
        callApi(0,formData);
        setTimeout(()=>{setRefreshing(false);},500);
    };

    const renderPages = ({ index,item }) =>{
        return <EachCard each={item} key={index} largeCard={true} />;
    };

    const getFilterData = dataSet =>{
        let apiData = {};
        if(dataSet.reset) apiData = getApiData();
        else apiData = getApiData(dataSet);
        setLoading(true);
        setData([]);
        callApi(0,apiData);
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Training Classes'} />
            {
                loading && !data.length ?
                    <ScreenLoader text={'Fetching ...'} />
                    :
                    !data.length ?  
                        <Text style={GlobalStyles.noDataFound}>No Courses found</Text>
                        :
                        <FlatList
                            data={data}
                            horizontal={false}
                            initialNumToRender={16}
                            keyExtractor={(item,index) => `${item.institute_id}_trainingClass${index}`}
                            onEndReached={handleReload}
                            refreshControl={
                                <RefreshControl
                                    onRefresh={onRefresh} refreshing={refreshing}
                                    title="Refreshing .."
                                    titleColor={'#000'} />
                            }
                            removeClippedSubviews={true}
                            renderItem={renderPages}
                            showsVerticalScrollIndicator={false}
                            style={{flex: 1,padding:moderateScale(10)}}
                        />
            }
            <ArtistFilters setFilterData={getFilterData} showServiceType showStates />
        </SafeAreaView>
    );
};

export default TrainingClassesScreen;
