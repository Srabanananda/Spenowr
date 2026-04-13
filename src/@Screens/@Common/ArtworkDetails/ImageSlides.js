/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState} from 'react';
import {ScrollView,View,TouchableOpacity, Modal, StyleSheet, Text, Image} from 'react-native';
import Config from '@Config/default';
import ScaledImage from '../../../@GlobalComponents/ScalableImage';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import YouTubePlayer from '../../../@GlobalComponents/YoutubePlayer';

const {NEW_IMG_BASE} = Config;
const animationStaticImage = require('../../../assets/images/3danimateicon.png')
const youtubeStaticImage = require('../../../assets/images/youtubevideoplayericon.png')

const ImageSlides = ({artworkDetails}) =>{
    const {
        photo_details:{
            reduced_media_path='',reduced_secondary_media1='',reduced_secondary_media2='',reduced_secondary_media3='',reduced_secondary_media4='', animated_video_url='',animation_status='', youtube_id=''
        },
    } = artworkDetails;

    console.log('photo_details',artworkDetails);

    const [imageList, setImageList] = useState([]);

    const [selectedImageUri , setSelectedImageUri] = useState(NEW_IMG_BASE + reduced_media_path); 
    const [showVideo, setShowVideo] = useState(false);
    const [showYouTube, setShowYouTube] = useState(false);

    useEffect(()=>{
        const eachImage = [NEW_IMG_BASE + reduced_media_path];
        if(reduced_secondary_media1) eachImage.push(NEW_IMG_BASE + reduced_secondary_media1);
        if(reduced_secondary_media2) eachImage.push(NEW_IMG_BASE + reduced_secondary_media2);
        if(reduced_secondary_media3) eachImage.push(NEW_IMG_BASE + reduced_secondary_media3);
        if(reduced_secondary_media4) eachImage.push(NEW_IMG_BASE + reduced_secondary_media4);

        // Only add static animation icon if animation_status is 2 and animated_video_url exists
        if (animation_status === '2' && animated_video_url) {
            eachImage.push(animationStaticImage);
        }

        // Add YouTube icon if youtube_id exists
        if (youtube_id == "null" || youtube_id == null || youtube_id == "" || youtube_id == "undefined") {
           console.log('no youtube url found')
        }
        else {
            eachImage.push(youtubeStaticImage);
        }

        setImageList(eachImage);
    },[]);

    const handleImagePress = (img) => {
        if (img === animationStaticImage && animation_status === '2' && animated_video_url) {
            setShowVideo(true); // Show video in main display area
            setShowYouTube(false); // Hide YouTube player if showing video
        } else if (img === youtubeStaticImage && youtube_id) {
            setShowYouTube(true); // Show YouTube player in main display area
            setShowVideo(false); // Hide regular video if showing YouTube player
        } else {
            setSelectedImageUri(img); // Update selected image
            setShowVideo(false); // Hide video if another image is selected
            setShowYouTube(false); // Hide YouTube player if another image is selected
        }
    };

    return (
        <>
            {/* Main Display Area */}
            <View style={{ flexDirection: 'row' }}>
                <View style={{ marginBottom: 8, width: '100%', height: '100%' }}>
                    {showVideo ? (
                        // Render Video when showVideo is true
                        <Video
                            source={{ uri: NEW_IMG_BASE + animated_video_url }}
                            style={styles.videoPlayer}
                            // controls={true}
                            resizeMode="contain"
                            repeat
                        />
                    ) : showYouTube ? (
                        // Render YouTube Player when showYouTube is true
                        <View style={styles.youtubeContainer}>
                            <YouTubePlayer
                                playerContainerStyles={{ height: 190, width: '100%' }}
                                videoId={youtube_id}
                            />
                        </View>
                    ) : (
                        // Render selected image otherwise
                        <ScaledImage source={{ uri: selectedImageUri }} />
                    )}
                </View>
            </View>

            {/* Thumbnail List */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {imageList.map((img, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => handleImagePress(img)}
                        style={{ margin: 10, width: 100 }}
                    >
                        {img === animationStaticImage ? (
                            <Image source={animationStaticImage} style={{ width: 80, height: 100, resizeMode:'contain' }} />
                        ) : img === youtubeStaticImage ? (
                            <Image source={youtubeStaticImage} style={{ width: 80, height: 100, resizeMode:'contain' }} />
                        ) : (
                            <ScaledImage source={{ uri: img }} />
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </>
    );
};

ImageSlides.propTypes = {
    artworkDetails:PropTypes.object.isRequired,
};

export default ImageSlides;

const styles = StyleSheet.create({
    videoPlayer: {
        width: '100%',
        height: 300,
    },
})