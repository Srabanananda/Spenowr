/**
 * Create By @name Sukumar_Abhijeet
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthStack';
import BottomTabs from './BottomTabs';

const RootStack = createNativeStackNavigator();

const AppRouter = () => (
  <RootStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="AuthStack">
    <RootStack.Screen name="AuthStack" component={AuthNavigator} />
    <RootStack.Screen name="CoreTabs" component={BottomTabs} />
  </RootStack.Navigator>
);

export default AppRouter;
