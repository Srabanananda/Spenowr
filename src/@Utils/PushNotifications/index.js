/**
 *  Created By @name Sukumar_Abhijeet
 */

import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Toast from 'react-native-simple-toast';
import {PushNotificationService} from './PushNotificationService';
import Config from '@Config/default';

const {NOTIFICATION_CHANNEL_ID,NOTIFICATION_CHANNEL_NAME} = Config;

const PushNotificationsConfigure = (navigation,notLoggedIn) =>{
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
            const {data,userInteraction,id,foreground, title : notificationTitle = ''} = notification;
            
            try {
                if(userInteraction)
                {
                    if(notLoggedIn) navigation.replace('Login');
                    else
                    {
                        if(data) PushNotificationService(data,navigation);
                        else navigation.navigate('Profile');
                    }
                }
                if(!userInteraction) {
                    if(data)
                    {
                        const New_Local_Notification = JSON.parse(JSON.stringify(notification));
                        const {
                            title='Spenowr',
                            message = '',
                            channelId = NOTIFICATION_CHANNEL_ID,
                            isLocal=false
                        } = data;
                        New_Local_Notification.message = message;
                        New_Local_Notification.title= title;
                        New_Local_Notification.channelId =channelId;
                        if(Platform.OS === 'android')
                            PushNotification.localNotification(New_Local_Notification);
                        else
                        {
                            if(foreground)
                            {
                                try {
                                    const data = isLocal ? '' : JSON.parse(notification.data['gcm.notification.data']);
                                    let IOSData = {
                                        id,
                                        title : notificationTitle,
                                        subtitle : data ? data.description : '', 
                                        userInfo: {
                                            isLocal : true,
                                            ...data,
                                        }
                                    };
                                    if(!isLocal) PushNotification.localNotification(IOSData);

                                } catch (error) {
                                    Toast.show('Unable to Process Notification');
                                }
                            }
                        }   
                    }
                }
            } catch (error) {
                console.log('Notification Err',error);
            }
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log('ACTION:', notification.action);
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function(err) {
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