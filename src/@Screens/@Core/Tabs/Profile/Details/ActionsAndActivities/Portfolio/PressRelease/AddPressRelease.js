/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,StyleSheet,View,ScrollView,
    Text,TextInput,Image,Platform,StatusBar, SafeAreaView
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../../../../../@GlobalComponents/ModalHeader';
import Config from '@Config/default';
import Toast from 'react-native-simple-toast';
import DefaultButton from '../../../../../../../../@GlobalComponents/DefaultButton';
import { addArtistPressRelease,editArtistPressRelease } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import SelectImage from '../../../../../../../../@GlobalComponents/SelectImage';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { pickImage } from '../../../../../../../../@Utils/helperFiles/ImagePicker';

const {COLOR:{RED,APP_PINK_COLOR,DARK_BLACK,LIGHTGREY},NEW_IMG_BASE} = Config;

const AddPressRelease = ({refreshData,showEdit=false,cardItem}) =>{

    const [isActive, setIsActive] = useState(false);
    const [loader, setLoader] = useState(false);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [altImgText, setAltImgText] = useState('');
    const [date, setDate] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const resetData = () =>{
        setName('');
        setDesc('');
        setAltImgText('');
        setDate('');
        setSelectedFile(null);
    };

    useEffect(()=>{
        if(cardItem)
        {
            const {
                description,
                press_name,
                reduced_press_image,
                image_alt_text,
                press_date
            } = cardItem;
            setName(press_name);
            setDesc(description);
            setSelectedFile(reduced_press_image);
            setAltImgText(image_alt_text);
            setDate(press_date);
        }
    },[cardItem]);

    const renderSelectedFile = () =>{
        if(selectedFile) 
            return (
                <TouchableOpacity onPress={()=>chooseFile()}>
                    <Image 
                        resizeMode={'contain'} 
                        source={{ uri: cardItem ? typeof selectedFile === 'string' ? NEW_IMG_BASE + selectedFile  :  'data:image/jpeg;base64,' + selectedFile.base64 :  'data:image/jpeg;base64,' + selectedFile.base64 }} 
                        style={GlobalStyles.selectedImageStyle} 
                    />
                </TouchableOpacity>
            );

        return <SelectImage onPress={()=>chooseFile()} />;
    };

    const chooseFile = () => {
        pickImage((res)=>{
            let response = res;
            if(Platform.OS === 'android'){
                if(res?.assets) response = res.assets[0];
            }
            if(response.didCancel)  return;
            setSelectedFile(response);
        });
    };
    
    const getImageFormData = (data) =>{
        selectedFile.base64  ? data.append('press_image', 'data:image/jpeg;base64,' + selectedFile.base64) : data.append('press_image',null);
    };

    const checkData = () =>{
        if(name ==='' || desc === ''  || date === '')
            Toast.show('Please fill the Mandatory fields',Toast.LONG);
        else
        {
            setLoader(true);
            const body = new FormData();
            body.append('press_name',name);
            body.append('description',desc);
            body.append('image_alt_text',altImgText);
            body.append('press_date',date);
           
            if(selectedFile) getImageFormData(body);
            else
                body.append('press_image',null);

            if(showEdit)
            {
                body.append('press_id',cardItem.press_id);
                editArtistPressRelease(body)
                    .then(()=>{
                        setLoader(false);
                        setIsActive(false);
                        resetData();
                        refreshData();
                    })
                    .catch(()=>{
                        Toast.show('Oops something went wrong',Toast.LONG);
                        setLoader(false);
                    });
            }
            else
            {
                addArtistPressRelease(body)
                    .then(()=>{
                        setLoader(false);
                        setIsActive(false);
                        resetData();
                        refreshData();
                    })
                    .catch(()=>{
                        Toast.show('Event Addition Failed', Toast.LONG);
                        setLoader(false);
                    });
            }
           
        }
    };

    const renderAddAwardForm = () =>{
        return(
            <SafeAreaView style={styles.container}>
                {Platform.OS === 'ios' ? null : <StatusBar hidden />}
                <ModalHeader headerText={showEdit ? 'Edit Your Press Release' :  'Add Your Press Release'} onPress = {()=>{setIsActive(false);}} />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.formWrapper}>
                        <Text style={styles.inputHeaderName}>PRESS NAME 
                            <Text style={styles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            onChangeText = {(value)=>setName(value)}
                            placeholder={'Event Name'}
                            style={styles.textInput}
                            value={name}
                        />
                        <Text style={styles.inputHeaderName}>DESCRIPTION 
                            <Text style={styles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            multiline={true}
                            onChangeText = {(value)=>setDesc(value)}
                            placeholder={'A Short Description'}
                            style={{...styles.textInput,height:moderateScale(100)}}
                            value={desc}
                        />
                      
                        <Text style={styles.inputHeaderName}>PRESS RELEASE DATE
                            <Text style={styles.starColor}>*</Text>
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
                            date={date}
                            format="YYYY-MM-DD"
                            mode="date"
                            onDateChange={(date) => setDate(date)}
                            placeholder="select date"
                            style={{width: 200}}
                        />
                        <Text style={styles.inputHeaderName}>IMAGE</Text>
                        {renderSelectedFile()}

                        <Text style={styles.inputHeaderName}>IMAGE TITLE</Text>
                        <TextInput 
                            onChangeText = {(value)=>setAltImgText(value)}
                            placeholder={'Set a title for the image'}
                            style={styles.textInput}
                            value={altImgText}
                        />
                        <DefaultButton buttonText={showEdit ? 'UPDATE' :'ADD'} onPress={()=>checkData()} showLoader={loader}  />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    };

    return(
        <>
            {
                (showEdit) && 
                <TouchableOpacity onPress={()=>setIsActive(true)} style={GlobalStyles.seeMoreButton}>
                    <Text style={GlobalStyles.seeMoreButtonText}>Edit</Text>
                </TouchableOpacity>
                
            }
            {
                (!showEdit) &&
                <TouchableOpacity onPress={()=>setIsActive(true)}>
                    <Icon color={'#fff'} name={'plus'} size={moderateScale(18)} />
                </TouchableOpacity>
            }
            
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
                style={{margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderAddAwardForm()}
            </Modal>
        </>
    );
};


AddPressRelease.propTypes = {
    cardItem:PropTypes.object,
    refreshData:PropTypes.func.isRequired,
    showEdit:PropTypes.bool,
};

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps)(AddPressRelease);

const styles = StyleSheet.create({
    container: {
        height:'100%',
        backgroundColor:'#fff',
        width:'100%',
        padding:moderateScale(20),
        paddingHorizontal:moderateScale(10),
        borderTopLeftRadius:moderateScale(30),
        borderTopRightRadius:moderateScale(30)

    },
    formWrapper:{
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(4), elevation: moderateScale(2),
        shadowOffset: {
            height: scale(2),
            width: scale(2)
        },
        backgroundColor:'#fff',
        margin:moderateScale(5),
        padding:moderateScale(5),
        paddingHorizontal:moderateScale(10),
        marginTop:moderateScale(10),
        borderTopColor:APP_PINK_COLOR,
        borderTopWidth:1.5
    },
    inputHeaderName:{
        color:DARK_BLACK,
        marginTop:moderateScale(8),
        fontSize:moderateScale(12)
    },
    starColor:{
        color:RED,
    },  
    textInput:{
        borderWidth:1,paddingLeft:moderateScale(15),
        borderColor:LIGHTGREY,
        marginVertical:moderateScale(8),
        borderRadius:moderateScale(3),
        height:moderateScale(40),
        textAlignVertical:'top'
    },
    EditBtn:{
        color:APP_PINK_COLOR,
        fontWeight:'bold',
        fontSize:moderateScale(14)
    }
});
