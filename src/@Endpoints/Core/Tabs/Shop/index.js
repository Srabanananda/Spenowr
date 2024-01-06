/**
 * Create By @name Sukumar_Abhijeet,
 */

import Config from '@Config/default';
import axios from 'axios';
 
const {BASE_PATH,API_VERSIONING} = Config;
 
export const getShopTopProducts = (data) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/product-shop-summary`;
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getAllProducts = (data) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/product-shop-list`;
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getShippingAddress = () => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/get-my-address-detail`;
    return axios
        .post(
            url,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const addShippingAddress = (body) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/add-new-address`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const deleteShippingAddress = (shipping_id) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/delete-address`;
    const body = new FormData();
    body.append('shipping_id',shipping_id);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const setDefaultShippingAddress = (shipping_id) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/default-address`;
    const body = new FormData();
    body.append('shipping_id',shipping_id);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const editShippingAddress = (shipping_id) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/edit-address`;
    const body = new FormData();
    body.append('shipping_id',shipping_id);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const updateShippingAddress = (body) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/update-address`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getCartItems = (data) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/get-cart-detail`;
    const body = new FormData();
    body.append('currency',data?.currency);
    body.append('country',data?.country);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data).catch((e)=>console.log(e));
};

export const addRemoveCartItemQty = (body) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/add-remove-cart-quantity`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data)
};

export const deleteCartItem = (body) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/remove-cart-item`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data)
};

export const addItemToCart = (productId,prod_type='product',course_id='') => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/add-to-cart`;
    const data = new FormData();
    data.append('product_id',productId);
    data.append('course_id',course_id);
    data.append('product_type',prod_type);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => {
            return response.data
        })
};

export const addPrintingItemToCart = (data) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/add-to-cart`;
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => {
            console.log('@Response : ', JSON.stringify(response.data));
            return response.data
        }).catch(error => {
            console.log('@error : ', JSON.stringify(error));
        });
};

export const UpdatePrintItemFromCart = (data) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/update-to-cart`;
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => {
            console.log('@Response : ', JSON.stringify(response.data));
            return response.data
        }).catch(error => {
            console.log('@error : ', JSON.stringify(error));
        });
};

export const customizeMyProduct = data => {
    const url = `${BASE_PATH+API_VERSIONING}/institute/customize-request-submit`;
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getCheckoutDetails = (coupon,reward,country, currency) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/get-checkout-detail`;
    const data = new FormData();
    data.append('coupon_code',coupon);
    data.append('reward_ammount',reward);
    data.append('country',country);
    data.append('currency',currency);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getPaymentLink = (payObj) => {
    const url = `${BASE_PATH+API_VERSIONING}/payment/get-payment-link`;
    const data = new FormData();
    for ( var key in payObj ) {
        data.append(key, payObj[key]);
    }
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data).catch(e=>{return e});
};

export const verifyPaymentWithServer = (orderId) => {
    const url = `${BASE_PATH+API_VERSIONING}/payment/get-payment-order-process`;
    const data = new FormData();
    data.append('application',true);
    data.append('orderid',orderId);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getBuyAgainDetails = (orderId) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/buy-again`;
    const data = new FormData();
    data.append('orderid',orderId);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getBuyNowDetails = (product_id,type='product') => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/add-buy-now`;
    const data = new FormData();
    data.append('product_id',product_id);
    data.append('product_type',type);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};








