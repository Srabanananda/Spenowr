
import Config from '@Config/default';
import axios from 'axios';

const {BASE_PATH,API_VERSIONING} = Config;

export const addServices = (body) => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/add-course`;
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

export const editService = (course_id) => {
    const body = new FormData();
    body.append('course_id',course_id);
    const url = `${BASE_PATH+API_VERSIONING}/profile/edit-profile-course`;
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

export const updateService = (body) => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/update-course`;
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




export const deleteService = (course_id) => {
    const body = new FormData();
    body.append('course_id',course_id);
    const url = `${BASE_PATH+API_VERSIONING}/profile/delete-course`;
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

export const getTutorsList = () => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/team-data`;
    return axios
        .post(
            url,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }
        )
        .then(response => response.data);
};

export const updateSellerShippingDetails = (body) => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/courier-information-submit`;
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

export const updateSellerShippingDetailsStatus = (body) => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/courier-status-update`;
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