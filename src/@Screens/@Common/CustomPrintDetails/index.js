import React, { useEffect, useState } from 'react';
import { SafeAreaView,ScrollView, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { moderateScale } from 'react-native-size-matters';
import { getCustomPrintsDetails } from '../../../@Endpoints/Core/Tabs/More';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../@GlobalStyles';
import Config from '@Config/default';
import { getCurrency } from '../../../@Utils/helperFiles/CardDetails';
import Capitalize from '../../../@Utils/helperFiles/Capitalize';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import Toast from 'react-native-simple-toast';
import { addPrintingItemToCart } from '../../../@Endpoints/Core/Tabs/Shop';
import CustomImageView from './CustomImageView';


const {COLOR:{APP_PINK_COLOR,LIGHTGREY,DARKGRAY},NEW_IMG_BASE} = Config;

const CustomPrintDetailsScreen = ({...props}:any) => {

    const {route:{params:{slug,productInfo,cartID,refresh}},navigation} = props;
    const [details, setDetails] = useState(null);
    const [loader, setLoader] = useState(true);
    const [selectedSize, setSelectedSize] = useState(productInfo?.product_size ?? null);
    const [orderLoader, setOrderLoader] = useState(false);
    const [isFrontSelected, setIsFrontSelected]  = useState(true);
    const [isEdit, setEdit]  = useState(productInfo?.product_size != undefined ? true : false);
    let frontImage = '';
    // let backImage = '';

    useEffect(()=>{callApi();},[]);

    const callApi = () => {
        getCustomPrintsDetails(slug)
            .then(res=>{
                setDetails(res?.data);
            })
            .catch(()=>{
                SimpleToast.show('Oops Something went wrong');
                navigation.goBack();
            })
            .finally(()=>setLoader(false));
    };

    const printDetails = details?.printProductDetail;
    const extraInfo = JSON.parse(printDetails?.product_info??'{}')?.[0];
    const handleOrderNow = (extraInfo) => {
        if(!selectedSize?.length){
            Toast.show('Please Select a Size');
            return;
        }
        setOrderLoader(true);
        const formValues = {
            productImage : extraInfo.front_image_path,
            productSize : selectedSize,
            price : extraInfo.price,
            productId : printDetails.id,
            productColor : extraInfo.color,
            discount_price : extraInfo.discount_price
        };
        const formData = createFormData(formValues);
        addPrintingItemToCart(formData)
            .then(()=>{
                navigation.navigate('Cart');
            })
            .catch(()=>Toast.show('Oops Something went wrong'))
            .finally(()=>setOrderLoader(false));
    };

    const handleCustomization = (productDetails) => {
        if(selectedSize){
            navigation.navigate('PrintCustomization',{details,selectedSize,productInfo,cartID,refresh});
        }else{
            Toast.show('Please Select a size to customize');
        }
    };

    const renderDetails = () => {
        backImage = NEW_IMG_BASE + extraInfo?.back_image_path;
        frontImage = NEW_IMG_BASE + extraInfo?.front_image_path;
        var ProductInfo = productInfo ?? {}
        const sizes = extraInfo?.size?.split(',');
        const styles = style(APP_PINK_COLOR,extraInfo?.font_text_color)
        const currency = getCurrency(printDetails?.currency);

        return(
            <ScrollView contentContainerStyle={{padding:moderateScale(10)}} showsVerticalScrollIndicator={false}>
                {isFrontSelected &&
                    <CustomImageView  Image={frontImage} ProductInfo={ProductInfo} forFront={true}/>
                 || <CustomImageView Image={backImage} ProductInfo={ProductInfo} forFront={false}/>}
                <View style={styles.miniView}>
                    <TouchableOpacity onPress={()=>setIsFrontSelected(true)}>
                        <CustomImageView 
                            Image={frontImage} 
                            ProductInfo={ProductInfo} 
                            forFront={true} 
                            MainStyle={[isFrontSelected ? styles.miniViewItemsSelected : styles.miniViewItems,{ justifyContent:'center'}]}
                            MiniStyle={{alignSelf:'center', height: 15, width: 15}}
                            textStyle={[styles.frontTextStyle,{ fontSize: 3 }]}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setIsFrontSelected(false)}>
                    <CustomImageView 
                            Image={backImage} 
                            ProductInfo={ProductInfo} 
                            forFront={false} 
                            MainStyle={[!isFrontSelected ? styles.miniViewItemsSelected : styles.miniViewItems,{ justifyContent:'center'}]}
                            MiniStyle={{alignSelf:'center', height: 15, width: 15}}
                            textStyle={[styles.backTextStyle,{ fontSize: 3 }]}/>
                    </TouchableOpacity>
                </View>
                <View style={[GlobalStyles.primaryCard,styles.infoBox]}>
                    <Text style={styles.productName}>{printDetails?.product_name}</Text>
                    <Text style={styles.clothing}>{Capitalize(printDetails.category)} For {printDetails.department}</Text>
                    <Text style={styles.reference}>Reference {printDetails?.product_sku}</Text>
                    <Text style={styles.prize}>{currency} {extraInfo.price}</Text>
                    <Text style={styles.shippingFee}>{(printDetails.shipping_cost === '0' || printDetails.shipping_cost === '0.00') ? 'Free Shipping' :  `${currency+printDetails.shipping_cost} shipping fee is Applicable`}</Text>
                    <Text style={styles.size}>Select Size </Text>
                    <View style={{flexDirection:'row'}}>
                        {
                            sizes.map((eachSize,idx)=>{
                                return(
                                    <TouchableOpacity key={idx} onPress={()=>setSelectedSize(eachSize)} style={[eachSize !== selectedSize ? GlobalStyles.seeMoreButton : GlobalStyles.seeMoreButtonRev,{marginRight:moderateScale(8)}]} >
                                        <Text style={eachSize !== selectedSize ? GlobalStyles.seeMoreButtonText : GlobalStyles.seeMoreButtonTextRev}>{eachSize}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                    <Text style={styles.color}>Color : {extraInfo?.color} </Text>
                    <Text style={styles.manufaturer}>Sold By : {printDetails.manufacturer}</Text>
                    <DefaultButton buttonStyle={{width:moderateScale(150),marginTop:moderateScale(10)}} buttonText={`${isEdit ? 'Edit' : 'Add'} Customizations`} onPress={()=>handleCustomization(extraInfo)} showLoader={false}  textStyle={{fontSize:moderateScale(12)}} />
                </View>
                {!isEdit && <DefaultButton buttonText='Order Now' onPress={()=>handleOrderNow(extraInfo)} showLoader={orderLoader} />}
            </ScrollView>
        );
    };

    if(loader) return <ScreenLoader text={'Fetching Print Details ..'} />;
    return(
        <SafeAreaView style={{flex:1}}>
            <DefaultHeader headerText={'Print Details'} />
            {printDetails && renderDetails()}
        </SafeAreaView>
    );

};

export default CustomPrintDetailsScreen;

const style = (APP_PINK_COLOR,font_text_color) => StyleSheet.create({
    printableView:{
        width:'100%',
        height:moderateScale(260),
        backgroundColor:LIGHTGREY,
        borderRadius:moderateScale(10)
    },
    Image: {
        width: null,
        height: null,
        flex: 1,
        borderRadius: moderateScale(4)
    },
    frontTextStyle:{
        color:font_text_color,
        fontSize: moderateScale(15),
        alignSelf:'center',
        textAlign:'center',
        width: 100,
        marginBottom:moderateScale(5)
    },
    backTextStyle:{
        color:font_text_color,
        width: 100,
        fontSize: moderateScale(15),
        alignSelf:'center',
        textAlign:'center',
    },
    miniView: {
        alignSelf:'center', 
        marginVertical: moderateScale(5), 
        flexDirection: 'row'
    },
    miniViewItems: {
        width: moderateScale(50),
        height: moderateScale(50), 
        marginHorizontal: moderateScale(5)
    },
    miniViewItemsSelected: {
        width: moderateScale(50),
        height: moderateScale(50), 
        marginHorizontal: moderateScale(5),
        borderWidth:1,
        borderColor: APP_PINK_COLOR
    },
    infoBox:{
        padding:moderateScale(10),
        marginTop:moderateScale(10)
    },
    size:{
        marginTop:moderateScale(8),
        marginBottom:moderateScale(5),
        fontWeight:'bold',
        fontSize:moderateScale(12)
    },
    color:{
        fontSize:moderateScale(12),
        marginTop:moderateScale(5)
    },
    prize:{
        fontWeight:'bold',
        marginTop:moderateScale(4),
        fontSize:moderateScale(16)
    },
    reference:{
        fontSize:moderateScale(8),
        color:DARKGRAY,
        fontWeight:'600'
    },
    productName:{
        color:APP_PINK_COLOR,
        fontWeight:'bold',
        fontSize:moderateScale(18)
    },
    shippingFee:{
        fontSize:moderateScale(10)
    },
    clothing:{
        fontWeight:'600',
        fontSize:moderateScale(10)
    },
    manufaturer:{
        color:APP_PINK_COLOR,
        fontSize:moderateScale(8),
        fontWeight:'500',
        marginTop:moderateScale(3)
    },
});

export const createFormData = ({
    price = '',
    frontTextColor ='',
    frontArtworkImage = '',
    productColor ='',
    productImage ='',
    productType ='print-product',
    productId ='',
    productSize ='',
    frontName = '',
    artworkId = '',
    discount_price = '',
    
}) => {

    const data = new FormData();
    data.append('currency',null);
    data.append('product_id',productId);
    data.append('product_type',productType);
    data.append('product_size',productSize);
    data.append('product_image',productImage);
    data.append('product_color',productColor);
    data.append('upload_Image',false);
    data.append('price',price);
    data.append('artwork_id',artworkId);
    
    //FRONT
    data.append('custom_upload_image','');
    data.append('front_name',frontName);
    data.append('front_artwork_image',frontArtworkImage);
    data.append('font_text_color',frontTextColor);
    data.append('front_upload_Image','');
    data.append('front_position',false);
    
    
    // BACK
    data.append('custom_upload_back_image','');
    data.append('back_name','');
    data.append('back_artwork_image','');
    data.append('back_text_color','');
    data.append('back_upload_Image','');
    data.append('back_position',false);
    
    data.append('inventory_id','');
    data.append('quantity','');
    data.append('discount_price',discount_price);
    return data;
};