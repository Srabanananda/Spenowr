/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,StyleSheet,TextInput,Text} from 'react-native';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import ModalHeader from '@GlobalComponents/ModalHeader/index';
import { GlobalStyles } from '@GlobalStyles';
import { submitBids } from '../../../@Endpoints/Core/Tabs/More';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { withNavigation } from '@react-navigation/compat';
import { useStore } from 'react-redux';

type Props = {
    userId : string,
    suscriptionStatus : string,
    assignmentId : string,
    title : string,
    refresh? : ()=>void,
    userObj : {
        userProfile : {
            subscription_plan : string,
            user_id: string,
        }
    },
    navigation:{
        navigate : ()=>void
    },
    creditData:{
        availCredits : number,
        minCreditsToApply : number
    }
}

const SubmitToJob = ({...props}:  Props) =>{

    const {
        suscriptionStatus,assignmentId,title,
        refresh,navigation,userObj,
        creditData
    } = props;
    const {
        userProfile:{
            subscription_plan,
            user_id : userId
        }
    } = userObj;

    const {more:{subscriptions: STORE_SUBSCRIPTIONS}} = useStore()?.getState();
    const currentPlanIndex = Object.keys(STORE_SUBSCRIPTIONS).indexOf(subscription_plan);
    const currentPlan = currentPlanIndex === 2 ? subscription_plan : Object.keys(STORE_SUBSCRIPTIONS)[currentPlanIndex+1];

    const [loading, setLoading] = useState(false);
    const [modal,setModal] = useState(false);
    const [bidPrice, setBidPrice] = useState(null);
    const [comment, setComment] = useState(null);

    const checkSubmit = () => {
        setLoading(true);
        submitBids(userId,assignmentId,bidPrice,comment,title)
            .then(()=>{
                Toast.show('Your Response is submitted');
                refresh?.();
            })
            .catch(()=>Toast.show('Oops Something went wrong'))
            .finally(()=>{
                setLoading(false);
                setModal(false);
            });

    };

    const checkSubscription = () => {
        if(creditData.availCredits >= creditData.minCreditsToApply &&  suscriptionStatus === '2')
            setModal(true);
        else
        {
            Toast.show('Please upgrade your subscription to apply for this job');
            navigation.navigate('Subscription',{current:subscription_plan,selected:currentPlan});
        }
    };

    const renderSubmitForm= () => {
        return(
            <View style={styles.filterContainer}>
                <ModalHeader headerText={'Submit Form'} onPress={()=>setModal(false)} />
                <Text style={GlobalStyles.inputHeaderName}>Bid Price</Text>
                <TextInput 
                    keyboardType={'decimal-pad'} 
                    onChangeText={(res) => setBidPrice(res)}
                    returnKeyType="next" 
                    style={[GlobalStyles.textInput]}
                    value={bidPrice} />
                <Text style={GlobalStyles.inputHeaderName}>Comment</Text>
                <TextInput 
                    multiline 
                    onChangeText={(res) => setComment(res)} 
                    returnKeyType="next"
                    style={[GlobalStyles.textInput,{height:150,paddingLeft:10}]} 
                    value={comment} />
                <DefaultButton buttonText={'Submit'} isDeactivated={!(bidPrice && comment)} onPress={checkSubmit} showLoader={loading} />
            </View>
        );
    };
    return(
        <View>
            <DefaultButton buttonStyle={styles.buttonStyles} buttonText={'Apply for job'} onPress={checkSubscription} showLoader={false} />
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={modal}
                onBackButtonPress= {()=>{
                    setModal(false); 
                }}
                onBackdropPress = {()=>{
                    setModal(false); 
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderSubmitForm()}
            </Modal>
        </View>
    );
};

function mapStateToProps(state){
    return{
        userObj : state.userObj,
        suscriptionStatus : state.userObj.userProfile.subscription_status
    };
}

export default (connect)(mapStateToProps)(withNavigation(SubmitToJob));
const styles = StyleSheet.create({
    buttonStyles:{
        marginTop:moderateScale(5),
    },
    filterContainer:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:'#fff',
        padding:moderateScale(10),
    },
});