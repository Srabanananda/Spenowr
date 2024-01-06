/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {RefreshControl,FlatList,Text} from 'react-native';
import { useIsFocused,useNavigation } from '@react-navigation/native';
import { getMyJobsList } from '../../../../../../../@Endpoints/Core/Tabs/More';
import Toast from 'react-native-simple-toast';
import ScreenLoader from '@GlobalComponents/ScreenLoader';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import ErrorBoundary from 'react-native-error-boundary';
import FallBackUI from '../../../../../../../@GlobalComponents/FallBackUI/index';
import JobCard from '../../../../../../@Common/Jobs/JobCard';

const JobsListScreen = ({...props}) =>{

    const {mode} = props;

    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const [refreshing,setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState(false);

    const onRefresh = () =>{
        if(mode === 'PRIVATE')
        {
            setRefreshing(true);
            callApi();
            setTimeout(()=>{setRefreshing(false);},500);
        }
    };

    useEffect(()=>{
        if(isFocused)
            if(mode === 'PRIVATE') callApi();
    },[isFocused]);

    const callApi = () =>{
        setLoading(true);
        getMyJobsList()
            .then(res => {
                const {data:{photo_assignment=[]}}  = res;
                setJobs(photo_assignment);
            })
            .catch(() => {
                Toast.show('Oops something went wrong');
                navigation.goBack();
            })
            .finally(()=>setLoading(false));
    };

    const renderPages = ({ item ,index}) =>{
        return(
            <ErrorBoundary FallbackComponent={FallBackUI} key={index} >
                <JobCard hidePostedBy job={item} mode={mode} refresh={callApi} showActions />
            </ErrorBoundary>
        );
    };

    if (loading)
        return <ScreenLoader text={'Loading Jobs..'} />;

    return (
        <>
            {!jobs.length && <Text style={GlobalStyles.noDataFound}>No Jobs added</Text>}
            <FlatList
                contentContainerStyle={{padding:moderateScale(10)}}
                data={jobs}
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

export default JobsListScreen;