/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Alert, Animated } from 'react-native';
import PropTypes from 'prop-types';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../@GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { getCurrency } from '../../@Utils/helperFiles/CardDetails';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { addRemoveCartItemQty, deleteCartItem } from '../../@Endpoints/Core/Tabs/Shop';
import Toast from 'react-native-simple-toast';
import Capitalize from '../../@Utils/helperFiles/Capitalize';
import { isAValidImagePath } from '../../@Utils/helperFiles/helpers';
import ScaledImage from '../../@GlobalComponents/ScalableImage';
import CustomImageView from '../../@Screens/@Common/CustomPrintDetails/CustomImageView';

const { DUMMY_IMAGE_URL, NEW_IMG_BASE, COLOR: { SUBNAME, APP_PINK_COLOR, LIGHTGREY, APP_THEME_COLOR } } = Config;

const CartItem = ({ ...props }) => {
    const navigation = useNavigation();
    const { item, refreshData, containerStyles, isInactive } = props;
    const {
        primary_thumbnail_image = '',
        slug_url = '',
        title = '',
        cart_original_price = '',
        original_price = '',
        cart_product_price = '',
        seller_name,
        currency = '1',
        off = '',
        quantity = '',
        addtocartid = '',
        product_type = 'product',
        course_id = '',
        tracking_id = '',
        courier_info = '',
        product_price = '',
        delhivery_status,
        delivery_date,
        product_image = '',
        product_info = {},
    } = item;
    var productInfo = {}
    try {
        var productInfo = product_info != undefined ? JSON.parse(product_info) : {}
        console.log("productInfo : ", JSON.stringify(productInfo));
    } catch (e) {
    }
    const { front_name, font_text_color, front_artwork_image,discount_price, x_cord, front_position } = productInfo;
    const styles = style(APP_PINK_COLOR,APP_THEME_COLOR,font_text_color)

    const checkNavigation = () => {
        if (product_type === 'service')
            navigation.navigate('ServiceDetails', { course_id });
        if (product_type === 'product')
            navigation.push('ProductDetails', { productSlug: slug_url });
        if(product_type === 'print-product')
            navigation.push('CustomPrintsDetails',{ 
                slug:slug_url, 
                productInfo: productInfo, 
                cartID: addtocartid,
                refresh: refreshData
            });
    };

    const onAddRemove = (type) => {
        const body = new FormData();
        body.append('addtocartid', addtocartid);
        body.append('type', type);
        body.append('quantity', quantity);
        body.append('product_type',product_type);
        addRemoveCartItemQty(body)
            .then((res) => {
                const { data: {
                    response_msg = ''
                } } = res;
                if (response_msg === 'More quantity not available!') Alert.alert(response_msg);
                else {
                    Toast.show('Cart Updated');
                    refreshData();
                }
            })
            .catch(() => {
                Toast.show('Oops something went wrong');
            });
    };

    const onRemove = () => {
        const body = new FormData();
        body.append('addtocartid', addtocartid);
        deleteCartItem(body)
            .then(() => {
                Toast.show('Item Removed');
                refreshData();
            })
            .catch(() => {
                Toast.show('Oops Something went wrong');
            });
    };

    const getDeliveryInfo = () => {
        switch (delhivery_status) {
        case '1':
            return `Order Placed on ${delivery_date}`;

        case '2':
            return `Shipped on ${delivery_date}`;

        case '3':
            return `Delivered on ${delivery_date}`;

        default:
            return '';
        }
    };

    const getDisplayImage = () => {
        const imageSwitch = primary_thumbnail_image ||  product_image;
        return(
            <>
                {product_type == 'product' && 
                    <Image source={{ uri: NEW_IMG_BASE + imageSwitch }} style={styles.Image} /> || 
                    <CustomImageView 
                        Image={NEW_IMG_BASE + imageSwitch} 
                        ProductInfo={productInfo}
                        forFront={true} 
                        MainStyle={[styles.Image,{ justifyContent:'center',}]}
                        MiniStyle={{alignSelf:'center', height: 40, width: 40}}
                        textStyle={[styles.backTextStyle]}/>
                    
                }
            </>
        );
    };    

    return (
        <View style={[GlobalStyles.primaryCard, styles.containerWrapper, containerStyles]}>
            <TouchableOpacity onPress={() => checkNavigation()} style={styles.imageBox}>
                {getDisplayImage()}
            </TouchableOpacity>
            <View style={styles.detailWrapper}>
                <Text numberOfLines={1} style={styles.titleText}>{Capitalize(title)}</Text>
                <Text numberOfLines={1} style={styles.sellerText}>By {seller_name} ({product_type ? Capitalize(product_type) : ''})</Text>
                {isInactive ? <Text numberOfLines={1} style={styles.qtyText2}>Quantity: {quantity}</Text> : null}
                <View style={styles.priceBox}>
                    <Text style={styles.productPrice}>{getCurrency(JSON.stringify(currency))}{product_type === 'service' ? original_price : (cart_product_price || product_price)}</Text>
                    {cart_original_price && off && product_type !== 'service' ? <Text style={styles.originalPrice}>{getCurrency(JSON.stringify(currency))}{cart_original_price} </Text> : null}
                </View>
                {tracking_id ? <Text style={styles.sellerText}>Tracking ID : {tracking_id}</Text> : null}
                {courier_info ? <Text style={styles.sellerText}>Shipping Partner : {courier_info}</Text> : null}
                {delhivery_status ? <Text style={styles.sellerText}>{getDeliveryInfo()}</Text> : null}
                {off && product_type !== 'service' ? <View style={styles.offView}><Text style={styles.textOff}>{`${off}% off`}</Text></View> : null}
                {
                    (isInactive || product_type === 'service') ? null :
                        <View style={styles.actionWrapper}>
                            <TouchableOpacity onPress={() => onAddRemove('remove')} style={styles.actionButton}>
                                <Icon color={'#fff'} name={'minus'} />
                            </TouchableOpacity>
                            <View style={styles.qtyBox}>
                                <Text style={styles.qtyText}>{quantity}</Text>
                            </View>
                            <TouchableOpacity onPress={() => onAddRemove('add')} style={styles.actionButton}>
                                <Icon color={'#fff'} name={'plus'} />
                            </TouchableOpacity>
                        </View>
                }
            </View>
            {
                isInactive ? null :
                    <TouchableOpacity onPress={() => onRemove()} style={styles.removeContainer}>
                        <Icon color={APP_PINK_COLOR} name={'trash'} size={16} />
                    </TouchableOpacity>
            }
        </View>
    );
    
};

