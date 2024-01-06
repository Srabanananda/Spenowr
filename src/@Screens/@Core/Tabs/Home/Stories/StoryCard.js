/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {TouchableOpacity,Text,View} from 'react-native';
import Config from '@Config/default';
import styles from './styles';
import PropTypes from 'prop-types';
import Image from 'react-native-image-progress';
import { useNavigation } from '@react-navigation/native';
import Capitalize from '../../../../../@Utils/helperFiles/Capitalize';
import Animated,{interpolate,Extrapolation, useAnimatedStyle} from 'react-native-reanimated';

const {NEW_IMG_BASE} = Config;

const StoryCard = ({story, yAxisAnimatedValue, HEADER_HEIGHT}) =>{
    const navigation = useNavigation();
    const {
        module_image_path='',
        module_type='',
        module_id='',
        slug_url='',
        module_title=''
    } = story;

    const scaleEffect = interpolate(yAxisAnimatedValue.value,
        [0, HEADER_HEIGHT],
        [1,0.5],
        {extrapolate:Extrapolation.CLAMP}
    );

    const radius = interpolate(yAxisAnimatedValue.value,
        [0, HEADER_HEIGHT/2],
        [6,40],
        {extrapolate:Extrapolation.CLAMP}
    );

    const checkModule = () =>{
        const slgs = slug_url.split('/');
        if(module_type === 'artwork')
            navigation.navigate('ArtworkDetails',{mediaId:module_id,artworkSlug:slgs[0]});
        if(module_type === 'article')
            navigation.navigate('ArticleDetails',{mediaId:module_id,articleSlug:slgs[0]});
        if(module_type === 'product')
            navigation.navigate('ProductDetails',{productSlug:slgs[0]});
        if (module_type === 'contest')
            navigation.navigate('ContestDetails', { contestID: module_id });
        if (module_type === 'jobs')
            navigation.navigate('JobDetails', { jobSlug: slug_url });
    };

    const animatedStyles = useAnimatedStyle(() => {
        return {
            // transform:[
            //     {scale:scaleEffect}
            // ],
            // borderRadius : radius
        };
    });

    return(
        <TouchableOpacity onPress={()=>checkModule()} style={styles.upperWrapper}>
            <Animated.View style={[styles.square,animatedStyles]}>
                <View style={styles.storyCard}>
                    <Image 
                        source={{ uri:NEW_IMG_BASE + module_image_path }} 
                        style={{width:null,height:null,flex:1}} 
                    />
                </View>
            </Animated.View>
            <Text numberOfLines={1} style={styles.hashTags}>{Capitalize(module_title)}</Text>
        </TouchableOpacity>
    );
};


StoryCard.propTypes = {
    story:PropTypes.object.isRequired,
};

export default StoryCard;