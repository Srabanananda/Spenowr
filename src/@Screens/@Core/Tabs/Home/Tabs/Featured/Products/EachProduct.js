/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-image-progress';
import styles from '../styles';
import Config from '@Config/default';
import {useNavigation} from '@react-navigation/native';

const {NEW_IMG_BASE} = Config;

const EachProduct = ({product,large = false}) =>{
    const navigation =  useNavigation();
    const {
        module_image_path,
        module_title,
        product_type,
        slug_url
    } = product;
    return(
        <View style={styles.artistBox}>
            <TouchableOpacity 
                onPress={()=>navigation.navigate('ProductDetails',{productSlug:slug_url})} 
                style={ product_type === 'horizontal' ? styles.productPicHorizontal : large ? styles.productPicVerticalLarge :styles.productPicVertical}>
                <Image 
                    source={{ uri:NEW_IMG_BASE + module_image_path }} 
                    style={{width:null,height:null,flex:1}} 
                />
                <View style={styles.imageOverlay} />
                <Text style={styles.eachArtistName}>{module_title}</Text>
            </TouchableOpacity>
        </View>
    );
};

EachProduct.propTypes = {
    product:PropTypes.object.isRequired,
};

export default EachProduct;