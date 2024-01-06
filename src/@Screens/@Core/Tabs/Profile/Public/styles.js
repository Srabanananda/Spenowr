/**
 *  Created By @name Sukumar_Abhijeet
 */

import {StyleSheet} from 'react-native';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{APP_PINK_COLOR,SUBNAME}} = Config;

const styles = StyleSheet.create({
    editButton:{
        color:APP_PINK_COLOR,
        fontSize:moderateScale(14)
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
    optionModal:{
        backgroundColor : '#fff',
        width:'95%',
        height:moderateScale(60),
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderRadius:moderateScale(10)
    },
    blockHeadText: {alignSelf:'center',marginVertical:moderateScale(10)},
    blockSubText : {
        alignSelf:'center',
        color : SUBNAME,
        fontSize:moderateScale(12)
    }
});

export default styles;