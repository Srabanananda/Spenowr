/**
 * Create By @name Sukumar_Abhijeet 
 */

import React,{useEffect} from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import styles from '../../WhatsNew/styles';
import Capitalize from '../../../../../../../@Utils/helperFiles/Capitalize';
import Config from '@Config/default';
import CardActions from '../../WhatsNew/CardActions';
import { useNavigation } from '@react-navigation/native';
import { GetCatValue, GetSubCatValue } from '../../../../../../../@Utils/helperFiles/GetCatSubcat';
import ScaledImage from '../../../../../../../@GlobalComponents/ScalableImage';
import ArtistBox from '../../../../../../../@GlobalComponents/ArtistBox';
import WritingsView from '../../../../../../../@GlobalComponents/WritingsView';
import { getCurrency } from '../../../../../../../@Utils/helperFiles/CardDetails';
import YouTubePlayer from '../../../../../../../@GlobalComponents/YoutubePlayer';
import Tags from '../../WhatsNew/Tags/index';
import MoreOptions from '../../WhatsNew/Actions/index';
import { isAValidImagePath } from '../../../../../../../@Utils/helperFiles/helpers';
import { makeVote } from "../../../../../../../@Endpoints/Core/Tabs/Home";
import useUserData from "../../../../../../../@Hooks/useUser";
import MusicPlayer from '../../../../../../@Common/MusicPlayer';
import SimpleToast from 'react-native-simple-toast';

const { NEW_IMG_BASE, DUMMY_IMAGE_URL, DEFAULT_PROFILE } = Config;

export const getFooter = () => {
    return (
        <View style={styles.blurView}>
            <Text style={styles.reviewText}>www.spenowr.com</Text>
        </View>
    );
};

