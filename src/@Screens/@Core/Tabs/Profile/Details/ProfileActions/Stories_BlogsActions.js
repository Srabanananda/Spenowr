/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,Image} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';


const {NEW_IMG_BASE,DUMMY_IMAGE_URL} = Config;

const StoryBlogCard = ({storyBlog}) =>{

    const {
        article_image_thumbnail_path,
        article_title
    } = storyBlog;

    return(
        <View style={styles.serviceBoxWrapper}>
            <Image  
                source={{ uri: article_image_thumbnail_path !== '' ?  NEW_IMG_BASE+article_image_thumbnail_path : DUMMY_IMAGE_URL }}
                style={styles.smallImgBoxService}
            />
            <View style={{marginLeft:moderateScale(5)}}>
                <Text style={styles.serviceDescription}> {article_title}</Text>
            </View>
        </View>
    );
};

StoryBlogCard.propTypes = {
    storyBlog:PropTypes.object.isRequired,
};

export default StoryBlogCard;