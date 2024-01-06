import React, { Component } from 'react';
import {
    ToastAndroid,
    Platform,
    AsyncStorage,
} from 'react-native';

import APP_CONSTANT from './Constant';

class Utility extends Component {
    functionWithoutArg = () => {
        //function to be called from default class (without args)
        alert('Function Called Without Argument ');
    };

    functionWithArg = Value => {
        //function to called from default class (with args)
        alert(Value);
    };

    toastMsgToNotifyUser = Value => {
        alert(Value);
        // if (Platform.OS === 'android') {
        //     ToastAndroid.show(Value, ToastAndroid.SHORT)
        // } else {
        //     alert(Value);
        // }
    }


    storeHasUserLoggeedIn = async () => {
        try {
            await AsyncStorage.setItem(APP_CONSTANT.KEY_CONSTANTS.HAS_USER_LOGEDIN, APP_CONSTANT.STRING_CONSTANT.SUCCESS_STATUS);
        } catch (error) {
            // Error saving data
        }
    }

    isUser = async () => {

        try {
            const value = await AsyncStorage.getItem(APP_CONSTANT.KEY_CONSTANTS.HAS_USER_LOGEDIN);
            if (value !== null) {
                // We have data!!
                alert(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    setVoteDate = async (date) => {
        try {
            await AsyncStorage.setItem('currentDate', date);
        } catch (error) {
            console.log('failed to save in VoteDate');
        }
    };

    getVoteDate = async (date) => {
        try {
            const value = await AsyncStorage.getItem('currentDate');
            if (value !== null) {
                // We have data!!
                return value
            }
        } catch (error) {
            console.log('failed to get data from VoteDate');
        }
    };

    tempValueReturn = () => {
        return 'tempvalue';
    }


}

export default Utility;