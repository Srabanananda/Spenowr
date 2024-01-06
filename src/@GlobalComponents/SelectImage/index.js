/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GlobalStyles } from '../../@GlobalStyles';
import Config from '@Config/default';
import PropTypes from 'prop-types';
const {
    COLOR :{LIGHTGREY}
} = Config;

const SelectImage = ({onPress, style}) =>{
    return(
        <TouchableOpacity onPress={onPress} style={style ? style : GlobalStyles.imageSelectionBox}>
            <Icon color={LIGHTGREY} name={'plus'} size={moderateScale(30)} />
        </TouchableOpacity>
    );
};

SelectImage.propTypes = {
    onPress:PropTypes.func.isRequired,
    style:PropTypes.object,
};


export default SelectImage;
