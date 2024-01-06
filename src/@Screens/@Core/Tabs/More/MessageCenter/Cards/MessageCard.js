/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect, useState} from 'react';
import {View,Text} from 'react-native';
import styles from '../styles';
import ViewChat from '../ViewChat';
import PropTypes from 'prop-types';
import Capitalize from '../../../../../../@Utils/helperFiles/Capitalize';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import Image from 'react-native-image-progress';
import { connect } from 'react-redux';
import * as moreActions from '../../../../../../@Redux/actions/moreActions';
import HTML from 'react-native-render-html';

const Querries = [
    {name : 'report_issue',value : 'Report An Issue'},
    {name : 'request_feature',value : 'Request A Feature'},
    {name : 'other_query',value : 'Other Querry'}
];

const {NEW_IMG_BASE,DEFAULT_PROFILE} = Config;

const Card = ({eachUserMsg,notificationConversationId,loggedInUserId,...props}) =>{
    const {
        updateTotalUnreadMessageCenterMessages
    } = props;

    const {
        from_id_name,conversation_id,from_id='',
        subject='',message='',message_count,
        read_status,eachUnreadMessage,
        image_path = ''
    } = eachUserMsg;

    const [localUndead, setLocalUndread] = useState(eachUnreadMessage);
    const [isRead, setIsRead] = useState(parseInt(read_status));
    const preSub = Querries.find(x=>x.name === subject);

    useEffect(()=>{
        if(from_id === loggedInUserId){ 
            setIsRead(1);
            if(read_status === '0') {
                setLocalUndread(0);
                updateTotalUnreadMessageCenterMessages(-1);
            }
        }
    },[]);
    
    const handleReadBox = (val) =>{
        setIsRead(val);
        setLocalUndread(0);
    };

    return(
        <ViewChat converstationId={conversation_id} handleRead={handleReadBox} notificationConversationId={notificationConversationId} >
            <View style={ isRead !== 1   ? styles.messageBoxUnread : styles.messageBoxRead }>
                <View style={styles.contentBox}>
                    <View style={styles.userImg}>
                        <Image 
                            source={{ uri: image_path ? NEW_IMG_BASE+ image_path :  NEW_IMG_BASE + DEFAULT_PROFILE }} 
                            style={{width:null,height:null,flex:1}} 
                        />
                    </View>
                    <View style={{marginLeft:moderateScale(10),maxWidth:moderateScale(270)}}>
                        <Text numberOfLines={1}  style={styles.fromText}>{Capitalize(from_id_name)} {message_count ? '('+message_count+')' : ''}</Text>
                        <Text  style={{...styles.subject}}>{preSub ? preSub.value : Capitalize(subject)}</Text>
                        <HTML 
                            source={{html : message}}
                        />
                    </View>
                </View>
                {
                    (localUndead !== 0) &&
                    <View style={styles.countView}>
                        <Text style={styles.count}>{localUndead}</Text>
                    </View>
                }
            </View>
        </ViewChat>
    );
};


Card.propTypes = {
    eachUserMsg:PropTypes.object.isRequired,
    loggedInUserId:PropTypes.string.isRequired,
    notificationConversationId: PropTypes.any,
    updateTotalUnreadMessageCenterMessages:PropTypes.func.isRequired,
};

function mapStateToProps(){
    return{};
}

function mapDispatchToProps(dispatch){
    return{
        updateTotalUnreadMessageCenterMessages:change =>
            dispatch(moreActions.updateTotalUnreadMessageCenterMessages(change)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Card);