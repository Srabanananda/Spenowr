/**
 * Create By @name Sukumar_Abhijeet,
 */

import {StyleSheet} from 'react-native';

import Config from '@Config/default';
import { moderateScale, scale } from 'react-native-size-matters';

const {COLOR:{WHITE,APP_PINK_COLOR,APP_THEME_COLOR,SUBNAME,BLACK,GREEN,DARKGRAY}} = Config;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: moderateScale(2),
        paddingVertical: moderateScale(5)
    },
    detailsContainer: {
        padding: moderateScale(8)
    },
    description: {
        fontSize: moderateScale(12),
        marginTop: moderateScale(3),
        marginBottom: moderateScale(6),
        fontWeight: '400'
    },
    address: {
        color: SUBNAME,
        fontSize: moderateScale(11)
    },
    title: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
    },
    price: {
        marginTop: moderateScale(4),
        fontWeight: 'bold'
    },
    submissions: {
        marginTop: moderateScale(5),
        alignSelf: 'flex-end',
        fontSize: moderateScale(11)
    },
    duration: {
        fontSize: moderateScale(12),
        marginBottom: moderateScale(5)
    },
    posted: {
        color: SUBNAME,
        fontSize: moderateScale(12),
        marginTop: moderateScale(5)
    },
    tagStyle1: {
        backgroundColor: GREEN, 
        color: WHITE,
        height: moderateScale(20),
        paddingHorizontal: moderateScale(5),
        width: moderateScale(115), 
        textAlign: 'center',
        borderRadius:moderateScale(8),
    },
    tagStyle2: {
        backgroundColor: '#9ccc65',//DARKGRAY, 
        color: WHITE,
        height: moderateScale(20),
        paddingHorizontal: moderateScale(5),
        width: moderateScale(115), 
        textAlign: 'center',
        borderRadius:moderateScale(8),
    },
    imageContainer:{
        flex:2.2,
        marginTop:moderateScale(5)
    },
    upperCard: {
        width: '100%',
        backgroundColor:WHITE
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
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(2),
        elevation: moderateScale(3),
        shadowOffset: {
            height: scale(1),
            width: scale(1)
        },
        overflow:'hidden',
        borderRadius:moderateScale(8),
        marginBottom:moderateScale(20),
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
        backgroundColor:'#fff',
        padding:moderateScale(10)
    },
    titleText: {
        fontSize: moderateScale(16),
        fontWeight:'bold',
    },
    descText: {
        fontSize: moderateScale(15),
        fontWeight:'500',
    },
    date:{
        fontSize:moderateScale(11),
        color:SUBNAME
    },
    appleIncBox:{
        position:'absolute',
        top:0,
        left:0,
        backgroundColor:BLACK,
        width:'100%',
        paddingVertical:moderateScale(3),
    },
    appleIncText:{
        color:WHITE,
        alignSelf:'center',
        fontSize:moderateScale(10),
    }
});

export default styles;