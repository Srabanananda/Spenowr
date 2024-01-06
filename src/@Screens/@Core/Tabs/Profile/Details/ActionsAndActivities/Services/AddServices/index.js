/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect, useState } from 'react';

import {
    View,Text,
    SafeAreaView,ScrollView,
    TextInput,TouchableOpacity,
    Image,
    Platform
} from 'react-native';

import { moderateScale } from 'react-native-size-matters';
import DefaultHeader from '../../../../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import Config from '@Config/default';
import GLOBALJSON from '@Assets/JsonFiles/global.json';
import { Dropdown } from 'react-native-material-dropdown';
import SelectImage from '../../../../../../../../@GlobalComponents/SelectImage';
import Toast from 'react-native-simple-toast';
import CheckBox from '@react-native-community/checkbox';
import DefaultButton from '../../../../../../../../@GlobalComponents/DefaultButton';
import { addServices, updateService, getTutorsList } from '../../../../../../../../@Endpoints/Core/Tabs/Service';
import * as userActions from '@Redux/actions/userActions';
import PointShowCase from '@Spoints/PointShowCase';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import Card from './SelectType/Card';
import { tagValidator } from '../../../../../../../../@Utils/helperFiles/helpers';
import { pickImage } from '../../../../../../../../@Utils/helperFiles/ImagePicker';

const {
    data:{
        serviceType,category,DeliveryMode,
        country,ReccuringPeriod,DisplayMode,
        Currency
    }
} = GLOBALJSON;
const {NEW_IMG_BASE} = Config;

