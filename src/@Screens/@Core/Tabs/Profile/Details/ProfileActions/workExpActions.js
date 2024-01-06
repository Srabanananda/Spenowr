/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,Image} from 'react-native';
import { getCurrency } from '../../../../../../@Utils/helperFiles/CardDetails';
import styles from './styles';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import { isAValidImagePath } from '../../../../../../@Utils/helperFiles/helpers';
 
const {NEW_IMG_BASE,DUMMY_IMAGE_URL} = Config;
 
const WorkExpCard = ({exp} : any) =>{
    const {
        description,
        title,
        end_date,
        start_date,
        reduce_workexp_image = '',
    } = exp;
 
    const imagePath = !isAValidImagePath(reduce_workexp_image) ? DUMMY_IMAGE_URL :  NEW_IMG_BASE+reduce_workexp_image;
     
    return(
        <View style={styles.serviceBoxWrapper}>
            <Image  
                source={{ uri: imagePath  }}
                style={styles.smallImgBoxService}
            />
            <View style={{marginLeft:moderateScale(5)}}>
                <Text numberOfLines={1} style={styles.serviceCourseName}>{title}</Text>
                <Text numberOfLines={1} style={styles.serviceDescription}>{description}</Text>
                <Text style={styles.serviceDescription}>{start_date} - {end_date}</Text>
            </View>
        </View>
    );
};
 
export default WorkExpCard;