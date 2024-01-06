/**
 * Create By @name Sukumar_Abhijeet 
 */

import {
    UPDATE_INTRO_SCREEN_STATUS
} from '../constants/app.constant';

const initialState = {
    showIntroScreen:true
};

const  appReducer = (state = initialState,action) =>{
    const {type,activate=true} = action;
    switch(type){

    case UPDATE_INTRO_SCREEN_STATUS:
        return{...state,showIntroScreen:activate};    

    default:
        return state;
    }
};

export default appReducer;