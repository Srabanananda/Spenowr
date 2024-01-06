
/**
 * Create By @name Sukumar_Abhijeet 
 */

import Config from '../../../@Config/default';
import {StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
const {COLOR : {WHITE,SUBNAME,LIGHTGREY,APP_PINK_COLOR}} = Config;

const styles = StyleSheet.create({
    container: {
        backgroundColor: WHITE,
        padding:moderateScale(15)
    },
    parentBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:moderateScale(20),
        borderBottomColor : LIGHTGREY,
        borderBottomWidth:1
    },
    internalBox:{
        width:'70%',
    },
    detailValueText:{
        fontWeight:'bold'
    },
    detailNameText:{
        color:SUBNAME
    },
    subText:{
        fontSize:moderateScale(11),
        color:APP_PINK_COLOR
    }
});

export default styles;