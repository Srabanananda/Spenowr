/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,StyleSheet,View,ScrollView,
    Text,TextInput,Image, Platform,StatusBar, SafeAreaView
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../../../../../@GlobalComponents/ModalHeader';
import Config from '@Config/default';
import Toast from 'react-native-simple-toast';
import DefaultButton from '../../../../../../../../@GlobalComponents/DefaultButton';
import { addArtistAwards,editArtistAwards } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import SelectImage from '../../../../../../../../@GlobalComponents/SelectImage';
import DatePicker from 'react-native-datepicker';
import * as ProfileDataActions from '@Redux/actions/profileActions';
import { connect } from 'react-redux';
import { pickImage } from '../../../../../../../../@Utils/helperFiles/ImagePicker';

const {COLOR:{RED,APP_PINK_COLOR,DARK_BLACK,LIGHTGREY},NEW_IMG_BASE} = Config;

const AddAwards = ({refreshData,showEdit=false,cardItem,...props}) =>{

    const {fetchArtistAwards} = props;

    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState('');
    const [givenBy, setGivenBy] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(()=>{
        if(cardItem)
        {  
            const {
                image_alt_text,
                award_givenby,
                award_name,
                description,
                mob_award_date,
                award_image_path
            } = cardItem;
            setName(award_name);
            setGivenBy(award_givenby);
            setDesc(description);
            setDate(mob_award_date);
            setImgTitle(image_alt_text);
            setSelectedFile(award_image_path);

        }
    },[cardItem]);

    const renderSelectedFile = () =>{
        if(selectedFile) 
            return (
                <TouchableOpacity onPress={()=>chooseFile()}>
                    <Image 
                        resizeMode={'contain'} 
                        source={{ uri: cardItem ? selectedFile.base64 ? 'data:image/jpeg;base64,' + selectedFile.base64 :   NEW_IMG_BASE + cardItem.award_image_path :  'data:image/jpeg;base64,' + selectedFile.base64 }} 
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
            if(response.didCancel) return;
            setSelectedFile(response);
        });
    };
    
    const getImageFormData = (data) =>{
        (typeof selectedFile === 'string')  ? data.append('award_image_path', null) : data.append('award_image_path', 'data:image/jpeg;base64,' + selectedFile.base64);
    };

    const checkData = () =>{
        if(name ==='' || givenBy === '' || desc === '' || date === '')
            Toast.show('Please fill the Mandatory fields',Toast.LONG);
        else
        {
            setLoader(true);
            const body = new FormData();
            body.append('award_name',name);
            body.append('award_givenby',givenBy);
            body.append('description',desc);
            body.append('award_date',date);
            if(selectedFile)getImageFormData(body);
            else
                body.append('award_image_path',selectedFile);
            body.append('image_alt_text',imgTitle);
            if(showEdit)
            {
                body.append('getaward_id',cardItem.getaward_id);
                editArtistAwards(body)
                    .then(()=>{
                        setLoader(false);
                        setIsActive(false);
                        refreshData();
                    })
                    .catch(()=>{
                        setLoader(false);
                    });
            }
            else
            {
                addArtistAwards(body)
                    .then(()=>{
                        fetchArtistAwards();
                        setLoader(false);
                        setIsActive(false);
                        refreshData();
                    })
                    .catch(()=>{
                        Toast.show('Award Addition Failed', Toast.LONG);
                        setLoader(false);
                    });
            }
           
        }
    };

    const renderAddAwardForm = () =>{
        return(
            <SafeAreaView style={styles.container}>
                {Platform.OS === 'ios' ? null : <StatusBar hidden />}
                <ModalHeader headerText={showEdit ? 'Edit Your Award' :  'Add Your Award'} onPress = {()=>{setIsActive(false);}} />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.formWrapper}>
                        <Text style={styles.inputHeaderName}>AWARD NAME 
                            <Text style={styles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            onChangeText = {(value)=>setName(value)}
                            placeholder={'Award Name'}
                            style={styles.textInput}
                            value={name}
                        />
                        <Text style={styles.inputHeaderName}>AWARD GIVEN BY 
                            <Text style={styles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            onChangeText = {(value)=>setGivenBy(value)}
                            placeholder={'Award Given Name'}
                            style={styles.textInput}
                            value={givenBy}
                        />
                        <Text style={styles.inputHeaderName}>A DESCRIPTION ABOUT YOUR AWARD 
                            <Text style={styles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            multiline={true}
                            onChangeText = {(value)=>setDesc(value)}
                            placeholder={'A Short Description'}
                            style={{...styles.textInput,height:moderateScale(100)}}
                            value={desc}
                        />

                        <Text style={styles.inputHeaderName}>AWARD DATE
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
                        <Text style={styles.inputHeaderName}>AWARD IMAGE</Text>
                        {renderSelectedFile()}
                        <DefaultButton buttonText={showEdit ? 'UPDATE AWARD' :'ADD AWARD'} onPress={()=>checkData()} showLoader={loader}  />
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


AddAwards.propTypes = {
    
    cardItem:PropTypes.object,
    fetchArtistAwards:PropTypes.func.isRequired,
    refreshData:PropTypes.func.isRequired,
    showEdit:PropTypes.bool,
};

const mapStateToProps = () => {
    return {};
};
const mapDispatchToProp = (dispatch) => ({
    fetchArtistAwards:()=>
        dispatch(ProfileDataActions.fetchArtistAwards()),
});

export default connect(mapStateToProps,mapDispatchToProp)(AddAwards);

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
