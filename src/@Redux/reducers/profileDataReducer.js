/**
 * Create By @name Sukumar_Abhijeet 
 */

import {
    FETCH_ARTIST_AWARDS_FAILURE,FETCH_ARTIST_AWARDS_REQUEST,FETCH_ARTIST_AWARDS_SUCCESS,
    FETCH_ARTIST_ARTWORKS_FAILURE,FETCH_ARTIST_ARTWORKS_REQUEST,FETCH_ARTIST_ARTWORKS_SUCCESS,
    FETCH_ARTIST_QUOTEPOEMS_FAILURE,FETCH_ARTIST_QUOTEPOEMS_REQUEST,FETCH_ARTIST_QUOTEPOEMS_SUCCESS,
    FETCH_ARTIST_PRODUCTS_FAILURE,FETCH_ARTIST_PRODUCTS_REQUEST,FETCH_ARTIST_PRODUCTS_SUCCESS,
    FETCH_ARTIST_SERVICES_FAILURE,FETCH_ARTIST_SERVICES_REQUEST,FETCH_ARTIST_SERVICES_SUCCESS,
    FETCH_ARTIST_STORYBLOGS_FAILURE,FETCH_ARTIST_STORYBLOGS_REQUEST,FETCH_ARTIST_STORYBLOGS_SUCCESS,
    FETCH_ARTIST_PROJECTS_FAILURE,FETCH_ARTIST_PROJECTS_REQUEST,FETCH_ARTIST_PROJECTS_SUCCESS,
    FETCH_ARTIST_JOBS_FAILURE,FETCH_ARTIST_JOBS_REQUEST,FETCH_ARTIST_JOBS_SUCCESS,
    FETCH_ARTIST_WORK_EXP_FAILURE,FETCH_ARTIST_WORK_EXP_SUCCESS,FETCH_ARTIST_WORK_EXP_REQUEST,
    FETCH_SERIES_FAILURE, FETCH_SERIES_SUCCESS, FETCH_SERIES_REQUEST,
} from '../constants/profileData.constant';

const initialState = {
    awards:[],
    artworks:[],
    writings:[],
    products:[],
    services:[],
    storyBlogs:[],
    projects:[],
    jobs:[],
    workExp : [],
    series: [],
    awardApiCalled:false,
    artworkApiCalled:false,
    writingApiCalled:false,
    storyBlogApiCalled:false,
    productsApiCalled:false,
    servicesApiCalled:false,
    jobsApiCalled:false,
    workExpApiCalled : false,
};

const  profileDataReducer = (state = initialState,action) =>{
    const {type} = action;
    switch(type){

    case  FETCH_SERIES_REQUEST:
        return { ...state,seriesApiCalled:true};   

    case FETCH_SERIES_SUCCESS:
    {   
        const {data:{seriesdata=[]}} = action.response;
        return{...state,series:seriesdata,seriesApiCalled:false};
    }   
    case FETCH_SERIES_FAILURE:
        return { ...state,seriesApiCalled:false};


    case  FETCH_ARTIST_AWARDS_REQUEST:
        return { ...state,awardApiCalled:true};   

    case FETCH_ARTIST_AWARDS_SUCCESS:
    {   
        const {data:{awardData=[]}} = action.response;
        return{...state,awards:awardData,awardApiCalled:false};
    }   
    case FETCH_ARTIST_AWARDS_FAILURE:
        return { ...state,awardApiCalled:false}; 


    case  FETCH_ARTIST_ARTWORKS_REQUEST:
        return { ...state,artworkApiCalled:true};   
    
    case FETCH_ARTIST_ARTWORKS_SUCCESS:
    {   
        const {data:{instututeImagesData=[]}} = action.response;
        return{...state,artworks:instututeImagesData,artworkApiCalled:false};
    }   
    case FETCH_ARTIST_ARTWORKS_FAILURE:
        return { ...state,artworkApiCalled:false}; 





    case  FETCH_ARTIST_QUOTEPOEMS_REQUEST:
        return { ...state,writingApiCalled:true};   
        
    case FETCH_ARTIST_QUOTEPOEMS_SUCCESS:
    {   
        const {data:{QuoteData=[]}} = action.response;
        return{...state,writings:QuoteData,writingApiCalled:false};
    }   
    case FETCH_ARTIST_QUOTEPOEMS_FAILURE:
        return { ...state,writingApiCalled:false}; 





    case  FETCH_ARTIST_STORYBLOGS_REQUEST:
        return { ...state,storyBlogApiCalled:true};   
        
    case FETCH_ARTIST_STORYBLOGS_SUCCESS:
    {   
        const {data:{articleData=[]}} = action.response;
        return{...state,storyBlogs:articleData,storyBlogApiCalled:false};
    }   
    case FETCH_ARTIST_STORYBLOGS_FAILURE:
        return { ...state,storyBlogApiCalled:false}; 





    case  FETCH_ARTIST_PRODUCTS_REQUEST:
        return { ...state,productsApiCalled:true};   
            
    case FETCH_ARTIST_PRODUCTS_SUCCESS:
    {   
        const {data:{productData=[]}} = action.response;
        return{...state,products:productData,productsApiCalled:false};
    }   
    case FETCH_ARTIST_PRODUCTS_FAILURE:
        return { ...state,productsApiCalled:false}; 



        
    case  FETCH_ARTIST_SERVICES_REQUEST:
        return { ...state,productsApiCalled:true};   
                
    case FETCH_ARTIST_SERVICES_SUCCESS:
    {   
        const {data:{courses=[]}} = action.response;
        return{...state,services:courses,productsApiCalled:false};
    }   
    case FETCH_ARTIST_SERVICES_FAILURE:
        return { ...state,productsApiCalled:false}; 



    case  FETCH_ARTIST_PROJECTS_REQUEST:
        return { ...state,projectsApiCalled:true};   
                
    case FETCH_ARTIST_PROJECTS_SUCCESS:
    {   
        const {data:{projectData=[]}} = action.response;
        return{...state,projects:projectData,projectsApiCalled:false};
    }   
    case FETCH_ARTIST_PROJECTS_FAILURE:
        return { ...state,projectsApiCalled:false}; 


        
    case  FETCH_ARTIST_JOBS_REQUEST:
        return { ...state,jobsApiCalled:true};   
                
    case FETCH_ARTIST_JOBS_SUCCESS:
    {   
        const {data:{photo_assignment=[]}} = action.response;
        return{...state,jobs:photo_assignment,jobsApiCalled:false};
    }   
    case FETCH_ARTIST_JOBS_FAILURE:
        return { ...state,jobsApiCalled:false}; 


    case  FETCH_ARTIST_WORK_EXP_REQUEST:
        return { ...state,workExpApiCalled:true};   
                
    case FETCH_ARTIST_WORK_EXP_SUCCESS:
    {   
        const {data:{workExpData=[]}} = action.response;
        return{...state,workExp:workExpData,workExpApiCalled:false};
    }   
    case FETCH_ARTIST_WORK_EXP_FAILURE:
        return { ...state,workExpApiCalled:false}; 

    

    default:
        return state;
    }
};

export default profileDataReducer;