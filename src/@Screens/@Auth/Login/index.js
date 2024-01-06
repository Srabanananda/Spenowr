/* eslint-disable react/no-unescaped-entities */

/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import APP_CONSTANT from '../../../constants/Constant';
import SIgnInForm from './SIgnInForm';
import styles from './styles';
import { moderateScale } from 'react-native-size-matters';

const LoginScreen =({...props})=> {

    const {navigation} = props;

    const btnSignuponClicked = ()=> {
        navigation.navigate('Register');
    };

    const _handleSIgnInFLow =reponseStatus => {
        if (reponseStatus == APP_CONSTANT.STRING_CONSTANT.SUCCESS_STATUS) 
            navigation.navigate('Register');
    };
      
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                    
                <View style={styles.logoContainer}>
                    <Image resizeMode={'contain'} source={require('@Assets/images/application_logo.png')} style={styles.logoImg}></Image>
                </View>

                <SIgnInForm callBackFRomServer={_handleSIgnInFLow} navigation={navigation} ></SIgnInForm>

                <View style={styles.signUpContainer}>
                    <Text style={styles.notHaveAccount}> Don't Have an Account?</Text>
                    <TouchableOpacity onPress={() => btnSignuponClicked()}>
                        <Text style={{ fontSize: moderateScale(14), fontWeight: 'bold', color: APP_CONSTANT.COLOR.APP_PINK_COLOR }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

LoginScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
};



export default LoginScreen;