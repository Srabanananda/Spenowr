/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState} from 'react';
import {SafeAreaView,ScrollView,View} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { getPublicUserData } from '../../../../../@Endpoints/Auth';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import InfoCard from '../Details/InfoCard';
import ProfileActions from '../Details/ProfileActions';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import * as userActions from '../../../../../@Redux/actions/userActions';
import PropTypes from 'prop-types';
import ContactInfo from '../Details/ContactInfo';
import RecommendedArtist from '../Details/OtherArtists';
import { useIsFocused } from '@react-navigation/core';
import FallBackUI from '../../../../../@GlobalComponents/FallBackUI';
import ErrorBoundary from 'react-native-error-boundary';
import ArtLovers from '../Details/Accounts/ArtLover';
import Options from './Options';

const PublicProfileScreen = ({...props}) =>{
    const isFocused = useIsFocused();

    const {route:{params:{slug}},updatePublicUserDetails,navigation,userObj} = props;
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] =  useState({institute_id:''});
    
    const {
        publicUserData:{
            institute:{
                account_type_id = ''
            } ,
            login_block_count = 0
        }
    } = userObj;

    const isUserBlocked = login_block_count === 0  ?   false : true;

    useEffect(()=>{
        if(isFocused)callApi();
    },[isFocused]);

    const callApi = () =>{
        setLoading(true);
        if(slug && slug !=='')
            getPublicUserData(slug)
                .then(res=>{
                    const {data:{institute},data} = res;
                    if(institute)
                    {
                        updatePublicUserDetails(data);
                        setUserData(institute);
                        setLoading(false);
                    }
                    else{
                        navigation.goBack();
                        Toast.show('Oops, Couldnot Sync Details',Toast.LONG);
                    }
                })
                .catch(()=>{
                    navigation.goBack();
                    Toast.show('Oops, Couldnot Sync Details',Toast.LONG);
                });
        else
        {
            navigation.goBack();
            Toast.show('Oops, Couldnot Sync Details',Toast.LONG);
        }
    };

    const optionProps = {
        account_type_id,
        userData,
        userObj,
        callApi,
        isUserBlocked
    };

    const checkIsBlockedRenderer = () => {
        return(
            <>
                <ProfileActions mode={'PUBLIC'} />
                <ContactInfo mode={'PUBLIC'} />
                <RecommendedArtist mode={'PUBLIC'} />
            </>
        );
    };
   

    const renderData = () =>{
        if(loading)
            return <ScreenLoader text={'Fetching Details..'} />;
        if(account_type_id === '4')
            return(
                <>
                    <ErrorBoundary FallbackComponent={FallBackUI}>
                        <ArtLovers mode={'PUBLIC'} />
                    </ErrorBoundary>
                </>
            );
        return(
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{margin:moderateScale(10)}}>
                    <InfoCard isUserBlocked={isUserBlocked} mode={'PUBLIC'} publicUser={userData} />
                    {!isUserBlocked && checkIsBlockedRenderer()}
                </View>
            </ScrollView>
        );
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Artist Profile'} >
                {!loading &&  <Options {...optionProps} />}
            </DefaultHeader>
            {renderData()}
        </SafeAreaView>
    );
};

const mapStateToProps =(state) =>{
    return {
        userObj:state.userObj,
    };
};
const  mapDispatchToProp =(dispatch)=>({
    updatePublicUserDetails:(publicData) =>
        dispatch(userActions.updatePublicUserDetails(publicData))
});

PublicProfileScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
    route:PropTypes.object.isRequired,
    updatePublicUserDetails:PropTypes.func.isRequired,
    userObj: PropTypes.object.isRequired,
};
export default connect(mapStateToProps,mapDispatchToProp)(PublicProfileScreen);