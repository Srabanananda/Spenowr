/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect , useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import FormHeader from '../../../../@GlobalComponents/FormHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import AddressCard from '../../ShippingAddress/AddressCard';
import AddAddressForm from '../../ShippingAddress/AddAddress';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import { GlobalStyles } from '../../../../@GlobalStyles';

const { COLOR: { APP_PINK_COLOR } } = Config;

const Address = ({ ...props }) => {
    const {
        addressList = [],
        refreshData,
        setAddressIndexCallback,
        defaultAddressIndex,
        onEnd,
    } = props;

    const [show, setShow] = useState(true);
    const [editData, setEditData] = useState();
    const callEditApi = data => setEditData(data);
    const [selectedIndex, setSelectedIndex] = useState(defaultAddressIndex !== -1 ? defaultAddressIndex : 0);

    const setAddress = index => {
        setSelectedIndex(index);
        setAddressIndexCallback(index);
    };

    const accordianChild = () => {
        return (
            <>
                {
                    show &&
                    <View style={styles.container}>
                        {addressList.map((eachAddress, i) => (
                            <AddressCard
                                Address={eachAddress}
                                cardContainerStyles={styles.card}
                                isSelected={i === selectedIndex}
                                key={i}
                                onDeleteComplete={refreshData}
                                onEditComplete={callEditApi}
                                onPress={setAddress}
                                selectedI={i}
                                variant='small'
                            />
                        ))}
                        {!addressList.length ? <Text style={GlobalStyles.noDataFound}>Please provide shipping address!</Text> : null}
                    </View>
                }
            </>
        );
    };

    const onPress = () => setShow(!show);

    return (
        <View>
            <FormHeader accordianChild={accordianChild} headerText={'Shipping Address'} onPress={onPress} outlined >
                <View style={styles.wrapper}>
                    <AddAddressForm
                        EditData={editData}
                        onAddComplete={refreshData}
                        onClose={onEnd}
                    />
                    <TouchableOpacity onPress={onPress}>
                        <Icon color={APP_PINK_COLOR} name={!show ? 'chevron-down' : 'chevron-up'} size={24} />
                    </TouchableOpacity>
                </View>
            </FormHeader>
        </View>
    );
};

Address.propTypes = {
    addressList: PropTypes.array.isRequired,
    defaultAddressIndex: PropTypes.number.isRequired,
    refreshData: PropTypes.func.isRequired,
    setAddressIndexCallback: PropTypes.func.isRequired,
};

export default Address;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '35%'
    },
    card: {
        marginBottom: moderateScale(10)
    },
    container: {
        marginTop: moderateScale(10)
    }
});