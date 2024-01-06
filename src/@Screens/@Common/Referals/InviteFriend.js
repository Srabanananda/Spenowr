/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,TextInput,ScrollView, Keyboard, Alert} from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import Modal from 'react-native-modal';
import { moderateScale } from 'react-native-size-matters';
import ModalHeader from '../../../@GlobalComponents/ModalHeader';
import { Dropdown } from 'react-native-material-dropdown';
import { ACCOUNT_TYPES } from '../../../assets/JsonFiles/accounts';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import Toast from 'react-native-simple-toast';
import { isEmailValid } from '../../../@Utils/helperFiles/helpers';
import { sendReferal } from '../../../@Endpoints/Core/Tabs/Common';
import PropTypes from 'prop-types';

const InviteFriends = ({...props}) =>{
    const {onInviteComplete} = props;
    const [isActive, setIsActive] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [accountType, setAccountType] = useState('Artist');
    const [loader, setLoader] = useState(false);

    const validateData = () =>{
        Keyboard.dismiss();
        if(firstName==='') Toast.show('Please Enter the First name');
        else{
            if(isEmailValid(email))
            {
                setLoader(true);
                const data = new FormData();
                data.append('first_name',firstName);
                data.append('last_name',lastName);
                data.append('email',email);
                const {name} = ACCOUNT_TYPES.find(x=>x.value===accountType);
                data.append('user_type',name);
                sendReferal(data)
                    .then(res=>{
                        const {data:{message=''}} =res;
                        if(message === 'Oops, User alredy Exist!')
                        {
                            Alert.alert('Email Already Exist!');
                        }
                        else{
                            Toast.show('Referal is sent');
                            onInviteComplete?.();
                            setTimeout(()=>{
                                setIsActive(false);
                            },400);
                        }
                    })
                    .catch(()=>Toast.show('Oops Something went wrong'))
                    .finally(()=>setLoader(false));
            }
            else Toast.show('Enter a valid email');
        }
    };

    const renderInviteBox = () =>{
        return(
            <View style={styles.container}>
                <ModalHeader headerText={'Send Invitations'} onPress={()=>setIsActive()} />
                <ScrollView>
                    <Text style={GlobalStyles.inputHeaderName}>FIRST NAME
                        <Text style={GlobalStyles.starColor}>*</Text>
                    </Text>
                    <TextInput 
                        onChangeText = {(value)=>setFirstName(value)}
                        placeholder  = {'Enter first name'}
                        style={GlobalStyles.textInput}
                        value={firstName}
                    />
                    <Text style={GlobalStyles.inputHeaderName}>LAST NAME</Text>
                    <TextInput 
                        onChangeText = {(value)=>setLastName(value)}
                        placeholder  = {'Enter last name'}
                        style={GlobalStyles.textInput}
                        value={lastName}
                    />
                    <Text style={GlobalStyles.inputHeaderName}>EMAIL
                        <Text style={GlobalStyles.starColor}>*</Text>
                    </Text>
                    <TextInput 
                        onChangeText = {(value)=>setEmail(value)}
                        placeholder  = {'Enter email'}
                        style={GlobalStyles.textInput}
                        value={email}
                    />
                    <Text style={GlobalStyles.inputHeaderName}>USER TYPE
                        <Text style={GlobalStyles.starColor}>*</Text>
                    </Text>
                    <Dropdown
                        data={ACCOUNT_TYPES}
                        fontSize={12}
                        onChangeText={(value)=>setAccountType(value)}
                        value={accountType}
                    />
                    <DefaultButton buttonText={'REFER NOW'} onPress={()=>validateData()} showLoader={loader} />
                </ScrollView>
            </View>
        );
    };

    return(
        <View>
            <TouchableOpacity onPress={()=>setIsActive(true)} style={{...GlobalStyles.seeMoreButtonRev}}>
                <Text style={GlobalStyles.seeMoreButtonTextRev} >Invite Friends</Text>
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
                style={{margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderInviteBox()}
            </Modal>
        </View>
    );
};

InviteFriends.propTypes = {
    onInviteComplete:PropTypes.func.isRequired,
};

export default InviteFriends;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFF',
        padding:moderateScale(10),
        width:'95%',
        alignSelf:'center',
        borderRadius:moderateScale(6)
    },
    
});