/**
 *  Created By @name Sukumar_Abhijeet
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Image as RNImage,
    Platform
} from 'react-native';
import Image from 'react-native-image-progress';

import ProfileInfo from './ProfileInfo';
import AddressInfo from './AddressInfo';
import SocialInfo from './SocialInfo';
import DefaultHeader from '../../../../../../../@GlobalComponents/DefaultHeader';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import * as userActions from '@Redux/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pickImage } from '../../../../../../../@Utils/helperFiles/ImagePicker';

const {COLOR:{APP_PINK_COLOR,DARK_BLACK,WHITE,APP_THEME_COLOR},NEW_IMG_BASE,DEFAULT_PROFILE} = Config;

const EditProfile = ({...props}) =>{

    const {
        navigation,
        user_details:{
            institute_name,institute_desc,contact_person,contact_email,
            city,street_address,zipcode,country,state,
            website,facebook_url,instagram_url,twitter_url,working_hour,slug_url,
            profile_image_thumbnail_path=''
        },
        user_details,updateUserDetails,
        route
    } = props;

    const setTab = route?.params?.setTab || 1 ;

    const [infoTabTag, setInfoTabTag] = useState(setTab);
    const [filePath, setFilePath] = useState(null);

    const generateparamaters =()=> {
        var paramaters = {
            profile_image: filePath ? 'data:image/jpeg;base64,' + filePath.base64 : null,
            institute_name: institute_name,
            institute_desc: institute_desc,
            contact_person: contact_person,
            contact_email: contact_email,
            country: country,
            state: state,
            city: city,
            street_address: street_address,
            art_trainer: 'false',
            zipcode: zipcode,
            website: website,
            working_hour: working_hour,
            facebook_url:facebook_url,
            twitter_url: twitter_url,
            instagram_url: instagram_url,
            slug_url: slug_url,
            show_list: '1',
            category: '',
            sub_category: '',
            type: '',
            image_alt_text: ''
        };
        return paramaters;
    };

    const chooseFile = () => {
        pickImage((res)=>{
            let response = res;
            if(Platform.OS === 'android'){
                if(res?.assets) response = res.assets[0];
            }
            if(response.didCancel) return;
            setFilePath(response);
        });
    };

    const btnInfoMenuClicked = (tag)=> {
        setInfoTabTag(tag);
    };

    const _designUserProfileImage = ()=> {
        const imagePath = profile_image_thumbnail_path ? NEW_IMG_BASE + profile_image_thumbnail_path : NEW_IMG_BASE +DEFAULT_PROFILE ;
        return (
            <TouchableOpacity onPress={() => chooseFile()} >
                <Image 
                    source={{ uri: filePath ? 'data:image/jpeg;base64,' + filePath.base64 :   imagePath }} 
                    style={styles.ImageBox}
                />
            </TouchableOpacity>
        );
    };

    const designMenuTab =()=>{
        return (
            <View style={styles.infoTabdesign}>
                <TouchableOpacity onPress={() => btnInfoMenuClicked(1)} >
                    <View style={styles.infoIconContainer}>
                        <RNImage 
                            resizeMode={'contain'} 
                            source={require('../../../../../../../assets/images/profileInfoIcon.png')} 
                            style={styles.infoImageIcon}
                        />
                        { <Text style={(infoTabTag == 1) ? styles.selectedMenuTitle : styles.descLabel}>Profile Info</Text>}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => btnInfoMenuClicked(2)} >
                    <View style={styles.infoIconContainer}>
                        <RNImage 
                            resizeMode={'contain'} 
                            source={require('../../../../../../../assets/images/profileInfoIcon.png')} 
                            style={styles.infoImageIcon}
                        />
                        {<Text style={(infoTabTag == 2) ? styles.selectedMenuTitle : styles.descLabel}>Address Info</Text>}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => btnInfoMenuClicked(3)} >
                    <View style={styles.infoIconContainer}>
                        <RNImage 
                            resizeMode={'contain'} 
                            source={require('../../../../../../../assets/images/profileInfoIcon.png')} 
                            style={styles.infoImageIcon}
                        />
                        {<Text style={(infoTabTag == 3) ? styles.selectedMenuTitle : styles.descLabel}>Social Info</Text>}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const renderComponents =()=> {
        switch (infoTabTag) {
        case 1:
            return (
                <ProfileInfo 
                    getParams = {generateparamaters} 
                    navigation={navigation}
                    updateUserDetails={updateUserDetails}
                    user_details={user_details}
                />
            );
        case 2:
            return (
                <AddressInfo 
                    getParams = {generateparamaters} 
                    navigation={navigation}
                    updateUserDetails={updateUserDetails} 
                    user_details={user_details}
                />
            );
        case 3:
            return (
                <SocialInfo 
                    getParams = {generateparamaters} 
                    navigation={navigation}
                    updateUserDetails={updateUserDetails} 
                    user_details={user_details}
                />
            );
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <DefaultHeader headerText={'Edit Profile'} showBackButton={true} />
            <ScrollView contentContainerStyle={{paddingBottom:moderateScale(50)}} showsVerticalScrollIndicator={false}>
                {_designUserProfileImage()}
                {designMenuTab()}
                <View style={styles.ComponentView}>
                    {renderComponents()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

EditProfile.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    updateUserDetails:PropTypes.func.isRequired,
    user_details:PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user_details: state.userObj.user
    };
};

const mapDispatchToProp = (dispatch) => ({
    updateUserDetails:(instituteObj,profileObj) =>
        dispatch(userActions.updateUserDetails(instituteObj,profileObj))
});

export default connect(mapStateToProps,mapDispatchToProp)(EditProfile);

const styles = StyleSheet.create({

    doneButton: {
        color: APP_PINK_COLOR,
        fontSize: 18
    },
    container: {
        backgroundColor: WHITE,
        flex: 1,
    },
    ImageBox:{
        width:moderateScale(150),
        height:moderateScale(150),
        borderRadius:moderateScale(80),
        borderColor:DARK_BLACK,
        borderWidth:1,
        overflow:'hidden',
        alignSelf:'center',
        marginTop:moderateScale(20),
        backgroundColor:APP_THEME_COLOR
    },
    infoTabdesign: {
        marginVertical: 10,
        height: 50,
        paddingHorizontal: 20,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menuTitle: {
        fontSize: 20,
        fontWeight: 'normal',
        color: DARK_BLACK,
        marginTop: 10,
        textAlign: 'center',
    },
    selectedMenuTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: APP_PINK_COLOR,

    },
    infoImageIcon: {
        height: 30, 
        width: 30,
        marginBottom: 10,
    },
    infoIconContainer: {
        flexDirection: 'column', marginHorizontal: 10, alignItems: 'center',
    },
    ComponentView:{
        paddingHorizontal:moderateScale(20),
        paddingTop:moderateScale(30)
    },
    descLabel:{
        fontSize:10,
        color:'#000'
    }
});