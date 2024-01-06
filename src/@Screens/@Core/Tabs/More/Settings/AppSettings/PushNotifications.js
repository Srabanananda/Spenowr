/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text,Switch,TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import { moderateScale } from 'react-native-size-matters';
import { updateNotificationSubscription } from '../../../../../../@Endpoints/Core/Tabs/More';
import DefaultButton from '../../../../../../@GlobalComponents/DefaultButton';
import ModalHeader from '../../../../../../@GlobalComponents/ModalHeader';
import Config from '@Config/default';
import { connect } from 'react-redux';
import * as userActions from '@Redux/actions/userActions';
import PropTypes from 'prop-types';

const {COLOR:{WHITE,DARK_BLACK,LIGHTGREY,APP_PINK_COLOR}} = Config;

const PushNotifications = ({...props}) =>{

    const {userObj:{user,userProfile},updateUserDetails} = props;
    const {mobile_app_notification='1'} = user;

    const [notificationModal, setNotificationModal] = useState(false);
    const [loader , setLoader] = useState(false);
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(mobile_app_notification === '1' ? true : false);
    
    
    const unsubscribeNotifications = (value=false) =>{
        setLoader(true);
        const data = new FormData();
        data.append('mobile_app_notification',value);
        updateNotificationSubscription(data)
            .then(()=>{
                user.mobile_app_notification = value ? '1' : '0';
                updateUserDetails(user,userProfile);
                setNotificationModal(false);
                setLoader(false);
            })
            .catch(()=>{
                setLoader(false);
                setIsNotificationEnabled(value);
            });
    };

    const toggleSwitch = value => {
        setIsNotificationEnabled(value);
        if(!value) setNotificationModal(true);
        else unsubscribeNotifications(true);
    };

    const renderNotificationUnsubscribe = () =>{
        return(
            <View style={{backgroundColor:WHITE,width:'100%',height:moderateScale(180),padding:moderateScale(15)}}>
                <ModalHeader headerText={'UNSUBSCRIBE ?'} onPress = {()=>{setNotificationModal(false), setIsNotificationEnabled(true);}} />
                <Text style={{alignSelf:'center',paddingTop:moderateScale(8),color:DARK_BLACK}}>Do you want to Unsubscribe </Text>
                <Text style={{alignSelf:'center',paddingTop:moderateScale(4),color:DARK_BLACK}}>all notifications ?</Text>
                <DefaultButton buttonText={'Yes'} onPress={()=>{unsubscribeNotifications(false);}}  showLoader={loader} />
            </View>
        );
    };

    return(
        <View>
            <TouchableOpacity onPress={()=>{setNotificationModal(true);}} style={{paddingVertical:moderateScale(20),flexDirection:'row',justifyContent:'space-between'}}>
                <Text>Push Notifications</Text>
                <Switch
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    thumbColor={isNotificationEnabled ? APP_PINK_COLOR : LIGHTGREY}
                    trackColor={{ false: '#767577', true: DARK_BLACK }}
                    value={isNotificationEnabled}
                />
            </TouchableOpacity>
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={notificationModal}
                onBackButtonPress= {()=>{
                    setNotificationModal(false); 
                    setIsNotificationEnabled(true);
                }}
                onBackdropPress = {()=>{
                    setNotificationModal(false); 
                    setIsNotificationEnabled(true);
                }}
                style={{margin:0,padding:0,justifyContent:'center',alignItems:'center'}}
                useNativeDriver={true}
            >
                {renderNotificationUnsubscribe()}
            </Modal>
        </View>
    );
};


const mapStateToProps = (state) => {
    return {
        userObj: state.userObj,
    };
};
const mapDispatchToProp = (dispatch) => ({
    updateUserDetails:(instituteObj,profileObj) =>
        dispatch(userActions.updateUserDetails(instituteObj,profileObj))
});


PushNotifications.propTypes = {
    updateUserDetails:PropTypes.func.isRequired,
    userObj:PropTypes.object.isRequired,
};

export default connect(mapStateToProps,mapDispatchToProp)(PushNotifications);