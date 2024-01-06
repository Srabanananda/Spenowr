/**
 *  Created By @name Sukumar_Abhijeet
 */

import { 
    UPDATE_USER_ACCESS_TOKEN, UPDATE_USER_DETAILS,RESET_USER, UPDATE_USER_INSIGHTS, 
    UPDATE_PUBLIC_USER_DETAILS, 
    UPDATE_POINTS_SHOWCASE
} from '../constants/user.constant';

export const updateUserAccessToken =(accessToken) =>{
    return{
        type: UPDATE_USER_ACCESS_TOKEN,
        accessToken,
    };
};

export const updateUserDetails =(institute,profile) =>{
    return{
        type: UPDATE_USER_DETAILS,
        institute,profile,
    };
};

export const updatePublicUserDetails =(publicData) =>{
    return{
        type: UPDATE_PUBLIC_USER_DETAILS,
        publicData,
    };
};

export const resetUser = () =>{
    return{
        type: RESET_USER,
    };
};

export const updateUserInsights = (insights) =>{
    return{
        type:UPDATE_USER_INSIGHTS,
        insights
    };
};

export const updatePointShowCase = (showcase)=>{
    return{
        type:UPDATE_POINTS_SHOWCASE,
        showcase
    };
};