/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {SafeAreaView,TouchableOpacity} from 'react-native';
import DefaultHeader from '../../../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import MyServices from './MyServices';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ServicesScreen = ({...props}) =>{
    const {navigation,route:{params:{mode}}} = props;
    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={mode === 'PRIVATE' ? 'My Services' : 'Services'} />
            <MyServices mode={mode} />
            {
                (mode === 'PRIVATE') &&
                (
                    <TouchableOpacity onPress={() => navigation.navigate('AddServices')} style={GlobalStyles.AddButton}>
                        <Icon color={'#fff'} name={'plus'} size={20} />
                    </TouchableOpacity>
                )
            }
        </SafeAreaView>
    );
};

export default ServicesScreen;