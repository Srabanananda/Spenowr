/**
 * Create By @name Sukumar_Abhijeet,
 */

import {Dimensions, StyleSheet} from 'react-native';

import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{WHITE,APP_PINK_COLOR,DARK_BLACK,LIGHTGREY,SUBNAME,RED,APP_THEME_COLOR}} = Config;

const styles = StyleSheet.create({
    cardBox:{
        backgroundColor:WHITE,
        width:'100%',
        marginBottom : moderateScale(20),
        borderColor:LIGHTGREY,
        borderWidth:1,
        borderRadius:moderateScale(4),
        paddingHorizontal:moderateScale(10),
        flex:1
    },
    modulesWrapper:{
        flexDirection:'row',
        flexWrap:'wrap'
    },  
    eachModule:{
        borderColor:SUBNAME,
        borderWidth:1,
        borderRadius:moderateScale(10),
        paddingHorizontal:moderateScale(20),
        padding:moderateScale(8),
        marginRight:moderateScale(10)
    },
    moduleNameSelected:{
        color:WHITE,
        fontWeight:'bold'
    },
    defaultName:{
        color:'#000'
    },
    eachModuleSelected :{
        backgroundColor:APP_PINK_COLOR,
        borderWidth:0,
        borderColor:SUBNAME,
        borderRadius:moderateScale(10),
        paddingHorizontal:moderateScale(20),
        padding:moderateScale(8),
        marginRight:moderateScale(10)
    },
    imageContainer:{
        borderRadius:moderateScale(6),
        overflow:'hidden',
        alignSelf:'center',
        width:'100%',
    },
    imgBackgroundVertical:{
        flex:1,width:null,height:null,
        minHeight:moderateScale(420),
        alignItems:'center',justifyContent:'center'
    },
    imageContainerMediapath:{
        borderRadius:moderateScale(6),
        overflow:'hidden',
        alignSelf:'center',
        width:'100%',
    },
    imgBackgroundMediaPathVertical:{
        minHeight:moderateScale(300),
        maxHeight:moderateScale(420),
        alignItems:'center',justifyContent:'center'
    },
    imgBackground:{
        flex:1,width:null,height:null,
        minHeight:moderateScale(320),
        alignItems:'center',justifyContent:'center'
    },
    infoContainer:{
        paddingVertical:moderateScale(10)
    },
    artWork:{
        fontSize:moderateScale(12),
        fontWeight:'bold',
        color:SUBNAME,

    },
    artworkType:{
        fontSize:moderateScale(14),
        color:'#000'
    },
    category:{
        fontSize:moderateScale(16),
        fontWeight:'bold',
        color:APP_PINK_COLOR,
        marginVertical:moderateScale(5)
    },
    categoryType:{
        fontSize:moderateScale(12),
        color:SUBNAME,
        marginTop:moderateScale(4),
    },
    name:{
        color:APP_PINK_COLOR,
        fontSize:moderateScale(12),
        marginLeft:moderateScale(10)
    },
    nameTag:{
        fontSize:moderateScale(10),
        marginLeft:moderateScale(10)
    },
    desc:{
        color:DARK_BLACK,marginTop:moderateScale(5),
        fontSize:moderateScale(11)
    },
    socialContainer:{
        position:'absolute',
        bottom:10,
        height:moderateScale(50),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        marginLeft:moderateScale(20)
    },
    socialIcon:{
        backgroundColor:LIGHTGREY,
        width:moderateScale(35),
        height:moderateScale(35),
        borderRadius:moderateScale(20),
        marginLeft:moderateScale(8),
        justifyContent:'center',
        alignItems:'center'
    },
    textStyle:{
        fontSize:moderateScale(25),
        marginLeft:moderateScale(5),
    },
    filterIcon:{
        position:'absolute',
        bottom:moderateScale(20),
        right:moderateScale(20),
        backgroundColor:APP_PINK_COLOR,
        width:moderateScale(50),
        height:moderateScale(50),
        justifyContent:'center',alignItems:'center',
        borderRadius:moderateScale(30),
        zIndex:100
    },
    filterContainer:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:'#fff',
        padding:moderateScale(15),
        paddingVertical:moderateScale(30)
    },
    filterHeader:{
        fontSize:moderateScale(14),
        fontWeight:'bold',
        marginBottom:moderateScale(10)
    },
    textInputBox:{
        height:moderateScale(40),
        backgroundColor:LIGHTGREY,
        borderRadius:moderateScale(10),
        marginBottom:moderateScale(10),
        width:'100%',
        paddingHorizontal:moderateScale(10),
        marginTop:moderateScale(10)
    },
    clearButton:{
        backgroundColor:SUBNAME,
        width:moderateScale(80),
        marginRight:moderateScale(10)
    },
    applyButton:{
        width:moderateScale(80)
    },
    actionBox:{
        flexDirection:'row',
        padding:moderateScale(5),
        paddingHorizontal:moderateScale(20)
    },
    actionWrapper:{
        flexDirection:'row',justifyContent:'space-between',
        alignItems:'center',
        padding:moderateScale(5),
        borderTopWidth:1,
        borderBottomWidth:1,
        borderTopColor:LIGHTGREY,
        borderBottomColor:LIGHTGREY
    },
    actionText:{
        color:SUBNAME
    },
    actionTextLiked:{
        color:RED
    },
    modalContainer: {
        position:'absolute',
        bottom:0,height:Dimensions.get('window').height-100,
        backgroundColor:'#fff',
        width:'100%',
        padding:moderateScale(20),
        paddingHorizontal:moderateScale(10),
        borderTopLeftRadius:moderateScale(30),
        borderTopRightRadius:moderateScale(30)

    },
    tags:{
        backgroundColor:SUBNAME,
        marginRight:moderateScale(5),
        paddingHorizontal:moderateScale(10),
        padding:moderateScale(3),
        borderRadius:moderateScale(10)
    },
    noComments:{alignSelf:'center',marginTop:moderateScale(10),color:SUBNAME},    
    commentViewWrapper:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:moderateScale(10)
    },
    imageCircle:{
        backgroundColor:LIGHTGREY,
        width:moderateScale(60),
        height:moderateScale(60),
        borderRadius:moderateScale(30),
        borderWidth:1,
        borderColor:LIGHTGREY,
        overflow:'hidden'
    },
    dateCreated:{
        color:SUBNAME,
        marginTop:moderateScale(5),
        fontSize:moderateScale(10)
    },
    commentBox:{
        position:'absolute',
        bottom:10,
        backgroundColor:LIGHTGREY,
        borderRadius:moderateScale(30),
        width:'100%',
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:moderateScale(5)
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
    countWrapper:{
        flexDirection:'row',justifyContent:'space-between',alignItems:'center',
        paddingVertical:moderateScale(5),paddingHorizontal:moderateScale(10)
    },
    feedDesc:{
        textAlign:'center',
        maxWidth:moderateScale(150),
        alignSelf:'center',
        fontSize:moderateScale(12),
        color:'#fff'
    },
    quoteName:{
        paddingBottom:moderateScale(10),
        fontSize:moderateScale(18),
        fontWeight:'bold',
        textDecorationLine:'underline'
    },
    blurView:{
        position:'absolute',
        bottom:0,
        width:'100%',
        height:moderateScale(25),
        backgroundColor:'#000',
        alignItems:'center',
        justifyContent:'center',
    },
    reviewText:{
        color:WHITE,
        fontWeight:'bold',
        alignSelf:'center',
        fontSize:moderateScale(10)
    },
    circle:{
        width:moderateScale(40),
        height:moderateScale(40),
        borderRadius:moderateScale(25),
        backgroundColor:APP_THEME_COLOR,
        overflow:'hidden'
    },
    imageWrapper:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:moderateScale(10)
    },
    plainTextContainer:{
        alignItems:'center',minHeight:moderateScale(300),overflow:'hidden',
        justifyContent:'center',width:'100%',borderRadius:moderateScale(8),
    },
    headName:{
        marginBottom:moderateScale(5),
        fontSize:moderateScale(16),
        textDecorationLine:'underline'
    },
    headNameSmall:{
        fontWeight:'bold',
        marginBottom:moderateScale(5),
        fontSize:moderateScale(12),
        textDecorationLine:'underline'
    },
    hasMediaContentStyles : {flex:1,justifyContent:'center',alignItems:'center'}
});

export default styles;