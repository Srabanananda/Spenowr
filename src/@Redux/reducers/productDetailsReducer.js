/**
 * Create By @name Sukumar_Abhijeet 
 */

import {
    UPDATE_PRODUCT_DETAILS,
    UPDATE_ARTWORK_DETAILS,
    UPDATE_ARTICLE_DETAILS,
    UPDATE_QUOTE_DETAILS
} from '../constants/productDetails.constant';


const initialState = {
    productDetailsData:{},
    artworkDetailsData:{},
    articleDetailsData:{
        article:{article_id:''}
    },
    quoteDetailsData:{}
};

const  productDetailsReducer = (state = initialState,action) =>{
    const {type,details={}} = action;
    switch(type){

    case UPDATE_PRODUCT_DETAILS:
        return{...state,productDetailsData:details};    
    case UPDATE_ARTWORK_DETAILS:
        return{...state,artworkDetailsData:details}; 
    case UPDATE_ARTICLE_DETAILS:
        return{...state,articleDetailsData:details};
    case UPDATE_QUOTE_DETAILS:
        return{...state,quoteDetailsData:details};       

    default:
        return state;
    }
};

export default productDetailsReducer;