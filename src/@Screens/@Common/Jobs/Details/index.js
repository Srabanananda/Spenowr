/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, RefreshControl } from 'react-native';
import DefaultHeader from '@GlobalComponents/DefaultHeader';
import { getJobDetails } from '../../../../@Endpoints/Core/Tabs/More';
import ScreenLoader from '@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';
import Config from '@Config/default';
import RelatedJobs from './RelatedJobs';
import { getJobCategory, postedByView } from '../JobCard';
import { getCountry, getState } from '../../../../@Utils/helperFiles/CardDetails';
import SubmitToJob from '../SubmitToJob';
import ScaledImage from '../../../../@GlobalComponents/ScalableImage/index';
import CardActions from '../../../@Core/Tabs/Home/Tabs/WhatsNew/CardActions';
import moment from 'moment';
import { isAValidImagePath } from '../../../../@Utils/helperFiles/helpers';
import TopDealProducts from './TopDealProducts';

const { COLOR: { SUBNAME, GREEN , WHITE , DARKGRAY }, NEW_IMG_BASE, DUMMY_IMAGE_URL } = Config;

interface DetailProps {
    route: Object,
    navigation: Object,
}

const JobDetailsScreen = ({ ...props }: DetailProps) => {

    const {
        route: { params: { jobSlug } },
        navigation
    } = props;
    const [loading, setLoading] = useState(true);
    const [jobDetail, setJobDetail] = useState();
    const [creditData, setCreditData] = useState({ availCredits: 0, minCreditsToApply: 20 });
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        callApi();
    }, []);

    const callApi = () => {
        setLoading(true);
        getJobDetails(jobSlug)
            .then((res) => {
                const { data, data: {
                    available_credits,
                    Minimun_apply_job_point
                } } = res;
                setJobDetail(data);
                setCreditData({ availCredits: available_credits, minCreditsToApply: Minimun_apply_job_point });
            })
            .catch(() => {
                Toast.show('Oops Something went wrong');
                navigation.goBack();
            })
            .finally(() => setLoading(false));
    };

    const onRefresh = () => {
        setRefreshing(true);
        callApi();
        setTimeout(() => { setRefreshing(false); }, 500);
    };

    const getData = () => {
        if (!loading && jobDetail) {
            const {
                Assignment: {
                    assignment_street_address = '',
                    assignment_title = '',
                    start_range = '',
                    end_range = '',
                    assignment_zipcode = '',
                    description = '',
                    currency = '',
                    response = '',
                    assignment_country = '',
                    assignment_state = '',
                    assignment_city = '',
                    event_date = '',
                    who_posted = '',
                    slug_url = '',
                    assignment_id = '',
                    assignment_category = '',
                    days_assignment = '',
                    like_count = 0,
                    enable_record = '1',
                    posted_by = '',
                    remote = 0
                },
                image_path = '',
                assignment_comment = [],
                top_rated_photographers = [],
                top_deals_product = []
            } = jobDetail;
            console.log('Jod details : ', jobDetail);
            const commentInfo = {
                login_heart_count: 0,
                heart_count: like_count,
                comment_count: assignment_comment.length,
                type: 'jobs',
                module_id: assignment_id,
                slug_url,
            };

            const hasCategory = getJobCategory(assignment_category);

            const { name: countryName = '' } = getCountry(assignment_country);
            const { value: stateName = '' } = getState(assignment_country, assignment_state);

            const navigateArtist = () => navigation.navigate('PublicProfile', { slug: slug_url });
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            onRefresh={onRefresh} refreshing={refreshing}
                            title="Refreshing .."
                            titleColor={'#000'} />
                    }
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        <View style={GlobalStyles.primaryCard}>
                            {hasCategory ? 
                                <ScaledImage source={{ uri: isAValidImagePath(image_path) ? NEW_IMG_BASE + image_path : DUMMY_IMAGE_URL }}>
                                    {remote != undefined && <Text style={remote == "0" ? styles.tagStyle1 : styles.tagStyle2}>
                                        {remote == "0" ? 'Onsite Job' : 'Work From Home'}
                                    </Text>}
                                </ScaledImage> : null}
                            <View style={styles.detailsContainer}>
                                <Text style={styles.title}>{assignment_title}</Text>
                                {postedByView(navigateArtist, who_posted, false, posted_by === '1')}

                                <Text style={styles.description}>{description}</Text>
                                {start_range != "0" && end_range != "0" && <Text style={styles.price}>{start_range} to {end_range} {currency}</Text>}
                                {days_assignment != "0" && <Text style={styles.duration}>{days_assignment} Days Duration</Text>}
                                {(countryName != '' || stateName != '' || assignment_city != '') && 
                                    <Text style={styles.address}>
                                        {countryName}
                                        {stateName != '' ? ', ' + stateName : ''}
                                        {assignment_city != '' ? ', ' + assignment_city : ''}
                                    </Text>}
                                {(assignment_street_address != '' || assignment_zipcode != '') && 
                                    <Text style={styles.address}>
                                        {assignment_street_address}
                                        {assignment_zipcode != '' ? ', ' + assignment_zipcode : ''}
                                    </Text>}
                                <Text style={[styles.posted, { fontWeight: 'bold' }]}>Event on {moment(event_date).format('MMMM Do YYYY')}</Text>
                                {
                                    response !== '0' ? <Text style={styles.submissions}>{response} Submissions </Text> : null
                                }
                                {enable_record !== '0' && <SubmitToJob assignmentId={assignment_id} creditData={creditData} refresh={callApi} title={assignment_title} />}
                                <CardActions info={commentInfo} />
                            </View>
                        </View>
                        <RelatedJobs Jobs={top_rated_photographers} />
                        <TopDealProducts products={top_deals_product} />
                    </View>
                </ScrollView>
            );
        }
        return <ScreenLoader text={'Fetching Job Details..'} />;
    };

    return (
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Job Details'} />
            {getData()}
        </SafeAreaView>
    );
};

export default JobDetailsScreen;
const styles = StyleSheet.create({
    container: {
        padding: moderateScale(10)
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
    detailsContainer: {
        padding: moderateScale(8)
    },
    description: {
        fontSize: moderateScale(12),
        marginTop: moderateScale(3),
        marginBottom: moderateScale(6),
        fontWeight: '400'
    },
    address: {
        color: SUBNAME,
        fontSize: moderateScale(11)
    },
    title: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
    },
    price: {
        marginTop: moderateScale(4),
        fontWeight: 'bold'
    },
    submissions: {
        marginTop: moderateScale(5),
        alignSelf: 'flex-end',
        fontSize: moderateScale(11)
    },
    duration: {
        fontSize: moderateScale(12),
        marginBottom: moderateScale(5)
    },
    posted: {
        color: SUBNAME,
        fontSize: moderateScale(12),
        marginTop: moderateScale(5)
    },
});