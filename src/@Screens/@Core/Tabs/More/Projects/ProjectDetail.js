/**
 * Create By @name Sukumar_Abhijeet 
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView,View,ScrollView,Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Config from '@Config/default';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import { getProjectDetails } from '../../../../../@Endpoints/Core/Tabs/More';
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import styles from './styles';
import Jobcard from './Jobcard';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Animated from 'react-native-reanimated';
import Toast from 'react-native-simple-toast';
import ScaledImage from '../../../../../@GlobalComponents/ScalableImage';
const { COLOR:{APP_PINK_COLOR,APP_THEME_COLOR,},NEW_IMG_BASE } = Config;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ProjectDetail = ({...props}) =>{

    const { navigation, route } = props;
    const {projectDetails} = route.params;

    const [loading , setLoading] = useState(true);
    const [pDetails , setPDetails] = useState('');
    const [jobs , setJobs] = useState([]);

    useEffect(()=>{
        loadData();
    },[]);

    const loadData = () =>{
        let formData = new FormData();
        formData.append('slug_url',projectDetails?.slug_url);
        getProjectDetails(formData)
            .then(res=>{
                const {data:{ Project={}, Assignment=[]}} = res;
                setPDetails(Project);
                setJobs(Assignment);
                setLoading(false);
            })
            .catch(()=>{
                setLoading(false);
                Toast.show('No details Found',Toast.LONG);
                navigation.goBack();
            });
    }; 

    const Job = ({ index, item }) => {
        return(
            <Jobcard JobData={item} key={index} />
        );
    };
    if(loading)
        return <ScreenLoader text={'Loading Project Details..'} />;
    return(
        <SafeAreaView style={{flex:1}}>
            <DefaultHeader headerText={'Project Detail'} />
            <ScrollView contentContainerStyle={{padding:moderateScale(10)}} showsVerticalScrollIndicator={false}>
                <View style={styles.TitleStyle}>
                    <Text style={[styles.titleText,{marginLeft: 5, color: '#FFF'}]}>{'Name : '}{pDetails.title}</Text>
                </View>
                <View style={{ paddingVertical: moderateScale(10), paddingHorizontal: moderateScale(5)}}>
                    <View style={{ paddingVertical: moderateScale(5)}}>
                        <Text style={styles.descText}>
                            <Text style={[styles.descText,{fontWeight: 'bold', fontStyle: 'italic'}]}>{'Description : '}</Text>
                            {pDetails.description}
                        </Text>
                    </View>
                </View>
                <View style={[{ paddingVertical: moderateScale(2), paddingHorizontal: moderateScale(5)},styles.TitleStyle]}>
                    <Text style={[styles.titleText,{color: '#FFF'}]}>{'Jobs linked to '}{pDetails.title}</Text>
                </View>
                <AnimatedFlatList
                    contentContainerStyle={{paddingTop:moderateScale(8)}}
                    data={jobs}
                    onEndReachedThreshold={0.3} 
                    renderItem = {Job}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    style={{flex:1}}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

ProjectDetail.propTypes = {
    navigation:PropTypes.object.isRequired,
    route:PropTypes.object.isRequired,
};

export default ProjectDetail;

