/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DefaultButton from '../../../../../@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import * as homeActions from '@Redux/actions/homeActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HOME_FILTERS } from '../../../../../assets/JsonFiles/HomeFilters';

const _ = require('lodash');
let FILTER_MOCK = _.cloneDeep(HOME_FILTERS);

const filterData = {
    searchText : '',
    appliedModules:FILTER_MOCK
};

const Logout = ({...props}) =>{

    const {updateFilters, showConfirmation = true} = props;

    const navigation = useNavigation();
    const logoutAlert = () => {
        Alert.alert(
            'Are You sure',
            'Do you want to logout?',
            [
                { text: 'NO', style: 'cancel' },
                { text: 'YES', onPress: () => checkUser() },
            ]
        );
    };

    const checkUser = () => {
        updateFilters(filterData);
        navigation.reset({
            index: 0,
            routes: [{ name: 'AuthStack',params:{logout:true}}]
        });
    };

    return(
        <DefaultButton 
            buttonStyle={{paddingVertical:moderateScale(15)}} 
            buttonText={'LOGOUT'} onPress={()=> showConfirmation ? logoutAlert() : checkUser() } 
            showLoader={false}
        />
    );
};

Logout.propTypes = {
    updateFilters:PropTypes.func.isRequired,
};

function mapStateToProps(){
    return{};
}

function mapDispatchToProps(dispatch){
    return{
        updateFilters:data =>
            dispatch(homeActions.updateFilters(data))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Logout);