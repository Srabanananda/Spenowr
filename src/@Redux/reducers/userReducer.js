/**
 * Create By @name Sukumar_Abhijeet,
 */

import {
    UPDATE_USER_ACCESS_TOKEN, UPDATE_USER_DETAILS, RESET_USER, UPDATE_USER_INSIGHTS,
    UPDATE_POINTS_SHOWCASE,
    UPDATE_PUBLIC_USER_DETAILS
} from '../constants/user.constant';

const barData = {
    barGraphNameCounter:['Course', 'Article', 'Product', 'Artwork'],
    barGraphCounter:[1, 0, 0, 1],
    paymentGraphNameCounter:['Direct Sell', 'Custom Order', 'Rewards', 'Contest'],
    paymentGraphCounter:[0, 0, 0, 0],
    viewCounter:[],
    viewMonth:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']
};

const initialState = {
    token:'',
    user:{},
    userProfile:{},
    userInsights:barData,
    publicUserData:{
        awards:[],
        article:{slug_url:''},
        registerUser:{
            earned_point : 0,
            level: 1
        },
        institute:{
            earned_point : 0,
            level: 1
        }
    },
    pointsShowCase:false
};

const  userReducer = (state = initialState,action) =>{
    const {
        institute={},profile={},accessToken='',type,insights={},
        publicData,showcase=false
    } = action;
    switch(type){

    case UPDATE_USER_ACCESS_TOKEN:
        return{...state,token:accessToken};    

    case UPDATE_USER_DETAILS:
        return{...state,user:institute,userProfile:profile};

    case UPDATE_USER_INSIGHTS:
        return{...state,userInsights:insights};

    case UPDATE_PUBLIC_USER_DETAILS:
        return{...state,publicUserData:publicData};
    
    case UPDATE_POINTS_SHOWCASE:
        return{...state,pointsShowCase:showcase};
        
    case RESET_USER:
        return{...state,...initialState};

    default:
        return state;
    }
};

export default userReducer;