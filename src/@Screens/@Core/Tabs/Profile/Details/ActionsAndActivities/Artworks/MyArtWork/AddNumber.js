/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text, TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import { moderateScale } from 'react-native-size-matters';
import DefaultButton from '../../../../../../../../@GlobalComponents/DefaultButton';
import ModalHeader from '../../../../../../../../@GlobalComponents/ModalHeader';
import Config from '@Config/default';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import Toast from 'react-native-simple-toast';

const {COLOR:{WHITE}} = Config;

const AddUserNumber = ({children,setNumberCallback}) =>{

    const [showModal, setShowModal] = useState(false);
    const [number, setNumber] = useState('');

    const checkNumber = () =>{
        if(number.length === 10) 
        {
            setNumberCallback(number);
            setShowModal(false);
        }
        else
            Toast.show('Enter a Valid Number',Toast.LONG);
    };

    const renderAddNumber = () =>{
        return(
            <View style={styles.contestModal}>
                <View style={styles.wrapper}>
                    <ModalHeader 
                        headerText={'Phone Number'} 
                        onPress={()=>setShowModal(false)} 
                    /> 
                    <View>
                        <Text style={GlobalStyles.inputHeaderName}> Please Enter Your Phone Number <Text style={GlobalStyles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            onChangeText = {(value)=>setNumber(value)}
                            placeholder={'Phone Number'}
                            style={GlobalStyles.textInput}
                            value={number}
                        />
                        <DefaultButton 
                            buttonText={'Add Number'} 
                            onPress={()=>checkNumber()}
                            showLoader={false} 
                            textStyle={styles.buttonText}
                        />
                    </View>
                </View>
            </View>
        );
    };

    return(
        <View>
            <TouchableOpacity onPress={()=>setShowModal(true)}>
                {children}
            </TouchableOpacity>
            
            <Modal
                animationIn={'slideInDown'}
                animationOut={'slideOutUp'}
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
                {renderAddNumber()}
            </Modal>
        </View>
    );
};

export default AddUserNumber;

const styles = StyleSheet.create({
    buttonText:{
        fontSize:moderateScale(10)
    },
    contestModal:{
        backgroundColor:WHITE,
        width:'100%',
    },
    wrapper:{
        margin:moderateScale(15)
    },
    contentsHolder:{
        padding:moderateScale(10)
    },
    checkBox:{
        width:moderateScale(25),
        height:moderateScale(25)
    },
    title:{
        marginLeft:moderateScale(10)
    },
    EachContestWrapper:{
        flexDirection:'row',alignItems:'center',
        marginVertical:moderateScale(10)
    },
    selectCategory:{
        fontWeight:'bold'
    },
    typeWrapper:{
        flexDirection:'row',
        alignItems:'center',
        padding:moderateScale(10),
        paddingLeft:moderateScale(15)
    },
    EachContestWrapperDeactive:{
        flexDirection:'row',alignItems:'center',
        marginVertical:moderateScale(10),
        opacity:.5
    }
});