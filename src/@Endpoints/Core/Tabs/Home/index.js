/**
 * Create By @name Sukumar_Abhijeet,
 */

import Config from '@Config/default';
import axios from 'axios';

const {BASE_PATH,API_VERSIONING} = Config;

export const getManagedAds = (body) => {
    const url = `${BASE_PATH+API_VERSIONING}/feed/manage-ads`;
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

export const makeVote = (postID, ArtistID, type) => {
    const body =  new FormData();
    body.append('post_id', postID);
    body.append('artist_id', ArtistID);
    body.append('type', type);
    const url = `${BASE_PATH+API_VERSIONING}/profile/vote-of-day`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
        )
        .then(response => response.data);
};

export const TrendingDayList = () => {
    
    const url = `${BASE_PATH+API_VERSIONING}/feed/get-vote-data`;
    return axios
        .post(
            url,
            null,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
        )
        .then(response => response.data);
};

export const getGalleryComments = (media_id,skip=0,limit=10) => {
 
    const body =  new FormData();
    body.append('media_id',media_id);
    body.append('skip',skip);
    body.append('limit',limit);
    const url = `${BASE_PATH+API_VERSIONING}/photography/get-gallery-comment`;
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

export const getProductComments = (media_id,skip=0,limit=10) => {
 
    const body =  new FormData();
    body.append('media_id',media_id);
    body.append('skip',skip);
    body.append('limit',limit);
    const url = `${BASE_PATH+API_VERSIONING}/shop/product-comment-list`;
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

export const getServiceComments = (module_id,skip=0,limit=10) => {
 
    const body =  new FormData();
    body.append('module_id',module_id);
    body.append('skip',skip);
    body.append('limit',limit);
    const url = `${BASE_PATH+API_VERSIONING}/courses/service-comment-list`;
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

export const getContestComments = (media_id,login_id,skip=0,limit=10) => {
    const body =  new FormData();
    body.append('module_id',media_id);
    body.append('login_id',login_id);
    body.append('skip',skip);
    body.append('limit',limit);
    const url = `${BASE_PATH+API_VERSIONING}/contest/contest-comment-list`;
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

export const getQuoteComments = (module_id,skip=0,limit=10) => {
    const body =  new FormData();
    body.append('module_id',module_id);
    body.append('skip',skip);
    body.append('limit',limit);
    const url = `${BASE_PATH+API_VERSIONING}/quote/quote-comment-list`;
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

export const getArticleComments = (media_id,skip=0,limit=10) => {
    const body =  new FormData();
    body.append('article_id',media_id);
    body.append('offset',skip);
    body.append('limit',limit);
    const url = `${BASE_PATH+API_VERSIONING}/article/get-article-comment`;
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

export const addGalleryComments = (media_id,posted_by,comment) => {
    const body =  new FormData();
    body.append('media_id',media_id);
    body.append('posted_by',posted_by);
    body.append('comment',comment);
    const url = `${BASE_PATH+API_VERSIONING}/photography/add-gallery-comment`;
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

export const addProductComments = (media_id,posted_by,comment) => {
    const body =  new FormData();
    body.append('product_id',media_id);
    body.append('posted_by',posted_by);
    body.append('comment',comment);
    const url = `${BASE_PATH+API_VERSIONING}/shop/product-comment-submit`;
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

export const addContestComments = (media_id,posted_by,comment) => {
    const body =  new FormData();
    body.append('media_id',media_id);
    body.append('posted_by',posted_by);
    body.append('comment',comment);
    const url = `${BASE_PATH+API_VERSIONING}/contest/add-contest-comment`;
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

export const addServiceComments = (media_id,posted_by,comment) => {
    const body =  new FormData();
    body.append('service_id',media_id);
    body.append('posted_by',posted_by);
    body.append('comment',comment);
    const url = `${BASE_PATH+API_VERSIONING}/courses/service-comment-submit`;
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

export const addQuoteComments = (media_id,posted_by,comment) => {
    const body =  new FormData();
    body.append('media_id',media_id);
    body.append('posted_by',posted_by);
    body.append('comment',comment);
    const url = `${BASE_PATH+API_VERSIONING}/quote/add-quotes-comment`;
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

export const addArticleComments = (media_id,posted_by,comment) => {
    const body =  new FormData();
    body.append('media_id',media_id);
    body.append('posted_by',posted_by);
    body.append('comment',comment);
    const url = `${BASE_PATH+API_VERSIONING}/article/add-article-comment`;
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

export const editComment = (media_id,comment_id,type,comment) => {
    const body =  new FormData();
    body.append('media_id',media_id);
    body.append('comment_id',comment_id);
    body.append('type',type === 'Quote' ? 'writings' : type.toLowerCase());
    body.append('comment',comment);
    const url = `${BASE_PATH+API_VERSIONING}/comment/update-comment`;
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

export const deleteComment = (media_id,comment_id,type) => {
    const body =  new FormData();
    body.append('media_id',media_id);
    body.append('comment_id',comment_id);
    body.append('type',type === 'Quote' ? 'writings' : type.toLowerCase());
    const url = `${BASE_PATH+API_VERSIONING}/comment/delete-comment`;
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

export const quotesLikeDislike = (heart_status,media_id,) => {
    const body =  new FormData();
    body.append('module_id',media_id);
    body.append('heart_status',heart_status);
    const url = `${BASE_PATH+API_VERSIONING}/quote/add-remove-heart`;
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

export const artworkLikeDislike = (heart_status,media_id) => {
    const body =  new FormData();
    body.append('module_id',media_id);
    body.append('heart_status',heart_status);
    const url = `${BASE_PATH+API_VERSIONING}/photography/add-remove-heart`;
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

export const articleLikeDislike = (heart_status,media_id) => {
    const body =  new FormData();
    body.append('module_id',media_id);
    body.append('heart_status',heart_status);
    const url = `${BASE_PATH+API_VERSIONING}/article/add-remove-heart`;
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

export const contestLikeDislike = (heart_status,id) => {
    const body =  new FormData();
    body.append('module_id',id);
    body.append('heart_status',heart_status);
    const url = `${BASE_PATH+API_VERSIONING}/contest/add-remove-heart`;
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

export const serviceLikeDislike = (heart_status,media_id) => {
    const body =  new FormData();
    body.append('module_id',media_id);
    body.append('heart_status',heart_status);
    const url = `${BASE_PATH+API_VERSIONING}/courses/add-remove-heart`;
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

export const productLikeDislike = (heart_status,media_id) => {
    const body =  new FormData();
    body.append('module_id',media_id);
    body.append('heart_status',heart_status);
    const url = `${BASE_PATH+API_VERSIONING}/shop/add-remove-heart`;
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

export const commentLikeDislike = (heart_status,media_id,module_type) => {
    const body =  new FormData();
    body.append('module_id',media_id);
    body.append('module_type',module_type);
    body.append('heart_status',heart_status);
    const url = `${BASE_PATH+API_VERSIONING}/comment/add-remove-heart`;
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


export const fetchStories = (skip=0,limit=7) => {
    const body =  new FormData();
    body.append('limit',limit);
    body.append('skip',skip);
    const url = `${BASE_PATH+API_VERSIONING}/feed/get-story-data`;
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


export const getWinnerList = () => {
    const url = `${BASE_PATH+API_VERSIONING}/home/story-of-week`;
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

export const fetchNotifications = (skip=0,limit=7) => {
    const body =  new FormData();
    body.append('limit',limit);
    body.append('skip',skip);
    const url = `${BASE_PATH+API_VERSIONING}/profile/user-notification-data`;
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

export const markNotificationRead = () => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/read-all-notification`;
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

export const changeNotificationReadStatus = (notificationId) => {
    const body =  new FormData();
    body.append('notification_id',notificationId);
    const url = `${BASE_PATH+API_VERSIONING}/profile/read-notification-data`;
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

export const reportPost = (body) => {
    const url = `${BASE_PATH+API_VERSIONING}/report/submit-report-user-post`;
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

export const getJobsComments = (media_id,type,skip=0,limit=10) => {
    const body =  new FormData();
    body.append('media_id',media_id);
    body.append('skip',skip);
    body.append('limit',limit);
    body.append('type',type);
    const url = `${BASE_PATH+API_VERSIONING}/comment/get-comment-list`;
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



