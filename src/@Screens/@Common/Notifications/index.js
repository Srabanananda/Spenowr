/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {Text,View, SafeAreaView,FlatList,RefreshControl, TouchableOpacity,ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../@GlobalStyles';
import PropTypes from 'prop-types';
import Card from './Card';
import FallBackUI from '../../../@GlobalComponents/FallBackUI';
import ErrorBoundary from 'react-native-error-boundary';
import * as homeActions from '@Redux/actions/homeActions';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { markNotificationRead } from '../../../@Endpoints/Core/Tabs/Home';

const NotificationScreen = ({...props}) =>{

    const {notificationData,fetchInAppNotifications} = props;

    const [refreshing,setRefreshing] = useState(false);
    const [loader, setLoader] = useState(false);

    const renderPages = ({ index,item }) =>{
        return (
            <ErrorBoundary FallbackComponent={FallBackUI} key={index}>
                <Card key={index} notification={item} refreshList={onRefresh} />
            </ErrorBoundary>
        );
    };

    const onRefresh = () =>{
        setRefreshing(true);
        fetchInAppNotifications(0);
        setTimeout(()=>{setRefreshing(false);},500);
    };

    const renderData = () =>{
        return(
            <FlatList
                data={notificationData}
                horizontal={false}
                keyExtractor={item=>item.notification_id.toString()}
                onEndReached={()=>fetchInAppNotifications(notificationData.length)}
                onEndReachedThreshold={0.3}
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh} refreshing={refreshing}
                        title="Refreshing .."
                        titleColor={'#000'} />
                }
                renderItem = {renderPages}
                showsVerticalScrollIndicator={false}
                style={styles.FlatList}
            />
        );
    };

    const renderNoNotifications = () =>(
        <View style={styles.noNotificationContainer}>
            <Text style={styles.noNotifications}> No Notifications Yet</Text>
            <View style={styles.bellBox}>
                <Icon color={'#fff'} name={'bell-slash'} size={50} />
            </View>
            <TouchableOpacity onPress={()=>fetchInAppNotifications(0)} style={[GlobalStyles.seeMoreButton,styles.refreshButton]}>
                <Text style={GlobalStyles.seeMoreButtonText}>Refresh now</Text>
            </TouchableOpacity>
            <Text style={styles.subText}>we'll let you know when you have new notifications.</Text>
        </View>
    );

    const markAllRead = () =>{
        setLoader(true);
        markNotificationRead()
            .then(()=>onRefresh())
            .finally(()=>setLoader(false));
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Notifications'}> 
                <TouchableOpacity onPress={markAllRead} style={GlobalStyles.seeMoreButtonRev}>
                    {loader ? <ActivityIndicator color={'#FFF'} /> : <Text style={GlobalStyles.seeMoreButtonTextRev}>Mark all read</Text> }
                </TouchableOpacity>
            </DefaultHeader>
            {notificationData.length ? renderData() : renderNoNotifications()}
        </SafeAreaView>
    );
};

function mapStateToProps(state){
    return{
        notificationData:state.home.inAppNotifications.notificationdata
    };
}

function mapDispatchToProps(dispatch){
    return{
        fetchInAppNotifications:(data) =>
            dispatch(homeActions.fetchInAppNotifications(data)),
    };
}

NotificationScreen.propTypes = {
    fetchInAppNotifications:PropTypes.func.isRequired,
    notificationData: PropTypes.array.isRequired,
};

export default connect(mapStateToProps,mapDispatchToProps)(NotificationScreen);