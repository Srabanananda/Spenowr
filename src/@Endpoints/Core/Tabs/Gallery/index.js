/**
 * Create By @name Sukumar_Abhijeet,
 */

import Config from '@Config/default';
import axios from 'axios';

const {BASE_PATH,API_VERSIONING} = Config;

export const getGalleryPhotography = (bodyFormData) => {
    const url = `${BASE_PATH+API_VERSIONING}/photography/photography-list`;
    return axios
        .post(
            url,
            bodyFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};