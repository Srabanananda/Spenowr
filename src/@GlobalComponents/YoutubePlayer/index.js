/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import PropTypes from 'prop-types';

const YouTubePlayer = ({...props}) =>{

    const {videoId = '',playerHeight=300,onStateChangeCallback,playerContainerStyles={}} = props;
    
    const [playing, setPlaying] = useState(false);
    const onStateChange = (state) => {
        onStateChangeCallback?.(state);
        if (state === 'ended') setPlaying(false);
    };
    return (
        <View style={playerContainerStyles}>
            <YoutubePlayer
                height={playerHeight}
                onChangeState={onStateChange}
                play={playing}
                videoId={videoId}
            />
        </View>
    );
};

YouTubePlayer.propTypes = {
    onStateChangeCallback:PropTypes.func,
    playerContainerStyles:PropTypes.object,
    playerHeight:PropTypes.number,
    videoId : PropTypes.string.isRequired,
};

export default YouTubePlayer;