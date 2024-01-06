/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {TouchableOpacity,Text} from 'react-native';
import Config from '@Config/default';
import { useNavigation } from '@react-navigation/native';
import { WEB_URLS } from '../../../../../../constants/WebUrls';

const {COLOR:{APP_PINK_COLOR}} = Config;

const ContestRules = () =>{

    const navigation = useNavigation();

    const rulesScreen = { title: 'Contest Rules', route: 'CommonWebView',data:{ 'URI': WEB_URLS.contest_rules, 'ScreenTitle': 'Contest Rules' } };

    return(
        <TouchableOpacity onPress={()=> navigation.navigate(rulesScreen.route,rulesScreen.data)}>
            <Text style={{color:APP_PINK_COLOR}}>Contest Rules</Text>
        </TouchableOpacity>
    );
};

export default ContestRules;
