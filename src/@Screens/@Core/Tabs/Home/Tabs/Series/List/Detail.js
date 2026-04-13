/**
 * Create By @name Sukumar_Abhijeet
 */

import React, { useCallback, useEffect,useState } from 'react';
import { Text,FlatList,View,RefreshControl, Image, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScreenLoader from '@GlobalComponents/ScreenLoader';
import { moderateScale } from 'react-native-size-matters';
import * as homeActions from '@Redux/actions/homeActions';
import Config from '@Config/default';
import {TouchableRipple} from 'react-native-paper';
// import MyAdView from '../../../../../../@Common/AdView'

import { getSeriesDetails } from '../../../../../../../@Endpoints/Core/Tabs/More';
// import Card from './SeriesCard';
import Card from '../../WhatsNew/WhatsNewCard';
import Filters from '../../WhatsNew/filters';
// import { TabsFormData } from '../..';
import useUserData from '../../../../../../../@Hooks/useUser';
import { getUserDetailsNew } from '../../../../../../../@Endpoints/Auth';
import SimpleToast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';

const {NEW_IMG_BASE,DUMMY_IMAGE_URL,COLOR:{WHITE,APP_PINK_COLOR,DARK_BLACK,LIGHTGREY,SUBNAME,RED,APP_THEME_COLOR}} = Config;

const Details = (props) =>{
    const {
        fetchBySpenowrFeed,bySpenowrFeed,
        apiCalled,updateFeed,
        appliedFilters,
        fetchManagedAds,
        managedAds,
        navigation,
        route
    } = props;
    const { series_id } = route?.params
    const [refreshing,setRefreshing] = useState(false);
    const [subscription, setSubscription] = useState();
    const [seriesList, setSeriesList] = useState([]);
    const {UserProfileData} = useUserData();
    const [seriesDetailList, setSeriesDetailList] = useState({});
    const [otherSeries, setOtherSeries] = useState([]);

    console.log('updateFeedupdateFeed',props);

   const callApi = useCallback(() => {
        getSeriesDetails(series_id)
            .then(res => {
                console.log('====================================');
                console.log('response of series details', res);
                console.log('====================================');
                setOtherSeries(res?.data?.otherSeriesDetails)
                const { articleData, seriesDetailsList } = res?.data;
                setSeriesList(articleData);
                setSeriesDetailList(seriesDetailsList);
            })
            .catch(() => SimpleToast.show('Oops Something went wrong'));
    }, [series_id]);

    useEffect(() => {
        callApi();
    }, [callApi]);

    const onRefresh = () =>{
        setRefreshing(true);
        // updateFeed('spenowr');
        callApi();
        setTimeout(()=>{setRefreshing(false);},500);
    };

    const truncateText = (text, limit) => {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    };

    const renderPages = ({ index,item }) => <Card ref={ref => trackPlayerRef = ref}  info={item} key={item.id} songs={seriesList} />
  
    if (!seriesList.length) return <ScreenLoader text={'Loading data..'} />;

    return (
        <FlatList
            ListHeaderComponent={
                <View style={{
                    backgroundColor: WHITE,
                    width: '95%',
                    borderColor: LIGHTGREY,
                    paddingHorizontal: moderateScale(10),
                    marginBottom: moderateScale(10),
                    alignSelf: 'center',
                    borderRadius: 6,
                    paddingBottom: moderateScale(10),
                    paddingTop: moderateScale(10)
                }}>
                    <FastImage
                        source={{ uri: NEW_IMG_BASE + seriesDetailList.series_image }}
                        style={{ width: '100%', height: moderateScale(150), borderRadius: moderateScale(6), alignSelf: 'center' }}
                    />
                    <View style={{ flexDirection: 'row', marginTop: moderateScale(15) }}>
                        <Text style={{ color: '#EF2D56', fontWeight: 'bold', fontSize: 15 }}>Series Title: </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, width: '80%', }}>{seriesDetailList.series_title}</Text>
                    </View>
                    <Text style={{ fontSize: 12 }}><Text style={{ fontWeight: 'bold' }}>Description: </Text>{seriesDetailList.series_description}</Text>
                </View>
            }
            ListFooterComponent={
                <View style={{paddingBottom:20, flex:1, backgroundColor:'#fff', width:'95%', alignSelf:'center'}}>
                    <Text style={{fontSize: 21, fontWeight: 'bold', marginBottom: 10, marginTop: 20, marginLeft:10}}>
                    Recommended Series
            </Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {otherSeries && otherSeries.map((each, position) => {
                    return (
                        <TouchableRipple 
                            key={position+'Element'}
                            onPress={() => {
                                navigation.push('SeriesDetails', { series_id: each.series_id });
                            }}
                            style={{
                                width: 100, // Set a width for each item
                                marginLeft:10
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column', // Stack image and text vertically
                                    width: '100%',
                                    alignItems: 'center',
                                }}
                            >
                                <View style={{
                                    width: '100%',
                                    height: 80, // Set a fixed height for the image
                                }}>
                                    <Image
                                        resizeMode={'stretch'}
                                        source={{uri: each.series_image !== "" ? NEW_IMG_BASE + each.series_image : DUMMY_IMAGE_URL}}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </View>
                                <View style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    marginTop: 8,
                                }}>
                                    <Text style={{fontSize: 14, textAlign: 'center'}}>
                                        {truncateText(each.series_title, 20)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableRipple>
                    );
                })}
            </ScrollView>
                </View>
            }
            contentContainerStyle={{ paddingTop: moderateScale(6), flexGrow: 1 }}
            data={seriesList}
            keyExtractor={item => item.id}
            renderItem={renderPages}
            onEndReachedThreshold={0.3}
            onEndReached={() => {
                // Implement pagination logic here if needed
            }}
            refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} title="Refreshing .." titleColor={'#000'} />
            }
            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            initialNumToRender={16}
            updateCellsBatchingPeriod={100}
            windowSize={10}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, marginTop: moderateScale(5) }}
        />
    );
};

export default Details;