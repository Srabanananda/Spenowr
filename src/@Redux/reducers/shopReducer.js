/**
 * Create By @name Sukumar_Abhijeet 
 */

import {
    FETCH_SHOP_TOP_PRODUCTS_FAILURE,FETCH_SHOP_TOP_PRODUCTS_SUCCESS,FETCH_SHOP_TOP_PRODUCTS_REQUEST,
    FETCH_CART_ITEMS_FAILURE,FETCH_CART_ITEMS_REQUEST,FETCH_CART_ITEMS_SUCCESS,
    UPDATE_NUMBER_OF_CART_ITEMS
} from '../constants/shop.constant';

const initialState = {
    shopProductApiCalled:false,
    shopProducts:{},
    cartData:{},
    cartDataApiCalled:false,
    cartItemsNumber:0,
};

const  shopReducer = (state = initialState,action) =>{
    const {type,cartItemsNumber} = action;
    switch(type){

    case FETCH_SHOP_TOP_PRODUCTS_FAILURE:
        return { ...state,shopProductApiCalled:false};
        
    case  FETCH_SHOP_TOP_PRODUCTS_REQUEST:
        return { ...state,shopProductApiCalled:true};   
    
    case FETCH_SHOP_TOP_PRODUCTS_SUCCESS:
    {   
        const {data={}} = action.response;
        return{...state,shopProducts:data,shopProductApiCalled:false};
    }
    
    case FETCH_CART_ITEMS_FAILURE:
        return { ...state,cartDataApiCalled:false};
        
    case  FETCH_CART_ITEMS_REQUEST:
        return { ...state,cartDataApiCalled:true};   
    
    case FETCH_CART_ITEMS_SUCCESS:
    {   
        const {data={}} = action.response;
        return{...state,cartData:data,cartItemsNumber:data.addtocart.length,cartDataApiCalled:false};
    }  



    case  UPDATE_NUMBER_OF_CART_ITEMS:
        return { ...state,cartItemsNumber:cartItemsNumber};   

    

    default:
        return state;
    }
};

export default shopReducer;