/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { View,Text,TouchableOpacity } from 'react-native';
// import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Config from '@Config/default';
const {NEW_IMG_BASE,/* COLOR:{RED} */} = Config;
import styles from './styles';
import Capitalize from '../../../../../@Utils/helperFiles/Capitalize';
import ScaledImage from '../../../../../@GlobalComponents/ScalableImage';
import { Platform } from 'react-native';

const ProjectCard = ({info, customStyles={}}) =>{
    const {
        title,
        image_path,
        type
    } = info;

    const navigation = useNavigation();
    const checkNavigation = () =>{
        navigation.navigate('ProjectDetails', {projectDetails: info});
    };

    return(
        <View style={[styles.cardBox,customStyles]}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>checkNavigation()} style={styles.upperCard}>
                <ScaledImage source={{ uri: NEW_IMG_BASE + image_path }} >
                    <Text style={type == 0 ? styles.tagStyle1 : styles.tagStyle2}>
                        {type == 0 ? 'Project Ongoing' : 'Hiring Now'}{/* Project One Time */}
                    </Text>
                </ScaledImage>
                <AppleInc />
                <View style={styles.titleView}>
                    <Text numberOfLines={1} style={styles.titleText}>{Capitalize(title)}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

ProjectCard.propTypes = {
    customStyles:PropTypes.object,
    info:PropTypes.object.isRequired
};

export default ProjectCard;

export const AppleInc = () => {
    return(
        <>
            {
                Platform.OS === 'ios' && <View style={styles.appleIncBox}>
                    <Text style={styles.appleIncText}>`This activity is not related to Apple inc`</Text>
                </View>
            }</>
    );
};