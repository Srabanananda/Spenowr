/**
 *  Created By @name Sukumar_Abhijeet
 */

import {StyleSheet} from 'react-native';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{WHITE,APP_PINK_COLOR,SUBNAME,APP_THEME_COLOR,LIGHTGREYSHADE}} = Config;

const styles = StyleSheet.create({
    container: {
        margin:moderateScale(20)
    },
    adminModal: {
        width:'95%',
        minHeight:'35%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius:moderateScale(6),
        backgroundColor:'#fff',
        padding:moderateScale(15)
    },
    flagImg:{
        height:moderateScale(80),
        width:moderateScale(40),
        position:'absolute',
        right:0,
        top:0,
        justifyContent:'center',
        alignItems:'center'
    },
    number:{
        fontSize:moderateScale(20),
        color:WHITE,
        fontWeight:'bold'
    },
    level:{
        fontSize:moderateScale(11),
        color:WHITE,
    },
    rowContainer:{
        flexDirection:'row'
    },
    profilePic:{
        width:moderateScale(80),
        height:moderateScale(80),
        borderRadius:moderateScale(40),
        backgroundColor:APP_THEME_COLOR,
        borderWidth:.4,
        borderColor:APP_THEME_COLOR,
        overflow:'hidden'
    },
    name:{
        fontSize:moderateScale(17),
        fontWeight:'bold',
        maxWidth:moderateScale(170)
    },
    subName:{
        color:SUBNAME,
        paddingVertical:moderateScale(8),
        fontSize:moderateScale(14)
    },
    locationImg:{
        width:moderateScale(13),
        height:moderateScale(13),
        marginTop:moderateScale(4)
    },
    locationText:{
        color:APP_PINK_COLOR,
        fontSize:moderateScale(11),
        marginLeft:moderateScale(5),
        maxWidth:moderateScale(160)
    },
    numberText:{
        color : SUBNAME,
        fontSize:moderateScale(16),
        fontWeight:'600',
        paddingBottom:moderateScale(5)
    },
    shortInfoWrapper:{
        justifyContent:'space-between',
        alignItems:'center',
    },
    justifyAlign:{justifyContent:'center',alignItems:'center'},
    ratingText:{
        fontSize:moderateScale(18),
        fontWeight:'bold',
        paddingBottom:moderateScale(5)
    },
    noRatingText:{
        fontWeight:'bold',
        paddingBottom:moderateScale(5),
        color:SUBNAME,marginLeft:moderateScale(5)
    },
    chipBox : {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:moderateScale(15),
    },
    chips:{
        backgroundColor:LIGHTGREYSHADE,
        paddingHorizontal:moderateScale(10),
        paddingVertical:moderateScale(8),
        borderRadius:moderateScale(20),
        marginRight:moderateScale(12),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    aboutWrapper:{
        paddingHorizontal:moderateScale(10),
        paddingVertical:moderateScale(15)
    },
    aboutMeText:{
        color:APP_PINK_COLOR,
        fontWeight:'600'
    },
    aboutMeDescription:{
        paddingVertical:moderateScale(10),
        color:SUBNAME
    },
    subCatBox:{
        marginLeft:moderateScale(20),
        marginBottom:moderateScale(10),
        marginTop:moderateScale(5),
        flexDirection:'row',
        alignItems:'center'
    },
    subCatText:{
        color:SUBNAME,fontSize:moderateScale(10)
    },
    publicActions:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:moderateScale(8),
        alignSelf:'center'
    },
    outlined:{
        borderColor:APP_PINK_COLOR,
        borderWidth:1,
        borderRadius:moderateScale(15),
        width:moderateScale(80),
        padding:moderateScale(4),
        marginRight:moderateScale(5)
    },
    filled:{
        backgroundColor:APP_PINK_COLOR,
        borderRadius:moderateScale(15),
        width:moderateScale(80),
        padding:moderateScale(4),
        marginRight:moderateScale(5)
    },
    outlinedText:{
        color:APP_PINK_COLOR,
        fontSize:moderateScale(12),
        alignSelf:'center'
    },
    filledText:{
        color:WHITE,
        fontSize:moderateScale(12),
        alignSelf:'center'
    },
    seeMore:{
        alignSelf:'flex-end',
        color:APP_PINK_COLOR,
        fontSize:moderateScale(10),
        marginTop:moderateScale(-10)
    },
    modalContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff',
        padding:moderateScale(15),
    },
    circle:{
        width:moderateScale(40),
        height:moderateScale(40),
        borderRadius:moderateScale(25),
        backgroundColor:APP_THEME_COLOR,
        overflow:'hidden'
    },
    likesContainer:{
        padding:moderateScale(15)
    },
    imageContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    userName:{
        fontWeight:'bold',
        marginLeft:moderateScale(10)
    },
    memberRowContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:moderateScale(10)
    },
    badgeStyles : {
        width:moderateScale(20),
        height:moderateScale(20),
        marginRight:moderateScale(25)
    }
});


export default styles;