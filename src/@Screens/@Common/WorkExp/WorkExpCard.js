import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../@GlobalStyles';
import Config from '@Config/default';
import ScaledImage from '../../../@GlobalComponents/ScalableImage';
import { isAValidImagePath } from '../../../@Utils/helperFiles/helpers';
import Capitalize from '../../../@Utils/helperFiles/Capitalize';
import CardActions from './CardActions';

const { NEW_IMG_BASE, DUMMY_IMAGE_URL, COLOR: { SUBNAME, APP_PINK_COLOR, DARK_BLACK } } = Config;

const WorkExpCard = ({workExp,showActions,refresh}:any) => {

    const {
        workexp_image_path='',
        start_date='',
        end_date='',
        title='',
        description='',
        exp_givenby='',
    } = workExp;

    const certificateUrl = NEW_IMG_BASE + workexp_image_path ;

    return(
        <View style={[GlobalStyles.primaryCard, styles.card]}>
           
            <ScaledImage source={{ uri: isAValidImagePath(workexp_image_path) ? certificateUrl : DUMMY_IMAGE_URL }} />
            <View style={{ marginTop: moderateScale(5) }}>
                <Text style={styles.artistName}>
                    {Capitalize(title)}
                </Text>
                <Text style={[styles.desc,{fontWeight:'600'}]}>{exp_givenby?.toUpperCase()} </Text>
                
                {(description && description !== 'null') ? <Text style={styles.desc}>{description}</Text> : null}
                <Text style={styles.date}>{start_date} to {end_date} </Text>
                {showActions && <CardActions certificateUrl={certificateUrl} refresh={refresh} workDetails={workExp} />}
            </View>
        </View>
    );

};

export default WorkExpCard;


const styles = StyleSheet.create({
    card: {
        padding: moderateScale(10),
        marginBottom: moderateScale(10)
    },
    tags: {
        backgroundColor: SUBNAME,
        marginRight: moderateScale(5),
        paddingHorizontal: moderateScale(10),
        padding: moderateScale(6),
        borderRadius: moderateScale(10),
    },
    tagBox: {
        flexDirection: 'row',
        marginVertical: moderateScale(10)
    },
    desc: {
        marginTop: moderateScale(5),
        fontSize: moderateScale(11)
    },
    date:{
        fontSize:moderateScale(9),
        marginTop: moderateScale(5),
        color: DARK_BLACK,
    },
    artistName: {
        color: APP_PINK_COLOR,
        fontSize: moderateScale(14),
        fontWeight: 'bold'
    },
    price: {
        marginTop: moderateScale(4),
        fontWeight: 'bold'
    },
});