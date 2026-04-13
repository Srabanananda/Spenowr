/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import ScaledImage from '../../../../@GlobalComponents/ScalableImage';
import {styles} from './CardLayout';
import { useNavigation } from '@react-navigation/native';

import PropTypes from 'prop-types';
import Config from'@Config/default';
import Capitalize from '../../../../@Utils/helperFiles/Capitalize';
import { GetCatValue, GetSubCatValue } from '../../../../@Utils/helperFiles/GetCatSubcat';
import FastImage from 'react-native-fast-image';

const {NEW_IMG_BASE} = Config;

const EachProduct = ({...props}) =>{
    const {product,containerStyle={}} = props;
    const navigation = useNavigation();

    const {
        primary_reduced_image='',title='',slug_url='',
        category_id='',subcategory_id='',discountParcentage=''
    } = product;

    const category = GetCatValue(category_id);
    const subCategory = GetSubCatValue(category_id,subcategory_id);

    return(
        <TouchableOpacity 
            onPress={()=>navigation.push('ProductDetails',{'productSlug':slug_url})} 
            style={[styles.productCell, { opacity: 0.9 }, containerStyle]} >
            <>
                <View style={styles.productCardWrapper}>
                    <FastImage
                        style={styles.productImage}
                        source={{ uri: NEW_IMG_BASE + primary_reduced_image }}
                        resizeMode="cover"
                    />
                </View>
                <Text numberOfLines={1} style={styles.titleHead}>{Capitalize(title)}</Text>
                <View style={styles.catSubcat}>
                    <Text style={styles.cat}>{category} {category!=='' && subCategory!== '' ? '|':''} {subCategory}</Text>
                </View>
                {
                    discountParcentage ? 
                        <View style={styles.priceDiscountTag}>
                            <Text style={styles.percentOff}>{discountParcentage}% off</Text>
                        </View>
                        :null
                }
            </>
        </TouchableOpacity>
    );
};

EachProduct.propTypes = {
    containerStyle:PropTypes.object,
    product:PropTypes.object.isRequired,
};

export default EachProduct;