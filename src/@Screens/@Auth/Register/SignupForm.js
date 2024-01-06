/**
 *  Modified By @name Sukumar_Abhijeet
 */
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Alert
} from 'react-native';
import CheckBox from 'react-native-check-box';
import Toast from 'react-native-simple-toast';
import { Dropdown } from 'react-native-material-dropdown';
import Constant from '../../../constants/Constant';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../@GlobalStyles';
import styles from './styles';
import InitiateAuthentication from '../../../@Utils/helperFiles/Authentication';
import { withNavigation } from '@react-navigation/compat';
import { connect, useStore } from 'react-redux';
import * as userActions from '../../../@Redux/actions/userActions';
import APP_CONSTANT from '../../../constants/Constant';
import { isEmailValid,getKeysFromObj } from '../../../@Utils/helperFiles/helpers';
import { Keyboard } from 'react-native';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import {version} from '../../../../package.json';
import { registerUser, requestOtp } from '../../../@Endpoints/Auth';
import OtpVerify from './OtpVerify';
import Phone from '../../@Common/Phone';

const {
    INDIVIDUAL_ARTIST,
    ART_CRAFT_BUSINESS,
    ART_INSTITUTE,
    ART_LOVER
} = Constant.STRING_CONSTANT;

const arrUserType = [
    {value:INDIVIDUAL_ARTIST, type:'1'},
    {value:ART_CRAFT_BUSINESS,type:'2'},
    {value:ART_INSTITUTE,type:'3'},
    {value:ART_LOVER,type:'4'}
];

type SingupFormProps = {
    route: Object
}

