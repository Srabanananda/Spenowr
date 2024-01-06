/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import DefaultButton from '../../../../../../../@GlobalComponents/DefaultButton';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { getAccountType } from '../../InfoCard';
import Config from '@Config/default';
import { connect } from 'react-redux';
import UpgradeAccount from '../UpgradeAccount';
import EditProfileImage from '../../EditProfileImage';
import * as userActions from '@Redux/actions/userActions';
import PropTypes from 'prop-types';

const {
    COLOR:{SUBNAME,DARK_VIOLET}
} = Config;


const ArtLovers = ({...props}) =>{
    const {accountData,mode,updateUserDetails,userObj,publicAccountData} = props;
    const{
        email,
        first_name,last_name,
        account_type
    } = accountData;
    const navigation = useNavigation();

    const getData = () => {
        if(mode === 'PRIVATE')
            return(
                <>
                    <Text style={styles.userNameText}>{first_name} {last_name}</Text>
                    <Text style={styles.artLoverText}>{getAccountType(account_type)} | {email}</Text>
                </>
            );
        if(mode === 'PUBLIC' && publicAccountData.institute)
            return(
                <>
                    <Text style={styles.userNameText}>{publicAccountData.institute.institute_name}</Text>
                    <Text style={styles.artLoverText}>{getAccountType(publicAccountData.institute.account_type_id)} </Text>
                    <Text>{publicAccountData.institute.contact_email}</Text>
                </>
            );
        return null;
    };

    return(
        <>
            <View style={[GlobalStyles.primaryCard,styles.container]}>
                <EditProfileImage mode={mode} updateUserDetails={updateUserDetails} userObj={userObj} />
                {getData()}
            </View>
            {
                mode === 'PRIVATE' &&
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                    <DefaultButton 
                        buttonStyle={{width:'40%',alignSelf:'center',height:moderateScale(30),paddingVertical:moderateScale(5)}} 
                        buttonText={'Account Info'} 
                        onPress={() => navigation.navigate('AccountInfo')} 
                        showLoader={false} 
                        textStyle={{fontSize:moderateScale(12)}}  
                    />
                    <UpgradeAccount />
                </View>
            }
        </>
    );
};


 
ArtLovers.propTypes = {
    accountData:PropTypes.object.isRequired,
    mode:PropTypes.string.isRequired,
    publicAccountData:PropTypes.object.isRequired,
    updateUserDetails:PropTypes.func.isRequired,
    userObj:PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{
        accountData : state.userObj.userProfile,
        userObj: state.userObj,
        publicAccountData : state.userObj.publicUserData
    };
}
const mapDispatchToProp = (dispatch) => ({
    updateUserDetails:(instituteObj,profileObj) =>
        dispatch(userActions.updateUserDetails(instituteObj,profileObj))
});
 
export default connect(mapStateToProps,mapDispatchToProp)(ArtLovers);

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        padding:moderateScale(20),
    },
    artLoverText:{
        fontSize:moderateScale(10),
        marginTop:moderateScale(5),
        color:SUBNAME,
        fontWeight:'bold'
    },
    imageBox:{
        padding:10,
        width:moderateScale(100),
        height:moderateScale(100),
        backgroundColor:DARK_VIOLET,
        borderRadius:moderateScale(15),
        shadowRadius: moderateScale(1), 
        elevation: scale(5),
        shadowOffset: {
            height: scale(1),
            width: scale(1)
        },
        shadowColor: '#000', shadowOpacity: .2,
    },
    userNameText:{
        fontSize:moderateScale(16),
        marginTop:moderateScale(10),
        fontWeight:'bold'
    }
});
