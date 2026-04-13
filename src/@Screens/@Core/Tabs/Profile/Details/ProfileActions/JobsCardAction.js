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

const JobsCardAction = ({jobsAction}) =>{
    const {
        assignment_title,
        description,
        start_range,
        end_range,
        image_path = '',
    } = jobsAction;

    const imagePath = (image_path  === ''  || image_path  === '/' || image_path === null ) ? DUMMY_IMAGE_URL :  NEW_IMG_BASE+image_path;
    
    return(
        <View style={styles.serviceBoxWrapper}>
            <Image  
                source={{ uri: imagePath  }}
                style={styles.smallImgBoxService}
            />
            <View style={{marginLeft:moderateScale(5)}}>
                <Text numberOfLines={1} style={styles.serviceCourseName}> {assignment_title}</Text>
                <Text numberOfLines={1} style={styles.serviceDescription}> {description}</Text>
                
                {
                    start_range || end_range !== '' ?
                    <Text style={styles.priceText}>{getCurrency()}{start_range} - {getCurrency()}{end_range}</Text>
                    : null
                }
               

                {/* {
                    start_range !== '' ? <Text style={styles.priceText}>{getCurrency() + start_range - end_range}</Text> : null
                } */}
            </View>
        </View>
    );
};

JobsCardAction.propTypes = {
    jobsAction:PropTypes.object.isRequired,
};

export default JobsCardAction;