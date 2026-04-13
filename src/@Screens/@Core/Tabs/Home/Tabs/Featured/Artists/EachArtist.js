/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import styles from '../styles';
import Config from '@Config/default';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';

const {NEW_IMG_BASE} = Config;

const EachArtist = ({artist}) =>{
    const navigation = useNavigation();

    const {
        slug_url,
        module_title,
        module_image_path,
        position= ''
    } = artist;

    return(
        <View style={styles.artistBox}>
            <TouchableOpacity onPress={()=>navigation.navigate('PublicProfile',{slug:slug_url})} style={styles.profilePic}>
                <FastImage 
                    resizeMode={'contain'} 
                    source={{ uri:NEW_IMG_BASE + module_image_path }} 
                    style={{width:null,height:null,flex:1}} 
                />
            </TouchableOpacity>
            <Text style={styles.topArtist}>{module_title}</Text>
            {position ? <Text style={styles.winner}>{position}</Text> : null}
        </View>
    );
};

EachArtist.propTypes = {
    artist:PropTypes.object.isRequired,
};

export default EachArtist;