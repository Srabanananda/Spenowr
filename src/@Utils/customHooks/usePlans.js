/**
 *  Created By @name Sukumar_Abhijeet
 */

// import { useEffect,useState } from 'react';
import SUBSCRIPTIONS from '../../assets/JsonFiles/Subscription/plans.json';
import { useStore } from 'react-redux';

const usePlan = (subscription_plan) => {
    const {more:{subscriptions: STORE_SUBSCRIPTIONS}} = useStore()?.getState();
    return STORE_SUBSCRIPTIONS? STORE_SUBSCRIPTIONS[subscription_plan] :  SUBSCRIPTIONS[subscription_plan];
};
export default usePlan;