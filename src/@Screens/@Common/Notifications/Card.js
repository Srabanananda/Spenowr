/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Capitalize from '../../../@Utils/helperFiles/Capitalize';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import Image from 'react-native-image-progress';
import Config from '@Config/default';
import { changeNotificationReadStatus } from '../../../@Endpoints/Core/Tabs/Home';
import { InAppNotificationService } from '../../../@Utils/PushNotifications/InAppNotificationService';
import HTML from 'react-native-render-html';
import { moderateScale } from 'react-native-size-matters';
import { isValidHtml } from '../../../@Utils/helperFiles/helpers';

const {NEW_IMG_BASE,DEFAULT_PROFILE} = Config;

const Card = ({notification,refreshList}) =>{

    const navigation = useNavigation();
    const {
        module_type='',
        notification_id='',
        sender_profile_image = null,
        read_status,
        sender_name='',
        operation='',
        description='',
        title= '',
    } = notification;

    let sender = Capitalize(sender_name);
    const read = parseInt(read_status);

    const checkActivity = (openPublicProfile = false) =>{
        if(read) {
            changeNotificationReadStatus(notification_id)
                .then(()=>{
                    refreshList();
                })
                .catch();
        }
        if(module_type === 'register') openPublicProfile = false;
        if(module_type === 'artist' && operation=== 'view') openPublicProfile = true;
        InAppNotificationService(notification,navigation,openPublicProfile);
    };

    const isValid = isValidHtml(description);

    return(
        <TouchableOpacity onPress={()=>checkActivity()}  style={read ? styles.containerUnread :  styles.containerRead }>
            <View  style={styles.imageCircle}>
                <Image 
                    source={{ uri: sender_profile_image ? NEW_IMG_BASE+ sender_profile_image :  NEW_IMG_BASE +DEFAULT_PROFILE }} 
                    style={{width:null,height:null,flex:1}} 
                />
            </View>
            <View style={{width:'95%'}}>
                {(title !== '') && <Text style={styles.titleHead}>{Capitalize(title)}</Text>}
                <View style={{flexDirection : 'row',alignItems:'center'}}>
                    {
                        (operation !=='' && module_type !=='contest') &&
                        <TouchableOpacity onPress={()=>checkActivity(true)}>
                            <Text style={read ? styles.SenderUnread :  styles.SenderRead}>{sender+' '}</Text>
                        </TouchableOpacity>
                    }
                    <Text style={read ? styles.messageTextUnread :  styles.messageTextRead}>{getNotificationBodyMessage(operation,module_type,description)}</Text>
                </View>
                {
                    isValid ? 
                        <View style={{maxWidth:moderateScale(280)}}>
                            {(module_type !=='contest') && <HTML 
                                source={{html : description}}
                            />}
                        </View>
                        :<></>
                }
            </View>
        </TouchableOpacity>
    );
};

Card.propTypes = {
    notification:PropTypes.object.isRequired,
    refreshList:PropTypes.func.isRequired,
};

export default Card; 

export const getNotificationBodyMessage = (operation,module_type,description='') =>{
    switch (operation) {
    case 'view':
        if(module_type === 'contest' || module_type === 'artist') return `${description}`;
        return '';
    case 'winner':
        if(module_type === 'contest') return `${description}`;
        return '';
    case 'like':
        return `liked your ${module_type === 'artist' ? 'Profile' : Capitalize(module_type)}`;
    case 'review':
        return ' gave review on your Profile';
    case 'follow':
        return ' started following you.';
    case 'message':
        return ' sent a message';
    case 'comment':
        return `commented on your ${Capitalize(module_type)}`;
    case '':
        return 'Welcome to Spenowr. Please follow our How to pages to learn more and use Contact Admin for any issues.';
    default:
        return `${Capitalize(module_type)}`;
    }
};

