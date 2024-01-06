/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect, useState} from 'react';
import {SafeAreaView,View,StyleSheet,Text} from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import SUBSCRIPTIONS from '../../../assets/JsonFiles/Subscription/plans.json';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader/index';
import Plan from './Plan';
import Carousel from 'react-native-snap-carousel';
import { DEVICE_WIDTH, isIOS } from '../../../@Utils/helperFiles/DeviceInfoExtractor';
import { moderateScale } from 'react-native-size-matters';
import { getKeysFromObj } from '../../../@Utils/helperFiles/helpers';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import { getSubsciptionDetails } from '../../../@Endpoints/Auth/index';
import { Toast } from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import * as moreActions from '@Redux/actions/moreActions';
import InAppPurchaseIOS from './InApp_IOS/comingSoon';
// import InAppPurchaseIOS from './InApp_IOS';
interface SubscriptionPlanProps{
    route : Object
}

const SubscriptionScreen = ({...props}: SubscriptionPlanProps) =>{

    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const {route:{params},navigation} = props;
    const [Subscriptions, setSubScriptionKeys] = useState(getKeysFromObj(SUBSCRIPTIONS));
    const [SUBSCRIPTION_LIST, SET_SUBSCRIPTION_LIST] = useState(SUBSCRIPTIONS);
    const [selectedPlan, setSelectedPlan] = useState(Subscriptions[1]);
    const [currentPlan, setCurrentPlan] = useState(Subscriptions[0]);
    const [isFromReg, setIsFromReg] = useState(false);
    const [showItem, setShowItem] = useState(1);
    useEffect(()=>{
        callApi();
        if(params)
        {
            if(params?.fromReg) setIsFromReg(true);
            if(params?.current) setCurrentPlan(params.current);
            if(params?.selected) setSelectedPlan(params.selected);
            if(params?.showItem) setShowItem(params.selected);
        }
    },[]);

    const callApi = () =>{
        dispatch(moreActions.fetchSubscriptionPlans());
        getSubsciptionDetails()
            .then(res=>{
                const {data} = res;
                setSubScriptionKeys(getKeysFromObj(data));
                SET_SUBSCRIPTION_LIST(data);
                setLoader(false);
            })
            .catch(()=>{
                Toast.show('Oops Couldnot load the plans.');
                setTimeout(()=>{navigation.goBack();},500);
            });
    };

    const onPlanChange = changedPlan => {
        setSelectedPlan(changedPlan);
    };

    const getPlans = ({item, i}) =>{
        if(SUBSCRIPTION_LIST[item])
            return <Plan 
                currentPlan={currentPlan} 
                isFromReg={isFromReg} 
                key={i} 
                plan={SUBSCRIPTION_LIST[item]} 
                selectedPlan={selectedPlan} 
                setPlan={onPlanChange} 
            />;
        return <Text style={GlobalStyles.noDataFound}>No Plans Found</Text>;
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={ isIOS &&!isFromReg ? 'Coming Soon' : 'Select A Plan'} />
            {
                
                loader ? <ScreenLoader text={'Loading plans..'}  /> : 
                    isIOS &&!isFromReg ? 
                        <InAppPurchaseIOS 
                            SUBSCRIPTION_LIST={SUBSCRIPTION_LIST} 
                            Subscriptions={Subscriptions} 
                            currentPlan={currentPlan}
                            isFromReg={isFromReg}
                            selectedPlan={selectedPlan} 
                            setPlan={onPlanChange} 
                        /> :
                        <View style={styles.container}>
                            <Carousel
                                data={Subscriptions}
                                firstItem={showItem}
                                inactiveSlideOpacity={0.8}
                                itemWidth={DEVICE_WIDTH-70}
                                renderItem={getPlans}
                                sliderWidth={DEVICE_WIDTH}
                            />
                        </View>
            }
        </SafeAreaView>
    );
};

export default SubscriptionScreen;
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:moderateScale(10)
    }
});