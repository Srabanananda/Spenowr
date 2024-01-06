/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {StyleSheet,View,TextInput,Text,TouchableOpacity,Image,ScrollView, Dimensions,Platform} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import DefaultButton from '../../../../../@GlobalComponents/DefaultButton';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../../@GlobalComponents/ModalHeader';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import SelectImage from '../../../../../@GlobalComponents/SelectImage';
import { BlurView } from '@react-native-community/blur';
import { pickImage } from '../../../../../@Utils/helperFiles/ImagePicker';


const ClaimForm = ({cardData}) =>{

    const [isActive, setIsActive] = useState(false);
    const [idProof, setIdProof] = useState(null);
    const [instDocs, setInstDocs] = useState(null);

    const [contactPerson, setContactPerson] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const renderSelectFile = (option) =>{
        if(idProof && option === 0) 
            return (
                <TouchableOpacity onPress={()=>chooseFile(option)}>
                    <Image 
                        resizeMode={'contain'} 
                        source={{ uri: 'data:image/jpeg;base64,' + idProof.base64 }} 
                        style={styles.selectedImageStyle} 
                    />
                </TouchableOpacity>
            );
        if(instDocs && option === 1) 
            return (
                <TouchableOpacity onPress={()=>chooseFile(option)}>
                    <Image 
                        resizeMode={'contain'} 
                        source={{ uri: 'data:image/jpeg;base64,' + instDocs.base64}} 
                        style={styles.selectedImageStyle} 
                    />
                </TouchableOpacity>
            );
        return <SelectImage onPress={()=>chooseFile(option)} />;
    };

    const chooseFile = (option) => {
        pickImage((res)=>{
            let response = res;
            if(Platform.OS === 'android'){
                if(res?.assets) response = res.assets[0];
            }
            if(response.didCancel) return;
            switch(option)
            {
            case  0 :
                setIdProof(response);
                break; 
            default : 
                setInstDocs(response);
            }
        });
    };

    const validateForm = () =>{
        Toast.show('We are not receiving the submissions now',Toast.LONG);
        // if(contactPerson === '' || email === '' || message === '' )
        //     Toast.show('Please fill all the fields',Toast.LONG);
        // else
        // {
        //     if(idProof && instDocs) 
        //     {
        //         // console.log('Add data available');
        //         Toast.show('We are not receiving the submissions now',Toast.LONG);
        //     }
        //     else
        //         Toast.show('Please attach necessary documents',Toast.LONG);
        // }
    };

    const renderClaimForm = () =>{
        return(
            <View style={styles.ownershipModal}>
                <ModalHeader headerText={'Claim Ownership Form'} onPress={()=>setIsActive(false)} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={GlobalStyles.inputHeaderName}> INSTITUTE NAME : {cardData.institute_name}</Text>
                    <TextInput 
                        onChangeText = {(value)=>setContactPerson(value)}
                        placeholder={'Contact Person name'}
                        style={GlobalStyles.textInput}
                        value={contactPerson}
                    />

                    <TextInput 
                        onChangeText = {(value)=>setEmail(value)}
                        placeholder={'Email Id'}
                        style={GlobalStyles.textInput}
                        value={email}
                    />
                    <Text style={GlobalStyles.inputHeaderName}> ID PROOF </Text>
                    {renderSelectFile(0)}
                    <Text style={GlobalStyles.inputHeaderName}> INSTITUTE OWNERSHIP DOCUMENT </Text>
                    {renderSelectFile(1)}
                    <TextInput 
                        multiline={true}
                        onChangeText = {(value)=>setMessage(value)}
                        placeholder={'Message'}
                        style={{...GlobalStyles.textInput,height:moderateScale(100)}}
                        value={message}
                    />
                </ScrollView>
               
                <DefaultButton buttonText={'Submit'} onPress={()=>validateForm()} showLoader={false} />
            </View>
        );
    };

    return(
        <>
            <TouchableOpacity onPress={()=>setIsActive(true)} >
                <BlurView
                    blurAmount={5}
                    blurType="light"
                    style={styles.blurView}
                >
                    <Text style={styles.reviewText}>Claim Ownership</Text>
                </BlurView>
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
                {renderClaimForm()}
            </Modal>
        </>
    );
};

ClaimForm.propTypes = {
    cardData:PropTypes.object.isRequired,
};

export default ClaimForm;

const styles = StyleSheet.create({
    button:{
        width:moderateScale(120),
        backgroundColor:'#0000008B',
        borderRadius:moderateScale(4)
    },
    buttonText:{
        fontSize:moderateScale(9)
    },
    ownershipModal:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:'#fff',
        padding:moderateScale(15),
        height:Dimensions.get('window').height-150,
    },
    blurView:{
        width:'35%',
        justifyContent:'center',
        alignItems:'center',
        padding:moderateScale(8),
        borderRadius:moderateScale(3)
    },
    reviewText:{
        fontSize:moderateScale(10),
        color:'#fff',
        fontWeight:'bold'
    }
});