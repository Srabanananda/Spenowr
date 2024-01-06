import Config from '../../../../@Config/default';
import axios from 'axios';

const { BASE_PATH, API_VERSIONING } = Config;

export const getAllFindArtist = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/institute/fetch-artists`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }
        )
        .then(response => response.data);
};

export const getAllInstitutes = (limit,dataSet) => {
    const url = `${BASE_PATH + API_VERSIONING}/institute/view-institute`;
    var form_data = new FormData();

    dataSet.limit_from = limit;
    dataSet.limit_to = limit+30;

    for ( var key in dataSet ) {
        form_data.append(key, dataSet[key]);
    }
    return axios
        .post(
            url,
            form_data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }
        )
        .then(response => response.data);
};

export const getAllInstitutesWithFilter = (limit, dataSet) => {
    const url = `${BASE_PATH + API_VERSIONING}/institute/view-institute`;
    var form_data = new FormData();

    dataSet.limit_from = limit;
    dataSet.limit_to = limit+30;

    for ( var key in dataSet ) {
        form_data.append(key, dataSet[key]);
    }
    return axios
        .post(
            url,
            form_data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }
        )
        .then(response => response.data);
};

export const getAllCourses = (limit,dataSet) => {
    const url = `${BASE_PATH + API_VERSIONING}/courses/view-course-list`;
    var form_data = new FormData();

    dataSet.limit_from = limit;
    dataSet.limit_to = limit+30;

    for ( var key in dataSet ) {
        form_data.append(key, dataSet[key]);
    }
    return axios
        .post(
            url,
            form_data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }
        )
        .then(response => response.data);
};

export const getAllCustomArtWorks = (limit=0) => {
    const url = `${BASE_PATH + API_VERSIONING}/courses/view-course-list`;
    let formData = new FormData();
    formData.append('query','');
    formData.append('page','FIRST');
    formData.append('service_type','custom_art_work');
    formData.append('offset',0);
    formData.append('pageRange',16);
    formData.append('limit_from',limit);
    formData.append('limit_to',limit+15);
    return axios
        .post(
            url,
            formData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }
        )
        .then(response => response.data);
};


export const addCourseReview = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/courses/add-course-review`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};


export const addInstituteReview = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/institute/review-institute`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};



export const addRemoveHeart = (heart_status, module_id) => {
    const url = `${BASE_PATH + API_VERSIONING}/institute/add-remove-heart`;
    return axios
        .post(
            url,
            {
                heart_status, module_id
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};
