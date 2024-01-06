import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
} from "react-native-track-player";
import Icon from "react-native-vector-icons/Ionicons";
import Progress from "../ProgressBar";
import Config from '@Config/default';
const {COLOR:{APP_PINK_COLOR}} = Config;

const events = [
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackTrackChanged,
  Event.PlaybackQueueEnded,
];
const MusicPlayer = ({ ...props }) => {
  const { name, track } = props;
  const [playerState, setPlayerState] = useState(null);
  const [iActive, setActive] = useState("");
  const [updatedQueue, changeQueue] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(track);
  const [isPlay, setIsPlay] = useState(false);
  useEffect(async () => {
    // await TrackPlayer.setupPlayer();
    TrackPlayer.reset();
    await TrackPlayer.removeUpcomingTracks()
    return () => {
      PlayerReset() 
    }
  }, []);

  useEffect(() => {
    changeQueue(!updatedQueue);
  }, [iActive]);
  // const isPlaying = playerState === State.Playing;

  useTrackPlayerEvents(events, (event) => {
    console.log('event : ', JSON.stringify(event));
    if (event.type === Event.PlaybackError) {
      console.warn("An error occured while playing the current track.");
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }

    if (event.type === Event.PlaybackQueueEnded) {
      TrackPlayer.reset();
      setIsPlay(false)
      setActive("");
    }
    if(event.type === Event.PlaybackTrackChanged){
      console.log('event : ', 'Track changed');
    }
    if(event.type === "idle"){
      console.log('event : ', 'go to idle state');
    }
  });
  
  const PlayerReset = async () => {  
      await TrackPlayer.remove()  
      await TrackPlayer.reset();
      await TrackPlayer.pause();
      setIsPlay(false)
  }

  const getStateOfPlayer = async () => {
    const playbackState = await TrackPlayer.getState();
    return playbackState;
  };
  const getTrackdata = async () => {
    const trackData = await TrackPlayer.getCurrentTrack();
    return trackData;
  };

  const UpdateFunction = (iActive) => {
    return iActive == currentTrack;
  };

  const musicChange = useMemo(() => UpdateFunction(iActive), [iActive]);

  const RenderProgressBar = ({ track, iActive }) => {
    return <Progress isCurrentTrack={iActive} currentTrack={track} isPlay={isPlay}/>;
  };

  const onPause = async () => {
    const playbackState = await getStateOfPlayer();
    if (playbackState == "playing" || isPlay) {
      await TrackPlayer.pause();
      setIsPlay(false)
      console.log('get pause');
    } 
  }
  const onPlay = async () => {
    const playbackState = await getStateOfPlayer();
    console.log('playbackState : ', playbackState);
    if ((playbackState == "paused" || playbackState == "idle") /* && !isPlay && currentTrack == iActive */ ) {
      console.log('get play');
      await TrackPlayer.reset();
      await TrackPlayer.add([{url:track}]);
      await TrackPlayer.play();
      setActive(currentTrack)
      setIsPlay(true)
    }else{
      await TrackPlayer.reset();
      await TrackPlayer.add([{url:track}]);
      await TrackPlayer.play();
      console.log('get reset');
      setIsPlay(true)
      // togglePlayback(currentTrack);
    }
  }

  return (
    <View
      style={{height: 50,width: "100%",flex: 1,flexDirection: "row",alignItems: "center",marginTop: 5}}>
      {isPlay ? /* track == iActive ?  */
      ( <Icon name={"pause"} size={25} style={{ margin: 5,color:APP_PINK_COLOR }} onPress={onPause}/>) : 
      ( <Icon name={"play"} size={25} style={{ margin: 5,color:APP_PINK_COLOR }} onPress={onPlay}/>) }
      <RenderProgressBar track={currentTrack} iActive={iActive} />
    </View>
  );
};

export default MusicPlayer;

