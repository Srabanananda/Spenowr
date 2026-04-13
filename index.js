/**
 * @format
 */
import '@react-native-firebase/app';
import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import { PlaybackService } from './src/@Utils/services';
import PushNotification from 'react-native-push-notification';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // Process the remoteMessage and create a local notification if needed
    // PushNotification.localNotification({
    //     channelId: remoteMessage.data.channelId || 'default-channel-id',
    //     title: remoteMessage.data.title,
    //     message: remoteMessage.data.message,
    //     data: remoteMessage.data,
    // });
});


messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);
    // Show an in-app notification or update the UI accordingly
});


LogBox.ignoreLogs(['EventEmitter.removeListener']);

function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        // App has been launched in the background by iOS, ignore
        return null;
    }
    return <App />;
}
TrackPlayer.registerPlaybackService(() => PlaybackService);
AppRegistry.registerComponent(appName, () => HeadlessCheck);