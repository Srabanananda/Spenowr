import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale } from 'react-native-size-matters';

const MusicPlayer = ({ route, navigation }) => {
  const { songs = [], initialSongIndex = 0 } = route?.params;
  
  const [currentTrack, setCurrentTrack] = useState(initialSongIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const soundRef = useRef(null);
  const positionIntervalRef = useRef(null);

  useEffect(() => {
    loadTrack(currentTrack);

    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
      if (positionIntervalRef.current) {
        clearInterval(positionIntervalRef.current);
      }
    };
  }, [currentTrack]);

  const loadTrack = (trackIndex) => {
    const { url } = songs[trackIndex];

    if (soundRef.current) {
      soundRef.current.release();
    }

    soundRef.current = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      setDuration(soundRef.current.getDuration());
      setPosition(0);
      playPauseSound();
    });
  };

  const playPauseSound = () => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause();
        clearInterval(positionIntervalRef.current);
      } else {
        soundRef.current.play((success) => {
          if (success) {
            nextTrack();
          } else {
            console.log('Playback failed due to audio decoding errors');
          }
        });

        positionIntervalRef.current = setInterval(() => {
          soundRef.current.getCurrentTime((seconds) => {
            setPosition(seconds);
          });
        }, 500);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    let nextIndex = currentTrack + 1;
    if (nextIndex >= songs.length) {
      nextIndex = 0;
    }
    setCurrentTrack(nextIndex);
  };

  const previousTrack = () => {
    let prevIndex = currentTrack - 1;
    if (prevIndex < 0) {
      prevIndex = songs.length - 1;
    }
    setCurrentTrack(prevIndex);
  };

  const onSliderValueChange = (value) => {
    if (soundRef.current) {
      soundRef.current.setCurrentTime(value);
      setPosition(value);
    }
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>{
            navigation.goBack()
        }} style={{ alignSelf: 'flex-start', marginBottom:20, bottom:20 }}>
            <Image resizeMode={'cover'} source={require('@Assets/images/back_arrow.png')} style={{width:moderateScale(30),height:moderateScale(20),tintColor: '#000'}}></Image>
        </TouchableOpacity>
      <Image source={{ uri: songs[currentTrack].cover }} style={styles.image} />
      <Text style={styles.title}>{songs[currentTrack].title}</Text>
      <Text style={styles.description}>{songs[currentTrack].artist_name}</Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={onSliderValueChange}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#000000"
        thumbTintColor="#1DB954"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={previousTrack}>
          <Icon name="play-back" size={30} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={playPauseSound}>
          <Icon name={isPlaying ? "pause" : "play"} size={30} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={nextTrack}>
          <Icon name="play-forward" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius:10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center'
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default MusicPlayer;
