/**
 * @format
 */
import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import { PlaybackService } from './src/@Utils/services';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
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