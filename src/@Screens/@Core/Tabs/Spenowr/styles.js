/**
 *  Created By @name Sukumar_Abhijeet
 */

import {StyleSheet} from 'react-native';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{WHITE,SUBNAME}} = Config;

const styles = StyleSheet.create({
    modalView:{
        height: moderateScale(190) ,width: '100%',
        backgroundColor:WHITE,
        position:'absolute',bottom:0,
        borderTopLeftRadius:moderateScale(10),
        borderTopRightRadius:moderateScale(10),
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:moderateScale(20),
        flexWrap: 'wrap'
    },
    wrapper:{
        justifyContent:'center',alignItems:'center',
        width: 60, margin: 5, marginTop: 25,
    },
    text:{
        maxWidth:moderateScale(50),
        textAlign:'center',
        color:SUBNAME,
        fontWeight:'600',
        fontSize: moderateScale(10),
        marginTop:moderateScale(10)
    },
    Img:{
        width:moderateScale(30),
        height:moderateScale(30),
    }
});

export default styles;
