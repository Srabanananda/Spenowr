/**
 *  Modified By @name Sukumar_Abhijeet
 */

import React, { Component } from 'react';
import {
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';
import DefaultButton from '../../../../../../../@GlobalComponents/DefaultButton';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import Toast from 'react-native-simple-toast';
import { updateProfiles } from '../../../../../../../@Endpoints/Core/Tabs/EditProfile';
import { getUserDetails } from '../../../../../../../@Endpoints/Auth';

class SocialInfo extends Component {
    constructor() {
        super();
        this.state = {
            websiteUrl: '',
            FBUrl: '',
            instaUrl: '',
            twitterUrl: '',
            spenowrUrl: '',
            workingHours: '',
            loading:false
        };
    }

    componentDidMount() {
        this.setUpValues();
    }

    setUpValues() {
        const userDetails = this.props.user_details;
        this.setState({ websiteUrl: userDetails.website });
        this.setState({ FBUrl: userDetails.facebook_url });
        this.setState({ instaUrl: userDetails.instagram_url });
        this.setState({ twitterUrl: userDetails.twitter_url });
        this.setState({ workingHours: userDetails.working_hour });
        this.setState({ spenowrUrl: userDetails.slug_url });
    }

    update= () =>{
        this.setState({ loading: true });
        const { getParams } = this.props;
        const { websiteUrl,workingHours,FBUrl,twitterUrl,instaUrl,spenowrUrl} = this.state;
        
        const apiParams = getParams();
        const data = new FormData();
        apiParams.website = websiteUrl;
        apiParams.working_hour = workingHours;
        apiParams.facebook_url = FBUrl;
        apiParams.twitter_url = twitterUrl;
        apiParams.instagram_url = instaUrl;
        apiParams.slug_url = spenowrUrl;

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
                <TextInput 
                    keyboardType="email-address" 
                    onChangeText={(textValue) => { this.setState({ websiteUrl: textValue }); }} 
                    onSubmitEditing={() => this.workingHrTxtFld.focus()} 
                    placeholder="Website" 
                    returnKeyType="next" 
                    style={GlobalStyles.textInput} 
                    value={this.state.websiteUrl} />
                <TextInput 
                    keyboardType="email-address" 
                    onChangeText={(textValue) => { this.setState({ workingHours: textValue }); }} 
                    onSubmitEditing={() => this.fbTxtfld.focus()} 
                    placeholder="Working hours" 
                    ref={(textInput) => this.workingHrTxtFld = textInput} 
                    returnKeyType="next" 
                    style={GlobalStyles.textInput} 
                    value={this.state.workingHours} />
                <TextInput 
                    keyboardType="email-address" 
                    onChangeText={(textValue) => { this.setState({ FBUrl: textValue }); }} 
                    onSubmitEditing={() => this.instaTxtfld.focus()} 
                    placeholder="Facebook url" 
                    ref={(textInput) => this.fbTxtfld = textInput} 
                    returnKeyType="next" 
                    style={GlobalStyles.textInput} 
                    value={this.state.FBUrl} />
                <TextInput 
                    keyboardType="email-address" 
                    onChangeText={(textValue) => { this.setState({ instaUrl: textValue }); }} 
                    onSubmitEditing={() => this.twitterTxtfld.focus()} 
                    placeholder="Instagram url" 
                    ref={(textInput) => this.instaTxtfld = textInput} 
                    returnKeyType="next" 
                    style={GlobalStyles.textInput} 
                    value={this.state.instaUrl}  />
                <TextInput 
                    keyboardType="email-address" 
                    onChangeText={(textValue) => { this.setState({ twitterUrl: textValue }); }} 
                    placeholder="Twitter url" 
                    ref={(textInput) => this.twitterTxtfld = textInput} 
                    returnKeyType="next" 
                    style={GlobalStyles.textInput} 
                    value={this.state.twitterUrl} />
                <DefaultButton buttonText={'Update'} onPress={()=>this.update()} showLoader={this.state.loading}  />
            </KeyboardAvoidingView>
        );
    }

}

export default SocialInfo;