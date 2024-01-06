/**
 *  Created By @name Sukumar_Abhijeet
 */

import React,{useEffect, useState} from 'react';

import {
    FlatList,
    RefreshControl,
    Text,
    ActivityIndicator,
    Toast
} from 'react-native';

import { fetchArtworkgalleryData } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import DefaultCard from './card';
import { moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import ScreenLoader from '../../../../../../../../@GlobalComponents/ScreenLoader';
import { useIsFocused } from '@react-navigation/native';
import { getGalleryPhotography } from '../../../../../../../../@Endpoints/Core/Tabs/Gallery';

const MyArtWorkScreen = ({...props}) =>{

    const isFocused = useIsFocused();
    const {publicUserData,mode,isContestActive,subscription,points} = props;

    const [loading, setLoading] = useState(false);
    const [artworkList, setArtWorkList] = useState([]);
    const [refreshing,setRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(()=>{
        if(isFocused)
            if(mode === 'PRIVATE') callApi();
            else setArtWorkList(publicUserData.galleryAlbumImages);
    },[isFocused]);

    const onRefresh = () =>{
        if(mode === 'PRIVATE')
        {
            setRefreshing(true);
            callApi();
            setTimeout(()=>{setRefreshing(false);},500);
        }
    };

    const callApi = () =>{
        setLoading(true);
        fetchArtworkgalleryData()
            .then(res => {
                const { data: { instututeImagesData = [] } } = res;
                setArtWorkList(instututeImagesData);
                setLoading(false);
                this.setState({arrArtwork: instututeImagesData, animating: false});
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const callPublicArtworkApi = () =>{
        const data = new FormData();
        data.append('user_id',publicUserData.institute.institute_id);
        data.append('limit_from',artworkList.length);
        data.append('offset',0);
        data.append('sort','date');
        data.append('pageRange',150);
        data.append('limit_to',artworkList.length +150);
        getGalleryPhotography(data)
            .then(res=>{
                const {data:{list=[],count,start_range}} = res;
                const arraySet = [...artworkList,...list];
                if(parseInt(count)===parseInt(start_range)) setHasMore(false);
                setArtWorkList(arraySet);
            })
            .catch(()=>{
                Toast.show('Oops Coulnot load more Artworks');
                setHasMore(false);
            });
    };

    const renderPages = ({ item }) =>{
        return   <DefaultCard cardData={item} isContestActive={isContestActive} mode={mode} refreshData = {()=>callApi()} subscription={subscription} points={points} />;
    };

    if (loading)
        return <ScreenLoader text={'Loading Artworks..'} />;

    if (!loading && artworkList.length)
        return (
            <FlatList
                ListFooterComponent={()=> (mode !== 'PRIVATE' && hasMore) && <ActivityIndicator color={'red'} />}
                contentContainerStyle={{padding:moderateScale(10)}}
                data={artworkList}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={()=> (mode !== 'PRIVATE' && hasMore) && callPublicArtworkApi() }
                onEndReachedThreshold={0.5}
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
        );
    
    if(!loading && !artworkList.length)
        return<Text style={{alignSelf:'center',marginTop:moderateScale(20),fontSize:moderateScale(12)}}>No Artworks available</Text>;

    return null;
};

const mapStateToProps = (state) => {
    return {
        publicUserData: state.userObj.publicUserData,
        isContestActive:state.home.isContestActive
    };
};

export default connect(mapStateToProps)(MyArtWorkScreen);
