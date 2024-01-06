/**
 * Create By @name Sukumar_Abhijeet 
 */

import {
    FETCH_MESSAGE_CENTER_MESSAGES_FAILURE,FETCH_MESSAGE_CENTER_MESSAGES_REQUEST,FETCH_MESSAGE_CENTER_MESSAGES_SUCCESS,
    UPDATE_TOTAL_UNREAD_MESSAGE_CENTER_MESSAGES,UPDATE_APP_UPGRADE_INFO,
    FETCH_SUBSCRIPTION_PLANS_FAILURE,FETCH_SUBSCRIPTION_PLANS_REQUEST,FETCH_SUBSCRIPTION_PLANS_SUCCESS,
    UPDATE_SHIPPING_LIST,
    FETCH_SHIPPING_ADDRESS_LIST_FAILURE,FETCH_SHIPPING_ADDRESS_LIST_REQUEST,FETCH_SHIPPING_ADDRESS_LIST_SUCCESS
} from '../constants/more.constant';


const initialState = {
    messageList:[],
    totalUnreadMessages:0,
    apiCalled:false,
    appUpgradeInfo:{
        isLatest:1
    },
    subsciptionLoading:false,
    subscriptions:{},
    shippingAddressList: [],
    shippingLoading : false
};

const  moreReducer = (state = initialState,action) =>{
    const {type,changeInNumber,upgradeInfo={},shippingList = []} = action;
    switch(type){

    case UPDATE_APP_UPGRADE_INFO:
        return {...state,appUpgradeInfo:upgradeInfo};

    case UPDATE_SHIPPING_LIST:
        return {...state,shippingAddressList:shippingList};

    case  FETCH_MESSAGE_CENTER_MESSAGES_REQUEST:
        return { ...state,apiCalled:true};   

    case FETCH_MESSAGE_CENTER_MESSAGES_SUCCESS:
    {   
        const {data:{messageData=[],unreadMessageCounter=0}} = action.response;
        return{...state,messageList:messageData,totalUnreadMessages:unreadMessageCounter,apiCalled:false};
    }   
    case FETCH_MESSAGE_CENTER_MESSAGES_FAILURE:
        return { ...state,apiCalled:false};  

    case UPDATE_TOTAL_UNREAD_MESSAGE_CENTER_MESSAGES:
        if(state.totalUnreadMessages)
            return {...state,totalUnreadMessages:state.totalUnreadMessages+changeInNumber};
        return state;

    case  FETCH_SUBSCRIPTION_PLANS_REQUEST:
        return { ...state,subsciptionLoading:true};   
    
    case FETCH_SUBSCRIPTION_PLANS_SUCCESS:
    {   
        const {data} = action.response;
        return{...state,subscriptions:data,subsciptionLoading:false};
    }   
    case FETCH_SUBSCRIPTION_PLANS_FAILURE:
        return { ...state,subsciptionLoading:false};  

    case  FETCH_SHIPPING_ADDRESS_LIST_REQUEST:
        return { ...state,shippingLoading:true};   
        
    case FETCH_SHIPPING_ADDRESS_LIST_SUCCESS:
    {   
        const {data: { shipping_address = []}} = action.response;
        return{...state,shippingAddressList:shipping_address,shippingLoading:false};
    }   
    case FETCH_SHIPPING_ADDRESS_LIST_FAILURE:
        return { ...state,shippingLoading:false};  

    default:
        return state;
    }
};

export default moreReducer;