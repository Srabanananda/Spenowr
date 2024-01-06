
/**
 * Create By @name Sukumar_Abhijeet 
 */

import Config from '../../../@Config/default';
import {StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
const {COLOR : {SUBNAME,WHITE,APP_THEME_COLOR,APP_PINK_COLOR}} = Config;

const styles = StyleSheet.create({
    container: {
        backgroundColor: WHITE,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding:moderateScale(15)
    },
    actionBox:{
        flexDirection:'row',alignItems:'center',
    },
    images:{
        width:moderateScale(25),
        height:moderateScale(25)
    },
    socialIconWrapper:{
        flexDirection:'row',
        marginTop:moderateScale(2)
    },
    profilePic:{
        width:moderateScale(90),
        height:moderateScale(90),
        borderRadius:moderateScale(45),
        backgroundColor:APP_THEME_COLOR,
        borderWidth:.4,
        borderColor:APP_THEME_COLOR,
        overflow:'hidden'
    },
    name:{
        fontSize:moderateScale(11),
        color: APP_PINK_COLOR,
        fontWeight:'bold',
        marginBottom:moderateScale(5)
    },
    title:{
        fontWeight:'bold',
        fontSize:moderateScale(12),
        marginBottom:moderateScale(3)
    },
    justifyAlign:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:moderateScale(3),
    },
    category:{
        color:SUBNAME,
        fontSize:moderateScale(10)
    },
    likes:{
        color:SUBNAME,
        fontSize:moderateScale(10)
    }
});

export default styles;