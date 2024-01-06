/**
  *  Created By @name Sukumar_Abhijeet
  */
import React, { useState,useEffect } from 'react';
import {View,ScrollView,Text,RefreshControl} from 'react-native';
import styles from './styles';
import { getSellerProductList } from '../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import ScreenLoader from '../../../../../../../@GlobalComponents/ScreenLoader';
import ProductCard from './ProductCard';
import Toast from 'react-native-simple-toast';
import { moderateScale } from 'react-native-size-matters';
  
const DeletedProductList = ({mode}) =>{
 
    const [productList , setProductList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [refreshing,setRefreshing] = useState(false);
 
    useEffect(()=>{
        callApi();
    },[]);
 
    const callApi = (fromLimit = 0 , toLimit = 15) =>{
        setLoader(true);
        let formData = new FormData();
        formData.append('offset',0);
        formData.append('pageRange',15);
        formData.append('limit_from',fromLimit);
        formData.append('limit_to',toLimit);
        formData.append('type','deleted');
        getSellerProductList(formData)
            .then(res=>{
                const {data:{productData=[]}} = res;
                setProductList(productData);
                setLoader(false);
            })
            .catch(()=>{
                setLoader(false);
                Toast.show('Oops couldnot load Products',Toast.LONG);
            });
    };
 
    const onRefresh = () =>{
        setRefreshing(true);
        callApi();
        setTimeout(()=>{setRefreshing(false);},500);
    };
 
    const getList = () =>{
        if(!loader && productList.length)
            return(
                <ScrollView 
                    contentContainerStyle={{padding:moderateScale(4)}}
                    refreshControl={
                        <RefreshControl
                            onRefresh={onRefresh} refreshing={refreshing}
                            title="Refreshing .."
                            titleColor={'#000'} />
                    } 
                    showsVerticalScrollIndicator={false}
                >
                    {
                        productList.map((item,index)=>(
                            <ProductCard ProductData={item} key={index} mode={mode} refreshData={callApi} type={'deleted'} />
                        ))
                    }
                    
                </ScrollView>
            );
        if(!loader && !productList.length)
            return <Text style={{alignSelf:'center',marginTop:moderateScale(20)}}>No Products Found</Text>;
 
        return <ScreenLoader text={'Fetching Product List..'} />;
         
    };
 
 
    return(
        <View style={styles.container}>
            {getList()}
        </View>
    );
};
  
export default DeletedProductList;