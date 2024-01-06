/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../../../../@GlobalComponents/ModalHeader/index';
import DefaultButton from '../../../../../../../@GlobalComponents/DefaultButton';
import { Dropdown } from 'react-native-material-dropdown';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import Toast from 'react-native-simple-toast';
import { reportPost } from '../../../../../../../@Endpoints/Core/Tabs/Home';
import { connect } from 'react-redux';

type ReportPostProps = {
    show : Boolean,
    setShow : Function,
    reportParams: Object,
    userId: String
}

const ReportPost = ({...props} : ReportPostProps) =>{

    const reasons = [{name:'Not creative', value: 'Not creative'},{name:'Inappropriate', value: 'Inappropriate'},{name:'Objectionable', value: 'Objectionable'},{name:'Other', value: 'Other'}];

    const {show, setShow,reportParams, userId} = props;
    const [selectedReason, setSelectedReason] = useState('Select a Reason');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const checkReport = () =>{
        setLoading(true);
        const {activity_institute_id,module_id,type} = reportParams;
        const data = new FormData();
        data.append('user_id',userId);
        data.append('artist_id',activity_institute_id);
        data.append('post_id',module_id);
        data.append('type',type);
        data.append('reason',selectedReason);
        data.append('message',msg);
        reportPost(data)
            .then(()=>{
                setTimeout(()=>{Toast.show('Report has been received');},400);
            })
            .catch(()=>{
                Toast.show('Oops something went wrong');
            })
            .finally(()=>{
                setShow(false);
                setLoading(false);
            });
    };

    const renderReportUI = () => {
        return(
            <View style={styles.filterContainer}>
                <ModalHeader headerText={'Report this post'} onPress={()=>setShow(false)} />
                <Dropdown
                    data={reasons}
                    fontSize={12}
                    onChangeText={(value)=>setSelectedReason(value)}
                    value={selectedReason}
                />
                <Text style={GlobalStyles.inputHeaderName}>Message</Text>
                <TextInput 
                    multiline 
                    onChangeText={(res) => setMsg(res)} 
                    returnKeyType="next"
                    style={[GlobalStyles.textInput,{height:150,paddingLeft:6}]} 
                    value={msg} />
                <DefaultButton buttonText={'Report Now'} isDeactivated={selectedReason === 'Select a Reason'} onPress={checkReport} showLoader={loading} />
            </View>
        );
    };

    return(
        <View>
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={show}
                onBackButtonPress= {()=>{
                    setShow(false); 
                }}
                onBackdropPress = {()=>{
                    setShow(false); 
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderReportUI()}
            </Modal>
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        userId: state.userObj.user.institute_id,
    };
};

export default connect(mapStateToProps)(ReportPost);
const styles = StyleSheet.create({
    filterContainer:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:'#fff',
        padding:moderateScale(10),
    },
});