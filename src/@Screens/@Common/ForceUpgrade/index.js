/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View, SafeAreaView, Platform,Text} from 'react-native';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import { GlobalStyles } from '../../../@GlobalStyles';
import PropTypes from 'prop-types';
import Config from '@Config/default';
import UpgradeApp from '../../../@Utils/helperFiles/UpgradeApp';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

const {APPSTORE_LINK,PLAYSTORE_LINK} = Config;

const ForceUpgradeScreen = () =>{
    const redirectUrl = Platform.OS === 'ios' ? APPSTORE_LINK : PLAYSTORE_LINK;

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <View style={styles.container}>
                <View style={{height:'88%'}}>
                    <Text style={styles.headerText} >Upgrade Your App</Text>
                    <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>
                        <View style={styles.iconCircle}>
                            <Icon name={'cogs'} size={50} style={styles.bagIcon} />
                        </View>
                        <Text style={styles.betterText}>We are better than Ever !!</Text>
                        <Text style={styles.description}>A new version of spenowr is available now,</Text>
                        <Text style={styles.description}>Please upgrade to continue seemeless interaction with the app.</Text>
                    </View>
                </View>
                <DefaultButton buttonText={'UPGRADE NOW'} onPress={()=>UpgradeApp(redirectUrl)} showLoader={false} />
            </View>
        </SafeAreaView>
    );
};

ForceUpgradeScreen.propTypes = {
    route: PropTypes.object.isRequired,
};

export default ForceUpgradeScreen;