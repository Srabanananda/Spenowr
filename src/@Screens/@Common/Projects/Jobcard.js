/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Config from '@Config/default';
import styles from './styles';
import { getJobCategory, postedByView } from '../Jobs/JobCard';
import moment from 'moment';
import { getCountry, getState } from '../../../@Utils/helperFiles/CardDetails';
import { isAValidImagePath } from '../../../@Utils/helperFiles/helpers';
import ScaledImage from '../../../@GlobalComponents/ScalableImage';
import { GlobalStyles } from '../../../@GlobalStyles';

import { useNavigation } from '@react-navigation/native';
const { NEW_IMG_BASE, DUMMY_IMAGE_URL } = Config;

const Jobcard = ({ JobData }) =>{
    const navigation = useNavigation();
    const {
        assignment_street_address = '',
        assignment_title = '',
        start_range = '',
        end_range = '',
        assignment_zipcode = '',
        description = '',
        currency = '',
        response = '',
        assignment_country = '1',
        assignment_state = '1',
        assignment_city = '',
        event_date = '',
        who_posted = '',
        slug_url = '',
        // assignment_id = '',
        assignment_category = '',
        days_assignment = '',
        // like_count = 0,
        // enable_record = '1',
        posted_by = '',
        image_path = '',
        
    } = JobData;
    const hasCategory = getJobCategory(assignment_category);
    const { name: countryName = '' } = getCountry(assignment_country);
    const { value: stateName = '' } = getState(assignment_country, assignment_state);

    const navigateArtist = () => navigation.navigate('PublicProfile', { slug: slug_url });

    return(
        <View style={styles.container}>
            <View style={GlobalStyles.primaryCard}>
                {hasCategory ? <ScaledImage source={{ uri: isAValidImagePath(image_path) ? NEW_IMG_BASE + image_path : DUMMY_IMAGE_URL }} /> : null}
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{assignment_title}</Text>
                    {postedByView(navigateArtist, who_posted, false, posted_by === '1')}
                    <Text style={styles.description}>{description}</Text>
                    {end_range != 0 ? <Text style={styles.price}>{start_range} to {end_range} {currency}</Text>: null}
                    <Text style={styles.duration}>{days_assignment} Days Duration</Text>
                    <Text style={styles.address}>{countryName}, {stateName}, {assignment_city}</Text>
                    <Text style={styles.address}>{assignment_street_address}, {assignment_zipcode}</Text>
                    <Text style={[styles.posted, { fontWeight: 'bold' }]}>Event on {moment(event_date).format('MMMM Do YYYY')}</Text>
                    { response !== '0' ? <Text style={styles.submissions}>{response} Submissions </Text> : null }
                </View>
            </View>
        </View>
    );
};

Jobcard.propTypes = {
    navigation:PropTypes.object.isRequired,
    route:PropTypes.object.isRequired,
};

export default Jobcard;

