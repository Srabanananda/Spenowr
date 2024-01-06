/**
 * Create By @name Sukumar_Abhijeet,
 */

import {StyleSheet} from 'react-native';

import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{WHITE,APP_PINK_COLOR,DARK_BLACK,LIGHTGREY,SUBNAME,APP_THEME_COLOR}} = Config;

const styles = StyleSheet.create({
    htmlBox:{
        width:'100%',
        borderRadius:moderateScale(4),
        marginBottom:moderateScale(50),
        backgroundColor:WHITE,
        padding:moderateScale(10),
        paddingHorizontal:moderateScale(15)
    },
    winnerBox:{
        width:'100%',
        borderRadius:moderateScale(4),
    },
    detailBox:{
        backgroundColor:WHITE,
        width:'100%',
        borderColor:LIGHTGREY,
        borderWidth:1,
        borderRadius:moderateScale(4),
        padding:moderateScale(20),
        marginBottom:moderateScale(50)
    },
    imageCircle:{
        width:moderateScale(120),
        height:moderateScale(120),
        borderRadius:moderateScale(15),
        borderColor:APP_PINK_COLOR,
        backgroundColor:APP_THEME_COLOR,
        borderWidth:1,
        overflow:'hidden'
    },
    eachWinner:{
        marginBottom:moderateScale(20),
        alignItems:'center',
        backgroundColor:WHITE,
        margin:moderateScale(5),
        padding:moderateScale(10),
        borderRadius:moderateScale(5),
        width:moderateScale(180),
        alignSelf:'center'
    },
    winnerName:{
        color:WHITE,
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:moderateScale(12)
    },
    position:{
        fontSize:moderateScale(12),
        color:APP_PINK_COLOR,
        marginTop:moderateScale(4),
        fontWeight:'bold'
    },
    artistBox:{
        backgroundColor:WHITE,
        borderRadius:moderateScale(4),
        padding:moderateScale(10),
        marginHorizontal:moderateScale(5),
        justifyContent:'center',
        alignItems:'center',
        marginBottom:moderateScale(8)
    },
    writingBox:{
        backgroundColor:WHITE,
        borderRadius:moderateScale(4),
        justifyContent:'center',
        alignItems:'center',
        marginBottom:moderateScale(10),
        padding:moderateScale(3)
    },
    productPicHorizontal:{
        minWidth:moderateScale(135),
        height:moderateScale(135),
        borderRadius:moderateScale(5),
        backgroundColor:APP_THEME_COLOR,
        borderWidth:.4,
        borderColor:APP_THEME_COLOR,
        overflow:'hidden'
    },
    productPicHorizontalLarge:{
        minWidth:moderateScale(300),
        height:moderateScale(200),
        borderRadius:moderateScale(5),
        backgroundColor:APP_THEME_COLOR,
        borderWidth:.4,
        borderColor:APP_THEME_COLOR,
        overflow:'hidden'
    },
    imageOverlay:{
        backgroundColor:'#000',
        opacity:0.5,
        width:'100%',
        height:'25%',
        position:'absolute',
        bottom:0,
        zIndex:100
    },
    eachArtistName:{
        color:WHITE,
        maxWidth:moderateScale(120),
        zIndex:120,
        fontSize:moderateScale(10),
        marginBottom:moderateScale(3)
    },
    participantInfo:{
        backgroundColor:APP_PINK_COLOR,
        height:moderateScale(50),
        marginBottom:moderateScale(20),
        alignItems:'center',
        justifyContent:'center'
    },
    participantText:{
        color:WHITE,
        fontWeight:'bold'
    },
    headerText:{
        color:APP_PINK_COLOR,
        fontWeight:'bold',
        marginVertical:moderateScale(10)
    },
    prize:{
        backgroundColor:DARK_BLACK,
        paddingHorizontal:moderateScale(10),
        padding:moderateScale(5),
        marginBottom:moderateScale(10)
    },
    contestOver:{
        alignSelf:'center',fontWeight:'bold',
        color:APP_PINK_COLOR,
        fontSize:moderateScale(20)
    },
    noPrize:{
        alignSelf:'center',
        color:SUBNAME
    },
    categoryName:{
        color:APP_PINK_COLOR,
        fontWeight:'bold',
        fontSize:moderateScale(10),
        marginVertical:moderateScale(10)
    },
    noParticipants:{
        color:SUBNAME,
        alignSelf:'center',
        fontSize:moderateScale(12),
        marginTop:moderateScale(10),
        fontWeight:'bold'
    },
    imageOverlayBlack:{
        backgroundColor:'#000',
        opacity:0.5,
        width:'100%',
        height:'16%',
        position:'absolute',
        bottom:0
    },
    WritingsImageContainer:{
        maxHeight:moderateScale(150),
        minHeight:moderateScale(150),
    },
    WritingsContainer:{
        width:moderateScale(145),height:moderateScale(145)
    },
    writingArtist:{
        marginTop:moderateScale(4),
        fontWeight:'600',
        alignSelf:'center',
        fontSize:moderateScale(10),
        maxWidth:moderateScale(100),
        marginBottom:moderateScale(5)
    },
    commentBox:{
        backgroundColor:LIGHTGREY,
        borderRadius:moderateScale(35),
        width:'100%',
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:moderateScale(5),
        marginTop:moderateScale(5)
    },
    inputBox:{
        height:moderateScale(50),
        width:'80%',
        marginLeft:moderateScale(10),
        color:DARK_BLACK
    },
    sendButton:{
        width:moderateScale(40),
        height:moderateScale(40),
        borderRadius:moderateScale(20),
        backgroundColor:APP_PINK_COLOR,
        justifyContent:'center',
        alignItems:'center'
    },
    category : {
        marginRight:moderateScale(10),
        borderBottomColor : APP_PINK_COLOR
    }
});

export default styles;