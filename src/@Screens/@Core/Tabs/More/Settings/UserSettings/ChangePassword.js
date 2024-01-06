/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text,TextInput,Alert, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import { changePassword } from '../../../../../../@Endpoints/Core/Tabs/More';
import DefaultButton from '../../../../../../@GlobalComponents/DefaultButton';
import ModalHeader from '../../../../../../@GlobalComponents/ModalHeader';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GlobalStyles } from '../../../../../../@GlobalStyles';

const {COLOR:{WHITE,RED,LIGHTGREY}} = Config;

const ChangePassword = () =>{
    const [passModal , setPassModal] = useState(false); 
    const [oldPass , setOldPass] = useState('');
    const [newPass , setNewPass] = useState('');
    const [confirmPass , setConfirmPass] = useState('');
    const [err , setErr] = useState(false);
    const [errMsg , setErrMsg] = useState('');
    const [loader , setLoader] = useState(false);

    const checkPasswordUpdate = () =>{
        const data = new FormData();
        data.append('password',oldPass);
        data.append('new_password',newPass);
        data.append('confirm_password',confirmPass);
        if(oldPass === '' || newPass === '' || confirmPass === '')
        {
            setErrMsg('Fields Cannot be Empty');
            setErr(true);
        }
        else if(newPass !== confirmPass)
        {
            setErrMsg('Password Mismatch');
            setErr(true);
        } 
        else{
            setLoader(true);
            changePassword(data)
                .then((res)=>{
                    const {data:{status,message}} = res;
                    setLoader(false);
                    if(status)
                    {
                        setPassModal(false);
                        setOldPass('');
                        setConfirmPass('');
                        setNewPass('');
                        setTimeout(()=>{
                            Alert.alert(
                                'Password',
                                'Updated successfully',
                                [
                                    { text: 'OK', style: 'cancel' }
                                ]
                            );
                        },400);
                    }
                    else
                    {
                        Alert.alert(
                            'Password',
                            message,
                            [
                                { text: 'OK', style: 'cancel' }
                            ]
                        );
                    }
                })
                .catch((error)=>{
                    setLoader(false);
                    setErrMsg('Oops Password failed to change');
                    console.log("error : " , JSON.stringify(error));
                    setErr(true);
                });
        }
    }; 

    const renderPassChangeUi = () =>{
        return(
            <View style={{backgroundColor:WHITE,width:'100%',height:moderateScale(400),position:'absolute',bottom:0,padding:moderateScale(15)}}>
                <ModalHeader headerText={'CHANGE PASSWORD'} onPress = {()=>{setPassModal(false);}} />
                <Text style={{paddingVertical:moderateScale(10)}}>Old Password</Text>
                <TextInput 
                    onChangeText={(pass)=>{setOldPass(pass);}}
                    placeholder={'Enter Old Password'}
                    secureTextEntry={true}
                    style={{borderColor:LIGHTGREY,borderWidth:1,borderRadius:moderateScale(4),paddingHorizontal:moderateScale(10),height:moderateScale(40)}}
                    value={oldPass}
                />
                <Text style={{paddingVertical:moderateScale(10)}}>New Password</Text>
                <TextInput 
                    onChangeText={(pass)=>{setNewPass(pass);}}
                    placeholder={'Enter New Password'}
                    secureTextEntry={true}
                    style={{borderColor:LIGHTGREY,borderWidth:1,borderRadius:moderateScale(4),paddingHorizontal:moderateScale(10),height:moderateScale(40)}}
                    value={newPass}
                />
                <Text style={{paddingVertical:moderateScale(10)}}>Confirm Password</Text>
                <TextInput 
                    onChangeText={(pass)=>{setConfirmPass(pass);}}
                    placeholder={'Enter Confirm Password'}
                    secureTextEntry={true}
                    style={{borderColor:LIGHTGREY,borderWidth:1,borderRadius:moderateScale(4),paddingHorizontal:moderateScale(10),height:moderateScale(40)}}
                    value={confirmPass}
                />
                {
                    (err) && <Text style={{color:RED,fontSize:moderateScale(10),marginTop:moderateScale(2)}}>* {errMsg}</Text>
                }
                <DefaultButton buttonStyle={{marginTop:moderateScale(18)}} buttonText={'Update'} onPress={()=>{checkPasswordUpdate();}} showLoader={loader} />
            </View>
        );
    };
    
    return(
        <View>
            <TouchableOpacity onPress={()=>setPassModal(true)} style={GlobalStyles.optionsBox}>
                <Text>Change Password</Text>
                <Icon color={LIGHTGREY} name={'angle-right'} size={moderateScale(16)} />
            </TouchableOpacity>
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={passModal}
                onBackButtonPress= {()=>{
                    setPassModal(false); 
                }}
                onBackdropPress = {()=>{
                    setPassModal(false); 
                }}
                style={{margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderPassChangeUi()}
            </Modal>
        </View>
    );
};

export default ChangePassword;