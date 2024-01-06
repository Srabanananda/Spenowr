/**
 * Create By @name Sukumar_Abhijeet,
 */

import Config from '@Config/default';
import axios from 'axios';

const {BASE_PATH,API_VERSIONING} = Config;

export const getWhatsNewFeed = (bodyFormData) => {
// console.log('WHATS NEW API CALL::'+JSON.stringify(bodyFormData))
    const url = `${BASE_PATH+API_VERSIONING}/feed/get-feed-data`;
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