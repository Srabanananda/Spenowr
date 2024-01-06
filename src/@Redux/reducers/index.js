/**
 * Created By Sukumar Abhijeet 20/01/2020
 */

import { USER_LOGOUT } from '../constants';
import Config from '../../@Config/default';
import AsyncStorage from '@react-native-community/async-storage';
import { persistCombineReducers } from 'redux-persist';
import userReducer from './userReducer';
import internetReducer from './internetReducer';
import HomeReducer from './homeReducer';
import galleryReducer from './galleryReducer';
import productDetailsReducer from './productDetailsReducer';
import profileDataReducer from './profileDataReducer';
import moreReducer from './moreReducer';
import appReducer from './appReducer';
import shopReducer from './shopReducer';

const { SPENOWR_AsyncStorageKey } = Config;

const config = {
    key: SPENOWR_AsyncStorageKey,
    storage: AsyncStorage,
};

const combinedReducers = persistCombineReducers(config, {
    userObj: userReducer,
    InternetConnectivity: internetReducer,
    home:HomeReducer,
    gallery:galleryReducer,
    productDetails : productDetailsReducer,
    profileData : profileDataReducer,
    appData : appReducer,
    more : moreReducer,
    shop: shopReducer
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined;
    }
    return combinedReducers(state, action);
};

export default rootReducer;
