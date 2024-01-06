/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { View, Text ,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Config from '@Config/default';
const {NEW_IMG_BASE} = Config;
import { CardActions } from '../../../../../../@Common/Projects';
import styles from './styles';
import Capitalize from '../../../../../../../@Utils/helperFiles/Capitalize';
import ScaledImage from '../../../../../../../@GlobalComponents/ScalableImage';
import { Platform } from 'react-native';

const ProjectCard = ({info, customStyles={}}) =>{
    const {
        title,
        image_path,
        refresh,
    } = info;

    const navigation = useNavigation();
    const checkNavigation = () =>{
        navigation.navigate('UserProjectDetails', {projectDetails: info});
    };

    return(
        <></>
        // <View style={[styles.cardBox, customStyles]}>
        //     <TouchableOpacity activeOpacity={0.8} onPress={checkNavigation} style={styles.upperCard}>
        //         {/* <ScaledImage source={{ uri: NEW_IMG_BASE + image_path }} /> */}
        //         <AppleInc />
        //         <View style={styles.titleView}>
        //             {/* <Text numberOfLines={1} style={styles.titleText}>{Capitalize(title)}</Text> */}
        //         </View>
        //         {/* <CardActions projectDetails={info} refresh={refresh} /> */}
        //     </TouchableOpacity>
        // </View>
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
                    <Text style={styles.appleIncText}>{'This activity is not related to Apple inc'}</Text>
                </View>
            }</>
    );
};