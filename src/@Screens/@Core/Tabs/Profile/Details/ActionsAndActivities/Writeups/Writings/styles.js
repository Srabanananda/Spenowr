/**
 * Create By @name Sukumar_Abhijeet,
 */

import {StyleSheet} from 'react-native';

import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{WHITE,LIGHTGREY}} = Config;

const styles = StyleSheet.create({
    cardBox:{
        backgroundColor:WHITE,
        width:'100%',
        marginBottom : moderateScale(20),
        borderColor:LIGHTGREY,
        borderWidth:1,
        borderRadius:moderateScale(4),
        padding:moderateScale(10),
    },
    imageContainer:{
        minHeight:moderateScale(300),
        marginTop:moderateScale(10),
        borderRadius:moderateScale(6),
        overflow:'hidden'
    },
    quoteName:{
        paddingBottom:moderateScale(10),
        fontSize:moderateScale(18),
        fontWeight:'bold',
        textDecorationLine:'underline'
    },
    feedDesc:{
        textAlign:'center',
        maxWidth:moderateScale(150),
        alignSelf:'center',
        fontSize:moderateScale(16),
        color:'#fff',
    },
});

export default styles;