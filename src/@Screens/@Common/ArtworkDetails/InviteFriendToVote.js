import React, { useState } from 'react';
import { TouchableOpacity,Text, View, TextInput } from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import Modal from 'react-native-modal';
import ModalHeader from '../../../@GlobalComponents/ModalHeader';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import { isEmailValid } from '../../../@Utils/helperFiles/helpers';
import { inviteFriendToVote } from '../../../@Endpoints/Core/Tabs/More';

const InviteFriendToVote = ({details}:any) => {

    const [showModal, setShowModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const {
        mediaType,
        photo_details:{
            media_id=''
        }
    } = details;

    const validateData = () => {
        if(!isEmailValid(email)) {
            Toast.show('Enter valid Email');
            return ;
        }
        else{
            setLoader(true);
            inviteFriendToVote(firstName,lastName,email,mediaType,media_id)
                .then(()=>{
                    
                    Toast.show('Invitation Sent');
                    setTimeout(()=> setShowModal(false),400);
                })
                .catch(() => Toast.show('Something Went Wrong'))
                .finally(()=>setLoader(false));

        }
    };

    const renderInviteForm = () =>{
        return(
            <View style={styles.adminModal}>
                
                <ModalHeader headerText={'Invite Your Friend'} onPress={()=>setShowModal(false)} />
                <TextInput 
                    onChangeText = {(value)=>setFirstName(value)}
                    placeholder={'First Name'}
                    style={GlobalStyles.textInput}
                    value={firstName}
                />
                <TextInput 
                    onChangeText = {(value)=>setLastName(value)}
                    placeholder={'Last Name'}
                    style={GlobalStyles.textInput}
                    value={lastName}
                />
                <TextInput 
                    onChangeText = {(value)=>setEmail(value)}
                    placeholder={'Email'}
                    style={GlobalStyles.textInput}
                    value={email}
                />
                
                <DefaultButton buttonText={'Invite Now'} isDeactivated={loader || !email?.length} onPress={()=>validateData()} showLoader={loader} />
                
            </View>
        );
    };

    return(
        <>
            <TouchableOpacity onPress={()=>setShowModal(true)} style={GlobalStyles.seeMoreButtonRev}>
                <Text style={GlobalStyles.seeMoreButtonTextRev}>Invite A Friend</Text>
            </TouchableOpacity>
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={showModal}
                onBackButtonPress= {()=>{
                    setShowModal(false); 
                }}
                onBackdropPress = {()=>{
                    setShowModal(false); 
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderInviteForm()}
            </Modal>
        </>
    );

};

export default InviteFriendToVote;