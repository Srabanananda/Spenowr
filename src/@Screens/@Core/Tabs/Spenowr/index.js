/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { SafeAreaView,TouchableOpacity,Text,View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import Config from '@Config/default';
import DefaultHeader from '../../../../@GlobalComponents/DefaultHeader';

const {COLOR:{DARKGRAY,LIGHTGREY}} = Config;

const SpenowrScreen = () =>{
    return(
        <SafeAreaView style={{flex:1}}>
            <DefaultHeader headerText={'Spenowr'} showBackButton={false} />
        </SafeAreaView>
    );
};  

SpenowrScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
};

export default SpenowrScreen;