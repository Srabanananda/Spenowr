/**
 *  Created By @name Sukumar_Abhijeet
 */
import messaging from '@react-native-firebase/messaging';

export const getFBToken = async() =>{
    const fcmToken = await messaging().getToken();
    return fcmToken;
};