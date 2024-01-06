/**
 *  Created By @name Sukumar_Abhijeet
 */

import { CashFreeAxios } from '../../../@Utils/axiosFiles/cashfreeAxios';
import Config from '@Config/default';
import axios from 'axios';

const { CASHFREE_APPID, CASHFREE_SECRETKEY, CASHFREE_API, BASE_PATH, API_VERSIONING } = Config;

export const GetTokenFromCashFree = (body) => {
    return CashFreeAxios
        .post(CASHFREE_API, body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-client-id': CASHFREE_APPID,
                    'x-client-secret': CASHFREE_SECRETKEY
                },
            })
        .then(response => response.data).catch((e)=>console.log('GetTokenFromCashFree error : ', e));
};

export const initiateContestPayment = (payload) => {
    console.log(payload)
    var body = new FormData();
    for (var key in payload) {
        body.append(key, payload[key]);
    }
    const url = `${BASE_PATH + API_VERSIONING}/profile/apply-contest`;
    console.log(url)
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data).catch((e)=>{
            console.log(e)
        });
};

export const initiateSubscriptionPayment = (payload) => {
    var body = new FormData();
    for (var key in payload) {
        body.append(key, payload[key]);
    }
    const url = `${BASE_PATH + API_VERSIONING}/subscription/subscription-payment`;
    return axios
        .post(
            url,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const verifySubscriptionPaymentWithServer = (orderId) => {
    const url = `${BASE_PATH + API_VERSIONING}/subscription/get-payment-subscription-progress`;
    const data = new FormData();
    data.append('application', true);
    data.append('order_id', orderId);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const upgradeToFreePlan = (freePlan, id) => {
    const url = `${BASE_PATH + API_VERSIONING}/subscription/subscription-basic-plan`;
    const data = new FormData();
    data.append('plan', freePlan);
    data.append('userId', id);
    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};

export const checkIosSubscriptionReceipt = (plan, id, purchase,orderId,selectedProd) => {
    const url = `${BASE_PATH + API_VERSIONING}/subscription/get-ios-subscription-receipt`;
    const data = new FormData();
    for ( var key in purchase ) {
        data.append(key, purchase[key]);
    }
    data.append('plan', plan);
    data.append('user_id', id);
    data.append('order_id', orderId);

    data.append('orderStatus', 'success');
    data.append('txStatus', 'success');
    data.append('status', 'success');
    data.append('txMsg', 'ios in-app purchase');
    data.append('paymentMode', 'in-app-purchase');
    data.append('orderAmount', selectedProd?.price);
    data.append('txTime', purchase?.transactionDate??'');
    data.append('orderCurrency', selectedProd?.currency??'');

    return axios
        .post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        )
        .then(response => response.data);
};
