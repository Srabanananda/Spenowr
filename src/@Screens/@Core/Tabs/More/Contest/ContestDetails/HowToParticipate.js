/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import DefaultButton from '../../../../../../@GlobalComponents/DefaultButton';
import Modal from 'react-native-modal';
import YouTubePlayer from '../../../../../../@GlobalComponents/YoutubePlayer';

const HowToParticipate = ({vID}) =>{

    const [isActive, setIsActive] = useState(false);

    const renderParticipationView = () => {
        return(
            <View style={{width:'90%'}}>
                <YouTubePlayer playerContainerStyles={styles.videoContainer} videoId={vID} />
            </View>
        );
    };

    return(
        <View>
            <DefaultButton buttonText={'How To Particiapate'} onPress={()=>setIsActive(true)} showLoader={false} />
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={isActive}
                onBackButtonPress= {()=>{
                    setIsActive(false); 
                }}
                onBackdropPress = {()=>{
                    setIsActive(false); 
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderParticipationView()}
            </Modal>
        </View>
    );
};

export default HowToParticipate;
const styles = StyleSheet.create({
});