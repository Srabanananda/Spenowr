/**
 * Create By @name Sukumar_Abhijeet
 */


import Config from '@Config/default';
import axios from 'axios';

const { BASE_PATH, API_VERSIONING } = Config;
export const fetchServiceCourseData = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/course-data`;
    return axios
        .post(
            url,
            [],
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const fetchSeriesData = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/series-list`;
    return axios
        .post(
            url,
            [],
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const fetchArtworkgalleryData = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/gallery-data`;
    return axios
        .post(
            url,
            [],
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const fetchOpenContests = (mediaType) => {
    const body = new FormData();
    body.append('media_type', mediaType);
    // body.append('media_id', media_id);
    const url = `${BASE_PATH + API_VERSIONING}/profile/open-contest-data`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const fetchContestRemoveData = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/open-contest-remove-data`;
    return axios
        .post(
            url,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const getContestData = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/contest-data`;
    return axios
        .post(
            url,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const applyForContest = (body) => {
    console.log('body for applyForContest : ', JSON.stringify(body));
    const url = `${BASE_PATH + API_VERSIONING}/profile/apply-contest`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const applyForChangeOfArtworkInAContest = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/artwork-change-contest`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const removeFromContest = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/remove-image-contest`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};


export const sendSellerFormRequest = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/seller-gst-submit`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getArtistAwards = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/artist-award-data`;
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

export const getArtistWorkExpList = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/artist-workexp-data`;
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

export const addArtistAwards = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/add-artist-award`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const editArtistAwards = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/update-artist-award`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getArtistEvents = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/event-data`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const addArtistEvent = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/add-event`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const editArtistEvent = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/update-event`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const deletArtistEvent = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/delete-profile-event`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const addSeries = (body) => {
    console.log('body' , body);
    const url = `${BASE_PATH + API_VERSIONING}/profile/add-series`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const editSeries = (series_id) => {
    const body = new FormData();
    body.append("series_id", series_id);
    const url = `${BASE_PATH + API_VERSIONING}/profile/edit-series`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const updateSeries = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/update-series`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const deleteSeries = (series_id) => {
    const body = new FormData();
    body.append('series_id', series_id);
    const url = `${BASE_PATH + API_VERSIONING}/profile/delete-series`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getArtistPressRelease = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/press-data`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const addArtistPressRelease = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/add-press`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const editArtistPressRelease = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/update-press`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const deletArtistPressRelease = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/delete-press`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getArtistTeam = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/team-data`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const addArtistTeam = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/add-team`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const editArtistTeam = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/update-team`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const deletArtistTeam = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/delete-team`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const deleteArtistAwards = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/delete-artist-award`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getSellerProductList = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/product-data`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const deleteSellerProduct = (product_id, isReactivate) => {
    const body = new FormData();
    body.append('product_id', product_id);
    const url = `${BASE_PATH + API_VERSIONING}/profile/${isReactivate ? 'reactive-product' : 'delete-product'}`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const markSoldSellerProduct = (product_id) => {
    const body = new FormData();
    body.append('product_id', product_id);
    const url = `${BASE_PATH + API_VERSIONING}/profile/sold-product`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getSellerOrderList = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/get-received-order-data`;
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

export const getSellerEachOrderDetails = (orderID, buyerName, orderStatus) => {
    const body = new FormData();
    body.append('orderId', orderID);
    body.append('buyerName', buyerName);
    body.append('orderStatus', orderStatus);
    const url = `${BASE_PATH + API_VERSIONING}/profile/seller-order-list`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getEditProductDetails = (prodID) => {
    const body = new FormData();
    body.append('product_id', prodID);
    const url = `${BASE_PATH + API_VERSIONING}/profile/edit-product-data`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const contactToAdmin = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/add-cadmin`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const contactToUser = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/institute/contact-institute`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const reportAnUser = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/report/submit-report-user-post`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const addMyProduct = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/add-product`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const editMyProduct = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/update-product`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const getProductCare = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/product-care`;
    return axios
        .get(url)
        .then(response => response.data);
};

export const fetchWritingsData = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/quote-poem-data`;
    return axios
        .post(
            url,
            [],
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const addWritingsData = (title, category, sub_category, description, quote_image, text_color, theme_image, back_ground_color, bold, italic, font, quote_id, tag, showDesc = true, language, author, poly_desc, audio_mode, poly_response, audioFile) => {
    const url = !quote_id ? `${BASE_PATH + API_VERSIONING}/profile/add-quote` : `${BASE_PATH + API_VERSIONING}/profile/update-quote-data`;
    const body = new FormData();
    body.append('title', title);
    body.append('category', category);
    body.append('sub_category', sub_category);
    body.append('description', description);
    body.append('quote_image', quote_image ? quote_image : null);
    body.append('text_color', text_color ? text_color : 'black');
    body.append('chechk_white_bground', 'true');
    body.append('colorBGType', back_ground_color);
    body.append('textBold', bold);
    body.append('textItalic', italic);
    body.append('theme_image', theme_image);
    body.append('textFont', font);
    body.append('image_type', back_ground_color ? 'plain_text' : category === 'quote' ? 'horizontal' : 'vertical');
    body.append('tags', tag);
    body.append('show_description', showDesc);

    body.append('new_language', language);
    if(language){
        if(language === "EN" || language === "HI"){
            body.append('audio_mode', audio_mode);
            if(audio_mode === 0){
                body.append('author', author);
                body.append('article_poly_description', poly_desc);
                body.append('polly_response_msg', poly_response);
            }else{
                body.append('play_audio', audioFile);
            }
        }
    }
    if (quote_id) {
        body.append('quote_id', quote_id);
    }
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const TextToAudio = (description, author, language, fileAudio, isAIMode) => {
    const body = new FormData();
    if(isAIMode){
        body.append('description', description);
        body.append('author', author);
        body.append('new_language', language);
    }else{
        body.append('play_audio', fileAudio);
    }
    const url = `${BASE_PATH + API_VERSIONING}/profile/${ isAIMode ? 'text-to-audio' : 'upload-audio'}`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': isAIMode ? 'application/x-www-form-urlencoded;charset=UTF-8' : 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const getUserSeries = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/user-series-list`;
    return axios
        .post(
            url,
            [],
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const aiSearch = (searchText) => {

    const body = new FormData();
    body.append('query', searchText);

    const url = `${BASE_PATH + API_VERSIONING}/profile/ai-story-generate-profile`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const editQuote = (quote_id) => {

    const body = new FormData();
    body.append('quote_id', quote_id);

    const url = `${BASE_PATH + API_VERSIONING}/profile/edit-quote`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const deleteQuote = (quote_id) => {

    const body = new FormData();
    body.append('quote_id', quote_id);
    const url = `${BASE_PATH + API_VERSIONING}/profile/delete-quote`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const fetchArticlesData = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/article-data`;
    return axios
        .post(
            url,
            [],
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const addArticle = (body, isEdit) => {
    const url = `${BASE_PATH + API_VERSIONING}${isEdit ? '/profile/update-article' : '/profile/add-article'}`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => response.data);
};

export const editArticle = (id) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/edit-profile-article`;
    const data = new FormData();
    data.append('article_id',id);
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

export const deleteArticle = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/delete-profile-article`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const publishArticle = (body) => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/publish-profile-article`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const getMyEmailVerifyLink = () => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/email-verify`;
    return axios
        .post(
            url,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const getServicePackageData = course_id => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/service-package-data`;
    const body = new FormData();
    body.append('course_id', course_id);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const deleteServicePackage = package_id => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/delete-package`;
    const body = new FormData();
    body.append('package_id', package_id);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const addServicePackage = data => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/add-service-package`;
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const editServicePackage = package_id => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/edit-package`;
    const body = new FormData();
    body.append('package_id', package_id);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};


export const updateServicePackage = data => {
    const url = `${BASE_PATH + API_VERSIONING}/profile/update-service-package`;
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};

export const getServiceDetails = course_id => {
    const url = `${BASE_PATH + API_VERSIONING}/courses/service-detail`;
    const body = new FormData();
    body.append('course_id', course_id);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};


export const addCourseReview = (course_id, author, email, comment, rating, recommended, g_recaptcha_response = '1') => {
    const url = `${BASE_PATH + API_VERSIONING}/courses/add-course-review`;
    const body = new FormData();
    body.append('course_id', course_id);
    body.append('author', author);
    body.append('email', email);
    body.append('comment', comment);
    body.append('rating', rating);
    body.append('recommended', recommended ? 1 : 0);
    body.append('g_recaptcha_response', g_recaptcha_response);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};


export const getServicePackageReviews = (media_id, skip, limit = 10) => {
    const url = `${BASE_PATH + API_VERSIONING}/courses/service-package-review-list`;
    const body = new FormData();
    body.append('media_id', media_id);
    body.append('skip', skip);
    body.append('limit', limit);
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            }
        )
        .then(response => response.data);
};











