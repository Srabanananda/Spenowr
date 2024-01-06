/**
 *  Created By @name Sukumar_Abhijeet
 */
import {Platform} from 'react-native';
const ImageAppender = imgData => {
    const obj = {
        name : imgData.filName,
        type:imgData.type,
        uri : Platform.OS === 'android' ? imgData.uri : imgData.uri.replace('file://', '')
    };
    return obj;
};
export default ImageAppender;