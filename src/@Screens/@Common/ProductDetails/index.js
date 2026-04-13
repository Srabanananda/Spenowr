/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { getAProductDetails } from '../../../@Endpoints/Core/Tabs/Common';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import styles from './styles';
import * as productDetailActions from '../../../@Redux/actions/productDetailActions';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import Toast from 'react-native-simple-toast';
import ImageSlides from './ImageSlides';
import InfoBox from './InfoBox';
import AddReview from './AddReview';
import PropTypes from 'prop-types';
import RelatedProducts from './SimilarProducts/RelatedProducts';
import AddToCart from '../../../@GlobalComponents/CartItem/AddtoCard';
import BuyNow from '../../../@GlobalComponents/CartItem/BuyNow';
import Customize from './Customize';
import { useCurrency } from '../../../@Context';
import { useFocusEffect } from '@react-navigation/native';

const ProductDetailsScreen = ({...props}) =>{
    const {
        navigation,updateProductDetails,route,
        productDetails
    } = props;
    console.log('====================================');
    console.log('propsprops29',props);
    console.log('====================================');
    const {productSlug} = route.params;
    const [loader, setLoader] = useState(true);
    const [pDetails, setPDetails] = useState('');
    const { currency, setCurrency } = useCurrency();

  

    useFocusEffect(
        React.useCallback(() => {
            callApi();

            // Cleanup function if needed
            return () => {
                // Any cleanup if necessary
            };
        }, [currency, productSlug]) // Depend on mediaId and artworkSlug
    );
    
    const callApi = () => {
        setLoader(true);
        getAProductDetails(currency, productSlug)
            .then(res=>{
                console.log('====================================');
                console.log('res55',res);
                updateProductDetails(res.data);
                setPDetails(res.data)
                setLoader(false);
            })
            .catch(()=>{
                Toast.show('Oops Could not get Product Details',Toast.LONG);
                setTimeout(()=>{navigation.goBack();},300);
            });
    };

    const getData = ()=>{
        if(!loader)
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            onRefresh={callApi} 
                            title="Refreshing .."
                            titleColor={'#000'} />
                    } showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        {/* <ImageSlides />  */}
                        {/* <InfoBox pDetails={productDetails} /> */}
                        {/* <AddReview id={productDetails.singleproduct.id} type={'product'} /> */}
                    </View>
                    {/* <View style={styles.lowerContainer}>
                        <RelatedProducts productDetails={productDetails} />
                        <RelatedProducts productDetails={productDetails} showHotDeals />
                    </View> */}
                </ScrollView>
            );
        return <ScreenLoader text={'Fetching Product Details..'} />;
        
    };

    return(
        <View style={{ flex: 1 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={callApi}
                        title="Refreshing .."
                        titleColor={'#000'} />
                }
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
            >
            <DefaultHeader headerText={'Product Details'} inCart={true} showCurr={true} getSelectedCurrency={setCurrency}>
                {!loader &&  <Customize />}
            </DefaultHeader>
        
            {/* {getData()} */}
            {/* {
                loader ? null : 
                    <View style={styles.buttonContainer}>
                        <BuyNow customStyles={[styles.button,styles.button2]} productId={productDetails.singleproduct.id}>
                            <Text style={styles.buyNow}>Buy Now</Text>
                        </BuyNow>
                        <View style={styles.button}>
                            <AddToCart 
                                buttonStyles={styles.button}  
                                indicatorColor={'#FFF'} 
                                isAddedToCart={productDetails.single_product_cart_val} 
                                productId={productDetails.singleproduct.id} 
                                textStyles={styles.addText}
                            />
                        </View>
                    </View>
            } */}
        </ScrollView>
        {!loader ?
            
            <InfoBox pDetails={productDetails} />
            : 
            <View style={{position:'absolute', top:100, alignSelf:'center'}}>
            <ScreenLoader text={'Fetching Product Details..'} />
            </View>
        }
        </View>
    );
};

function mapStateToProps(state){
    return{
        productDetails : state.productDetails.productDetailsData
    };
}

function mapDispatchToProps(dispatch){
    return{
        updateProductDetails:(data) =>
            dispatch(productDetailActions.updateProductDetails(data)),
    };
}

ProductDetailsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    productDetails:PropTypes.object.isRequired,
    route:PropTypes.object.isRequired,
    updateProductDetails:PropTypes.func.isRequired,
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetailsScreen);