import React, { useState, useEffect } from 'react';
import { Image, Platform, Text, View } from 'react-native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { moderateScale } from 'react-native-size-matters';
import {useIsFocused, useNavigationState } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// TAB SCREENS
import HomeScreen from '../@Screens/@Core/Tabs/Home';
import ShopScreen from '../@Screens/@Core/Tabs/Shop';
import ProfileScreen from '../@Screens/@Core/Tabs/Profile';
import MoreScreen from '../@Screens/@Core/Tabs/More';
import SpenowrModal from '../@Screens/@Core/Tabs/Spenowr/Modal';

// CONFIG
import Config from '../@Config/default';
const { COLOR } = Config;

// MAIN STACK
import MainStack from './MainStack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const imageStyle = {
    width: moderateScale(20),
    height: moderateScale(20)
};

const TabIcons = ({ imageOption, focused }) => {
    const renderTabImage = () => {
        switch (imageOption) {
            case 'Home':
                return (
                    <Image
                        resizeMode={'contain'}
                        source={
                            focused ?
                                require('@Assets/tabs/homeRed.svg') :
                                require('@Assets/tabs/home.svg')
                        }
                        style={imageStyle}
                    />
                );
            case 'Shop':
                return (
                    <Image
                        resizeMode={'contain'}
                        source={
                            focused ?
                                require('@Assets/tabs/shopRed.svg') :
                                require('@Assets/tabs/shop.svg')
                        }
                        style={imageStyle}
                    />
                );
            case 'Explore':
                return (
                    <Image
                        resizeMode={'contain'}
                        source={
                            focused ?
                                require('@Assets/tabs/DiscoverSv.svg') :
                                require('@Assets/tabs/DiscoverSv.svg')
                        }
                        style={imageStyle}
                    />
                );
            case 'Profile':
                return (
                    <Image
                        resizeMode={'contain'}
                        source={
                            focused ?
                                require('@Assets/tabs/profileRed.svg') :
                                require('../assets/tabs/profile.svg')
                        }
                        style={imageStyle}
                    />
                );
            case 'More':
                return (
                    <Image
                        resizeMode={'contain'}
                        source={
                            focused ?
                                require('@Assets/tabs/moreRed.svg') :
                                require('../assets/tabs/more.svg')
                        }
                        style={imageStyle}
                    />
                );
        }
    };

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {renderTabImage()}
        </View>
    );
};

const getTabBarIcon = (route, focused) => {
    const { name } = route;
    return <TabIcons focused={focused} imageOption={name} />;
};

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={HomeScreen} name="HomeTab" />
            {MainStack()}
        </Stack.Navigator>
    );
}

function ShopStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={ShopScreen} name="ShopTab" />
            {MainStack()}
        </Stack.Navigator>
    );
}

function SpenowrStack({ setIsDiscoverFocused }) {
    const isFocused = useIsFocused();
    const navigationState = useNavigationState(state => state);

    useEffect(() => {
        if (isFocused) {
            setIsDiscoverFocused(true);
        } else {
            setIsDiscoverFocused(false);
        }
    }, [isFocused]);

    useEffect(() => {
        if (navigationState && navigationState.routes) {
            const activeRoute = navigationState.routes[navigationState.index];
            if (activeRoute.name !== 'Modal') {
                setIsDiscoverFocused(false);
            }
        }
    }, [navigationState]);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                component={SpenowrModal}
                name='Modal'
                options={{
                    animationEnabled: true,
                    cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.15)' },
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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={ProfileScreen} name="ProfileTab" />
            {MainStack()}
        </Stack.Navigator>
    );
}

function MoreStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={MoreScreen} name="MoreTab" />
            {MainStack()}
        </Stack.Navigator>
    );
}

function SafeTabBar(props) {
  return (
    <SafeAreaView edges={['left', 'right']} style={{ backgroundColor: '#fff' }}>
      <BottomTabBar {...props} />
    </SafeAreaView>
  );
}

