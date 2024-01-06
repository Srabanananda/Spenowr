/**
 *  Created By @name Ramakanta
 */
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, SafeAreaView,Text} from 'react-native';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import EachCard from './Card';
import {getAllInstitutes} from '../../../../../@Endpoints/Core/Dialog/FindArtiest';
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import { moderateScale } from 'react-native-size-matters';
import ArtistFilters, { getApiData } from '../Filters';
import FallBackUI from '../../../../../@GlobalComponents/FallBackUI/index';
import ErrorBoundary  from 'react-native-error-boundary';

const FindTrainersScreen = () =>{

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const defaultSet = {find_trainer:'trainers'};

    useEffect(()=>{
        const formData = getApiData(defaultSet);
        callApi(0,formData);
    },[]);

    const callApi = (limit,formData) => {
        setLoading(true);
        getAllInstitutes(limit,formData)
            .then((response)=>{
                if(!limit)
                    setData(response.data.list);
                else
                    setData([...data, ...response.data.list]);
            }).catch().finally(()=>{
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
        return( 
            <ErrorBoundary FallbackComponent={FallBackUI} key={index}>
                <EachCard each={item} filter='' key={index} largeCard={true} showClaimForm={false} />
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
            <DefaultHeader headerText={'Find Trainers'} />
            {
                loading && !data.length ?
                    <ScreenLoader text={'Fetching trainers...'} />
                    :
                    !data.length ? 
                        <Text style={GlobalStyles.noDataFound}>No Trainers found</Text>
                        :
                        <FlatList
                            data={data}
                            horizontal={false}
                            initialNumToRender={16}
                            keyExtractor={item => item.institute_id.toString()}
                            onEndReached={data.length === 1 ? null : handleReload}
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
            <ArtistFilters setFilterData={getFilterData} showStates />
        </SafeAreaView>
    );
};

export default FindTrainersScreen;
