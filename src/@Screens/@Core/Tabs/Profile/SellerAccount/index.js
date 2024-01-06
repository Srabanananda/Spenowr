/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState } from 'react';
import {SafeAreaView,View,Text,TouchableOpacity} from 'react-native';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';

import Config from '@Config/default';
import RequestForm from './RequestForm';
import { moderateScale } from 'react-native-size-matters';
import SellerProductsList from './SellerProducts/ProductList';
import SellerReceivedOrder from './Orders';
import { useStore } from 'react-redux';
import DeletedProductList from './SellerProducts/ProductList/DeletedProductList';
const {COLOR:{APP_PINK_COLOR,DARKGRAY,DARK_BLACK}} = Config;

const tabs = [
    {name : 'My Products',value : 'Products'},
    {name : 'Received Orders', value : 'Orders'},
    // {name : 'Deleted Products', value : 'Deleted'}
];

const SellerProfileScreen = ({...props}) =>{
    const {route:{params:{mode}}} = props;

    const store = useStore();
    const {userObj:{userProfile:{
        seller_profile
    }}} = store.getState();
    
    const [selectedTab, setSelectedTab] = useState('Products');
    const [sellerProfile, setSellerProfile] = useState(seller_profile);

    const renderEachTab = (tab,index) =>{
        return (
            <TouchableOpacity 
                key={index}
                onPress={()=>setSelectedTab(tab.value)} 
                style={{padding:moderateScale(10),paddingHorizontal:moderateScale(15),borderBottomColor:APP_PINK_COLOR,borderBottomWidth:tab.value === selectedTab ? 1.5 :0}}
            >
                <Text style={{fontSize:moderateScale(11),fontWeight:'bold',color : tab.value === selectedTab ? DARK_BLACK  : DARKGRAY}}>{tab.name}</Text>
            </TouchableOpacity>
        );
    };

    const renderSelectedTabData = () =>{
        switch(selectedTab)
        {
        case  'Products' : 
            return <SellerProductsList mode={mode} />;
        case  'Orders' : 
            return <SellerReceivedOrder />;
        case  'Deleted' : 
            return <DeletedProductList mode={mode} />;
        default : 
            return null;
        }
    };

    const renderViewSelection = () =>{
        if(sellerProfile === '1')
            return(
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                        {tabs.map((item,index)=>(renderEachTab(item,index)))}
                    </View>
                    <View style={{flex:1}}>
                        {renderSelectedTabData()}
                    </View>
                </View>
            );
        if(sellerProfile === '2')
            return (
                <>
                    <Text style={{alignSelf:'center',marginTop:moderateScale(20),textAlign:'center',}}>{'You have successfully submitted your '}</Text>
                    <Text style={{alignSelf:'center',marginTop:moderateScale(4),textAlign:'center'}}>{'"Enable Seller Profile" request to Spenowr.'}</Text>
                    <Text style={{alignSelf:'center',marginTop:moderateScale(10),textAlign:'center'}}>Please wait for review and approval.</Text>
                </>
            );
        return <RequestForm setSellerProfile={setSellerProfile} />;
    };

    return(
        <SafeAreaView style={{flex:1}}>
            <DefaultHeader headerText={mode === 'PRIVATE' ? 'My Shop' : 'Products'} />
            {
                mode === 'PRIVATE' ?  renderViewSelection() : renderSelectedTabData()
            }
        </SafeAreaView>
    );
};

export default SellerProfileScreen;