import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ImageBackground } from "react-native";
import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from "react-native-safe-area-context";
import TrackPlayer, {
  Capability,
  Event,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player";
import Slider from "@react-native-community/slider";
import Ionicons from "react-native-vector-icons/Ionicons";
import Config from '@Config/default';
const {NEW_IMG_BASE} = Config;

const { width, height } = Dimensions.get("window");

const setupPlayer = async (songUrl) => {
  try {
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 1,
    });
    await TrackPlayer.add({
      id: '1',
      url: songUrl,
    });
  } catch (error) {
    console.log('setUp error : ',error);
  }
};

const MusicPlayer = (props) => {
  const { route, navigation } = props;
  const { songsss, imageUrl, titleMusic, artistMusic } = route?.params;
  const progress = useProgress();
  const events = [ Event.PlaybackQueueEnded ];
  const [isPlay, setIsPlay] = useState(false);
  console.log('imageUrl',imageUrl);

 

// useEffect(() => {
//   setupPlayer(songsss).then(() => {
//     // Set the repeat mode to loop the current track
//     // TrackPlayer.setRepeatMode(TrackPlayer.REPEAT_MODE_ONE);
//   }).catch(error => {
//     console.log('Error setting up player: ', error);
//   });

//   return async () => {
//     await TrackPlayer.reset();
//     TrackPlayer.destroy();
//   };
// }, []);

useEffect(() => {
  setupPlayer(songsss).then(async () => {
    await TrackPlayer.play(); // Automatically play the song
    setIsPlay(true); // Set play state to true
  }).catch(error => {
    console.log('Error setting up player: ', error);
  });

  return async () => {
    await TrackPlayer.reset();
    TrackPlayer.destroy();
  };
}, []);

// useTrackPlayerEvents(events, (event) => {
//     if (event.type === Event.PlaybackQueueEnded) {
//         PauseMusic()
//     }
// });

useTrackPlayerEvents(events, async (event) => {
  if (event.type === Event.PlaybackQueueEnded) {
    setIsPlay(false);  // Update play state
    await TrackPlayer.reset();  // Reset the player to its initial state
  }
});

  const TogglePlay = () => {
    if(!isPlay) PlayMusic(songsss)
    else PauseMusic()
}

const PlayMusic = async (audio) => {
    setIsPlay(true)
    // await TrackPlayer.reset();
    await TrackPlayer.add({
        url: audio,
    });
    await TrackPlayer.play();
}

const PauseMusic = async () => {
    setIsPlay(false)
    await TrackPlayer.pause();
    // await TrackPlayer.reset();
}
  const durationInSeconds = !isNaN(progress.duration) ? parseFloat(progress.duration) : 0;

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
     
      <View style={styles.mainContainer}>
    
        <TouchableOpacity onPress={() => {
          navigation.goBack();
          TrackPlayer.reset();
        }} style={{ alignSelf: 'flex-start', margin: 15, marginTop: 20 }}>
          <Image resizeMode={'cover'} source={require('@Assets/images/back_arrow.png')} style={{ width: moderateScale(30), height: moderateScale(20), tintColor: '#FFF' }} />
        </TouchableOpacity>

        {/* Render individual song */}
        <View style={styles.mainWrapper}>
          <View style={[styles.imageWrapper, styles.elevation]}>
          <Image source={imageUrl ? { uri: NEW_IMG_BASE + imageUrl } : require("../../../../../../src/assets/images/SpenowrLogoIcon.png")} style={styles.backgroundImage} />
          {/* <View style={styles.overlay} /> */}
          </View>
        </View>

        <Text style={styles.title}>{titleMusic}</Text>
        <Text style={styles.description}>{artistMusic}</Text>

        <Slider
          style={styles.progressBar}
          value={progress.position}
          minimumValue={0}
          maximumValue={durationInSeconds}
          thumbTintColor="#FFD369"
          minimumTrackTintColor="#FFD369"
          maximumTrackTintColor="#fff"
          onSlidingComplete={async (value) => {
            await TrackPlayer.seekTo(value);
          }}
        />

        <View style={styles.progressLevelDuraiton}>
          <Text style={styles.progressLabelText}>
            {new Date(progress.position * 1000)
              .toLocaleTimeString()
              .substring(3)}
          </Text>
          <Text style={styles.progressLabelText}>
            {new Date((durationInSeconds - progress.position) * 1000)
              .toLocaleTimeString()
              .substring(3)}
          </Text>
        </View>

        <View style={{ alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => TogglePlay()}>
            <Ionicons
              name={
                isPlay
                  ? "pause-circle"
                  : "play-circle"
              }
              size={75}
              color="#FFD369"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: 350,
    resizeMode:'stretch',
    borderRadius:5
  },
  // overlay: {
  //   ...StyleSheet.absoluteFillObject,
  //   backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent overlay
  // },
  mainWrapper: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
  },
  elevation: {
    elevation: 5,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: "row",
  },
  progressLevelDuraiton: {
    width: 340,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelText: {
    color: "#FFF",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center',
    color: '#fff',

  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
});
