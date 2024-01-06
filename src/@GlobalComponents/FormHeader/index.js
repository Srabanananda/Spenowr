/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';

const FormHeader = ({headerText,children,outlined,accordianChild, onPress, containerStyle={}}) =>{

    const getHeaderStyles = () =>{        
        return outlined ?  styles.formHeaderOutlined : styles.formHeader;
    };

    return(
        <TouchableWithoutFeedback onPress={onPress} >
            <View style={ {...getHeaderStyles(),...containerStyle}}>
                <View style={styles.justifyAlign}>
                    <Text style={outlined ?  styles.headerTextOutlined : styles.headerText}>{headerText}</Text>
                    {children ? children : null}
                </View>
                {accordianChild && accordianChild()}
            </View>
        </TouchableWithoutFeedback>
    );
};

FormHeader.propTypes = {
    accordianChild: PropTypes.func,
    children:PropTypes.node,
    containerStyle:PropTypes.object,
    headerText:PropTypes.string.isRequired,
    onPress:PropTypes.func,
    outlined:PropTypes.bool,
};

export default FormHeader;