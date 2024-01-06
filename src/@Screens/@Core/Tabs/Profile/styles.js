/**
 *  Created By @name Sukumar_Abhijeet
 */

import {StyleSheet} from 'react-native';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{WHITE,APP_PINK_COLOR}} = Config;

const styles = StyleSheet.create({
    editButton:{
        color:APP_PINK_COLOR,
        fontSize:moderateScale(14)
    },
    referralButton:{
        color:APP_PINK_COLOR,
        fontSize:moderateScale(14),
        marginRight:moderateScale(10)
    },
    container:{
        margin:moderateScale(10)
    },
    adminBox:{
        marginRight:moderateScale(10)
    },
    adminModal:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:'#fff',
        padding:moderateScale(15)
    },
    AlertContainer:{
        backgroundColor:APP_PINK_COLOR,
        padding:moderateScale(10),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    notVerifiedText:{
        color:WHITE,
    },
    verifyNow:{
        borderColor:WHITE,
        paddingHorizontal:moderateScale(10),
        padding:moderateScale(5),
        borderRadius:moderateScale(4),
        borderWidth:1
    },
    verifyNowText:{
        fontSize:moderateScale(10),
        color:WHITE,
        fontWeight:'bold'
    },
    modalAlertBody:{
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:moderateScale(10)
    },
    verifiedHeader:{
        fontWeight:'bold',
        textAlign:'center'
    }
});

export default styles;