/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles';
import { resendEmailLink } from './ContactInfo';
import PropTypes from 'prop-types';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';

const VerifyEmailAlert = ({verifyText='Your Email is not verified !!',showOnlyButton,onPressButton,...props}) =>{

    const {userObj:{userProfile:{ email_verify}}} = props;
    if(email_verify === '0')
        return(
            <>
                {
                    showOnlyButton ? 
                        <TouchableOpacity
                            onPress={()=>{
                                onPressButton?.();
                                resendEmailLink();
                            }} style={[GlobalStyles.seeMoreButtonRev,{alignSelf:'center',paddingHorizontal:moderateScale(10),paddingVertical:moderateScale(6)}]}>
                            <Text style={[GlobalStyles.seeMoreButtonTextRev,{fontSize:moderateScale(16)}]}>Resend Email</Text>
                        </TouchableOpacity> 
                        :
                        <View style={styles.AlertContainer}>
                            <Text style={styles.notVerifiedText}>{verifyText}</Text>
                            <TouchableOpacity
                                onPress={()=>{
                                    onPressButton?.();
                                    resendEmailLink();
                                }} style={styles.verifyNow}>
                                <Text style={styles.verifyNowText}>Resend Email</Text>
                            </TouchableOpacity>
                        </View>
                }
            </>
        );
    return null;
};

const mapStateToProps = (state) => {
    return {
        userObj: state.userObj,
    };
};

VerifyEmailAlert.propTypes = {
    onPressButton:PropTypes.func,
    showOnlyButton:PropTypes.any,
    userObj:PropTypes.object.isRequired,
    verifyText:PropTypes.string,
};


export default connect(mapStateToProps)(VerifyEmailAlert);