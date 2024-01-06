/**
 * Create By @name Sukumar_Abhijeet,
 */

import { FETCH_PHOTOGRAPHY_LIST } from '../constants/gallery.constant';
import { getGalleryPhotography } from '../../@Endpoints/Core/Tabs/Gallery';

export const fetchGalleryPhotography =(data,fromLimit) =>{
    return{
        type: FETCH_PHOTOGRAPHY_LIST,
        promise:getGalleryPhotography(data),
        fromLimit
    };
};
