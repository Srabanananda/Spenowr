/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, {useState} from 'react';
import {View,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import DefaultButton from '../../../../../@GlobalComponents/DefaultButton';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../../@GlobalComponents/ModalHeader';
import styles from '../styles';
import VerifyEmailAlert from '../Details/VerifyEmailAlert';

const SellerProfileButton = ({mode,userObj,profileData}) =>{
    const navigation = useNavigation();
    const [modal, showModal] = useState(false);
    const {
        userProfile:{seller_profile,email_verify},
        publicUserData:{
            courses:publicServices,
            products : publicProducts,
        }
    } = userObj; 

    const  {
        services : privateServices,
    } = profileData;

    const checkShop = () =>{
        if(mode === 'PRIVATE' && email_verify === '0') showModal(true);
        else navigation.navigate('SellerProfile',{mode:mode});
    };

    const getShopButton = () =>{
        if(mode === 'PUBLIC' && !publicProducts.length) return null;
        return(
            <DefaultButton 
                buttonStyle={{width:'30%',height:moderateScale(30),marginHorizontal:moderateScale(8),paddingVertical:moderateScale(4)}} 
                buttonText={mode === 'PUBLIC' ? 'View Shop' : seller_profile === '1' ? 'View Shop' : 'Add Shop'} 
                onPress={() => checkShop()} 
                showLoader={false} 
                textStyle={{fontSize:moderateScale(12)}}  
            />
        );
    };

    const getServiceButton = () =>{
        if(mode === 'PUBLIC' && !publicServices.length) return null;
        if(mode === 'PRIVATE' && !privateServices.length) return null;
        return(
            <DefaultButton 
                buttonStyle={{width:'30%',height:moderateScale(30),marginHorizontal:moderateScale(8),paddingVertical:moderateScale(5)}} 
                buttonText={'View Services'} 
                onPress={() => navigation.navigate('ServicesScreen',{mode:mode})} 
                showLoader={false} 
                textStyle={{fontSize:moderateScale(12)}}  
            />
        );
    };

    const renderModalAlert = () =>{
        return(
            <View style={styles.adminModal}>
                <ModalHeader headerText={'Email Not Verified'} onPress={()=>showModal(false)} />
                <View style={styles.modalAlertBody}>
                    <Text style={styles.verifiedHeader}>Please verify your email, before applying to open your online shop.</Text>
                </View>
                <VerifyEmailAlert onPressButton={()=>showModal(false)} showOnlyButton verifyText={'Verify Now'} />
            </View>
        );
    };

    return(
        <View style={{flexDirection:'row',justifyContent:'center'}}>
            {getShopButton()}
            {getServiceButton()}
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={modal}
                onBackButtonPress= {()=>{
                    showModal(false); 
                }}
                onBackdropPress = {()=>{
                    showModal(false); 
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderModalAlert()}
            </Modal>
        </View>
    );
};

SellerProfileButton.propTypes = {
    mode:PropTypes.string.isRequired,
    profileData:PropTypes.object.isRequired,
    userObj:PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        userObj : state.userObj,
        profileData: state.profileData
    };
};

export default connect(mapStateToProps)(SellerProfileButton);
