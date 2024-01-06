/**
 *  Created By @name Sukumar_Abhijeet
 */

import {launchImageLibrary} from 'react-native-image-picker';

const imageOptions = {
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: true,
};

export const  pickImage = (callback) => {
    launchImageLibrary(imageOptions, callback);
};