const Card = ({ ...props }) => {

    const { info, externalCall, noTags = false, refresh, isVoted } = props;
    const navigation = useNavigation();
    const { UserInstituteData } = useUserData();
    const {
        id = '',
        category = '',
        sub_category = '',
        feed_description = '',
        feed_more_description = '',
        feed_less_description = '',
        image_path = '',
        image_type = 'image',
        name = '',
        type = '',
        cover= '',
        slug_url = '',
        module_id = '',
        discountParcentage = '',
        currency = '1',
        product_price = '',
        discount_price = '',
        tag = '',
        activity_message = '',
        activity_user_name = '',
        activity_user_slug = '',
        activity_by = '',
        activity_comment = '',
        activity_user_image = '',
        addedBy=2,
        play_audio='',
        polly_response_msg='',
        url='',
    } = info;
    // console.log('info : ', info);
    const reportParams = {
        activity_institute_id: '', module_id, type
    };

    const getType = () => {
        const CAT = GetCatValue(category) || '';
        if (type === 'gallery') return 'Artwork : ';
        if (type === 'product') return 'Product : ';
        if (type === 'article') return 'Article : ';
        if (type === 'service') return 'Service : ';
        if (type === 'contest') return 'Contest : ';
        if (type === 'series') return 'series : ';
        const res = CAT !== '' ? Capitalize(CAT) + ' : ' : '';
        return res;
    };

    const renderPricing = () => {
        if (type === 'product')
            return (
                <View style={styles.priceBox}>
                    <Text style={styles.productPrice}>{getCurrency(currency)}{discount_price}</Text>
                    {product_price && discountParcentage ? <Text style={styles.originalPrice}>{getCurrency(currency)}{product_price} </Text> : null}
                    {discountParcentage ? <View style={styles.offView}><Text style={styles.textOff}>{`${discountParcentage}% off`}</Text></View> : null}
                </View>
            );

        if (type === 'service')
            return (
                <View style={styles.priceBox}>
                    {product_price ? <Text style={styles.productPrice}>{getCurrency(currency)}{product_price}</Text> : null}
                </View>
            );
        return null;
    };

    const renderCategory = (isCategory) => {
        const tag = isCategory ? GetCatValue(category) : GetSubCatValue(category, sub_category);
        if (tag !== '')
            return (
                <View style={styles.tags}>
                    <Text style={{ color: '#fff', fontSize: moderateScale(10) }}>{Capitalize(tag)}</Text>
                </View>
            );
        return null;
    };

    const getVideo = () => <YouTubePlayer playerContainerStyles={styles.videoContainer} videoId={image_path} />;

    const getImage = () => {
        if (type === 'Quote') {
            info.media_path = info.image_path;
            return (
                <WritingsView Writing={info} externalCall={externalCall}>
                    {getFooter()}
                </WritingsView>
            );
        }

        if (type === 'jobs') {
            return <ScaledImage source={{ uri: isAValidImagePath(image_path) ? NEW_IMG_BASE + image_path : DUMMY_IMAGE_URL }} />;
        }

        if (type === 'service' && (image_path === '' || image_path === null || image_path === undefined || image_path === '/'))
            return <ScaledImage source={{ uri: DUMMY_IMAGE_URL }} />;
        console.log('=>type : ', type);
        if (type === 'series') {
            return <ScaledImage source={{ uri: DUMMY_IMAGE_URL /* isAValidImagePath(image_path) ? NEW_IMG_BASE + image_path : DUMMY_IMAGE_URL */ }} />;
        }
        if (image_path !== '') {
            return (
                <>
                    <ScaledImage source={{ uri: NEW_IMG_BASE + image_path }} />
                    {type === 'Quote' ? getFooter() : null}
                </>
            );
        }
        return null;
    };

    const checkShouldBeDisabled = () => {
         return false;
    };

    const voteOnPost = () => {
        makeVote(module_id, UserInstituteData?.institute_id, type)
        .then((res) => {
            const {data: {status, response_msg}} = res
            status && SimpleToast.show(response_msg);
        }).catch((error)=>{
            console.log("Voting error response : ", JSON.stringify(error));
        }).finally(()=>refresh())
    }

    const checkNavigation = () => {
        externalCall?.();
        const slgs = slug_url.split('/');
        if (type === 'article')
            navigation.navigate('ArticleDetails', { mediaId: module_id, articleSlug: slgs[0] });
        if (type === 'gallery')
            navigation.navigate('ArtworkDetails', { mediaId: module_id, artworkSlug: slgs[0] });
        if (type === 'product')
            navigation.navigate('ProductDetails', { productSlug: slgs[0] });
        if (type === 'service')
            navigation.navigate('ServiceDetails', { course_id: module_id });
        if (type === 'contest')
            navigation.navigate('ContestDetails', { contestID: module_id });
        if (type === 'jobs')
            navigation.navigate('JobDetails', { jobSlug: slug_url });
    };

    const navigateArtist = () => navigation.navigate('PublicProfile', { slug: activity_user_slug });
    const hasDescription = addedBy === 1 ? feed_description  : (feed_less_description || feed_more_description) ;
    const getCurrentTrack=async( )=>{ 
        const currentTrack=  await TrackPlayer.getCurrentTrack()
        return currentTrack;
    }
    return (
        <View style={styles.cardBox}>
            <View style={styles.msgBoxWrapper}>
                <View style={styles.artistMsgBox}>
                    <TouchableOpacity disabled={!activity_by} onPress={navigateArtist}>
                        <Text style={styles.artistName}>{Capitalize(activity_user_name)}</Text>
                    </TouchableOpacity>
                    <Text style={styles.posted}>{activity_message}</Text>
                </View>
                {noTags ? null : <Tags tag={tag} />}
            </View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: '96%', paddingRight: moderateScale(5) }}>
                    <ArtistBox artistData={info} externalCall={externalCall} showFollow />
                </View>
                <MoreOptions reportParams={reportParams} VoteforPost={voteOnPost} isVoted={isVoted} postType={type} />
            </View> */}
            
            <TouchableWithoutFeedback onPress={() => checkNavigation()}>
                <View>
                    <ScaledImage source={{ uri: cover }}/>
                </View>
            </TouchableWithoutFeedback>
            {url != null && (url.includes('.mp3') || url.includes('.mp4')) && 
                <MusicPlayer name={Capitalize(activity_user_name)} track={url} />
            }
            <View style={styles.infoContainer}>
                <TouchableWithoutFeedback onPress={() => checkNavigation()}>
                    <Text style={styles.artWork}>
                        {getType()} <Text style={styles.artworkType}>{Capitalize(name)}</Text>
                    </Text>
                </TouchableWithoutFeedback>
                {(hasDescription && hasDescription !== 'null') ? <Text style={styles.desc}>{hasDescription}</Text> : null}
                {renderPricing()}
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: moderateScale(5) }}>
                    {renderCategory(true)}
                    {renderCategory(false)}
                </View>
                <View style={{ marginTop: moderateScale(10) }}>
                    <CardActions info={info} />
                </View>
                {
                    activity_comment !== '' ?
                        <TouchableOpacity disabled={!activity_by} onPress={navigateArtist} style={{ flexDirection: 'row', marginTop: moderateScale(5) }}>
                            <View>
                                <Image
                                    source={{ uri: activity_user_image ? NEW_IMG_BASE + activity_user_image : NEW_IMG_BASE + DEFAULT_PROFILE }}
                                    style={{ width: moderateScale(30), height: moderateScale(30), borderRadius: moderateScale(15) }}
                                />
                            </View>
                            <View style={styles.commentArea}>
                                <View >
                                    <Text style={styles.artistName}>{Capitalize(activity_user_name)}</Text>
                                </View>
                                <Text style={styles.activityComment}>{activity_comment}</Text>
                            </View>
                        </TouchableOpacity> : null
                }
            </View>
        </View>
    );
};

Card.propTypes = {
    externalCall: PropTypes.func,
    info: PropTypes.object.isRequired,
    noTags: PropTypes.bool,
};

export default Card;