import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View,Text,TextInput, Platform, Image, TouchableOpacity } from 'react-native';
import DefaultHeader from '../../../../../../@GlobalComponents/DefaultHeader';
import FormHeader from '../../../../../../@GlobalComponents/FormHeader';
import { GlobalStyles } from '../../../../../../@GlobalStyles';
import { useFormik} from 'formik';
import styles from './styles';
import DefaultButton from '../../../../../../@GlobalComponents/DefaultButton';
import * as Yup from 'yup';
import SelectImage from '../../../../../../@GlobalComponents/SelectImage';
import { pickImage } from '../../../../../../@Utils/helperFiles/ImagePicker';
import Toast from 'react-native-simple-toast';
import { requestProfileVerification } from '../../../../../../@Endpoints/Auth';
import useUserData from '../../../../../../@Hooks/useUser';

const ProfileVerificationScreen = ({...props}:any) => {
    const {navigation} = props;

    const [loader, setLoader] = useState(false);
    const {UserInstituteData} = useUserData();
    
    const _handleOnSubmit = () => {
        try {
            if( !formik?.values?.idProof?.assets[0]?.base64 ) {
                Toast.show('Please Add ID Proof');
            }
            else{
                setLoader(true);
                requestProfileVerification(formik.values)
                    .then(()=>{
                        setTimeout(()=>{
                            Toast.show('Submission Successful');
                            navigation.goBack();
                        },300);
                    })
                    .catch()
                    .finally(()=>setLoader(false));
            }
        } catch (error) {
            Toast.show('Something Went Wrong');
        }
    };

    const VerificationScheme = Yup.object().shape({
        pan: Yup.string()
            .min(10, 'Too Short!')
            .required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            userName: UserInstituteData?.institute_name??'',
            pan: '',
            aadhar: '',
            gst:'',
            idProof : [{assets:[]}],
        },
        onSubmit: _handleOnSubmit,
        validationSchema : VerificationScheme
    });

    const RenderSelectedFile = () =>{
        if(formik.values?.idProof?.assets?.length)
            return (
                <TouchableOpacity onPress={chooseFile}>
                    <Image resizeMode={'contain'} source={{ uri:  'data:image/jpeg;base64,' + formik?.values?.idProof?.assets[0]?.base64 ?? '' }} style={styles.selectedImageStyle} />
                </TouchableOpacity>
            );
        return <SelectImage onPress={chooseFile} />;
    };

    const chooseFile = () => {
        pickImage((res)=>{
            let response = res;
            if(Platform.OS === 'android'){
                if(res?.assets) response = res?.assets[0];
            }
            if(response.didCancel) return;
            if(response) formik.handleChange({ target: { name: 'idProof', value: response }});
        });
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Verification'} />
            <View style={styles.container}>
                <FormHeader headerText={'VERIFY PROFILE FORM'}  />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.formWrapper}>
                        <View>
                            <Text style={GlobalStyles.inputHeaderName}>USER NAME 
                                <Text style={GlobalStyles.starColor}>*</Text>
                            </Text>
                            <TextInput
                                editable={false}
                                onBlur={formik.handleBlur('userName')}
                                onChangeText={formik.handleChange('userName')}
                                style={[GlobalStyles.textInput,styles.inputDisabled]}
                                value={formik.values.userName}
                            />
                            <Text style={GlobalStyles.inputHeaderName}>PANCARD 
                                <Text style={GlobalStyles.starColor}>*</Text>
                            </Text>
                            <TextInput
                                onBlur={formik.handleBlur('pan')}
                                onChangeText={formik.handleChange('pan')}
                                style={GlobalStyles.textInput}
                                value={formik.values.pan}
                            />
                            {formik.errors.pan && formik.touched.pan ? <Text style={GlobalStyles.required}>*Required</Text> : <></>}
                            <Text style={GlobalStyles.inputHeaderName}>AADHAR CARD </Text>
                            <TextInput
                                onBlur={formik.handleBlur('aadhar')}
                                onChangeText={formik.handleChange('aadhar')}
                                style={GlobalStyles.textInput}
                                value={formik.values.aadhar}
                            />
                            <Text style={GlobalStyles.inputHeaderName}>GST</Text>
                            <TextInput
                                onBlur={formik.handleBlur('gst')}
                                onChangeText={formik.handleChange('gst')}
                                style={GlobalStyles.textInput}
                                value={formik.values.gst}
                            />
                            <Text style={GlobalStyles.inputHeaderName}>ID PROOF
                                <Text style={GlobalStyles.starColor}>*</Text>
                            </Text>
                            <RenderSelectedFile />
                            {formik.errors.idProof && formik.touched.idProof ? <Text style={GlobalStyles.required}>*Required</Text> : <></>}
                            <DefaultButton  buttonText={'Submit Now'} onPress={formik.handleSubmit} showLoader={loader} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ProfileVerificationScreen;