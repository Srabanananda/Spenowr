/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { connect,useStore } from 'react-redux';
import moment from 'moment';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import { useNavigation } from '@react-navigation/native';

const {COLOR:{APP_PINK_COLOR,WHITE}} = Config;

type SubscriptionProps = {
    userObj: Object,
}

const SubscriptionUpgrade = ({...props}:SubscriptionProps) =>{

    const navigation = useNavigation();

    const {userObj:{
        userProfile:{
            subscription_plan,
            subscription_last_date='',
            subscription_status,
            email_verify,
        }
    }} = props;

    const {more:{subscriptions: STORE_SUBSCRIPTIONS}} = useStore()?.getState();
    const currentPlanIndex = Object.keys(STORE_SUBSCRIPTIONS).indexOf(subscription_plan);
    const currentPlan = currentPlanIndex === 2 ? subscription_plan : Object.keys(STORE_SUBSCRIPTIONS)[currentPlanIndex+1];

    const getSubscriptionContent = () =>{
        switch (subscription_status) {
        case '0':
            return 'You are on Free Subscription';

        case '2':
            return 'Your trial overs on';

        default :
            return '';
        }
    };

    const expiryDate = moment(subscription_last_date).format('MMMM Do YYYY') === 'Invalid date' ? '' : moment(subscription_last_date).format('MMMM Do YYYY')  ; 

    const onUpgrade =()=> navigation.navigate('Subscription',{current:subscription_plan,selected:currentPlan});
    if(subscription_status === '1') return null;

    return(
        <View style={[styles.container,{ paddingTop  :   email_verify ==='0' ? 0 : 10 }]}>
            <View>
                <Text style={{color:WHITE}}>{getSubscriptionContent()}</Text>
                {expiryDate ? <Text style={styles.expiryDate}>{expiryDate}</Text> : null}
            </View>
            <TouchableOpacity onPress={onUpgrade} style={styles.upgradeButton}>
                <Text style={GlobalStyles.seeMoreButtonTextRev}>Upgrade Now</Text>
            </TouchableOpacity>
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        userObj : state.userObj
    };
};

export default connect(mapStateToProps)(SubscriptionUpgrade);
const styles = StyleSheet.create({
    container:{
        backgroundColor: APP_PINK_COLOR,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:moderateScale(10),
        paddingTop:0
    },
    upgradeButton:{
        borderColor:WHITE,
        paddingHorizontal:moderateScale(10),
        padding:moderateScale(5),
        borderRadius:moderateScale(4),
        borderWidth:1
    },
    expiryDate:{
        fontWeight:'bold',
        color:WHITE
    }
});