/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState } from 'react';
import {View,Text} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import { useStore } from 'react-redux';
import FormHeader from '../../../@GlobalComponents/FormHeader';
import styles from './styles';
import Modal from 'react-native-modal';
import ModalHeader from '../../../@GlobalComponents/ModalHeader';
import CheckBox from '@react-native-community/checkbox';
import { AirbnbRating } from 'react-native-ratings';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import PropTypes from 'prop-types';
import { addArticleReview, addProductReview } from '../../../@Endpoints/Core/Tabs/Common';
import Toast from 'react-native-simple-toast';
import StarRating from '../../../@GlobalComponents/StarRating';
import Capitalize from '../../../@Utils/helperFiles/Capitalize';

const AddReview = ({type,id}) =>{

    const [isActive, setIsActive] = useState(false);
    const [review, setReview] = useState('');
    const [title, setTitle] = useState('');
    const [yes, setYes] = useState(true);
    const [no, setNo] = useState(false);
    const [rating, setRating] = useState(4);
    const [loader, setLoader] = useState(false);
    const [name, setName] = useState('');

    const store = useStore();
    const {productDetails:{
        productDetailsData:{productReviews},
        articleDetailsData:{article_review}
    }} = store.getState();

    const [articleReviews, setArticleReviews] = useState(article_review);
    const [productReviewsArr, setProductReviews] = useState(productReviews);

    const resetReview = () =>{
        setReview('');
        setTitle('');
        setRating(4);
        setName('');
        setYes(true);
        setNo(false);
    };

    const submitReview = () =>{
        setIsActive(true);
        setLoader(true);
        const formBody = new FormData();
        formBody.append('article_id',id);
        formBody.append('product_id',id);
        formBody.append('name',name);
        formBody.append('title',title);
        formBody.append('comment',review);
        formBody.append('rating',rating);
        formBody.append('recommended',yes ? 1 : 0);

        if(type === 'article')
        {
            addArticleReview(formBody)
                .then(()=>{
                    Toast.show('Review Submitted successfully',Toast.LONG);
                    setTimeout(()=>{
                        setIsActive(false);
                        resetReview();
                    },400);
                    const eachReview={comment : review,rating:rating,name:name};
                    setArticleReviews([eachReview,...articleReviews]);
                })
                .catch(()=>{
                    Toast.show('Review submission Failed',Toast.LONG);
                })
                .finally(()=>{
                    setLoader(false);
                });
        }
        else
        {
            addProductReview(formBody)
                .then(()=>{
                    Toast.show('Review Submitted successfully',Toast.LONG);
                    setTimeout(()=>{
                        setIsActive(false);
                        resetReview();
                    },400);
                    const eachReview={comment : review,rating:rating,name:name};
                    setProductReviews([eachReview,...productReviewsArr]);
                })
                .catch(()=>{
                    Toast.show('Review submission Failed',Toast.LONG);
                })
                .finally(()=>{
                    setLoader(false);
                });
        }

       
    };


    const reviewsList = type === 'article' ? articleReviews : productReviewsArr;

    const renderReviewBox = ()=>{
        return(
            <View style={styles.reviewModal}>
                <ModalHeader headerText={'Write a review'} onPress={()=>setIsActive(false)} />

                <TextInput
                    onChangeText={(value)=>setName(value)}
                    placeholder={'Name.'}
                    style={styles.textInputSmall}
                    value={name}
                />
                
                <TextInput
                    onChangeText={(value)=>setTitle(value)}
                    placeholder={'Title.'}
                    style={styles.textInputSmall}
                    value={title}
                />

                <TextInput
                    multiline={true}
                    onChangeText={(value)=>setReview(value)}
                    placeholder={'Add your review.'}
                    style={styles.textInput}
                    value={review}
                />

                <Text style={styles.names}>Rate Us!</Text>
                <AirbnbRating 
                    defaultRating={4}
                    minValue={1}
                    onFinishRating={(value)=>setRating(value)}
                    ratingCount={5}
                    startingValue={4}
                    type='custom'
                />

                <Text style={styles.names}>Recommended</Text>
                <View style={styles.dataBox}>
                    <CheckBox
                        disabled={false}
                        onValueChange={(newValue) => {
                            if(newValue)setNo(false);
                            setYes(newValue);
                        }}
                        style={{marginRight:moderateScale(10)}}
                        value={yes}
                    />
                    <Text style={styles.subText}>Yes</Text>
                    <CheckBox
                        disabled={false}
                        onValueChange={(newValue) => {
                            if(newValue) setYes(false);
                            setNo(newValue);
                        }}
                        style={{marginRight:moderateScale(10),marginLeft:moderateScale(10)}}
                        value={no}
                    />
                    <Text style={styles.subText}>No</Text>
                </View>
                <DefaultButton buttonText={'SUBMIT'} onPress={()=>{submitReview();}} showLoader={loader} />
            </View>
        );
    };

    const renderReviews = ()=>{
        return(
            <>
                {
                    reviewsList.map((review,i)=>{
                        const {
                            comment,name,rating
                        } = review;
                        return(
                            <View key={i} style={styles.reviewContainer}>
                                <View style={{flexDirection:'row',alignItems:'center',marginBottom:4}}>
                                    <View style={styles.circle}></View>
                                    <Text style={styles.name}>{Capitalize(name)}</Text>
                                </View>
                                <StarRating size={8} starSelected={rating} />
                                <Text style={styles.comment}>{comment}</Text>
                            </View>
                        );
                    })
                }
            </>
        );
    };
    
    return(
        <View>
            <FormHeader headerText={'Reviews'} />
            <View style={{padding:moderateScale(15)}}>
                <TouchableOpacity onPress={()=>setIsActive(true)} style={{alignSelf:'flex-end'}}>
                    <Text>{`Write a review ? `}</Text>
                </TouchableOpacity>
                {!reviewsList.length ? <Text style={styles.subText}>No reviews yet !</Text> : renderReviews()}
                
            </View>
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
                {renderReviewBox()}
            </Modal>
        </View>
    );
};

AddReview.propTypes = {
    id:PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};


export default AddReview;