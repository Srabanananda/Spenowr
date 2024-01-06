/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {SafeAreaView,View,StyleSheet,Text,ScrollView} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../@GlobalStyles';
import AddAddressForm from './AddAddress';
import AddressCard from './AddressCard';
import * as moreActions from '@Redux/actions/moreActions';
import { connect } from 'react-redux';

type Props = {
    fetchShippingAddressList : () => void,
    loading : boolean,
    shippingAddresses : Array<Object>,
}

const ShippingAddressScreen = ({...props} : Props) =>{

    const {
        fetchShippingAddressList,
        loading,
        shippingAddresses,
    } = props;

    const [editData, setEditData] = useState(null);

    useEffect(()=>{
        fetchShippingAddressList();
    },[]);

    const callEditApi = editData =>setEditData(editData);

    const renderLoading = () =>(
        <ScreenLoader text={'Fetching Address'} />
    );

    const renderData = () =>{
        if(shippingAddresses.length)
            return(
                <ScrollView style={styles.container}>
                    {shippingAddresses.map((eachAddress, i)=>(
                        <AddressCard Address={eachAddress} cardContainerStyles={styles.card}  key={i} onDeleteComplete={fetchShippingAddressList} onEditComplete={callEditApi} />
                    ))}
                </ScrollView>
            );

        return <Text style={GlobalStyles.noDataFound}>No Shipping Address Added</Text>;
    };
    
    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Shipping Address'} />
            {loading ? renderLoading() : renderData()}
            <View style={styles.addButtonWrapper}>
                <AddAddressForm EditData={editData} onAddComplete={fetchShippingAddressList} showAddButton />
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {
        userObj : state.userObj.user,
        shippingAddresses : state.more.shippingAddressList,
        loading : state.more.shippingLoading,
    };
};

const mapDispatchToProp = (dispatch) => ({
    fetchShippingAddressList:() =>
        dispatch(moreActions.fetchShippingAddressList()),
});

export default connect(mapStateToProps,mapDispatchToProp)(ShippingAddressScreen);

const styles = StyleSheet.create({
    addButtonWrapper:{
        position:'absolute',
        bottom:moderateScale(5),right:moderateScale(5)
    },
    container:{
        padding:moderateScale(15)
    },
    card:{
        marginBottom:moderateScale(10)
    }
});