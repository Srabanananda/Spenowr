/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState} from 'react';
import {View,Text,FlatList,RefreshControl} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import ScreenLoader from '../../../../../../@GlobalComponents/ScreenLoader';
import * as galleryActions from '../../../../../../@Redux/actions/galleryActions';
import Card from './Card';
import Filters from './filters';

const Gallery = ({...props}) =>{

    const {
        fetchGalleryPhotography,
        apiCalled,photoGraphyList
    } = props;

    const [refreshing,setRefreshing] = useState(false);

    const onRefresh = () =>{
        setRefreshing(true);
        callApi();
        setTimeout(()=>{setRefreshing(false);},500);
    };

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = (fromLimit = 0 , toLimit=15 ) =>{
        let formData = new FormData();
        formData.append('id','');
        formData.append('page','FIRST');
        formData.append('offset',0);
        formData.append('sort','date');
        formData.append('photography_name','');
        formData.append('photography_category','');
        formData.append('photography_subcat','');
        formData.append('cat','');
        formData.append('subcat','');
        formData.append('type','');
        formData.append('slug','');
        formData.append('user_id','');
        formData.append('pageRange',15);
        formData.append('limit_from',fromLimit);
        formData.append('limit_to',toLimit);
        fetchGalleryPhotography(formData,fromLimit);
    };

    const renderPages = ({ index,item }) =>{
        return <Card info={item}  key={index} />;
    };

    const renderFooter = () =>{
        return <ActivityIndicator color={'red'} size={'small'} />;
    };

    if(photoGraphyList.length)
        return(
            <View style={{flex:1,padding:moderateScale(20)}}>
                <FlatList
                    ListFooterComponent={renderFooter()} 
                    data={photoGraphyList}
                    horizontal={false}
                    initialNumToRender={5}
                    keyExtractor={item=>item.media_id.toString()}
                    onEndReached={()=>callApi(photoGraphyList.length,photoGraphyList.length+15)}
                    onEndReachedThreshold={0.3}
                    refreshControl={
                        <RefreshControl
                            onRefresh={onRefresh} refreshing={refreshing}
                            title="Refreshing .."
                            titleColor={'#000'} />
                    }
                    removeClippedSubviews={true} 
                    renderItem = {renderPages}
                    showsVerticalScrollIndicator={false}
                    style={{flex:1}}
                />
                <Filters />
            </View>
        );
    if(!photoGraphyList.length && apiCalled)
        return(
            <ScreenLoader text={'Loading data..'} />
        );
    
    if(!photoGraphyList.length && !apiCalled)
        return(
            <>
                <Text style={{alignSelf:'center',marginTop:moderateScale(20)}}> No Data Found</Text>
                <Filters />
            </>
        );    
};


function mapStateToProps(state){
    return{
        photoGraphyList : state.gallery.photoGraphyList,
        apiCalled : state.gallery.apiCalled
    };
}

function mapDispatchToProps(dispatch){
    return{
        fetchGalleryPhotography:(data,fromLimit) =>
            dispatch(galleryActions.fetchGalleryPhotography(data,fromLimit)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Gallery);