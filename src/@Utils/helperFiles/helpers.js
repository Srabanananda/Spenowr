/**
 *  Created By @name Sukumar_Abhijeet
 */

import moment from 'moment';
import { Alert, BackHandler, Linking } from 'react-native';
import SUBSCRIPTIONS from '../../assets/JsonFiles/Subscription/plans.json';
import VersionCheck from 'react-native-version-check';

export const isEmailValid = email =>{
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase());
};

export const getRandomColor = () =>{
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const getKeysFromObj = obj => {
    return Object.keys(obj);
};

export const getPlanName = subscription_plan => {
    return SUBSCRIPTIONS[subscription_plan];
};

export const tagValidator = (tagString='') => {
    const trimmed = tagString.trim();
    const commaInserted = trimmed.replace(/[ ,]+/g, ',');
    const removedSpecials = commaInserted.replace(/[`~!@#$%^&*()_|+\-=?;:'".<>\{\}\[\]\\\/]/gi, ',');
    return removedSpecials || '';
};

export const getKeyByValue = (obj,value) => {
    return Object.keys(obj).filter(k => obj[k]);
};

export const removeFromArray = (array,value) => {
    const index = array.indexOf(value);
    const tempArr = [...array];
    tempArr.splice(index,1);
    return tempArr;
};

export const isAValidImagePath = (imagePath) => {
    return imagePath !== '' && imagePath!=='/' &&imagePath !== null && imagePath !== undefined;
};

export const isCurrentDateGreater = (current, otherDate) => {
    try {
        const d1 = new Date( moment(current).format('YYYY-MM-DD'));
        const d2 = new Date( moment(otherDate).format('YYYY-MM-DD'));
        return d1 > d2;
    } catch (error) {
        return false;
    }
};

export const handleCertificateDownload = (certificateUrl) => {
    Linking.openURL(certificateUrl)
        .then(() => {
        })
        .catch(() => {
        });
};


var englishRegX = /^[A-Za-z0-9]*$/;
export const isValidEnglish = (string) => {
    return englishRegX.test(string);
};

var htmlRegX = /(<([^>]+)>)/i;

export const isValidHtml = (string) => {
    return string?.length ?  htmlRegX.test(string) : false;
}; 

export const ForceUpdate = () => {
    VersionCheck.needUpdate().then(async res => {
        console.log(res.isNeeded);    // true
        if (res.isNeeded) {
            console.log('response : ', JSON.stringify(res));
            Alert.alert(
                "New version available",
                "Please!, we request you to Upgrade to the Latest version of us",
                [
                    { text: "CANCEL", style: "cancel", onPress: ()=>{
                        BackHandler.exitApp();
                        return false;
                    }},
                    {
                        text: "Upgrade",
                        onPress: () => {
                            Linking.openURL(res.storeUrl);
                            return false;
                        } // open store if update is needed.,
                    },
                ]
            );
        } else {
            console.log('response : no need any update!');
            return true
        }
    });
}