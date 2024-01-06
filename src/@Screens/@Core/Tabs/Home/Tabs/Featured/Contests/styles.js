/**
 * Create By @name Sukumar_Abhijeet,
 */

import {StyleSheet} from 'react-native';

import Config from '@Config/default';
import { moderateScale, scale } from 'react-native-size-matters';

const {COLOR:{WHITE,APP_PINK_COLOR,APP_THEME_COLOR}} = Config;

const styles = StyleSheet.create({
    imageContainer:{
        flex:2.2,
        marginTop:moderateScale(5)
    },
    infoContainer:{
        flex:1.8,
    },
    artWork:{
        fontSize:moderateScale(20),
        fontWeight:'bold',
        color:APP_PINK_COLOR,
    },
    artworkType:{
        fontSize:moderateScale(16),
        color:'#000'
    },
    category:{
        fontSize:moderateScale(16),
        fontWeight:'bold',
        color:APP_PINK_COLOR,
        marginVertical:moderateScale(3)
    },

    cardBox: {
        backgroundColor:WHITE,
        marginBottom:moderateScale(15),
        borderRadius:moderateScale(4),
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(2),
        elevation: moderateScale(3),
        shadowOffset: {
            height: scale(1),
            width: scale(1)
        },
        overflow:'hidden'
    },
    overlayImage:{
        backgroundColor:'#000',
        width:'100%',
        height:'35%',
        position:'absolute',
        opacity:0.8,
        bottom:0
    },
    tinyLogo: {
        width: '100%',
        height: moderateScale(180),
        backgroundColor:APP_THEME_COLOR
    },
    socialIcons: {
        paddingTop:moderateScale(5),
        position:'absolute',
        top:0,
        right:0
    },
    titleView: {
        position:'absolute',
        bottom:moderateScale(8),
        left:moderateScale(15),
    },
    titleText: {
        color: WHITE,
        fontSize: moderateScale(16),
        fontWeight:'bold',
        maxWidth:moderateScale(200)
    },
    date:{
        fontSize:moderateScale(11),
        color:WHITE
    },
});

export default styles;