/**
 *  Created By @name Sukumar_Abhijeet
 */

import {StyleSheet} from 'react-native';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
 
const {COLOR:{WHITE,APP_PINK_COLOR,DARK_BLACK,DARKGRAY,LIGHTGREY}} = Config;
 
const styles = StyleSheet.create({
    ModalContainer:{
        width:'95%',
        backgroundColor:WHITE,
        padding:moderateScale(10),
        borderRadius:moderateScale(8)
    },
});
 
export default styles;