/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {Text,TouchableOpacity} from 'react-native';
import { GlobalStyles } from '../../@GlobalStyles';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import {getBuyAgainDetails} from '../../@Endpoints/Core/Tabs/Shop';
import { ActivityIndicator } from 'react-native-paper';
import Config from '@Config/default';
import Toast from 'react-native-simple-toast';
import { connect,useDispatch } from 'react-redux';
import * as shopActions from '@Redux/actions/shopActions';
 
const {COLOR:{APP_PINK_COLOR}} = Config;
 
const BuyAgain = ({...props}) =>{
 
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {
        textStyles,buttonStyles,indicatorColor,
        orderId,onAddCallback, cartItemsNumber
    } = props;
    
    const [loader, setLoader]  = useState(false);
    
    const buyAgain = () =>{
        setLoader(true);
        getBuyAgainDetails(orderId)
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
        <TouchableOpacity disabled={loader}  onPress={()=>buyAgain()} style={buttonStyles ? buttonStyles :  GlobalStyles.seeMoreButton}>
            {
                loader ? 
                    <ActivityIndicator color={indicatorColor? indicatorColor : APP_PINK_COLOR} size={'small'}  /> : 
                    <Text style={textStyles ? textStyles : GlobalStyles.seeMoreButtonText}>Buy Again</Text>
            }
        </TouchableOpacity>
    );
};
 
BuyAgain.propTypes = {
    buttonStyles:PropTypes.object,
    cartItemsNumber:PropTypes.number.isRequired,
    indicatorColor:PropTypes.string,
    onAddCallback:PropTypes.func,
    orderId:PropTypes.string.isRequired,
    textStyles:PropTypes.object,
};
function mapStateToProps(state){
    return{
        cartItemsNumber : state.shop.cartItemsNumber
    };
}
 
export default connect(mapStateToProps)(BuyAgain);