/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text, TouchableOpacity} from 'react-native';
import { 
    articleLikeDislike, artworkLikeDislike, quotesLikeDislike, 
    serviceLikeDislike, productLikeDislike, contestLikeDislike, 
    commentLikeDislike 
} from '../../../../../../@Endpoints/Core/Tabs/Home';
import Comments from './Comment';
import Share from '../../../../../../@GlobalComponents/Share';
import styles from './styles';
import PropTypes from 'prop-types';
import Config from '@Config/default';

const {SHARABLE_BASE_URL} = Config;

const CardActions = ({info,hideInfo}) =>{
    const {
        login_heart_count = 0,
        heart_count = 0,
        comment_count = 0,
        type = 'artwork',
        module_id='',
        slug_url=''
    } = info;

    const getFolderPath = () =>{
        switch(type)
        {
        case 'gallery' :
            return 'art-craft';
        
        case 'artwork' :
            return 'art-craft';

        case 'Quote' :
            return 'short-quotes-poems';

        case 'article' :
            return 'article';

        case 'product' :
            return 'shop/product';

        case 'service' :
            return 'service';
        
        case 'jobs' :
            return 'jobs';
             
        default :
            return '';
        }
    };

    const sharableMessage = `${SHARABLE_BASE_URL}${getFolderPath()}/${slug_url}`;

    const [isLiked, setIsLiked] = useState(login_heart_count);
    const [likesCount, setLikesCount] = useState(heart_count);
    const [comments, setComments] = useState(parseInt(comment_count));

    const increaseCommentCount = () =>{
        setComments(comments+1);
    };

    const decreaseCommentCount = () =>{
        setComments(comments > 0 ? comments-1 : comments);
    };

    const checkLiked = () =>{
        if(isLiked) setLikesCount(parseInt(likesCount)-1); 
        else setLikesCount(parseInt(likesCount)+1);
        setIsLiked(!isLiked);
        switch (type) {
        case 'Quote':
            quote();
            break;

        case 'gallery':
            artwork();
            break;

        case 'service':
            service();
            break;
        
        case 'product':
            product();
            break;

        case 'article':
            article();
            break;
            
        case 'contest':
            contest();
            break;

        case 'jobs':
            jobs();
            break;
            
        default:
            artwork();
            break;
        }
    };

    const quote = () =>{
        quotesLikeDislike(isLiked ? 1 : 0,module_id)
            .then()
            .catch();
    };

    const artwork = () =>{
        artworkLikeDislike(isLiked ? 1 : 0,module_id)
            .then()
            .catch();
    };

    const article = () =>{
        articleLikeDislike(isLiked ? 1 : 0 ,module_id)
            .then()
            .catch();
    };

    const contest = () =>{
        contestLikeDislike(isLiked ? 1 : 0 ,module_id)
            .then()
            .catch();
    };

    const service = () =>{
        serviceLikeDislike(isLiked?1:0, module_id)
            .then()
            .catch();
    };

    const product = () =>{
        productLikeDislike(isLiked?1:0, module_id)
            .then()
            .catch();
    };

    const jobs = () =>{
        commentLikeDislike(isLiked ? 1 : 0,module_id,type)
            .then()
            .catch();
    };

    return(
        <>
            {hideInfo ? null : 
                <View style={styles.countWrapper}>
                    <Text style={styles.actionText}>{likesCount} Like(s)</Text>
                    <Text style={styles.actionText}>{comments} Comment(s)</Text>
                </View>}
            <View style={styles.actionWrapper}>
                <TouchableOpacity onPress={()=>checkLiked()} style={styles.actionBox}>
                    <Text style={ !isLiked  ? styles.actionText : styles.actionTextLiked}>{isLiked ? 'Liked' : 'Like'}</Text>
                </TouchableOpacity>
                <Comments info={info} refreshCommentCount = {increaseCommentCount} refreshCount={decreaseCommentCount} />
                <Share message={sharableMessage} />
            </View>
        </>
    );
};

CardActions.propTypes = {
    hideInfo: PropTypes.any,
    info:PropTypes.object.isRequired,
};

export default CardActions;