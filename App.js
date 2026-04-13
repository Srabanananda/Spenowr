/**
 * Create By @name Sukumar_Abhijeet
 */

import React,{useEffect,useRef} from 'react';
import { StatusBar, View, StyleSheet, LogBox, AppState, Platform, InteractionManager } from 'react-native';
import { Provider } from 'react-redux';
import reduxStore from './src/@Redux/store';
import Config from "@Config/default";
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import { MenuProvider } from 'react-native-popup-menu';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {withIAPContext} from 'react-native-iap';
import CurrencyProvider from './src/@Context';
import AppRouter from './src/@Routing';
import {setUrlConfig} from './src/@Utils/axiosFiles/Interceptor';
import ScreenLoader from './src/@GlobalComponents/ScreenLoader';
import MobileAds,{MaxAdContentRating} from 'react-native-google-mobile-ads';
import { ForceUpdate } from './src/@Utils/helperFiles/helpers';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
LogBox.ignoreAllLogs();

export const navigationRef = createNavigationContainerRef();

export const reduxPersistStore = persistStore(reduxStore); 
const STATUSBAR_HEIGHT = getStatusBarHeight();
const { VERSION_CHECK } = Config;

console.log('VERSION_CHECK app.js',VERSION_CHECK)

export const MyStatusBar = ({ backgroundColor, ...props }) => {
    const insets = useSafeAreaInsets();
    const height =
        Platform.OS === 'android'
            ? STATUSBAR_HEIGHT
            : Math.max(insets.top, 20);
    return (
        <View style={[styles.statusBar, { backgroundColor, height }]}>
            <StatusBar backgroundColor={backgroundColor} translucent {...props} />
        </View>
    );
};

const App = () =>{
    const routeNameRef = useRef();
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = React.useState(appState.current);
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
          if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            console.log('App has come to the foreground!');
          }

          appState.current = nextAppState;
          setAppStateVisible(appState.current);
          console.log('AppState', appState.current);
        });
        return () => subscription.remove();
      }, []);

      React.useEffect(() => {
        if (VERSION_CHECK !== "2") {
            ForceUpdate();
        }
    }, [appStateVisible, VERSION_CHECK]);

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
        InitializeAds();
    },[]);

    // Defer TrackPlayer until UI settles; avoids ForegroundServiceStartNotAllowedException on Android 12+
    useEffect(() => {
        let cancelled = false;
        let timeoutId;
        const handle = InteractionManager.runAfterInteractions(() => {
            const delay = Platform.OS === 'android' ? 1500 : 0;
            timeoutId = setTimeout(async () => {
                if (cancelled) return;
                try {
                    await TrackPlayer.setupPlayer();
                } catch (e) {
                    const code = e?.code;
                    const msg = e?.message ?? String(e);
                    if (code === 'player_already_initialized' || msg.includes('already initialized')) {
                        return;
                    }
                    console.log('TrackPlayer.setupPlayer:', msg);
                }
            }, delay);
        });
        return () => {
            cancelled = true;
            handle?.cancel?.();
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);
    
    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
        <Provider store={reduxStore}>
            <CurrencyProvider>
                <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
                <View style={{ flex: 1 }}>
                    <PersistGate loading={<ScreenLoader />} persistor={reduxPersistStore}>
                        <MenuProvider>
                                <NavigationContainer
                                    ref={navigationRef}
                                    onReady={() => {
                                      routeNameRef.current =
                                        navigationRef.getCurrentRoute()?.name;
                                    }}
                                    onStateChange={async () => {
                                        const previousRouteName = routeNameRef.current;
                                        const currentRouteName =
                                          navigationRef.getCurrentRoute()?.name;
                                        routeNameRef.current = currentRouteName;
                                        if (previousRouteName !== currentRouteName) {
                                            const trackObj = {
                                                screen_name: currentRouteName,
                                                screen_class: currentRouteName,
                                            };
                                            analyticsLogScreenView(trackObj);
                                        }
                                    }}
                                >
                                    <AppRouter />
                                </NavigationContainer>
                        </MenuProvider>
                    </PersistGate>
                </View>
            </CurrencyProvider>
        </Provider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};
export default withIAPContext(App);

const styles = StyleSheet.create({
    statusBar: {
        height: Platform.OS === 'android' ? STATUSBAR_HEIGHT : 59,
    }
});
