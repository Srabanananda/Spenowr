/**
 * Create By @name Sukumar_Abhijeet
 */

import React,{useEffect,useState} from 'react';
import { FlatList,Text,RefreshControl } from 'react-native';
import { getContestList } from '../../../../../../@Endpoints/Core/Tabs/More';
import ScreenLoader from '../../../../../../@GlobalComponents/ScreenLoader';
import ContestCard from './ContestCard';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../../../../@GlobalStyles';

const ContestList = () =>{

    const [list , setList] = useState([]);
    const [loading , setLoading] = useState(true);
    const [refreshing,setRefreshing] = useState(false);

    useEffect(()=>{
        loadList();
    },[]);

    const getFormData = (from =0 , to =10 ) =>{
        let formData = new FormData();
        formData.append('query','');
        formData.append('page','FIRST');
        formData.append('sort','');
        formData.append('offset',0);
        formData.append('pageRange',5);
        formData.append('category','');
        formData.append('feed_type','');
        formData.append('limit_from',from);
        formData.append('limit_to',to);
        return formData;

    };

    const loadList = () =>{
        if(!list.length) setLoading(true);
        getContestList(getFormData())
            .then(res=>{
                const {data:{contestList=[]}} = res;
                setList(contestList);
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
        if(item?.status !== '1') return <></>;
        return <ContestCard info={item}  key={index} />;
    };
    
    if(loading)
        return <ScreenLoader text={'Loading Contest List..'} />;

    if(!loading && list.length)    
        return(
            <FlatList
                data={list} 
                horizontal={false}
                initialNumToRender={5}
                keyExtractor={item=>item.contest_id.toString()}
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

export default ContestList;