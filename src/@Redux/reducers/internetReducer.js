/**
 * Create By @name Sukumar_Abhijeet 
 */

import {
    UPDATE_INTERNET_CONNECTIVITY
} from '../constants/internet.constant';


const initialState = {
    isConnected:true
};

const  internetReducer = (state = initialState,action) =>{
    const {type,available=true} = action;
    switch(type){

    case UPDATE_INTERNET_CONNECTIVITY:
        return{...state,isConnected:available};    

    default:
        return state;
    }
};

export default internetReducer;