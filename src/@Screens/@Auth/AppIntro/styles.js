
/**
 * Create By @name Sukumar_Abhijeet 
 */

import Config from '@Config/default';
import {StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
const {COLOR : {WHITE, SUBNAME}} = Config;

const styles = StyleSheet.create({
    containerWrapper:{
        backgroundColor:WHITE
    },
    nextButton:{
        backgroundColor:'rgba(0, 0, 0,0.15)',
        width:moderateScale(60),
        height:moderateScale(60),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:moderateScale(80),
    },
    skipButtonWrap:{
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:moderateScale(12),
        paddingVertical:moderateScale(8),
    },
    skipLabel:{
        textTransform:'uppercase',
        fontWeight:'bold',
        color:SUBNAME,
        fontSize:moderateScale(14),
    },
    slideContainer:{
        flex:1,
    },
    sliderBodyContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    headerText:{
        fontSize:moderateScale(24),
        fontWeight:'bold',
        color:WHITE
    },
    content:{
        color:WHITE,
        marginTop:moderateScale(16),
        textAlign:'center',
        maxWidth:moderateScale(280)
    },
    imageContainer:{
        justifyContent:'center',
        alignItems:'center'  ,
        flex:1  
    },
    imageSet:{
        width:moderateScale(350),
        height:moderateScale(260)
    }
});

export default styles;