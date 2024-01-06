/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import DefaultHeader from '../../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../../@GlobalStyles';
import ChangePassword from './ChangePassword';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import DeleteAccount from './DeleteAccount';

const { COLOR: { LIGHTGREY } } = Config;

const UserSettingsScreen = ({ ...props }) => {

    const { navigation } = props;

    const options = [
        { name: 'Change Password', route: '' },
        { name: 'View Account Info', route: 'AccountInfo' },
        { name: 'Shipping Address', route: 'ShippingAddress' },
        { name: 'Bank Account Details', route: 'BankAccount' },
        { name: 'Delete Account', route: '' },
    ];

    const checkNavigation = (route) => {
        navigation.navigate(route);
    };

    const renderOptions = (option,i) => {

        switch (option?.name) {
        case options[0]?.name:
            return <ChangePassword key={i} />;

        case options[4]?.name:
            return <DeleteAccount key={i} />;

        default:
            return (
                <TouchableOpacity key={i} onPress={() => checkNavigation(option.route)} style={GlobalStyles.optionsBox}>
                    <Text>{option.name}</Text>
                    <Icon color={LIGHTGREY} name={'angle-right'} size={moderateScale(16)} />
                </TouchableOpacity>
            );
        }
    };

    return (
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'User Settings'} />
            <View style={styles.container}>
                {options.map((eachOption, i) => (renderOptions(eachOption, i)))}
            </View>
        </SafeAreaView>
    );
};

UserSettingsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default UserSettingsScreen;