/**
 * Create By @name Sukumar_Abhijeet 
 */

import React,{useEffect, useRef, useState} from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Image, Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import styles from './styles';
import Capitalize from '../../../../../../@Utils/helperFiles/Capitalize';
import Config from '@Config/default';
import CardActions from './CardActions';
import { useNavigation } from '@react-navigation/native';
import { GetCatValue, GetSubCatValue } from '../../../../../../@Utils/helperFiles/GetCatSubcat';
import ScaledImage from '../../../../../../@GlobalComponents/ScalableImage';
import ArtistBox from '../../../../../../@GlobalComponents/ArtistBox';
import WritingsView from '../../../../../../@GlobalComponents/WritingsView';
import { getCurrency } from '../../../../../../@Utils/helperFiles/CardDetails';
import YouTubePlayer from '../../../../../../@GlobalComponents/YoutubePlayer';
import Tags from './Tags/index';
import MoreOptions from './Actions/index';
import { isAValidImagePath } from '../../../../../../@Utils/helperFiles/helpers';
import DefaultButton from '../../../../../../@GlobalComponents/DefaultButton';
import { makeVote } from "../../../../../../@Endpoints/Core/Tabs/Home";
import useUserData from "../../../../../../@Hooks/useUser";
import MusicPlayer from '../../../../../@Common/MusicPlayer';
import SimpleToast from 'react-native-simple-toast';
import { getAudioPlayCountSeries } from '../../../../../../@Endpoints/Core/Tabs/MyAccount';
import { useCallback } from 'react';
import TrackPlayer from 'react-native-track-player';
import { useFocusEffect } from '@react-navigation/native';
import Video from 'react-native-video';

const { height } = Dimensions.get('window');
const dynamicHeight = height * 0.3; // Set video height to 30% of screen height, for example

const { NEW_IMG_BASE, DUMMY_IMAGE_URL, DEFAULT_PROFILE } = Config;

export const getFooter = () => {
    return (
        <View style={styles.blurView}>
            <Text style={styles.reviewText}>www.spenowr.com</Text>
        </View>
    );
};

