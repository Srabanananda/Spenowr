/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {ScrollView,SafeAreaView,StyleSheet,Text,View,TextInput} from 'react-native';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles/index';
import DefaultHeader from '../../../../../../../../@GlobalComponents/DefaultHeader/index';
import { moderateScale } from 'react-native-size-matters';
import { Dropdown } from 'react-native-material-dropdown';
import DefaultButton from '../../../../../../../../@GlobalComponents/DefaultButton/index';
import CURRENCIES from '@Assets/JsonFiles/ProductsJson/currency.json';
import Config from '@Config/default';
import Toast from 'react-native-simple-toast';
import { addServicePackage, updateServicePackage } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';

const {COLOR:{DARKGRAY}} = Config;

const currencyJson = CURRENCIES.currency.map((each)=>{
    const {label,name,currency_id} = each;
    return {name : label,value:name ,currency_id:currency_id};
});

type AddPackageScreenProps = {
    route:Object,
    navigation:Object
};

const AddPackageScreen = ({...props}:AddPackageScreenProps) =>{

    const {route,navigation} = props;
    const courseId = route.params.course_id;
    const EditData = route.params.packagedata ||  null;

    const getSelectedCurrency = () =>{ 
        let currency = currencyList.filter((each)=>{
            return each.currency_id === EditData.package_currency;
        });
        return currency[0].value;
    };

    const [loader,setLoader] = useState(false);
    const [description, setDescription] = useState(EditData ? EditData.package_description:'');
    const [packageName, setPackageName] = useState(EditData?EditData.package_name:'');
    const [packagePrice, setPackagePrice] = useState(EditData?EditData.package_price:'');
    const [packageDuration, setPackageDuration] = useState(EditData?EditData.delivery_time:'');
    const [currencyList] = useState(currencyJson);
    const [selectedCurrency, setSelectedCurrency] = useState(EditData ? getSelectedCurrency() : currencyList[0].value);

  

    const validateData = () =>{
        if(packageName === ''){
            Toast.show('Please enter package name');
            return;
        }
        if(packagePrice === ''){
            Toast.show('Please enter package price');
            return;
        }
        if(description === ''){
            Toast.show('Please enter package description');
            return;
        }

        setLoader(true);
        const commission = 0.08*packagePrice;
        const {currency_id} = currencyList.find(x=>x.value === selectedCurrency);
        
        const data = new FormData();
        data.append('package_name',packageName);
        data.append('package_description',description);
        data.append('package_price',packagePrice);
        data.append('package_currency',currency_id);
        data.append('delivery_time',packageDuration);
        data.append('total_product_cost',packagePrice-commission);
        data.append('commission',commission);
        data.append('course_id',courseId);
        EditData ? data.append('package_id',EditData.package_id) : null;
        EditData ? 
            updateServicePackage(data)
                .then(()=>{
                    Toast.show('Package updated successfully');
                    setTimeout(()=>{
                        navigation.goBack();
                    },1000);
                })
                .catch(()=>{Toast.show('Oops Something Went Wrong')})
                .finally(()=>{setLoader(false);})
            :
            addServicePackage(data)
                .then(()=>{
                    Toast.show('Package added successfully');
                    setTimeout(()=>{
                        navigation.goBack();
                    },1000);
                })
                .catch(()=>{
                    Toast.show('Oops Something Went Wrong');
                })
                .finally(()=>{
                    setLoader(false);
                });

    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={ EditData ? 'Edit Package' : 'Add Package'} />
            <ScrollView 
                contentContainerStyle={{padding:moderateScale(10),paddingBottom:moderateScale(100)}} 
                showsVerticalScrollIndicator={false}
            >
                <View style={GlobalStyles.formWrapper}>
                    <Text style={GlobalStyles.inputHeaderName}>PACKAGE NAME<Text style={GlobalStyles.starColor}> *</Text>
                    </Text>
                    <TextInput 
                        onChangeText = {(value)=>setPackageName(value)}
                        placeholder  = {'Enter package name'}
                        style={GlobalStyles.textInput}
                        value={packageName}
                    />
                    <Text style={GlobalStyles.inputHeaderName}>PACKAGE DESCRIPTION<Text style={GlobalStyles.starColor}> *</Text></Text>
                    <TextInput 
                        multiline={true}
                        onChangeText = {(value)=>setDescription(value)}
                        placeholder  = {'Enter description'}
                        style={{...GlobalStyles.textInput,height:moderateScale(100)}}
                        value={description}
                    />
                    <Text style={GlobalStyles.inputHeaderName}>PACKAGE PRICE<Text style={GlobalStyles.starColor}> *</Text></Text>
                    <TextInput 
                        keyboardType={'decimal-pad'}
                        onChangeText = {(value)=>{
                            setPackagePrice(value);
                        }}
                        style={GlobalStyles.textInput}
                        value={packagePrice}
                    />
                    <Text style={GlobalStyles.inputHeaderName}>FEE (8% - Includes 2% payment gateway fee)</Text>
                    <View style={[GlobalStyles.textInput,styles.disabled]}>
                        <Text>{packagePrice ? 0.08*packagePrice : ''}</Text>
                    </View>
                    <Text style={GlobalStyles.inputHeaderName}>YOU GET</Text>
                    <View style={[GlobalStyles.textInput,styles.disabled]}>
                        <Text>{packagePrice ? packagePrice-0.08*packagePrice : ''}</Text>
                    </View>
                    <Text style={GlobalStyles.inputHeaderName}>CURRENCY
                        <Text style={GlobalStyles.starColor}>*</Text>
                    </Text>
                    <View style={styles.dropDownView}>
                        <Dropdown
                            data={currencyList}
                            fontSize={12}
                            onChangeText={(value)=>setSelectedCurrency(value)}
                            value={selectedCurrency}
                        />
                    </View>
                    <Text style={GlobalStyles.inputHeaderName}>SERVICE DURATION (IN DAYS)</Text>
                    <TextInput 
                        onChangeText = {(value)=>setPackageDuration(value)}
                        placeholder  = {'Enter duration in days'}
                        style={GlobalStyles.textInput}
                        value={packageDuration}
                    />
                    <DefaultButton  buttonText={EditData ? 'UPDATE':'ADD'} onPress={()=>validateData()} showLoader={loader} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddPackageScreen;
const styles = StyleSheet.create({
    disabled:{
        backgroundColor:DARKGRAY,
        justifyContent:'center'
    }
});