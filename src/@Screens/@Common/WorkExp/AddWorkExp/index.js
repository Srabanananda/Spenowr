/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {SafeAreaView,ScrollView,Text,View,TextInput,TouchableOpacity, Image, Platform} from 'react-native';
import DefaultHeader from '@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import DatePicker from 'react-native-datepicker';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import * as Yup from 'yup';
import SelectImage from '../../../../@GlobalComponents/SelectImage';
import { useFormik} from 'formik';
import { pickImage } from '../../../../@Utils/helperFiles/ImagePicker';
import { addWorkExp, updateWorkExp } from '../../../../@Endpoints/Core/Tabs/More';
import Config from '@Config/default';

const {NEW_IMG_BASE } = Config;
 
 type WorkExpScreenProps = {
     route : Object,
     navigation : Object
 }
 
const AddWorkExpScreen = ({...props}: WorkExpScreenProps) =>{
 
    const currentDate  = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
 
    const {route,navigation} = props;
 
    const EditData = route.params ? route.params.EditData : null;
 
    const [loader, setLoader] = useState(false);

    const VerificationScheme = Yup.object().shape({
        title: Yup.string()
            .min(3, 'Too Short!')
            .required('Required'),
        orgName: Yup.string()
            .min(3, 'Too Short!')
            .required('Required'),
        expDescription: Yup.string()
            .min(3, 'Too Short!')
            .required('Required'),
        startDate: Yup.date()
            .max(currentDate)
            .required(),
    });

    const AddApi = () => {
        addWorkExp(formik.values)
            .then(()=>{
                Toast.show('Added Successfully');
                navigation.goBack();
            })
            .catch(()=>{
                Toast.show('Oops Something went wrong');
            })
            .finally(()=>setLoader(false));
    };

    const UpdateApi = () => {

        updateWorkExp(formik.values,EditData?.exp_id??'')
            .then(()=>{
                Toast.show('Edited Successfully');
                navigation.goBack();
            })
            .catch(()=>{
                Toast.show('Oops Something went wrong');
            })
            .finally(()=>setLoader(false));

    };

    const _handleOnSubmit = () => {
        setLoader(true);
        EditData ? UpdateApi() : AddApi(); 
    };

    const formik = useFormik({
        initialValues: {
            title:EditData?.title ?? '',
            orgName:EditData?.exp_givenby?? '',
            currentlyWorking : EditData?.job_active === '1' ? true : false,
            startDate: EditData?.start_date??'',
            endDate:EditData?.endDate ?? '',
            certificate : {assets:[]},
            expDescription : EditData?.description ?? ''
        },
        onSubmit: _handleOnSubmit,
        validationSchema : VerificationScheme
    });

    const chooseFile = () => {
        pickImage((res)=>{
            let response = res;
            if(Platform.OS === 'android'){
                if(res?.assets) response = res?.assets[0];
            }
            if(response.didCancel) return;
            if(response) formik.handleChange({ target: { name: 'certificate', value: response }});
        });
    };

    const RenderSelectedFile = () =>{
        if(formik.values?.certificate?.assets?.length)
            return (
                <TouchableOpacity onPress={chooseFile}>
                    <Image resizeMode={'contain'} source={{ uri: 'data:image/jpeg;base64,' + formik?.values?.certificate?.assets[0]?.base64 ?? '' }} style={GlobalStyles.selectedImageStyle} />
                </TouchableOpacity>
            );
        if(EditData?.workexp_image_path?.length)
            return (
                <TouchableOpacity onPress={chooseFile}>
                    <Image resizeMode={'contain'} source={{uri :  NEW_IMG_BASE +EditData?.workexp_image_path}} style={GlobalStyles.selectedImageStyle} />
                </TouchableOpacity>
            );
        return <SelectImage onPress={chooseFile} />;
    };
 
    const renderForm =()=> {
        return(
            <View style={GlobalStyles.formWrapper}>

                <Text style={GlobalStyles.inputHeaderName}>JOB TITLE
                    <Text style={GlobalStyles.starColor}>*</Text>
                </Text>
                <TextInput 
                    onChangeText={formik.handleChange('title')}
                    placeholder  = {'Enter a title (no special characters)'}
                    style={GlobalStyles.textInput}
                    value={formik.values.title}
                />
                {formik.errors.title && formik.touched.title ? <Text style={GlobalStyles.required}>*Required</Text> : <></>}

                <Text style={GlobalStyles.inputHeaderName}>ORGANIZATION NAME
                    <Text style={GlobalStyles.starColor}>*</Text>
                </Text>
                <TextInput 
                    onChangeText={formik.handleChange('orgName')}
                    placeholder  = {'Enter a title (no special characters)'}
                    style={GlobalStyles.textInput}
                    value={formik.values.orgName}
                />
                {formik.errors.orgName && formik.touched.orgName ? <Text style={GlobalStyles.required}>*Required</Text> : <></>}

                <View style={{flexDirection:'row',marginTop:moderateScale(10)}}>
                    <CheckBox
                        disabled={false}
                        onValueChange={(val)=>formik.handleChange({ target: { name: 'currentlyWorking', value: val }})}
                        style={{marginRight:moderateScale(10)}}
                        value={formik.values.currentlyWorking}
                    />
                    <Text style={GlobalStyles.inputHeaderName}>Currently I am working here.</Text>
                </View>

                <Text style={GlobalStyles.inputHeaderName}>START DATE
                    <Text style={GlobalStyles.starColor}>*</Text>
                </Text>
 
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
                    date={formik.values.startDate}
                    onDateChange={(time)=>formik.handleChange({ target: { name: 'startDate', value: time }})}
                    placeholder="Select date"
                    style={{width: 300}}
                />  
                {formik.errors.startDate && formik.touched.startDate ? <Text style={GlobalStyles.required}>*Required</Text> : <></>}

                {
                    !formik.values.currentlyWorking &&
                    <>
                        <Text style={GlobalStyles.inputHeaderName}>END DATE
                            <Text style={GlobalStyles.starColor}>*</Text>
                        </Text>
 
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
                            date={formik.values.endDate}
                            onDateChange={(time)=>formik.handleChange({ target: { name: 'endDate', value: time }})}
                            placeholder="Select date"
                            style={{width: 300}}
                        />  
                    </>
                }

               
               
                <Text style={GlobalStyles.inputHeaderName}>WRITE SOMETHING ABOUT YOUR WORK EXPERIENCE 
                    <Text style={GlobalStyles.starColor}>*</Text>
                </Text>
                <TextInput 
                    multiline={true}
                    onChangeText={formik.handleChange('expDescription')}
                    placeholder  = {'Something about your work experience'}
                    style={{...GlobalStyles.textInput,height:moderateScale(100),textAlignVertical:'top'}}
                    value={formik.values.expDescription}
                />
                {formik.errors.expDescription && formik.touched.expDescription ? <Text style={GlobalStyles.required}>*Required</Text> : <></>}

                <Text style={GlobalStyles.inputHeaderName}>WORK EXPERIENCE CERTIFICATE</Text>
                <RenderSelectedFile />

                
            </View>
        );
    };
 
    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={EditData ? 'Edit Work Experience' : 'Add Work Experience'} />
            <ScrollView 
                contentContainerStyle={{padding:moderateScale(5),paddingBottom:moderateScale(100)}} 
                showsVerticalScrollIndicator={false}
            >
                {renderForm()}
                <DefaultButton 
                    buttonText={EditData ? 'Update Now' : 'Add Now'} 
                    onPress={formik.handleSubmit} 
                    showLoader={loader} 
                />
            </ScrollView>
        </SafeAreaView>
    );
};
 
export default AddWorkExpScreen;