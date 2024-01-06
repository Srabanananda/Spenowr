/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import styles from '../styles';
import Config from '@Config/default';
import Image from 'react-native-image-progress';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';

const {NEW_IMG_BASE} = Config;

const EachArtwork = ({artwork}) =>{
    const navigation = useNavigation();
    const {
        module_title,
        module_image_path,
        slug_url='',
        module_id
    } = artwork;
    const slgs = slug_url ? slug_url.split('/') : '';
    return(
        <View style={styles.artistBox}>
            <TouchableOpacity 
                onPress={()=>navigation.push('ArtworkDetails',{mediaId:module_id,artworkSlug:slgs[0]})} 
                style={styles.productPicHorizontal}
            >
                <Image 
                    source={{ uri:NEW_IMG_BASE + module_image_path }} 
                    style={{width:null,height:null,flex:1}} 
                />
                <View style={styles.imageOverlay} />
                <Text numberOfLines={1} style={styles.eachArtistName}>{module_title}</Text>
            </TouchableOpacity>
        </View>
    );
};

EachArtwork.propTypes = {
    artwork:PropTypes.object.isRequired,
};


export default EachArtwork;