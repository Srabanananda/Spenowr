import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import APP_CONSTANT from '../../../../constants/Constant';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import { resetPassword } from '../../../../@Endpoints/Auth';
import SimpleToast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import Phone from '../../../@Common/Phone';
import { isEmailValid } from '../../../../@Utils/helperFiles/helpers';

const ForgotPasswordForm = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState();
    const [loader, setLoader] = useState(false);

    const validateForm = () => {

        if ((countryCode == null && email.length === 0) || (countryCode != null && phone.length === 0))  {
            SimpleToast.show('Please enter your email / phone');
            return;
        }

        if (countryCode == null && email!='' && !isEmailValid(email)) {
            SimpleToast.show('Please add a valid email');
            return;
        }

        if(email == '' && countryCode==null){
            if(!countryCode) SimpleToast.show('Please select your country');
            return;
        }

        if(countryCode!=null && phone != '' && phone.length != 10){
            if(!countryCode) SimpleToast.show('Please add a valid Phone');
            return;
        }
        _servicdeCAllTOAuthenticateUser();
    };

    const _servicdeCAllTOAuthenticateUser = () => {
        setLoader(true);
        const data = new FormData();
        data.append('email', countryCode == null ? email : phone);
        countryCode && data.append('code',countryCode);
        resetPassword(data)
            .then((response)=>{
                if (response.status === 'success') {
                    Alert.alert(
                        response.data.response_msg,'',
                        [
                            {
                                text: 'Ok',
                                onPress: () => navigation.navigate('Login'),
                                style: 'cancel',
                            },
                        ],
                    );
                } else {
                    SimpleToast.show('Oops something went wrong');
                }
            })
            .finally(()=>setLoader(false));
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container} >
            <Text style={styles.samppleText}>Please enter your registered email Id to reset your password</Text>
            <Phone placeholder={'Email / Phone'} countryCode={setCountryCode} phone={setPhone} email={setEmail}/>
            <DefaultButton buttonText={'Verify'} onPress={validateForm} showLoader={loader} />
            <View style={{ height: 200 }}></View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
        marginTop: 40,
        padding: 20,
        justifyContent: 'center',


    },

    input: {
        height: 40,
        borderBottomColor: APP_CONSTANT.COLOR.DARK_BLACK,
        borderBottomWidth: 1,
        margin: 20,
        padding: 5,
        color: APP_CONSTANT.COLOR.DARK_BLACK

    },
    buttonDesign: {
        padding: 10,
        backgroundColor: APP_CONSTANT.COLOR.APP_PINK_COLOR,
        height: 60,
        margin: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 10

    },
    LoginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',

    },

    samppleText: {
        color: '#414756',
        fontSize: 18,
        //marginLeft: 25,
        marginHorizontal: 25,
        //justifyContent: "flex-start",
        textAlign: 'center',
        marginBottom: 40,


    },

    errorText: {
        color: '#E67E22',
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center'

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
    }

});

export default ForgotPasswordForm;