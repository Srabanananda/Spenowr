import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles } from '../../../@GlobalStyles';
import Icon from "react-native-vector-icons/Ionicons";
import TrackPlayer, { useTrackPlayerEvents, Event }  from 'react-native-track-player';

const AudioPlayer = ({ Track }) =>{
    
    const events = [ Event.PlaybackQueueEnded ];
    const [isPlay, setIsPlay] = useState(false);

    useEffect(()=>{
        configure()

        return () => PauseMusic()
    },[]);

    const configure = async () => {
        await TrackPlayer.setupPlayer();
    };

    useTrackPlayerEvents(events, (event) => {
        if (event.type === Event.PlaybackQueueEnded) {
            PauseMusic()
        }
    });

    const TogglePlay = () => {
        if(!isPlay) PlayMusic(Track)
        else PauseMusic()
    }

    const PlayMusic = async (audio) => {
        setIsPlay(true)
        await TrackPlayer.reset();
        await TrackPlayer.add({
            url: audio,
        });
        await TrackPlayer.play();
    }

    const PauseMusic = async () => {
        setIsPlay(false)
        await TrackPlayer.pause();
        await TrackPlayer.reset();
    }


    return(
        <TouchableOpacity onPress={TogglePlay} style={GlobalStyles.seeMoreButton}>
            <Icon name={isPlay ? "pause" :  "play"} size={15} />
        </TouchableOpacity>
    );

}

AudioPlayer.propTypes = {
    Track: PropTypes.any.isRequired,
};

export default AudioPlayer;