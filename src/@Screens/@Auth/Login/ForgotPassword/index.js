/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { SafeAreaView,View,Image, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import ForgotPasswordForm from './ForgotPasswordForm';
import DefaultHeader from '../../../../@GlobalComponents/DefaultHeader';

const ForgotPasswordScreen = ({...props}) =>{
    const {navigation} =props;
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <DefaultHeader headerText={'ForgotPassword'} />
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image resizeMode={'contain'} source={require('@Assets/images/application_logo.png')} style={styles.logoImg}></Image>
                </View>
                <ForgotPasswordForm  navigation={navigation} ></ForgotPasswordForm>
            </View>
        </SafeAreaView>
    );
};

ForgotPasswordScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
};

export default ForgotPasswordScreen;