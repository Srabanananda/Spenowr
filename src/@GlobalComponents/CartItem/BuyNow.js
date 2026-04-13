/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {TouchableWithoutFeedback,View} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import {getBuyNowDetails} from '../../@Endpoints/Core/Tabs/Shop';
import { ActivityIndicator } from 'react-native-paper';
import Config from '@Config/default';
import Toast from 'react-native-simple-toast';
import { connect,useDispatch } from 'react-redux';
import * as shopActions from '@Redux/actions/shopActions';
  
const {COLOR:{APP_PINK_COLOR}} = Config;

const BuyNow = ({...props}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {
        children, customStyles = {}, productId, onAddCallback,
        cartItemsNumber, selectedVariant, variance_enable, disabled
    } = props;

    const [loader, setLoader] = useState(false);

    const buyNow = () => {
        if (disabled) return; // Prevent action if disabled
        setLoader(true);
        getBuyNowDetails(productId, selectedVariant, variance_enable)
            .then((res) => {
                dispatch(shopActions.updateCartItemNumber(cartItemsNumber + 1));
                onAddCallback?.();
                navigation.navigate('CartCheckout');
            })
            .catch((error) => {
                Toast.show('Oops something went wrong');
                if (error.response) {
                    console.log('response error===>', error.response.data);
                } else if (error.request) {
                    console.log('Request Error==>', error.request);
                } else {
                    console.log('Error', error.message);
                }
            })
            .finally(() => {
                setLoader(false);
            });
    };

    return (
        <TouchableWithoutFeedback disabled={loader || disabled} onPress={() => buyNow()}>
            <View style={[customStyles, disabled && { opacity: 0.5 }]}>
                {loader ? <ActivityIndicator color={APP_PINK_COLOR} size={'small'} /> : children}
            </View>
        </TouchableWithoutFeedback>
    );
};

BuyNow.propTypes = {
    cartItemsNumber: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    customStyles: PropTypes.any.isRequired,
    onAddCallback: PropTypes.func,
    productId: PropTypes.string.isRequired,
    selectedVariant: PropTypes.object,
    variance_enable: PropTypes.bool,
    disabled: PropTypes.bool, // Add disabled prop
};
function mapStateToProps(state){
    return{
        cartItemsNumber : state.shop.cartItemsNumber
    };
}
  
export default connect(mapStateToProps)(BuyNow);