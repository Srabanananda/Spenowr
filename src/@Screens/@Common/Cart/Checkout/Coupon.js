/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect, useState} from 'react';
import {View,TouchableOpacity,TextInput,Text} from 'react-native';
import FormHeader from '../../../../@GlobalComponents/FormHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GlobalStyles } from '../../../../@GlobalStyles';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { isObjectEmpty } from '@Utils/helperFiles/isObjectEmpty';
import Config from '@Config/default';

const { COLOR:{APP_PINK_COLOR}} = Config;

const Coupon = ({...props}) =>{
    const {couponData,refreshData}  = props;

    const {message='',status='',coupon_code=''} = couponData;
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(()=>{
        if(status === 'success') setIsDisabled(true);
    },[]);

    const [show,setShow] = useState(!isObjectEmpty(couponData));
    const [couponText, setCouponText] = useState(coupon_code);

    const checkCoupon = () =>{
        if(couponText.length) refreshData(couponText);
        else Toast.show('Please Enter a coupon');
    };

    const accordianChild = () =>{
        return(
            <>
                {
                    show &&
                    <View>
                        <TextInput 
                            onChangeText = {(value)=>{
                                if(isDisabled) setIsDisabled(false);
                                setCouponText(value);
                            }}
                            placeholder  = {'Enter a coupon code'}
                            style={GlobalStyles.textInput}
                            value={couponText}
                        />
                        {message ? <Text style={{color : status === 'success' ? 'green' : 'red'}}>{message}</Text> : null}
                        <DefaultButton buttonText={'Apply'} isDeactivated={isDisabled} onPress={()=>checkCoupon()} showLoader={false} />
                    </View>
                }
            </>
        );
    };

    const onPress = () => setShow(!show);

    return(
        <View>
            <FormHeader accordianChild={accordianChild} headerText={'Got a coupon ?'} onPress={onPress} outlined >
                <TouchableOpacity onPress={onPress}>
                    <Icon color={APP_PINK_COLOR} name={!show ? 'chevron-down' : 'chevron-up'} size={24} />
                </TouchableOpacity>
            </FormHeader>
        </View>
    );
};

Coupon.propTypes = {
    couponData : PropTypes.object.isRequired,
    refreshData : PropTypes.func.isRequired,
};


export default Coupon;