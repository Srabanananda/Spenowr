/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,FlatList} from 'react-native';
import ListHeader from '@GlobalComponents/ListHeader';
import styles from './styles';
import PropTypes from 'prop-types';
import { getFooter } from '../../@Core/Tabs/Home/Tabs/WhatsNew/WhatsNewCard';
import WritingsView from '../../../@GlobalComponents/WritingsView';
import { moderateScale } from 'react-native-size-matters';
import ErrorBoundary from 'react-native-error-boundary';
import FallBackUI from '../../../@GlobalComponents/FallBackUI';
 
const SimilarQuotesPoems = ({relatedQuotes=[],listTitle}) =>{

    const renderPages = ({ index,item }) =>{
        item.name=item.title;
        return (
            <ErrorBoundary FallbackComponent={FallBackUI} key={index}>
                <WritingsView 
                    Writing={item} 
                    hideTopDesciption={true} 
                    horizontalContainer={styles.WritingsContainer}
                    horizontalContainerImage={styles.WritingsImageContainer}
                    key={index}  
                    plainTextContainer={{width:moderateScale(150),minHeight:moderateScale(150),marginRight:10}}
                    verticalContainer={styles.WritingsContainer}
                    verticalContainerImage={styles.WritingsImageContainer}
                >
                    {getFooter()}
                </WritingsView>
            </ErrorBoundary>
        );
    };

    if(!relatedQuotes.length) return null;
    return(
        <View style={styles.similarArtworkWrapper}>
            <ListHeader headerText={listTitle} headerViewStyle={{marginBottom:10}} />
            <FlatList
                bounces = {false}
                data={relatedQuotes}
                horizontal={true}
                initialNumToRender={5}
                keyExtractor={item=>item.id.toString()}
                legacyImplementation = {true} 
                renderItem = {renderPages}
                scrollEventThrottle={16} 
                showsHorizontalScrollIndicator={false}
                style={{flex:1,backgroundColor:'#FFF',padding:10}}
            />
        </View>
    );
};
 
 
SimilarQuotesPoems.propTypes = {
    listTitle:PropTypes.string.isRequired,
    relatedQuotes:PropTypes.array.isRequired
};
 
export default SimilarQuotesPoems;