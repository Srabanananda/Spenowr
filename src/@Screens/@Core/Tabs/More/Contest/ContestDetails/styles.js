/**
 * Create By @name Sukumar_Abhijeet,
 */

import {StyleSheet} from 'react-native';

import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{DARK_BLACK,LIGHTGREY}} = Config;

const styles = StyleSheet.create({
    
    contestInfo:{
        backgroundColor:'#ebebeb',
        width:'100%',
        borderRadius:moderateScale(8)
    },
    aboutWrapper:{
        backgroundColor:DARK_BLACK,
        height:moderateScale(40),
        justifyContent:'center',
        paddingLeft:moderateScale(20)
    },
    contestName:{
        fontSize:moderateScale(18),
        textAlign:'center',
        marginTop:moderateScale(5)
    },
    eachTab:{
        paddingHorizontal:moderateScale(16),
        paddingVertical:moderateScale(10),
        width:moderateScale(100),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:moderateScale(6)
    },
    datesWrapper:{
        flexDirection:'row',marginLeft:moderateScale(5),
        alignSelf:'center'
    },
    date:{
        fontSize:moderateScale(10),
        fontWeight:'bold'
    },
    bannerStyle:{
        width:'100%',
        height:moderateScale(180)
    },
    tabWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:moderateScale(20) ,
        padding:moderateScale(6),
        borderRadius:moderateScale(6),
        shadowOpacity: 0.2,
        backgroundColor: 'white',
        shadowColor: 'rgba(0, 89, 163, 0.1)',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        elevation: 5,
    }
});

export default styles;