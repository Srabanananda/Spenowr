import Config from '@Config/default';
import axios from 'axios';

const { BASE_PATH, API_VERSIONING } = Config;

export const fetchCustomExploreList = () => {
    const url = `${BASE_PATH + API_VERSIONING}/Custom/explore-list`;
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
        .then(response => {
            console.log('response.data cart',response.data);
            return response.data;
        })
};