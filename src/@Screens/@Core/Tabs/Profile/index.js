/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect,useState } from 'react';
import {SafeAreaView,TouchableOpacity,Text,View, ScrollView,RefreshControl} from 'react-native';
import * as userActions from '@Redux/actions/userActions';
import { connect } from 'react-redux';
import NoInternet from '../../../../@GlobalComponents/NoInternet';
import DefaultHeader from '../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../@GlobalStyles';
import styles from './styles';
import Details from './Details';
import { getUserDetails } from '../../../../@Endpoints/Auth';
import ContactAdmin from './ContactAdmin';
import * as ProfileDataActions from '@Redux/actions/profileActions';
import * as homeActions from '@Redux/actions/homeActions';
import VerifyEmailAlert from './Details/VerifyEmailAlert';
import SubscriptionUpgrade from './Subscription/SubscriptionUpgrade';

const ProfileScreen = ({...props}: any) =>{
    const { 
        isInternetAvailable,navigation:{navigate},
        updateUserDetails,
        fetchArtistAwards,
        fetchArtistArtwoks,
        fetchArtistWritings,
        fetchArtistProducts,
        fetchArtistServices,
        fetchArtistStoryBlogs,
        fetchArtistProjects,
        fetchArtistJobs,
        fetchArtistWorkExperience,
        fetchContestData,
        fetchSeriesData,
        userObj
    } = props;

    const [refreshing, setRefreshing] = useState(false);
    const [profileDataAPI, setProfileData] = useState(null);

    useEffect(()=>{
        
        const unsubscribe = props.navigation.addListener('focus', () => {
            refreshProfile();
        });
        return unsubscribe;
    },[]);

    const refreshProfile = () =>{
        fetchArtistAwards();
        fetchArtistArtwoks();
        fetchArtistWritings();
        fetchArtistProducts();
        fetchArtistServices();
        fetchArtistStoryBlogs();
        fetchContestData();
        fetchArtistProjects();
        fetchArtistJobs();
        fetchArtistWorkExperience();
        fetchSeriesData();
        getUserDetails()
            .then(res=>{
                const {data:{institute={},profileData={}}, data} = res;
                updateUserDetails(institute,profileData);
                setProfileData(data);
            })
            .catch();
    };

    const onRefresh = () =>{
        setRefreshing(true);
        refreshProfile();
        setTimeout(()=>{setRefreshing(false);},500);
    };

    if (!isInternetAvailable)
        return <NoInternet />;

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Profile'} showBackButton={false} >
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>navigate('Referals')}>
                        <Text style={styles.referralButton}>Referals</Text>
                    </TouchableOpacity>
                    <ContactAdmin />
                    <TouchableOpacity onPress={()=>navigate('EditProfile')}>
                        <Text style={styles.editButton}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </DefaultHeader>
            <VerifyEmailAlert />
            <SubscriptionUpgrade />
            <ScrollView 
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh} refreshing={refreshing}
                        title="Refreshing Profile .."
                        titleColor={'#000'} />
                }
                showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Details profileData={profileDataAPI} userObj={userObj} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {
        isInternetAvailable: state.InternetConnectivity.isConnected,
        userObj : state.userObj
    };
};
const mapDispatchToProp = (dispatch) => ({
    resetUser: () =>
        dispatch(userActions.resetUser()),
    updateUserDetails:(instituteObj,profileObj) =>
        dispatch(userActions.updateUserDetails(instituteObj,profileObj)),
    fetchArtistAwards:()=>
        dispatch(ProfileDataActions.fetchArtistAwards()),
    fetchArtistArtwoks:()=>
        dispatch(ProfileDataActions.fetchArtistArtwoks()),
    fetchArtistWritings:()=>
        dispatch(ProfileDataActions.fetchArtistWritings()),
    fetchArtistProducts:()=>
        dispatch(ProfileDataActions.fetchArtistProducts()),
    fetchArtistServices:()=>
        dispatch(ProfileDataActions.fetchArtistServices()),
    fetchArtistWorkExperience:()=>
        dispatch(ProfileDataActions.fetchArtistWorkExperience()),
    fetchArtistStoryBlogs:()=>
        dispatch(ProfileDataActions.fetchArtistStoryBlogs()),
    fetchArtistJobs:()=>
        dispatch(ProfileDataActions.fetchArtistJobs()),
    fetchArtistProjects:()=>
        dispatch(ProfileDataActions.fetchArtistProjects()),
    fetchContestData:() =>
        dispatch(homeActions.fetchContestData()),
    fetchSeriesData:() =>
        dispatch(ProfileDataActions.fetchSeries()),
});

export default connect(mapStateToProps,mapDispatchToProp)(ProfileScreen);