/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {SafeAreaView} from 'react-native';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import Gallery from './Gallery';
import { GlobalStyles } from '../../../../../@GlobalStyles';

const ArtworkGalleryScreen = () =>{
    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Artwork Gallery'} />
            <Gallery />
        </SafeAreaView>
    );
};

export default ArtworkGalleryScreen;