/**
 * Create By @name Sukumar_Abhijeet,
 */

import Config from '@Config/default';
import axios from 'axios';

const {BASE_PATH,API_VERSIONING} = Config;

export const getAProductDetails = (currency, productSlug) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/get-single-product-detail`;
    const body = new FormData();
    body.append('currency',currency);
    body.append('slug',productSlug);
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

export const getArtworkDetails = (mediaId,slug) => {
    const url = `${BASE_PATH+API_VERSIONING}/photography/detail-photography`;
    const body = new FormData();
    body.append('media_id',mediaId);
    body.append('slug',slug);
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

export const getQuotesDetails = (slug) => {
    const url = `${BASE_PATH+API_VERSIONING}/quote/fetch-quote-detail`;
    const body = new FormData();
    body.append('slug_url',slug);
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



export const getArticleDetails = (slug) => {
    const url = `${BASE_PATH+API_VERSIONING}/article/article-detail`;
    const body = new FormData();
    body.append('slug',slug);
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



export const getVirtualPoints = () => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/virtual-points-data`;
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


export const getRewardPoints = () => {
    const data = new FormData();
    data.append('offset',0);
    data.append('pageRange',16);
    data.append('limit_from',0);
    data.append('limit_to',16);
    const url = `${BASE_PATH+API_VERSIONING}/profile/reward-point-data`;
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

export const getRewardBlances = () => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/reward-balance-data`;
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

export const addArticleReview = (body) => {
    const url = `${BASE_PATH+API_VERSIONING}/article/add-article-review`;
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

export const addProductReview = (body) => {
    const url = `${BASE_PATH+API_VERSIONING}/shop/add-product-review`;
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

export const getReferalsList = () => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/refer-friend-data`;
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

export const sendReferal = (body) => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/spenowr-friend-invite`;
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

