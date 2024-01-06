/**
 * Create By @name Sukumar_Abhijeet,
 */

import {StyleSheet,Platform} from 'react-native';

import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{WHITE,APP_PINK_COLOR,DARK_BLACK,LIGHTGREY,DARKGRAY}} = Config;

const styles = StyleSheet.create({
    cardBox:{
        backgroundColor:WHITE,
        height:moderateScale(450),
        width:'100%',
        marginBottom : moderateScale(20),
        borderColor:LIGHTGREY,
        borderWidth:1,
        borderRadius:moderateScale(4),
        paddingHorizontal:moderateScale(10)
    },
    imageContainer:{
        flex:3.5,
        marginTop:moderateScale(20)
    },
    infoContainer:{
        flex:0.7,
        padding:moderateScale(20),
        justifyContent:'center',
        alignItems:'center'
    },
    lightText:{
        color:DARKGRAY
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
        width:'100%',
        height:'100%',
        backgroundColor:'#fff',
        padding:moderateScale(15)
    },
    filterHeader:{
        fontSize:moderateScale(16),
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
        backgroundColor:DARK_BLACK,
        width:moderateScale(100),
        marginRight:moderateScale(10)
    },
    applyButton:{
        width:moderateScale(100)
    },
    bottomWrapper:{
        flexDirection:'row',width:'100%',justifyContent:'flex-end',position:'absolute',
        bottom:Platform.OS === 'ios' ? moderateScale(30) : moderateScale(10),alignSelf:'center',
        right:Platform.OS === 'ios' ? moderateScale(10) : moderateScale(2)
    },
    checkBox:{
        width:moderateScale(25),
        height:moderateScale(25)
    }
});

export default styles;