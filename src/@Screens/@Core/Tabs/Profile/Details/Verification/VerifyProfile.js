import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { getUserDetailsNew } from '../../../../../../@Endpoints/Auth';
import DefaultButton from '../../../../../../@GlobalComponents/DefaultButton';
const VerifyProfile = ()=> {
    const navigation = useNavigation();

    const [showVerify, setShowVerify] = useState(false);
    const [buttonText, setButtonText] = useState('Verify Profile');
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = () => {
        getUserDetailsNew()
            .then(res=>{
                const{data:{profile = false}} = res;
                if(profile)
                {
                    if(profile?.status == 0 || profile?.status == '' || profile?.status == 3 || profile?.status == null ) setShowVerify(true);
                    if(profile?.status === 2) {
                        setButtonText('Profile Verification In Progress.');
                        setIsDisabled(true);
                        setShowVerify(true);
                    }
                    if(profile.status === 3) setButtonText('Verification Rejected');
                }
            })
            .catch();
    };


    if(!showVerify) return <></>;
    return(
        <DefaultButton 
            buttonStyle={{height:moderateScale(30),paddingVertical:moderateScale(4)}} 
            buttonText={buttonText} 
            isDeactivated={isDisabled}
            onPress={() => navigation.navigate('ProfileVerification')} 
            showLoader={false} 
            textStyle={{fontSize:moderateScale(12)}}  
        />
    );
};

export default VerifyProfile;