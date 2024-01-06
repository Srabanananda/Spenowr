/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {TouchableOpacity,Text,View,TextInput} from 'react-native';
import styles from '../styles';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../../@GlobalComponents/ModalHeader';
import DefaultButton from '../../../../../@GlobalComponents/DefaultButton';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';
import { contactToUser } from '../../../../../@Endpoints/Core/Tabs/MyAccount';

type ContactProps = {
    userObj:Object
}

const Contact = ({userObj}:ContactProps) =>{

    const {
        userProfile:{user_id,email,},
        user:{institute_name},
        publicUserData:{
            institute:
                {
                    institute_id : public_institute_id, institute_name  :  public_institute_name,contact_email
                }
        },
    } =  userObj;

    const [isActive, setIsActive] = useState(false);
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);
   
    const resetData = () =>{
        setReason('');
        setMessage('');
        setIsActive(false);
    };
    
    const validateData = () =>{
        if(reason === '' || message === '')
            Toast.show('Reason or message cannot be empty',Toast.LONG);
        else
        {
            const data = new FormData();
            data.append('user_id',user_id);
            data.append('entity_id',public_institute_id);
            data.append('institute_email',contact_email);
            data.append('institute_name',public_institute_name);
            data.append('name',institute_name);
            data.append('email',email);
            data.append('reason_to_contact',reason);
            data.append('message',message);
            data.append('g_recaptcha_response',1);

            setLoader(true);
            contactToUser(data)
                .then(()=>{
                    Toast.show('Your Querry Submitted Successfully',Toast.LONG);
                    setTimeout(()=>{
                        setLoader(false);
                        resetData();
                    },500);
                })
                .catch(()=>{
                    setLoader(false);
                    Toast.show('Something went wrong, please try after sometime',Toast.LONG);
                });
        }
    };


    const renderContactForm = () =>{
        return(
            <View style={styles.adminModal}>
                <ModalHeader headerText={'Contact Form'} onPress={()=>setIsActive(false)} />
                
                <TextInput 
                    onChangeText = {(value)=>setReason(value)}
                    placeholder={'Reason to contact'}
                    style={GlobalStyles.textInput}
                    value={reason}
                />
                <TextInput 
                    multiline={true}
                    onChangeText = {(value)=>setMessage(value)}
                    placeholder={'A Short Message'}
                    style={{...GlobalStyles.textInput,height:moderateScale(100)}}
                    value={message}
                />
               
                <DefaultButton buttonText={'Submit'} onPress={()=>validateData()} showLoader={loader} />
            </View>
        );
    };

    return(
        <>
            <TouchableOpacity onPress={()=>setIsActive(true)} style={styles.adminBox}>
                <Text style={styles.editButton}>Contact</Text>
            </TouchableOpacity>
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
                {renderContactForm()}
            </Modal>
        </>
    );
};

export default Contact;