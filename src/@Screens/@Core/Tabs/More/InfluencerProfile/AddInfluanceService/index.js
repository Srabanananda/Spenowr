/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect, useState } from 'react';

import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Platform } from 'react-native';

import { moderateScale } from 'react-native-size-matters';
import DefaultHeader from '../../../../../../@GlobalComponents/DefaultHeader';
import Config from '@Config/default';
import GLOBALJSON from '@Assets/JsonFiles/global.json';
import { Dropdown } from 'react-native-material-dropdown';
import SelectImage from '../../../../../../@GlobalComponents/SelectImage';
import Toast from 'react-native-simple-toast';
import CheckBox from '@react-native-community/checkbox';
import DefaultButton from '../../../../../../@GlobalComponents/DefaultButton';
import { addServices, updateService, getTutorsList } from '../../../../../../@Endpoints/Core/Tabs/Service';
import * as userActions from '@Redux/actions/userActions';
import PointShowCase from '@Spoints/PointShowCase';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Card from './SelectType/Card';
import { tagValidator } from '../../../../../../@Utils/helperFiles/helpers';
import { pickImage } from '../../../../../../@Utils/helperFiles/ImagePicker';
import { GlobalStyles } from '../../../../../../@GlobalStyles';

const {
    data:{
        serviceType,category,DeliveryMode,
        country,ReccuringPeriod,DisplayMode,
        Currency,
        influencerCategories
    }
} = GLOBALJSON;
const {NEW_IMG_BASE} = Config;

