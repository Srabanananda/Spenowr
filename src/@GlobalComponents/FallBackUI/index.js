/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../@GlobalStyles';
import ContactAdmin from '../../@Screens/@Core/Tabs/Profile/ContactAdmin';

const fallbackText = 'Oops, Something went wrong here!';

const FallBackUI = ({ error, resetError }) =>(
    <View style={{padding:moderateScale(10)}}>
        <Text style={GlobalStyles.fallbackHead}>{fallbackText}</Text>
        <Text style={GlobalStyles.fallbackError}>{'Sorry, we are not able to load this content. Please contact to admin and try later.'}</Text>
        <View style={{alignSelf:'center'}}>
            <ContactAdmin />
        </View>
    </View>
);

export default FallBackUI;