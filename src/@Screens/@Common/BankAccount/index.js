/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect, useState} from 'react';
import {SafeAreaView,View,StyleSheet,Text,TextInput,ScrollView, Keyboard} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../@GlobalStyles';
import { Dropdown } from 'react-native-material-dropdown';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import Toast from 'react-native-simple-toast';
import { addUserBankDetails, getUserBankDetails } from '../../../@Endpoints/Auth';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';

const ACC_TYPES = [
    {name : 'saving_account', value : 'Saving Account'},
    {name : 'credit_account', value : 'Credit Account'}
];
 
const BankAccountScreen = () =>{

    const [bankDetails,setBankDetails] = useState(null);
    const [loadDetails, setLoadDetails] = useState(true);
    const [name, setName] = useState('');
    const [accNumber, setAccNumber] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [bankName, setBankName] = useState('');
    const [bankAddress, setBankAddress] = useState('');
    const [contact, setContact] = useState('');
    const [accountType, setAccountType] = useState('');
    const [loader, setLoader] = useState(false);

    useEffect(()=>{
        callApi();
    },[]);

    useEffect(()=>{
        if(bankDetails)
        {
            const {
                user_name = '',
                account_no = '',
                ifsc = '',
                bank_name ='',
                bank_address ='',
                account_type ='',
                mobile ='',
            } = bankDetails;
            const  [{value=''}] = ACC_TYPES.filter(x=>x.name === account_type);
            setName(user_name);
            setAccNumber(account_no);
            setIfsc(ifsc);
            setBankName(bank_name);
            setBankAddress(bank_address);
            setContact(mobile);
            setAccountType(value);
        }
    },[bankDetails]);

    const callApi = () =>{
        getUserBankDetails()
            .then(res=>{
                const {data:{bank_details={}}} =  res;
                setBankDetails(bank_details);
            })
            .catch(()=>{
                Toast.show('Oops couldnot sync details');
            })
            .finally(()=>{
                setLoadDetails(false);
            });
    };

    const validateData = () =>{
        Keyboard.dismiss();
        if(name === '' || accNumber === '' || ifsc === '' || bankName === '' || bankAddress === '' || contact === '' || accountType=== '')
            Toast.show('Please Fill all the fileds');
        else
        {
            setLoader(true);
            const  [{name:accName=''}] = ACC_TYPES.filter(x=>x.value === accountType);
            const data = new FormData();
            data.append('user_name',name);
            data.append('account_no',accNumber);
            data.append('ifsc',ifsc);
            data.append('bank_name',bankName);
            data.append('bank_address',bankAddress);
            data.append('account_type',accName);
            data.append('mobile',contact);

            addUserBankDetails(data)
                .then(()=>{
                    Toast.show('Details saved successfully');
                })
                .catch(()=>{
                    Toast.show('Oops something went wrong');
                })
                .finally(()=>{
                    setLoader(false);
                });
        }
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Bank Account Details'} />
            {
                loadDetails  ? <ScreenLoader text={'Fetching bank details'} /> :
                    <ScrollView>
                        <View style={styles.container}>
                            <Text style={GlobalStyles.inputHeaderName}>NAME OF ACCOUNT HOLDER
                                <Text style={GlobalStyles.starColor}>*</Text>
                            </Text>
                            <TextInput 
                                onChangeText = {(value)=>setName(value)}
                                placeholder  = {'Enter your name'}
                                style={GlobalStyles.textInput}
                                value={name}
                            />
                            <Text style={GlobalStyles.inputHeaderName}>ACCOUNT NUMBER
                                <Text style={GlobalStyles.starColor}>*</Text>
                            </Text>
                            <TextInput 
                                keyboardType={'numeric'}
                                onChangeText = {(value)=>setAccNumber(value)}
                                placeholder  = {'Enter account number'}
                                style={GlobalStyles.textInput}
                                value={accNumber}
                            />
                            <Text style={GlobalStyles.inputHeaderName}>IFSC CODE
                                <Text style={GlobalStyles.starColor}>*</Text>
                            </Text>
                            <TextInput 
                                onChangeText = {(value)=>setIfsc(value)}
                                placeholder  = {'Enter bank IFSC code'}
                                style={GlobalStyles.textInput}
                                value={ifsc}
                            />
                            <Text style={GlobalStyles.inputHeaderName}>BANK NAME
                                <Text style={GlobalStyles.starColor}>*</Text>
                            </Text>
                            <TextInput 
                                onChangeText = {(value)=>setBankName(value)}
                                placeholder  = {'Enter bank name'}
                                style={GlobalStyles.textInput}
                                value={bankName}
                            />
                            <Text style={GlobalStyles.inputHeaderName}>BANK ADDRESS
                                <Text style={GlobalStyles.starColor}>*</Text>
                            </Text>
                            <TextInput 
                                onChangeText = {(value)=>setBankAddress(value)}
                                placeholder  = {'Enter bank address'}
                                style={GlobalStyles.textInput}
                                value={bankAddress}
                            />
                            <Text style={GlobalStyles.inputHeaderName}>MOBILE NUMBER
                                <Text style={GlobalStyles.starColor}>*</Text>
                            </Text>
                            <TextInput 
                                keyboardType={'numeric'}
                                onChangeText = {(value)=>setContact(value)}
                                placeholder  = {'Enter contact number'}
                                style={GlobalStyles.textInput}
                                value={contact}
                            />
                            <Text style={GlobalStyles.inputHeaderName}>ACCOUNT TYPE
                                <Text style={GlobalStyles.starColor}>*</Text>
                            </Text>
                            <Dropdown
                                data={ACC_TYPES}
                                fontSize={12}
                                onChangeText={(value)=>setAccountType(value)}
                                value={accountType}
                            />
                            <DefaultButton buttonText={'Save'} onPress={()=>validateData()}  showLoader={loader} />
                        </View>
                    </ScrollView>
            }
        </SafeAreaView>
    );
};
 
export default BankAccountScreen;

const styles = StyleSheet.create({
    container:{
        margin:moderateScale(5),
        backgroundColor:'#fff',
        padding:moderateScale(15)
    }
});