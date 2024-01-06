/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState, useContext } from 'react';
import {SafeAreaView,StyleSheet,Text} from 'react-native';
import { connect } from 'react-redux';
import DefaultHeader from '../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../@GlobalStyles';
import CardLayout from './CardLayout';
import * as ShopActions from '../../../../@Redux/actions/shopActions';
import PropTypes from 'prop-types';
import { isObjectEmpty } from '../../../../@Utils/helperFiles/isObjectEmpty';
import ScreenLoader from '../../../../@GlobalComponents/ScreenLoader';
import { ScrollView } from 'react-native-gesture-handler';
import  LinearGradient  from 'react-native-linear-gradient';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import NoInternet from '../../../../@GlobalComponents/NoInternet';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import { useIsFocused } from '@react-navigation/native';

const {GRADIENT_COLORS:{PIGGY,SKY,NETFLIX,OCEAN,ORANGE,VISION,INSTA},COLOR:{WHITE}} = Config;

const COLOR_SHADES = [NETFLIX,OCEAN,ORANGE,PIGGY,SKY,VISION,INSTA];

const prodParams = new FormData();
prodParams.append('sort','rating');
prodParams.append('currency','USD');

const ShopScreen = ({...props}) =>{
    const isFocused =  useIsFocused();
    const {
        fetchShopProducts,isInternetAvailable, 
        shopData:{shopProducts,shopProductApiCalled},
        navigation,
        route
    } = props;
    
    const {
        top_deals_product=[],
        product_list=[],
        featured=[]
    } = shopProducts;

    const willExploreAll = route?.params?.exploreAll || false;
    
    const dataSet = [
        {element:'card'},
        {headerText : 'Top Deals', products  : top_deals_product,colors:PIGGY,type:'today-deals',subcat:'' },
        {headerText : 'Featured Products', products  : featured,colors:SKY,type:'featured',subcat:''},
    ];

    const showLoader = isObjectEmpty(shopProducts) && shopProductApiCalled === true;

    useEffect(()=>{
        isFocused && fetchShopProducts(prodParams);
    },[isFocused]);

    useEffect(()=>{
        if(willExploreAll)exploreAllProd();
    },[willExploreAll]);

    const exploreAllProd = () => navigation.navigate('ProductList',{productDetails:{type:'',subcat:'',cat:'',sort:'ranking'}});
    const dynamicProd = product_list.filter(x=>x.type  === 'product-data');


    const renderData = () =>(
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                dataSet.map((product,i)=>{
                    // console.log(product)

                    if(product.element)
                        return(
                            <LinearGradient colors={VISION} end={{x: 1, y: 0}} start={{x: 0, y: 0}} style={[GlobalStyles.primaryCard,styles.gradientBox]}>
                                <Text style={styles.textProd}>We have a wide variety of Products for you to explore.</Text>
                                <DefaultButton buttonStyle={styles.btnTextStyles} buttonText={'Explore All Products'} onPress={exploreAllProd} showLoader={false} textStyle={styles.btnTextStyles} type={'outline'}  />
                            </LinearGradient>
                        );
                    return(
                        <CardLayout 
                            key={i} 
                            layoutContainerStyles={{marginBottom:moderateScale(10)}} 
                            product={product}
                        />
                    );
                })
            }
            {
                dynamicProd.map((product,i)=>{
                    const {see_more_button : {type = product?.type},products=product?.products,header_title=product?.headerText,category =product?.cat,subcategory=product?.subcat} = product;
                    
                    product.headerText=header_title;
                    product.products=products;
                    product.type=type;
                    product.subcat=category=='sculptures'?category:subcategory ;
                    product.cat=category=='sculptures'?'':category;
                    product.colors = COLOR_SHADES[Math.floor(Math.random() * COLOR_SHADES.length)];
                    return(
                        <CardLayout 
                            key={i} 
                            layoutContainerStyles={{marginBottom:moderateScale(10)}} 
                            product={product}
                        />
                    );
                })
            }
        </ScrollView>
    );

    const renderLoader = () =>(
        <ScreenLoader text={'Fetching Products'} />
    );

    if (!isInternetAvailable)
        return <NoInternet />;
    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'My Shop'} showBackButton={false} />
            {showLoader ? renderLoader() : renderData() }
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {
        shopData: state.shop,
        isInternetAvailable: state.InternetConnectivity.isConnected
    };
};
const mapDispatchToProp = (dispatch) => ({
    fetchShopProducts:(data)=>
        dispatch(ShopActions.fetchShopProducts(data)),
});

ShopScreen.propTypes = {
    fetchShopProducts:PropTypes.func.isRequired,
    isInternetAvailable: PropTypes.bool.isRequired,
    navigation:PropTypes.object.isRequired,
    route: PropTypes.object,
    shopData:PropTypes.object.isRequired,
};

export default connect(mapStateToProps,mapDispatchToProp)(ShopScreen);

export const styles = StyleSheet.create({
    textProd:{
        maxWidth:'55%'
    },
    gradientBox:{
        borderRadius:0,
        padding:moderateScale(10),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:moderateScale(8)
    },
    btnTextStyles:{
        color:WHITE,
        borderColor:WHITE,
        fontWeight:'bold'
    }
});