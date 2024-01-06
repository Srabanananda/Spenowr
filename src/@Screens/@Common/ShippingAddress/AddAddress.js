/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {
    View,TouchableOpacity, StyleSheet,SafeAreaView, 
    Text, TextInput, ScrollView,Keyboard
} from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { moderateScale } from 'react-native-size-matters';
import ModalHeader from '../../../@GlobalComponents/ModalHeader';
import { Dropdown } from 'react-native-material-dropdown';
import GLOBALJSON from '@Assets/JsonFiles/global.json';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import Toast from 'react-native-simple-toast';
import { getCountry, getState, getStateId } from '../../../@Utils/helperFiles/CardDetails';
import { addShippingAddress, updateShippingAddress } from '../../../@Endpoints/Core/Tabs/Shop';
import CheckBox from '@react-native-community/checkbox';
import PropTypes from 'prop-types';
import { getCountryId } from '../../../@Utils/helperFiles/CardDetails';

const {data:{country : COUNTRY_LIST}} = GLOBALJSON;

const ADDRESS_TYPES = [
    {name : 'home', value : 'Home'},
    {name : 'work', value : 'Work'}
];

const AddAddressForm = ({...props}) =>{

    const {showAddButton, onAddComplete, EditData : EDIT_DATA, onClose} = props;
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [contact, setContact] = useState('');
    const [altContact, setAltContact] = useState('');
    const [slectedCountry, setSelectedCountry] = useState('');
    const [stateList, setStateList] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [city, setCity] = useState('');
    const [landmark, setLandmark] = useState('');
    const [addressType, setAddressTyle] = useState('');
    const [loader, setLoader] = useState(false);
    const [isDefault,setIsDefault] = useState(false);
    const [EditData, setEditData] = useState(EDIT_DATA);

    useEffect(()=>{
        if(EDIT_DATA)
        {
            const {address,alt_contact_number,city,contact_number,delivery_type,country:countryId,landmark,name,pin,state,} = EDIT_DATA;
            const {value : countryName} = getCountry(countryId);
            const {value:stateName} = getState(countryId,state);
            resetData(address,alt_contact_number,city,contact_number,countryName,delivery_type.toUpperCase(),landmark,name,pin,stateName);
            setEditData(EDIT_DATA);
            setIsActive(true);
        }
    },[EDIT_DATA]);

    const onModalClose = () =>{
        setIsActive(false);
        resetData(); 
        onClose(getCountryId(slectedCountry))
    };

    const getFormData = () =>{
        const data = new FormData();
        const countryID = getCountryId(slectedCountry);
        data.append('name',name);
        data.append('pin',pincode);
        data.append('contact_number',contact);
        data.append('alt_contact_number',altContact);
        data.append('country',countryID);
        data.append('state',getStateId(countryID,selectedState));
        data.append('city',city);
        data.append('landmark',landmark);
        data.append('delivery_type',addressType.toLocaleLowerCase());
        data.append('address',address);
        data.append('default_address',isDefault);
        return data;
    };

    const callAddApi = (data) =>{
        addShippingAddress(data)
            .then(()=>{
                Toast.show('Address Added Successfully');
                onAddComplete?.();
                setTimeout(()=>{
                    resetData();
                    setIsActive(false);
                    onClose(getCountryId(slectedCountry))
                },600);
            })
            .catch(()=>{
                Toast.show('Oops Couldnot add address');
            })
            .finally(()=>{
                setLoader(false);
            });
    };

    const callEditApi = (data) =>{
        data.append('shipping_id', EditData.shipping_id);
        updateShippingAddress(data)
            .then(()=>{
                Toast.show('Address Updated Successfully');
                onAddComplete?.();
                setTimeout(()=>{
                    resetData();
                    setIsActive(false);
                    onClose(getCountryId(slectedCountry))
                },600);
            })
            .catch(()=>{
                Toast.show('Oops couldnot update address');
            })
            .finally(()=>{
                setLoader(false);
            });
    };

    const resetData = (
        address='',
        alt_contact_number='',
        city='',
        contact_number='',
        country='',
        delivery_type='',
        landmark='',
        name='',
        pin='',
        state='',
    ) =>{
        setName(name);
        setAddress(address);
        setPincode(pin);
        setContact(contact_number);
        setAltContact(alt_contact_number);
        setSelectedCountry(country);
        setSelectedState(state);
        setCity(city);
        setLandmark(landmark);
        setAddressTyle(delivery_type);
    };

    const checkState = (value) => {
        setSelectedState('');
        setSelectedCountry(value);
        const {state_list} = COUNTRY_LIST.find(item => item.value === value);
        setStateList(state_list);
    };

    const validateData = () =>{
        Keyboard.dismiss();
        if(name==='' || address ==='' || pincode === '' || contact === '' || slectedCountry==='' || selectedState === '' || addressType=== '' )
        {
            Toast.show('Please Fill all required fields');
        }
        else
        {
            const data = getFormData();
            setLoader(true);
            EditData ? callEditApi(data)  : callAddApi(data);
        }
    };

    const renderAddAddress = () =>{
        return(
            <SafeAreaView style={styles.modalContainer}>
                <ModalHeader headerStyle={{paddingHorizontal:10}} headerText={EditData ? 'Update Address' :'Add Address'} onPress={()=>onModalClose()}  />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Text style={GlobalStyles.inputHeaderName}>NAME
                            <Text style={GlobalStyles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            onChangeText = {(value)=>setName(value)}
                            placeholder  = {'Enter a name'}
                            style={GlobalStyles.textInput}
                            value={name}
                        />
                        <Text style={GlobalStyles.inputHeaderName}>ADDRESS
                            <Text style={GlobalStyles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            multiline={true}
                            onChangeText = {(value)=>setAddress(value)}
                            placeholder  = {'Enter area/street address'}
                            style={{...GlobalStyles.textInput,height:moderateScale(100),textAlignVertical:'top'}}
                            value={address}
                        />
                       
                        <Text style={GlobalStyles.inputHeaderName}>MOBILE NUMBER
                            <Text style={GlobalStyles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            keyboardType={'numeric'}
                            onChangeText = {(value)=>setContact(value)}
                            placeholder  = {'Enter contact number'}
                            style={GlobalStyles.textInput}
                            value={contact}
                        />

                        
                        <Text style={GlobalStyles.inputHeaderName}>ALTERNATE NUMBER</Text>
                        <TextInput 
                            keyboardType={'numeric'}
                            onChangeText = {(value)=>setAltContact(value)}
                            placeholder  = {'Enter any alternate number'}
                            style={GlobalStyles.textInput}
                            value={altContact}
                        />
                        <Text style={GlobalStyles.inputHeaderName}>COUNTRY
                            <Text style={GlobalStyles.starColor}> *</Text>
                        </Text>
                        <View style={GlobalStyles.dropDownView}>
                            <Dropdown
                                data={COUNTRY_LIST}
                                fontSize={12}
                                onChangeText={(value)=>checkState(value)}
                                value={slectedCountry}
                            />
                        </View>
                        <Text style={GlobalStyles.inputHeaderName}>STATE
                            <Text style={GlobalStyles.starColor}> *</Text>
                        </Text>
                        <View style={GlobalStyles.dropDownView}>
                            <Dropdown
                                data={stateList}
                                fontSize={12}
                                onChangeText={(value)=>setSelectedState(value)}
                                value={selectedState}
                            />
                        </View>
                        <Text style={GlobalStyles.inputHeaderName}>CITY</Text>
                        <TextInput 
                            onChangeText = {(value)=>setCity(value)}
                            placeholder  = {'Enter your city name'}
                            style={GlobalStyles.textInput}
                            value={city}
                        />
                        <Text style={GlobalStyles.inputHeaderName}>LANDMARK</Text>
                        <TextInput 
                            onChangeText = {(value)=>setLandmark(value)}
                            placeholder  = {'Enter a landmark'}
                            style={GlobalStyles.textInput}
                            value={landmark}
                        />
                        <Text style={GlobalStyles.inputHeaderName}>ZIPCODE
                            <Text style={GlobalStyles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            keyboardType={'number-pad'}
                            onChangeText = {(value)=>setPincode(value)}
                            placeholder  = {'Enter address pincode'}
                            style={GlobalStyles.textInput}
                            value={pincode}
                        />
                        <Text style={GlobalStyles.inputHeaderName}>ADDRESS TYPE
                            <Text style={GlobalStyles.starColor}>*</Text>
                        </Text>
                        <Dropdown
                            data={ADDRESS_TYPES}
                            fontSize={12}
                            onChangeText={(value)=>setAddressTyle(value)}
                            value={addressType}
                        />
                        <View style={{flexDirection:'row',marginTop:moderateScale(8),alignItems:'center'}}>
                            <CheckBox
                                onValueChange={(newValue) => {
                                    setIsDefault(newValue);
                                }}
                                value={isDefault}
                            />
                            <Text style={{...styles.inputHeaderName,marginTop:0,marginLeft:moderateScale(8)}}>Set this as Default Address</Text>
                        </View>
                        <DefaultButton buttonText={EditData ? 'Update' :'Save'} onPress={()=>validateData()} showLoader={loader} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    };

    const renderAddButton = ()=>{
        if(showAddButton)
            return(
                <TouchableOpacity
                    onPress={() => {
                        setEditData(null);
                        setIsActive(true);
                    }} style={GlobalStyles.AddButton}>
                    <Icon color={'#fff'} name={'plus'} size={20} />
                </TouchableOpacity>
            );
        return(
            <TouchableOpacity
                onPress={() => {
                    setEditData(null);
                    setIsActive(true);
                }}  style={{...GlobalStyles.seeMoreButtonRev}}>
                <Text style={GlobalStyles.seeMoreButtonTextRev} >Add Address</Text>
            </TouchableOpacity>
           
        );
    };

    return(
        <View>
            {renderAddButton()}
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={isActive}
                onBackButtonPress= {()=>{
                    setIsActive(false); 
                }}
                onBackdropPress = {()=>{
                    setIsActive(false); 
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderAddAddress()}
            </Modal>
        </View>
    );
};

AddAddressForm.propTypes = {
    EditData:PropTypes.any,
    onAddComplete:PropTypes.func,
    showAddButton: PropTypes.any,
};

export default AddAddressForm;

const styles = StyleSheet.create({
    modalContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff',
        padding:moderateScale(15),
    },
    container:{
        padding:moderateScale(10),
        paddingBottom:moderateScale(200)
    },
});