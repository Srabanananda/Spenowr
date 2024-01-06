/**
 * Create By @name Sukumar_Abhijeet,
 */

import {StyleSheet} from 'react-native';

import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{APP_PINK_COLOR}} = Config;

const styles = StyleSheet.create({
    toggleContainer:{
        display: 'flex',
        flexDirection: 'row',
        overflow: 'scroll',
        marginBottom : moderateScale(2),
    },
    eachItem:{
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: moderateScale(5),
        paddingTop: moderateScale(5),
        paddingBottom: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: moderateScale(5),
    },
    textStyle:{
        fontSize: 14
    },
    textStyleActive:{
        fontWeight:'bold',
        fontSize: 14
    },
    viewActive:{
        height: 2,
        width: '80%',
        marginBottom: moderateScale(5),
        backgroundColor: APP_PINK_COLOR
    },
    viewInActive:{
        height: 2,
        width: '80%',
        marginBottom: moderateScale(5),
        backgroundColor: '#00000000'
    },
});

export default styles;