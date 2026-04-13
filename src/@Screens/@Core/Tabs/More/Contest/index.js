/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { Platform } from 'react-native';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import ContestList from './ContestList';
import ContestRules from './ContestRules/index';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContestScreen = () =>{
    return(
        <SafeAreaView edges={['left', 'right']} style={{flex:1}}>
            <DefaultHeader headerText={'Contests List'} >
                {Platform.OS === 'ios' && <ContestRules />}
            </DefaultHeader>
            <ContestList />
        </SafeAreaView>
    );
};

export default ContestScreen;