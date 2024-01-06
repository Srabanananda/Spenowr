/**
 * Create By @name Sukumar_Abhijeet
 */


import Config from '../../@Config/default';
import axios from 'axios';

const { BASE_PATH, API_VERSIONING } = Config;

export const getLoginDetails = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/user/login`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }
        )
        .then(response => {
            console.log("Login response : ", JSON.stringify(response.data));
            return response.data;
        });
};

export const getUserDetails = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/profile-data`;
    return axios
        .post(
            url,
            [],
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const getUserDetailsNew = (userID) => {
    const body = new FormData();
    body.append('user_id', userID);
    const url = `${BASE_PATH + API_VERSIONING}/profile/user-detail`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const getAccountChanged = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/upgrade-account`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};



export const setLikeUnlikeUser = (type, userId) => {
    const data = new FormData();
    data.append('heart_status', type);
    data.append('module_id', userId);
    const url = `${BASE_PATH + API_VERSIONING}/institute/add-remove-heart`;
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const setFollowUnfollowUser = (type, userId) => {
    const data = new FormData();
    data.append('follow_status', type);
    data.append('module_id', userId);
    const url = `${BASE_PATH + API_VERSIONING}/institute/add-remove-follow`;
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};


export const getUserRegisterDetails = (userId) => {
    const body = new FormData();
    body.append('user_id', userId);
    const url = `${BASE_PATH + API_VERSIONING}/profile/user-detail`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const setUserUse = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/add-users-use`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const setUserSpecialization = (body, suffix) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/add-user-skills${suffix}`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const checkAppForceUpgrade = (userId, version, platform) => {
    const body = new FormData();
    body.append('userid', userId);
    body.append('version', version);
    body.append('platform', platform);
    const url = `${BASE_PATH + API_VERSIONING}/registration/app-version-check`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getPublicUserData = (slug) => {
    const url = `${BASE_PATH + API_VERSIONING}/institute/detail-institute`;
    const body = new FormData();
    body.append('slug', slug);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getUserLiked = (id) => {
    const url = `${BASE_PATH + API_VERSIONING}/institute/get-user-like`;
    const body = new FormData();
    body.append('entity_id', id);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getUserFollowed = (id) => {
    const url = `${BASE_PATH + API_VERSIONING}/institute/get-user-follow`;
    const body = new FormData();
    body.append('entity_id', id);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getUserBankDetails = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/get-user-bank-data`;
    return axios
        .post(
            url,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const addUserBankDetails = (data) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/add-user-bank-details`;
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getSubsciptionDetails = () => {
    const url = `${BASE_PATH + API_VERSIONING}/subscription/subscription-package`;
    return axios
        .post(
            url,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const requestUserAccountDeletion = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/report/user-disable`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }
        )
        .then(response => response.data);
};

export const requestBlockPublicUser = (institute_id,isBlocked) => {
    const url = `${BASE_PATH + API_VERSIONING}/institute/block-user`;
    const body = new FormData();
    body.append('institute_id',institute_id);
    body.append('type',isBlocked ? 'unblock' : 'block');
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }
        )
        .then(response => response.data);
};

export const requestProfileVerification = (formikValues) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/profile-verification`;
    const body = new FormData();
    body.append('user_name',formikValues.userName);
    body.append('pancard_id',formikValues.pan);
    body.append('gst_id',formikValues.gst);
    body.append('adhar_id',formikValues.aadhar);
    body.append('document',formikValues.idProof?.assets[0]?.base64);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }
        )
        .then(response => response.data);
};

export const requestOpenHowToData = (module) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/open-how-to-data`;
    const body = new FormData();
    body.append('module',module);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }
        )
        .then(response => response.data);
};


export const registerUser= (data) => {
    const url = `${BASE_PATH + API_VERSIONING}/registration/registration-save`;
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const requestOtp= (userId) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/mobile-verification-otp`;
    const data = new FormData();
    data.append('user_id',userId);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const verifyOtp= (userId,otp) => {
    const url = `${BASE_PATH + API_VERSIONING}/registration/otp-verify`;
    const data = new FormData();
    data.append('user_id',userId);
    data.append('otp',otp);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const resetPassword= (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/registration/reset-password`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};



