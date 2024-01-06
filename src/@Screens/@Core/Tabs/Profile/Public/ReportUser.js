/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {TouchableOpacity,Text,TextInput,View} from 'react-native';
import Modal from 'react-native-modal';
import ModalHeader  from '@GlobalComponents/ModalHeader/index';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import DefaultButton  from '@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import styles from '../styles';
import Config from '@Config/default';
import Toast from 'react-native-simple-toast';
import { reportAnUser } from '../../../../../@Endpoints/Core/Tabs/MyAccount/index';

const {COLOR:{LIGHTGREY}} = Config;

type ReportUserProps = {
    userObj : Object
}

const ReportUser = ({userObj} : ReportUserProps) =>{

    const {
        userProfile:{user_id},
        publicUserData:{
            institute:
                {
                    institute_id : public_institute_id
                }
        },
    } =  userObj;

    const [isActive, setIsActive] = useState(false);
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState(''); 
    const [loader, setLoader] = useState(false);

    const validateData = () =>{
        if(reason === '' || message === '')
            Toast.show('Reason or message cannot be empty');
        else{
            setLoader(true);
            const data = new FormData();
            data.append('user_id',user_id);
            data.append('artist_id',public_institute_id);
            data.append('post_id',public_institute_id);
            data.append('type','institute');
            data.append('reason',reason);
            data.append('message',message);
            reportAnUser(data)
                .then(() =>{
                    setIsActive(false);
                    Toast.show('Report recoded successfully');
                })
                .catch(() =>{
                    Toast.show('Something went wrong');
                })
                .finally(() =>{
                    setLoader(false);
                    setIsActive(false);
                });
        }
    };

    const renderReportForm = () =>{
        return(
            <View style={styles.adminModal}>
                <ModalHeader headerText={'Report this user'} onPress={()=>setIsActive(false)} />
                
                <TextInput 
                    onChangeText = {(value)=>setReason(value)}
                    placeholder={'Reason'}
                    placeholderTextColor={LIGHTGREY}
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
                <Text style={styles.editButton}>Report</Text>
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
                {renderReportForm()}
            </Modal>
        </>
    );
};

export default ReportUser;