
/**
 * Create By @name Sukumar_Abhijeet 
 */

import Config from '../../../@Config/default';
import {StyleSheet,Platform} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import APP_CONSTANT from '../../../constants/Constant';

const {COLOR : {WHITE,DARK_BLACK,APP_PINK_COLOR}} = Config;

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor:WHITE,
        flex: 1,
        justifyContent:'center',
        paddingHorizontal:moderateScale(20)
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:moderateScale(20)
    },
    logoImg: {
        width: moderateScale(220),
        height: moderateScale(50),
    },
    loginContainer: {
        backgroundColor: 'white',

    },
    signUpContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop:moderateScale(10)
    },
    SignUptext: {
        padding: 5,
        color: DARK_BLACK,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: moderateScale(12),
    },
    container: {
        
    },
    input: {
        height: 40,
        borderBottomColor: APP_CONSTANT.COLOR.DARK_BLACK,
        borderBottomWidth: 1,
        margin: 10,
        padding: 5,
        color: APP_CONSTANT.COLOR.DARK_BLACK

    },
    buttonDesign: {
        padding: 10,
        backgroundColor: APP_CONSTANT.COLOR.APP_PINK_COLOR,
        height: 60,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignContent: 'center',
        alignItems: 'center'

    },
    LoginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',

    },
    termConditionText: {
        color: APP_CONSTANT.COLOR.DARK_BLACK,
        textAlign: 'center',
        fontSize: moderateScale(10),
        justifyContent: 'space-between',
        marginLeft: moderateScale(5),
        textDecorationLine: 'underline',
        fontStyle:'italic'
    },

    errorText: {
        color: '#E67E22',
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center'

    },
    checkboxContainer: {
        flexDirection: 'row',
        margin: 10,
        alignItems:'center'
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        marginLeft: 10,
        fontSize: moderateScale(10),
        textAlign: 'center',
        justifyContent: 'space-between',
        color: APP_CONSTANT.COLOR.DARK_BLACK
    },

    userTypeDesign: {
        height: 40,
        borderBottomColor: APP_CONSTANT.COLOR.DARK_BLACK,
        borderBottomWidth: 1,
        margin: 20,
        padding: 5,
        color: APP_CONSTANT.COLOR.DARK_BLACK,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: (Platform.OS == 'ios') ? 20 : 0
    },

    Alert_Main_View: {

        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,

    },

    Alert_Title: {

        fontSize: 25,
        color: '#fff',
        textAlign: 'center',
        padding: 10,
        height: '28%'

    },

    Alert_Message: {

        fontSize: 22,
        color: '#fff',
        textAlign: 'center',
        padding: 10,
        height: '42%'

    },

    buttonStyle: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EF2D56',
        margin: 4,
        borderRadius:moderateScale(4)
    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: moderateScale(12),
        fontWeight:'bold'
    },

    labeldrop: {
        color: '#ffffff',
        marginBottom: 5,
        marginLeft: 5,
        fontSize:2,
    },
    HeaderTextStyle: {
        fontSize: 18,
    },
    
    dropdownInput: {
        borderBottomColor: APP_CONSTANT.COLOR.DARK_BLACK,
        marginLeft: 10,
        color: APP_CONSTANT.COLOR.DARK_BLACK

    },
    planBox:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    changeText:{
        color:APP_PINK_COLOR,
        fontWeight:'bold',
        marginRight:moderateScale(15)
    }
});

export default styles;