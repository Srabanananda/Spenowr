import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity,StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../../../../../@GlobalStyles';

import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import { getCurrency } from '../../../../../../@Utils/helperFiles/CardDetails';
import Capitalize from '../../../../../../@Utils/helperFiles/Capitalize';
import ScaledImage from '../../../../../../@GlobalComponents/ScalableImage';
import { isAValidImagePath } from '../../../../../../@Utils/helperFiles/helpers';

const {COLOR:{APP_PINK_COLOR,DARKGRAY},NEW_IMG_BASE,DUMMY_IMAGE_URL} = Config;

const Card = ({printData}:any) => {
    const {
        product_name,
        slug_url,
        category,
        currency,
        department,
        manufacturer,
        product_info = '{}'
    } = printData;

    const productInfo = JSON.parse(product_info)?.[0];

    const navigation = useNavigation();
    return(
        <TouchableOpacity 
            onPress={()=>navigation.navigate('CustomPrintsDetails',{slug:slug_url})} 
            style={[GlobalStyles.primaryCard,styles.card]}
        >
            <ScaledImage source={{ uri: isAValidImagePath(productInfo?.optimized_front_image_path) ? NEW_IMG_BASE + productInfo?.optimized_front_image_path : DUMMY_IMAGE_URL }} />
            <Text style={styles.productName}>{product_name}</Text>
            <Text style={styles.price}>{getCurrency(currency)}{ productInfo?.price}</Text>
            <Text style={styles.clothing}>{Capitalize(category)} For {department}</Text>
            <Text style={styles.manufaturer}>Manufactured By : {manufacturer}</Text>
        </TouchableOpacity>
    );

};

export default Card;


const styles = StyleSheet.create({
    card:{
        marginBottom:moderateScale(10),
        padding:moderateScale(10)
    },
    productName:{
        color:APP_PINK_COLOR,
        fontSize:moderateScale(16),
        fontWeight:'bold',
        marginTop:moderateScale(5)
    },
    manufaturer:{
        color:DARKGRAY,
        fontSize:moderateScale(8),
        fontWeight:'400',
        marginTop:moderateScale(3)
    },
    clothing:{
        fontWeight:'600',
        fontSize:moderateScale(10)
    },
    price:{
        fontWeight:'bold'
    }
});