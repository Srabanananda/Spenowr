/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import {createStackNavigator,} from '@react-navigation/stack';
import PropTypes from 'prop-types';
import SplashScreen from '../@Screens/@Common/Splash';
import LoginScreen from '../@Screens/@Auth/Login';
import RegisterScreen from '../@Screens/@Auth/Register';
import TermsAndConditionsScreen from '../@Screens/@Auth/TermsAndConditions';
import ForgotPasswordScreen from '../@Screens/@Auth/Login/ForgotPassword';
import OnboardingScreen from '../@Screens/@Auth/Onboarding';
import AddSpecializationsScreen from '../@Screens/@Auth/Onboarding/AddSpecializations';
import LandingScreen from '../@Screens/@Auth/Landing';
import ForceUpgradeScreen from '../@Screens/@Common/ForceUpgrade';
import AppIntroScreen from '../@Screens/@Auth/AppIntro';
import SubscriptionScreen from '../@Screens/@Common/Subscription/index';

const Stack = createStackNavigator();

const AuthNavigator = ({...props}) => {
    const {navigation} = props;
    const willLogout = navigation.getParam('logout');
    return (
        <Stack.Navigator headerMode="none"  initialRouteName={'Splash'}>
            <Stack.Screen component={SplashScreen} initialParams={{logout:willLogout? true : false}} name="Splash"  />
            <Stack.Screen component={LandingScreen} name="Landing" />
            <Stack.Screen component={OnboardingScreen} name='Onboarding' />
            <Stack.Screen component={AddSpecializationsScreen} name='Specialization' />
            <Stack.Screen component={LoginScreen} name="Login"  />
            <Stack.Screen component={RegisterScreen} name="Register" />
            <Stack.Screen component={TermsAndConditionsScreen} name="TermsAndCond"  />
            <Stack.Screen component={ForgotPasswordScreen} name="ForgotPassword"  />
            <Stack.Screen component={ForceUpgradeScreen} name="ForceUpgrade"  />
            <Stack.Screen component={AppIntroScreen} name='AppIntro' />
            <Stack.Screen component={SubscriptionScreen} name={'Subscription'} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;


AuthNavigator.propTypes = {
    navigation: PropTypes.object.isRequired,
};
