/**
 *  Created By @name Sukumar_Abhijeet
 */
import {Linking} from 'react-native';
import Toast from 'react-native-simple-toast';
const openExternalLinks = (link) =>{
    if(link)
        Linking.canOpenURL(link).
            then(supported => {
                if (supported) {
                    Linking.openURL(link);
                } else {
                    Toast.show('Cant open link',Toast.LONG);
                }
            })
            .catch(()=>{
                Toast.show('Cant open link',Toast.LONG);
            });
    else Toast.show('Cant open link',Toast.LONG);
};

export default openExternalLinks;