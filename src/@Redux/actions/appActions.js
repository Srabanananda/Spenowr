/**
 * Create By @name Sukumar_Abhijeet
 */
import { UPDATE_INTRO_SCREEN_STATUS } from '../constants/app.constant';

export const updateIntroScreenStatus =(activate) =>{
    return{
        type: UPDATE_INTRO_SCREEN_STATUS,
        activate,
    };
};