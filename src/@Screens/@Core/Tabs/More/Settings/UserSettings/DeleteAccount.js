import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { GlobalStyles } from '@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import ModalHeader from '@GlobalComponents/ModalHeader/index';
import DefaultButton from '../../../../../../@GlobalComponents/DefaultButton';
import CheckBox from '@react-native-community/checkbox';
import { requestUserAccountDeletion } from '../../../../../../@Endpoints/Auth';
import Toast from 'react-native-simple-toast';

const { COLOR: { LIGHTGREY, WHITE } } = Config;
const DeleteReasons = [
    { value: 1, reason: 'I Faced error/issue, While using the Platform' },
    { value: 2, reason: 'I don\'t feel like getting value from the platform' },
];

const DeleteAccount = () => {

    const [showModal, setShowModal] = useState(false);
    const [requested, setRequested] = useState(false);
    const [loader, setLoader] = useState(false);
    const [feedBack, setFeedBack] = useState('');
    const [optionSelected, setOptionSelected] = useState(null);
    const [contactSupport, setContactSupport] = useState(false);

    const _handleAccountDelete = () => {
        const params = new FormData();
        params.append('disable_reason_option', optionSelected);
        params.append('contacted_spenowr', contactSupport);
        params.append('disable_reason_desc', '');
        params.append('additional_feedback', feedBack);
        params.append('contact_no', '');
        setLoader(true);
        requestUserAccountDeletion(params)
            .then(() => {
                setRequested(true);
            })
            .catch(() => {
                Toast.show('Oops Something went wrong');
            })
            .finally(() => setLoader(false));
    };

    const renderReasonsAndFeedback = () => {
        return (
            <View>
                {DeleteReasons.map((option, i) => {
                    return (
                        <View key={i} style={{ marginBottom: moderateScale(5), flexDirection: 'row', alignItems: 'center' }}>
                            <CheckBox
                                disabled={false}
                                onValueChange={() => setOptionSelected(option?.value)}
                                style={{ marginRight: moderateScale(10), width: moderateScale(20), height: moderateScale(20) }}
                                value={optionSelected === option?.value}
                            />
                            <Text style={{ fontSize: moderateScale(12) }}>{option.reason}</Text>
                        </View>
                    );
                })}
                <TextInput
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(textValue) => setFeedBack(textValue)}
                    placeholder="Any Additional Feedback"
                    placeholderTextColor="#414756"
                    returnKeyType="next"
                    style={[GlobalStyles.textInput, { height: moderateScale(80), fontSize: moderateScale(12) }]}
                    value={feedBack}
                />
                <View style={{ marginBottom: moderateScale(5), flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox
                        disabled={false}
                        onValueChange={(value) => setContactSupport(value)}
                        style={{ marginRight: moderateScale(10), width: moderateScale(20), height: moderateScale(20) }}
                        value={contactSupport}
                    />
                    <Text style={{ fontSize: moderateScale(10) }}>Will you be interested to speak to Spenowr Support over phone to address your concern?</Text>
                </View>
            </View>
        );
    };

    const renderUI = () => {
        return (
            <View style={{ backgroundColor: WHITE, width: '100%', position: 'absolute', bottom: 0, padding: moderateScale(15), paddingBottom: moderateScale(30) }}>
                <ModalHeader headerText={requested ? 'ACCOUNT DELETE REQUESTED!' : 'DELETE ACCOUNT'} onPress={() => { setShowModal(false); }} />
                <Text style={{ paddingVertical: moderateScale(10), alignSelf: requested ? 'center' : 'flex-start', fontWeight: '600', fontSize: moderateScale(14), marginTop: moderateScale(10) }}>{requested ? 'We have received your request' : 'Sorry to loose you. We would like to learn what makes you Disable Account?'}</Text>
                {!requested && renderReasonsAndFeedback()}
                <Text style={{ paddingVertical: moderateScale(6), alignSelf: 'center', textAlign: 'center', marginTop: moderateScale(10), fontSize: moderateScale(10) }}>{requested ? 'Will update you soon.' : 'Once confirmed it will delete all your account details and order records.'}</Text>
                {!requested && <DefaultButton buttonText={'YES, DELETE MY ACCOUNT'} isDeactivated={!optionSelected} onPress={_handleAccountDelete} showLoader={loader} />}
            </View>
        );
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setShowModal(true)} style={GlobalStyles.optionsBox}>
                <Text>Delete Account</Text>
                <Icon color={LIGHTGREY} name={'angle-right'} size={moderateScale(16)} />
            </TouchableOpacity>
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={showModal}
                onBackButtonPress={() => {
                    setShowModal(false);
                }}
                onBackdropPress={() => {
                    setShowModal(false);
                }}
                style={{ margin: 0, padding: 0 }}
                useNativeDriver={true}
            >
                {renderUI()}
            </Modal>
        </View>
    );

};

export default DeleteAccount;