const Card = ({ ...props }) => {

    const { info, externalCall, noTags = false, refresh,songs, isVoted } = props;
    const navigation = useNavigation();
    const { UserInstituteData } = useUserData();
    const [isPlaying, setIsPlaying] = useState(false); 
    const videoPlayerRef = useRef(null);
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
        tags='',
        audio_mode='',
        article_title='',
        article_poly_description='',
    } = info;
    const reportParams = {
        activity_institute_id: '', module_id, type
    };

    console.log('====================================');
    console.log('info of whatsnewcard',info);
    console.log('====================================');

    const getType = () => {
        const CAT = GetCatValue(category) || '';
        if (type === 'gallery') return 'Artwork : ';
        if (type === 'animate') return 'Artwork (3D Animation) : ';
        if (type === 'product') return 'Product : ';
        if (type === 'article') return 'Article : ';
        if (type === 'service') return 'Service : ';
        if (type === 'contest') return 'Contest : ';
        if (type === '') return 'Series : ';
        const res = CAT !== '' ? Capitalize(CAT) + ' : ' : '';
        return res;
    };

    const handleToggleVideo = () => {
        if (videoPlayerRef.current) {
            if (isPlaying) {
                videoPlayerRef.current.pauseVideo(); // Pause video
            } else {
                videoPlayerRef.current.playVideo(); // Play video
            }
            setIsPlaying(!isPlaying); // Toggle playing state
        }
    };

    const callApi = async () => {
        try {
            // Call the API to update the play count
            const res = await getAudioPlayCountSeries(info.article_id, 1);
    
            // Assuming `res` contains the updated song list and `info` contains the current song's information
            const selectedSong = songs.find(song => song.url === info.url);
    
            if (selectedSong) {
                // Pass the selected song data to the SeriesPlayer screen
                navigation.navigate('SeriesPlayer', {
                    songs: songs, // Array of all songs
                    initialSongIndex: songs.findIndex(song => song.article_id === selectedSong.article_id),
                });
            } else {
                console.error('Selected song not found in songs array');
            }
        } catch (error) {
            SimpleToast.show('Oops Something went wrong');
            console.error('Error in callApi:', error);
        }
    };

    // const callApi = async (song) => {
    //     try {
    //         // Call the API to update the play count
    //         const res = await getAudioPlayCountSeries(info.article_id, 1);
    
    //         // Extract the songs from the API response
    
    //         // Find the selected song based on info.article_id
    //         const selectedSong = songs.find(song => song.article_id == info.article_id);
    //         console.log('info.article_id', info.article_id);
            
    //         if (selectedSong) {
    //             // Add the selected song to the TrackPlayer
    //             await TrackPlayer.reset(); // Reset the player to clear any previous tracks
    //             await TrackPlayer.add({
    //                 id: selectedSong.article_id.toString(), // Ensure ID is a string
    //                 url: selectedSong.url,
    //                 title: selectedSong.title,
    //                 artist: selectedSong.artist_name,
    //                 artwork: selectedSong.cover,
    //             });
    
    //             // Pass the selected song data to the SeriesPlayer screen
    //             navigation.navigate('SeriesPlayer', {
    //                 songs: songs, // Array of all songs
    //                 initialSongIndex: songs.findIndex(song => song.article_id == selectedSong.article_id),
    //             });
    //         } else {
    //             console.error('Selected song not found in songs array');
    //         }
    
    //         console.log('selectedSong', selectedSong);
    //         console.log('songs', songs);
    //         console.log('res of series count', res);
    //     } catch (error) {
    //         SimpleToast.show('Oops Something went wrong');
    //         console.log('Error in callApi:', error);
    //     } finally {
    //         console.log('finally');
    //         // Additional cleanup or final actions can be performed here if needed
    //     }
    // };

    useFocusEffect(
        useCallback(() => {
            return () => {
                TrackPlayer.pause(); // Pause the player when screen loses focus
                TrackPlayer.reset(); // Reset the player when screen loses focus
            };
        }, [])
    );

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

    const getVideo = () => <YouTubePlayer playerContainerStyles={styles.videoContainer} ref={videoPlayerRef} videoId={image_path} />;

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
        if (type === '') {
            return (
                <TouchableOpacity onPress={() => checkNavigation()}>
                    <ScaledImage source={{ uri: cover }} />
                </TouchableOpacity>
            )
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
        if (type === 'article' || type === 'gallery' || type === 'product' || type === 'service' || type === 'contest' || type === 'jobs') return false;
        return true;
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
        if (type === '')
            navigation.navigate('ArticleDetails', { mediaId: module_id, articleSlug: slgs[0] });
        if (type === 'gallery')
            navigation.navigate('ArtworkDetails', { mediaId: module_id, artworkSlug: slgs[0] });
        if (type === 'animate')
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
                        <Text style={styles.artistName}>{Capitalize(activity_user_name != '' ? activity_user_name : audio_mode != '' ? audio_mode : '')}</Text>
                    </TouchableOpacity>
                    <Text style={styles.posted}>{activity_message}</Text>
                </View>
                {noTags ? null : <Tags tag={tag != "" ? tag : tags != '' ? tags : ''} />}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: '96%', paddingRight: moderateScale(5) }}>
                    <ArtistBox artistData={info} externalCall={externalCall} showFollow />
                </View>
                <MoreOptions reportParams={reportParams} VoteforPost={voteOnPost} isVoted={isVoted} postType={type} />
            </View>
            {/* <TouchableWithoutFeedback disabled={checkShouldBeDisabled()}  onPress={() => checkNavigation()}>
                <View>
                    {image_type === 'video' ? getVideo() : getImage()}
                </View>
            </TouchableWithoutFeedback> */}

           {/* <TouchableWithoutFeedback 
                disabled={(image_type === 'video' && type === 'animate') || checkShouldBeDisabled()} 
                onPress={() => checkNavigation()}
            > */}
                <TouchableWithoutFeedback 
                    disabled={(image_type === 'video' && type === 'animate') || checkShouldBeDisabled()} 
                    onPress={(image_type === 'video' && type !== 'animate') ? undefined : () => checkNavigation()}
                >
                <View>
                    {(image_type === 'video' && type === 'animate') ? (
                        <Video
                            source={{ uri: NEW_IMG_BASE + info.image_path }}  
                            style={{  width: '100%',height: dynamicHeight}}
                            // controls={true}
                            resizeMode="contain"
                            repeat
                        />
                    ) : (
                        image_type === 'video' ? getVideo() : getImage()
                    )}
                </View>
            </TouchableWithoutFeedback>

            {(type === 'article' || type === 'Quote' || type === 'Poem' || type === 'series') && polly_response_msg != null && (polly_response_msg.includes('.mp3') || polly_response_msg.includes('.mp4')) && 
                <MusicPlayer name={Capitalize(activity_user_name)} track={polly_response_msg} />
            }
            {(type === 'article' || type === 'Quote' || type === 'Poem' || type === 'series') && play_audio != null && (play_audio.includes('.mp3') || play_audio.includes('.mp4')) && 
                <MusicPlayer name={Capitalize(activity_user_name)} track={play_audio} />
            }

            {url != null && (url.includes('.mp3') || url.includes('.mp4')) && (
                image_type === 'video' ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{width:'47%'}}>
                        <DefaultButton buttonText={'Play Video'} onPress={handleToggleVideo} />
                        </View>

                        <View style={{width:'47%'}}>
                        <DefaultButton buttonText='Play Audio' onPress={() => callApi(info)} />
                        </View>
                    </View>
                ) : (
                    <DefaultButton buttonText='Play' onPress={() => callApi(info)} />
                )
            )}

            <View style={styles.infoContainer}>
                <TouchableWithoutFeedback onPress={() => checkNavigation()}>
                    <Text style={styles.artWork}>
                        {getType()} <Text style={styles.artworkType}>{Capitalize(name != ''? name : article_title != '' ? article_title : '')}</Text>
                    </Text>
                </TouchableWithoutFeedback>
                {(hasDescription && hasDescription !== 'null') ? <Text style={styles.desc}>{hasDescription}</Text> : null}
                {(article_poly_description && article_poly_description !== '') ? <Text numberOfLines={2} style={styles.desc}>{article_poly_description}</Text> : null}
                {type === 'article' ?
                <Text onPress={() => checkNavigation()} style={{color: '#EF2D56', fontSize:13}}>See More</Text>
                : null 
                }
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