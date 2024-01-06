/**
 *  Created By @name Sukumar_Abhijeet
 */

import {StyleSheet,Dimensions} from 'react-native';

import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{WHITE,APP_PINK_COLOR,DARK_BLACK,DARKGRAY,LIGHTGREY,SUBNAME}} = Config;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messageBoxUnread:{
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(4), elevation: moderateScale(2),
        shadowOffset: {
            height: moderateScale(2),
            width: moderateScale(2)
        },
        backgroundColor:'#fff',
        marginTop:moderateScale(10),
        padding:moderateScale(10),
        paddingHorizontal:moderateScale(20),
        borderTopLeftRadius:moderateScale(15),
        borderTopRightRadius:moderateScale(15),
        borderBottomRightRadius:moderateScale(15),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    messageBoxRead:{
        marginTop:moderateScale(10),
        padding:moderateScale(10),
        paddingHorizontal:moderateScale(20),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    contentBox:{
        flexDirection:'row',
        alignItems:'center'
    },
    userImg:{
        width:moderateScale(50),
        height:moderateScale(50),
        backgroundColor:LIGHTGREY,
        borderRadius:moderateScale(25),
        overflow:'hidden'
    },
    fromText:{
        fontWeight:'bold',
        color:DARK_BLACK,
        fontSize:moderateScale(16)
    },
    countView:{
        backgroundColor:APP_PINK_COLOR,
        padding:moderateScale(6),
        paddingHorizontal:moderateScale(10),
        borderRadius:moderateScale(10)
    },
    count:{
        color:WHITE
    },
    box:{
        paddingVertical:moderateScale(8)
    },
    subject:{
        fontSize:moderateScale(10),
        color:DARKGRAY
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
    fileAttachedBox:{
        position:'absolute',
        bottom:65,
        alignSelf:'flex-end',
        right:moderateScale(20),
        paddingHorizontal:moderateScale(15),
        padding:moderateScale(2),
        borderRadius:moderateScale(10),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    fileCross:{
        backgroundColor:APP_PINK_COLOR,
        paddingHorizontal:moderateScale(10),
        paddingVertical:moderateScale(8),
        borderRadius:moderateScale(30),marginLeft:moderateScale(10)
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
        width:'70%',
        marginLeft:moderateScale(10),
        color:DARK_BLACK,
    },
    sendButton:{
        width:moderateScale(40),
        height:moderateScale(40),
        borderRadius:moderateScale(20),
        backgroundColor:APP_PINK_COLOR,
        justifyContent:'center',
        alignItems:'center'
    },
    attachment:{
        width:moderateScale(40),
        height:moderateScale(40),
        borderRadius:moderateScale(20),
        backgroundColor:DARKGRAY,
        justifyContent:'center',
        alignItems:'center'
    },
    noMessage:{
        alignSelf:'center',
        marginTop:moderateScale(20),
        color:SUBNAME
    },
    msg:{
        marginTop:moderateScale(2),
        fontWeight:'600',
        fontSize:moderateScale(12)
    },
    msgRead:{
        marginTop:moderateScale(2),
        fontWeight:'600',
        fontSize:moderateScale(12),
        color:SUBNAME
    },
    newText:{
        color:APP_PINK_COLOR
    }
});

export default styles;