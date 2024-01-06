/**
 * Create By @name Sukumar_Abhijeet,
 */

import { 
    FETCH_SERIES,
    FETCH_ARTIST_AWARDS ,
    FETCH_ARTIST_ARTWORKS,
    FETCH_ARTIST_QUOTEPOEMS,
    FETCH_ARTIST_PRODUCTS,
    FETCH_ARTIST_SERVICES,
    FETCH_ARTIST_STORYBLOGS,
    FETCH_ARTIST_JOBS,
    FETCH_ARTIST_WORK_EXP,
    FETCH_ARTIST_PROJECTS,
} from '../constants/profileData.constant';
import { 
    fetchArticlesData,
    fetchArtworkgalleryData, fetchServiceCourseData, fetchWritingsData, getArtistAwards, 
    getArtistWorkExpList, 
    getSellerProductList ,
    fetchSeriesData,
} from '../../@Endpoints/Core/Tabs/MyAccount';
import { getMyJobsList, getUserProjectList } from '../../@Endpoints/Core/Tabs/More';

export const fetchSeries =(data,length) =>{
    return{
        type: FETCH_SERIES,
        promise:fetchSeriesData(data),
        length
    };
};

export const fetchArtistAwards =() =>{
    return{
        type: FETCH_ARTIST_AWARDS,
        promise:getArtistAwards(),
    };
};

export const fetchArtistStoryBlogs =() =>{
    return{
        type: FETCH_ARTIST_STORYBLOGS,
        promise:fetchArticlesData(),
    };
};

export const fetchArtistArtwoks =() =>{
    return{
        type: FETCH_ARTIST_ARTWORKS,
        promise:fetchArtworkgalleryData(),
    };
};

export const fetchArtistWritings =() =>{
    return{
        type: FETCH_ARTIST_QUOTEPOEMS,
        promise:fetchWritingsData(),
    };
};

export const fetchArtistProducts =() =>{
    let formData = new FormData();
    formData.append('offset',0);
    formData.append('pageRange',15);
    formData.append('limit_from',0);
    formData.append('limit_to',15);
    return{
        type: FETCH_ARTIST_PRODUCTS,
        promise:getSellerProductList(formData),
    };
};

export const fetchArtistServices =() =>{
    return{
        type: FETCH_ARTIST_SERVICES,
        promise:fetchServiceCourseData(),
    };
};

export const fetchArtistProjects =() =>{
    return{
        type: FETCH_ARTIST_PROJECTS,
        promise:getUserProjectList(),
    };
};

export const fetchArtistJobs =() =>{
    return{
        type: FETCH_ARTIST_JOBS,
        promise:getMyJobsList(),
    };
};

export const fetchArtistWorkExperience =() =>{
    return{
        type: FETCH_ARTIST_WORK_EXP,
        promise:getArtistWorkExpList(),
    };
};

