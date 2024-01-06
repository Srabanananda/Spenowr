/**
 *  Created By @name Ramakanta
 *  Edited By @name: Sukumar Abhijeet
 */

import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, SafeAreaView,Text} from 'react-native';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import {getAllInstitutesWithFilter} from '../../../../../@Endpoints/Core/Dialog/FindArtiest';
import EachCard from './Card';
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import { moderateScale } from 'react-native-size-matters';
import ArtistFilters, { getApiData } from '../Filters';
import FallBackUI from '../../../../../@GlobalComponents/FallBackUI';
import ErrorBoundary from 'react-native-error-boundary';

export const renderArtistCard = ({ index,item }) =>{
    return(
        <ErrorBoundary FallbackComponent={FallBackUI} key={index}>
            <EachCard each={item} key={index} largeCard={true} />
        </ErrorBoundary>
    );
};

const ViewMoreArtistScreen = ({...props}) =>{

    const {route: {params: {filter}}} = props;

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const defaultSet = {filters:filter,find_trainer:''};

    useEffect(()=>{
        const formData = getApiData(defaultSet);
        callApi(0,formData);
    },[]);

    const callApi = (limit,dataSet) => {
        setLoading(true);
        getAllInstitutesWithFilter(limit,dataSet)
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

    const getFilterData = dataSet =>{
        let apiData = {};
        if(dataSet.reset) apiData = getApiData(defaultSet);
        else apiData = getApiData({...dataSet,...defaultSet});
        setLoading(true);
        setData([]);
        callApi(0,apiData);
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'All Artists'} />
            {
                loading && !data.length ?
                    <ScreenLoader text={'Fetching Data...'} />
                    :
                    !data.length ? 
                        <Text style={GlobalStyles.noDataFound}>No Artists found</Text>
                        :
                        <FlatList
                            data={data}
                            horizontal={false}
                            initialNumToRender={16}
                            keyExtractor={item=>item.institute_id.toString()}
                            onEndReached={data.length > 3 ? handleReload : null}
                            onEndReachedThreshold={0.3}
                            refreshControl={
                                <RefreshControl
                                    onRefresh={onRefresh} refreshing={refreshing}
                                    title="Refreshing .."
                                    titleColor={'#000'} />
                            }
                            removeClippedSubviews={true}
                            renderItem = {renderArtistCard}
                            showsVerticalScrollIndicator={false}
                            style={{flex:1,padding:moderateScale(10)}}
                        />
            }
            <ArtistFilters setFilterData={getFilterData} />
        </SafeAreaView>
    );
};

export default ViewMoreArtistScreen;
