/**
 *  Created By @name Sukumar_Abhijeet
 */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View,Text, TouchableOpacity} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useStore } from 'react-redux';
import FormHeader from '../../../@GlobalComponents/FormHeader';
import Capitalize from '../../../@Utils/helperFiles/Capitalize';
import styles from './styles';
import { GetCatValue, GetSubCatValue } from '../../../@Utils/helperFiles/GetCatSubcat';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getCurrency } from '../../../@Utils/helperFiles/CardDetails';

const InfoBox = ({pDetails}) =>{
    
    const store = useStore();
    const navigation = useNavigation();
    
    const {productDetails:{productDetailsData:{
        singleproduct,sellerName,seller_Slug_url='',
        single_product_discount_percentage,
    }}} = store.getState();

    const checkNav = () => navigation.push('PublicProfile',{slug:seller_Slug_url});

    const {
        product_sku,title,description,
        product_height,product_depth,
        product_weight,product_width,
        subcategory_id,category_id,
        // original_price,discount_price,
        available_quantity,
        exchange_returns='',
        care_instruction='',
        shping_info='',
        // currency,
        shipping_cost,
    } = singleproduct;
    const { currency,original_price,discount_price } = pDetails;
    const category = GetCatValue(category_id);
    const subCategory = GetSubCatValue(category_id,subcategory_id);

    return(
        <View style={{marginTop:moderateScale(10)}}>
            <View style={{paddingBottom:moderateScale(5)}}>
                <Text style={styles.titleText}>{Capitalize(title)}</Text>
                <TouchableOpacity disabled={sellerName === 'Spenowr'} onPress={checkNav} >
                    <Text>By {sellerName}</Text>
                </TouchableOpacity>
                <Text style={{...styles.subText,fontSize:moderateScale(11)}}>Reference : {product_sku}</Text>
            </View>
            <FormHeader headerText={'Pricing'} />
            <View style={{padding:moderateScale(10)}}>
                <View style={styles.dataBox}>
                    <Text style={{...styles.names,fontSize:moderateScale(16)}}>{currency === 1 ? '₹' : '$'} {discount_price}</Text>
                    {
                        single_product_discount_percentage ? <Text style={{...styles.subText,textDecorationLine:'line-through',marginLeft:moderateScale(10),fontSize:moderateScale(10)}}>{currency === 1 ? '₹' : '$'} {original_price} </Text>
                            :null
                    }
                </View>
                {
                    single_product_discount_percentage ? 
                        <View style={styles.dataBox}>
                            <Text style={styles.names}>Discount  :  </Text>
                            <View style={styles.discountBox}>
                                <Text style={{...styles.subText,color:'#fff'}}>{single_product_discount_percentage} %</Text>
                            </View>
                        </View>
                        :null
                }
                <View style={{flexDirection:'row',alignItems:'center',marginTop:moderateScale(5)}}>
                    <Icon name={'shipping-fast'} size={20} />
                    <Text style={styles.subText}>{shipping_cost === '0.00' ? '  Free Shipping' : `  ${getCurrency(currency)}${shipping_cost} shipping fee is applicable`}</Text>
                </View>
                {available_quantity <= 10 && <Text style={styles.fewLeft}>Hurry, only few left!!</Text>}
            </View>
            <FormHeader headerText={'Details'} />
            <View style={{padding:moderateScale(10)}}>
                <Text style={[styles.subText,{marginBottom:moderateScale(8)}]}>{description}</Text>
                {product_height?
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
                        <Text style={styles.subText}>{product_weight/1000} (Kg)</Text>
                    </View> : null
                }

                <View style={{flexDirection:'row',marginTop:moderateScale(4)}}>
                    {
                        category ? 
                            <View style={styles.dataBox}>
                                <Text style={[styles.names,{fontWeight:'normal'}]}>Category : </Text>
                                <Text style={styles.subText2}>{category}</Text>
                            </View> : null
                    }
                    {
                        subCategory ? <View style={[styles.dataBox,{marginLeft:moderateScale(8)}]}>
                            <Text style={[styles.names,{fontWeight:'normal'}]}>Sub Category : </Text>
                            <Text style={styles.subText2}>{GetSubCatValue(category_id,subcategory_id)}</Text>
                        </View> : null
                    }
                </View>
            </View>
            <FormHeader headerText={'Additional Info'} />
            <View style={{padding:moderateScale(10)}}>
                {
                    <View>
                        <Text style={styles.names}>Exchange & Returns </Text>
                        <Text style={styles.subText}>{exchange_returns}</Text>
                    </View>
                }
                {
                    <View style={{marginTop:moderateScale(5)}}>
                        <Text style={styles.names}>Shipping Info </Text>
                        <Text style={styles.subText}>{shping_info}</Text>
                    </View>
                }
                {
                    <View style={{marginTop:moderateScale(5)}}>
                        <Text style={styles.names}>Care Instructions </Text>
                        <Text style={styles.subText}>{care_instruction}</Text>
                    </View>
                }
            </View>
        </View>
    );
};

export default InfoBox;