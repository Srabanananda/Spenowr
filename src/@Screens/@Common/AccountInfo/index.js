/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {SafeAreaView,View,Text,ScrollView,TouchableOpacity,TextInput, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../@GlobalStyles';
import { getCountry, getState, getCountryId,getStateId } from '../../../@Utils/helperFiles/CardDetails';
import { getAccountType } from '../../@Core/Tabs/Profile/Details/InfoCard';
import moment from 'moment';
import PropTypes from 'prop-types';
import GLOBALJSON from '@Assets/JsonFiles/global.json';
import DatePicker from 'react-native-datepicker';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import { moderateScale } from 'react-native-size-matters';
import { Dropdown } from 'react-native-material-dropdown';
import {updateProfileAccountDetails} from '../../../@Endpoints/Core/Tabs/EditProfile';
import { getUserDetails } from '../../../@Endpoints/Auth';
import * as userActions from '@Redux/actions/userActions';
import usePlan from '../../../@Utils/customHooks/usePlans';

const {
    data:{
        country : COUNTRY_LIST
    }
} = GLOBALJSON;

const GENDER_LIST = [
    {value : 'Male'},
    {value : 'Female'},
    {value : 'None'}
];

const AccountInfoScreen = ({...props}) =>{
    const {
        AccountData, updateUserDetails,
        userObj:{ userProfile:{subscription_plan,subscription_last_date='',}},
        navigation,
    } = props;
    const{
        email,city,my_referal_code,date_of_birth,
        country,mobile,state,street_address,
        first_name,last_name,email_verify,
        account_type ,gender, earned_point,
        account_sub_type
    } = AccountData;

    const [showEditForm, setShowEditForm] = useState(false);

    const {name : CountryName = '',value : CountryValue = ''} = getCountry(country)  || {};
    const {value : StateName = '',value : StateValue} = getState(country,state);

    const DOB = new Date(date_of_birth);
    const DateOfBirth = date_of_birth ? moment(DOB).format('MMMM Do YYYY') : '';
    
    const [firstName, setFirstName] = useState(first_name);
    const [lastName, setLastName] = useState(last_name);
    const [userCity, setCity] = useState(city);
    const [mobileNum, setMobile] = useState(mobile ? mobile : '');
    const [address, setAddress] = useState(street_address);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(CountryValue);
    const [selectedState, setSelectedState] = useState(StateValue);
    const [selectedDob, setSelectedDob] = useState(date_of_birth);
    const [selectedGender, setSelectedGender] = useState(gender === '1'  ? 'Male' : gender === '2' ?  'Female' : '');
    const [loader,setLoader] = useState(false);

    const currentPlan = usePlan(subscription_plan);
    const expiryDate = moment(subscription_last_date).format('MMMM Do YYYY') === 'Invalid date' ? '' : `Expires on : ${moment(subscription_last_date).format('MMMM Do YYYY')}`  ; 

    const details = [
        {detailName : 'First Name', detailValue :first_name ,subText:'' },
        {detailName : 'Last Name', detailValue :last_name ,subText:''},
        {detailName : 'Gender', detailValue : selectedGender,subText:''},
        {detailName : 'Date Of Birth', detailValue : DateOfBirth ? DateOfBirth : '' ,subText:''},
        {detailName : 'Subscription', detailValue : currentPlan?.label || '' ,subText:expiryDate},
        {detailName : 'Email', detailValue :email ,subText:email_verify === '1' ? 'Verified' : 'Not Verified'},
        {detailName : 'Account Type', detailValue :getAccountType(account_type) ,subText:''},
        {detailName : 'Country', detailValue :CountryName,subText:''},
        {detailName : 'State', detailValue :StateName ,subText:''},
        {detailName : 'City', detailValue :city ,subText:''},
        {detailName : 'Street Address', detailValue :street_address ,subText:''},
        {detailName : 'Mobile', detailValue :mobile ,subText:''},
        {detailName : 'Referal Code', detailValue :my_referal_code ,subText:''},
        {detailName : 'Earned Points', detailValue :earned_point ,subText:''},
    ];

    useEffect(()=>{
        checkState(CountryValue,false);
    },[]);

    const checkState = (selected,setDefault =true) =>{
        setSelectedCountry(selected);
        setDefault && setSelectedState('-- Select State --');
        const val = COUNTRY_LIST.find((x)=>x.value === selected);
        if(val)
            setStates(val.state_list);
    };

    const renderEachDetail = (item,index) =>{
        const {detailName,detailValue, subText=''} = item;
        return(
            <View key={index} style={styles.parentBox}>
                <Text style={styles.detailNameText}>{detailName}</Text>
                <View style={styles.internalBox}>
                    <Text style={styles.detailValueText}>{detailValue}</Text>
                    {subText ? <Text style={styles.subText}>{subText}</Text> : null }
                </View>
            </View>
        );
    };

    const refreshProfile = () =>{
        getUserDetails()
            .then(res=>{
                const {data:{institute={},profileData={}}} = res;
                updateUserDetails(institute,profileData);
                setShowEditForm(false);
                setLoader(false);
            })
            .catch();
    };

    const editDetails = () =>{
        if(isNaN(mobileNum) || mobileNum.length !== 10)
            Toast.show('Please provde a valid mobile number');
        else if(selectedCountry === '')
            Toast.show('Please select a country');
        else if(userCity === '')
            Toast.show('Please enter city');
        else if(selectedDob === '' || selectedDob === '0000-00-00' || selectedDob === undefined)
            Toast.show('Please enter valid date of birth');
        else if(selectedGender === '')
            Toast.show('Please select your gender');
        else if(firstName === '')
            Toast.show('Please enter first name');
        else if(lastName === '')
            Toast.show('Please enter last name');
        else{
            setLoader(true);
            const countryID = getCountryId(selectedCountry);
            const data = new FormData();
            data.append('first_name',firstName);
            data.append('last_name',lastName);
            data.append('account_type',account_type);
            data.append('account_sub_type',account_sub_type);
            data.append('city',userCity);
            data.append('mobile',mobileNum);
            data.append('streetAddress',address);
            data.append('country',countryID);
            data.append('state',getStateId(countryID,selectedState));
            data.append('date_of_birth',selectedDob);
            data.append('gender',selectedGender === 'Male' ? '1' : selectedGender === 'Female' ? '2' : null);
            data.append('profile_image',null);
            updateProfileAccountDetails(data)
                .then(()=>{
                    Toast.show('Details Updated Successfully');
                    refreshProfile();
                })
                .catch(()=>{
                    Toast.show('Oops Something went Wrong');
                    setLoader(false);
                });
        }
    };

    const renderEditForm = () =>{
        return(
            <View>
                <Text style={GlobalStyles.inputHeaderName}>FIRST NAME 
                    <Text style={GlobalStyles.starColor}> *</Text>
                </Text>
                <TextInput 
                    onChangeText = {(value)=>setFirstName(value)}
                    placeholder  = {'Enter your first name'}
                    style={GlobalStyles.textInput}
                    value={firstName}
                />
                <Text style={GlobalStyles.inputHeaderName}>LAST NAME 
                    <Text style={GlobalStyles.starColor}> *</Text>
                </Text>
                <TextInput 
                    onChangeText = {(value)=>setLastName(value)}
                    placeholder  = {'Enter your last name'}
                    style={GlobalStyles.textInput}
                    value={lastName}
                />
                <Text style={GlobalStyles.inputHeaderName}>GENDER
                    <Text style={GlobalStyles.starColor}> *</Text>
                </Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={GENDER_LIST}
                        fontSize={12}
                        onChangeText={(value)=>setSelectedGender(value)}
                        value={selectedGender}
                    />
                </View>
                <Text style={GlobalStyles.inputHeaderName}>DATE OF BIRTH
                    <Text style={GlobalStyles.starColor}> *</Text>
                </Text>
                <DatePicker
                    cancelBtnText="Cancel"
                    confirmBtnText="Confirm"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 10,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 60,
                            height:30
                        }
                    }}
                    date={selectedDob}
                    format="YYYY-MM-DD"
                    mode="date"
                    onDateChange={(date) => setSelectedDob(date)}
                    placeholder="select date"
                    style={{width: 200}}
                />
                <Text style={GlobalStyles.inputHeaderName}>COUNTRY
                    <Text style={GlobalStyles.starColor}> *</Text>
                </Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={COUNTRY_LIST}
                        fontSize={12}
                        onChangeText={(value)=>checkState(value)}
                        value={selectedCountry}
                    />
                </View>
                <Text style={GlobalStyles.inputHeaderName}>STATE
                    <Text style={GlobalStyles.starColor}> *</Text>
                </Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={states}
                        fontSize={12}
                        onChangeText={(value)=>setSelectedState(value)}
                        value={selectedState}
                    />
                </View>
                <Text style={GlobalStyles.inputHeaderName}>CITY 
                    <Text style={GlobalStyles.starColor}> *</Text>
                </Text>
                <TextInput 
                    onChangeText = {(value)=>setCity(value)}
                    placeholder  = {'Enter your city name'}
                    style={GlobalStyles.textInput}
                    value={userCity}
                />
                <Text style={GlobalStyles.inputHeaderName}>MOBILE 
                    <Text style={GlobalStyles.starColor}> *</Text>
                </Text>
                <TextInput 
                    onChangeText = {(value)=>setMobile(value)}
                    placeholder  = {'Enter your mobile number'}
                    style={GlobalStyles.textInput}
                    value={mobileNum}
                />

                <Text style={GlobalStyles.inputHeaderName}>STREET ADDRESS</Text>
                <TextInput 
                    multiline={true}
                    onChangeText = {(value)=>setAddress(value)}
                    placeholder  = {'Enter street address'}
                    style={{...GlobalStyles.textInput,height:moderateScale(100)}}
                    value={address}
                />

            </View>
        );
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Account Info'}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Subscription',{current:subscription_plan,selected:subscription_plan})} style={[GlobalStyles.seeMoreButton,{marginRight:10}]}>
                        <Text style={GlobalStyles.seeMoreButtonText}>Upgrade Plan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={loader} onPress={()=>showEditForm ? editDetails() : setShowEditForm(true)} style={GlobalStyles.seeMoreButton}>
                        {
                            loader ? <ActivityIndicator color={'#000'} size='small' /> : <Text style={GlobalStyles.seeMoreButtonText}>{showEditForm ? 'Update Now' : 'Edit'}</Text>
                        }
                    </TouchableOpacity>
                </View>
            </DefaultHeader>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {!showEditForm && details.map((item,index)=>(
                    renderEachDetail(item,index)
                ))}
                {showEditForm && renderEditForm()}
            </ScrollView>
        </SafeAreaView>
    );
};

function mapStateToProps(state){
    return{
        AccountData : state.userObj.userProfile,
        userObj : state.userObj
    };
}

const mapDispatchToProp = (dispatch) => ({
    updateUserDetails:(instituteObj,profileObj) =>
        dispatch(userActions.updateUserDetails(instituteObj,profileObj)),
});

AccountInfoScreen.propTypes = {
    AccountData:PropTypes.object.isRequired,
    updateUserDetails:PropTypes.func.isRequired,
    userObj:PropTypes.object.isRequired,
};

export default connect(mapStateToProps,mapDispatchToProp)(AccountInfoScreen);