function BottomTabs() {
    const [isDiscoverFocused, setIsDiscoverFocused] = useState(false);
    const [isDiscoverTabClicked, setIsDiscoverTabClicked] = useState(false);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (isDiscoverTabClicked) {
            setIsDiscoverFocused(true);
        }
    }, [isDiscoverTabClicked]);

    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            // tabBar={props => <SafeTabBar {...props} />}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'Explore') {
                        return <TabIcons focused={isDiscoverFocused} imageOption="Explore" />;
                    } else {
                        return getTabBarIcon(route, focused);
                    }
                }
            })}
            tabBarOptions={{
                activeTintColor: COLOR.APP_PINK_COLOR,
                style: {
          height: moderateScale(55) + Math.max(insets.bottom, 2),
          paddingBottom: Platform.OS === 'ios'
            ? insets.bottom
            : Math.max(insets.bottom, 5),
          width: '99%',
          alignSelf: 'center',
        },

            }}
        >
            <Tab.Screen 
            name="Home"
            component={HomeStack}
            options={{
                tabBarLabel: ({ focused }) => (
                    <Text style={{
                        // fontSize: screenWidth >= 768 ? moderateScale(16) : moderateScale(12), // Adjust font size
                        fontSize: moderateScale(10),
                        fontWeight: 'bold',
                        color: focused ? COLOR.APP_PINK_COLOR : 'gray', // Highlight color for active tab
                    }}>
                        Home
                    </Text>
                ),
            }}
            listeners={{
                tabPress: () => {
                    setIsDiscoverFocused(false);
                    setIsDiscoverTabClicked(false);
                }
            }} />
            <Tab.Screen component={ShopStack} name="Shop" 
             options={{
                tabBarLabel: ({ focused }) => (
                    <Text style={{
                        // fontSize: screenWidth >= 768 ? moderateScale(16) : moderateScale(12), // Adjust font size
                        fontSize: moderateScale(10),
                        fontWeight: 'bold',
                        color: focused ? COLOR.APP_PINK_COLOR : 'gray', // Highlight color for active tab
                    }}>
                        Shop
                    </Text>
                ),
            }}
            listeners={{
                tabPress: () => {
                    setIsDiscoverFocused(false);
                    setIsDiscoverTabClicked(false);
                }
            }} />
            <Tab.Screen
                name="Explore"
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{
                            // fontSize: screenWidth >= 768 ? moderateScale(16) : moderateScale(12), // Adjust font size
                            fontSize: moderateScale(10),
                            fontWeight: 'bold',
                            color: focused ? COLOR.APP_PINK_COLOR : 'gray', // Highlight color for active tab
                        }}>
                            Explore
                        </Text>
                    ),
                }}
                children={() => <SpenowrStack setIsDiscoverFocused={setIsDiscoverFocused} />}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        setIsDiscoverTabClicked(true);
                    },
                    state: e => {
                        if (route.state && route.state.index === 0) {
                            setIsDiscoverFocused(true);
                        } else {
                            setIsDiscoverFocused(false);
                        }
                    }
                })}
            />
            <Tab.Screen component={ProfileStack} name="Profile" 
             options={{
                tabBarLabel: ({ focused }) => (
                    <Text style={{
                        // fontSize: screenWidth >= 768 ? moderateScale(16) : moderateScale(12), // Adjust font size
                        fontSize: moderateScale(10),
                        fontWeight: 'bold',
                        color: focused ? COLOR.APP_PINK_COLOR : 'gray', // Highlight color for active tab
                    }}>
                        Profile
                    </Text>
                ),
            }}
            listeners={{
                tabPress: () => {
                    setIsDiscoverFocused(false);
                    setIsDiscoverTabClicked(false);
                }
            }} />
            <Tab.Screen component={MoreStack} name="More" 
              options={{
                tabBarLabel: ({ focused }) => (
                    <Text style={{
                        // fontSize: screenWidth >= 768 ? moderateScale(16) : moderateScale(12), // Adjust font size
                        fontSize: moderateScale(10),
                        fontWeight: 'bold',
                        color: focused ? COLOR.APP_PINK_COLOR : 'gray', // Highlight color for active tab
                    }}>
                        More
                    </Text>
                ),
            }}
            listeners={{
                tabPress: () => {
                    setIsDiscoverFocused(false);
                    setIsDiscoverTabClicked(false);
                }
            }} />
        </Tab.Navigator>
    );
}

export default BottomTabs;
