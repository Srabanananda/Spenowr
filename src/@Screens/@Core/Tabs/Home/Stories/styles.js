/**
 * Create By @name Sukumar_Abhijeet,
 */

import {StyleSheet} from 'react-native';

import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{APP_PINK_COLOR,APP_THEME_COLOR}} = Config;

const styles = StyleSheet.create({
    storiesWrapper:{
        padding:moderateScale(10),
    },
    square:{
        height:moderateScale(70),
        width:moderateScale(70),
        borderRadius:moderateScale(6),
        borderColor:APP_PINK_COLOR,
        borderWidth:1.5,
        overflow:'hidden',
    },
    storyCard:{
        backgroundColor:APP_THEME_COLOR,
        height:'100%',
        width:'100%',
        
    },
    hashTags:{
        fontSize:moderateScale(10),
        color:APP_PINK_COLOR,
        marginTop:moderateScale(3),
        textDecorationLine:'underline',
        maxWidth:moderateScale(80)
    },
    upperWrapper:{
        justifyContent:'center',
        alignItems:'center',
        marginRight:moderateScale(8)
    }
});

export default styles;