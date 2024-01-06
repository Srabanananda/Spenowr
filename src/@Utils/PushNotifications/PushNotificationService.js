/**
 *  Created By @name Sukumar_Abhijeet
 */
import Toast from 'react-native-simple-toast';
import { isIOS } from '../helperFiles/DeviceInfoExtractor';

export const PushNotificationService = (notification,navigation) =>{
    try {
        const {navigate} = navigation;
        const {
            payload = '{}',
            targetScreen = '',
        } = notification;
        const newPayload = isIOS ? payload  :  JSON.parse(payload);
        navigate(targetScreen,newPayload);
    } catch (error) {
        Toast.show('Unable to Process Notification');
    }
};