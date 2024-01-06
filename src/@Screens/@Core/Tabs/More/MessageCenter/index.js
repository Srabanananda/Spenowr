/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect, useState} from 'react';
import {View,ScrollView, SafeAreaView,RefreshControl,Text} from 'react-native';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import Card from './Cards/MessageCard';
import styles from './styles';
import { moderateScale } from 'react-native-size-matters';
import { connect, useDispatch, } from 'react-redux';
import * as moreActions from '@Redux/actions/moreActions';
import PropTypes from 'prop-types';

const MessageCenterScreen = ({...props}) =>{
    const {
        messageList,
        apiCalled,
        userId,
        route
    } = props;

    const notificationConversationId = route.params ? route.params.cID :  null;

    const dispatch = useDispatch();
    
    const [refreshing,setRefreshing] = useState(false);

    useEffect(()=>{
        apiCall();
    },[]);

    const apiCall = () =>{
        dispatch(moreActions.fetchMessageCenterMessages());
    };

    const onRefresh = () =>{
        setRefreshing(true);
        apiCall();
        setTimeout(()=>{setRefreshing(false);},500);
    };

    const renderData = () =>{
        if(apiCalled)
            return <ScreenLoader text={'Fetching Messages...'}  />;
        else if(!apiCalled && !messageList.length)
            return <Text style={styles.noMessage}>No Messages Yet!</Text>;
        else
            return(
                <ScrollView 
                    refreshControl={
                        <RefreshControl
                            onRefresh={onRefresh} refreshing={refreshing}
                            title="Refreshing .."
                            titleColor={'#000'} />
                    } 
                    showsVerticalScrollIndicator={false}
                    style={{paddingHorizontal:moderateScale(5)}}
                >
                    <>
                        {
                            messageList.map((item,index)=>(
                                <Card eachUserMsg={item} key={index} loggedInUserId={userId} notificationConversationId={notificationConversationId} />
                            ))
                        }
                    </>
                </ScrollView>
            );
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Messages'}  />
            <View style={styles.container}>
                {renderData()}
            </View>
        </SafeAreaView>
    );
};

MessageCenterScreen.propTypes = {
    apiCalled:PropTypes.bool.isRequired,
    messageList:PropTypes.array.isRequired,
};

function mapStateToProps(State){
    return{
        messageList : State.more.messageList,
        apiCalled : State.more.apiCalled,
        userId : State.userObj.userProfile.user_id
    };
}

export default connect(mapStateToProps)(MessageCenterScreen);