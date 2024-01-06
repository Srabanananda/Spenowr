/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { SafeAreaView,Text} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';

const ScreenLoader = ({text = '',customStyles={}}) =>{
    return(
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center',...customStyles}}>
            <ActivityIndicator color={'#cd2121'} size={'small'} />
            <Text style={{marginTop:moderateScale(10),fontSize:moderateScale(10)}}>{text}</Text>
        </SafeAreaView>
    );
};

export default ScreenLoader;