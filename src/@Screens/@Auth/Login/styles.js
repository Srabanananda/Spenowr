
/**
 * Create By @name Sukumar_Abhijeet 
 */

import Config from '../../../@Config/default';
import {StyleSheet,Platform} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
const {COLOR : {WHITE,DARK_BLACK,APP_PINK_COLOR,RED,SUBNAME}} = Config;

const styles = StyleSheet.create({
    container: {
        backgroundColor: WHITE,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1,
        marginTop: 20,
    },
    logoImg: {
        width: '70%',
        height: 100,
        alignContent: 'center',
        justifyContent: 'center'
    },
    loginContainer: {
        backgroundColor: 'white',

    },
    signUpContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    SignUptext: {
        padding: 5,
        color: DARK_BLACK,
        alignContent: 'center',
        justifyContent: 'center',
        fontSize: 18,
        marginRight: 10,
    },

    notHaveAccount: {
        padding: moderateScale(5),
        color: DARK_BLACK,
        alignContent: 'center',
        justifyContent: 'center',
        fontSize: moderateScale(12),
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
        margin: 4
    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        marginTop: -5
    },
    HeaderTextStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 8
    },

    //FORM STYLES
    formcontainer: {
        marginBottom: moderateScale(40),
        marginTop: 40,
        padding: 20
    },

    input: {
        flexDirection: 'row',
        height: 40,
        borderBottomColor: DARK_BLACK,
        borderBottomWidth: 1,
        margin: 20,
        padding: 5,
        color: DARK_BLACK

    },
    buttonDesign: {
        padding: 10,
        backgroundColor: APP_PINK_COLOR,
        height: 60,
        margin: 20,
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
    errorText: {
        color: RED,
        fontSize: moderateScale(10),
        fontWeight:'600'
    },
    passwordHideDesign: {
        width: 40,
        height: 40,
        justifyContent: 'center'
    },
    activityIndicator: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 300
    },
    ForgotPasswordText: {
        color: APP_PINK_COLOR,
        textAlign: 'right',
        fontSize: moderateScale(12),
        fontWeight: 'bold',
        justifyContent: 'flex-end',
        marginTop: moderateScale(8)
    },
    orText:{
        alignSelf:'center',
        marginVertical:moderateScale(10),
        color:SUBNAME
    },
    googleButtonStyle:{ width: 192, height: 48,alignSelf:'center' }

});

export default styles;