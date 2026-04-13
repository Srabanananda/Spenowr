/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,TouchableOpacity, ScrollView, Image, Platform} from 'react-native';
import {styles} from './CardLayout';
import { useNavigation } from '@react-navigation/native';

import PropTypes from 'prop-types';
import Config from'@Config/default';
import { GetCatValue, GetSubCatValue } from '../../../../../@Utils/helperFiles/GetCatSubcat';
import Capitalize from '../../../../../@Utils/helperFiles/Capitalize';
import ScaledImage from '../../../../../@GlobalComponents/ScalableImage';
import { moderateScale } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

const {NEW_IMG_BASE} = Config;

const EachProduct = ({...props}) =>{
    const {product,containerStyle={}} = props;
    const navigation = useNavigation();

    const {
        primary_reduced_image='',title='',slug_url='',
        category_id='',subcategory_id='',series_title='', heading='',
        image='', series_image='', series_id, article_id
    } = product;

    const category = GetCatValue(category_id);
    const subCategory = GetSubCatValue(category_id,subcategory_id);

    const handlePress = () => {
        if (series_title) {
            navigation.push('SeriesDetails', { series_id: series_id})
        }  else if (heading) {
            console.log('slug_url39',slug_url);
            navigation.push('HowToWebView',{howToSlug:slug_url})
        } else {
            navigation.push('ProductDetails', { 'productSlug': slug_url });
        }
    };

    return(
        <TouchableOpacity 
            onPress={()=> handlePress()} 
            style={{opacity:0.9,...containerStyle}} >
            <>
                <View style={[styles.productCardWrapper]}>
               
                    <ScaledImage source={{ uri: NEW_IMG_BASE + primary_reduced_image }} />
                    <FastImage
                        source={{ uri: NEW_IMG_BASE + series_image }}
                        style={{  width:moderateScale(80), height:moderateScale(80), resizeMode: 'cover' }}
                    />
                    <View style={{ height:moderateScale(80), width:moderateScale(80), position:'absolute'}}>
                    <FastImage
                        source={{ uri: NEW_IMG_BASE + image, }}
                        style={{  width:moderateScale(80),
                            height:moderateScale(80), resizeMode: 'cover' }}
                    />
                    </View>
                </View>
                
                <Text numberOfLines={1} style={[styles.titleHead, {marginVertical: Platform.OS === 'android' ? -8 : 0, marginTop: moderateScale(5)}]}>{Capitalize(title)}</Text>
                <Text numberOfLines={1} style={[styles.titleHead, { marginVertical: -16, paddingVertical: -28,}]}>{Capitalize(series_title)}</Text>
                <Text numberOfLines={1} style={styles.titleHead}>{Capitalize(heading)}</Text>
                {/* <View style={styles.catSubcat}>
                    <Text style={styles.cat}>{category} {category!=='' && subCategory!== '' ? '|':''} {subCategory}</Text>
                </View> */}
                
            </>
        </TouchableOpacity>
    );
};

EachProduct.propTypes = {
    containerStyle:PropTypes.object,
    product:PropTypes.object.isRequired,
};

export default EachProduct;