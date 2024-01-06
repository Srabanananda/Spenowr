/**
 *  Created By @name Sukumar_Abhijeet
 */

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput, Keyboard
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Toast from 'react-native-simple-toast';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import { moderateScale } from 'react-native-size-matters';
import { getDonateMoney } from '../../../../../@Endpoints/Core/Tabs/More';
import Config from '@Config/default';
import * as userActions from '@Redux/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DefaultButton from '../../../../../@GlobalComponents/DefaultButton';

const {COLOR:{WHITE,BLACK}} = Config;
const CurrencyTypes = [
    {name : '-- Select Currency --',value : '-- Select Currency --'},
    {name : 'INR',value : 'INR'},
    {name : 'USD',value : 'USD'},
];
const Donate = ({...props}) =>{

    const { navigation, user_details,route } = props;
    const { params: {username, useremail} } = route;
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(username);
    const [email, setEmail] = useState(useremail);
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('-- Select Currency --');
    const [comment, setComment] = useState('');
    // console.log('user_details : ', JSON.stringify(user_details));
    const onPressDonate = () => {
        
        Keyboard.dismiss();
        if(!name.length) {
            Toast.show('Please Enter name');
            return;
        }

        if(!email.length) {
            Toast.show('Please Enter Email id');
            return;
        }
        if(currency == '-- Select Currency --') {
            Toast.show('Please select the Currency');
            return;
        }
        Donate();
    }


    const Donate = () =>{
        setLoading(true);
        let formData = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        formData.append('mobile',phone);
        formData.append('application',"true");
        formData.append('donate_cost',amount);
        formData.append('currency',currency == 'INR' ? 1 : currency == 'USD' ? 2 : 1);
        formData.append('comment',comment);
        formData.append('returnUrl','https://www.spenowr.com/donate-empower-artists/donate-success/');
        formData.append('notifyUrl','https://www.spenowr.com/account/my-profile');
        getDonateMoney(formData)
            .then(res=>{
                setLoading(false);
                const {status,data:{paymentLink=""}} = res;
                let arr = paymentLink.split('/')
                let ID = arr[arr.length-1]
                const { data: { payment_list } } = res;
                console.log('Donate payment_list : ', JSON.stringify(payment_list));
                if(status == "success"){
                    navigation.navigate('ProductPay',{ payload: payment_list })
                }
            })
            .catch(()=>{
                setLoading(false);
                Toast.show('No details Found',Toast.LONG);
                navigation.goBack();
            });
    };

    return(
        <SafeAreaView style={styles.container}>
            <DefaultHeader headerText={'Donate'} showBackButton={true} />
            <ScrollView contentContainerStyle={{paddingBottom:moderateScale(50)}} showsVerticalScrollIndicator={false}>
                <View style={styles.ComponentView}>
                    <KeyboardAvoidingView behavior="padding">
                        <Text style={GlobalStyles.inputHeaderName}>NAME
                            <Text style={GlobalStyles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            keyboardType="ascii-capable" 
                            onChangeText={setName} 
                            onSubmitEditing={() => this.userEmail.focus()}
                            placeholder="Name" 
                            returnKeyType="next" 
                            style={GlobalStyles.textInput} 
                            value={name} />
                        <Text style={GlobalStyles.inputHeaderName}>EMAIL
                            <Text style={GlobalStyles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            keyboardType="email-address" 
                            onChangeText={setEmail} 
                            onSubmitEditing={() => this.phoneNo.focus()}
                            placeholder="Email id" 
                            ref={(ref) => this.userEmail = ref}
                            returnKeyType="done" 
                            style={GlobalStyles.textInput} 
                            value={email} />
                        <Text style={GlobalStyles.inputHeaderName}>PHONE NUMBER</Text>
                        <TextInput 
                            keyboardType="ascii-capable" 
                            onChangeText={setPhone} 
                            onSubmitEditing={() => this.currency.focus()}
                            placeholder="Phone number" 
                            ref={(ref) => this.phoneNo = ref} 
                            returnKeyType="next" 
                            style={GlobalStyles.textInput} 
                            value={phone} />
                        <Text style={GlobalStyles.inputHeaderName}>DONATION CURRENCY
                            <Text style={GlobalStyles.starColor}>*</Text>
                        </Text>
                        <View style={GlobalStyles.dropDownView}>
                            <Dropdown
                                containerStyle={{padding: moderateScale(5)}}
                                data={CurrencyTypes}
                                fontSize={12}
                                onChangeText={value => setCurrency(value)}
                                pickerStyle={{paddingHorizontal:moderateScale(10)}}
                                selectedItemColor={BLACK}
                                value={currency}
                            />
                        </View>
                        <Text style={GlobalStyles.inputHeaderName}>DONATION AMOUNT</Text>
                        <TextInput 
                            keyboardType="number-pad" 
                            onChangeText={setAmount} 
                            onSubmitEditing={() => this.commentInput.focus()}
                            placeholder="Donation Amount" 
                            ref={(ref) => this.DonateAMt = ref} 
                            returnKeyType="next" 
                            style={GlobalStyles.textInput} 
                            value={amount} />
                        <Text style={GlobalStyles.inputHeaderName}>COMMENT</Text>
                        <TextInput 
                            keyboardType="ascii-capable" 
                            multiline={true}
                            onChangeText={setComment} 
                            placeholder="Comment" 
                            ref={(ref) => this.commentInput = ref} 
                            style={GlobalStyles.textArea} 
                            value={comment} />
                        <DefaultButton buttonText={'DONATE'} onPress={onPressDonate} showLoader={loading}  />
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

Donate.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    updateUserDetails:PropTypes.func.isRequired,
    user_details:PropTypes.object.isRequired,
    userObj: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user_details: state.userObj.userProfile,
    };
};

const mapDispatchToProp = (dispatch) => ({
    updateUserDetails:(instituteObj,profileObj) =>
        dispatch(userActions.updateUserDetails(instituteObj,profileObj)),
    updatePublicUserDetails:(profileObj)=>dispatch(userActions.updateUserDetails(profileObj))
});

export default connect(mapStateToProps,mapDispatchToProp)(Donate);

const styles = StyleSheet.create({
    container: {
        backgroundColor: WHITE,
        flex: 1,
    },
    ComponentView:{
        paddingHorizontal:moderateScale(20),
        paddingTop:moderateScale(30)
    },
});
