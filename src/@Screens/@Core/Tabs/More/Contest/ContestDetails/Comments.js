/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text,TouchableOpacity,TextInput,ActivityIndicator} from 'react-native';
import { getContestComments } from '../../../../../../@Endpoints/Core/Tabs/Home';
import { addContestComments } from '../../../../../../@Endpoints/Core/Tabs/Home/index';
import Commenters from '../../../../../../@GlobalComponents/Commenters/Commenters';
import { GlobalStyles } from '../../../../../../@GlobalStyles/index';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Config from '@Config/default';
import Toast from 'react-native-simple-toast';
import { moderateScale } from 'react-native-size-matters';
import FormHeader from '../../../../../../@GlobalComponents/FormHeader/index';
import styles from './Tabs/styles';

const { COLOR:{APP_PINK_COLOR,SUBNAME}} = Config;

interface CommentProps {
    ContestComments : Array,
    LoggedinUserId : String,
    contest_id : String,
}

const Comments = ({contestDetails} : CommentProps) =>{

    const {
        ContestComments = [],
        LoggedinUserId = '',
        contest_id='',
    } = contestDetails;

    const [showComments,setShowComments] = useState(false);
    const [liveComment, setLiveComment] = useState('');
    const [commentLoader, setCommentLoader] = useState(false);
    const [comments, setComments] = useState(ContestComments);

    const onCommentPress = () => setShowComments(!showComments);

    const refreshComments = (skip=0) =>{
        getContestComments(contest_id,LoggedinUserId,skip)
            .then(res=>{
                const {data:{contestComment=[]}} = res;
                setComments(contestComment);
            })
            .catch();
    };

    const addComment =() => {
        if(liveComment === '') {
            Toast.show('comment cannot be empty'); 
            return ;
        }
        setCommentLoader(true);
        addContestComments(contest_id,LoggedinUserId,liveComment)
            .then(()=>{
                setLiveComment('');
                refreshComments();
                Toast.show('Comment Added');
            })
            .catch(()=>{
                Toast.show('Oops,something went wrong');
            })
            .finally(()=>setCommentLoader(false));
    }; 

    const renderComments = () => {
        if(!showComments) return null;
        return(
            <>
                {
                    comments.map((item,index)=>{
                        item.type = 'contest';
                        return(
                            <Commenters
                                comments={item} 
                                customHtmlTextStyles={{maxWidth:moderateScale(260)}} 
                                deactivateModal={()=>null}  
                                key={`${item.id}_comment`} 
                                refresh={refreshComments}
                                type={'contest'}
                            />
                        );
                    })
                }
                {!comments.length ? <Text style={GlobalStyles.noDataFound}>No Comments Yet!</Text> : null}
                <View style={styles.commentBox}>
                    <TextInput
                        onChangeText={(str)=>setLiveComment(str)}
                        onSubmitEditing={()=>addComment()}
                        placeholder={'Write a comment'}
                        placeholderTextColor={SUBNAME}
                        returnKeyLabel={'done'}
                        style={styles.inputBox}
                        value={liveComment}
                    />
                    <TouchableOpacity onPress={()=>addComment()} style={styles.sendButton}>
                        {commentLoader && <ActivityIndicator color={'#fff'} size={'small'} />}
                        {!commentLoader &&  <Icon color={'#fff'} name={'arrow-right'} size={moderateScale(20)} />}
                    </TouchableOpacity>
                </View>
            </>
        );
    };

    return(
        <FormHeader accordianChild={renderComments} containerStyle={{marginTop:10}} headerText={'View Comments'} onPress={onCommentPress} outlined >
            <TouchableOpacity onPress={onCommentPress}>
                <Icon color={APP_PINK_COLOR} name={!showComments ? 'chevron-down' : 'chevron-up'} size={24} />
            </TouchableOpacity>
        </FormHeader>
    );
};

export default Comments;