/**
 *  Created By @name Sukumar_Abhijeet
 */
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Config from '@Config/default';

export const setAxiosConfig = (token = '', axiosRegister = true,navigation) =>{

    if(axiosRegister) {
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
        console.log("@token => ", 'Bearer '+token);
    }

    axios.interceptors.request.use(function (config) {
        config.metadata = { startTime: new Date()};
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    axios.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            const {response = {status : 0}} = error;
            const {status} = response;
            if (status === 401) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AuthStack',params:{logout:true}}]
                });
                // Toast.show('Session Expired, Please login',Toast.LONG);
            }
            return Promise.reject(error);
        }
    );
};

export const setUrlConfig = () => {
    axios.defaults.baseURL = Config.BASE_PATH;
};
