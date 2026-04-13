/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {Text,TouchableOpacity} from 'react-native';
import { GlobalStyles } from '../../@GlobalStyles';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import {addItemToCart} from '../../@Endpoints/Core/Tabs/Shop';
import { ActivityIndicator } from 'react-native-paper';
import Config from '@Config/default';
import Toast from 'react-native-simple-toast';
import { connect,useDispatch } from 'react-redux';
import * as shopActions from '@Redux/actions/shopActions';

const {COLOR:{APP_PINK_COLOR}} = Config;

const AddToCart = ({...props}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {
        productId, selectedVariant, variance_enable, isAddedToCart, onAddCallback,
        cartItemsNumber, textStyles, buttonStyles, indicatorColor, currency, disabled
    } = props;

    const [added, setAdded] = useState(isAddedToCart > 0 ? true : false);
    const [loader, setLoader] = useState(false);

    const add = () => {
        if (disabled) return; // Prevent action if disabled
        added ? navigation.navigate('Cart', { selectedCurency: currency }) : callApi();
    };

    const callApi = () => {
        setLoader(true);
        addItemToCart(productId, selectedVariant, variance_enable)
            .then((r) => {
                if (r?.data?.response_msg == 'Product NOt Available.') {
                    setAdded(false);
                    Toast.show('Product Not Available.');
                } else {
                    setAdded(true);
                    dispatch(shopActions.updateCartItemNumber(cartItemsNumber + 1));
                    onAddCallback?.();
                }
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

    const buttonText = added ? 'Go To Cart' : 'Add To Cart';

    return (
        <TouchableOpacity
            disabled={loader || disabled}
            onPress={() => add()}
            style={[buttonStyles ? buttonStyles : GlobalStyles.seeMoreButton, disabled && { opacity: 0.5 }]}
        >
            {loader ? (
                <ActivityIndicator color={indicatorColor ? indicatorColor : APP_PINK_COLOR} size={'small'} />
            ) : (
                <Text style={textStyles ? textStyles : GlobalStyles.seeMoreButtonText}>{buttonText}</Text>
            )}
        </TouchableOpacity>
    );
};

AddToCart.propTypes = {
    buttonStyles: PropTypes.object,
    cartItemsNumber: PropTypes.number.isRequired,
    indicatorColor: PropTypes.string,
    isAddedToCart: PropTypes.number,
    onAddCallback: PropTypes.func,
    productId: PropTypes.string.isRequired,
    textStyles: PropTypes.object,
    selectedVariant: PropTypes.object,
    variance_enable: PropTypes.bool,
    currency: PropTypes.any,
    disabled: PropTypes.bool,
};

function mapStateToProps(state){
    return{
        cartItemsNumber : state.shop.cartItemsNumber
    };
}

export default connect(mapStateToProps)(AddToCart);