/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {View,Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import styles from './styles';
import PropTypes from 'prop-types';
import { deleteQuote, editQuote } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import WritingsView from '../../../../../../../../@GlobalComponents/WritingsView';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import SubmitToContest from '../../Artworks/MyArtWork/SubmitToContest';
import AudioPlayer from '../../../../../../../@Common/MusicPlayer/AudioPlayer';

const Card = ({cardData,mode,refreshData}) =>{
    const navigation = useNavigation();
    const {
        description,
        title,
        id,
        play_audio,
        polly_response_msg,
    } = cardData;

    cardData.name = title;
    cardData.feed_less_description = description;

    const [editLoader, setEditLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);

    const editAction= () =>{
        setEditLoader(true);
        editQuote(id)
            .then(res=>{
                const {data:{quoteData}} = res;
                navigation.navigate('AddWritings',{EditData : quoteData});
            })
            .catch(()=>{
                Toast.show('Oops Couldnot sync details',Toast.LONG);
            })
            .finally(()=>{
                setEditLoader(false);
            });
    };

    const deleteAction = () =>{
        setDeleteLoader(true);
        deleteQuote(id)
            .then(()=>{
                Toast.show('Writing deleted successfully',Toast.LONG);
                refreshData();
            })
            .catch(()=>{
                Toast.show('Oops Couldnot delete now',Toast.LONG);
            })
            .finally(()=>{
                setDeleteLoader(false);
            });
    };

    const getImage = () =>{
        return <WritingsView Writing={cardData} />;
    };

    return(
        <View style={styles.cardBox}>
            {getImage()}
            {mode === 'PRIVATE' ? <SubmitToContest cardData={cardData} refreshData={refreshData} type={'writings'} /> : null}
            {
                (mode === 'PRIVATE') &&
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:moderateScale(10)}}>
                    <TouchableOpacity onPress={()=>editAction()} style={GlobalStyles.seeMoreButton}>
                        {editLoader ? <ActivityIndicator color={'#cd2121'} size={'small'} /> : <Text onPress={()=>editAction()} style={GlobalStyles.seeMoreButtonText}>Edit</Text>}
                    </TouchableOpacity>
                    {polly_response_msg != null && (polly_response_msg.includes('.mp3') || polly_response_msg.includes('.mp4')) && <AudioPlayer Track={polly_response_msg} />}
                    {play_audio != null && (play_audio.includes('.mp3') || play_audio.includes('.mp4')) && <AudioPlayer Track={play_audio} />}
                    {deleteLoader ? <ActivityIndicator color={'#cd2121'} size={'small'} /> : <Text onPress={()=>deleteAction()} style={GlobalStyles.deleteText}>Delete</Text>}
                </View>
            }
        </View>
    );
};

Card.propTypes = {
    cardData:PropTypes.object.isRequired,
    mode:PropTypes.string.isRequired,
    refreshData:PropTypes.func.isRequired,
    type:PropTypes.string.isRequired,
};

export default Card;