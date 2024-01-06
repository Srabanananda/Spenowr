/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState} from 'react';
import {View,RefreshControl,Text} from 'react-native';
import { connect } from 'react-redux';
import { GlobalStyles } from '@GlobalStyles';
import * as homeActions from '@Redux/actions/homeActions';
import ScreenLoader from '@GlobalComponents/ScreenLoader';
import { isObjectEmpty } from '@Utils/helperFiles/isObjectEmpty';
import PropTypes from 'prop-types';

import styles from './styles';
import AllContestsList from './Contests/AllContestsList';
import FeaturedProducts from './Products';
import FeaturedArtists from './Artists';
import FeaturedArtworks from './Artworks';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import { moderateScale } from 'react-native-size-matters';

const Featured = ({yAxisAnimatedValue,...props}) =>{
    const {
        fetchFeaturedFeed,
        featuredFeeds,
        featuredFeeds:{
            gallery_featured = [],
            artist_featured = []
        },
        apiCalled,
    } = props;

    const [refreshing,setRefreshing] = useState(false);
    const [contestAvailable, setContestAvailable] = useState(false);

    useEffect(()=>{
        callApi();
    },[]);

    const onRefresh = () =>{
        setRefreshing(true);
        fetchFeaturedFeed();
        callApi();
        setTimeout(()=>{setRefreshing(false);},500);
    };

    const callApi = () =>{
        fetchFeaturedFeed();
    };

    const scrollHandler = useAnimatedScrollHandler((event) => {
        // yAxisAnimatedValue.value = event.contentOffset.y;
    });


    if(isObjectEmpty(featuredFeeds) && apiCalled)
        return(
            <ScreenLoader text={'Loading ..'} />
        );

    if(isObjectEmpty(featuredFeeds) && !apiCalled)
        return(
            <>
                <Text style={styles.noDataText}> No Feed Found !!</Text>
            </>
        ); 
    
    return(
        <View style={GlobalStyles.GlobalContainer}>
            <Animated.ScrollView 
                contentContainerStyle={{paddingTop:moderateScale(contestAvailable ? 0: 12)}}
                onScroll={scrollHandler} 
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh} refreshing={refreshing}
                        title="Refreshing your feed.."
                        titleColor={'#000'} />
                }
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                <AllContestsList extraFunc={setContestAvailable} />
                <FeaturedArtists {...{artist_featured}} />
                <FeaturedArtworks {...{gallery_featured}} />
                <FeaturedProducts {...{featuredFeeds}} />
                
            </Animated.ScrollView>
        </View>
    );
};

Featured.propTypes = {
    apiCalled:PropTypes.bool.isRequired,
    featuredFeeds:PropTypes.object.isRequired,
    fetchFeaturedFeed:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        featuredFeeds: state.home.featuredFeeds,
        apiCalled : state.home.featuredApiCalled,
    };
};

function mapDispatchToProps(dispatch){
    return{
        fetchFeaturedFeed:() =>
            dispatch(homeActions.fetchFeaturedFeed()),
        updateAnimatedScrollOffset:(offset) =>
            dispatch(homeActions.updateAnimatedScrollOffset(offset))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Featured);