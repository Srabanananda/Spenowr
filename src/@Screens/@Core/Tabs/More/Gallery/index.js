/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';

import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import Gallery from './Gallery';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

const ArtworkGalleryScreen = () =>{
    return(
        <SafeAreaView edges={['left', 'right']} style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Artwork Gallery'} />
            <Gallery />
        </SafeAreaView>
    );
};

export default ArtworkGalleryScreen;