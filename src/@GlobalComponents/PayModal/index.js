/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useImperativeHandle,forwardRef} from 'react';
import {View,Text,StyleSheet,Platform} from 'react-native';
import Modal from 'react-native-modal';
import DefaultButton from '../DefaultButton';
import ModalHeader from '../ModalHeader';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import ScreenLoader from '../ScreenLoader';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

const {COLOR:{SUBNAME}} = Config;

const PayModal = forwardRef((props, ref) =>{
    const {
        onWebCheckoutPressed,
        onUpiCheckoutPressed,
        loader,
        showCancelUI,
        showVerifyUI,
        showUPI,
        showWEB,
    } = props;

    const navigation = useNavigation();

    const [isActive, setIsActive] = useState( Platform.OS === 'ios' ? false :  true);

    useImperativeHandle(ref, () => ({
        dismissModal() {
            setIsActive(false);
        }
    }));

    const buttonProps = (type) => {
        let propObj = {
            showLoader : false,
        };
        type === 'WEB' ? 
            propObj =  {
                buttonText : 'WEB CHECKOUT',
                onPress : onWebCheckoutPressed
            } : 
            propObj =  {
                buttonText : 'UPI CHECKOUT',
                onPress : onUpiCheckoutPressed
            };

        return propObj;
    };

    const getModalHeader = () =>{
        return showCancelUI ? 'Payment Cancelled' : showVerifyUI ? 'Verifying' :  'Select Payment Mode';
    };

    const renderPaymentMode = () =>(
        <>
            {
                showWEB ? 
                    <DefaultButton 
                        {...buttonProps('WEB')}
                        buttonStyle = {{width:'80%'}}
                        showLoader={false}
                        textStyle = {{fontSize:12}}
                    /> : null
            }
            {
                showUPI ? 
                    <DefaultButton 
                        {...buttonProps('UPI')}
                        buttonStyle = {{width:'80%'}}
                        showLoader={false}
                        textStyle = {{fontSize:12}}
                    /> : null
            }
            <Text style={styles.noBackPressText}>Please dont press back button</Text>
        </>
    );

    const renderCancelUI = () =>{
        return(
            <>
                <Text>Oops! The Payment has been Cancelled</Text>
                <DefaultButton
                    buttonStyle = {{width:'25%',alignSelf:'center'}} 
                    buttonText={'Close Payment'} onPress={onClosePayment}  showLoader={false}
                    textStyle = {{fontSize:12}} />
            </>
        );
    };

    const onClosePayment = () =>{
        navigation.pop();
        setIsActive(false);
        navigation.goBack();
    };

    const renderOptions = () =>(
        <>
            <ModalHeader headerText={getModalHeader()} onPress={onClosePayment} showClose={showCancelUI} />
            <View style={styles.optionWrapper}>
                {showCancelUI ? renderCancelUI() : showVerifyUI ?  renderLoader()  : renderPaymentMode()}
            </View>
        </>
    );

    const getLoaderText = () =>{
        return showVerifyUI ? 'Verifying with server Please wait' : 'Initiating Payment Process';
    };

    const renderLoader = () => (<ScreenLoader text={getLoaderText()} />);

    const renderContent = () =>{
        return(
            <View style={{backgroundColor:'#fff',minHeight:moderateScale(300),padding:moderateScale(10)}}>
                {loader ? renderLoader() : renderOptions()}
            </View>
        );
    };

    return(
        <View>
            <Modal
                backdropColor={'#000'}
                dismissable={false}
                hasBackdrop={true}
                isVisible={isActive}
                style={styles.modalWrapper}
                useNativeDriver={true}
            >
                {renderContent()}
            </Modal>
        </View>
    );
});


PayModal.propTypes = {
    loader:PropTypes.bool.isRequired,
    loaderText:PropTypes.string,
    onUpiCheckoutPressed:PropTypes.func.isRequired,
    onWebCheckoutPressed:PropTypes.func.isRequired,
    showCancelUI:PropTypes.bool.isRequired,
    showVerifyUI:PropTypes.bool.isRequired,
};

export default PayModal;
const styles = StyleSheet.create({
    modalWrapper:{margin:0,padding:0,position:'absolute',bottom:0,width:'100%'},
    noBackPressText:{alignSelf:'center',marginTop:moderateScale(10),fontSize:moderateScale(10),color:SUBNAME},
    optionWrapper:{justifyContent:'center',alignItems:'center',height:'100%'}
});