/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState} from 'react';
import {SafeAreaView,RefreshControl,FlatList,Text} from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { moderateScale } from 'react-native-size-matters';
import { getAllCourses } from '../../../../../@Endpoints/Core/Dialog/FindArtiest';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import FallBackUI from '../../../../../@GlobalComponents/FallBackUI';
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import ArtistFilters, { getApiData } from '../Filters';
import EachCard from './Card';

const CustomOrdersScreen = () =>{
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const defaultSet = {isCustom:true};

    useEffect(()=>{
        const formData = getApiData(defaultSet);
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
        const formData = getApiData(defaultSet);
        callApi(data.length,formData);
    };

    const onRefresh = () =>{
        const formData = getApiData(defaultSet);
        setRefreshing(true);
        setData([]);
        callApi(0,formData);
        setTimeout(()=>{setRefreshing(false);},500);
    };

    const renderPages = ({ index,item }) =>{
        return (
            <ErrorBoundary FallbackComponent={FallBackUI} key={index}>
                <EachCard each={item} key={index} largeCard={true} />
            </ErrorBoundary>
        );
    };

    const getFilterData = dataSet =>{
        let apiData = {};
        if(dataSet.reset) apiData = getApiData(defaultSet);
        else apiData = getApiData(dataSet);
        setLoading(true);
        setData([]);
        callApi(0,apiData);
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Custom Artworks'} />
            {
                loading && !data.length ?
                    <ScreenLoader text={'Fetching ...'} />
                    :
                    !data.length ? 
                        <Text style={GlobalStyles.noDataFound}>No Custom Orders found</Text>
                        :
                        <FlatList
                            data={data}
                            horizontal={false}
                            initialNumToRender={16}
                            keyExtractor={item => item.institute_id.toString()}
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
            <ArtistFilters isCustom setFilterData={getFilterData} showServiceType showStates />
        </SafeAreaView>
    );
};

export default CustomOrdersScreen;