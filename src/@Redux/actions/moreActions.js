/**
 * Create By @name Sukumar_Abhijeet,
 */

import { 
    FETCH_MESSAGE_CENTER_MESSAGES, UPDATE_TOTAL_UNREAD_MESSAGE_CENTER_MESSAGES,
    UPDATE_APP_UPGRADE_INFO,
    FETCH_SUBSCRIPTION_PLANS,UPDATE_SHIPPING_LIST, FETCH_SHIPPING_ADDRESS_LIST
} from '../constants/more.constant';

import { getSupportCenterMessages } from '../../@Endpoints/Core/Tabs/More';
import { getSubsciptionDetails } from '../../@Endpoints/Auth';
import { getShippingAddress } from '../../@Endpoints/Core/Tabs/Shop';

export const fetchMessageCenterMessages =() =>{
    return{
        type: FETCH_MESSAGE_CENTER_MESSAGES,
        promise:getSupportCenterMessages(),
    };
};

export const updateAppUpgradeInfo = (upgradeInfo) =>{
    return{
        type:UPDATE_APP_UPGRADE_INFO,
        upgradeInfo
    };
};

export const updateTotalUnreadMessageCenterMessages =(changeInNumber) =>{
    return{
        type: UPDATE_TOTAL_UNREAD_MESSAGE_CENTER_MESSAGES,
        changeInNumber,
    };
};

export const fetchSubscriptionPlans =() =>{
    return{
        type: FETCH_SUBSCRIPTION_PLANS,
        promise:getSubsciptionDetails(),
    };
};

export const updateShippingAddressList = (shippingList) =>{
    return{
        type: UPDATE_SHIPPING_LIST,
        shippingList,
    };
};

export const fetchShippingAddressList =() =>{
    return{
        type: FETCH_SHIPPING_ADDRESS_LIST,
        promise:getShippingAddress(),
    };
};