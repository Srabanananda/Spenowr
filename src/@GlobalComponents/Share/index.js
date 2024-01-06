/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {TouchableOpacity,Text,Share,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Capitalize from '../../@Utils/helperFiles/Capitalize';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
const {COLOR:{SUBNAME}} = Config;

const ShareData = ({message,title='Spenowr'}) =>{

    const shareUrl = async() =>{
        try {
            const result = await Share.share({
                message,
                title:Capitalize(title),
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return(
        <TouchableOpacity onPress={()=>shareUrl()} style={styles.actionBox}>
            <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
    );
};

ShareData.propTypes = {
    message: PropTypes.string.isRequired,
    title:PropTypes.string,
};

export default ShareData;

const styles = StyleSheet.create({
    
    actionBox:{
        flexDirection:'row',
        padding:moderateScale(5),
        paddingHorizontal:moderateScale(20)
    },
    
    
    actionText:{
        color:SUBNAME
    },
    
});
