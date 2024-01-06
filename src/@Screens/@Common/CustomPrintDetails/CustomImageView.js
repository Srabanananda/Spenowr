import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import ScaledImage from '../../../@GlobalComponents/ScalableImage';
const {NEW_IMG_BASE} = Config;

const CustomImageView = ({ ProductInfo, forFront, Image, MainStyle, MiniStyle, textStyle}) => {

    const { 
        front_name,
        font_text_color,
        front_artwork_image,
        original_front_image,
        original_image,
        reduced_image,
        original_back_image,
        x_cord,
        front_position,
        back_name,
        back_text_color,
        back_artwork_image,
        y_cord,
        back_position,
    } = ProductInfo 
    const frontImage = front_artwork_image != "" ? front_artwork_image : original_front_image? original_front_image : original_image
    const backImage = back_artwork_image != "" ? back_artwork_image : original_back_image
    const ArtImage = forFront ? NEW_IMG_BASE + frontImage : NEW_IMG_BASE + backImage 
    const label = forFront ? front_name : back_name 
    const labelColor = forFront ? font_text_color : back_text_color 
    const position = forFront ? front_position : back_position 
    const CoOD = forFront ? x_cord : y_cord 
    const styles = style(labelColor)
    return(
        <ScaledImage source={{ uri: Image }} style={MainStyle ? MainStyle : [styles.Image,{ justifyContent:'center',}]} >
            {label?.length && position == "true"  ? <Text style={[textStyle ? textStyle : styles.frontTextStyle, {color: labelColor}]}>{label}</Text> : <></>}
            <ScaledImage source={{ uri:  ArtImage }} style={MiniStyle ? MiniStyle : {alignSelf:'center', height: 100, width: 100}} />
            {label?.length && position == "false"  ? <Text style={[textStyle ? textStyle : styles.frontTextStyle, {color: labelColor}]}>{label}</Text> : <></>}
        </ScaledImage>
    );

}

const style = (font_text_color) => StyleSheet.create({
    Image: {
        width: null,
        height: null,
        flex: 1,
        borderRadius: moderateScale(4)
    },
    frontTextStyle:{
        color:font_text_color,
        fontSize: moderateScale(15),
        alignSelf:'center',
        textAlign:'center',
        width: 100,
        marginBottom:moderateScale(5)
    },
});
export default CustomImageView;