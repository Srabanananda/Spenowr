/**
 *  Created By @name Sukumar_Abhijeet
 */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View,Text} from 'react-native';
import DefaultButton from '@GlobalComponents/DefaultButton';
import FormHeader from '@GlobalComponents/FormHeader';
import HorizontalSlider from '@GlobalComponents/HorizontalSlider';
import ListHeader from '@GlobalComponents/ListHeader';
import { GlobalStyles } from '@GlobalStyles';
import EachArtwork from './EachArtwork';
import PropTypes from 'prop-types';
import { moderateScale } from 'react-native-size-matters';

const FeaturedArtworks = ({...props}) =>{
    const navigation = useNavigation();
    const {gallery_featured} = props;
    return(
        <View style={{marginBottom:10}}>
            <FormHeader headerText={'FEATURED ARTWORKS'} />
            <ListHeader textStyles={{marginLeft:moderateScale(10)}} headerText={'Top Artworks'}>
                <DefaultButton 
                    buttonStyle={GlobalStyles.seeMoreBtn} 
                    buttonText={'View More'} 
                    onPress={()=>navigation.navigate('Gallery')}
                    showLoader={false} 
                    textStyle={GlobalStyles.seeMoreText}
                />
            </ListHeader>
            <HorizontalSlider>
                {
                    gallery_featured.length ? 
                        gallery_featured.map((item,index)=>(
                            <EachArtwork artwork={item} key={index} />
                        )) 
                        : 
                        <Text>No Artworks Found!!</Text>
                } 
            </HorizontalSlider>
        </View>
    );
};


FeaturedArtworks.propTypes = {
    gallery_featured:PropTypes.array.isRequired,
};

export default FeaturedArtworks;