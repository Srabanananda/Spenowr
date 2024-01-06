/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { Platform, SafeAreaView} from 'react-native';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import ContestList from './ContestList';
import ContestRules from './ContestRules/index';

const ContestScreen = () =>{
    return(
        <SafeAreaView style={{flex:1}}>
            <DefaultHeader headerText={'Contests List'} >
                {Platform.OS === 'ios' && <ContestRules />}
            </DefaultHeader>
            <ContestList />
        </SafeAreaView>
    );
};


export default ContestScreen;