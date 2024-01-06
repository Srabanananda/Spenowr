/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {SafeAreaView,View } from 'react-native';
import DefaultHeader from '../../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../../@GlobalStyles';
import styles from './styles';
import PushNotifications from './PushNotifications';

const AppSettingsScreen = () =>{

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'App Settings'} />
            <View style={styles.container}>
                <PushNotifications />
            </View>
        </SafeAreaView>
    );
};

export default AppSettingsScreen;