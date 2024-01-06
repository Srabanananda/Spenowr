/**
 * Create By @name Sukumar_Abhijeet 
 */

import {
    FETCH_PHOTOGRAPHY_LIST_FAILURE,FETCH_PHOTOGRAPHY_LIST_REQUEST,FETCH_PHOTOGRAPHY_LIST_SUCCESS
} from '../constants/gallery.constant';


const initialState = {
    photoGraphyList:[],
    apiCalled:false,
};

const  galleryReducer = (state = initialState,action) =>{
    const {type,fromLimit} = action;
    switch(type){

    case  FETCH_PHOTOGRAPHY_LIST_REQUEST:
        return { ...state,apiCalled:true};   

    case FETCH_PHOTOGRAPHY_LIST_SUCCESS:
    {   
        const {data:{list=[]}} = action.response;
        if(fromLimit)
            return{...state,photoGraphyList:[...state.photoGraphyList,...list],apiCalled:false};

        else
            return{...state,photoGraphyList:list,apiCalled:false};
    }   
    case FETCH_PHOTOGRAPHY_LIST_FAILURE:
        return { ...state,apiCalled:false};  

    default:
        return state;
    }
};

export default galleryReducer;