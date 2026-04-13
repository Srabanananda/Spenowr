/**
 *  Created By @name Sukumar_Abhijeet
 */
import messaging from '@react-native-firebase/messaging';

export const getFBToken = async () => {
    try {
        const fcmToken = await messaging().getToken();
        return fcmToken ?? '';
    } catch (e) {
        console.log('getFBToken failed:', e);
        return '';
    }
};