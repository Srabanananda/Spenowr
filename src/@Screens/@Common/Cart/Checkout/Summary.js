/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,TouchableOpacity} from 'react-native';
import FormHeader from '../../../../@GlobalComponents/FormHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CartItem from '../../../../@GlobalComponents/CartItem';
import PropTypes from 'prop-types';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';

const { COLOR:{APP_PINK_COLOR}} = Config;

const Summary = ({...props}) =>{
    const {itemList,refreshData} = props;
    const [show,setShow] = useState(true);

    const accordianChild = () =>{
        return(
            <>
                {
                    show &&
                   <View>
                       {itemList.map((item,i)=><CartItem containerStyles={{marginTop:moderateScale(10),marginBottom:itemList.length-1===i ? moderateScale(10):0}} item={item} key={i} refreshData={refreshData} />)}
                   </View>
                }
            </>
        );
    };

    const onPress = () => setShow(!show);

    return(
        <View style={{marginVertical:moderateScale(5)}}>
            <FormHeader accordianChild={accordianChild} headerText={'Order Summary'} onPress={onPress} outlined >
                <TouchableOpacity onPress={onPress}>
                    <Icon color={APP_PINK_COLOR} name={!show ? 'chevron-down' : 'chevron-up'} size={24} />
                </TouchableOpacity>
            </FormHeader>
            
        </View>
    );
};

Summary.propTypes = {
    itemList : PropTypes.array.isRequired,
    refreshData : PropTypes.func.isRequired,
};

export default Summary;