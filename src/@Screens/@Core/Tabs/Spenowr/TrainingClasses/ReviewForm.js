/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text,StyleSheet,ScrollView,TextInput, TouchableOpacity} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import DefaultButton from '../../../../../@GlobalComponents/DefaultButton';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../../@GlobalComponents/ModalHeader';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import { AirbnbRating } from 'react-native-ratings';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { addCourseReview,addInstituteReview } from '../../../../../@Endpoints/Core/Dialog/FindArtiest';
import Config from '@Config/default';

const {COLOR:{APP_PINK_COLOR,WHITE}} = Config;

const ReviewForm = ({type,id,showinHeader,refreshData}) =>{

    const [isActive, setIsActive] = useState(false);
    const [isRecommended , setIsRecommended] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(4);
    const [ comment, setComment] = useState('');

    const [loader, setLoader] = useState(false);

    const validate = () =>{
        if(name === '' || email === '' || comment === '' )
            Toast.show('Please fill all fields', Toast.LONG);
        else
        {
            const body = new FormData();
            body.append('author',name);
            body.append('email',email);
            body.append('comment',comment);
            body.append('rating',rating);
            body.append('recommended',isRecommended ? 1 : 0);
            body.append('g_recaptcha_response',1);
            type === 'course' ? courseReview(body) : artistReview(body);
        }
    };
    
    const courseReview = (body) =>{
        setLoader(true);
        body.append('course_id',id);
        addCourseReview(body)
            .then(()=>{
                setIsActive(false);
                setTimeout(()=>{Toast.show('Review Submitted Successfully',Toast.LONG);},500);
            })
            .catch(()=>{
                Toast.show('Review Submit Failed',Toast.LONG);
            })
            .finally(()=>{
                setLoader(false);
                resetData();
            });
    };

    const artistReview = (body) =>{
        setLoader(true);
        body.append('entity_id',id);
        body.append('entity_name','Institute');
        addInstituteReview(body)
            .then(()=>{
                setIsActive(false);
                refreshData ? refreshData() : null;
                setTimeout(()=>{Toast.show('Review Submitted Successfully',Toast.LONG);},500);
            })
            .catch(()=>{
                Toast.show('Review Submit Failed',Toast.LONG);
            })
            .finally(()=>{
                setLoader(false);
                resetData();
            });
    };

    const resetData = () =>{
        setComment('');
        setEmail('');
        setName('');
    };

    const renderReviewForm = () =>{
        return(
            <View style={styles.reviewModal}>
                <ModalHeader headerText={'Add a review'} onPress={()=>setIsActive(false)} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TextInput 
                        onChangeText = {(value)=>setName(value)}
                        placeholder={'Name'}
                        style={GlobalStyles.textInput}
                        value={name}
                    />
                    <TextInput 
                        onChangeText = {(value)=>setEmail(value)}
                        placeholder={'Email Id'}
                        style={GlobalStyles.textInput}
                        value={email}
                    />
                    <Text style={GlobalStyles.inputHeaderName}> Mark A Rating </Text>
                    <AirbnbRating 
                        defaultRating={4}
                        minValue={1}
                        onFinishRating={(value)=>setRating(value)}
                        ratingColor={APP_PINK_COLOR}
                        ratingCount={5}
                        style={{width:moderateScale(250),marginTop:5,alignSelf:'center'}}
                        type='custom'
                    />
                    <TextInput 
                        multiline={true}
                        onChangeText = {(value)=>setComment(value)}
                        placeholder={'Comments'}
                        style={{...GlobalStyles.textInput,height:moderateScale(100)}}
                        value={comment}
                    />
                    <View style={{flexDirection:'row',alignItems:'center',marginVertical:moderateScale(10)}}>
                        <Text style={GlobalStyles.inputHeaderName}> Recommended ? </Text>
                        <CheckBox
                            disabled={false}
                            onValueChange={(newValue) => {
                                setIsRecommended(newValue);
                            }}
                            style={{marginLeft:moderateScale(10),width:25,height:25,marginTop:moderateScale(5)}}
                            value={isRecommended}
                        />
                    </View>
                </ScrollView>
                <DefaultButton buttonText={'Save'} onPress={()=>validate()} showLoader={loader} />
            </View>
        );
    };

    return(
        <>
        
            <TouchableOpacity onPress={()=>setIsActive(true)} style={showinHeader?styles.adminBox:{}} >
                {
                    showinHeader ? <Text style={styles.editButton}>Review</Text>
                        :
                        <View style={styles.blurView}>
                            <Text style={styles.reviewText}>Review</Text>
                        </View>
                }
            </TouchableOpacity>
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
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderReviewForm()}
            </Modal>
        </>
    );
};

ReviewForm.propTypes = {
    color:PropTypes.string,
    id:PropTypes.string.isRequired,
    showinHeader:PropTypes.any,
    type:PropTypes.string.isRequired,
    width:PropTypes.any,
};

const styles = StyleSheet.create({
    bottomButtons:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
    },
    buttons:{
        width:'30%',
        paddingHorizontal:0,
        height:moderateScale(30),
        backgroundColor:'#0000008B'
    },
    buttonText:{
        fontSize:moderateScale(9),
    },
    reviewModal:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:'#fff',
        padding:moderateScale(15),
    },
    blurView:{
        width:moderateScale(80),
        justifyContent:'center',
        alignItems:'center',
        padding:moderateScale(8),
        borderRadius:moderateScale(3),
        backgroundColor:'#292828'
    },
    reviewText:{
        fontSize:moderateScale(10),
        color:WHITE,
        fontWeight:'bold'
    },
    adminBox:{
        marginRight:moderateScale(10)
    },
    editButton:{
        color:APP_PINK_COLOR,
        fontSize:moderateScale(14)
    },
});


export default ReviewForm;