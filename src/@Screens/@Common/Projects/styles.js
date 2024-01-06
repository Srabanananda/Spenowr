/**
 * Create By @name Sukumar_Abhijeet,
 */

import {StyleSheet} from 'react-native';

import Config from '@Config/default';
import { moderateScale, scale } from 'react-native-size-matters';

const {COLOR:{WHITE,APP_PINK_COLOR,APP_THEME_COLOR,SUBNAME,BLACK}} = Config;


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: moderateScale(2),
        paddingVertical: moderateScale(5)
    },
    detailsContainer: {
        padding: moderateScale(8)
    },
    description: {
        fontSize: moderateScale(12),
        marginTop: moderateScale(3),
        marginBottom: moderateScale(6),
        fontWeight: '400'
    },
    address: {
        color: SUBNAME,
        fontSize: moderateScale(11)
    },
    title: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
    },
    price: {
        marginTop: moderateScale(4),
        fontWeight: 'bold'
    },
    submissions: {
        marginTop: moderateScale(5),
        alignSelf: 'flex-end',
        fontSize: moderateScale(11)
    },
    duration: {
        fontSize: moderateScale(12),
        marginBottom: moderateScale(5)
    },
    posted: {
        color: SUBNAME,
        fontSize: moderateScale(12),
        marginTop: moderateScale(5)
    }
});

export default styles;