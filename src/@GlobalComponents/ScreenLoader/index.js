/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenLoader = ({text = '',customStyles={}}) =>{
    return(
        <SafeAreaView edges={['left', 'right']} style={{flex:1,justifyContent:'center',alignItems:'center',...customStyles}}>
            <ActivityIndicator color={'#cd2121'} size={'small'} />
            <Text style={{marginTop:moderateScale(10),fontSize:moderateScale(10)}}>{text}</Text>
        </SafeAreaView>
    );
};

export default ScreenLoader;