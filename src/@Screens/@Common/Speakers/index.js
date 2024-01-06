/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {View,Text,Image,TouchableOpacity,StyleSheet,Modal} from 'react-native';
import PropTypes from 'prop-types';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import TrackPlayer from 'react-native-track-player';
import Icon from "react-native-vector-icons/Ionicons";
const {COLOR:{ APP_PINK_COLOR }} = Config;

var SPEAKER_VOICES = [
    { name: 'ADITI' , value : 'Aditi', audio: require('./audio/aditi.mp3')},
    { name: 'RAVEENA' , value : 'Raveena', audio: require('./audio/ravina.mp3')},
    { name: 'MATTHEW' , value : 'Matthew', audio: require('./audio/Matthew.mp3')},
    { name: 'JOANNA' , value : 'Joanna', audio: require('./audio/Joanna.mp3')},
]

const Speakers = ({ selectedSpeaker, visible, setVisiblity, speaker }) =>{
    const [aditiRadio, setAditiRadio] = useState(false);
    const [raveenaRadio, setRaveenaRadio] = useState(false);
    const [matthewRadio, setMatthewRadio] = useState(false);
    const [joannaRadio, setJoannaRadio] = useState(false);

    const [aditiPlay, setAditiPlay] = useState(false);
    const [raveenaPlay, setRaveenaPlay] = useState(false);
    const [matthewPlay, setMatthewPlay] = useState(false);
    const [joannaPlay, setJoannaPlay] = useState(false);
    
    const unchecked = require('../../../assets/svgs/unCheckedRadio.svg')
    const checked = require('../../../assets/svgs/radio.svg')

    useEffect(()=>{
        configure()
        if(speaker != '') onCheck(SPEAKER_VOICES.find(x => x.value === speaker))

        return () => PauseMusic()
    },[speaker]);


    const configure = async () => {
        await TrackPlayer.setupPlayer();
    };

    
    const onCheck = (item) => {
        resetAll()
        let select = item
        if(select && select?.value) selectedSpeaker(select?.value)
        if(item?.name == SPEAKER_VOICES[0]?.name){
            setAditiRadio(true)
        }else if(item?.name == SPEAKER_VOICES[1]?.name){
            setRaveenaRadio(true)
        }else if(item?.name == SPEAKER_VOICES[2]?.name){
            setMatthewRadio(true)
        }else if(item?.name == SPEAKER_VOICES[3]?.name){
            setJoannaRadio(true)
        }
    }
    const ischecked = (item) => {
        if(item?.name == SPEAKER_VOICES[0]?.name){             
            return aditiRadio;
        }else if(item?.name == SPEAKER_VOICES[1]?.name){
            return raveenaRadio;
        }else if(item?.name == SPEAKER_VOICES[2]?.name){
            return matthewRadio;
        }else if(item?.name == SPEAKER_VOICES[3]?.name){
            return joannaRadio;
        }
    }

    const resetAll = () => {
        setAditiRadio(false)
        setRaveenaRadio(false)
        setMatthewRadio(false)
        setJoannaRadio(false)
    }
    
    const PlayMusic = async (audio) => {
        await TrackPlayer.reset();
        await TrackPlayer.add({
            url: audio,
        });
        await TrackPlayer.play();
    }

    const PauseMusic = async () => {
        await TrackPlayer.pause();
        await TrackPlayer.reset();
    }

    // --- methods for play & pause the demo audio
    const onPlay = (item) => {
        playReset()
        
        if(item?.name == SPEAKER_VOICES[0]?.name){
            !aditiPlay && PlayMusic(item?.audio)
            aditiPlay && PauseMusic()
            setAditiPlay(!aditiPlay)
        }else if(item?.name == SPEAKER_VOICES[1]?.name){
            !raveenaPlay && PlayMusic(item?.audio)
            raveenaPlay && PauseMusic()
            setRaveenaPlay(!raveenaPlay)
        }else if(item?.name == SPEAKER_VOICES[2]?.name){
            !matthewPlay && PlayMusic(item?.audio)
            matthewPlay && PauseMusic()
            setMatthewPlay(!matthewPlay)
        }else if(item?.name == SPEAKER_VOICES[3]?.name){
            !joannaPlay && PlayMusic(item?.audio)
            joannaPlay && PauseMusic()
            setJoannaPlay(!joannaPlay)
        }
    }
    const isPlaying = (item) => {
        if(item?.name == SPEAKER_VOICES[0]?.name){                
            return aditiPlay;
        }else if(item?.name == SPEAKER_VOICES[1]?.name){
            return raveenaPlay;
        }else if(item?.name == SPEAKER_VOICES[2]?.name){
            return matthewPlay;
        }else if(item?.name == SPEAKER_VOICES[3]?.name){
            return joannaPlay;
        }
    }

    const playReset = () => {
        setAditiPlay(false)
        setRaveenaPlay(false)
        setMatthewPlay(false)
        setJoannaPlay(false)
    }

    const renderSpeakers = (item, index) => {
        
        return(
            <View style={{flexDirection: 'row',alignItems: 'flex-start',width: '80%',paddingVertical: moderateScale(5) }}>
                <TouchableOpacity onPress={()=>onCheck(item)}>
                    <Image source={ischecked(item) ? checked : unchecked} style={{tintColor: APP_PINK_COLOR, marginRight: moderateScale(5)}} />
                </TouchableOpacity>
                <Text>{item?.name}</Text>
                <Icon name={isPlaying(item) ? "pause" : "play"} size={25} style={{ marginHorizontal: moderateScale(5), right: 0, position: 'absolute' }} onPress={() => onPlay(item)}/>
            </View>
        );
    }

    return(
        <Modal
            backdropColor={'#000'}
            dismissable={true}
            hasBackdrop={true}
            animationType="fade"
            transparent={true}
            isVisible={visible}
            style={styles.modalContainer}
            useNativeDriver={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {SPEAKER_VOICES.map((item, index) => renderSpeakers(item, index))}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity onPress={()=>setVisiblity(false)} style={styles.seeMoreButton} >
                            <Text  style={styles.seeMoreButtonText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setVisiblity(false)} style={styles.seeMoreButton} >
                            <Text  style={styles.seeMoreButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

Speakers.propTypes = {
    SelectedSpeaker:PropTypes.func.isRequired,
    author:PropTypes.string.isRequired,
};

export default Speakers;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080'
    },modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '70%',
        // height: moderateScale(200),
      },
      close:{
        position: 'absolute',
        right: 20,
        top: 10,
      },
      closeText: {
        fontSize: 20
      },
      seeMoreButton: {
        borderColor:APP_PINK_COLOR,
        paddingHorizontal:moderateScale(15),
        padding:moderateScale(5),
        borderRadius:moderateScale(4),
        borderWidth:1,
        marginHorizontal: moderateScale(5),
        marginTop: 20
      },
      seeMoreButtonText:{
        fontSize:moderateScale(12),
        color:APP_PINK_COLOR
      },
      modalContainer:{
        justifyContent:'center',
        alignItems:'center'
      }
});