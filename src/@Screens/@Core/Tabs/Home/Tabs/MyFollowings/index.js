/**
 * Create By @name Sukumar_Abhijeet
 */

import React, { useEffect,useState } from 'react';
import { Text,FlatList,View,RefreshControl} from 'react-native';
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
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import useUserData from '../../../../../../@Hooks/useUser';
import { getUserDetailsNew } from '../../../../../../@Endpoints/Auth';

const  {COLOR:{SUBNAME}} = Config;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const MyFollowings = ({yAxisAnimatedValue,...props}:any) =>{

    const {
        fetchMyFollowingFeed,myFollowingFeed,
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
    },[]);

    const callApi = (length=0) =>{
        const apiData =  TabsFormData(appliedFilters,length,UserProfileData?.user_id??'','',true);
        fetchMyFollowingFeed(apiData,length);
    };

    const onRefresh = () =>{
        setRefreshing(true);
        updateFeed('following');
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
                        <Card info={item} key={index} />
                    </>
                || 
                <Card info={item} key={index} />}
            </>
        );
    };

    if(myFollowingFeed.length)
        return(
            <View style={{flex:1,marginTop:moderateScale(5)}}>
                <AnimatedFlatList
                    contentContainerStyle={{paddingTop:moderateScale(6)}}
                    data={myFollowingFeed}
                    horizontal={false}
                    initialNumToRender={5}
                    keyExtractor={item=>item.id.toString()}
                    onEndReached={()=>!apiCalled && callApi(myFollowingFeed.length)}
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
                <Filters type={'following'} />
            </View>
        );
    if(!myFollowingFeed.length && apiCalled)
        return(
            <ScreenLoader text={'Loading data..'} />
        );
    
    if(!myFollowingFeed.length && !apiCalled)
        return(
            <>
                <Text style={{alignSelf:'center',marginTop:moderateScale(50),color:SUBNAME}}> No Feed Found !!</Text>
                <Filters type={'following'} />
            </>
        );    
};

MyFollowings.propTypes = {
    appliedFilters:PropTypes.object.isRequired,
    fetchMyFollowingFeed:PropTypes.func.isRequired,
    myFollowingFeed:PropTypes.array.isRequired,
    updateFeed:PropTypes.func.isRequired,
    fetchManagedAds: PropTypes.func.isRequired,
};

function mapStateToProps(state){
    return{
        myFollowingFeed : state.home.myFollowingFeed,
        apiCalled : state.home.followingApiCalled,
        appliedFilters : state.home.filters,
        managedAds: state.home.managedAds,
    };
}

function mapDispatchToProps(dispatch){
    return{
        fetchMyFollowingFeed:(data,length) =>
            dispatch(homeActions.fetchMyFollowingFeed(data,length)),
        fetchManagedAds: () => dispatch(homeActions.fetchManagedAds()),
        updateFeed:data =>
            dispatch(homeActions.updateFeed(data)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(MyFollowings);