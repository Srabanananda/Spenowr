/**
 * Create By @name Sukumar_Abhijeet
 */
import { UPDATE_INTERNET_CONNECTIVITY } from '../constants/internet.constant';

export const updateInternetConnectivity =(available) =>{
    return{
        type: UPDATE_INTERNET_CONNECTIVITY,
        available,
    };
};