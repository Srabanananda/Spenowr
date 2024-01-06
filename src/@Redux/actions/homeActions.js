/**
 * Create By @name Sukumar_Abhijeet,
 */

import { 
    FETCH_WHATS_NEW_FEED ,FETCH_FOR_SALE_FEED ,UPDATE_FEED,UPDATE_FILTERS ,
    FETCH_FEATURED_FEED,FETCH_CONTEST_DATA, FETCH_STORIES,
    FETCH_BY_SPENOWR_FEED,FETCH_MY_FOLLOWING_FEED,
    FETCH_NOTIFICATIONS, FETCH_PROJECTS, FETCH_ADS
} from '../constants/home.constant';
import { getWhatsNewFeed } from '../../@Endpoints/Core/Tabs/WhatsNew';
import { getFeaturedFeed } from '../../@Endpoints/Core/Tabs/Featured';
import { getContestData } from '../../@Endpoints/Core/Tabs/MyAccount';
import { getProjectList } from '../../@Endpoints/Core/Tabs/More';
import { fetchNotifications, fetchStories, getManagedAds } from '../../@Endpoints/Core/Tabs/Home';

export const fetchManagedAds =(data,length) =>{
    return{
        type: FETCH_ADS,
        promise:getManagedAds(data),
        length
    };
};

export const fetchWhatsNewFeed =(data,length) =>{
    return{
        type: FETCH_WHATS_NEW_FEED,
        promise:getWhatsNewFeed(data),
        length
    };
};

export const fetchForSaleFeed =(data,length) =>{
    return{
        type: FETCH_FOR_SALE_FEED,
        promise:getWhatsNewFeed(data),
        length
    };
};

export const fetchProjects =(data,length) =>{
    return{
        type: FETCH_PROJECTS,
        promise:getProjectList(data),
        length
    };
};

export const fetchBySpenowrFeed =(data,length) =>{
    return{
        type: FETCH_BY_SPENOWR_FEED,
        promise:getWhatsNewFeed(data),
        length,
    };
};

export const fetchMyFollowingFeed =(data,length) =>{
    return{
        type: FETCH_MY_FOLLOWING_FEED,
        promise:getWhatsNewFeed(data),
        length
    };
};


export const updateFeed =(feedData) =>{
    return{
        type: UPDATE_FEED,
        feedData,
    };
};

export const updateFilters =(appliedFilters) =>{
    return{
        type: UPDATE_FILTERS,
        appliedFilters,
    };
};

export const fetchFeaturedFeed =() =>{
    return{
        type: FETCH_FEATURED_FEED,
        promise:getFeaturedFeed(),
    };
};

export const fetchContestData =() =>{
    return{
        type: FETCH_CONTEST_DATA,
        promise:getContestData(),
    };
};

export const fetchUserStories =(skipStory=0,limit) =>{
    return{
        type: FETCH_STORIES,
        promise:fetchStories(skipStory,limit),
        skipStory
    };
};

export const fetchInAppNotifications =(skipStory=0,limit) =>{
    return{
        type: FETCH_NOTIFICATIONS,
        promise:fetchNotifications(skipStory,limit),
        skipStory
    };
};