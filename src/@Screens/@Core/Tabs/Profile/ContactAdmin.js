/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {TouchableOpacity,Text,View,TextInput,Image, ScrollView,Platform} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../@GlobalComponents/ModalHeader';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import { GlobalStyles } from '../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';
import SelectImage from '../../../../@GlobalComponents/SelectImage';
import { Dropdown } from 'react-native-material-dropdown';
import { contactToAdmin } from '../../../../@Endpoints/Core/Tabs/MyAccount';
import { connect } from 'react-redux';
import * as moreActions from '@Redux/actions/moreActions';
import { pickImage } from '../../../../@Utils/helperFiles/ImagePicker';
 
const Querries = [
    {name : 'report_issue',value : 'Report An Issue'},
    {name : 'request_feature',value : 'Request A Feature'},
    {name : 'other_query',value : 'Other Querry'}
];
 
const ContactAdmin = ({...props}) =>{

    const {fetchMessageCenterMessages} = props;
 
    const [isActive, setIsActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [querry, setQuerry] = useState('Report An Issue');
    const [loader, setLoader] = useState(false);
 
    const chooseFile = () => {
        pickImage((res)=>{
            let response = res;
            if(Platform.OS === 'android'){
                if(res?.assets) response = res.assets[0];
            }
            if(response.didCancel) return;
            setSelectedFile(response);
        });
    };
    
    const resetData = () =>{
        setReason('');
        setMessage('');
        setSelectedFile(null);
    };
 
    const getImageFormData = (data) =>{
        data.append('message_file', 'data:image/jpeg;base64,' + selectedFile.base64);
    };
 
    const validateData = () =>{
        if(reason === '' || message === '')
            Toast.show('Reason or message cannot be empty',Toast.LONG);
        else
        {
            const res = Querries.find(x => x.value === querry);
            const data = new FormData();
            if(selectedFile)
                getImageFormData(data);
            else data.append('message_file',null);
            data.append('reason_to_contact',res.name);
            data.append('reason_message',reason);
            data.append('message',message);
            setLoader(true);
            contactToAdmin(data)
                .then(()=>{
                    setLoader(false);
                    fetchMessageCenterMessages();
                    resetData();
                    setIsActive(false);
                    setTimeout(()=>{
                        Toast.show('Your Querry Submitted Successfully',Toast.LONG);
                    },500);
                })
                .catch(()=>{
                    setLoader(false);
                    Toast.show('Something went wrong, please try after sometime',Toast.LONG);
                });
        }
    };
 
 
    const renderSelectedFile = () =>{
        if(selectedFile) 
            return (
                <TouchableOpacity onPress={()=>chooseFile()}>
                    <Image 
                        resizeMode={'contain'} 
                        source={{ uri: 'data:image/jpeg;base64,' + selectedFile.base64 }} 
                        style={GlobalStyles.selectedImageStyle} 
                    />
                </TouchableOpacity>
            );
 
        return <SelectImage onPress={()=>chooseFile()} />;
    };
 
    const renderContactForm = () =>{
        return(
            <View style={styles.adminModal}>
                <ScrollView>
                    <ModalHeader headerText={'Contact Admin'} onPress={()=>setIsActive(false)} />
                    <Dropdown
                        data={Querries}
                        fontSize={12}
                        onChangeText={(value)=>setQuerry(value)}
                        value={querry}
                    />
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
                    <Text style={GlobalStyles.inputHeaderName}>Attach File (add only image files)</Text>
                    {renderSelectedFile()}
                    <DefaultButton buttonText={'Submit'} onPress={()=>validateData()} showLoader={loader} />
                </ScrollView>
            </View>
        );
    };
 
    return(
        <>
            <TouchableOpacity onPress={()=>setIsActive(true)} style={styles.adminBox}>
                <Text style={styles.editButton}>Contact Admin</Text>
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
function mapStateToProps(state){
    return{
        whatsNewFeed : state.home.whatsNewFeed,
        apiCalled : state.home.apiCalled,
        appliedFilters : state.home.filters,
    };
}

function mapDispatchToProps(dispatch){
    return{
        fetchMessageCenterMessages:() =>
            dispatch(moreActions.fetchMessageCenterMessages()),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactAdmin);