/**
 *  Created By @name Sukumar_Abhijeet
 */

import { getCartItems, getShopTopProducts } from '../../@Endpoints/Core/Tabs/Shop';
import { 
    FETCH_SHOP_TOP_PRODUCTS,UPDATE_NUMBER_OF_CART_ITEMS,FETCH_CART_ITEMS
} from '../constants/shop.constant';

export const fetchShopProducts =(data) =>{
    return{
        type: FETCH_SHOP_TOP_PRODUCTS,
        promise:getShopTopProducts(data)
    };
};

export const fetchCartDetails = (data) =>{
    return{
        type: FETCH_CART_ITEMS,
        promise:getCartItems(data)
    };
};

export const updateCartItemNumber =(cartItemsNumber) =>{
    return{
        type: UPDATE_NUMBER_OF_CART_ITEMS,
        cartItemsNumber
    };
};

