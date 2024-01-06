/**
 * Create By @name Sukumar_Abhijeet 
 */

import { HOME_FILTERS } from '../../assets/JsonFiles/HomeFilters';
import {
    FETCH_WHATS_NEW_FEED_FAILURE,FETCH_WHATS_NEW_FEED_REQUEST,FETCH_WHATS_NEW_FEED_SUCCESS,
    FETCH_FOR_SALE_FEED_FAILURE,FETCH_FOR_SALE_FEED_REQUEST,FETCH_FOR_SALE_FEED_SUCCESS,
    UPDATE_FEED,UPDATE_FILTERS,
    FETCH_FEATURED_FEED_FAILURE,FETCH_FEATURED_FEED_REQUEST,FETCH_FEATURED_FEED_SUCCESS,
    FETCH_PROJECTS_FAILURE, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS,
    FETCH_CONTEST_DATA_SUCCESS,
    FETCH_STORIES_REQUEST,FETCH_STORIES_SUCCESS,FETCH_STORIES_FAILURE, 
    FETCH_BY_SPENOWR_FEED_REQUEST, FETCH_BY_SPENOWR_FEED_SUCCESS, FETCH_BY_SPENOWR_FEED_FAILURE, 
    FETCH_MY_FOLLOWING_FEED_REQUEST, FETCH_MY_FOLLOWING_FEED_SUCCESS, FETCH_MY_FOLLOWING_FEED_FAILURE,
    FETCH_NOTIFICATIONS_FAILURE,FETCH_NOTIFICATIONS_REQUEST,FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_ADS_FAILURE, FETCH_ADS_REQUEST, FETCH_ADS_SUCCESS,
} from '../constants/home.constant';

const _ = require('lodash');
let FILTER_MOCK = _.cloneDeep(HOME_FILTERS);

const initialState = {
    inAppNotifications:{
        notificationCount:0,
        notificationdata:[]
    },
    notificationApiCalled:false,

    whatsNewFeed:[],
    votesofday:'',
    apiCalled:false,
    managedAds: {},
    forSaleFeed:[],
    forSaleApiCalled:false,

    forProjectsFeed:[],
    forProjectsApiCalled:false,

    bySpenowrFeed:[],
    spenowrApiCalled:false,

    myFollowingFeed:[],
    followingApiCalled:false,

    filters:{
        searchText:'',
        appliedModules:FILTER_MOCK,
    },
    featuredFeeds:{},
    featuredApiCalled:false,
    isContestActive:0,
    isWritingContestActive:0,
    isStoriesContestActive:0,

    storyData:{
        storyOfWeek:[],
        totalStory:0,
    },
    storyApiCalled:false,
};

