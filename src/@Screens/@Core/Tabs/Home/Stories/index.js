/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {FlatList,ActivityIndicator,} from 'react-native';
import StoryCard from './StoryCard';
import styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as homeActions from '@Redux/actions/homeActions';
import { moderateScale } from 'react-native-size-matters';
import Animated,{interpolate, Extrapolation, useAnimatedStyle} from 'react-native-reanimated';

const HEADER_HEIGHT = moderateScale(90);

const Stories = ({yAxisAnimatedValue, ...props}) =>{
    const {
        storyData:{storyOfWeek=[],totalStory=0},
        fetchUserStories
    } = props ;

    const renderPages = ({ index,item }) =>{
        return  <StoryCard HEADER_HEIGHT={HEADER_HEIGHT} key={index} story={item} yAxisAnimatedValue={yAxisAnimatedValue} />;
    };

    const storyHeight = interpolate(yAxisAnimatedValue.value,
        [0, HEADER_HEIGHT],
        [HEADER_HEIGHT , 0],
        {extrapolate:Extrapolation.CLAMP}
    );

    const animatedStyles = useAnimatedStyle(()=>{
        return{
            // height:storyHeight,
        };
    });

    if(storyOfWeek.length)
        return(
            <Animated.View 
                style={[{
                    position: 'absolute',
                    top: moderateScale(50),
                    zIndex:1,
                    backgroundColor:'#FFF'
                },animatedStyles]}
            >
                <FlatList
                    ListFooterComponent={()=> totalStory-storyOfWeek.length ? <ActivityIndicator color={'red'} style={{marginTop:20}} /> : null}
                    contentContainerStyle={styles.storiesWrapper} 
                    data={storyOfWeek}
                    horizontal={true}
                    initialNumToRender={5}
                    keyExtractor={item=>item.module_id.toString()}
                    onEndReached={()=> totalStory-storyOfWeek.length ? fetchUserStories(storyOfWeek.length): null }
                    onEndReachedThreshold={0.3}
                    renderItem = {renderPages}
                    showsHorizontalScrollIndicator={false}
                />
            </Animated.View>
        );
    return null;
};

Stories.propTypes = {
    fetchUserStories:PropTypes.func.isRequired,
    storyData:PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{
        storyData : state.home.storyData
    };
}

function mapDispatchToProps(dispatch){
    return{
        fetchUserStories:(skip) =>
            dispatch(homeActions.fetchUserStories(skip)),
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(Stories);
