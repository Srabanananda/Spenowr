/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text, TextInput,TouchableOpacity,Image,Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DefaultButton from '../../../../../../@GlobalComponents/DefaultButton';
import FormHeader from '../../../../../../@GlobalComponents/FormHeader';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import { sendSellerFormRequest } from '../../../../../../@Endpoints/Core/Tabs/MyAccount';
import SelectImage from '../../../../../../@GlobalComponents/SelectImage';
import { getUserDetails } from '../../../../../../@Endpoints/Auth';
import * as userActions from '@Redux/actions/userActions';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { pickImage } from '../../../../../../@Utils/helperFiles/ImagePicker';

const shopActions = [
    {
        icon : 'store', 
        header : 'Add a shop to your Profile', 
        desc : 'Showcase your products in a customizable storefront on your spenowr profile'
    },
    {
        icon : 'shopping-bag', 
        header : 'Earn rewards through sell', 
        desc : 'For each sell you make, you earn reward points that you can redeem.'
    },
    {
        icon : 'signal', 
        header : 'Get Insights about your shop', 
        desc : 'Learn what engages your customer with insights like product views'
    }
];

const RequestForm = ({setSellerProfile,...props}) =>{

    const {navigation,updateUserDetails} = props;

    const [loader, setLoader] = useState(false);
    const [sellerName , setSellerName] = useState('');
    const [pancard , setPancard] = useState('');
    const [aadhar , setAadhar] = useState('');
    const [gst, setGst] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const [showForm, setShowForm] = useState(false);

    const getImageFormData = (data) =>{
        data.append('gst_document', 'data:image/jpeg;base64,' + selectedFile.base64);
    };
    
    const startSubmission = () =>{

        if(sellerName === '' || pancard === '' || aadhar === '')
        {
            Toast.show('Please fill all required fields');
        }
        else
        {
            if(selectedFile)
            {
                const formData = new FormData();
                formData.append('seller_name',sellerName);
                formData.append('pancard_id',pancard);
                formData.append('adhar_id',aadhar);
                formData.append('gst_id',gst);
                getImageFormData(formData);
                setLoader(true);
                sendSellerFormRequest(formData)
                    .then(()=>{
                        refreshProfile();
                    })
                    .catch(()=>{
                        Toast.show('Your Request Failed!',Toast.LONG);
                        setLoader(false);
                    });
            }
            else{
                Toast.show('Please Select an ID prooof');
            }
        }
        
    };

    const refreshProfile = () =>{
        getUserDetails()
            .then(res=>{
                const {data:{institute={},profileData={}}} = res;
                updateUserDetails(institute,profileData);
                setLoader(false);
                Toast.show('Your Request Submitted Successfully!',Toast.LONG);
                setSellerProfile('2');
            })
            .catch();
    };

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

    const renderSelectedFile = () =>{
        if(selectedFile) 
            return (
                <TouchableOpacity onPress={()=>chooseFile()}>
                    <Image resizeMode={'contain'} source={{ uri: 'data:image/jpeg;base64,' + selectedFile.base64 }} style={styles.selectedImageStyle} />
                </TouchableOpacity>
            );

        return <SelectImage onPress={()=>chooseFile()} />;
    };

    if(showForm)
        return(
            <View style={styles.container}>
                <FormHeader headerText={'SELLER REQUEST FORM'}  />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.formWrapper}>
                        <Text style={styles.inputHeaderName}>SELLER NAME 
                            <Text style={styles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            onChangeText = {(value)=>setSellerName(value)}
                            placeholder={'Your Name'}
                            style={styles.textInput}
                            value={sellerName}
                        />

                        <Text style={styles.inputHeaderName}>PAN CARD
                            <Text style={styles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            onChangeText = {(value)=>setPancard(value)}
                            placeholder={'Pancard Id'}
                            style={styles.textInput}
                            value={pancard}
                        />

                        <Text style={styles.inputHeaderName}>AADHAR CARD
                            <Text style={styles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            onChangeText = {(value)=>setAadhar(value)}
                            placeholder={'Aadhard Card ID'}
                            style={styles.textInput}
                            value={aadhar}
                        />

                        <Text style={styles.inputHeaderName}>GST</Text>
                        <TextInput 
                            onChangeText = {(value)=>setGst(value)}
                            placeholder={'GST Id'}
                            style={styles.textInput}
                            value={gst}
                        />

                        <Text style={styles.inputHeaderName}>ID PROOF
                            <Text style={styles.starColor}>*</Text>
                        </Text>
                        {renderSelectedFile()}
                    </View>
                    <DefaultButton  buttonText={'SEND'} onPress={()=>startSubmission()} showLoader={loader} />
                </ScrollView>
            </View>
        );
    
    return(
        <View style={styles.gettinStartedContainer}>
            <View style={{height:'88%'}}>
                <View style={styles.iconCircle}>
                    <Icon name={'shopping-bag'} size={50} style={styles.bagIcon} />
                </View>
                <Text style={styles.headerText} >Open Your Shop on</Text>
                <Text style={styles.headerText}>Spenowr</Text>
                <View style={styles.wrapper}>
                    {
                        shopActions.map((item,i)=>{
                            const {icon, header, desc} = item;
                            return(
                                <View key={i} style={styles.actionContainer}>
                                    <Icon name={icon} size={18} style={styles.smallIconStyles} />
                                    <View style={{marginLeft:15}}>
                                        <Text style={styles.header}>{header}</Text>
                                        <Text style={styles.description}>{desc}</Text>
                                    </View>
                                </View>
                            );
                        })
                    }
                </View>
            </View>
            <DefaultButton buttonText='Get Started' onPress={()=>setShowForm(true)} showLoader={false} />
        </View>
    );
};

const mapStateToProps = () => {
    return {};
};
const mapDispatchToProp = (dispatch) => ({
    updateUserDetails:(instituteObj,profileObj) =>
        dispatch(userActions.updateUserDetails(instituteObj,profileObj))
});


export default connect(mapStateToProps,mapDispatchToProp)(RequestForm);