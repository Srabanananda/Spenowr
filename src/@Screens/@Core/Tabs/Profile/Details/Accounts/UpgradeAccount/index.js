/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,TextInput,Text, Keyboard} from 'react-native';
import DefaultButton from '../../../../../../../@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../../../../@GlobalComponents/ModalHeader';
import styles from './styles';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import { Dropdown } from 'react-native-material-dropdown';
import Logout from '../../Logout';
import Toast from 'react-native-simple-toast';
import { getAccountChanged } from '../../../../../../../@Endpoints/Auth';

const UpgradeAccount = () =>{

    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState('');
    const [account, setAccount] = useState('-- Select An Account --');
    const [showLogout, setShowLogout] = useState(false);
    const [loader, setLoader]= useState(false);

    const defaultAccounts = [
        {value:'Individual Artist',name:'1'},
        {value:'Art Craft Business',name:'2'},
        {value:'Art Institute',name:'3'},
    ];

    const upgradeAccount = () =>{
        Keyboard.dismiss();
        if(description === '' || account === '-- Select An Account --') Toast.show('Please Fill all fields');
        else{
            const {name} = defaultAccounts.find(x=>x.value === account);
            const body = new FormData();
            body.append('reason_message',description);
            body.append('account_type',name);
            setLoader(true);
            getAccountChanged(body)
                .then(()=>{
                    setShowLogout(true);
                })
                .catch(()=>{
                    Toast.show('Oops Something went wrong');
                })
                .finally(()=>{
                    setLoader(false);
                });
        }
    };

    const renderUpgradeContent = () =>(
        <>
            <View style={styles.dropDownView}>
                <Dropdown
                    data={defaultAccounts}
                    fontSize={12}
                    onChangeText={(value)=>setAccount(value)}
                    value={account}
                />
            </View>
            <TextInput 
                multiline={true}
                onChangeText = {(value)=>setDescription(value)}
                placeholder  = {'Reason for Upgrade'}
                style={{...GlobalStyles.textInput,height:moderateScale(100),textAlignVertical:'top'}}
                value={description}
            />
            <DefaultButton 
                buttonStyle={{width:'40%',alignSelf:'center',height:moderateScale(30),paddingVertical:moderateScale(5)}} 
                buttonText={'Upgrade Now'} 
                onPress={() => upgradeAccount()} 
                showLoader={loader} 
                textStyle={{fontSize:moderateScale(12)}}  
            />
        </>
    );

    const renderLogoutContent = () =>(
        <>
            <Text style={{textAlign:'center',marginVertical:moderateScale(10)}}>"Your account upgraded successfully. Please logout and login again!"</Text>
            <Logout showConfirmation={false}  />
        </>
    );

    const renderSubmitModal = () =>(
        <View style={styles.ModalContainer}>
            <ModalHeader headerText={'Upgrade Account'} onPress={()=>setShowModal(false)}  />
            {showLogout && renderLogoutContent()}
            {!showLogout && renderUpgradeContent()}
        </View>
    );

    return(
        <>
            <DefaultButton 
                buttonStyle={{width:'40%',alignSelf:'center',height:moderateScale(30),paddingVertical:moderateScale(5)}} 
                buttonText={'Upgrade Account'} 
                onPress={() => setShowModal(!showModal)} 
                showLoader={false} 
                textStyle={{fontSize:moderateScale(12)}}  
            />
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
                {renderSubmitModal()}
            </Modal>
        </>
    );
};

export default UpgradeAccount;