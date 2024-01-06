/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import Config from '@Config/default';
import Capitalize from '../../../../../../../@Utils/helperFiles/Capitalize';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { deleteSellerProduct, getEditProductDetails, markSoldSellerProduct } from '../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-simple-toast';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import ScaledImage from '../../../../../../../@GlobalComponents/ScalableImage';
import { GetSubCatValue } from '../../../../../../../@Utils/helperFiles/GetCatSubcat';
import { GetCatValue } from '../../../../../../../@Utils/helperFiles/GetCatSubcat';

const { NEW_IMG_BASE } = Config;

const ProductCard = ({ ProductData, refreshData, mode, type }) => {
    const navigation = useNavigation();

    const {
        primary_image, title,
        category_id, subcategory_id,currency,
        discount_price, original_price,
        id, slug_url,
        primary_thumbnail_image = '',
        status = '0',
        discountParcentage = 0,
    } = ProductData;

    const [loader, setLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [soldLoader, setSoldLoader] = useState(false);

    const showDetails = () => {
        const arr = slug_url.split('/');
        const slug = arr[arr.length - 1];
        navigation.navigate('ProductDetails', { productSlug: slug });
    };

    const editProduct = () => {
        setLoader(true);
        getEditProductDetails(id)
            .then(res => {
                setLoader(false);
                const { data: { productData } } = res;
                navigation.navigate('AddSellerProduct', { EditData: productData });
            })
            .catch(() => {
                setLoader(false);
                Toast.show('Oops couldnot load Product details', Toast.LONG);
            });
    };

    const sellProduct = () => {
        setSoldLoader(true);
        markSoldSellerProduct(id)
            .then(() => {
                Toast.show('Product marked as sold', Toast.LONG);
                refreshData();
            })
            .catch(() => {
                Toast.show('Oops couldnot mark as sold', Toast.LONG);
            })
            .finally(() => {
                setSoldLoader(false);
            });
    };

    const deleteProduct = (isReactivate = false) => {
        setDeleteLoader(true);
        deleteSellerProduct(id, isReactivate)
            .then(() => {
                refreshData();
                setDeleteLoader(false);
            })
            .catch(() => {
                setDeleteLoader(false);
                Toast.show('Oops Something went wrong', Toast.SHORT);
            });
    };

    const getTextByStatus = () => {
        switch (status) {
            case '1':
                return 'Active';

            case '2':
                return 'Pending Approval';

            case '3':
                return 'Reject';

            default:
                return 'Deleted';
        }
    };

    const getSubCategory = GetSubCatValue(category_id, subcategory_id);

    return (
        <View style={styles.productCard}>
            <View style={styles.imageHolder}>
                <ScaledImage source={{ uri: NEW_IMG_BASE + (mode === 'PRIVATE' ? primary_image : primary_thumbnail_image) }} />
            </View>
            <View style={{ padding: moderateScale(15) }}>
                {
                    mode === 'PRIVATE' &&
                    <View style={{ alignSelf: 'flex-end', marginTop: moderateScale(4) }}>
                        <Text style={GlobalStyles.seeMoreButtonText}>{getTextByStatus()}</Text>
                    </View>
                }
                <Text style={styles.title}>{Capitalize(title)}</Text>
                <Text style={styles.categoryTitle}>{getSubCategory ? `${getSubCategory} | ` : ''}{GetCatValue(category_id)} </Text>
                <View style={styles.dataBox}>
                    <Text style={styles.prices}>{currency === 1 ? '₹' : '$'} {discount_price}</Text>
                    {discountParcentage ? <Text style={[styles.prices, styles.strikeThrough]}>{currency === 1 ? '₹' : '$'} {original_price}</Text> : null}
                    {discountParcentage ? <View style={styles.offView}><Text style={styles.textOff}>{`${discountParcentage}% off`}</Text></View> : null}
                </View>
                <View style={styles.buttonBox}>
                    {
                        (mode === 'PRIVATE' && type !== 'deleted') ?
                            (
                                <>
                                    <TouchableOpacity onPress={() => editProduct()} style={GlobalStyles.seeMoreButton}>
                                        {loader && <ActivityIndicator color={'#fff'} size={'small'} />}
                                        {!loader && <Text style={GlobalStyles.seeMoreButtonText}>Edit</Text>}
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteProduct()} style={[GlobalStyles.seeMoreButton, { marginHorizontal: moderateScale(10) }]}>
                                        {deleteLoader && <ActivityIndicator color={'#fff'} size={'small'} />}
                                        {!deleteLoader && <Text style={GlobalStyles.seeMoreButtonText}>Delete</Text>}
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => sellProduct()} style={[GlobalStyles.seeMoreButton, { marginHorizontal: moderateScale(10) }]}>
                                        {soldLoader && <ActivityIndicator color={'#fff'} size={'small'} />}
                                        {!soldLoader && <Text style={GlobalStyles.seeMoreButtonText}>Sold</Text>}
                                    </TouchableOpacity>
                                </>
                            ) :
                            null
                    }
                    {
                        type === 'deleted' &&
                        <TouchableOpacity onPress={() => deleteProduct(true)} style={GlobalStyles.seeMoreButton}>
                            {deleteLoader && <ActivityIndicator color={'#fff'} size={'small'} />}
                            {!deleteLoader && <Text style={GlobalStyles.seeMoreButtonText}>Re-Activate</Text>}
                        </TouchableOpacity>
                    }
                    {
                        status === '1' &&
                        <TouchableOpacity onPress={() => showDetails()} style={GlobalStyles.seeMoreButton}>
                            <Text style={GlobalStyles.seeMoreButtonText}>View Details</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
};

ProductCard.propTypes = {
    ProductData: PropTypes.object.isRequired,
    refreshData: PropTypes.func.isRequired,
};

export default ProductCard;