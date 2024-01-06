/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import { GlobalStyles } from '../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import { getCountry, getState } from '../../../@Utils/helperFiles/CardDetails';
import { deleteShippingAddress, editShippingAddress, setDefaultShippingAddress } from '../../../@Endpoints/Core/Tabs/Shop';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getUserDetails } from '../../../@Endpoints/Auth';
import * as userActions from '@Redux/actions/userActions';
import { connect } from 'react-redux';

const {COLOR:{LIGHTGREY,SUBNAME,APP_PINK_COLOR,WHITE,BLACK}} = Config;

const AddressCard = ({...props}) =>{
    const {
        Address,isSelected,onPress,cardContainerStyles,
        onDeleteComplete, onEditComplete, selectedI,
        variant = 'large',
        updateUserDetails,
        userObj
    } = props;

    const {
        delivery_type='',
        address='',
        name='',
        pin='',
        contact_number='',
        country='1',
        state='1',
        shipping_id=''
    } = Address;

    const {default_address} = userObj;

    const isDefault = shipping_id === default_address;

    const {name:countryName=''} = getCountry(country);
    const {value:stateName=''} = getState(country,state);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [defaultLoader, setDefaultLoader] = useState(false);
    const [editLoader, setEditLoader] = useState(false);
    const location = `${countryName}, ${stateName} - ${pin}`;

    const refreshProfile = () =>{
        getUserDetails()
            .then(res=>{
                const {data:{institute={},profileData={}}} = res;
                updateUserDetails(institute,profileData);
            })
            .catch();
    };

    const deleteAddress = () =>{
        setDeleteLoader(true);
        deleteShippingAddress(shipping_id)
            .then(()=>{
                Toast.show('Address deleted successfully');
                onDeleteComplete?.();
            })
            .catch(()=>{
                Toast.show('Oops couldnot delete now');
            })
            .finally(()=>{
                setDeleteLoader(false);
            });
    };

    const editAddress = () =>{
        setEditLoader(true);
        editShippingAddress(shipping_id)
            .then((res)=>{
                onEditComplete?.(res.data.shipping_address);
                onDeleteComplete?.();
            })
            .catch(()=>{
                Toast.show('Oops couldnot load data');
            })
            .finally(()=>{
                setEditLoader(false);
            });
    };

    const setAddressAsDefault = () => {
        setDefaultLoader(true);
        setDefaultShippingAddress(shipping_id)
            .then(()=>{
                Toast.show('Address set as default');
                refreshProfile();
                onDeleteComplete?.();
            })
            .catch(()=>{
                Toast.show('Oops couldnot set as default');
            })
            .finally(()=>{
                setDefaultLoader(false);
            });  
    };

    if(variant==='small')
        return(
            <TouchableOpacity onPress={()=>onPress?.(selectedI)} style={[isSelected && styles.smallSelected,styles.defaultSelected]}>
                <View style={styles.deliveryWrapper}>
                    <View style={styles.deliveryBox}>
                        <View style={[styles.circle,isSelected?{backgroundColor:WHITE}:{}]}>
                            <Icon color={isSelected ? APP_PINK_COLOR : WHITE} name={delivery_type === 'work' ? 'home' : 'building'} size={moderateScale(14)} />
                        </View>
                        <Text style={[styles.nameSmall,isSelected?{color:WHITE}:{}]}>{name} - {contact_number}</Text>
                    </View>
                    <View style={styles.actionBox}>
                        <TouchableOpacity onPress={editAddress}>
                            {editLoader ?  <ActivityIndicator  color={WHITE} /> : <Icon color={isSelected ? WHITE : BLACK} name={'pencil-alt'}  size={moderateScale(16)} />}
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={deleteAddress}>
                            {deleteLoader ?  <ActivityIndicator color={WHITE} /> : <Icon color={isSelected ? WHITE : BLACK} name={'trash-alt'} onPress={deleteAddress} size={moderateScale(18)} style={{marginLeft:moderateScale(15)}} />}
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={[styles.addressSmall,isSelected?{color:WHITE}:{}]}>{address}</Text>

            </TouchableOpacity>
        );

    return(
        <TouchableOpacity 
            onPress={()=>onPress?.(selectedI)} 
            style={[GlobalStyles.primaryCard,styles.container,cardContainerStyles, isSelected&&styles.selected]}
        >
            <View style={styles.chips}>
                <Text style={styles.delivery} >{delivery_type.toUpperCase()}</Text>
            </View>
            <Text style={styles.name}>{name} - {contact_number}</Text>
            <Text style={styles.address}>{address}</Text>
            <Text>{location}</Text>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity disabled={isDefault} onPress={()=>setAddressAsDefault()} style={ isDefault ? GlobalStyles.seeMoreButtonRev :  GlobalStyles.seeMoreButton}>
                    {defaultLoader ?  <ActivityIndicator color={APP_PINK_COLOR} /> : <Text style={ isDefault ? GlobalStyles.seeMoreButtonTextRev : GlobalStyles.seeMoreButtonText}>{isDefault ? 'Default' :  'Set Default'}</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>editAddress()} style={GlobalStyles.seeMoreButton}>
                    {editLoader ?  <ActivityIndicator color={APP_PINK_COLOR} /> : <Text style={GlobalStyles.seeMoreButtonText}>Edit</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>deleteAddress()} style={GlobalStyles.seeMoreButton}>
                    {deleteLoader ?  <ActivityIndicator color={APP_PINK_COLOR} /> : <Text style={GlobalStyles.seeMoreButtonText}>Delete</Text>}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

AddressCard.propTypes = {
    Address:PropTypes.object.isRequired,
    cardContainerStyles:PropTypes.object,
    isSelected: PropTypes.any,
    onDeleteComplete:PropTypes.func,
    onEditComplete:PropTypes.func,
    onPress:PropTypes.func,
    selectedI:PropTypes.number,
    updateUserDetails : PropTypes.func,
    userObj : PropTypes.object.isRequired,
    variant:PropTypes.string,
};



const mapStateToProps = (state) => {
    return {
        userObj : state.userObj.user
    };
};

const mapDispatchToProp = (dispatch) => ({
    updateUserDetails:(instituteObj,profileObj) =>
        dispatch(userActions.updateUserDetails(instituteObj,profileObj))
});

export default connect(mapStateToProps,mapDispatchToProp)(AddressCard);

const styles = StyleSheet.create({
    container:{
        padding:moderateScale(10)
    },
    selected:{
        borderColor:APP_PINK_COLOR,
        borderWidth:1
    },
    buttonWrapper:{
        flexDirection:'row',
        alignSelf:'flex-end',
        justifyContent:'space-between',
        width:moderateScale(190),
        marginTop:moderateScale(6)
    },
    name:{
        fontWeight:'bold',
        color:SUBNAME,
        fontSize:moderateScale(14),
        marginBottom:moderateScale(3)
    },
    delivery:{
        color:SUBNAME,
        fontWeight:'bold'
    },
    chips:{
        backgroundColor:LIGHTGREY,
        padding:moderateScale(10),
        paddingVertical:moderateScale(5),
        alignSelf:'flex-start',
        borderRadius:moderateScale(4),
        marginBottom:moderateScale(5)
    },
    address:{
        fontSize:moderateScale(12)
    },
    deliveryWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    circle:{
        width:moderateScale(22),
        height:moderateScale(22),
        backgroundColor:BLACK,
        borderRadius:moderateScale(12),
        justifyContent:'center',
        alignItems:'center'
    },
    deliveryBox:{
        flexDirection:'row',
        alignItems:'center'
    },
    nameSmall:{
        fontWeight:'bold',
        marginLeft:moderateScale(8)
    },
    actionBox:{
        flexDirection:'row'
    },
    smallSelected:{
        backgroundColor:APP_PINK_COLOR,
        padding:moderateScale(10),
        borderRadius:moderateScale(4),
    },
    defaultSelected:{
        padding:moderateScale(10),
    },
    addressSmall:{
        color:SUBNAME,
        marginTop:moderateScale(3)
    }
});