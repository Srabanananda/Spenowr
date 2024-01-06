/**
 *  Created By @name Sukumar_Abhijeet
 */

import {StyleSheet} from 'react-native';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{SUBNAME,APP_PINK_COLOR,WHITE,LIGHTGREY}} = Config;

const styles = StyleSheet.create({
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
        backgroundColor:WHITE,
        padding:moderateScale(10),
        flex:1,
    },
    textInputBox:{
        height:moderateScale(40),
        backgroundColor:LIGHTGREY,
        borderRadius:moderateScale(10),
        marginVertical:moderateScale(10),
        width:'100%',
        paddingHorizontal:moderateScale(10),
    },
    filterHeader:{
        fontSize:moderateScale(14),
        fontWeight:'bold',
        marginVertical:moderateScale(10)
    },
    eachModule:{
        borderColor:SUBNAME,
        borderWidth:1,
        borderRadius:moderateScale(10),
        paddingHorizontal:moderateScale(20),
        padding:moderateScale(8),
        marginRight:moderateScale(10)
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
    moduleNameSelected:{
        color:WHITE,
        fontWeight:'bold'
    },
    defaultName:{
        color:'#000'
    },
    eachCategoryCheckBoxView:{
        flexDirection:'row',alignItems:'center',
        paddingLeft:moderateScale(5),
        paddingTop:moderateScale(4)
    },
    closeText:{
        color:SUBNAME,
        marginLeft:moderateScale(10)
    }
});

export default styles;
