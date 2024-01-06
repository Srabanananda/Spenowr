/**
 * Create By @name Sukumar_Abhijeet,
 */

import Config from '@Config/default';
import axios from 'axios';

const {BASE_PATH,API_VERSIONING} = Config;

export const getProjectList = (bodyFormData) => {
    const url = `${BASE_PATH+API_VERSIONING}/photography/project-list`;
    return axios
        .post(
            url,
            bodyFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getUserProjectList = (bodyFormData) => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/user-project`;
    return axios
        .post(
            url,
            bodyFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getProjectDetails = (bodyFormData) => {
    const url = `${BASE_PATH+API_VERSIONING}/photography/project-detail`;
    return axios
        .post(
            url,
            bodyFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getDonateMoney = (bodyFormData) => {
    const url = `${BASE_PATH+API_VERSIONING}/contact/donate-empower-artists`;
    return axios
        .post(
            url,
            bodyFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getContestList = (bodyFormData) => {
    const url = `${BASE_PATH+API_VERSIONING}/contest/list-contest`;
    return axios
        .post(
            url,
            bodyFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getContestDetailsById = (bodyFormData) => {
    const url = `${BASE_PATH+API_VERSIONING}/contest/detail-contest`;
    return axios
        .post(
            url,
            bodyFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getContestTypeParticipants = (contest_id, type,contest_type) => {
    const url = `${BASE_PATH+API_VERSIONING}/contest/list-type-contest-paticipent`;
    const data = new FormData();
    data.append('contest_type',contest_type);
    data.append('contest_id',contest_id);
    data.append('type',type);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getContestVoteSubmitted = (entity_id,contest_id, vote_submit,contest_type,media_id) => {
    const url = `${BASE_PATH+API_VERSIONING}/contest/contest-vote-submit`;
    const data = new FormData();
    data.append('entity_id',entity_id);
    data.append('contest_id',contest_id);
    data.append('vote_submit',vote_submit);
    data.append('contest_type',contest_type);
    data.append('media_id',media_id);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const addRemoveContestVote = (login_vote_count,entity_id) => {
    const url = `${BASE_PATH+API_VERSIONING}/photography/add-remove-contest-vote`;
    const data = new FormData();
    data.append('login_vote_count',login_vote_count);
    data.append('entity_id',entity_id);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const inviteFriendToVote = (first_name,last_name,email,mediaType,contestMediaId) => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/spenowr-vote-invite-friend`;
    const data = new FormData();
    data.append('first_name',first_name);
    data.append('last_name',last_name);
    data.append('email',email);
    data.append('mediaType',mediaType);
    data.append('contestMediaId',contestMediaId);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};


export const changePassword = (bodyFormData) => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/update-password`;
    return axios
        .post(
            url,
            bodyFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const updateNotificationSubscription = (bodyFormData) => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/update-notification`;
    return axios
        .post(
            url,
            bodyFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getAwardsList = () => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/artist-award-data`;
    return axios
        .post(
            url,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                    //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }
        )
        .then(response => response.data);
};

export const deleteAward = (mCouserId) => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/delete-artist-award`;
    return axios
        .post(
            url,
            mCouserId,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }
        )
        .then(response => response.data);
};

