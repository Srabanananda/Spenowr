/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View} from 'react-native';
import HorizontalSlider from '@GlobalComponents/HorizontalSlider';
import EachArtwork from '../../../@Core/Tabs/Home/Tabs/Featured/Artworks/EachArtwork';
import ListHeader from '@GlobalComponents/ListHeader';
import styles from '../styles';
import PropTypes from 'prop-types';

const RelatedArtworks = ({artworkDetails}) =>{
    const {
        related_images = []
    } = artworkDetails;

    if(!related_images.length) return null;

    return(
        <View style={styles.similarArtworkWrapper}>
            <ListHeader headerText={'Related Artworks'} headerViewStyle={{marginBottom:10}} />
            <HorizontalSlider>
                {
                    related_images.map((item,index)=>{
                        const eachArtwork = item;
                        eachArtwork.module_title = item.photo_title,
                        eachArtwork.module_image_path = item.media_thumbnail_path ,
                        eachArtwork.module_id = item.media_id;
                        return <EachArtwork artwork={eachArtwork} key={index} />;
                    })
                } 
            </HorizontalSlider>
        </View>
    );
};


RelatedArtworks.propTypes = {
    artworkDetails:PropTypes.object.isRequired
};

export default RelatedArtworks;