const AddInfluanceService = ({...props}) =>{
    const dispatch = useDispatch();
    const {route,navigation} = props;
    const EditData = route.params ? route.params.EditData : null;

    const [selectedService, setSelectedService] = useState('Training Class');
    const [enableCustomArtwork, setEnableCustomArtWork] = useState(false);
    const [serviceName, setServiceName] = useState('');
    const [tutorList , setTutorList] = useState([]);
    const [selectedTutorFromList, setSelectedTutorFromList] = useState('Select Tutor');
    const [tutorName, setTutorName] = useState('');
    const [tutorImg, setTutorImg] = useState(null);
    const [selectedCategory , setSelectedCategory] = useState('Select Category');
    const [mainSubcat, setMainSubCat] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState('Select Sub Category');
    const [types, setTypes] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [deliveryMode, setDeliveryMode] = useState('-- Select Delivery Mode --');
    const [selectedCountry, setSelectedCountry] = useState('-- Select Country --');

    const [states, setStates] = useState([]);
    const [state, setSelectedState] = useState('-- Select State --');
    const [city, setSelectedCity] = useState('');

    const [serviceDescription, setServiceDeScription] = useState('');
    const [serviceDuration , setServiceDuration] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [fee, setFee] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [nextBatchInput , setNextBatchInput] = useState('');
    const [recPeriod, setRecPeriod] = useState('-- Select Frequency --');
    const [selectedDisplayMode, setSelectedDisplayMode] = useState('Image');
    const [videoUrl ,setVideoUrl] = useState('');
    const [serviceImg, setServiceImg] = useState(null);
    const [imageDefault, setImageDefault] =  useState(true);
    // const [imageTitle, setImageTitle] = useState('');
    const [loader, setLoader] = useState(false);
    const [currency, setCurrency] = useState({name:'',value:''});
    const [earned, setEarned] = useState(0);
    const [total, setTotal] = useState(0);
    const [tag, setTag] = useState('');

    const validateData = () =>{
        if(serviceName === '' || selectedCategory === 'Select Category' || serviceDescription === '' || selectedCountry === '-- Select Country --')
            Toast.show('Please Fill all mandatory fields',Toast.LONG);
        else
        {
            const body =  createFormData();
            EditData ? callEdit(body) : callAdd(body);
        }
    };

    const callAdd = (body) =>{
        addServices(body)
            .then((res)=>{
                const {data:{servicesPoint:{earnedPoint=0,totalPoint=0}}} = res;
                setEarned(earnedPoint);
                setTotal(totalPoint);
                Toast.show('Course Added Successfully',Toast.LONG);
            })
            .catch(()=>{
                Toast.show('Something went wrong',Toast.LONG);
            })
            .finally(()=>{
                setLoader(false);
            });
    };

    const callEdit = (body) =>{
        body.append('course_id',EditData.course_id);
        updateService(body)
            .then(()=>{
                Toast.show('Course Edited Successfully',Toast.LONG);
                setTimeout(()=>{navigation.goBack();},300);
            })
            .catch(()=>{
                Toast.show('Course Edit Failed',Toast.LONG);
            })
            .finally(()=>{
                setLoader(false);
            });
    };
    
   

    const chooseFile = () => {
        pickImage((res)=>{
            let response = res;
            if(Platform.OS === 'android'){
                if(res?.assets) response = res.assets[0];
            }
            if(response.didCancel) return;
            setServiceImg(response)
        });
    };

    const renderSelectedFile = () =>{
        if(serviceImg) 
            return (
                <TouchableOpacity onPress={()=>chooseFile()}>
                    <Image resizeMode={'contain'} source={{ uri: serviceImg.base64 ? 'data:image/jpeg;base64,' + serviceImg.base64 :  NEW_IMG_BASE + serviceImg }} style={GlobalStyles.selectedImageStyle} />
                </TouchableOpacity>
            );

        return <SelectImage onPress={()=>chooseFile()} />;
    };

   
    return(
        <SafeAreaView edges={['left', 'right']} style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Add Service for influencer Marketing'} />
            <ScrollView 
                contentContainerStyle={{padding:moderateScale(10),paddingBottom:moderateScale(100)}} 
                showsVerticalScrollIndicator={false}
            >
                <View style={GlobalStyles.formWrapper}>

                    <Text style={GlobalStyles.inputHeaderName}>SERVICE NAME 
                        <Text style={GlobalStyles.starColor}> *</Text>
                    </Text>
                    <TextInput 
                        onChangeText = {(value)=>setServiceName(value)}
                        placeholder  = {'Enter your course name'}
                        style={GlobalStyles.textInput}
                        value={serviceName}
                    />

                    <Text style={GlobalStyles.inputHeaderName}>TAG</Text>
                    <TextInput 
                        onChangeText = {(value)=>{
                            const res = tagValidator(value);
                            setTag(res);
                        }}
                        style={GlobalStyles.textInput}
                        value={tag}
                    />
                    <Text style={GlobalStyles.inputHeaderName}>CATEGORY 
                        <Text style={GlobalStyles.starColor}>*</Text>
                    </Text>
                    <View style={GlobalStyles.dropDownView}>
                        <Dropdown
                            data={influencerCategories}
                            fontSize={12}
                            onChangeText={(value)=>setSelectedCategory(value)}
                            value={selectedCategory}
                        />
                    </View>
                    
                    <Text style={GlobalStyles.inputHeaderName}>SERVICE DESCRIPTION 
                        <Text style={GlobalStyles.starColor}> *</Text>
                    </Text>
                    <TextInput 
                        multiline={true}
                        onChangeText = {(value)=>{
                            if(value.length<256)
                                setServiceDeScription(value);
                        }}
                        placeholder  = {'Enter course description'}
                        style={{...GlobalStyles.textInput,height:moderateScale(100)}}
                        value={serviceDescription}
                    />
                    <Text style={GlobalStyles.starColor}> Max Char 250*</Text>

                    <Text style={GlobalStyles.inputHeaderName}>COUNTRY
                        <Text style={GlobalStyles.starColor}> *</Text>
                    </Text>
                    <View style={GlobalStyles.dropDownView}>
                        <Dropdown
                            data={country}
                            fontSize={12}
                            onChangeText={setSelectedCountry}
                            value={selectedCountry}
                        />
                    </View>
                    <Text style={GlobalStyles.inputHeaderName}>SERVICE IMAGE
                    </Text>
                    {renderSelectedFile()}
                    <DefaultButton buttonText={'Add'} onPress={()=>validateData()} showLoader={loader} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddInfluanceService;

