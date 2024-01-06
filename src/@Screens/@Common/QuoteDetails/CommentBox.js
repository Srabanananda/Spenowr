/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect, useState} from 'react';
import {View,Text,TextInput,ActivityIndicator} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import styles from './styles';
import { GlobalStyles } from '../../../@GlobalStyles';
import Toast from 'react-native-simple-toast';
import { addQuoteComments, getQuoteComments } from '../../../@Endpoints/Core/Tabs/Home';
import { useStore } from 'react-redux';
import Commenters from '../../../@GlobalComponents/Commenters/Commenters';
import DefaultButton from '@GlobalComponents/DefaultButton';

const CommentBox = ({moduleId=''}) =>{

    const store = useStore();
    const {
        userObj:{userProfile:{user_id}}
    } = store.getState();

    const [comment, setComment] = useState('');
    const [loader,setLoader] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [internalLoader, setInternalLoader] = useState(false);
    const [totalComments, setTotalComments] = useState(0);

    useEffect(()=>{
        loadComments(0);
    },[]);

    const loadComments = (skip=0) =>{
        setInternalLoader(true);
        getQuoteComments(moduleId,skip,5)
            .then(res=>{
                const {data:{quoteComment=[],totalComment=0}} = res;
                setReviews(skip ? [...reviews,...quoteComment] : quoteComment);
                setTotalComments(totalComment);
            })
            .catch()
            .finally(()=>{
                setInternalLoader(false);
                setLoader(false);
            });
    };


    const checkComment = () =>{
        if(comment.length)
        {
            setLoader(true);
            addQuoteComments(moduleId,user_id,comment)
                .then(()=>{
                    setComment('');
                    loadComments();
                    Toast.show('Your Comment is received!',Toast.SHOW);
                })
                .catch(()=>{
                    Toast.show('Oops, Comment Upload Failed',Toast.SHOW);
                })
                .finally(()=>{
                    setLoader(false);
                });
        }
        else Toast.show('Please write a comment to save',Toast.LONG);
    };

    return(
        <View style={{marginTop:moderateScale(10)}}>
            {
                reviews.map((item,index)=>(
                    <Commenters comments={item} key={index} />
                ))
            }
            {
                totalComments-reviews.length >0 ? 
                    <DefaultButton 
                        buttonStyle={{alignSelf:'center'}} 
                        buttonText={'Load More'} 
                        onPress={()=>loadComments(reviews.length)} 
                        showLoader={internalLoader}
                        type={'outline'} 
                    /> 
                    : null
            }
            <TextInput 
                onChangeText = {(value)=>setComment(value)}
                placeholder={'Drop a comment'}
                style={GlobalStyles.textInput}
                value={comment}
            />
            {loader ? <ActivityIndicator color={'#cd2121'} size={'small'} /> : <Text onPress={()=>checkComment()} style={styles.saveComment}>Save Comment</Text>}
        </View>
    );
};

export default  CommentBox;