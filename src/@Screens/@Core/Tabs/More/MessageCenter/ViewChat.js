/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect, useState} from 'react';
import {View,TextInput,TouchableOpacity,ActivityIndicator, ScrollView,Text,Platform} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../../@GlobalComponents/ModalHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import {addMessageToSupportConversation, getMessageDetails} from '../../../../../@Endpoints/Core/Tabs/More';
import Commenters from '../../../../../@GlobalComponents/Commenters/Commenters';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { pickImage } from '../../../../../@Utils/helperFiles/ImagePicker';

const ViewChat = ({converstationId, notificationConversationId ,children,handleRead}) =>{

    const [isActive, setIsActive] = useState(false);
    const [commentLoader, setCommentLoader] = useState(false);
    const [liveComment, setLiveComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [conversationList, setConversationList] = useState([]);
    const [selectedFile, setSelectedFile] = useState(undefined);

    useEffect(()=>{
        if(isActive)
            callApi();
    },[isActive]);

    const checkIfTheConversationIsFromNotification = () =>{
        if(notificationConversationId === converstationId) setIsActive(true);
    };

    useEffect(()=>{
        checkIfTheConversationIsFromNotification();
    },[]);

    const callApi = () =>{
        getMessageDetails(converstationId)
            .then(res=>{
                const {data:{messageData=[]}} = res;
                if(messageData.length);
                const dataSet = messageData.map((each)=>{
                    let obj = {};
                    obj.images = each.image_path;
                    obj.attachment_path = each.attachment_path;
                    obj.name = each.from_id_name;
                    obj.created_date = each.message_dateTime;
                    obj.gallery_comment = each.message_body;
                    return obj;
                });
                setConversationList(dataSet);
                setLoading(false);
            })
            .catch(()=>{
                setLoading(false);
            });
    };

    const renderData = () =>{
        if(loading)
            return <ScreenLoader text={'Loading previous messages..'} />;
        return(
            <ScrollView 
                contentContainerStyle={{paddingBottom:moderateScale(50)}} 
                showsVerticalScrollIndicator={false}
            >
                {
                    conversationList.map((item,index)=>(
                        <Commenters comments={item} key={index} showDirectDate={true} />
                    ))
                }
            </ScrollView>
        );
    };

    const addConversation = () =>{
        if(liveComment!=='')
        {
            setCommentLoader(true);
            const data = new FormData();
            data.append('conversation_id',converstationId);
            data.append('message_file', selectedFile ?  'data:image/jpeg;base64,' + selectedFile.base64 : undefined);
            data.append('message_body',liveComment);
            data.append('application',true);
            addMessageToSupportConversation(data)
                .then(res=>{
                    const {data:{messageData=[]}} = res;
                    const dataSet = messageData.map((each)=>{
                        let obj = {};
                        obj.images = each.image_path;
                        obj.attachment_path = each.attachment_path;
                        obj.name = each.from_id_name;
                        obj.created_date = each.message_dateTime;
                        obj.gallery_comment = each.message_body;
    
                        return obj;
                    });
                    setConversationList(dataSet);
                    setLiveComment('');
                    setCommentLoader(false);
                    if(selectedFile) setSelectedFile(undefined);
                    Toast.show('Message sent successfully',Toast.LONG);
                })
                .catch(()=>{
                    setCommentLoader(false);
                    Toast.show('Sending message failed!',Toast.LONG);
                });
        }
        else Toast.show('Enter a message',Toast.LONG);
    };

    const chooseFile = () => {
        pickImage((res)=>{
            let response = res;
            if(Platform.OS === 'android'){
                if(res?.assets) response = res.assets[0];
            }
            if(response.didCancel)
            {
                Toast.show('Image Selection Cancelled',Toast.LONG);
                return;
            }
            setSelectedFile(response);
        });
    };

    const renderFileAttached = () =>{
        if(selectedFile)
            return(
                <View style={styles.fileAttachedBox}>
                    <Text>1 file attached</Text>
                    <TouchableOpacity onPress={()=>setSelectedFile(undefined)} style={styles.fileCross}>
                        <Icon color={'#fff'} name={'times'} size={15} />
                    </TouchableOpacity>
                </View>
            );
    };


    const renderChatBox = () =>{
        return(
            <View style={styles.modalContainer}>
                <ModalHeader headerText={'Conversations'} onPress={()=>setIsActive(false)} />
                {renderData()}
                {renderFileAttached()}
                <View style={styles.commentBox}>
                    <TextInput
                        onChangeText={(str)=>setLiveComment(str)}
                        onSubmitEditing={()=>addConversation()}
                        placeholder={'Write a message'}
                        returnKeyLabel={'done'}
                        style={styles.inputBox}
                        value={liveComment}
                    />
                    <TouchableOpacity onPress={()=>chooseFile()} style={styles.attachment}>
                        <Icon color={'#fff'} name={'paperclip'} size={moderateScale(20)} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>addConversation()}  style={styles.sendButton}>
                        {commentLoader && <ActivityIndicator color={'#fff'} size={'small'} />}
                        {!commentLoader &&  <Icon color={'#fff'} name={'arrow-right'} size={moderateScale(20)} />}
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const checkAction = () =>{
        handleRead ? handleRead(1) : null;
        setIsActive(true);
    };

    return(
        <View>
            <TouchableOpacity onPress={()=>checkAction()}>
                {children ? children : null}
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
                {renderChatBox()}
            </Modal>
        </View>
    );
};

ViewChat.propTypes = {
    children:PropTypes.node.isRequired,
    converstationId:PropTypes.string.isRequired,
    handleRead:PropTypes.func.isRequired,
    notificationConversationId: PropTypes.any
};

export default ViewChat;