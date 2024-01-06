/**
 * Create By @name Sukumar_Abhijeet 
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView,View,ScrollView,Text,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Config from '@Config/default';
import DefaultHeader from '../../../../../../@GlobalComponents/DefaultHeader';
import { getContestDetailsById } from '../../../../../../@Endpoints/Core/Tabs/More';
import ScreenLoader from '../../../../../../@GlobalComponents/ScreenLoader';
import styles from './styles';
import { moderateScale } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';
import Info from './Tabs/Info';
import Participants from './Tabs/Participants';
import Winners from './Tabs/Winners';
import ErrorBoundary from 'react-native-error-boundary';
import FallBackUI from '../../../../../../@GlobalComponents/FallBackUI';

import moment from 'moment';
import ScaledImage from '../../../../../../@GlobalComponents/ScalableImage';

const {COLOR:{WHITE,DARK_BLACK,APP_PINK_COLOR},NEW_IMG_BASE} = Config;
const Tabs = [
    {name : 'Info'},{name : 'Participants'},{name : 'Winners'}
];

const ContestDetailsScreen = ({...props}) =>{

    const {route,navigation} = props;
    const {contestID,setTab} = route.params;
    const ID = contestID;

    const [loading , setLoading] = useState(true);
    const [contestDetails , setContestDetails] = useState({});
    const [participants , setParticipants] = useState([]);
    const [winners , setWinners] = useState([]);
    const [selectedTab, setSelectedTab] = useState(setTab ? setTab : Tabs[0].name);
    const [Status, setStatus] = useState(0);

    useEffect(()=>{
        loadData();
    },[selectedTab]);

    const loadData = () =>{
        let formData = new FormData();
        formData.append('id',ID);
        getContestDetailsById(formData)
            .then(res=>{
                const {data:{Contest={},ContestPhotos=[],contest_winners=[],contest_tagstatus='0',ContestComments=[],logedinUserId=''}} = res;
                Contest.ContestComments = ContestComments;
                Contest.LoggedinUserId = logedinUserId;
                setContestDetails(Contest);
                setParticipants(ContestPhotos);
                setWinners(contest_winners);
                setStatus(contest_tagstatus);
                setLoading(false);
            })
            .catch(()=>{
                setLoading(false);
                Toast.show('No details Found',Toast.LONG);
                navigation.goBack();
            });
    };

    // eslint-disable-next-line react/prop-types
    const EachTab = ({tab}) =>{
        return(
            <TouchableOpacity 
                onPress={()=>setSelectedTab(tab)} 
                style={{...styles.eachTab,backgroundColor:selectedTab === tab ?APP_PINK_COLOR : '#FBFBFC' }}
            >
                <Text style={{color: selectedTab === tab  ? WHITE : DARK_BLACK,fontWeight: selectedTab === tab ? 'bold' : '400', fontSize:moderateScale(10)}}>{tab}</Text>
            </TouchableOpacity>
        );
    };

    const renderTabHeader = () =>{
        return(
            <View style={styles.tabWrapper}>
                {
                    Tabs.map((item,index)=>(
                        <EachTab key={index} tab={item.name} />
                    ))
                }
            </View>
        );
    };

    const ErrorController = (children) =>{
        return(
            <ErrorBoundary FallbackComponent={FallBackUI} >
                {children}
            </ErrorBoundary>
        );
    };

    const renderSelectedTab = () =>{
        switch (selectedTab) {
        case Tabs[0].name:
            return ErrorController(<Info Status={Status} contestDetails = {contestDetails} />);
        case Tabs[1].name:
            return ErrorController(<Participants Status={Status} contestDetails = {contestDetails} participantList = {participants} />);
        case Tabs[2].name:
            return ErrorController(<Winners Status={Status} contestDetails = {contestDetails} winnerList = {winners} />);
        }
    };

    if(loading)
        return <ScreenLoader text={'Loading Contest Details..'} />;
    return(
        <SafeAreaView style={{flex:1}}>
            <DefaultHeader headerText={'Contest Info'} />
            <ScrollView contentContainerStyle={{padding:moderateScale(10)}} showsVerticalScrollIndicator={false}>
                <View style={styles.contestInfo}>
                    <ScaledImage source={{ uri: NEW_IMG_BASE + contestDetails.contest_list_img_path }} />
                    <Text style={styles.contestName}>{contestDetails.contest_title}</Text>
                    <View style= {styles.datesWrapper}>
                        <Text style={styles.date}>{moment(contestDetails.start_datetime).format('MMMM Do YYYY')}</Text>
                        <Text style={styles.date} >  -  {moment(contestDetails.end_datetime).format('MMMM Do YYYY')}</Text>
                    </View>
                </View>
                {renderTabHeader()}
                <View style={{marginTop:moderateScale(20)}}>
                    {renderSelectedTab()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

ContestDetailsScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
    route:PropTypes.object.isRequired,
};

export default ContestDetailsScreen;