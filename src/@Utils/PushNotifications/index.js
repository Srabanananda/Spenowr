/**
 *  Created By @name Sukumar_Abhijeet
 */

import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Toast from 'react-native-simple-toast';
import { PushNotificationService } from './PushNotificationService';
import Config from '@Config/default';

const { NOTIFICATION_CHANNEL_ID, NOTIFICATION_CHANNEL_NAME } = Config;

const PushNotificationsConfigure = (navigation, notLoggedIn) => {
    PushNotification.createChannel(
        {
            channelId: NOTIFICATION_CHANNEL_ID,
            channelName: NOTIFICATION_CHANNEL_NAME,
            playSound: true,
            soundName: 'default',
            importance: 4,
            vibrate: true,
        },
        (created) => console.log(`createChannel returned '${created}'`)
    );

    PushNotification.configure({
        onRegister: function (token) {
            console.log('FCM TOKEN:', token);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            notification.finish(PushNotificationIOS.FetchResult.NoData);
            const { data, userInteraction, id, foreground } = notification;
        
            try {
                if (!notification.message && !notification.title) {
                    // This is a data-only message; extract your data and create a notification
                    const {
                        title = 'Spenowr',
                        message = data.message || data.description || '',  // Extract message or description
                        channelId = NOTIFICATION_CHANNEL_ID,
                    } = data;
        
                    PushNotification.localNotification({
                        id,
                        title: title,
                        message: message,
                        channelId: channelId,
                        userInteraction: userInteraction,
                    });
                } else {
                    // Handle notification as usual
                    if (userInteraction) {
                        if (notLoggedIn) navigation.replace('Login');
                        else PushNotificationService(data, navigation);
                    }
                }
            } catch (error) {
                console.log('Notification Error', error);
            }
        },
        

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log('ACTION:', notification.action);
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
            console.error('onRegistrationError', err.message, err);
        },
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        popInitialNotification: true,
        local_notification: true,
        requestPermissions: true,
    });
};

export default PushNotificationsConfigure;
