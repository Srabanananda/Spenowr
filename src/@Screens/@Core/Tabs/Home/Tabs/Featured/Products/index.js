/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text} from 'react-native';
import DefaultButton from '@GlobalComponents/DefaultButton';
import FormHeader from '@GlobalComponents/FormHeader';
import HorizontalSlider from '@GlobalComponents/HorizontalSlider';
import ListHeader from '@GlobalComponents/ListHeader';
import { GlobalStyles } from '@GlobalStyles';
import EachProduct from './EachProduct';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';

const FeaturedProducts = ({...props}) =>{
    const {featuredFeeds:{
        art_product = [],
        craft_product = [],
    }} = props;

    const navigation = useNavigation();

    return(
        <View>
            <FormHeader headerText={'PRODUCTS'} />
            <ListHeader headerText={'Featured products'} textStyles={{marginLeft:moderateScale(10)}}>
                <DefaultButton 
                    buttonStyle={GlobalStyles.seeMoreBtn} 
                    buttonText={'View More'} 
                    onPress={()=>navigation.navigate('ProductList',{productDetails:{type:'featured',cat:'',subcat:''}})}  
                    showLoader={false}
                    textStyle={GlobalStyles.seeMoreText}
                />
            </ListHeader>
            <HorizontalSlider>
                {
                    art_product.length ? 
                        art_product.map((item,index)=>(
                            <EachProduct key={index} product={item} />
                        )) 
                        : 
                        <Text>No products Found!!</Text>
                } 
            </HorizontalSlider>
            
           
            <ListHeader headerText={'Montessori toys'} textStyles={{marginLeft:moderateScale(10)}}>
                <DefaultButton 
                    buttonStyle={GlobalStyles.seeMoreBtn} 
                    buttonText={'View More'}
                    onPress={()=>navigation.navigate('ProductList',{productDetails:{type:'',cat:'',subcat:'toy-craft'}})}  
                    showLoader={false} 
                    textStyle={GlobalStyles.seeMoreText}
                />
            </ListHeader>
            <HorizontalSlider>
                {
                    craft_product.length ? 
                        craft_product.map((item,index)=>(
                            <EachProduct key={index} product={item} />
                        )) 
                        : 
                        <Text>No Crafts Found!!</Text>
                } 
            </HorizontalSlider>
           
        </View>
    );
};

FeaturedProducts.propTypes = {
    featuredFeeds:PropTypes.object.isRequired,
};


export default FeaturedProducts;