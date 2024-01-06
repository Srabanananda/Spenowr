/**
 * Create By @name Sukumar_Abhijeet
 */

import React,{useEffect,useRef} from 'react';
import { StatusBar,View,StyleSheet, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import reduxStore from './src/@Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import { NavigationContainer} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { MenuProvider } from 'react-native-popup-menu';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {withIAPContext} from 'react-native-iap';
import CurrencyProvider from './src/@Context';
import AppRouter from './src/@Routing';
import {setUrlConfig} from './src/@Utils/axiosFiles/Interceptor';
import ScreenLoader from './src/@GlobalComponents/ScreenLoader';
import MobileAds,{MaxAdContentRating} from 'react-native-google-mobile-ads';
import { ForceUpdate } from './src/@Utils/helperFiles/helpers';
LogBox.ignoreAllLogs();
export const reduxPersistStore = persistStore(reduxStore); 
const STATUSBAR_HEIGHT = getStatusBarHeight();

export const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar backgroundColor={backgroundColor} translucent {...props} />
    </View>
);

const App = () =>{
    const navigationRef = useRef();
    const routeNameRef = useRef();

    React.useEffect(() => {
        ForceUpdate()
    }, [])
    const analyticsLogScreenView = async(logData) =>{
        await analytics().logScreenView(logData);
    };


    const InitializeAds = () =>{
        MobileAds()
            .setRequestConfiguration({
                maxAdContentRating: MaxAdContentRating.PG,
                tagForChildDirectedTreatment: true,
                tagForUnderAgeOfConsent: true,
                testDeviceIdentifiers: ['EMULATOR'],
            })
            .then(() => {
                MobileAds.initialize()
                    .then(adapterStatuses => {
                        // console.log('adapterStatuses',adapterStatuses);
                    });
            })
            .catch((error)=>{
                // console.log('Error MobileAds',error);
            });
    };

    useEffect(()=>{
        setUrlConfig();
        GoogleSignin.configure();
        InitializeAds();
    },[]);

    return(
        <Provider store={reduxStore}>
            <CurrencyProvider>
                <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
                    <PersistGate loading={<ScreenLoader />} persistor={reduxPersistStore}>
                        <MenuProvider>
                                <NavigationContainer
                                    onReady={() =>
                                        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
                                    }
                                    onStateChange={async () => {
                                        const previousRouteName = routeNameRef.current;
                                        const currentRouteName = navigationRef.current.getCurrentRoute().name;
                                        if (previousRouteName !== currentRouteName) {
                                            const trackObj = {
                                                screen_name: currentRouteName,
                                                screen_class: currentRouteName,
                                            };
                                            analyticsLogScreenView(trackObj);
                                        }
                                    }}
                                    ref={navigationRef}
                                >
                                    <AppRouter />
                                </NavigationContainer>
                        </MenuProvider>
                    </PersistGate>
            </CurrencyProvider>
        </Provider>
    );
};
export default withIAPContext(App);

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    }
});