const SignupForm = ({...props}:SingupFormProps) =>{

    const {more:{subscriptions: STORE_SUBSCRIPTIONS}} = useStore()?.getState();

    const navigation = useNavigation();
    const isFocused =  useIsFocused();
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [businessName, setBusinessName ] = useState('');
    const [instName, setInstName] = useState('');
    const [pass, setPass] = useState('');
    const [referral, setReferral] = useState('');
    const [isChecked, setIsChecked] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [loading, setLoading] = useState(false);
    const [Alert_Visibility, setAlert_Visibility] = useState(true);
    const [selectedPlan, setSelectedPlan]  = useState(getKeysFromObj(STORE_SUBSCRIPTIONS)[0]);
    const [country, setCountry] = useState();
    const [isOtpActive, setIsOtpActive] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState();
    const userIdRef = useRef();

    useEffect(()=>{
        if(isFocused && props.route.params) setSelectedPlan(props.route?.params?.newPlan);
    },[isFocused]);

    const  callUserRegistration = (account) => {
        setLoading(true);
        const data =  new FormData();
        data.append('first_name',fName);
        data.append('last_name',lName);
        if(phone.length !== 0){
            data.append('mobile',phone);
            data.append('code', countryCode);
        }else {
            data.append('email',email);
        }
        data.append('password',pass);
        data.append('confirm_pass',pass);
        data.append('chkbox',true);
        data.append('id','101');
        data.append('who_refered',referral);
        data.append('account_type', account.type);
        data.append('login_type','1');
        data.append('user_url_id',Math.floor(Math.random() * 90000) + 10000),
        data.append('business_name',businessName);
        data.append('external_login_id','');
        data.append('facebook_profile_url','');
        data.append('google_profile_url','');
        data.append('institute_name',instName);
        data.append('recaptchaReactive','');
        data.append('application',true);
        data.append('plan', selectedPlan);
        data.append('app_version',version);
        registerUser(data)
            .then((resp)=>{
                const {data:{
                    status='failed',
                    response_msg='Something went wrong',
                    user_id,
                    register_status
                }} =resp;
                console.log("register response : ", resp);
                userIdRef.current = user_id;
                if(register_status === '3' && phone != ""){                    
                    requestOtp(user_id)
                        .then(()=>{
                            setIsOtpActive(true);
                        })
                        .catch(()=>Toast.show('Oops Couldnot request otp'))
                        .finally(()=>setLoading(false));
                }
                else {
                    if (status === 'success') {
                        Toast.show('Registration Successful!, Logging you in ..');
                        let loginParams = {email : phone.length !== 0 ? `${countryCode}${phone}` : email,password : pass};
                        InitiateAuthentication(loginParams,true,setLoading,props,{},setIsOtpActive);
                    } 
                    else {
                        setLoading(false);
                        Alert.alert(response_msg);
                    }
                }
            })
            .catch(() => {
                Alert.alert(APP_CONSTANT.STRING_CONSTANT.COMMON_ERROR_MSG);
            });
    };

    const validateData = () =>{
        Keyboard.dismiss();
        if(!fName.length) {
            Toast.show('Please Enter First name');
            return;
        }

        if(!lName.length) {
            Toast.show('Please Enter Last name');
            return;
        }

        if (email!='' && !isEmailValid(email)) {
            Toast.show('Please add a valid email');
            return;
        }

        if(email == '' && countryCode==null){
            if(!country) Toast.show('Please select your country');
            return;
        }

        if(phone != '' && phone.length != 10 && countryCode!=null){
            if(!country) Toast.show('Please add a valid Phone');
            return;
        }

        if(!pass.length) {
            Toast.show('Please add Password');
            return;
        }

        if(!isChecked) {
            Toast.show('Please accept the term and conditions.');
            return;
        }

        if(!selectedAccount.length)
        {
            Toast.show('Please select an account type');
            return;
        }
            
        callUserRegistration(arrUserType.find((x)=>x.value === selectedAccount));
    };

    const  Show_Custom_Alert = (value) => {
        setSelectedAccount(value);
        setAlert_Visibility(false);
    };

    const renderUserTypes =()=> (
        <Modal
            animationType={'fade'}
            transparent={false}
            visible={Alert_Visibility} >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.HeaderTextStyle}> Who are you? </Text>
                <View style={styles.Alert_Main_View}>
                    <View style={{ flexDirection: 'row', height: '40%' }}>
                        <TouchableOpacity
                            onPress={() => { Show_Custom_Alert('INDIVIDUAL ARTIST'); }}
                            style={styles.buttonStyle} >
                            <Text style={styles.TextStyle}> INDIVIDUAL ARTIST </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { Show_Custom_Alert('ART CRAFT BUSINESS'); }}
                            style={styles.buttonStyle} >
                            <Text style={styles.TextStyle}> ART CRAFT BUSINESS </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', height: '40%',marginTop:moderateScale(8) }}>
                        <TouchableOpacity
                            onPress={() => { Show_Custom_Alert('ART INSTITUTE'); }}
                            style={styles.buttonStyle}
                        >
                            <Text style={styles.TextStyle}> ART INSTITUTE </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { Show_Custom_Alert('VISITOR/BUYER'); }}
                            style={styles.buttonStyle}
                        >
                            <Text style={styles.TextStyle}>VISITOR/BUYER </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    const renderInputs = () =>(
        <>
            <TextInput 
                onChangeText={(value) => setFName(value)} 
                placeholder="First Name" 
                placeholderTextColor="#414756"  
                returnKeyType="next"  
                style={GlobalStyles.textInput}
            />
            <TextInput 
                onChangeText={(value) => setLName(value)} 
                placeholder="Last Name" 
                placeholderTextColor="#414756"  
                returnKeyType="next" style={GlobalStyles.textInput} />

            <View style={GlobalStyles.dropDownView}>
                <Dropdown
                    data={arrUserType}
                    fontSize={moderateScale(12)}
                    onChangeText={value => setSelectedAccount(value)}
                    value={selectedAccount}
                />
            </View>
            { selectedAccount !== ART_LOVER ? renderPlans() : null}

            {
                selectedAccount === ART_CRAFT_BUSINESS ? 
                    <TextInput 
                        onChangeText={(value) => setBusinessName(value)} 
                        placeholder="Business Name" 
                        placeholderTextColor="#414756" 
                        returnKeyType="next" 
                        style={GlobalStyles.textInput}
                        value={businessName} />
                    : null
            }
            {
                selectedAccount === ART_INSTITUTE ? 
                    <TextInput 
                        onChangeText={(value) => setInstName(value)} 
                        placeholder="Institute/Organization Name" 
                        placeholderTextColor="#414756" 
                        returnKeyType="next" 
                        style={GlobalStyles.textInput}
                        value={instName} />
                    : null
            }


            {/* {
                showCountry &&
                <TouchableOpacity onPress={()=>setOpenCountry(true)} style={[GlobalStyles.textInput,{justifyContent:'center'}]}>
                    <CountryPicker
                        {...{
                            countryCode : country?.cca2 ?? '',
                            withFilter : true,
                            withFlag : true,
                            withCallingCode : true,
                            onSelect,
                        }}
                        visible={openCountry}
                    />
                </TouchableOpacity>
            }
            <TextInput 
                autoCapitalize='none' 
                onChangeText={(value) => {
                    setEmailOrPhone(value);
                    if(isNaN(value))setShowCountry(false);
                    else setShowCountry(true);
                }} 
                placeholder="Email or Phone Number" 
                placeholderTextColor="#414756" 
                returnKeyType="next" 
                style={GlobalStyles.textInput} /> */}
            <Phone countryCode={setCountryCode} phone={setPhone} email={setEmail}/>

            <TextInput 
                onChangeText={(value) => setPass(value)} 
                placeholder="Password"  
                placeholderTextColor="#414756" 
                secureTextEntry={true}  
                style={GlobalStyles.textInput}  
                textContentType={'password'} 
                value={pass}  />

            <TextInput 
                onChangeText={(value) => setReferral(value)} 
                placeholder="Referral Code"  
                placeholderTextColor="#414756" 
                secureTextEntry={true}  
                style={GlobalStyles.textInput}  
                value={referral}  />

            <View style={styles.checkboxContainer}>
                <CheckBox
                    isChecked={isChecked}
                    onClick={() => {
                        setIsChecked(!isChecked);
                    }}
                    style={styles.checkbox}
                />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>I agree the</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('TermsAndCond')} >
                        <Text style={styles.termConditionText}>terms and condition</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );

    const renderPlans =()=>{
        return(
            <>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('Subscription',{current:selectedPlan,fromReg:true})} 
                    style={[GlobalStyles.textInput,styles.planBox]}>
                    <Text style={{color:'#414756'}} > Subscription :  {STORE_SUBSCRIPTIONS[selectedPlan]?.label}</Text>
                    <Text style={styles.changeText} >Change</Text>
                </TouchableOpacity>
            </>
        );
    };

    const onVerifyCallBack = () => {
        let loginParams = {email : phone.length !== 0 ? `${countryCode}${phone}` : email,password : pass}
        InitiateAuthentication(loginParams,true,setLoading,props,{},setIsOtpActive);
    };

    return (
        <View style={styles.container} >
            {renderUserTypes()}
            {renderInputs()}
            <DefaultButton buttonText={'Sign Up'} onPress={validateData} showLoader={loading} />
            <OtpVerify isActive={isOtpActive} onVerifyCallBack={onVerifyCallBack} setIsActive={setIsOtpActive} userId={userIdRef.current} />
        </View>
    );
};



const mapStateToProps =() =>{
    return {
    };
};
const  mapDispatchToProp =(dispatch)=>({
    updateUserAccessToken:token =>
        dispatch(userActions.updateUserAccessToken(token)),
    updateUserDetails:(instituteObj,profileObj) =>
        dispatch(userActions.updateUserDetails(instituteObj,profileObj))
});


export default connect(mapStateToProps,mapDispatchToProp)(withNavigation(SignupForm));