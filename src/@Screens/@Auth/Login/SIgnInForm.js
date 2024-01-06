import React, { useRef, useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import * as userActions from '../../../@Redux/actions/userActions';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import styles from './styles';
import { GlobalStyles } from '../../../@GlobalStyles';
import { withNavigation } from '@react-navigation/compat';
import Toast from 'react-native-simple-toast';
import { isEmailValid } from '../../../@Utils/helperFiles/helpers';
import InitiateAuthentication, { checkUserDetails } from '../../../@Utils/helperFiles/Authentication';
import OtpVerify from '../Register/OtpVerify';
import { connect } from 'react-redux';
import Phone from '../../@Common/Phone';

const SignInForm  = ({...props}: any) => {

    const {navigation} = props;

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOtpActive, setIsOtpActive] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState();

    const passRef = useRef();
    const userIdRef = useRef();

    const validateForm =()=> {
        if ((countryCode == null && email.length === '') || (countryCode != null && phone.length === 0) || password.length === 0)  {
            Toast.show('Fields cannot be empty');
            return;
        }

        if (countryCode == null && email!='' && !isEmailValid(email)) {
            Toast.show('Please add a valid email');
            return;
        }

        if(email == '' && countryCode==null){
            if(!countryCode) Toast.show('Please select your country');
            return;
        }

        if(countryCode!=null && phone != '' && phone.length != 10){
            if(!countryCode) Toast.show('Please add a valid Phone');
            return;
        }

        let loginParams = { email,password };
        loginParams.email = (countryCode == null ? email : `${countryCode}${phone}`)
        loginParams.code =  countryCode? countryCode : '';
        InitiateAuthentication(loginParams, true, setLoading, props,mobileVerifyCallback);
    };

    const forgotPassClicked = () => navigation.navigate('ForgotPassword');

    const mobileVerifyCallback = (userId) => {
        userIdRef.current = userId;
        setIsOtpActive(true);
    };

    const onVerifyCallBack = () => {
        setIsOtpActive(false);
        setLoading(true);
        checkUserDetails(setLoading,props);
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.formcontainer} >
            <Phone placeholder={'Email / Phone'} countryCode={setCountryCode} phone={setPhone} email={setEmail}/>
            <TextInput
                onChangeText={(value) => setPassword(value)}
                onSubmitEditing={() => validateForm()}
                placeholder="Password"
                placeholderTextColor="#414756"
                ref={passRef} secureTextEntry={true}
                style={GlobalStyles.textInput}
            />
            <TouchableOpacity onPress={() => forgotPassClicked()}>
                <Text style={styles.ForgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <DefaultButton buttonText={'Login'} onPress={() => validateForm()} showLoader={loading} />
            <OtpVerify isActive={isOtpActive} onVerifyCallBack={onVerifyCallBack} setIsActive={setIsOtpActive} userId={userIdRef.current} />
        </KeyboardAvoidingView>
    );
};

const mapStateToProps = () => {
    return {
    };
};
const mapDispatchToProp = (dispatch) => ({
    updateUserAccessToken: token =>
        dispatch(userActions.updateUserAccessToken(token)),
    updateUserDetails: (instituteObj, profileObj) =>
        dispatch(userActions.updateUserDetails(instituteObj, profileObj))
});


export default connect(mapStateToProps, mapDispatchToProp)(withNavigation(SignInForm));