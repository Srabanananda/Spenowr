/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect, useState} from 'react';
import {View,TouchableOpacity,TextInput,Text} from 'react-native';
import FormHeader from '../../../../@GlobalComponents/FormHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GlobalStyles } from '../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import PropTypes from 'prop-types';
import Config from '@Config/default';
 
const { COLOR:{APP_PINK_COLOR,SUBNAME}} = Config;
 
const RedeemReward = ({...props}) =>{

    const {
        redeemData:{reward_message='',reward_ammount='', status='failed'},
        couponData:{coupon_code=''},refreshData,
        total_price_witout_shipping_price
    } = props;

    const message = reward_ammount === '0.00' ? '*You dont have sufficient reward amount to apply' : message;
 
    const [show,setShow] = useState(false);
    const [redeemAmt, setRedeemAmt] = useState('');
    const [isDisabled, setIsDisabled] = useState(reward_ammount==='0.00');

    const checkReward = () =>{
        if(redeemAmt.length) refreshData(coupon_code,redeemAmt);
    };

    useEffect(()=>{
        if(reward_message.length) setShow(true);
        if(status === 'success') setIsDisabled(true);
    },[]);

    const accordianChild = () =>{
        return(
            <>
                {
                    show &&
                    <View>
                        <TextInput 
                            onChangeText = {(value)=>{
                                if(isDisabled) setIsDisabled(false);
                                setRedeemAmt(value);
                            }}
                            placeholder  = {'Enter a redeem amount'}
                            style={GlobalStyles.textInput}
                            value={redeemAmt}
                        />
                        {message ? <Text style={{color : status === 'success' ? 'green' : 'red'}}>{message}</Text> : null}
                        <Text style={{fontSize:12,color: SUBNAME}}>YOU CAN REDEEM ONLY WITH A MINIMUM PURCHASE VALUE OF 500 (EXCLUDING SHIPPING FEE)</Text>
                        <DefaultButton buttonText={'Apply'} isDeactivated={isDisabled || parseInt(total_price_witout_shipping_price) < 500} onPress={checkReward} showLoader={false} />
                    </View>
                }
            </>
        );
    };

    const onPress = () => setShow(!show);
 
    return(
        <View style={{marginTop:moderateScale(5)}}>
            <FormHeader accordianChild={accordianChild} headerText={'Redeem Reward'} onPress={onPress} outlined >
                <TouchableOpacity onPress={onPress}>
                    <Icon color={APP_PINK_COLOR} name={!show ? 'chevron-down' : 'chevron-up'} size={24} />
                </TouchableOpacity>
            </FormHeader>
        </View>
    );
};
 
RedeemReward.propTypes = {
    couponData : PropTypes.object.isRequired,
    redeemData:  PropTypes.object.isRequired,
    refreshData : PropTypes.func.isRequired,
    total_price_witout_shipping_price : PropTypes.number.isRequired
};
 
 
export default RedeemReward;