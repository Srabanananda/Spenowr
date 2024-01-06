/**
 * Created By @name Sukumar_Abhijeet
 */

import React from 'react';
import {TouchableOpacity,View,Text, StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Config from '../../@Config/default';

const {COLOR:{APP_PINK_COLOR,LIGHTGREY}} = Config;

const ModalHeader = ({headerText = 'Modal',textProps,headerStyle, size=22, onPress, children, showClose=true} : any) =>{
    return(
        <View 
            style={[styles.headerStyle,headerStyle]}>
            <Text style={{fontSize:moderateScale(14),fontWeight:'bold',color:APP_PINK_COLOR}} {...textProps} >{headerText}</Text>
            {
                children ? children : showClose ? 
                    <TouchableOpacity onPress={onPress} style={{padding:moderateScale(5),paddingHorizontal:moderateScale(10)}}>
                        <Icon color={LIGHTGREY} name={'times'} size={moderateScale(size)}  />
                    </TouchableOpacity> : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    headerStyle:{
        flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:moderateScale(6)
    }
});


export default ModalHeader;