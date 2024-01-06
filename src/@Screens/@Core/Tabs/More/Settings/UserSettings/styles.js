/**
 *  Created By @name Sukumar_Abhijeet
 */

import {StyleSheet} from 'react-native';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{WHITE,APP_PINK_COLOR,DARK_BLACK,DARKGRAY,LIGHTGREY}} = Config;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:WHITE,
        padding:moderateScale(20)
    }
});

export default styles;