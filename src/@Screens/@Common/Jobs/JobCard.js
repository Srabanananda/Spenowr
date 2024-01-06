/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import JOB_JSON from '../../../assets/JsonFiles/Jobs/categories.json';
import Config from '@Config/default';
import ScaledImage from '../../../@GlobalComponents/ScalableImage/index';
import Capitalize from '../../../@Utils/helperFiles/Capitalize';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import SubmitToJob from './SubmitToJob';
import CardActions from './CardActions';
import { getCountry, getState } from '../../../@Utils/helperFiles/CardDetails';
import { isAValidImagePath } from '../../../@Utils/helperFiles/helpers';

const { category: CATEGORIES } = JOB_JSON;
const { NEW_IMG_BASE, DUMMY_IMAGE_URL, COLOR: { SUBNAME, APP_PINK_COLOR, DARK_BLACK, GREEN, WHITE, DARKGRAY } } = Config;

interface CardProps {
    job: Object,
    navigation: Object,
    hidePostedBy?: Boolean,
    refresh?: Function
}

export const postedByView = (onPress, who_posted, hidePostedBy = false, isDisabled = false) => {
    return (
        <View style={styles.postedByBox}>
            {
                hidePostedBy ? null :
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.posted}>Posted by </Text>
                        <TouchableOpacity disabled={isDisabled} onPress={onPress}>
                            <Text style={styles.artistName}>{Capitalize(who_posted)}</Text>
                        </TouchableOpacity>
                    </View>
            }
        </View>
    );
};

export const getJobCategory = cat => CATEGORIES[cat];

export const getJobSubCategory = (SUBCATEGORIES, subcat) => {
    if (SUBCATEGORIES && SUBCATEGORIES[subcat]) {
        return SUBCATEGORIES[subcat];
    }
    return null;
};

const JobCard = ({ ...props }: CardProps) => {

    const navigation = useNavigation();

    const {
        job, refresh,
        hidePostedBy = false,
        showActions, mode,
        creditData
    } = props;

    const {
        jobs_slug,
        assignment_category,
        assignment_subcategory,
        event_date,
        assignment_title,
        description,
        response,
        who_posted,
        slug_url,
        assignment_id,
        start_range,
        end_range,
        currency,
        image_path,
        assignment_city,
        assignment_country,
        assignment_state,
        posted_by = '',
        remote = "0"
    } = job;
    const category = getJobCategory(assignment_category);
    const renderTags = tag => {
        return (
            <View style={styles.tags}>
                <Text style={{ color: '#fff', fontSize: moderateScale(10) }}>{Capitalize(tag)}</Text>
            </View>
        );
    };

    const getAddress = () => {
        try {

            const country = getCountry(assignment_country);
            const state = getState(assignment_country, assignment_state);

            return `${country.name}${state.value && ', ' + state.value}${assignment_city ? ', ' + assignment_city : ''}`;

        } catch (error) {
            return '';
        }
    };

    const navigateArtist = () => navigation.navigate('PublicProfile', { slug: slug_url });


    if (category) {
        const { label, subcat } = category;
        const subCat = subcat[assignment_subcategory];
        const subcatLabel = subCat ? subCat.label : null;
        return (
            <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { jobSlug: jobs_slug })} style={[GlobalStyles.primaryCard, styles.card]}>
                <Text style={styles.artWork}>
                    <Text style={styles.artworkType}>{Capitalize(assignment_title)}</Text>
                </Text>
                {postedByView(navigateArtist, who_posted, hidePostedBy, posted_by === '1')}
                <ScaledImage source={{ uri: isAValidImagePath(image_path) ? NEW_IMG_BASE + image_path : DUMMY_IMAGE_URL  }} >
                    {remote && <Text style={remote == "0" ? styles.tagStyle1 : styles.tagStyle2}>
                        {remote == "0" ? 'Onsite Job' : 'Work From Home'}
                    </Text>}
                </ScaledImage>
                <View style={{ marginTop: moderateScale(5) }}>
                    {(description && description !== 'null') ? <Text style={styles.desc}>{description}</Text> : null}
                    {start_range != "0" && end_range != "0" && <Text style={styles.price}>{start_range} to {end_range} {currency}</Text>}
                    <Text style={[styles.desc, { fontWeight: '500' }]}>{getAddress()}</Text>
                    {mode !== 'PRIVATE' ? <SubmitToJob assignmentId={assignment_id} creditData={creditData} refresh={refresh} title={assignment_title} /> : null}
                    {response !== '0' ? <Text style={styles.submissions}>{response} Submissions </Text> : null}
                    <View style={styles.tagBox}>
                        {renderTags(label)}
                        {subcatLabel && renderTags(subcatLabel)}
                    </View>
                    {showActions && <CardActions jobDetails={job} refresh={refresh} />}
                    <Text style={[styles.posted, { fontWeight: 'bold' }]}>Event on {moment(event_date).format('MMMM Do YYYY')}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return null;
};

export default JobCard;
const styles = StyleSheet.create({
    card: {
        padding: moderateScale(10),
        marginBottom: moderateScale(10)
    },
    tags: {
        backgroundColor: SUBNAME,
        marginRight: moderateScale(5),
        paddingHorizontal: moderateScale(10),
        padding: moderateScale(6),
        borderRadius: moderateScale(10),
    },
    tagStyle1: {
        backgroundColor: GREEN, 
        color: WHITE,
        height: moderateScale(20),
        paddingHorizontal: moderateScale(5),
        width: moderateScale(90), 
        textAlign: 'center',
        borderRadius:moderateScale(8),
    },
    tagStyle2: {
        backgroundColor: '#9ccc65', 
        color: WHITE,
        height: moderateScale(20),
        paddingHorizontal: moderateScale(5),
        width: moderateScale(130), 
        textAlign: 'center',
        borderRadius:moderateScale(8),
    },
    tagBox: {
        flexDirection: 'row',
        marginVertical: moderateScale(10)
    },
    artWork: {
        fontSize: moderateScale(14),
        fontWeight: 'bold',
    },
    desc: {
        color: DARK_BLACK,
        marginTop: moderateScale(5),
        fontSize: moderateScale(11)
    },
    submissions: {
        marginTop: moderateScale(5),
        alignSelf: 'flex-end',
        fontSize: moderateScale(11)
    },
    postedByBox: {
        width: '100%',
        paddingBottom: moderateScale(10),
        paddingTop: moderateScale(2)
    },
    posted: {
        color: SUBNAME,
        fontSize: moderateScale(12)
    },
    artistName: {
        color: APP_PINK_COLOR,
        fontSize: moderateScale(12),
        fontWeight: 'bold'
    },
    price: {
        marginTop: moderateScale(4),
        fontWeight: 'bold'
    },
});