/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,Image} from 'react-native';
import { getCurrency } from '../../../../../../@Utils/helperFiles/CardDetails';
import styles from './styles';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

const {NEW_IMG_BASE,DUMMY_IMAGE_URL} = Config;

const ServiceCard = ({service}) =>{
    const {
        course_description,
        fee,
        country,
        course_name,
        course_image_path = '',
    } = service;

    const imagePath = (course_image_path  === ''  || course_image_path  === '/' || course_image_path === null ) ? DUMMY_IMAGE_URL :  NEW_IMG_BASE+course_image_path;
    
    return(
        <View style={styles.serviceBoxWrapper}>
            <Image  
                source={{ uri: imagePath  }}
                style={styles.smallImgBoxService}
            />
            <View style={{marginLeft:moderateScale(5)}}>
                <Text numberOfLines={1} style={styles.serviceCourseName}> {course_name}</Text>
                <Text numberOfLines={1} style={styles.serviceDescription}> {course_description}</Text>
                {
                    fee !== '' ? <Text style={styles.priceText}>{getCurrency(country) + fee}</Text> : null
                }
            </View>
        </View>
    );
};

ServiceCard.propTypes = {
    service:PropTypes.object.isRequired,
};

export default ServiceCard;