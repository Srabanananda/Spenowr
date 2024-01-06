import Config from '@Config/default';
import axios from 'axios';

const { BASE_PATH, API_VERSIONING } = Config;
export const updateProfiles = (formData) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/update-institute`;
    return axios
        .post(
            url,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getProfileInsights = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/line-charts-data`;
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

export const getSkillRemoved = (number) =>{
    const url = `${BASE_PATH + API_VERSIONING}/profile/remove-skills`;
    const data = new FormData();
    data.append('skill',`skil${number}`);
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

export const updateMyProfileImage = (data) =>{
    const url = `${BASE_PATH + API_VERSIONING}/profile/update-profile-image`;
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

export const updateProfileAccountDetails = (data) =>{
    const url = `${BASE_PATH + API_VERSIONING}/profile/update-profile`;
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

export const getPublicProfileReviews = (institute_id,skip=0,limit=3) =>{
    const url = `${BASE_PATH + API_VERSIONING}/institute/artist-review-list`;
    const data = new FormData();
    data.append('institute_id',institute_id);
    data.append('skip',skip);
    data.append('limit',limit);
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


export const getMyOrdersList = () =>{
    const url = `${BASE_PATH + API_VERSIONING}/profile/get-placed-order-list`;
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

export const getMyOrdersDetails = (id) =>{
    const url = `${BASE_PATH + API_VERSIONING}/profile/product-order-list`;
    const data = new FormData();
    data.append('orderId',id);
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

export const updateMobileNumber = (id,number) =>{
    const url = `${BASE_PATH + API_VERSIONING}/profile/update-user-mobile`;
    const data = new FormData();
    data.append('mobile',number);
    data.append('userId',id);
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

export const fetchMyEarnings = () =>{
    const url = `${BASE_PATH + API_VERSIONING}/profile/my-earnings-data`;
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

export const BuyAIPoints = (points, mobile) =>{
    const url = `${BASE_PATH + API_VERSIONING}/profile/ai-points-payments`;
    const data = new FormData();
    data.append('points',points);
    data.append('mobile',mobile);
    data.append('returnUrl','https://www.spenowr.com/account/ai-payment-process/');
    data.append('notifyUrl','https://www.spenowr.com/account/ai-payment-failure/');
    data.append('application',true);
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

export const BuyJOBPoints = (points, mobile) =>{
    const url = `${BASE_PATH + API_VERSIONING}/profile/jobs-points-payments`;
    const data = new FormData();
    data.append('points',points);
    data.append('mobile',mobile);
    data.append('returnUrl','https://www.spenowr.com/account/ai-payment-process/');
    data.append('notifyUrl','https://www.spenowr.com/account/ai-payment-failure/');
    data.append('application',true);
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

export const fetchMyCreditPoints = () =>{
    const url = `${BASE_PATH + API_VERSIONING}/profile/jobs-point-data`;
    const data = new FormData();
    data.append('offset',0);
    data.append('pageRange',16);
    data.append('limit_from',0);
    data.append('limit_to',16);
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


