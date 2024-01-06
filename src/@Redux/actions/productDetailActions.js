/**
 * Create By @name Sukumar_Abhijeet
 */
import { 
    UPDATE_PRODUCT_DETAILS,UPDATE_ARTWORK_DETAILS,UPDATE_ARTICLE_DETAILS,
    UPDATE_QUOTE_DETAILS
} from '../constants/productDetails.constant';

export const updateProductDetails =(details) =>{
    return{
        type: UPDATE_PRODUCT_DETAILS,
        details,
    };
};

export const updateArtworkDetails =(details) =>{
    return{
        type: UPDATE_ARTWORK_DETAILS,
        details,
    };
};

export const updateArticleDetails =(details) =>{
    return{
        type: UPDATE_ARTICLE_DETAILS,
        details,
    };
};

export const updateQuoteDetails =(details) =>{
    return{
        type: UPDATE_QUOTE_DETAILS,
        details,
    };
};