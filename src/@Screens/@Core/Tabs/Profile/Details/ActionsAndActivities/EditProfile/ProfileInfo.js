/**
 *  Modified By @name Sukumar_Abhijeet
 */

import React, { Component } from 'react';
import {
    TextInput,
    KeyboardAvoidingView,
    Text
} from 'react-native';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';
import DefaultButton from '../../../../../../../@GlobalComponents/DefaultButton';
import { updateProfiles } from '../../../../../../../@Endpoints/Core/Tabs/EditProfile';
import { getUserDetails } from '../../../../../../../@Endpoints/Auth';
import { isEmailValid } from '../../../../../../../@Utils/helperFiles/helpers';

class ProfileInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMsg: '',
            isErrorNeedtoShow: false,
            artistName: '',
            profileDesc: '',
            constactPerson: '',
            contactEmail: '',
            loading:false
        };
    }

    componentDidMount() {
        this.setUpValues();
    }

    setUpValues() {
        const userDetails = this.props.user_details;
        this.setState({ artistName: userDetails.institute_name });
        this.setState({ profileDesc: userDetails.institute_desc });
        this.setState({ constactPerson: userDetails.contact_person });
        this.setState({ contactEmail: userDetails.contact_email });
    }


    update= () =>{
        const {artistName,contactEmail} = this.state;
        if(!artistName.length)
            Toast.show('Please Enter Profile Name');
        else if(!isEmailValid(contactEmail))
            Toast.show('Please Enter Valid Email');
        
        else{
            this.setState({ loading: true });
            const { getParams } = this.props;
            const { artistName,profileDesc,constactPerson,contactEmail} = this.state;
        
            const apiParams = getParams();
            const data = new FormData();
            apiParams.institute_name = artistName;
            apiParams.institute_desc = profileDesc;
            apiParams.contact_person = constactPerson;
            apiParams.contact_email = contactEmail;
            for (var key in apiParams) {
                data.append(key, apiParams[key]);
            }
                
            updateProfiles(data)
                .then(() => {
                    Toast.show('Profile info updated successfully!');
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

    render() {
        return (
            <KeyboardAvoidingView behavior="padding">
                <Text style={GlobalStyles.inputHeaderName}>PROFILE NAME
                    <Text style={GlobalStyles.starColor}>*</Text>
                </Text>
                <TextInput 
                    keyboardType="ascii-capable" 
                    onChangeText={(textValue) => { this.setState({ artistName: textValue }); }} 
                    onSubmitEditing={() => this.phoneTxtfld.focus()}
                    placeholder="Enter a profile name" 
                    returnKeyType="next" 
                    style={GlobalStyles.textInput} 
                    value={this.state.artistName} />
                <Text style={GlobalStyles.inputHeaderName}>PROFILE DESCRIPTION</Text>
                <TextInput 
                    keyboardType="ascii-capable" 
                    multiline={true} 
                    onChangeText={(textValue) => { this.setState({ profileDesc: textValue }); }} 
                    placeholder="Description about you"
                    ref={(textInput) => this.phoneTxtfld = textInput} 
                    returnKeyType="next" 
                    style={{...GlobalStyles.textInput,height:moderateScale(100)}} 
                    value={this.state.profileDesc} />
                <Text style={GlobalStyles.inputHeaderName}>CONTACT PERSON</Text>
                <TextInput 
                    keyboardType="ascii-capable" 
                    onChangeText={(textValue) => { this.setState({ constactPerson: textValue }); }} 
                    placeholder="Contact person" 
                    ref={(textInput) => this.codeTxtfld = textInput} 
                    returnKeyType="next" 
                    style={GlobalStyles.textInput} 
                    value={this.state.constactPerson} />
                <Text style={GlobalStyles.inputHeaderName}>EMAIL
                    <Text style={GlobalStyles.starColor}>*</Text>
                </Text>
                <TextInput 
                    keyboardType="email-address" 
                    onChangeText={(textValue) => { this.setState({ contactEmail: textValue }); }} 
                    onSubmitEditing={() => this.update()} 
                    placeholder="Enter your email" 
                    returnKeyType="done" 
                    style={GlobalStyles.textInput} 
                    value={this.state.contactEmail} />
                <DefaultButton buttonText={'Update'} onPress={()=>this.update()} showLoader={this.state.loading}  />
            </KeyboardAvoidingView>
        );
    }
}
export default ProfileInfo;