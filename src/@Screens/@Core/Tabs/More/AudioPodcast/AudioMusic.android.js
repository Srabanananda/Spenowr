import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const { NEW_IMG_BASE } = Config;

const MusicPlayer = ({ route, navigation }) => {
  const { songsss, imageUrl, titleMusic, artistMusic } = route?.params;

  const fullImageUrl = `${NEW_IMG_BASE.endsWith('/') ? NEW_IMG_BASE : NEW_IMG_BASE + '/'}${imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl}`;

  console.log('Full Image URL:', titleMusic, artistMusic);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const soundRef = useRef(null);
  const positionIntervalRef = useRef(null);

  useEffect(() => {
    loadTrack();

    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
      if (positionIntervalRef.current) {
        clearInterval(positionIntervalRef.current);
      }
    };
  }, []);

  const loadTrack = () => {
    if (soundRef.current) {
      soundRef.current.release();
    }

    soundRef.current = new Sound(songsss, Sound.MAIN_BUNDLE, (error) => {
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
            console.log('Playback finished successfully');
          } else {
            console.log('Playback failed due to audio decoding errors');
          }
        });

        positionIntervalRef.current = setInterval(() => {
          soundRef.current.getCurrentTime((seconds) => {
            setPosition(seconds);
          });
        }, 500); // Update slider every 0.5 seconds
      }
      setIsPlaying(!isPlaying);
    }
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
        }} style={{ alignSelf: 'flex-start' }}>
            <Image resizeMode={'cover'} source={require('@Assets/images/back_arrow.png')} style={{width:moderateScale(30),height:moderateScale(20),tintColor: '#000'}}></Image>
        </TouchableOpacity>
      <Image 
        source={imageUrl ? { uri: NEW_IMG_BASE + imageUrl } : require("../../../../../../src/assets/images/SpenowrLogoIcon.png")}
        style={styles.image} 
        onError={() => console.log('Failed to load image.')} 
      />
      <Text style={styles.title}>{titleMusic}</Text>
      <Text style={styles.description}>{artistMusic}</Text>
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
        <TouchableOpacity style={{height:70, width:70, borderRadius:35, borderColor:'#000', borderWidth:3, justifyContent:'center', alignItems:'center'}} onPress={playPauseSound}>
          <Icon name={isPlaying ? "pause" : "play"} size={30} color="#000" />
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
    width: '100%', // Increased size for testing
    height: 250,
    resizeMode: 'stretch',
    marginBottom: 20,
    borderRadius:10,
    marginTop:30
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
    justifyContent: 'center',
    width: '80%',
  },
  title: {
    fontSize: 20,
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
});

export default MusicPlayer;
