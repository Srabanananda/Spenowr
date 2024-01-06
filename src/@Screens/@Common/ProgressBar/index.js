import React,{ useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import {Text, View } from 'react-native';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import styles from './styles';
import Config from '@Config/default';
const {COLOR:{APP_PINK_COLOR}} = Config;
 const Progress = ({ isCurrentTrack, currentTrack, isPlay }) => {
  const { position, duration } = useProgress();
  const [time, setTime] = useState('00:00')
  useEffect(()=>{
    isCurrentTrack == currentTrack && setTime(formatSeconds(position))
  },[position])
  // isCurrentTrack == currentTrack && console.log(`\n\nisCurrentTrack : ${isCurrentTrack}\ncurrentTrack : ${currentTrack}`);
  return  (
    <>
      <Slider
        style={styles.container}
        value={isCurrentTrack == currentTrack && isPlay ?  position : 0}
        minimumValue={0}
        maximumValue={isCurrentTrack == currentTrack && isPlay ? duration :0}
        thumbTintColor={"black"}
        minimumTrackTintColor={APP_PINK_COLOR}
        maximumTrackTintColor={APP_PINK_COLOR}
        onSlidingComplete={TrackPlayer.seekTo}
      />
      <View style={styles.labelContainer}>
        <Text style={[styles.labelText,{color:APP_PINK_COLOR}]}>{isCurrentTrack == currentTrack && isPlay ? formatSeconds(position) : isCurrentTrack != currentTrack && !isPlay? time :  '00:00'}</Text>
        {/* <Text style={styles.labelText}>
          {formatSeconds(Math.max(0, duration - position))}
        </Text> */}
      </View>
    </>
  );
};

const formatSeconds = (time: number) =>
  new Date(time * 1000).toISOString().slice(14, 19);


  export default Progress