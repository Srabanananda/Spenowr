/**
 *  Created By @name Sukumar_Abhijeet
 */

import {StyleSheet,Platform,Dimensions} from 'react-native'; 
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';


const {scale,width} = Dimensions.get('window');
const WIDTH = width;
const EACH_IMAGE_WIDTH = (WIDTH-(scale > 2.8 ? Platform.OS ==='ios' ? 0.3*WIDTH  :  0.25*WIDTH  : 0.3*WIDTH))/3;

const {COLOR:{SUBNAME,APP_PINK_COLOR,LIGHTGREY,APP_THEME_COLOR,WHITE}} = Config;

const styles = StyleSheet.create({
    cardWrapper:{
        marginBottom:moderateScale(10),
        padding:moderateScale(10),
    },
    actionBox:{
        flexDirection:'row',
        alignItems:'center',
    },
    images:{
        width:moderateScale(30),
        height:moderateScale(30),
    },
    borderBox:{
        marginLeft:moderateScale(15),
        paddingBottom:moderateScale(10),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'85%',
    },
    nameText:{
        color:APP_PINK_COLOR,
        fontSize:moderateScale(12)
    },
    descText:{
        color:SUBNAME,
        fontSize:moderateScale(10)
    },
    eachActivityWrapper:{
        marginTop:moderateScale(8),
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',alignItems:'center',
    },
    activityBox:{
        width: moderateScale(WIDTH/2-40),
        height:moderateScale(150),
        margin:moderateScale(4),
        justifyContent:'center',
        alignItems:'center'
    },
    activityImg:{
        width:moderateScale(150),
        height:moderateScale(60),
        justifyContent:'center',
        alignItems:'center'
    },
    pointsText:{
        fontSize:moderateScale(25),
        fontWeight:'bold'
    },
    nameBigText:{
        fontSize:moderateScale(14),
        fontWeight:'600',
        marginTop:moderateScale(10),
        color:APP_PINK_COLOR
    },
    displayBox:{
        borderColor:LIGHTGREY,
        borderWidth:1
    },
    noItemText:{
        color:SUBNAME,
        marginLeft:moderateScale(15),
        marginTop:moderateScale(8)
    },
    displayBoxWrapper:{
        borderColor:LIGHTGREY,
        borderWidth:1,
        borderRadius:moderateScale(2),
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:moderateScale(5),
        width:'100%',
        padding:moderateScale(12),
        paddingBottom:0,
        paddingRight:0,
    },
    smallImgBoc:{
        width:moderateScale(EACH_IMAGE_WIDTH),
        height:moderateScale(EACH_IMAGE_WIDTH),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:moderateScale(5),
        overflow:'hidden',
        marginBottom:moderateScale(10),
        marginRight:moderateScale(10)
    },
    serviceBoxWrapper:{
        flexDirection:'row',alignItems:'center',
        padding:moderateScale(5),
    },
    serviceCourseName:{
        fontWeight:'bold',
        marginBottom:moderateScale(5),
        fontSize:moderateScale(14),
        maxWidth:'85%'
    },
    serviceDescription:{
        color:SUBNAME,
        fontSize:moderateScale(10),
        maxWidth: moderateScale(210),
    },
    priceText: {
        fontSize: moderateScale(12),
        fontWeight:'bold'
    },
    ServiceCardViewWrapper:{
        borderColor:LIGHTGREY,
        borderWidth:1,
        borderRadius:moderateScale(2),
    },
    smallImgBoxService:{
        width:moderateScale(EACH_IMAGE_WIDTH-25),
        height:moderateScale(EACH_IMAGE_WIDTH-25),
        backgroundColor:APP_THEME_COLOR,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:moderateScale(5),
        overflow:'hidden',
        marginHorizontal:moderateScale(5)
    },
    imageOverlay:{
        position:'absolute',
        width:moderateScale(EACH_IMAGE_WIDTH),
        height:moderateScale(EACH_IMAGE_WIDTH),
        backgroundColor:'#000',
        opacity:0.9,
        borderRadius:moderateScale(5),
    },
    moreOptions:{
        position:'absolute',
        width:moderateScale(EACH_IMAGE_WIDTH),
        height:moderateScale(EACH_IMAGE_WIDTH),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:moderateScale(5),
    },
    forwardArrow:{
        width:moderateScale(10),
        height:moderateScale(10)
    },
    countText:{
        color:WHITE,
        fontWeight:'bold',
        fontSize:moderateScale(8),
        marginTop:moderateScale(10)
    },
    viewMore:{
        alignSelf:'flex-end',
        fontSize:moderateScale(11),
        marginTop:moderateScale(5),
        color:APP_PINK_COLOR
    }
});

export default styles;