const AddServiceScreen = ({...props}) =>{
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

    useEffect(()=>{
        dispatch(userActions.updatePointShowCase(false));
        getTutorInfo();
    },[]);

    const getTutorInfo = () =>{
        setLoader(true);
        getTutorsList()
            .then(res=>{
                const {data:{teamData = []}} = res;
                teamData.map(each=>{
                    each.value = each.person_name;
                });
                teamData.push({value:'Other'});
                setTutorList(teamData);
            })
            .catch()
            .finally(()=>{
                setLoader(false);
            });
    };

    useEffect(()=>{
        if(EditData)
        {
            const {tutor_id = ''} = EditData;
            const tutor = tutorList.find(x=>x.team_id === tutor_id);
            if(tutor) setSelectedTutorFromList(tutor.person_name);
        }
    },[tutorList]);

    useEffect(()=>{
        if(earned)
            dispatch(userActions.updatePointShowCase(true));
    },[earned]);

    useEffect(()=>{
        if(selectedService === 'Custom Artwork') setEnableCustomArtWork(true);
        else setEnableCustomArtWork(false);
    },[selectedService]);

    useEffect(()=>{
        const val = mainSubcat.find((x)=>x.value === selectedSubCategory);
        if(val)
            setTypes(val.type);
    },[selectedSubCategory]);

    useEffect(()=>{
        if(EditData)
        {
            const {
                course_name,address,age_group,category : edit_category,
                sub_category,type,
                city,course_description,course_duration,
                default_image,delivery_mode,
                display_media_type,fee,next_batch,
                recurring,recurring_period,service_image,service_type,
                service_video_url,country : edit_country,state : edit_state,
                img_title='',tag:editedTag=''
            } = EditData;

            const sService = serviceType.find(x=>x.name ===service_type);
            setSelectedService(sService.value);
            setServiceName(course_name);
            setTag(editedTag);
            const cat = category.find(x=>x.api_val === edit_category);
            if(cat)
            {
                setSelectedCategory(cat.value);
                setMainSubCat(cat.subcat);

                const sub = cat.subcat.find((x)=>x.name === sub_category);
                if(sub) {
                    setSelectedSubCategory(sub.value);
                    const foundTypes = sub.type;
                    if(sub.type.length)
                    {
                        setTypes(sub.type);
                        const typeArr = [];
                        const editTypes = type.split(',');
                        editTypes.map(each =>{
                            const tp = foundTypes.find(x=>x.name === each);
                            if(tp)
                            {   
                                tp.selected = true;
                                typeArr.push(tp);
                            }
                        });
                        setSelectedTypes(typeArr);
                    }
                }
            }
            else setSelectedCategory('Select Category');
            
            const dMode = DeliveryMode.find(x=>x.name === delivery_mode);
            setDeliveryMode(dMode.value);

            const cData = country.find(x=>x.country_id === edit_country);
            if(cData)
            {
                setSelectedCountry(cData.value);
                setStates(cData.state_list);
                const sState = cData.state_list.find(x=>x.state_id === edit_state);
                if(sState) setSelectedState(sState.value);
                const cCurrency = {name : cData.currency.value , value : cData.currency.currency_id };
                setCurrency(cCurrency);
            }

            setServiceDeScription(course_description);
            setServiceDuration(course_duration);
            setFee(fee);
            setAddress(address);
            setAge(age_group);
            setSelectedCity(city);
            setIsRecurring(recurring === '0' ? false : true);
            const rPeriod = ReccuringPeriod.find(x=>x.name === recurring_period);
            if(rPeriod) setRecPeriod(rPeriod.value);
            if(next_batch!=='0000-00-00')
                setNextBatchInput(next_batch);
            setSelectedDisplayMode(display_media_type === '1' ? 'Image' : 'Video');
            setImageDefault(default_image === '1' ? true : false);
            setServiceImg(service_image);
            setVideoUrl(service_video_url);
            // setImageTitle(img_title);
            
        }
    },[EditData]);

    const validateData = () =>{
        if(serviceName === '' || selectedCategory === 'Select Category' || serviceDescription === '' || selectedCountry === '-- Select Country --')
            Toast.show('Please Fill all mandatory fields',Toast.LONG);
        else
        {
            const body =  createFormData();
            EditData ? callEdit(body) : callAdd(body);
        }
    };

    const createFormData = () =>{
        setLoader(true);
        const body = new FormData();
        const sService = serviceType.find(x=>x.value ===selectedService);
        body.append('service_type',sService.name);
        body.append('course_name',serviceName);
        if(selectedTutorFromList === 'Other' || selectedTutorFromList === 'Select Tutor')
            body.append('tutor_id',1);
        else
        {
            const tutor = tutorList.find(x=>x.value === selectedTutorFromList);
            if(tutor)  body.append('tutor_id',tutor.team_id);
        }
        body.append('tutor_name',tutorName);
        body.append('tutor_image', (tutorImg &&  (typeof tutorImg !== 'string')) ? 'data:image/jpeg;base64,' + tutorImg.base64  :  null );
        body.append('selectData',null);
        const cat = category.find((x)=>x.value === selectedCategory);
        body.append('category',cat.api_val);
        if(selectedSubCategory !== 'Select Sub Category')
        {
            const sub = mainSubcat.find((x)=>x.value === selectedSubCategory);
            body.append('sub_category',sub.name);
        }
        else
            body.append('sub_category',null);
        if(selectedTypes.length)
        {
            const selected = selectedTypes.map(each=>{
                return each.name;
            });
            body.append('type',selected.toString());
        }
        else body.append('type',null);
        body.append('selectedItems',null);
        const countryData = country.find(x=>x.value === selectedCountry);
        body.append('country',countryData.country_id);
        const sState = states.find(x=>x.value === state);
        body.append('state',sState ? sState.state_id  : null);
        body.append('city',city);
        body.append('course_description',serviceDescription);
        body.append('age_group',age);
        const dMode = DeliveryMode.find(x=>x.value === deliveryMode);
        body.append('delivery_mode',dMode.name);
        body.append('address',address);
        body.append('course_duration',serviceDuration);
        body.append('fee',fee);
        body.append('currency',currency.value);
        body.append('recurring',EditData ? isRecurring ? 1 : 0 : isRecurring);
        const rPeriod = ReccuringPeriod.find(x=>x.value === recPeriod);
        body.append('recurring_period',rPeriod.name);
        body.append('next_batch',nextBatchInput);
        body.append('default_image',EditData ?  imageDefault ? 1 : 0  : imageDefault);
        body.append('course_image',(serviceImg &&  (typeof serviceImg !== 'string')) ? 'data:image/jpeg;base64,' + serviceImg.base64  :  null);
        body.append('image_alt_text',null);
        body.append('img_tag','');
        // body.append('img_title',imageTitle);
        body.append('img_desc','');
        body.append('display_media_type',selectedDisplayMode === 'Image' ? 1 : 2);
        body.append('service_image',(serviceImg &&  (typeof serviceImg !== 'string')) ? 'data:image/jpeg;base64,' + serviceImg.base64  :  null);
        body.append('service_url',videoUrl);
        body.append('url',videoUrl);
        body.append('url_tag','');
        body.append('url_title','');
        body.append('url_desc','');
        body.append('tags',tag);
        body.append('response',true);
        return body;
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
    
    const checkSubCategory = (selected) =>{
        setSelectedCategory(selected);
        const val = category.find((x)=>x.value === selected);
        if(val)
            setMainSubCat(val.subcat);
    };

    const checkState = (selected) =>{
        const selectedCur = Currency.find(x=>x.country_label === selected);
        if(Currency)
            setCurrency(selectedCur);
        else
            setCurrency({name:'',value:''});
        setSelectedCountry(selected);
        setSelectedState('-- Select State --');
        const val = country.find((x)=>x.value === selected);
        if(val)
            setStates(val.state_list);
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
                setTutorImg(response);
                break; 
            case  1 :
                setServiceImg(response);
                break;
            }
        });
    };

    const renderSelectedFile = (option) =>{
        if(tutorImg && option === 0) 
            return (
                <TouchableOpacity onPress={()=>chooseFile(option)}>
                    <Image resizeMode={'contain'} source={{ uri: tutorImg.base64 ? 'data:image/jpeg;base64,' + tutorImg.base64 :  NEW_IMG_BASE + tutorImg }} style={GlobalStyles.selectedImageStyle} />
                </TouchableOpacity>
            );

        if(serviceImg && option === 1) 
            return (
                <TouchableOpacity onPress={()=>chooseFile(option)}>
                    <Image resizeMode={'contain'} source={{ uri: serviceImg.base64 ? 'data:image/jpeg;base64,' + serviceImg.base64 :  NEW_IMG_BASE + serviceImg }} style={GlobalStyles.selectedImageStyle} />
                </TouchableOpacity>
            );

        return <SelectImage onPress={()=>chooseFile(option)} />;
    };

    const renderTutor = () =>{
        return(
            <>
                <Text style={GlobalStyles.inputHeaderName}>SELECT TUTOR</Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={tutorList}
                        fontSize={12}
                        onChangeText={(value)=>setSelectedTutorFromList(value)}
                        value={selectedTutorFromList}
                    />
                </View>
                {
                    (selectedTutorFromList === 'Other') &&
                    <>
                        <Text style={GlobalStyles.inputHeaderName}>TUTOR NAME</Text>
                        <TextInput 
                            onChangeText = {(value)=>setTutorName(value)}
                            placeholder  = {'Tutor name'}
                            style={GlobalStyles.textInput}
                            value={tutorName}
                        />
                        <Text style={GlobalStyles.inputHeaderName}>TUTOR IMAGE</Text>
                        {renderSelectedFile(0)}
                    </>
                }
            </>
        );
    };

    const handleChange = (value) =>{
        setSelectedTypes(value);
    };

    const renderDeliveryMode = () =>{
        return(
            <>
                <Text style={GlobalStyles.inputHeaderName}>DELIVERY MODE</Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={DeliveryMode}
                        fontSize={12}
                        onChangeText={(value)=>setDeliveryMode(value)}
                        value={deliveryMode}
                    />
                </View>
                
            </>
        );
    };

    const renderStateAndCity = () =>{
        if(deliveryMode === 'Face To Face')
            return(
                <>
                    <Text style={GlobalStyles.inputHeaderName}>STATE</Text>
                    <View style={GlobalStyles.dropDownView}>
                        <Dropdown
                            data={states}
                            fontSize={12}
                            onChangeText={(value)=>setSelectedState(value)}
                            value={state}
                        />
                    </View>
                    <Text style={GlobalStyles.inputHeaderName}>CITY</Text>
                    <TextInput 
                        onChangeText = {(value)=>setSelectedCity(value)}
                        placeholder  = {'Enter your city name'}
                        style={GlobalStyles.textInput}
                        value={city}
                    />

                </>
            );
        return null;
    };

    const renderAddress = () =>{
        if(deliveryMode === 'Face To Face')
            return(
                <>
                    <Text style={GlobalStyles.inputHeaderName}>ADDRESS</Text>
                    <TextInput 
                        multiline={true}
                        onChangeText = {(value)=>setAddress(value)}
                        placeholder  = {'Enter address'}
                        style={{...GlobalStyles.textInput,height:moderateScale(100)}}
                        value={address}
                    />
                </>
            );
        return null;
    };

    const renderDisplayModeSelected = () =>{
        if((selectedDisplayMode === 'Image' && !imageDefault) || (selectedService === 'Custom Artwork' && selectedDisplayMode === 'Image') )
            return(
                <View>
                    <Text style={GlobalStyles.inputHeaderName}>SERVICE IMAGE </Text>
                    {renderSelectedFile(1)}
                    {/* <Text style={GlobalStyles.inputHeaderName}>IMAGE TITLE </Text>
                    <TextInput 
                        onChangeText = {(value)=>setImageTitle(value)}
                        placeholder  = {'Enter image title'}
                        style={GlobalStyles.textInput}
                        value={imageTitle}
                    /> */}
                </View>
            );
        if(selectedDisplayMode === 'Video')
            return(
                <>
                    <Text style={GlobalStyles.inputHeaderName}>YOUTUBE VIDEO ID </Text>
                    <TextInput 
                        onChangeText = {(value)=>setVideoUrl(value)}
                        placeholder  = {'Video url Ex. https://www.youtube.com/watch?v='}
                        style={GlobalStyles.textInput}
                        value={videoUrl}
                    />
                </>
            );
        return null;
    };

    const renderRecurring = () =>{
        return(
            <>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={GlobalStyles.inputHeaderName}>RECURRING ? </Text>
                    <CheckBox
                        disabled={false}
                        onValueChange={(value) => setIsRecurring(value)}
                        style={{width:moderateScale(25),height:moderateScale(25),marginLeft:moderateScale(10),marginTop:moderateScale(5)}}
                        value={isRecurring}
                    />
                </View>
                {
                    (isRecurring) &&
                    (
                        <>
                            <View style={GlobalStyles.dropDownView}>
                                <Dropdown
                                    data={ReccuringPeriod}
                                    fontSize={12}
                                    onChangeText={(value)=>setRecPeriod(value)}
                                    value={recPeriod}
                                />
                            </View>
                        </>
                    )
                }
                {
                    (!isRecurring) &&
                    (
                        <>
                            <Text style={GlobalStyles.inputHeaderName}>NEXT BATCH</Text>
                            <DatePicker
                                cancelBtnText="Cancel"
                                confirmBtnText="Confirm"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 10,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 60,
                                        height:30
                                    }
                                }}
                                date={nextBatchInput}
                                format="YYYY-MM-DD"
                                mode="date"
                                onDateChange={(date) => setNextBatchInput(date)}
                                placeholder="select date"
                                style={{width: 200}}
                            />
                        </>
                    )
                }
            </>
        );
    };

    const renderServiceDefaultImg = () =>{
        if(selectedDisplayMode !== 'Video')
            return(
                <>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={GlobalStyles.inputHeaderName}>SET SERVICE IMAGE BY-DEFAULT ? </Text>
                        <CheckBox
                            disabled={false}
                            onValueChange={(value) => setImageDefault(value)}
                            style={{width:moderateScale(25),height:moderateScale(25),marginLeft:moderateScale(10),marginTop:moderateScale(5)}}
                            value={imageDefault}
                        />
                    </View>
                
                </>
            );
        return null;
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={EditData ? 'Edit Services' : 'Add Services'} />
            <ScrollView 
                contentContainerStyle={{padding:moderateScale(10),paddingBottom:moderateScale(100)}} 
                showsVerticalScrollIndicator={false}
            >
                <View style={GlobalStyles.formWrapper}>

                    <Text style={GlobalStyles.inputHeaderName}>SERVICE TYPE</Text>
                    <View style={GlobalStyles.dropDownView}>
                        <Dropdown
                            data={serviceType}
                            fontSize={12}
                            onChangeText={(value)=>setSelectedService(value)}
                            value={selectedService}
                        />
                    </View>

                    <Text style={GlobalStyles.inputHeaderName}>SERVICE NAME 
                        <Text style={GlobalStyles.starColor}> *</Text>
                    </Text>
                    <TextInput 
                        onChangeText = {(value)=>setServiceName(value)}
                        placeholder  = {'Enter your course name'}
                        style={GlobalStyles.textInput}
                        value={serviceName}
                    />

                    <Text style={GlobalStyles.inputHeaderName}>TAGS (No Special Characters)</Text>
                    <TextInput 
                        onChangeText = {(value)=>{
                            const res = tagValidator(value);
                            setTag(res);
                        }}
                        placeholder  = {'Comma separated. Ex:- spenowr,awesome,beautiful'}
                        style={GlobalStyles.textInput}
                        value={tag}
                    />

                    { !enableCustomArtwork ?   renderTutor() : null }

                    <Text style={GlobalStyles.inputHeaderName}>CATEGORY 
                        <Text style={GlobalStyles.starColor}>*</Text>
                    </Text>
                    <View style={GlobalStyles.dropDownView}>
                        <Dropdown
                            data={category}
                            fontSize={12}
                            onChangeText={(value)=>checkSubCategory(value)}
                            value={selectedCategory}
                        />
                    </View>

                    <Text style={GlobalStyles.inputHeaderName}>SUB CATEGORY</Text>
                    <View style={GlobalStyles.dropDownView}>
                        <Dropdown
                            data={mainSubcat}
                            fontSize={12}
                            onChangeText={(value)=>setSelectedSubCategory(value)}
                            value={selectedSubCategory}
                        />
                    </View>

                    <Text style={GlobalStyles.inputHeaderName}>TYPE</Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:moderateScale(20)}}>
                        {
                            types.map((item,index)=>(
                                <Card EditData={EditData} cardItem={item} data={selectedTypes} handleChange={handleChange}  key={index} type={'small'} />
                            ))
                        }
                    </View>
                    {
                        (!types.length) && <Text style={{color:'#403e3e',fontSize:moderateScale(12)}}>No Types Available.</Text>
                    }
                    { !enableCustomArtwork ? renderDeliveryMode() : null}
                    <Text style={GlobalStyles.inputHeaderName}>COUNTRY
                        <Text style={GlobalStyles.starColor}> *</Text>
                    </Text>
                    <View style={GlobalStyles.dropDownView}>
                        <Dropdown
                            data={country}
                            fontSize={12}
                            onChangeText={(value)=>checkState(value)}
                            value={selectedCountry}
                        />
                    </View>

                    {!enableCustomArtwork ? renderStateAndCity() : null}

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

                    <Text style={GlobalStyles.inputHeaderName}>MINIMUM AGE REQUIREMENT</Text>
                    <TextInput 
                        keyboardType={'number-pad'}
                        onChangeText = {(value)=>setAge(value)}
                        placeholder  = {'Ex. 20-40'}
                        style={GlobalStyles.textInput}
                        value={age}
                    />

                    {!enableCustomArtwork ? renderAddress() : null}

                    <Text style={GlobalStyles.inputHeaderName}>SERVICE DURATION</Text>
                    <TextInput 
                        keyboardType={'number-pad'}
                        onChangeText = {(value)=>setServiceDuration(value)}
                        placeholder  = {'Enter number of Days, (Ex - 20)'}
                        style={GlobalStyles.textInput}
                        value={serviceDuration}
                    />

                    <Text style={GlobalStyles.inputHeaderName}>SERVICE FEE</Text>
                    <TextInput 
                        keyboardType={'number-pad'}
                        onChangeText = {(value)=>setFee(value)}
                        placeholder  = {'Enter course fee'}
                        style={GlobalStyles.textInput}
                        value={fee}
                    />

                    <Text style={GlobalStyles.inputHeaderName}>CURRENCY</Text>
                    <TextInput 
                        editable={false}
                        placeholder  = {'Select country to set currency'}
                        style={{...GlobalStyles.textInput,color:'#b0b0b0'}}
                        value={currency.name}
                    />

                    {!enableCustomArtwork  ? renderRecurring() : null}

                    <Text style={GlobalStyles.inputHeaderName}>DISPLAY MODE</Text>
                    <View style={GlobalStyles.dropDownView}>
                        <Dropdown
                            data={DisplayMode}
                            fontSize={12}
                            onChangeText={(value)=>setSelectedDisplayMode(value)}
                            value={selectedDisplayMode}
                        />
                    </View>

                    {!enableCustomArtwork ? renderServiceDefaultImg() : null}

                    {renderDisplayModeSelected()}

                    <DefaultButton buttonText={EditData ? 'Update Service' : 'Add'} onPress={()=>validateData()} showLoader={loader} />
                </View>
                <PointShowCase pointsEarned={earned} totalPoints={total} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddServiceScreen;

