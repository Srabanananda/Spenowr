/**
 * Create By @name Sukumar_Abhijeet
 */
import DeviceInfo from 'react-native-device-info';
import {Dimensions, Platform} from 'react-native';
import {version} from '../../../package.json';

export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;

export const deviceInfoExtractor = async() =>{
    
    const browser_version = '';
    const os_version = DeviceInfo.getSystemVersion();
    const recaptchaToken = '';
    const application = true;
    const app_id = '';
    const device_platform = Platform.OS;
    const device_id = DeviceInfo.getDeviceId();
    const device_token = '';
    const device_model = DeviceInfo.getModel();
    const screen_height = DEVICE_HEIGHT;
    const screen_width = DEVICE_WIDTH;
    let device_type = DeviceInfo.getDeviceType();
    let app_version = version;

    // const deviceName = await DeviceInfo.getDeviceName();
    // const isEmulator = await DeviceInfo.isEmulator();
    // const buildId = await DeviceInfo.getBuildId();
    // const appVersion = DeviceInfo.getVersion();
    // const deviceUserAgent = await DeviceInfo.getUserAgent();
    // const bundleId = DeviceInfo.getBundleId();
    // const deviceType = DeviceInfo.getDeviceType();

    const DeviceData = {
        browser_version,os_version,recaptchaToken,application,app_id,
        device_platform,device_id,device_token,device_model,screen_height,
        screen_width,device_type,app_version
    };
    return DeviceData;
};

export const isIOS = Platform.OS === 'ios';