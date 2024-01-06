/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text} from 'react-native';
import WritingsView from '../../../@GlobalComponents/WritingsView';
import PropTypes from 'prop-types';
import { getFooter } from '../../@Core/Tabs/Home/Tabs/WhatsNew/WhatsNewCard';
import styles from './styles';

const QuoteBox = ({quote}) =>{
    const {title='',description=''} = quote;
    quote.name = title;
    return(
        <>
            <WritingsView Writing={quote} isNavigationDisabled={true} >
                {getFooter()}
            </WritingsView>
            <View style={styles.detailWrapper}>
                <Text style={styles.quoteHead} >{title}</Text>
                <Text style={styles.desc}>{description}</Text>
            </View>
        </>
    );
};

QuoteBox.propTypes = {
    quote:PropTypes.object.isRequired,
};

export default QuoteBox;