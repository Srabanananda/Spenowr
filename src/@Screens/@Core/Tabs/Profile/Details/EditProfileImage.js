/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,TouchableOpacity,StyleSheet,Text, ActivityIndicator,Platform} from 'react-native';
import Image from 'react-native-image-progress';
import Toast from 'react-native-simple-toast';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import { updateMyProfileImage } from '../../../../../@Endpoints/Core/Tabs/EditProfile';
import { getUserDetails } from '../../../../../@Endpoints/Auth';
import PropTypes from 'prop-types';
import { pickImage } from '../../../../../@Utils/helperFiles/ImagePicker';

const {NEW_IMG_BASE,DEFAULT_PROFILE,COLOR:{APP_THEME_COLOR,APP_PINK_COLOR}} = Config;

const EditProfileImage = ({mode = 'PRIVATE',userObj,updateUserDetails}) =>{

    const [filePath, setFilePath] = useState(null);
    const {user,publicUserData} = userObj;
    const [loader, setLoader] = useState(false);
    const [showSave, setShowSave] = useState(true);

    const userData = mode === 'PRIVATE' ? user : publicUserData.institute;
    const {profile_image_thumbnail_path} = userData;

    const refreshProfile = () =>{
        getUserDetails()
            .then(res=>{
                const {data:{institute={},profileData={}}} = res;
                updateUserDetails(institute,profileData);
            })
            .catch();
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

    const updateSingleProfileImage = () =>{
        setLoader(true);
        const data = new FormData();
        data.append('profile_image','data:image/jpeg;base64,' + filePath.base64);
        updateMyProfileImage(data)
            .then(()=>{
                Toast.show('Image Updated Successfully!');
                setShowSave(false);
                refreshProfile();
            })
            .catch(()=>{
                Toast.show('Oops couldnot upload profile image');
            })
            .finally(()=>{
                setLoader(false);
            });
    };

    const renderSaveButton = () =>{
        if(filePath && showSave)
            return(
                <TouchableOpacity disabled={loader} onPress={()=>updateSingleProfileImage()} style={styles.seeMoreButton}>
                    {loader ? <ActivityIndicator color={APP_PINK_COLOR} size={'small'} /> : <Text style={styles.seeMoreButtonText}>Save</Text>  }
                </TouchableOpacity>
            );
    };

    const imagePath = profile_image_thumbnail_path ? NEW_IMG_BASE + profile_image_thumbnail_path : NEW_IMG_BASE +DEFAULT_PROFILE ;
    return(
        <View>
            <TouchableOpacity disabled={mode!=='PRIVATE'} onPress={() => chooseFile()}  style={styles.profilePic}>
                <Image 
                    source={{ uri: filePath ? 'data:image/jpeg;base64,' + filePath.base64 :   imagePath }} 
                    style={{width:null,height:null,flex:1}} 
                />
            </TouchableOpacity>
            {renderSaveButton()}
        </View>
    );
};

export default EditProfileImage;

EditProfileImage.propTypes = {
    mode:PropTypes.string.isRequired,
    updateUserDetails:PropTypes.func.isRequired,
    userObj:PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    profilePic:{
        width:moderateScale(80),
        height:moderateScale(80),
        borderRadius:moderateScale(40),
        backgroundColor:APP_THEME_COLOR,
        borderWidth:.4,
        borderColor:APP_THEME_COLOR,
        overflow:'hidden'
    },
    seeMoreButton:{
        borderColor:APP_PINK_COLOR,
        padding:moderateScale(3),
        marginTop:moderateScale(5),
        borderRadius:moderateScale(4),
        borderWidth:1,
    },
    seeMoreButtonText:{
        fontSize:moderateScale(10),
        color:APP_PINK_COLOR,
        alignSelf:'center'
    },
});