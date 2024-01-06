/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,FlatList} from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import { renderArtistCard } from '../../@Core/Tabs/Spenowr/Artists/ViewMoreArtist';

const ArtistsSearch = ({...props}:screenProps) =>{
    const {results=[]} = props;

    if(!results.length) return <Text style={GlobalStyles.noDataFound}>No Search Result Found</Text>;
    
    return(
        <View style={{flex:1}}>
            <FlatList
                bounces = {false}
                data={results}
                initialNumToRender={10}
                keyExtractor={item=>item.institute_id.toString()}
                legacyImplementation = {true}
                renderItem = {renderArtistCard} 
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                style={{flex:1}}
            />
        </View>
    );
};

export default ArtistsSearch;

export const artistDataSet = (searchText) =>  {
    return {
        query: searchText,
        page: 'FIRST',
        offset: 0,
        pageRange: 30,
        country: '' ,
        state: '',
        rating: '',
        cat: '',
        subcat: '',
        find_trainer: '',
        type: '',
        artist_featured: false,
        service_type : '',
        summary_filter : '',
        sort: '',
        limit_from: 0,
        limit_to: 30,
    };
};