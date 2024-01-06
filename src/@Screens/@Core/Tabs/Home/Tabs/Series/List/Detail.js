/**
 * Create By @name Sukumar_Abhijeet
 */

import React, { useEffect,useState } from 'react';
import { Text,FlatList,View,RefreshControl, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScreenLoader from '@GlobalComponents/ScreenLoader';
import { moderateScale } from 'react-native-size-matters';
import * as homeActions from '@Redux/actions/homeActions';
import Config from '@Config/default';
// import MyAdView from '../../../../../../@Common/AdView'

import { getSeriesDetails } from '../../../../../../../@Endpoints/Core/Tabs/More';
// import Card from './SeriesCard';
import Card from '../../WhatsNew/WhatsNewCard';
import Filters from '../../WhatsNew/filters';
// import { TabsFormData } from '../..';
import useUserData from '../../../../../../../@Hooks/useUser';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import { getUserDetailsNew } from '../../../../../../../@Endpoints/Auth';

const  {COLOR:{SUBNAME}} = Config;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = () =>{
        getSeriesDetails(series_id)
        .then(res=>{
            const { articleData, seriesList } = res?.data
            console.log('articleData : ', res?.data);
            setSeriesList(articleData);
        })
        .catch(()=>SimpleToast.show('Oops Something went wrong'))
        .finally(()=>setLoader(false));
    };

    const onRefresh = () =>{
        setRefreshing(true);
        updateFeed('spenowr');
        callApi();
        setTimeout(()=>{setRefreshing(false);},500);
    };

    const scrollHandler = useAnimatedScrollHandler((event) => {
        // yAxisAnimatedValue.value = event.contentOffset.y;
    });

    const renderPages = ({ index,item }) => <Card ref={ref => trackPlayerRef = ref}  info={item} key={index} songs={seriesList} />
  
    if(seriesList.length)
        return(
            <View style={{flex:1,marginTop:moderateScale(5)}}>
                <AnimatedFlatList
                    ListFooterComponent={()=><ActivityIndicator color={'red'} />} 
                    contentContainerStyle={{paddingTop:moderateScale(6)}}
                    data={seriesList}
                    horizontal={false}
                    initialNumToRender={5}
                    keyExtractor={item=>item.id}
                    onEndReachedThreshold={0.3} 
                    onScroll={scrollHandler}
                    refreshControl={
                        <RefreshControl
                            onRefresh={onRefresh} refreshing={refreshing}
                            title="Refreshing .."
                            titleColor={'#000'} />
                    }
                    renderItem = {renderPages}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    style={{flex:1}}
                />
            </View>
        );
    if(!seriesList.length)
        return(
            <ScreenLoader text={'Loading data..'} />
        );
    
    if(!seriesList.length)
        return(
            <>
                <Text style={{alignSelf:'center',marginTop:moderateScale(50),color:SUBNAME}}> No Feed Found !!</Text>
            </>
        ); 
};

export default Details;