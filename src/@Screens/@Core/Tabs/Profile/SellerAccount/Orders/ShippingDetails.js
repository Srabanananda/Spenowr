/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import DefaultButton from '@GlobalComponents/DefaultButton';
import Modal from 'react-native-modal';
import FormHeader from '@GlobalComponents/FormHeader';
import { GlobalStyles } from '../../../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import CheckBox from '@react-native-community/checkbox';
import { updateSellerShippingDetails, updateSellerShippingDetailsStatus } from '../../../../../../@Endpoints/Core/Tabs/Service';
import Toast from 'react-native-simple-toast';
import { Dropdown } from 'react-native-material-dropdown';

const { COLOR: { LIGHTGREY } } = Config;

const allStatus = [
    { value: 'Confirmed', name: '1' },
    { value: 'Shipped', name: '2' },
    { value: 'Delivered', name: '3' },
];

const ShippingDetails = ({ orderId, subOrders }) => {

    const [isActive, setIsActive] = useState(false);
    const [statusDisabled, setStatusDisabled] = useState(true);
    const [info, setInfo] = useState(subOrders?.courier_info ?? '');
    const [id, setId] = useState(subOrders?.tracking_id ?? '');
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusVisible, setStatusVisible] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('Confirmed');

    const renderShippingDetails = () => {
        const onSubmit = () => {
            if (id === '') {
                Toast.show('Please Add Tracking Id');
                return;
            }
            setLoading(true);
            const data = new FormData();
            data.append('courierdetail', info);
            data.append('tracking_id', id);
            data.append('notify_email', checked);
            data.append('order_info_id', orderId);
            updateSellerShippingDetails(data)
                .then(() => {
                    setTimeout(() => { Toast.show('Updated Successfully'); }, 400);
                    setStatusDisabled(false);
                })
                .catch()
                .finally(() => {
                    setLoading(false);
                    setIsActive(false);
                });
        };

        return (
            <View style={[GlobalStyles.primaryCard, styles.modal]}>
                <FormHeader headerText={'Add Courier Info'} onPress={() => setIsActive(false)} />
                <TextInput
                    multiline={true}
                    onChangeText={(value) => setInfo(value)}
                    placeholder={'Enter your courier info'}
                    style={styles.textInput}
                    value={info}
                />
                <TextInput
                    onChangeText={(value) => setId(value)}
                    placeholder={'Tracking ID'}
                    placeholderTextColor={LIGHTGREY}
                    style={GlobalStyles.textInput}
                    value={id}
                />
                <Text style={styles.infoText}>
                    **Please note, this will update the status to Shipped and notify customer with shipping information
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(10) }}>
                    <CheckBox
                        disabled={false}
                        onValueChange={(newValue) => { setChecked(newValue); }}
                        style={{ marginRight: moderateScale(10) }}
                        value={checked}
                    />
                    <Text style={styles.subText}>NOTIFY BUYER OVER EMAIL</Text>
                </View>
                <DefaultButton buttonText={'Submit'} onPress={onSubmit} showLoader={loading} />
            </View>
        );
    };

    const renderStatus = () => {
        const onStatusSubmit = () => {
            setLoading(true);
            const data = new FormData();
            data.append('order_status_id', orderId);
            data.append('order_status', allStatus.find(x => x.value === currentStatus).name);
            updateSellerShippingDetailsStatus(data)
                .then(() => {
                    setTimeout(() => { Toast.show('Status Updated'); }, 400);
                    setStatusVisible(false);
                })
                .catch()
                .finally(() => setLoading(false));

        };

        return (
            <View style={[GlobalStyles.primaryCard, styles.modal]}>
                <FormHeader headerText={'Order Status'} onPress={() => setStatusVisible(false)} />
                <Dropdown
                    data={allStatus}
                    fontSize={12}
                    onChangeText={(value) => setCurrentStatus(value)}
                    value={currentStatus}
                />
                <DefaultButton buttonText={'Update Status'} onPress={onStatusSubmit} showLoader={loading} />
            </View>
        );
    };

    return (
        <View>
            <DefaultButton buttonText={'Update Shipping Info'} onPress={() => setIsActive(true)} />
            <DefaultButton buttonText={'Update Status'} isDeactivated={statusDisabled} onPress={() => setStatusVisible(true)} />
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={isActive}
                onBackButtonPress={() => {
                    setIsActive(false);
                }}
                onBackdropPress={() => {
                    setIsActive(false);
                }}
                style={{ justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}
                useNativeDriver={true}
            >
                {renderShippingDetails()}
            </Modal>

            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={statusVisible}
                onBackButtonPress={() => {
                    setStatusVisible(false);
                }}
                onBackdropPress={() => {
                    setStatusVisible(false);
                }}
                style={{ justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}
                useNativeDriver={true}
            >
                {renderStatus()}
            </Modal>

        </View>
    );
};

export default ShippingDetails;
const styles = StyleSheet.create({
    modal: {
        width: '90%',
        padding: moderateScale(10),
    },
    infoText: {
        fontSize: moderateScale(10)
    },
    textInput: {
        borderWidth: 1, paddingHorizontal: moderateScale(15),
        borderColor: LIGHTGREY,
        marginVertical: moderateScale(8),
        borderRadius: moderateScale(3),
        height: moderateScale(80),
        textAlignVertical: 'top'
    },
});