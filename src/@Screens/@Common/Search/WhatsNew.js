/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,FlatList} from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import { renderWhatsNewCards } from '../../@Core/Tabs/Home/Tabs/WhatsNew/index';

type screenProps = {
    results : Array
}

const WhatsNewSearch = ({...props}:screenProps) =>{
    const {results=[]} = props;
    if(!results.length) return <Text style={GlobalStyles.noDataFound}>No Search Result Found</Text>;

    return(
        <View style={{flex:1}}>
            <FlatList
                bounces = {false}
                data={results}
                horizontal={false}
                initialNumToRender={10}
                keyExtractor={item=>item.id.toString()}
                legacyImplementation = {true}
                renderItem = {renderWhatsNewCards} 
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                style={{flex:1}}
            />
        </View>
    );
};

export default WhatsNewSearch;