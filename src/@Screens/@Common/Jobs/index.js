/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {SafeAreaView,StyleSheet,View,RefreshControl,FlatList,Text} from 'react-native';
import DefaultHeader  from '@GlobalComponents/DefaultHeader';
import { getJobList } from '../../../@Endpoints/Core/Tabs/More';
import ScreenLoader from '@GlobalComponents/ScreenLoader';
import FallBackUI from '../../../@GlobalComponents/FallBackUI';
import ErrorBoundary from 'react-native-error-boundary';
import JobCard from './JobCard';
import { GlobalStyles } from '../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';

const JobsScreen = () =>{

    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [refreshing,setRefreshing] = useState(false);
    const [creditData, setCreditData] = useState({availCredits : 0,minCreditsToApply:20});
    useEffect(()=>{
        callApi();
    },[]);

    const onRefresh = () =>{
        setRefreshing(true);
        callApi();
        setTimeout(()=>{setRefreshing(false);},500);
    };

    const callApi = () => {
        getJobList(getFilterKeys())
            .then(res=>{
                const {data:{list=[],available_credits=0,Minimun_apply_job_point=20}} = res;
                setJobs(list);
                setCreditData({availCredits:available_credits,minCreditsToApply:Minimun_apply_job_point});
            })
            .catch()
            .finally(()=>setLoading(false));
    };

    const renderJob = ({ index,item }) => {
        return(
            <ErrorBoundary FallbackComponent={FallBackUI} key={index} >
                <JobCard creditData={creditData} job={item} refresh={callApi} />
            </ErrorBoundary>
        );
    };

    const getData = ()=>{
        if(!loading)
            return (
                <View style={styles.container}>
                    {!jobs.length && <Text style={GlobalStyles.noDataFound}>No jobs Found</Text>}
                    <FlatList
                        data={jobs}
                        horizontal={false}
                        initialNumToRender={10}
                        keyExtractor={item=>item.assignment_id.toString()}
                        legacyImplementation = {true}
                        onEndReached={()=> !loading && callApi(jobs.length)}
                        onEndReachedThreshold={0.5} 
                        refreshControl={
                            <RefreshControl
                                onRefresh={onRefresh} refreshing={refreshing}
                                title="Refreshing .."
                                titleColor={'#000'} />
                        }
                        renderItem = {renderJob} 
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            );
        return <ScreenLoader text={'Fetching Job Details..'} />;
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Job Opportunities'} />
            {getData()}
        </SafeAreaView>
    );
};

export const getFilterKeys = (filters={}) => {
    const {
        query='',photography_name='',
        offset=0,pageRange=15,limit_from=0,limit_to=20,country='',
        state='',photography_category='',sub_category='',assignmentFee_range='',
        navcd='',sort='date',navname='',navcity='',postcode=''
    } = filters;
    const filterData = new FormData();
    filterData.append('query',query);
    filterData.append('photography_name',photography_name);
    filterData.append('page','FIRST');
    filterData.append('offset',offset);
    filterData.append('pageRange',pageRange);
    filterData.append('limit_from',limit_from);
    filterData.append('limit_to',limit_to);
    filterData.append('country',country);
    filterData.append('photography_category',photography_category);
    filterData.append('state',state);
    filterData.append('sub_category',sub_category);
    filterData.append('assignmentFee_range',assignmentFee_range);
    filterData.append('navcd',navcd);
    filterData.append('sort',sort);
    filterData.append('navname',navname);
    filterData.append('navcity',navcity);
    filterData.append('postcode',postcode);
    return filterData;
};

export default JobsScreen;
const styles = StyleSheet.create({
    container:{
        padding:moderateScale(10),
        flex:1
    }
});