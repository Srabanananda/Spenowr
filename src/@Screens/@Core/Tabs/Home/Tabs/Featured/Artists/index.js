/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text} from 'react-native';
import DefaultButton from '@GlobalComponents/DefaultButton';
import FormHeader from '@GlobalComponents/FormHeader';
import styles from '../styles';
import HorizontalSlider from '@GlobalComponents/HorizontalSlider';
import ListHeader from '@GlobalComponents/ListHeader';
import { GlobalStyles } from '@GlobalStyles';
import EachArtist from './EachArtist';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';

const FeaturedArtists = ({...props}) =>{
    const navigation = useNavigation();
    const {artist_featured} = props;
    return(
        <View style={styles.componentWrapper}>
            <FormHeader headerText={'FEATURED ARTISTS'} />
            <ListHeader textStyles={{marginLeft:moderateScale(10)}} headerText={'Top Artists'}>
                {
                    artist_featured .length ? 
                        <DefaultButton 
                            buttonStyle={GlobalStyles.seeMoreBtn} 
                            buttonText={'View More'} 
                            onPress={()=> navigation.navigate('ViewMoreArtist',{filter: 'contributors'})}
                            showLoader={false}
                            textStyle={GlobalStyles.seeMoreText} 
                        /> 
                        : null
                }                
            </ListHeader>
            <HorizontalSlider>
                {
                    artist_featured.length ? 
                        artist_featured.map((item,index)=>(
                            <EachArtist artist={item} key={index} />
                        )) 
                        : 
                        <Text>No Artists Found!!</Text>
                } 
            </HorizontalSlider>
        </View>
    );
};

export default FeaturedArtists;