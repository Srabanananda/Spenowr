/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { View,Text,TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Config from '@Config/default';

const {NEW_IMG_BASE,COLOR:{RED}} = Config;

import styles from './styles';
import SocialIcons from '../../../../../../@GlobalComponents/SocialIcons';
import Capitalize from '../../../../../../@Utils/helperFiles/Capitalize';
import moment from 'moment';
import ScaledImage from '../../../../../../@GlobalComponents/ScalableImage';
import { Platform } from 'react-native';

const ContestCard = ({info, customStyles={}}) =>{
    const {
        contest_id,
        contest_list_img_path,
        contest_title,
        start_datetime,
        end_datetime,
        tag,
        tagstatus,
        slug_url='',
        // contest_type=''
    } = info;

    const formShareUrl = `www.spenowr.com/contest/detail/${slug_url}}`;

    const navigation = useNavigation();
    const checkNavigation = () =>{
        navigation.navigate('ContestDetails',{contestID:contest_id});
    };

    return(
        <View style={[styles.cardBox,customStyles]}>
            <TouchableOpacity onPress={()=>checkNavigation()} style={styles.upperCard}>
                <ScaledImage source={{ uri: NEW_IMG_BASE + contest_list_img_path }} />
                <AppleInc />
                <View style={styles.titleView}>
                    <Text numberOfLines={1} style={styles.titleText}>{Capitalize(contest_title)}</Text>
                    <View style= {{flexDirection:'row'}}>
                        <Text style={styles.date}>{moment(start_datetime).format('MMMM Do YYYY')}</Text>
                        <Text style={styles.date} >  -  {moment(end_datetime).format('MMMM Do YYYY')}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{color:tagstatus?'#30fa02':RED,fontWeight:'bold',fontSize:moderateScale(10)}}>{tag}</Text>
                        <SocialIcons shareUrl={formShareUrl} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

ContestCard.propTypes = {
    customStyles:PropTypes.object,
    info:PropTypes.object.isRequired
};

export default ContestCard;

export const AppleInc = () => {
    return(
        <>
            {
                Platform.OS === 'ios' && <View style={styles.appleIncBox}>
                    <Text style={styles.appleIncText}>"This activity is not related to Apple inc"</Text>
                </View>
            }</>
    );
};