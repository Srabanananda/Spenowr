/**
 * Create By @name Sukumar_Abhijeet
 */

import React,{useEffect,useState} from 'react';
import { FlatList,Text,RefreshControl } from 'react-native';
import { getProjectList } from '../../../../../@Endpoints/Core/Tabs/More';
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import { moderateScale } from 'react-native-size-matters';
import ProjectCard from './ProjectCard';
import { GlobalStyles } from '../../../../../@GlobalStyles';

const ProjectList = () =>{

    const [list , setList] = useState([]);
    const [loading , setLoading] = useState(true);
    const [refreshing,setRefreshing] = useState(false);

    useEffect(()=>{
        loadList();
    },[]);

    const loadList = () =>{
        if(!list.length) setLoading(true);
        getProjectList()
            .then(res=>{
                const {data:{projectList=[]}} = res;                
                setList(projectList.filter(x => x.status === '1'));
                setLoading(false);
            })
            .catch(()=>{
                setLoading(false);
            });
    };

    const onRefresh = () =>{
        setRefreshing(true);
        loadList();
        setTimeout(()=>{setRefreshing(false);},500);
    };

    const renderPages = ({ index,item }) =>{
        return <ProjectCard info={item}  key={index} />;
    };
    
    if(loading)
        return <ScreenLoader text={'Loading Project List..'} />;

    if(!loading && list.length)    
        return(
            <FlatList
                data={list} 
                horizontal={false}
                initialNumToRender={5}
                keyExtractor={item=>item.project_id.toString()}
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh} refreshing={refreshing}
                        title="Refreshing .."
                        titleColor={'#000'} />
                }
                removeClippedSubviews={true} 
                renderItem = {renderPages}
                showsVerticalScrollIndicator={false}
                style={{flex:1,margin:moderateScale(10)}}
            />
        );

    return  <Text style={GlobalStyles.noDataFound}> No Contests Found</Text>;
};

export default ProjectList;