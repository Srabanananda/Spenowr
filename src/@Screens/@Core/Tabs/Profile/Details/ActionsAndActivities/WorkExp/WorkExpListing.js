import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import Toast from 'react-native-simple-toast';
import ScreenLoader from '@GlobalComponents/ScreenLoader';
import { getArtistWorkExpList } from '../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import FallBackUI from '../../../../../../../@GlobalComponents/FallBackUI';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import { FlatList, RefreshControl, Text } from 'react-native';
import WorkExpCard from '../../../../../../@Common/WorkExp/WorkExpCard';
import { connect } from 'react-redux';


const WorkExpListing = ({...props} : any) => {

    const {mode,publicUserData} = props;

    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const [refreshing,setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [workExp, setWorkExp] = useState(false);

    const callApi = () =>{
        setLoading(true);
        getArtistWorkExpList()
            .then(res => {
                const {data:{workExpData=[]}}  = res;
                setWorkExp(workExpData);
            })
            .catch(() => {
                Toast.show('Oops something went wrong');
                navigation.goBack();
            })
            .finally(()=>setLoading(false));
    };

    useEffect(()=>{
        if(isFocused)
            if(mode === 'PRIVATE') callApi();
            else{
                setWorkExp(publicUserData?.workexp ?? []);
            }
    },[isFocused]);

    const onRefresh = () =>{
        if(mode === 'PRIVATE')
        {
            setRefreshing(true);
            callApi();
            setTimeout(()=>{setRefreshing(false);},500);
        }
    };

    const renderPages = ({ item ,index}) =>{
        return(
            <ErrorBoundary FallbackComponent={FallBackUI} key={index} >
                <WorkExpCard hidePostedBy mode={mode} refresh={callApi} showActions workExp={item} />
            </ErrorBoundary>
        );
    };

    if (loading) return <ScreenLoader text={'Loading Work Experiences..'} />;

    return (
        <>
            {!workExp.length && <Text style={GlobalStyles.noDataFound}>No work experience added</Text>}
            <FlatList
                contentContainerStyle={{padding:moderateScale(10)}}
                data={workExp}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh} refreshing={refreshing}
                        title="Refreshing .."
                        titleColor={'#000'} />
                }
                renderItem = {renderPages}   
                showsVerticalScrollIndicator={false} 
            >
            </FlatList>
        </>
    );

};

const mapStateToProps = (state) => {
    return {
        publicUserData: state.userObj.publicUserData,
    };
};

export default connect(mapStateToProps)(WorkExpListing);