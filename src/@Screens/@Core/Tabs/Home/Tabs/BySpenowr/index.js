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
import MyAdView from '../../../../../@Common/AdView'

import Card from '../WhatsNew/WhatsNewCard';
import Filters from '../WhatsNew/filters';
import { TabsFormData } from '../..';
import useUserData from '../../../../../../@Hooks/useUser';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import { getUserDetailsNew } from '../../../../../../@Endpoints/Auth';

const  {COLOR:{SUBNAME}} = Config;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const BySpenowr = ({yAxisAnimatedValue,...props}:any) =>{

    const {
        fetchBySpenowrFeed,bySpenowrFeed,
        apiCalled,updateFeed,
        appliedFilters,
        fetchManagedAds,
        managedAds,
    } =props;
    const [refreshing,setRefreshing] = useState(false);
    const [subscription, setSubscription] = useState();
    const {UserProfileData} = useUserData();

    useEffect(()=>{
        if(UserProfileData?.subscription_plan == "spenowr_basic"){
            fetchManagedAds();
            setSubscription(UserProfileData?.subscription_plan);
        }
        callApi();

        return () => {

        } 
    },[]);

    const callApi = (length=0) =>{
        const apiData =  TabsFormData(appliedFilters,length,'1');
        fetchBySpenowrFeed(apiData,length);
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

    const renderPages = ({ index,item }) =>{
        return (
            <>
                {index != 0 && (index) % 5 == 0 && subscription == "spenowr_basic" && 
                    <>
                        {/* <MyAdView
                            type={managedAds?.type}
                            key={index}
                            buttonTitle={managedAds?.button_text}
                            link={managedAds?.button_link}
                            imagePath={managedAds?.image}
                        /> */}
                        <Card ref={ref => trackPlayerRef = ref} info={item} key={index} />
                    </>
                || 
                <Card ref={ref => trackPlayerRef = ref}  info={item} key={index} />}
            </>
        );
    };

    if(bySpenowrFeed.length)
        return(
            <View style={{flex:1,marginTop:moderateScale(5)}}>
                <AnimatedFlatList
                    ListFooterComponent={()=><ActivityIndicator color={'red'} />} 
                    contentContainerStyle={{paddingTop:moderateScale(6)}}
                    data={bySpenowrFeed}
                    horizontal={false}
                    initialNumToRender={5}
                    keyExtractor={item=>item.id.toString()}
                    onEndReached={()=>{
                    //   alert('called')
                        !apiCalled && callApi(bySpenowrFeed.length)
                    }}
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
                <Filters type={'spenowr'} />
            </View>
        );
    if(!bySpenowrFeed.length && apiCalled)
        return(
            <ScreenLoader text={'Loading data..'} />
        );
    
    if(!bySpenowrFeed.length && !apiCalled)
        return(
            <>
                <Text style={{alignSelf:'center',marginTop:moderateScale(50),color:SUBNAME}}> No Feed Found !!</Text>
                <Filters type={'spenowr'} />
            </>
        );    
};

BySpenowr.propTypes = {
    appliedFilters:PropTypes.object.isRequired,
    bySpenowrFeed:PropTypes.array.isRequired,
    fetchBySpenowrFeed:PropTypes.func.isRequired,
    updateFeed:PropTypes.func.isRequired,
    fetchManagedAds: PropTypes.func.isRequired,
};

function mapStateToProps(state){
    return{
        bySpenowrFeed : state.home.bySpenowrFeed,
        apiCalled : state.home.spenowrApiCalled,
        appliedFilters : state.home.filters,
        managedAds: state.home.managedAds,
    };
}

function mapDispatchToProps(dispatch){
    return{
        fetchBySpenowrFeed:(data,length) =>
            dispatch(homeActions.fetchBySpenowrFeed(data,length)),
        fetchManagedAds: () => dispatch(homeActions.fetchManagedAds()),
        updateFeed:data =>
            dispatch(homeActions.updateFeed(data))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(BySpenowr);