const  HomeReducer = (state = initialState,action) =>{
    const {type,feedData = [],appliedFilters,skipStory=0,length=0} = action;
    switch(type){

    case  UPDATE_FEED:
        { 
            if(feedData === 'whatsnew')
                return { ...state,whatsNewFeed:[]};  
            if(feedData === 'products')
                return { ...state,forSaleFeed:[]}; 
            if(feedData === 'following')
                return { ...state,myFollowingFeed:[]};  
            if(feedData === 'spenowr')
                return { ...state,bySpenowrFeed:[]};  
        }
        break;
    
    case UPDATE_FILTERS:
        return {...state,filters:appliedFilters};

    case FETCH_ADS_REQUEST:
        return {...state,forAdsApiCalled:true};
    case FETCH_ADS_SUCCESS:
    {   const { data: { AdsList } } = action.response;
        if(length)
            return{...state,managedAds:AdsList,forAdsApiCalled:false};
        return{...state,managedAds:AdsList,forAdsApiCalled:false};
    }   
    case FETCH_ADS_FAILURE:
        return { ...state,forAdsApiCalled:false};

        // WHATS NEW -------------------------------------------------------------------------------------->START    
    case  FETCH_WHATS_NEW_FEED_REQUEST:
        return { ...state,apiCalled:true};  
    case FETCH_WHATS_NEW_FEED_SUCCESS:
    {   const {data:{list=[],storyOfWeek=[],votesofday}} = action.response;
        if(length)
            return{...state,whatsNewFeed:[...state.whatsNewFeed,...list],votesofday:votesofday,apiCalled:false};
        return{...state,whatsNewFeed:list,votesofday:votesofday,apiCalled:false};
    }   
    case FETCH_WHATS_NEW_FEED_FAILURE:
        return { ...state,apiCalled:false};
        // WHATS NEW -------------------------------------------------------------------------------------->END  
        
        // FOR SALE -------------------------------------------------------------------------------------->START    
    case  FETCH_FOR_SALE_FEED_REQUEST:
        return { ...state,forSaleApiCalled:true};  
    case FETCH_FOR_SALE_FEED_SUCCESS:
    {   const {data:{list=[]}} = action.response;
        if(length)
            return{...state,forSaleFeed:[...state.forSaleFeed,...list],forSaleApiCalled:false};
        return{...state,forSaleFeed:list,forSaleApiCalled:false};
    }   
    case FETCH_FOR_SALE_FEED_FAILURE:
        return { ...state,forSaleApiCalled:false};
        // FOR SALE -------------------------------------------------------------------------------------->END  

        // FOR PROJECTS -------------------------------------------------------------------------------------->START    
    case  FETCH_PROJECTS_REQUEST:
        return { ...state,forProjectsApiCalled:true};  
    case FETCH_PROJECTS_SUCCESS:
    {   const {data:{projectList=[]}} = action.response;
    // console.log("Actions : ", projectList);
        if(length)
            return{...state,forProjectsFeed:[...state.forProjectsFeed,...projectList],forProjectsApiCalled:false};
        return{...state,forProjectsFeed:projectList,forProjectsApiCalled:false};
    }   
    case FETCH_PROJECTS_FAILURE:
        return { ...state,forProjectsApiCalled:false};
        // FOR PROJECTS -------------------------------------------------------------------------------------->END  
    
        // BY SPENOWR -------------------------------------------------------------------------------------->START
    case  FETCH_BY_SPENOWR_FEED_REQUEST:
        return { ...state,spenowrApiCalled:true};   
    case FETCH_BY_SPENOWR_FEED_SUCCESS:
    {   
        const {data:{list=[]}} = action.response;
        if(length)
            return{...state,bySpenowrFeed:[...state.bySpenowrFeed,...list],spenowrApiCalled:false};
        return{...state,bySpenowrFeed:list,spenowrApiCalled:false};
    }   
    case FETCH_BY_SPENOWR_FEED_FAILURE:
        return { ...state,spenowrApiCalled:false};
        // BY SPENOWR -------------------------------------------------------------------------------------->END

        // MY FOLLOWING -------------------------------------------------------------------------------------->START    
    case  FETCH_MY_FOLLOWING_FEED_REQUEST:
        return { ...state,followingApiCalled:true};   
    case FETCH_MY_FOLLOWING_FEED_SUCCESS:
    {   
        const {data:{list=[]}} = action.response;
        if(length)
            return{...state,myFollowingFeed:[...state.myFollowingFeed,...list],followingApiCalled:false};
        return{...state,myFollowingFeed:list,followingApiCalled:false};
    }   
    case FETCH_MY_FOLLOWING_FEED_FAILURE:
        return { ...state,followingApiCalled:false};
        // MY FOLLOWING -------------------------------------------------------------------------------------->END  
        
        // FEATURED -------------------------------------------------------------------------------------->START  
    case  FETCH_FEATURED_FEED_REQUEST:
        return { ...state,featuredApiCalled:true};   
    case FETCH_FEATURED_FEED_SUCCESS:
    {   
        const {data={}} = action.response;
        return{...state,featuredFeeds:data,featuredApiCalled:false};
    }   
    case FETCH_FEATURED_FEED_FAILURE:
        return { ...state,featuredApiCalled:false}; 
        // FEATURED -------------------------------------------------------------------------------------->END 

        // NOTIFICATIONS -------------------------------------------------------------------------------------->START 
    case  FETCH_NOTIFICATIONS_REQUEST:
        return { ...state,notificationApiCalled:true};   
    case FETCH_NOTIFICATIONS_SUCCESS:
    {   
        const {data={}} = action.response;
        return{...state,inAppNotifications:data,notificationApiCalled:false};
    }   
    case FETCH_NOTIFICATIONS_FAILURE:
        return { ...state,notificationApiCalled:false}; 
        // NOTIFICATIONS -------------------------------------------------------------------------------------->START 
        
        // CONTEST DATA -------------------------------------------------------------------------------------->START 
    case FETCH_CONTEST_DATA_SUCCESS:
    {   
        const {data:{PhotographyContest=0,writingsContest=0,storiesContest=0}} = action.response;
        
        return{
            ...state,
            isContestActive:PhotographyContest,
            isWritingContestActive : writingsContest,
            isStoriesContestActive : storiesContest,
        };
    }   
        // CONTEST DATA -------------------------------------------------------------------------------------->START 
    
        // STORIES -------------------------------------------------------------------------------------->START 
    case  FETCH_STORIES_REQUEST:
        return { ...state,storyApiCalled:true};   
    case FETCH_STORIES_SUCCESS:
    {   
        const {data={}} = action.response;
        if(skipStory)
        {
            data.storyOfWeek = [...state.storyData.storyOfWeek,...data.storyOfWeek];
            return{...state,storyData:data,storyApiCalled:false};
        }
        else
            return{...state,storyData:data,storyApiCalled:false};
    }   
    case FETCH_STORIES_FAILURE:
        return { ...state,storyApiCalled:false}; 
        // STORIES -------------------------------------------------------------------------------------->START 

    default:
        return state;
    }
};

export default HomeReducer;