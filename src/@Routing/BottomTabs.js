/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, } from '@react-navigation/stack';

//TAB SCREENS
import HomeScreen from '../@Screens/@Core/Tabs/Home';
import ShopScreen from '../@Screens/@Core/Tabs/Shop';
import ProfileScreen from '../@Screens/@Core/Tabs/Profile';
import MoreScreen from '../@Screens/@Core/Tabs/More';

import TabIcons from './TabIcons';
import MainStack from './MainStack';


import Config from '../@Config/default';
import { moderateScale } from 'react-native-size-matters';
import SpenowrModal from '../@Screens/@Core/Tabs/Spenowr/Modal';
// import CurrencyProvider from '../@Context'
const {COLOR} = Config;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getTabBarIcon = (route, focused) => {
    const { name } = route;
    return <TabIcons focused={focused} imageOption={name} />;
};

function HomeStack() {
    return (
        <Stack.Navigator headerMode="none" >
            <Stack.Screen component={HomeScreen} name="HomeTab" />
            {MainStack()}
        </Stack.Navigator>
    );
}

function ShopStack() {
    return (
        <Stack.Navigator headerMode="none" >
            <Stack.Screen component={ShopScreen} name="ShopTab" />
            {MainStack()}
        </Stack.Navigator>
    );
}

function SpenowrStack() {
    return (
        <Stack.Navigator headerMode="none" >
            <Stack.Screen 
                component={SpenowrModal} 
                name='Modal' 
                options={{
                    animationEnabled: true,
                    cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.15)'},
                    cardOverlayEnabled: true,
                    cardStyleInterpolator: ({ current: { progress } }) => {
                        return {
                            cardStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 0.5, 0.9, 1],
                                    outputRange: [0, 0.25, 0.7, 1],
                                }),
                            },
                            overlayStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.5],
                                    extrapolate: 'clamp',
                                }),
                            },
                        };
                    },
                }} 
            />
            {MainStack()}
        </Stack.Navigator>
    );
}

function ProfileStack() {
    return (
        <Stack.Navigator headerMode="none" >
            <Stack.Screen component={ProfileScreen} name="ProfileTab" />
            {MainStack()}
        </Stack.Navigator>
    );
}

function MoreStack() {
    return (
        <Stack.Navigator headerMode="none" >
            <Stack.Screen component={MoreScreen} name="MoreTab" />
            {MainStack()}
        </Stack.Navigator>
    );
}

function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => getTabBarIcon(route, focused)
            })}
            
            tabBarOptions={{
                activeTintColor:COLOR.APP_PINK_COLOR,
                style: { 
                    height: moderateScale(55),
                    paddingBottom:moderateScale(6)
                },
            }}
        >
            <Tab.Screen component={HomeStack} name="Home" />
            <Tab.Screen component={ShopStack} name="Shop" />
            <Tab.Screen 
                component={SpenowrStack} 
                // listeners={({navigation})=>({
                //     tabPress : (event) => {
                //         if(navigation.isFocused()) {
                //             event.preventDefault();
                //             // navigation.goBack();
                //         }
                //     }
                // })} 
                name="Spenowr"
            />
            <Tab.Screen component={ProfileStack} name="Profile" />
            <Tab.Screen component={MoreStack} name="More" />
        </Tab.Navigator>
    );
}

export default BottomTabs;