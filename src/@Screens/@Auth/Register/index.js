
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
    ScrollView
} from 'react-native';

import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import styles from './styles';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../@GlobalStyles';

const  RegisterScreen = ({...props})=> {
    const {navigation} = props;
    return (
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.logoContainer}>
                    <Image 
                        resizeMode={'contain'} 
                        source={require('@Assets/images/application_logo.png')} 
                        style={styles.logoImg} 
                    />
                </View>
                <SignupForm {...props} />
                <View style={styles.signUpContainer}>
                    <Text style={styles.SignUptext}>Already Registered?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ fontSize: moderateScale(16), fontWeight: 'bold', color: '#EF2D56' }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

RegisterScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
};


export default RegisterScreen;