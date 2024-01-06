/**
 *  Modified By @name Sukumar_Abhijeet
 */

import React, { Component } from 'react';
import {
    View,
    TextInput,
    KeyboardAvoidingView,
    Text
} from 'react-native';

import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import { Dropdown } from 'react-native-material-dropdown';
import country from '@Assets/JsonFiles/country.json';
import indiaState from '@Assets/JsonFiles/indiaState.json';
import USAState from '@Assets/JsonFiles/USAState.json';
import { moderateScale } from 'react-native-size-matters';
import DefaultButton from '../../../../../../../@GlobalComponents/DefaultButton';
import Toast from 'react-native-simple-toast';
import { updateProfiles } from '../../../../../../../@Endpoints/Core/Tabs/EditProfile';
import { getUserDetails } from '../../../../../../../@Endpoints/Auth';
import { getStateId } from '../../../../../../../@Utils/helperFiles/CardDetails';

class AddressInfo extends Component {
    constructor() {
        super();
        this.state = {
            selectedCountry: 'Select Country',
            selectedState: 'Select State',
            selectedCity: '',
            StreetAddress: '',
            zipCode: '',
            selectedCountryId: '',
            selectedStateId: '',
            loading:false
        };
    }

    componentDidMount() {
        this.setUpValues();
    }

    onChangeHandlerCountry = value => {
        this.setState({ selectedCountry: value });
        this.setState({selectedState:'Select State'});
    };

    onChangeHandlerState = value => {
        this.setState({ selectedState: value });
    };

    setUpValues() {
        const userDetails = this.props.user_details;
        this.setState({ selectedCity: userDetails.city });
        this.setState({ StreetAddress: userDetails.street_address });
        this.setState({ zipCode: userDetails.zipcode });
        this.setState({ selectedCountryId: userDetails.country });
        this.setState({ selectedStateId: userDetails.state });

        if (userDetails.country !== null || userDetails.country !=='' ) {
            const newArr = country.filter(data => data.country_id === userDetails.country);
            if (newArr.length > 0) {
                this.setState({ selectedCountry: newArr[0]['value'] });
            }
        }
        this.setState({ selectedState: this.getStateNameFromResponse(userDetails) });
    }

    update= () =>{
        const {
            selectedCountry,
        } = this.state;

        if(selectedCountry === 'Select Country')
            Toast.show('Please Select Country');
        
        else{
            this.setState({ loading: true });
            const { getParams } = this.props;
            const { zipCode,StreetAddress,selectedCountry,selectedState,selectedCity } = this.state;
            const apiParams = getParams();
            const data = new FormData();

            const newArr = country.filter(data => data.value === selectedCountry);
            if (newArr.length)
                apiParams.country = newArr[0]['country_id'];
           
            const stateId = getStateId(apiParams.country,selectedState);
            
            apiParams.state = stateId;
            apiParams.city = selectedCity;
            apiParams.street_address = StreetAddress;
            apiParams.zipcode = zipCode;

            for (var key in apiParams) {
                data.append(key, apiParams[key]);
            }
                
            updateProfiles(data)
                .then(() => {
                    Toast.show('Address info updated successfully!');
                    this.refreshProfile();
                    setTimeout(()=>{
                        this.props.navigation.goBack();
                    },400);
                })
                .catch(() => {
                    Toast.show('Oops Update Failed!');
                    this.setState({ loading: false });
                })
                .finally(()=>{
                    this.setState({ loading: false });
                });
        }
       
    }

    refreshProfile = () =>{
        getUserDetails()
            .then(res=>{
                const {data:{institute={},profileData={}}} = res;
                this.props.updateUserDetails(institute,profileData);
            })
            .catch();
    };

    getStateNameFromResponse(userDetails) {
        var statename = 'Select State';

        if (userDetails.country != null) {
            switch (parseInt(userDetails.country)) {
            case 1: {
                const newArr = indiaState.filter(data => data.state_id === userDetails.state);
                if (newArr.length > 0) {
                    statename = newArr[0]['value'];
                }
                break;
            }
            case 2: {
                const newArr = USAState.filter(data => data.state_id === userDetails.state);
                if (newArr.length > 0) {
                    statename = newArr[0]['value'];
                }
                break;
            }
            default: {
                break;
            }

            }
        }
        return statename;
    }


    render() {
        return (
            <KeyboardAvoidingView behavior="padding" >
                <Text style={GlobalStyles.inputHeaderName}>SELECT COUNTRY
                    <Text style={GlobalStyles.starColor}>*</Text>
                </Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={country}
                        fontSize={moderateScale(12)}
                        onChangeText={value => this.onChangeHandlerCountry(value)}
                        value={this.state.selectedCountry}
                    />
                </View>
                <Text style={GlobalStyles.inputHeaderName}>SELECT STATE</Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={(this.state.selectedCountry === 'India') ? indiaState :  this.state.selectedCountry === 'USA'  ?  USAState : []}
                        fontSize={moderateScale(12)}
                        onChangeText={value => this.onChangeHandlerState(value)}
                        value={this.state.selectedState}
                    />
                </View>
                <Text style={GlobalStyles.inputHeaderName}>CITY</Text>
                <TextInput 
                    keyboardType="default" 
                    onChangeText={(textValue) => { this.setState({ selectedCity: textValue }); }} 
                    onSubmitEditing={() => this.txtFldStreet.focus()} 
                    placeholder="Enter your city name" 
                    returnKeyType="next" 
                    style={GlobalStyles.textInput} 
                    value={this.state.selectedCity} />
                <Text style={GlobalStyles.inputHeaderName}>STREET ADDRESS</Text>
                <TextInput 
                    keyboardType="default" 
                    onChangeText={(textValue) => { this.setState({ StreetAddress: textValue }); }} 
                    onSubmitEditing={() => this.txtFldZipCode.focus()} 
                    placeholder="Enter your street address" 
                    ref={(textInput) => this.txtFldStreet = textInput} 
                    returnKeyType="next" 
                    style={GlobalStyles.textInput} 
                    value={this.state.StreetAddress} />
                <Text style={GlobalStyles.inputHeaderName}>ZIP CODE</Text>
                <TextInput 
                    keyboardType="number-pad" 
                    onChangeText={(textValue) => { this.setState({ zipCode: textValue }); }} 
                    placeholder="Enter your area Zip code" 
                    ref={(textInput) => this.txtFldZipCode = textInput} 
                    returnKeyType="done" 
                    style={GlobalStyles.textInput} 
                    value={this.state.zipCode} />
                <DefaultButton buttonText={'Update'} onPress={()=>this.update()} showLoader={this.state.loading}  />
            </KeyboardAvoidingView>
        );
    }

}

export default AddressInfo;
