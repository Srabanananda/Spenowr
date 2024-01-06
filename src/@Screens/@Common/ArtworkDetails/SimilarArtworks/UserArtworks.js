/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View} from 'react-native';
import styles from '../styles';
import HorizontalSlider from '@GlobalComponents/HorizontalSlider';
import EachArtwork from '../../../@Core/Tabs/Home/Tabs/Featured/Artworks/EachArtwork';
import ListHeader from '@GlobalComponents/ListHeader';
import PropTypes from 'prop-types';

const UserArtworks = ({artworkDetails}) =>{
    const {
        users_other_images = []
    } = artworkDetails;

    if(!users_other_images.length) return null;

    return(
        <View style={styles.similarArtworkWrapper}>
            <ListHeader headerText={'Users Other Artworks'} headerViewStyle={{marginBottom:10}} />
            <HorizontalSlider>
                {
                    users_other_images.map((item,index)=>{
                        const eachArtwork = item;
                        eachArtwork.module_title = item.photo_title,
                        eachArtwork.module_image_path = item.media_thumbnail_path ,
                        eachArtwork.slug_url= item.user_other_detail_slug_url,
                        eachArtwork.module_id = item.media_id;
                        return <EachArtwork artwork={eachArtwork} key={index} />;
                    })
                } 
            </HorizontalSlider>
        </View>
    );
};


UserArtworks.propTypes = {
    artworkDetails:PropTypes.object.isRequired
};


export default UserArtworks;