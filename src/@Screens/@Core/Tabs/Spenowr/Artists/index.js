/**
 *  Created By @name Ramakanta
 */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import {getAllFindArtist} from '../../../../../@Endpoints/Core/Dialog/FindArtiest';
import SliderComponent from './SliderComponent';
import { moderateScale } from 'react-native-size-matters';

const FindArtistScreen = () =>{

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const body={
            query:'', 
            country: 1,
            sort: 'country'
        };
        callApi(body);
    },[]);


    const callApi = (body) =>{
        getAllFindArtist(body)
            .then((response)=>{
                setData(response.data);
            }).catch()
            .finally(()=>{
                setLoading(false);
            });
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Find Artists'} />
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                style={{padding:moderateScale(10)}}
            >
                <SliderComponent 
                    artist={true} 
                    data={data.contributors} 
                    loading={loading} 
                    seeMoreLink={'contributors'} 
                    titleText={'Top Contributors'} 
                />
                <SliderComponent 
                    artist={true} 
                    data={data.contest_winners_artists} 
                    loading={loading} 
                    seeMoreLink={'top-contest-winners'} 
                    titleText={'Recent Contest Winners'} 
                />
                <SliderComponent 
                    data={data.top_rated_dance_schools} 
                    loading={loading} 
                    seeMoreLink={'top-rated-dance-schools'} 
                    titleText={'Top Rated Dance Schools'} 
                />
                <SliderComponent 
                    data={data.top_rated_music_schools} 
                    loading={loading} 
                    seeMoreLink={'top-rated-music-schools'} 
                    titleText={'Top Rated Music Schools'} 
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default FindArtistScreen;
