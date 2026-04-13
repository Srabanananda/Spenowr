/**
 *  Created By @name Ramakanta
 */
import React, {useEffect, useState} from 'react';
import { RefreshControl, ScrollView, Text, FlatList } from 'react-native';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import {getAllFindArtist, getAllInstitutesWithFilter} from '../../../../../@Endpoints/Core/Dialog/FindArtiest';
import SliderComponent from './SliderComponent';
import { moderateScale } from 'react-native-size-matters';
import ArtistFilters, { getApiData } from '../Filters';
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import ErrorBoundary from 'react-native-error-boundary';
import EachCard from './Card';
import FallBackUI from '../../../../../@GlobalComponents/FallBackUI';
import { SafeAreaView } from 'react-native-safe-area-context';

export const renderArtistCard = ({ index,item }) =>{
    return(
        <ErrorBoundary FallbackComponent={FallBackUI} key={index}>
            <EachCard each={item} key={index} largeCard={true} />
        </ErrorBoundary>
    );
};

const FindArtistScreen = () =>{

    const [data, setData] = useState({});
    const [loadingOld, setLoadingOld] = useState(true);
    const [loading, setLoading] = useState(true);
    const [dataFilter, setDataFilter] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const defaultSet = {filters : '',find_trainer:''};

    useEffect(()=>{
        const formData = getApiData(defaultSet);
        callApiFilter(0,formData);
    },[]);

    useEffect(() => {
        if (!isFilterApplied) { // Only call API if no filter is applied
            const body = {
                query: '',
                country: 1,
                sort: 'country'
            };
            callApi(body);
        }
    }, [isFilterApplied]); 

    const callApi = (body) =>{
        getAllFindArtist(body)
            .then((response)=>{
                setData(response.data);
            }).catch()
            .finally(()=>{
                setLoadingOld(false);
            });
    };

    const callApiFilter = (limit,dataSet) => {
        setLoading(true);
        getAllInstitutesWithFilter(limit,dataSet)
            .then((response)=>{
                if(!limit)
                    setDataFilter(response.data.list);
                else
                setDataFilter([...dataFilter, ...response.data.list]);
            }).catch()
            .finally(()=>{
                setLoading(false);
            });
    };

    const handleReload = () => {
        const formData = getApiData(defaultSet);
        callApiFilter(dataFilter.length,formData);
    };

    const onRefresh = () =>{
        const formData = getApiData(defaultSet);
        setRefreshing(true);
        setDataFilter([]);
        callApiFilter(0,formData);
        setTimeout(()=>{setRefreshing(false);},500);
    };

    const getFilterData = (dataSet) => {
        let apiData = {};
        if (dataSet.reset) apiData = getApiData(defaultSet);
        else apiData = getApiData({ ...dataSet, ...defaultSet });
        setLoading(true);
        setDataFilter([]);
        setIsFilterApplied(!dataSet.reset); // Set filter applied based on reset status
        callApiFilter(0, apiData);
    };

    return(
        <SafeAreaView edges={['left', 'right']} style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Find Artists'} />
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                style={{padding:moderateScale(10)}}
            >
                 {
                    !isFilterApplied && ( // Conditionally render SliderComponents
                        <>
                            <SliderComponent 
                                artist={true} 
                                data={data.contributors} 
                                loading={loadingOld} 
                                seeMoreLink={'contributors'} 
                                titleText={'Top Contributors'} 
                            />
                            <SliderComponent 
                                artist={true} 
                                data={data.contest_winners_artists} 
                                loading={loadingOld} 
                                seeMoreLink={'top-contest-winners'} 
                                titleText={'Recent Contest Winners'} 
                            />
                            <SliderComponent 
                                data={data.top_rated_dance_schools} 
                                loading={loadingOld} 
                                seeMoreLink={'top-rated-dance-schools'} 
                                titleText={'Top Rated Dance Schools'} 
                            />
                            <SliderComponent 
                                data={data.top_rated_music_schools} 
                                loading={loadingOld} 
                                seeMoreLink={'top-rated-music-schools'} 
                                titleText={'Top Rated Music Schools'} 
                            />
                        </>
                    )
                }
                {
                    isFilterApplied && (
                        loading && !dataFilter.length ?
                            <ScreenLoader text={'Fetching Data...'} />
                            :
                            !dataFilter.length ? 
                                <Text style={GlobalStyles.noDataFound}>No Artists found</Text>
                                :
                                <FlatList
                                    data={dataFilter}
                                    horizontal={false}
                                    initialNumToRender={16}
                                    keyExtractor={item => item.institute_id.toString()}
                                    onEndReached={dataFilter.length > 3 ? handleReload : null}
                                    onEndReachedThreshold={0.3}
                                    refreshControl={
                                        <RefreshControl
                                            onRefresh={onRefresh} 
                                            refreshing={refreshing}
                                            title="Refreshing .."
                                            titleColor={'#000'} 
                                        />
                                    }
                                    removeClippedSubviews={true}
                                    renderItem={renderArtistCard}
                                    showsVerticalScrollIndicator={false}
                                    style={{flex:1, padding: moderateScale(10)}}
                                />
                    )
                }
            </ScrollView>
            <ArtistFilters setFilterData={getFilterData} />
        </SafeAreaView>
    );
};

export default FindArtistScreen;