export const createAward = (bodyFormData) => {
    const url = `${BASE_PATH+API_VERSIONING}/profile/add-artist-award`;
    return axios
        .post(
            url,
            bodyFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};


export const getSupportCenterMessages = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/message-data`;
    return axios
        .post(
            url,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};


export const getMessageDetails = (converstationId) => {
    const formData = new FormData();
    formData.append('cid',converstationId);
    const url = `${BASE_PATH + API_VERSIONING}/profile/message-detail`;
    return axios
        .post(
            url,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const addMessageToSupportConversation = (formData) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/add-message`;
    return axios
        .post(
            url,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getJobList = (formData) => {
    const url = `${BASE_PATH + API_VERSIONING}/photography/list-assignment`;
    return axios
        .post(
            url,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getJobDetails = (slug) => {
    const url = `${BASE_PATH + API_VERSIONING}/photography/assignment-detail`;
    const formData = new FormData();
    formData.append('slug_url',slug);
    return axios
        .post(
            url,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const addModuleComment = (user_id,media_id,comment,type) => {
    const url = `${BASE_PATH + API_VERSIONING}/comment/add-comment`;
    const formData = new FormData();
    formData.append('posted_by',user_id);
    formData.append('media_id',media_id);
    formData.append('type',type);
    formData.append('comment',comment);
    return axios
        .post(
            url,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getMyJobsList = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/photography-assignment-data`;
    return axios
        .post(
            url,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};


export const getAssignmentBids = (id) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/photography-assignment-bids-data`;
    const data = new FormData();
    data.append('assignment_id',id);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const closeJob = (id) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/close-Photo-Assignment`;
    const data = new FormData();
    data.append('assignment_id',id);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const deleteJob = (id,type) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/delete-Photo-Assignment`;
    const data = new FormData();
    data.append('assignment_id',id);
    data.append('type',type);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const deleteWork = (id) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/delete-artist-work-experince`;
    const data = new FormData();
    data.append('exp_id',id);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const editWork = (id) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/edit-artist-work-experince`;
    const data = new FormData();
    data.append('exp_id',id);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const addWorkExp = (formValues) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/add-work-experince`;
    const hasImagePath = formValues?.certificate?.assets?.length ?? false;
    const data = new FormData();
    data.append('title',formValues.title);
    data.append('exp_givenby',formValues.orgName);
    data.append('job_active',formValues.currentlyWorking);
    data.append('description',formValues.expDescription);
    data.append('start_date',formValues.startDate);
    data.append('end_date',formValues.currentlyWorking ? '' : formValues.endDate);
    data.append('workexp_image_path', hasImagePath ? formValues?.certificate?.assets[0]?.base64  : null);
    data.append('image_alt_text',formValues.title);

    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const updateWorkExp = (formValues,id) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/update-artist-work-experince`;
    const hasImagePath = formValues?.certificate?.assets?.length ?? false;
    const data = new FormData();
    data.append('title',formValues.title);
    data.append('exp_givenby',formValues.orgName);
    data.append('job_active',formValues.currentlyWorking);
    data.append('description',formValues.expDescription);
    data.append('start_date',formValues.startDate);
    data.append('end_date',formValues.currentlyWorking ? '' : formValues.endDate);
    data.append('workexp_image_path', hasImagePath ? formValues?.certificate?.assets[0]?.base64  :  '');
    data.append('image_alt_text',formValues.title);
    data.append('exp_id',id);

    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getEditJobDetails = (id) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/edit-profile-photography-assignment`;
    const data = new FormData();
    data.append('assignment_id',id);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const addJob = (data,isEdit) => {
    const url = `${BASE_PATH + API_VERSIONING}${isEdit ? '/profile/update-Photo-Assignment' : '/profile/add-Photo-Assignment'}`;
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const addProject = (data,isEdit) => {
    const url = `${BASE_PATH + API_VERSIONING}${isEdit ? '/profile/update-project' : '/profile/add-project'}`;
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getEditProjectDetails = (id) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/edit-project`;
    const data = new FormData();
    data.append('project_id',id);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const deleteProject = (id,type) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/project-status-change`;
    const data = new FormData();
    data.append('project_id',id);
    data.append('type',type);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const submitBids = (userId,assignmentId,bidPrice,comment,title) => {
    const url = `${BASE_PATH + API_VERSIONING}/photography/assignment-Place-Bid`;
    const data = new FormData();
    data.append('user_id',userId);
    data.append('assignment_id',assignmentId);
    data.append('assignment_title',title);
    data.append('bid_currency',);
    data.append('bid_quote',bidPrice);
    data.append('bid_comment',comment);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getAssignmentBidDetails = (id) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/assignment-bid-detail`;
    const data = new FormData();
    data.append('conversation_id',id);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const addBidConversationReply = (id,comment) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/assignment-bid-detail`;
    const data = new FormData();
    data.append('conversation_id',id);
    data.append('bid_comment',comment);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getCustomPrintsList = (fromLimit,toLimit) => {
    const url = `${BASE_PATH + API_VERSIONING}/printProduct/print-product-list`;
    const formData = new FormData();
    formData.append('currency',null);
    formData.append('sort','new');
    formData.append('cat','');
    formData.append('subcat','');
    formData.append('type','');
    formData.append('slug','');

    formData.append('query','');
    formData.append('minPrice','');
    formData.append('maxprice','');
    formData.append('min_size','');
    formData.append('max_size','');

    formData.append('country','');
    formData.append('state','');
    formData.append('rating','');
    formData.append('priceRange','');
    formData.append('monthlyshop','');

    formData.append('today_deals','');
    formData.append('navcd','');
    formData.append('price','');
    formData.append('navrating','');
    formData.append('radius','');

    formData.append('postcode','');
    formData.append('summary_filter','');

    formData.append('page','FIRST');
    formData.append('offset',0);
    formData.append('pageRange',15);
    formData.append('limit_from',fromLimit);
    formData.append('limit_to',toLimit);

    return axios
        .post(
            url,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getCustomPrintsDetails = (slug) => {
    const url = `${BASE_PATH + API_VERSIONING}/printProduct/get-print-product-detail`;
    const data = new FormData();
    data.append('slug',slug);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};


export const getAudioPodCastList = (limit_from, limit_to) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/audio-podcast-list`;
    const data = new FormData();
    data.append("feed_type", "series");
    data.append("limit_from", 0);
    data.append("limit_to", 20);
    data.append("pageRange", 20);
    data.append("offset", 0);
    data.append("language", "");
    return axios
        .post(url, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    .then((response) => response.data);
};

export const getSeriesDetails = (series_id) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/series-list-data`;
    const data = new FormData();
    data.append("series_id", series_id);
    return axios
        .post(url, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    .then((response) => response.data);
};



