/**
 * Create By @name Sukumar_Abhijeet,
 */

import Config from '@Config/default';
import axios from 'axios';

const {BASE_PATH,API_VERSIONING} = Config;

export const getFeaturedFeed = () => {
    const url = `${BASE_PATH+API_VERSIONING}/home/list-home`;
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

export const getFeaturedContest = () => {
    const url = `${BASE_PATH+API_VERSIONING}/contest/featured-contest`;
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
