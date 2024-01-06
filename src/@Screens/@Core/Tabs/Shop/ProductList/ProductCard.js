/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text, TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import styles from './styles';
import Config from '@Config/default';
import PropTypes from 'prop-types';
import Capitalize from '../../../../../@Utils/helperFiles/Capitalize';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import AddToCart from '../../../../../@GlobalComponents/CartItem/AddtoCard';
import ScaledImage from '../../../../../@GlobalComponents/ScalableImage';
import { moderateScale } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';
import { useDispatch,connect } from 'react-redux';
import { getBuyNowDetails } from '../../../../../@Endpoints/Core/Tabs/Shop';
import * as shopActions from '@Redux/actions/shopActions';
import { ActivityIndicator } from 'react-native-paper';
import { GetCatValue, GetSubCatValue } from '../../../../../@Utils/helperFiles/GetCatSubcat';

const {NEW_IMG_BASE,COLOR:{APP_PINK_COLOR}} = Config;

const ProductCard = ({...props}) =>{
    const {product, cartItemsNumber,smallBox} = props;
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);

    const {
        primary_reduced_image='',
        currency,
        discount_price='',
        original_price='',
        title='',
        subcategory_id='',
        category_id='',
        slug_url='',
        id='',
        product_cart_val= '0',
        discountParcentage = 0,
        type,
        tag
    } = product;
console.log(product)
    const dispatch = useDispatch();

    const showDetails = () =>{
        const arr = slug_url.split('/');
        const slug = arr[arr.length-1];
        navigation.navigate('ProductDetails',{productSlug:slug, selectedCurrency: currency});
    };
    const buyNow = () =>{
        setLoader(true);
        getBuyNowDetails(id)
            .then(()=>{
                dispatch(shopActions.updateCartItemNumber(cartItemsNumber+1));
                navigation.navigate('CartCheckout', { selectedCurrency: currency });
            })
            .catch(()=>{
                Toast.show('Oops something went wrong');
            })
            .finally(()=>{
                setLoader(false);
            });

    };
    const getSubCategory = GetSubCatValue(category_id,subcategory_id);

    return(
        <TouchableWithoutFeedback onPress={()=>showDetails()}>
            <View style={[styles.productCard,smallBox && styles.smallCard]}>
                <TouchableWithoutFeedback onPress={()=>showDetails()} >
                    <View style={ smallBox ? styles.imageHolderSmall : styles.imageHolder}>
                        <ScaledImage source={{ uri: NEW_IMG_BASE + primary_reduced_image }} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={{padding:moderateScale( smallBox ? 8 : 15)}}>
                    <View>
                        <Text numberOfLines={1} style={styles.title}>{Capitalize(title)}</Text>
                        <Text style={styles.categoryTitle}>{getSubCategory ? `${getSubCategory} | ` : ''}{GetCatValue(category_id)} </Text>
                        <View style={styles.dataBox}>
                            <Text style={styles.prices}>{currency === 1 ? '₹' : '$'} {discount_price}</Text>
                            {discountParcentage ? <Text style={[styles.prices,styles.strikeThrough]}>{currency === 1 ? '₹' : '$'} {original_price}</Text> : null}
                            {discountParcentage ? <View style={styles.offView}><Text style={styles.textOff}>{`${discountParcentage}% off`}</Text></View> : null}
                        </View>
                    </View>
                    <View style={styles.buttonsWrapper}>
                        <TouchableOpacity onPress={()=>buyNow()}  style={GlobalStyles.seeMoreButton}>
                            {loader ? <ActivityIndicator color={APP_PINK_COLOR} size={'small'} /> : 
                                <Text style={GlobalStyles.seeMoreButtonText}>Buy Now</Text> }
                        </TouchableOpacity>
                        <AddToCart isAddedToCart={product_cart_val} productId={id} currency={currency}/>

                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

ProductCard.propTypes = {
    cartItemsNumber:PropTypes.number.isRequired,
    product:PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{
        cartItemsNumber : state.shop.cartItemsNumber
    };
}
  
export default connect(mapStateToProps)(ProductCard);