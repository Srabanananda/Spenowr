/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';

const YouTubePlayer = forwardRef(({ videoId = '', playerHeight = 300, onStateChangeCallback, playerContainerStyles = {} }, ref) => {
    const [playing, setPlaying] = useState(false);
    const playerRef = useRef(null);

    // Exposing methods to parent component
    // useImperativeHandle(ref, () => ({
    //     playVideo: () => {
    //         setPlaying(true);
    //     },
       
    // }));

    // const onStateChange = (state) => {
    //     onStateChangeCallback?.(state);
    //     if (state === 'ended') setPlaying(false);
    // };

    useImperativeHandle(ref, () => ({
      playVideo: () => setPlaying(true),
      pauseVideo: () => setPlaying(false),
  }));

    useFocusEffect(
        React.useCallback(() => {
          return () => {
            setPlaying(false);
          };
        }, [])
      );

    return (
        <View style={playerContainerStyles}>
           <YoutubePlayer
      ref={playerRef}
      height={playerHeight}
      play={playing}
      videoId={videoId}
      webViewStyle={{opacity: 0.99}}
      onChangeState={event => {
        if (event === 'playing') setPlaying(true);
        if (event === 'paused' || event === 'ended') setPlaying(false);
    }}
    />
        </View>
    );
});

YouTubePlayer.propTypes = {
    onStateChangeCallback: PropTypes.func,
    playerContainerStyles: PropTypes.object,
    playerHeight: PropTypes.number,
    videoId: PropTypes.string.isRequired,
};

export default YouTubePlayer;
