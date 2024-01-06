import Config from '@Config/default';
import axios from 'axios';

const { BASE_PATH, API_VERSIONING } = Config;

export const deleteArtWorkService = (mCouserId) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/delete-photography`;
    return axios
        .post(
            url,
            mCouserId,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }
        )
        .then(response => response.data);
};

export const addArtWork = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/add-gallery`;
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

export const editArtWork = (media_id) => {
    const body = new FormData();
    body.append('media_id',media_id);
    const url = `${BASE_PATH + API_VERSIONING}/profile/edit-profile-gallery`;
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

export const requestCustomPrint = (media_id) => {
    const body = new FormData();
    body.append('media_id',media_id);
    const url = `${BASE_PATH + API_VERSIONING}/profile/custom-print-submission-request`;
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

export const updateArtWork = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/update-gallery`;
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

export const getImageFromChatGPT = (searchText) => {
    const body = new FormData();
    body.append('query', searchText);
    const url = `${BASE_PATH + API_VERSIONING}/profile/generate-ai-art`;
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


export const deleteArtWork = (media_id) => {
    const body = new FormData();
    body.append('media_id',media_id);
    const url = `${BASE_PATH + API_VERSIONING}/profile/delete-profile-gallery`;
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
