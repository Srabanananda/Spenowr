/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { SafeAreaView,TouchableOpacity,Text,View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import Config from '@Config/default';
import { WEB_URLS } from '../../../../../constants/WebUrls';

const {COLOR:{DARKGRAY,LIGHTGREY,WHITE}} = Config;

const options = [
    { title: 'Data Policy', route: 'CommonWebView',data:{ 'URI': WEB_URLS.data_policy, 'ScreenTitle': 'Data Policy' } },
    { title: 'FAQ', route: 'CommonWebView',data:{ 'URI': WEB_URLS.faq, 'ScreenTitle': 'FAQ' } },
    { title: 'How to', route: 'CommonWebView',data:{ 'URI': WEB_URLS.how_to, 'ScreenTitle': 'How to ' } },
    { title: 'Term\'s & Condition', route: 'CommonWebView',data:{'URI' : WEB_URLS.terms_n_conditions,'ScreenTitle': 'Terms And Conditions'} },
    { title: 'About Us', route: 'CommonWebView',data:{ 'URI': WEB_URLS.about_us, 'ScreenTitle': 'About Us' } }
];

const SupportScreen = ({...props}) =>{
    const {navigation} = props;
    
    return(
        <SafeAreaView style={{flex:1,backgroundColor:WHITE}}>
            <DefaultHeader headerText={'Support'} />
            <View style={{padding:moderateScale(20)}}>
                {
                    options.map((item,index)=>(
                        <TouchableOpacity 
                            key={index} 
                            onPress={()=>navigation.navigate(item.route,item.data)} 
                            style={{paddingVertical:moderateScale(20),borderBottomColor:LIGHTGREY,borderBottomWidth:1,flexDirection:'row',justifyContent:'space-between'}}
                        >
                            <Text>{item.title}</Text>
                            <Icon color={DARKGRAY} name={'angle-right'} size={moderateScale(16)} />
                        </TouchableOpacity>
                    ))
                }
            </View>
        </SafeAreaView>
    );
};

SupportScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
};

export default SupportScreen;