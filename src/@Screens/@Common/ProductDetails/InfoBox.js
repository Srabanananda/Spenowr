/**
 *  Created By @name Sukumar_Abhijeet
 */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { connect, useStore } from 'react-redux';
import Config from '@Config/default';
import FormHeader from '../../../@GlobalComponents/FormHeader';
import Capitalize from '../../../@Utils/helperFiles/Capitalize';
import styles from './styles';
import { GetCatValue, GetSubCatValue } from '../../../@Utils/helperFiles/GetCatSubcat';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getCurrency } from '../../../@Utils/helperFiles/CardDetails';
import ScaledImage from '../../../@GlobalComponents/ScalableImage';
import BuyNow from '../../../@GlobalComponents/CartItem/BuyNow';
import AddToCart from '../../../@GlobalComponents/CartItem/AddtoCard';
import PropTypes from 'prop-types';

import RelatedProducts from './SimilarProducts/RelatedProducts';
import AddReview from './AddReview';

const { NEW_IMG_BASE, COLOR: { APP_PINK_COLOR, DARK_BLACK, ORANGE, LIGHTGREY, SUBNAME, APP_THEME_COLOR, WHITE } } = Config;

const InfoBox = ({ pDetails, ...props }) => {
    const {
        productDetails
    } = props;

    const store = useStore();
    const navigation = useNavigation();

    const { productDetails: { productDetailsData: {
        singleproduct, sellerName, seller_Slug_url = '',
        single_product_discount_percentage,
    } } } = store.getState();

    const checkNav = () => navigation.push('PublicProfile', { slug: seller_Slug_url });

    const {
        product_sku, title, description,
        product_height, product_depth,
        product_weight, product_width,
        subcategory_id, category_id,
        // original_price,discount_price,
        available_quantity,
        exchange_returns = '',
        care_instruction = '',
        shping_info = '',
        // currency,
        shipping_cost,
        varianceEnabled,
        variant_label,
        reduced_primary_image,
        reduced_secondary_image1,
        reduced_secondary_image2,
        reduced_secondary_image3,
        reduced_secondary_image4

    } = singleproduct;
    const { currency, original_price, discount_price } = pDetails;
    const category = GetCatValue(category_id);
    const subCategory = GetSubCatValue(category_id, subcategory_id);

    console.log('====================================');
    console.log('variant_datavariant_data50', singleproduct?.variant_data);
    console.log('====================================');

    console.log('====================================');
    console.log('singleproductsingleproduct', singleproduct);
    console.log('====================================');

    const [variantData, setVariantData] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedImageUri, setSelectedImageUri] = useState(NEW_IMG_BASE + reduced_primary_image);
    const [imageList, setImageList] = useState([]);

    // const images = [NEW_IMG_BASE + reduced_primary_image];

    // useEffect(()=>{
    //     if(reduced_secondary_image1) images.push(NEW_IMG_BASE + reduced_secondary_image1);
    //     if(reduced_secondary_image2) images.push(NEW_IMG_BASE + reduced_secondary_image2);
    //     if(reduced_secondary_image3) images.push(NEW_IMG_BASE + reduced_secondary_image3);
    //     if(reduced_secondary_image4) images.push(NEW_IMG_BASE + reduced_secondary_image4);
    //     setImageList(images);
    // },[]);

    useEffect(() => {
        const images = [NEW_IMG_BASE + reduced_primary_image];
        if (reduced_secondary_image1) images.push(NEW_IMG_BASE + reduced_secondary_image1);
        if (reduced_secondary_image2) images.push(NEW_IMG_BASE + reduced_secondary_image2);
        if (reduced_secondary_image3) images.push(NEW_IMG_BASE + reduced_secondary_image3);
        if (reduced_secondary_image4) images.push(NEW_IMG_BASE + reduced_secondary_image4);
        setImageList(images);
    }, [reduced_primary_image, reduced_secondary_image1, reduced_secondary_image2, reduced_secondary_image3, reduced_secondary_image4]);

    // useEffect(() => {
    //     // Reset the imageList and selectedImageUri when `singleproduct` changes
    //     if (singleproduct) {
    //         const { reduced_primary_image, reduced_secondary_image1, reduced_secondary_image2, reduced_secondary_image3, reduced_secondary_image4 } = singleproduct;

    //         const NEW_IMG_BASE = Config.NEW_IMG_BASE; // Fetch the base image URL from your config

    //         const images = [NEW_IMG_BASE + reduced_primary_image];
    //         if (reduced_secondary_image1) images.push(NEW_IMG_BASE + reduced_secondary_image1);
    //         if (reduced_secondary_image2) images.push(NEW_IMG_BASE + reduced_secondary_image2);
    //         if (reduced_secondary_image3) images.push(NEW_IMG_BASE + reduced_secondary_image3);
    //         if (reduced_secondary_image4) images.push(NEW_IMG_BASE + reduced_secondary_image4);

    //         // Set the image list and default selected image
    //         setImageList(images);
    //         setSelectedImageUri(NEW_IMG_BASE + reduced_primary_image);
    //     }
    // }, [singleproduct]); 

    // const variantData = JSON.parse(data.variant_data);

    const handleVariantPress = (variant) => {
        if (selectedVariant && selectedVariant.varianceId === variant.varianceId) {
            setSelectedVariant(null);
            setSelectedImageUri(NEW_IMG_BASE + reduced_primary_image); // Reset to primary image
            console.log('Variant deselected:', variant);
        } else {
            setSelectedVariant(variant);
            if (variant.varianceImage) {
                setSelectedImageUri(NEW_IMG_BASE + variant.varianceImage); // Update to variant image
            }
            console.log('Variant selected:', variant);
        }
    };

    useEffect(() => {
        try {
            // Parse variant_data if it's a JSON string
            const parsedVariantData = singleproduct.variant_data
                ? JSON.parse(singleproduct.variant_data)
                : [];

            // Update state with parsed variant data
            setVariantData(parsedVariantData);
        } catch (error) {
            console.error('Error parsing variant_data:', error);
        }
    }, [singleproduct.variant_data]);

    return (
        <>
            <ScrollView>
                <View style={{ width: '92%', alignSelf: 'center', marginTop: 15, backgroundColor: '#fff' }}>
                    <ScaledImage source={{ uri: selectedImageUri }} />

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            imageList.map((img, i) => (
                                <TouchableOpacity
                                    key={i} onPress={() => { setSelectedImageUri(img), setSelectedVariant(null) }}
                                    style={{ margin: 10, width: 100 }}>
                                    <ScaledImage source={{ uri: img }} />
                                    {/* <ScaledImage source={{uri:selectedImageUri}} /> */}
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>

                <View style={[styles.container, { marginTop: moderateScale(10) }]}>
                    <View style={{ paddingBottom: moderateScale(5) }}>
                        <Text style={styles.titleText}>{Capitalize(title)}</Text>
                        <TouchableOpacity disabled={sellerName === 'Spenowr'} onPress={checkNav} >
                            <Text>By {sellerName}</Text>
                        </TouchableOpacity>
                        <Text style={{ ...styles.subText, fontSize: moderateScale(11) }}>Reference : {product_sku}</Text>
                    </View>
                    <FormHeader headerText={'Pricing'} />
                    <View style={{ padding: moderateScale(10) }}>
                        <View style={styles.dataBox}>
                            <Text style={{ ...styles.names, fontSize: moderateScale(16) }}>{currency === 1 ? '₹' : '$'} {selectedVariant ? selectedVariant.variancePrice : discount_price}</Text>
                            {
                                single_product_discount_percentage ? <Text style={{ ...styles.subText, textDecorationLine: 'line-through', marginLeft: moderateScale(10), fontSize: moderateScale(10) }}>{currency === 1 ? '₹' : '$'} {original_price} </Text>
                                    : null
                            }
                        </View>
                        {
                            single_product_discount_percentage ?
                                <View style={styles.dataBox}>
                                    <Text style={styles.names}>Discount  :  </Text>
                                    <View style={styles.discountBox}>
                                        <Text style={{ ...styles.subText, color: '#fff' }}>{single_product_discount_percentage} %</Text>
                                    </View>
                                </View>
                                : null
                        }
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(5) }}>
                            <Icon name={'shipping-fast'} size={20} />
                            <Text style={styles.subText}>{shipping_cost === '0.00' ? '  Free Shipping' : `  ${getCurrency(currency)}${shipping_cost} shipping fee is applicable`}</Text>
                        </View>
                        {selectedVariant ? (
                            selectedVariant.varianceQuantity === 0 || selectedVariant.varianceQuantity === '0' ? (
                                <Text style={styles.fewLeft}>Stock Not Available!</Text>
                            ) : selectedVariant.varianceQuantity <= 10 ? (
                                <Text style={styles.fewLeft}>Hurry, only few left!!</Text>
                            ) : null
                        ) : available_quantity === 0 || available_quantity === '0' ? (
                            <Text style={styles.fewLeft}>Stock Not Available!</Text>
                        ) : available_quantity <= 10 ? (
                            <Text style={styles.fewLeft}>Hurry, only few left!!</Text>
                        ) : null}
                    </View>

                    {varianceEnabled == 1 ?
                        <>
                            <FormHeader headerText={variant_label} />
                            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                                {variantData.map((variant, index) => (
                                    <TouchableOpacity style={[
                                        styless.variantButton,
                                        selectedVariant && selectedVariant.varianceId === variant.varianceId ? styless.activeVariantButton : null,
                                    ]}
                                        key={index}
                                        onPress={() => handleVariantPress(variant)} // Add onPress handler
                                    >
                                        <Text>
                                            {variant.varianceTitle}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                        : null
                    }

                    <FormHeader headerText={'Details'} />
                    <View style={{ padding: moderateScale(10) }}>
                        <Text style={[styles.subText, { marginBottom: moderateScale(8) }]}>{description}</Text>
                        {product_height ?
                            <View style={styles.dataBox}>
                                <Text style={styles.names}>Height :  </Text>
                                <Text style={styles.subText}>{product_height} (Cm)</Text>
                            </View>
                            : null
                        }
                        {
                            product_width ? <View style={styles.dataBox}>
                                <Text style={styles.names}>Width :  </Text>
                                <Text style={styles.subText}>{product_width} (Cm)</Text>
                            </View> : null
                        }

                        {
                            product_depth ? <View style={styles.dataBox}>
                                <Text style={styles.names}>Depth :  </Text>
                                <Text style={styles.subText}>{product_depth} (Cm)</Text>
                            </View> : null
                        }
                        {
                            product_weight ? <View style={styles.dataBox}>
                                <Text style={styles.names}>Weight :  </Text>
                                <Text style={styles.subText}>{product_weight / 1000} (Kg)</Text>
                            </View> : null
                        }

                        <View style={{ flexDirection: 'row', marginTop: moderateScale(4) }}>
                            {
                                category ?
                                    <View style={styles.dataBox}>
                                        <Text style={[styles.names, { fontWeight: 'normal' }]}>Category : </Text>
                                        <Text style={styles.subText2}>{category}</Text>
                                    </View> : null
                            }
                            {
                                subCategory ? <View style={[styles.dataBox, { marginLeft: moderateScale(8) }]}>
                                    <Text style={[styles.names, { fontWeight: 'normal' }]}>Sub Category : </Text>
                                    <Text style={styles.subText2}>{GetSubCatValue(category_id, subcategory_id)}</Text>
                                </View> : null
                            }
                        </View>
                    </View>
                    <FormHeader headerText={'Additional Info'} />
                    <View style={{ padding: moderateScale(10) }}>
                        {
                            <View>
                                <Text style={styles.names}>Exchange & Returns </Text>
                                <Text style={styles.subText}>{exchange_returns}</Text>
                            </View>
                        }
                        {
                            <View style={{ marginTop: moderateScale(5) }}>
                                <Text style={styles.names}>Shipping Info </Text>
                                <Text style={styles.subText}>{shping_info}</Text>
                            </View>
                        }
                        {
                            <View style={{ marginTop: moderateScale(5) }}>
                                <Text style={styles.names}>Care Instructions </Text>
                                <Text style={styles.subText}>{care_instruction}</Text>
                            </View>
                        }
                    </View>
                </View>

                <View style={styles.container}>
                    <AddReview id={singleproduct.id} type={'product'} />
                </View>
                <View style={styles.lowerContainer}>
                    <RelatedProducts productDetails={productDetails} />
                    <RelatedProducts productDetails={productDetails} showHotDeals />
                </View>

            </ScrollView>

            <View style={styles.buttonContainer}>
                {selectedVariant ? (
                    <BuyNow
                        productId={singleproduct.id}
                        selectedVariant={selectedVariant}
                        variance_enable={true}
                        customStyles={[styles.button, styles.button2]}
                        disabled={selectedVariant.varianceQuantity === 0 || selectedVariant.varianceQuantity === '0'}
                    >
                        <Text style={[styles.buyNow, { color: selectedVariant.varianceQuantity === 0 || selectedVariant.varianceQuantity === '0' ? '#999' : DARK_BLACK }]}>
                            Buy Now
                        </Text>
                    </BuyNow>
                ) : (
                    <BuyNow
                        productId={singleproduct.id}
                        customStyles={[styles.button, styles.button2]}
                        disabled={available_quantity === 0 || available_quantity === '0'}
                    >
                        <Text style={[styles.buyNow, { color: available_quantity === 0 || available_quantity === '0' ? '#999' : DARK_BLACK }]}>
                            Buy Now
                        </Text>
                    </BuyNow>
                )}

                <View style={styles.button}>
                    {selectedVariant ? (
                        <AddToCart
                            buttonStyles={styles.button}
                            indicatorColor={'#FFF'}
                            isAddedToCart={singleproduct.single_product_cart_val}
                            productId={singleproduct.id}
                            selectedVariant={selectedVariant}
                            variance_enable={true}
                            textStyles={styles.addText}
                            disabled={selectedVariant.varianceQuantity === 0 || selectedVariant.varianceQuantity === '0'}
                        />
                    ) : (
                        <AddToCart
                            buttonStyles={styles.button}
                            indicatorColor={'#FFF'}
                            isAddedToCart={singleproduct.single_product_cart_val}
                            productId={singleproduct.id}
                            textStyles={styles.addText}
                            disabled={available_quantity === 0 || available_quantity === '0'}
                        />
                    )}
                </View>
            </View>
        </>
    );
};

function mapStateToProps(state) {
    return {
        productDetails: state.productDetails.productDetailsData
    };
}

InfoBox.propTypes = {
    productDetails: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(InfoBox);

const styless = StyleSheet.create({
    variantButton: {
        padding: moderateScale(10),
        paddingHorizontal: moderateScale(15),
        marginRight: moderateScale(10),
        backgroundColor: '#f0f0f0',
        borderRadius: moderateScale(5),
    },
    activeVariantButton: {
        // backgroundColor: '#EF2D56',
        borderColor: '#EF2D56',
        borderWidth: 2,
        color: '#000'
    },
})