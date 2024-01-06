/**
 * Create By @name Sukumar_Abhijeet 
 */

import  {StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
const {COLOR:{APP_PINK_COLOR,LIGHTGREY}} = Config;


const styles = StyleSheet.create({
    typeWrapper:{
        borderBottomColor:'#ebebeb',
        borderBottomWidth:1,
        paddingVertical:moderateScale(5),
        alignSelf:'center',
        width:'100%',
        marginVertical:moderateScale(10)
    },
    modalContainer:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:'#fff',
        padding:moderateScale(10)
    },
    ViewWrapper:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:moderateScale(10),
        padding:moderateScale(10),
        borderColor:LIGHTGREY,
        borderWidth:1,
        borderRadius:moderateScale(5),
        marginBottom:moderateScale(10)
    },
    ViewWrapperSelected:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:moderateScale(10),
        padding:moderateScale(10),
        backgroundColor:APP_PINK_COLOR,
        borderRadius:moderateScale(5),
        marginBottom:moderateScale(10)
    }
    
});

export default styles;