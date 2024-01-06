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
  
const BuyNow = ({...props}) =>{
  
    const navigation = useNavigation();
    const dispatch = useDispatch();
 
    const {
        children,customStyles={},
        productId,onAddCallback, cartItemsNumber
    } = props;
     
    const [loader, setLoader]  = useState(false);
     
    const buyNow = () =>{
        setLoader(true);
        getBuyNowDetails(productId)
            .then(()=>{
                dispatch(shopActions.updateCartItemNumber(cartItemsNumber+1));
                onAddCallback?.();
                navigation.navigate('CartCheckout');
            })
            .catch(()=>{
                Toast.show('Oops something went wrong');
            })
            .finally(()=>{
                setLoader(false);
            });
    };
  
    return(
        <TouchableWithoutFeedback disabled={loader}  onPress={()=>buyNow()}>
            <View style={customStyles}>
                {loader ? <ActivityIndicator color={APP_PINK_COLOR} size={'small'} />  : children}
            </View>
        </TouchableWithoutFeedback>
    );
};
  
BuyNow.propTypes = {
    cartItemsNumber:PropTypes.number.isRequired,
    children:PropTypes.node.isRequired,
    customStyles:PropTypes.any.isRequired,
    onAddCallback:PropTypes.func,
    productId:PropTypes.string.isRequired,
};
function mapStateToProps(state){
    return{
        cartItemsNumber : state.shop.cartItemsNumber
    };
}
  
export default connect(mapStateToProps)(BuyNow);