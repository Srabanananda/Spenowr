/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, {useState,useEffect} from 'react';
import {View,Text} from 'react-native';
import ModalHeader from '../../../../../../@GlobalComponents/ModalHeader';
import Modal from 'react-native-modal';
import { List } from 'react-native-paper';
import {ProgressBar, Colors, TouchableRipple} from 'react-native-paper';
import PropTypes from 'prop-types';
import DefaultButton from '../../../../../../@GlobalComponents/DefaultButton';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import styles from './styles';

const ProfileCompletion = ({data,mode}) =>{

    const navigation = useNavigation();

    const [step1, setStep1] = useState(false);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);
    const [step4, setStep4] = useState(false);


    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [percentageActual, setPercentageActual] = useState(0);

    useEffect(()=>{
        if(data){
            setLoading(false);
            setPercentageActual(data.progress_bar ? data.progress_bar : 0);
            setPercentage(data.progress_bar ? (parseInt(data.progress_bar) / 100) : 0);
            setStep1((data.profileData && data.profileData.email_verify && data.profileData.email_verify === '1'));
            setStep3((data && data.profileCompletion && data.profileCompletion === 1));
            setStep2((data && data.userRecordCompletion && data.userRecordCompletion === 1));
            setStep4((data && data.artworkService && data.artworkService === 1));
        }
    },[data]);

    return(
        <>
            {
                !loading && mode === 'PRIVATE' &&
                 <TouchableRipple onPress={()=>setVisible(true)} style={{marginTop: 10, marginBottom: 5}}>
                     <View style={{paddingBottom: moderateScale(3)}}>
                         <Text style={{fontSize: 15, marginBottom: moderateScale(2),marginTop: moderateScale(5)}}>{`Profile Completion ( ${percentageActual} % )`}</Text>
                         <ProgressBar color={Colors.red500} progress={percentage} style={{marginTop: 5 ,height: moderateScale(8), borderRadius: moderateScale(4)}} />
                     </View>
                 </TouchableRipple>
            }
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={visible}
                onBackButtonPress= {()=>{
                    setVisible(false);
                }}
                onBackdropPress = {()=>{
                    setVisible(false);
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                <View style={styles.adminModal}>
                    <ModalHeader headerText={'Step by step guide for you'} onPress={()=>setVisible(false)} />
                    <List.Item
                        left={props => <List.Icon {...props} color={'green'} icon="checkbox-marked-circle" />}
                        title="REGISTER TO SPENOWR"
                        titleStyle={{
                            textDecorationLine: 'line-through',
                            textDecorationStyle: 'solid',
                        }}
                    />
                    <List.Item
                        left={props => <List.Icon {...props} color={step1 ? 'green' : 'grey'} icon={!step1 ? 'checkbox-blank-circle-outline' : 'checkbox-marked-circle'} />}
                        title="VERIFY YOUR EMAIL"
                        titleStyle={step1 ? {
                            textDecorationLine: 'line-through',
                            textDecorationStyle: 'solid',
                        } : {}}
                    />
                    <TouchableRipple onPress={() => {
                        if(!step2){
                            setVisible(false);
                            navigation.navigate('AccountInfo');
                        }
                    }}>
                        <List.Item
                            left={props => <List.Icon {...props} color={step2 ? 'green' : 'grey'} icon={!step2 ? 'checkbox-blank-circle-outline' : 'checkbox-marked-circle'} />}
                            title="COMPLETE YOUR ACCOUNT INFORMATION"
                            titleNumberOfLines={2}
                            titleStyle={step2 ? {
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid',
                            } : {}}
                        />
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {
                        if(!step3){
                            setVisible(false);
                            navigation.navigate('EditProfile');
                        }
                    }}>
                        <List.Item
                            left={props => <List.Icon {...props} color={step3 ? 'green' : 'grey'} icon={!step3 ? 'checkbox-blank-circle-outline' : 'checkbox-marked-circle'} />}
                            title="COMPLETE YOUR PROFILE"
                            titleStyle={step3 ? {
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid',
                            } : {}}
                        />
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {
                        if(!step4){
                            setVisible(false);
                            navigation.navigate('AddArtWork');
                        }
                    }}>
                        <List.Item
                            left={props => <List.Icon {...props} color={step4 ? 'green' : 'grey'} icon={!step4 ? 'checkbox-blank-circle-outline' : 'checkbox-marked-circle'} />}
                            title="ADD ARTWORK/SERVICES"
                            titleStyle={step4 ? {
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid',
                            } : {}}
                        />
                    </TouchableRipple>
                    <DefaultButton
                        buttonText={'Close'}
                        onPress={()=>{
                            setVisible(false);
                        }}
                        showLoader={false}
                    />
                </View>
            </Modal>
        </>
    );
};

ProfileCompletion.propTypes = {
    data:PropTypes.object,
    mode:PropTypes.string.isRequired,
};

export default ProfileCompletion;