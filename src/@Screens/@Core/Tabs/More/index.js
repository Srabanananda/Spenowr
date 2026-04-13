/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';

import { version, iOSVersion } from '../../../../../package.json';
import styles from './styles';
import { connect } from 'react-redux';
import NoInternet from '../../../../@GlobalComponents/NoInternet';
import DefaultHeader from '../../../../@GlobalComponents/DefaultHeader';
import { moderateScale } from 'react-native-size-matters';
import Icon  from 'react-native-vector-icons/FontAwesome5';
import Config from '@Config/default';
import { SafeAreaView } from 'react-native-safe-area-context';

const {COLOR:{DARKGRAY}} = Config;

const MoreScreen = ({...props}) =>{

    const {
        navigation:{navigate},isInternetAvailable,
        userObj:{ userProfile:{subscription_plan,account_type,first_name,last_name,email}}
    } = props;

    const arrMenuList =  [
        { title : 'Series' , route : 'Series',icon :'',param:{}},
        // { title : 'Read Stories' , route : 'Home',icon :'',param:{ setTab: 'whats_new', filter: 'story-blogs' }},
        { title : 'Read Stories' , route : 'Series',icon :'',param:{}},
        { title : 'Audio Podcast' , route : 'AudioPodcast',icon :'',param:{}},
        { title : 'Quotes' , route : 'Home',icon :'',param:{ setTab: 'whats_new', filter: 'quote' }},
        { title : 'Poems' , route : 'Home',icon :'',param:{ setTab: 'whats_new', filter: 'poem' }},
        //{ title : 'Did you know facts' , route : '',icon :'',param:{}},
        // { title : 'Donate' , route : 'Donate',icon :'',param:{username: `${first_name} ${last_name}`, useremail: email}},
        { title : 'Participate in contests'/* 'Contest' */ , route : 'Contest',icon :'',param:{}},
        { title : 'Custom Prints' , route : 'CustomPrints',icon :'',param:{}},
        { title : 'Find Active Projects'/* 'Project List' */ , route : 'Projects',icon :'',param:{}},
        { title : 'My Orders' , route : 'MyOrders',icon :'',param:{}},
        // { title : 'Influencer Profile' , route : 'InfluencerProfile',icon :'',param:{}},
        { title : 'Apply to Jobs'/* 'Job Opportunities' */ , route : 'Jobs',icon :'',param:{}},
        { title : 'Gallery' , route : 'Gallery',icon :'',param:{}},
        { title : 'Subscriptions' , route : 'Subscription',icon :'',param:{current:subscription_plan,selected:subscription_plan}},
        { title : 'User Settings' , route : 'UserSettings',icon :'',param:{}},
        { title : 'App Settings' , route : 'AppSettings',icon :'',param:{}},
        { title : 'Support' , route : 'Support',icon :'',param:{}},
        { title : 'Message Center' , route : 'MessageCenter',icon :'',param:{}},
    ];
    
    if(account_type === '4') arrMenuList.splice(4,1);

    if (!isInternetAvailable)
        return <NoInternet />;
    return (
        <SafeAreaView edges={['left', 'right']} style={styles.container}>
            <DefaultHeader headerText={'More Options'} showBackButton={false} />
            <View style={{ paddingHorizontal: moderateScale(20), flex: 1, minHeight: 0 }}>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}>
                    {
                        arrMenuList.map((item,index)=>(
                            <TouchableOpacity key={index} onPress={()=>{{
                                item.route != "Home" ? navigate(item.route,item.param) :
                                navigate(item.route,{ screen: 'HomeTab', params : item.param})
                            }}} style={styles.eachRow}>
                                <Text>{item.title}</Text>
                                <Icon color={DARKGRAY} name={'angle-right'} size={moderateScale(16)} />
                            </TouchableOpacity>
                        ))
                    }
                    <View style={styles.eachRow}>
                        <Text>{'Version'}</Text>
                        {Platform.OS === 'android' ?
                        <Text style={styles.footerText}>v{version}</Text>
                    : 
                    
                        <Text style={styles.footerText}>v{iOSVersion}</Text>
                     }   
                    </View>
                </ScrollView>
            </View>
            {/* <View style={styles.footer}>
                <Text style={styles.footerText}>v{version}</Text>
            </View> */}
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {
        isInternetAvailable: state.InternetConnectivity.isConnected,
        userObj : state.userObj
    };
};

export default connect(mapStateToProps)(MoreScreen);
