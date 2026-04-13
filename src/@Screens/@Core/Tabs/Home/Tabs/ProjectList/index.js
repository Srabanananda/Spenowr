/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {
    View,FlatList,
    RefreshControl,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import * as homeActions from '@Redux/actions/homeActions';
import { moderateScale } from 'react-native-size-matters';
import ProjectCard from '../../../More/Projects/ProjectCard';
import PropTypes from 'prop-types';
import ScreenLoader from '../../../../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../../../@GlobalStyles';

const ProjectList = ({...props}: any) =>{

    const {
        apiCalled, fetchProjects, forProjectsFeed,
        // appliedFilters, For Future use on applying filters
    } =props;

    const [refreshing,setRefreshing] = useState(false);

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = (length=0) =>{
        fetchProjects(null,length);
    };

    const onRefresh = () =>{
        setRefreshing(true);
        callApi();
        setTimeout(()=>{setRefreshing(false);},500);
    };

   

    const renderPages = ({ index,item }) =>{
        if(item?.status !== '1') return <></>;
        return <ProjectCard info={item}  key={index} />;
    };

    if(forProjectsFeed.length)
        return(
            <View style={{flex:1,marginTop:moderateScale(5)}}>
                <FlatList
                    contentContainerStyle={{paddingTop:moderateScale(8), paddingHorizontal: moderateScale(8)}}
                    data={forProjectsFeed}
                    horizontal={false}
                    initialNumToRender={5}
                    keyExtractor={item=>item.project_id.toString()}
                    removeClippedSubviews={true}
                    onEndReached={()=>!apiCalled && callApi(null , forProjectsFeed.length)}
                    onEndReachedThreshold={0.3} 
                    refreshControl={
                        <RefreshControl
                            onRefresh={onRefresh} refreshing={refreshing}
                            title="Refreshing .."
                            titleColor={'#000'} />
                    }
                    renderItem = {renderPages}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    style={{flex:1}}
                />
            </View>
        );

    if(!forProjectsFeed.length && apiCalled)
        return(
            <ScreenLoader text={'Loading Project data..'} />
        );
    
    if(!forProjectsFeed.length && !apiCalled)
        return(
            <>
                <Text style={GlobalStyles.noDataFound}> No Project Found !!</Text>
            </>
        );    
};

ProjectList.propTypes = {
    fetchProjects:PropTypes.func.isRequired,
};

function mapStateToProps(state){
    return{
        forProjectsFeed : state.home.forProjectsFeed,
        apiCalled : state.home.forProjectsApiCalled,
    };
}

function mapDispatchToProps(dispatch){
    return{
        fetchProjects:(data,length) => dispatch(homeActions.fetchProjects(data,length)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectList);