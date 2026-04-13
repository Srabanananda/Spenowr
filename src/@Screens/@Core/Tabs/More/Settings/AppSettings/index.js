/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import { View } from 'react-native';
import DefaultHeader from '../../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../../@GlobalStyles';
import styles from './styles';
import PushNotifications from './PushNotifications';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppSettingsScreen = () =>{

    return(
        <SafeAreaView edges={['left', 'right']} style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'App Settings'} />
            <View style={styles.container}>
                <PushNotifications />
            </View>
        </SafeAreaView>
    );
};

export default AppSettingsScreen;