CartItem.propTypes = {
    containerStyles: PropTypes.object,
    isInactive: PropTypes.any,
    item: PropTypes.object.isRequired,
    refreshData: PropTypes.func.isRequired,
};

export default CartItem;

const style = (APP_PINK_COLOR,APP_THEME_COLOR,font_text_color) => StyleSheet.create({
    containerWrapper: {
        flexDirection: 'row',
        padding: moderateScale(5),
    },
    imageBox: {
        width: '40%',
        minHeight: moderateScale(120),
        backgroundColor: LIGHTGREY,
        borderRadius: moderateScale(5),
    },
    Image: {
        width: null,
        height: null,
        flex: 1,
        borderRadius: moderateScale(4)
    },
    detailWrapper: {
        marginLeft: moderateScale(5),
        width: '60%',
    },
    removeContainer: {
        alignItems: 'flex-start',
        position: 'absolute',
        right: 0,
        bottom: 0,
        padding: moderateScale(10)
    },
    titleText: {
        maxWidth: moderateScale(180),
        fontWeight: 'bold',
        fontSize: moderateScale(14),
        color: SUBNAME
    },
    descText: {
        maxWidth: moderateScale(180),
        fontSize: moderateScale(10),
        color: SUBNAME,
        marginTop: moderateScale(4)
    },
    sellerText: {
        color: SUBNAME,
        fontSize: moderateScale(11),
        marginBottom: moderateScale(2)
    },
    priceBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(5)
    },
    productPrice: {
        fontSize: moderateScale(16),
        fontWeight: 'bold'
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        marginLeft: moderateScale(5),
        fontSize: moderateScale(10)
    },
    offView: {
        backgroundColor: APP_THEME_COLOR,
        padding: moderateScale(4),
        borderRadius: moderateScale(4),
        maxWidth: moderateScale(55),
        marginTop: moderateScale(2)
    },
    textOff: {
        color: '#FFF',
        fontSize: moderateScale(10)
    },
    actionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    actionButton: {
        width: moderateScale(25),
        height: moderateScale(25),
        backgroundColor: APP_PINK_COLOR,
        borderRadius: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    qtyBox: {
        width: moderateScale(40),
        height: moderateScale(25),
        backgroundColor: LIGHTGREY,
        marginHorizontal: moderateScale(6),
        borderRadius: moderateScale(4),
        justifyContent: 'center',
        alignItems: 'center'
    },
    qtyText: {
        fontWeight: 'bold',
        fontSize: moderateScale(14),
    },
    qtyText2: {
        fontWeight: 'bold',
        fontSize: moderateScale(12),
    },
    frontTextStyle:{
        color:font_text_color,
        fontSize: moderateScale(5),
        alignSelf:'center',
        textAlign:'center',
        width: 40,
        marginBottom:moderateScale(5)
    },
    backTextStyle:{
        color:font_text_color,
        width: 40,
        fontSize: moderateScale(5),
        alignSelf:'center',
        textAlign:'center',
    }
});