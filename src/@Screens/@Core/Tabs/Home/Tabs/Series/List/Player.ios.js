import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList, Animated } from "react-native";
import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from "react-native-safe-area-context";
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player";
import Slider from "@react-native-community/slider";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

const setupPlayer = async (songs) => {
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
    await TrackPlayer.add(
      songs.map(song => ({
        id: song.article_id.toString(), // Ensure ID is a string
        url: song.url,
        title: song.title,
        artist: song.artist_name,
        artwork: song.cover,
      }))
    );
  } catch (error) {
    console.log('setUp error : ',error);
  }
};

const togglePlayBack = async (playBackState) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  console.log(currentTrack, playBackState, State.Playing);

  console.log('currentTrack : ', await TrackPlayer.getState(), playBackState, State.Paused);
  if (currentTrack != null) {
    if (playBackState == State.Paused || playBackState == State.Ready) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const MusicPlayer = (props) => {
  const { route, navigation } = props;
  const { songs=[], initialSongIndex = 0  } = route?.params;
//   console.log('songs : ', songs);
console.log('songs:', songs);
console.log('initialSongIndex:', initialSongIndex);

  const playBackState = usePlaybackState();
  const progress = useProgress();
  //   custom states

  const [songIndex, setsongIndex] = useState(initialSongIndex);
  const [repeatMode, setRepeatMode] = useState("off");
  const [soundOff, setSoundOff] = useState(true);
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  // custom referecnces
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  //   changing the track on complete
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title, author, cover } = track;
      //console.log('track : ', track);
      setTrackTitle(title);
      setTrackArtist(author);
      setTrackArtwork(cover);
    }
  });

  const repeatIcon = () => {
    if (repeatMode == "off") {
      return "repeat-off";
    }

    if (repeatMode == "track") {
      return "repeat-once";
    }

    if (repeatMode == "repeat") {
      return "repeat";
    }
  };

  const repeatSoundIcon = () => {
    if (soundOff) {
      return "speaker";
    }
    if (!soundOff) {
      return "speaker-off";
    }
  };

  const changeSound = () => {
    if (soundOff) {
      TrackPlayer.setVolume(0)
      setSoundOff(false);
    }

    if (!soundOff) {
      TrackPlayer.setVolume(1)
      setSoundOff(true);
    }

  };

  const changeRepeatMode = () => {
    if (repeatMode == "off") {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode("track");
    }

    if (repeatMode == "track") {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode("repeat");
    }

    if (repeatMode == "repeat") {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode("off");
    }
  };

  const skipTo = async (trackId) => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        await setupPlayer(songs);
        await skipTo(initialSongIndex);
        await TrackPlayer.play(); // Auto-play the initial track
  
        // Scroll the slider to the initial song
        songSlider.current.scrollToOffset({
          offset: initialSongIndex * width,
        });
  
        // Scroll listener to handle track change and auto-play
        scrollX.addListener(async ({ value }) => {
          const index = Math.round(value / width);
  
          if (index !== songIndex) {
            setsongIndex(index);
            await skipTo(index); // Skip to the new song
            await TrackPlayer.play(); // Auto-play the new track
          }
        });
      } catch (error) {
        console.log('Error initializing player:', error);
      }
    };
  
    initializePlayer();
  
    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.destroy();
    };
  }, []);
  
  

  const skipToNext = async () => {
    try {
      // Scroll to the next song in the list
      songSlider.current.scrollToOffset({
        offset: (songIndex + 1) * width,
      });
      
      // Auto-play the next track
      await TrackPlayer.play();
    } catch (error) {
      console.log('Error skipping to next track: ', error);
    }
  };

  const skipToPrevious = async () => {
    try {
      // Scroll to the previous song in the list
      songSlider.current.scrollToOffset({
        offset: (songIndex - 1) * width,
      });
  
      // Auto-play the previous track
      await TrackPlayer.play();
    } catch (error) {
      console.log('Error skipping to previous track: ', error);
    }
  };

  const renderSongs = ({ item, index }) => {
    // console.log('item.cover : ', item.cover);
    return (
      <Animated.View style={style.mainWrapper}>
        <View style={[style.imageWrapper, style.elevation]}>
          <Image
              source={{ uri : item.cover}}
            // source={trackArtwork}
            style={style.musicImage}
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView edges={['left', 'right']} style={style.container}>
      {/* music player section */}
      <View style={style.mainContainer}>
        {/* Image */}
        <TouchableOpacity onPress={()=>{
            navigation.goBack()
            TrackPlayer.reset()
            TrackPlayer.removeUpcomingTracks()
        }} style={{ alignSelf: 'flex-start', margin: 15,marginTop: 20 }}>
            <Image resizeMode={'cover'} source={require('@Assets/images/back_arrow.png')} style={{width:moderateScale(30),height:moderateScale(20),tintColor: '#FFF'}}></Image>
        </TouchableOpacity>
        <Animated.FlatList
          ref={songSlider}
          renderItem={renderSongs}
          data={songs}
          keyExtractor={(item) => item.article_id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        />

        {/* Title & Artist Name */}
        <View>
          <Text style={[style.songContent, style.songTitle]}>
            {/* {songs[songIndex].title} */ trackTitle}
          </Text>
          <Text style={[style.songContent, style.songArtist]}>
            {/* {songs[songIndex].artist} */ trackArtist}
          </Text>
        </View>

        {/* songslider */}
        <View>
          <Slider
            style={style.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={async (value) => {
              await TrackPlayer.seekTo(value);
            }}
          />

          {/* Progress Durations */}
          <View style={style.progressLevelDuraiton}>
            <Text style={style.progressLabelText}>
              {new Date(progress.position * 1000)
                .toLocaleTimeString()
                .substring(3)}
            </Text>
            <Text style={style.progressLabelText}>
              {new Date((progress.duration - progress.position) * 1000)
                .toLocaleTimeString()
                .substring(3)}
            </Text>
          </View>
        </View>

        {/* music control */}
        <View style={style.musicControlsContainer}>
          <TouchableOpacity onPress={changeRepeatMode}>
            <MaterialCommunityIcons
              name={`${repeatIcon()}`}
              size={30}
              color={repeatMode !== "off" ? "#FFD369" : "#888888"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons name="play-skip-back-outline" size={35} color="#FFD369" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
            <Ionicons
              name={
                playBackState === State.Playing
                  ? "pause-circle"
                  : "play-circle"
              }
              size={75}
              color="#FFD369"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#FFD369"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={changeSound}>
            <MaterialCommunityIcons
              name={`${repeatSoundIcon()}`}
              size={30}
              color={!soundOff ? "#FFD369" : "#888888"}
            />
          </TouchableOpacity>
        </View>
      </View>

      
    </SafeAreaView>
  );
};

export default MusicPlayer;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: {
    borderTopColor: "#393E46",
    borderWidth: 1,
    width: width,
    alignItems: "center",
    paddingVertical: 15,
  },

  bottomIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

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
  musicImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
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
  songContent: {
    textAlign: "center",
    color: "#EEEEEE",
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  songArtist: {
    fontSize: 16,
    fontWeight: "300",
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

  musicControlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginTop: 15,
    marginBottom: 15,
    width: "90%",
  },
});
