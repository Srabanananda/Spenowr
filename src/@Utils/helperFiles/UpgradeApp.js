/**
 *  Created By @name Sukumar_Abhijeet
 */

import {Platform,Linking} from 'react-native';
import Toast from 'react-native-simple-toast';

const UpgradeApp = (redirectUrl) =>{
    if (Platform.OS === 'ios') {
        Linking.openURL(redirectUrl)
            .then(supported => {
                supported && Linking.openURL(redirectUrl);
            })
            .catch(() => {
                Toast.show('Oops please visit Store to upgrade',Toast.LONG);
            });
    }
    else {
        Linking.openURL(redirectUrl);
    }
};

export default UpgradeApp;