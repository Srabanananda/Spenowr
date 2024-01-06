/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {Text,ImageBackground,TouchableOpacity,View,Platform} from 'react-native';
import styles from './styles';
import QUOTES from '@Assets/JsonFiles/Quotes/quotes.js';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import ScaledImage from '../ScalableImage';
const {NEW_IMG_BASE} = Config;

const {quotes} = QUOTES;

export const getWritingsTextStyle = (Writing) =>{
    const {text_style = '{}'} = Writing;
    const parsedStyle = JSON.parse(text_style);
    const {
        bold = '',
        italic = '',
        textColor = '',
        textFont = '',
    } = parsedStyle;
    const styleExtracted = { 
        color:textColor,fontStyle : italic==='true' ? 'italic' : 'normal',fontWeight:bold === 'true' ? 'bold' : '400',
        textAlign:'center', fontFamily:textFont === ''  ? Platform.OS === 'ios' ? 'Helvetica' : 'Roboto'  : textFont
    };
    return styleExtracted;
};

const WritingsView = ({...props}:any) =>{
    const navigation = useNavigation();
    const {
        children,
        verticalContainer={}, 
        verticalContainerImage = {},
        horizontalContainer={}, 
        horizontalContainerImage = {},
        plainTextContainer={},
        customTopDescriptionTextStyles = {},
        Writing, 
        isNavigationDisabled = false,
        hideTopDesciption = false,
        externalCall,
    } = props;
    const {
        feed_less_description='',
        feed_more_description='',
        image_type='',
        theme_image='',
        name='',
        slug_url='',
        show_description='0',
        media_path = ''
    } = Writing;

    // console.log('Writing => ',Writing);

    const hasMediapath = media_path !== '' && media_path !== null && media_path !== undefined;

    const getBackgroundColor = ()=>{
        const {bg_color} = Writing;
        return bg_color;
    };

    const navigateToDetails = () =>{
        externalCall?.();
        navigation.push('QuotesDetails',{quoteSlug:slug_url});
    };

    const getBodyContent = () => {
        if(hideTopDesciption && (media_path === '' || media_path === null || media_path === undefined )) 
            return  <Text style={[getWritingsTextStyle(Writing),styles.headNameSmall]}>{name}</Text> ;
        return(
            <View style={{marginHorizontal:moderateScale(20)}}>
                {name?.length ?<Text style={[getWritingsTextStyle(Writing),styles.headName]}>{name}</Text> : <></>}
                <Text style={getWritingsTextStyle(Writing)}>{feed_less_description || feed_more_description}</Text>
            </View>
        );
    };

    const getTopDesciption = () =>{
        if(show_description === '1' && !hideTopDesciption)
            return(
                <View style={{padding:moderateScale(10)}}>
                    <Text style={[{textAlign:'center'},customTopDescriptionTextStyles]}>{feed_less_description || feed_more_description}</Text>
                </View>
            );
        return null;
    };
    if(hasMediapath)
        return (
            <TouchableOpacity 
                disabled={isNavigationDisabled} 
                onPress={()=>navigateToDetails()} 
            >
                {getTopDesciption()}
                <View style={[styles.imageContainerMediapath,verticalContainer]}>
                    <ScaledImage source={{ uri: NEW_IMG_BASE + media_path }} useBackground ><View style={styles.hasMediaContentStyles}>{ show_description !== '1' && getBodyContent()}</View></ScaledImage>
                    {children}
                </View>
            </TouchableOpacity>
        );

    if(image_type === 'vertical')
    {
        const imgObj =  quotes[0].quoteVerticalImage.find(x=>x.value === theme_image);
        if(imgObj)
            return (
                <TouchableOpacity 
                    disabled={isNavigationDisabled} 
                    onPress={()=>navigateToDetails()} 
                >
                    <View style={[styles.imageContainer,verticalContainer]}>
                        <ImageBackground   
                            resizeMode={'contain'}
                            source={imgObj.local_image} 
                            style={[styles.imgBackgroundVertical,verticalContainerImage]}
                        >
                            {getBodyContent()}{children}
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
            );
        return null;
    }
    if(image_type === 'horizontal')
    {
        const imgObj =  quotes[1].quoteHorizontalImage.find(x=>x.value === theme_image);
        if(imgObj)
            return (
                <TouchableOpacity 
                    disabled={isNavigationDisabled} 
                    onPress={()=>navigateToDetails()} 
                >
                    <View style={[styles.imageContainer,horizontalContainer]}>
                        <ImageBackground  
                            source={imgObj.local_image} 
                            style={[styles.imgBackground,horizontalContainerImage]} 
                        >
                            {getBodyContent()}{children}
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
            );
        return null;
    }
    if(image_type === 'plain_text')
    {
        return (
            <TouchableOpacity 
                disabled={isNavigationDisabled} 
                onPress={()=>navigateToDetails()} 
            >
                <View style={{...styles.plainTextContainer,backgroundColor:getBackgroundColor(),...plainTextContainer}}>
                    {getBodyContent()}{children}
                </View>
            </TouchableOpacity>
        );
    }
    return null;
};

export default WritingsView;