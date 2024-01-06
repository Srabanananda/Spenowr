/**
 *  Created By @name Sukumar_Abhijeet
 */
import Toast from 'react-native-simple-toast';
import { getLoginDetails, getUserDetails } from '../../@Endpoints/Auth';
import { setAxiosConfig } from '../axiosFiles/Interceptor';
import { deviceInfoExtractor } from './DeviceInfoExtractor';
import { getFBToken } from './FiirebaseToken';

const InitiateAuthentication = async (loginParams,chkbox=true,setLoading,props,mobileVerifyCallback={},OTPForm=null) =>{
    try {
        const {updateUserAccessToken,navigation} = props;
        setLoading(true);
        const deviceLogs = await deviceInfoExtractor();
        
        var dataToSend = { ...loginParams, chkbox};
        let loginParam = {...dataToSend,...deviceLogs};
        console.log("params : ", JSON.stringify(loginParam));
        const body = new FormData();
        for ( var key in loginParam ) {
            body.append(key, loginParam[key]);
        }
        
        const fcmToken = await getFBToken();
        body.append('fcm_token',fcmToken);
        getLoginDetails(body).then(response=>{
            const {data:{token}} = response;
            console.log("getLoginDetails login token : ", JSON.stringify(token));
            updateUserAccessToken(token);
            OTPForm && OTPForm(false)
            setAxiosConfig(token,true,navigation);
            checkUserDetails(setLoading,props,mobileVerifyCallback,loginParam?.email);
        }).catch((e)=>{
            console.log('Login error : ',e)
            Toast.show('Invalid Credentials',Toast.LONG);
            setLoading(false);
        });
    } catch (error) {
        console.log('Login catch error : ',error)
        Toast.show('Aunthentication Failed',Toast.LONG);
        setLoading(false);
    }
};

export const checkUserDetails = (setLoading,props,mobileVerifyCallback, email)=>{
    const {updateUserDetails,navigation:{navigate}} = props;
    getUserDetails()
        .then(res=>{
            const {data:{institute={},institute:{skill1=null,account_type_id},profileData={}}} = res;
            var isPhone = !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email)

            if(profileData.mobile_verify === '0' && isPhone) {
                console.log('isPhone checking true');
                mobileVerifyCallback?.(profileData.user_id);
            } else {
                console.log('isPhone checking else');
                updateUserDetails(institute,profileData);
                if(institute){
                    if((skill1 === '' || skill1 === null) && account_type_id !== '4')navigate('Onboarding');
                    else navigate('CoreTabs');
                }
                else navigate('CoreTabs');
            }
        })
        .catch()
        .finally(()=>setLoading(false));
};

export default InitiateAuthentication;