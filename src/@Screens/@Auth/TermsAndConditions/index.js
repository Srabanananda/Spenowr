/**
 * Create By @name Sukumar_Abhijeet 
 */

import React, {useState } from 'react';
import {
    SafeAreaView,
} from 'react-native';

import { WebView } from 'react-native-webview';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';


const TermsAndConditionsScreen =()=> {
  
    const [loading, setLoading] = useState(true);
    const uri = 'https://www.spenowr.com/terms-conditions?source=mobileapp&pwd=390b89dbbdf3171a31bfad90ab9b54db';

    return(
        <SafeAreaView style={{flex:1}}>
            <DefaultHeader headerText={'Terms and Cond'} />
            <WebView
                onLoad={()=>{setLoading(false);}} 
                source={{uri: uri}}
            />
            {
                loading && (
                    <ScreenLoader text={'Loading Please Wait'} />
                )
            }
                
        </SafeAreaView>
    );
    
};

export default TermsAndConditionsScreen;