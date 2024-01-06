import React ,{useState}from 'react';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import ModalHeader from '../../../@GlobalComponents/ModalHeader';
import OTPTextInput from 'react-native-otp-textinput';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import { verifyOtp } from '../../../@Endpoints/Auth';
import SimpleToast from 'react-native-simple-toast';

const OtpVerify = ({
    isActive, 
    setIsActive,
    onVerifyCallBack,
    userId
} : any) => {

    const [code, setCode] = useState('0');
    const [loader, setLoader] = useState(false);

    const handleCodeFilled = (code) => setCode(code);

    const handleVerify = () => {
        setLoader(true);
        verifyOtp(userId,code)
            .then(({data})=>{
                if(data?.rep === '2') SimpleToast.show(data.response_msg);
                else onVerifyCallBack?.();
            })
            .catch(()=>{
                SimpleToast.show('Invalid Otp');
            })
            .finally(()=>setLoader(false));
        
    };

    const renderBox = () => {
        return(
            <View style={GlobalStyles.adminModal}>
                <ModalHeader headerText={'Verify Otp'} onPress={()=>setIsActive(false)} />
                <View>
                    <OTPTextInput 
                        handleTextChange={handleCodeFilled} 
                        inputCount={6} 
                        textInputStyle={{width:moderateScale(40)}}
                    />
                    <DefaultButton buttonText='Verify' isDeactivated={code.length !== 6} onPress={handleVerify} showLoader={loader} />
                </View>
            </View>
        );
    };
    
    return(
        <>
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
                {renderBox()}
            </Modal>
        </>
    );
};

export default OtpVerify;