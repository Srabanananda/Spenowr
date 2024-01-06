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
import { addArtistEvent,editArtistEvent } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import SelectImage from '../../../../../../../../@GlobalComponents/SelectImage';
import DatePicker from 'react-native-datepicker';
import { pickImage } from '../../../../../../../../@Utils/helperFiles/ImagePicker';

const {COLOR:{RED,APP_PINK_COLOR,DARK_BLACK,LIGHTGREY},NEW_IMG_BASE} = Config;

const AddEvent = ({refreshData,showEdit=false,cardItem}) =>{

    const [isActive, setIsActive] = useState(false);
    const [loader, setLoader] = useState(false);

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [youtube, setYoutube] = useState('');
    const [organiser, setOrganiser] = useState('');
    const [webUrl, setWebUrl] = useState('');
    const [bookingUrl, setBookingUrl] = useState('');
    const [address, setAddress] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [date, setDate] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(()=>{
        if(cardItem)
        {
            const {
                event_booking_url,
                event_description,
                event_marketing_video,
                event_name,
                event_organizer_name,
                event_web_url,
                from_time,
                thumbnail_event_banner_path,
                street_address,
                to_time,
                mob_event_date,
            } = cardItem;
            setName(event_name);
            setDesc(event_description);
            setYoutube(event_marketing_video);
            setOrganiser(event_organizer_name);
            setWebUrl(event_web_url);
            setBookingUrl(event_booking_url);
            setAddress(street_address);
            setStartTime(from_time);
            setEndTime(to_time);
            setSelectedFile(thumbnail_event_banner_path);
            setDate(mob_event_date);
        }
    },[cardItem]);

    const renderSelectedFile = () =>{
        if(selectedFile) 
            return (
                <TouchableOpacity onPress={()=>chooseFile()}>
                    <Image 
                        resizeMode={'contain'} 
                        source={{ uri: cardItem ? selectedFile.base64 ? 'data:image/jpeg;base64,' + selectedFile.base64 :   NEW_IMG_BASE + selectedFile :  'data:image/jpeg;base64,' + selectedFile.base64 }} 
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
        ( typeof selectedFile === 'string') ?  data.append('event_banner_image', null) :  data.append('event_banner_image', 'data:image/jpeg;base64,' + selectedFile.base64);
    };

    const checkData = () =>{
        if(name ==='' || startTime === ''  || endTime === '' || date === '')
            Toast.show('Please fill the Mandatory fields',Toast.LONG);
        else
        {
            setLoader(true);
            const body = new FormData();
            body.append('event_name',name);
            body.append('event_description',desc);
            body.append('event_marketing_video',youtube);
            body.append('event_organizer_name',organiser);
            body.append('event_web_url',webUrl);
            body.append('event_booking_url',bookingUrl);
            body.append('street_address',address);
            body.append('event_date',date);
            body.append('from_time',startTime);
            body.append('to_time',endTime);

            if(selectedFile)getImageFormData(body);
            else
                body.append('event_banner_image',null);

            if(showEdit)
            {
                body.append('event_id',cardItem.event_id);
                editArtistEvent(body)
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
                addArtistEvent(body)
                    .then(()=>{
                        setLoader(false);
                        setIsActive(false);
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
                <ModalHeader headerText={showEdit ? 'Edit Your Event' :  'Add Your Event'} onPress = {()=>{setIsActive(false);}} />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.formWrapper}>
                        <Text style={styles.inputHeaderName}>EVENT NAME 
                            <Text style={styles.starColor}>*</Text>
                        </Text>
                        <TextInput 
                            onChangeText = {(value)=>setName(value)}
                            placeholder={'Event Name'}
                            style={styles.textInput}
                            value={name}
                        />
                        <Text style={styles.inputHeaderName}>A DESCRIPTION ABOUT YOUR EVENT </Text>
                        <TextInput 
                            multiline={true}
                            onChangeText = {(value)=>setDesc(value)}
                            placeholder={'A Short Description'}
                            style={{...styles.textInput,height:moderateScale(100)}}
                            value={desc}
                        />
                        <Text style={styles.inputHeaderName}>YOUTUBE URL </Text>
                        <TextInput 
                            onChangeText = {(value)=>setYoutube(value)}
                            placeholder={'Marketing Video Youtube url'}
                            style={styles.textInput}
                            value={youtube}
                        />
                        <Text style={styles.inputHeaderName}>EVENT ORGANIZER NAME </Text>
                        <TextInput 
                            onChangeText = {(value)=>setOrganiser(value)}
                            placeholder={'Organizer Name'}
                            style={styles.textInput}
                            value={organiser}
                        />

                        <Text style={styles.inputHeaderName}>WEB URL </Text>
                        <TextInput 
                            onChangeText = {(value)=>setWebUrl(value)}
                            placeholder={'Event web url'}
                            style={styles.textInput}
                            value={webUrl}
                        />

                        <Text style={styles.inputHeaderName}>BOOKING URL</Text>
                        <TextInput 
                            onChangeText = {(value)=>setBookingUrl(value)}
                            placeholder={'Event Booking url'}
                            style={styles.textInput}
                            value={bookingUrl}
                        />

                        <Text style={styles.inputHeaderName}>ADDRESS </Text>
                        <TextInput 
                            multiline={true}
                            onChangeText = {(value)=>setAddress(value)}
                            placeholder={'Complete Address for event'}
                            style={{...styles.textInput,height:moderateScale(100)}}
                            value={address}
                        />
                       

                        <Text style={styles.inputHeaderName}>EVENT DATE
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
                            style={{width: 300}}
                        />
                        
                        <Text style={styles.inputHeaderName}>EVENT START TIME 
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
                            date={startTime}
                            format="HH:mm"
                            is24Hour={true}
                            mode="time"
                            onDateChange={(time) => setStartTime(time)}
                            placeholder="start time"
                            style={{width: 300}}
                        />
                        <Text style={styles.inputHeaderName}>EVENT END TIME 
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
                            date={endTime}
                            format="HH:mm"
                            is24Hour={true}
                            mode="time"
                            onDateChange={(time) => setEndTime(time)}
                            placeholder="end time"
                            style={{width: 300}}
                        />
                        <Text style={styles.inputHeaderName}>EVENT BANNER IMAGE</Text>
                        {renderSelectedFile()}
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


AddEvent.propTypes = {
    cardItem:PropTypes.object,
    refreshData:PropTypes.func.isRequired,
    showEdit:PropTypes.bool,
};

export default AddEvent;

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
