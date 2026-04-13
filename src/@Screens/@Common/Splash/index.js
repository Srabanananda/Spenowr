/**
 * Create By @name Sukumar_Abhijeet
 */

import React, { useEffect } from "react";
import { View, Image, PermissionsAndroid, Platform } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isObjectEmpty } from "../../../@Utils/helperFiles/isObjectEmpty";
import { setAxiosConfig } from "../../../@Utils/axiosFiles/Interceptor";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-simple-toast";
import messaging from "@react-native-firebase/messaging";
import { version, iOSVersion } from "../../../../package.json";
import { checkAppForceUpgrade } from "../../../@Endpoints/Auth";
import * as internetActions from "../../../@Redux/actions/internetActions";
import * as userActions from "@Redux/actions/userActions";
import * as moreActions from "@Redux/actions/moreActions";
import PushNotificationsConfigure from "../../../@Utils/PushNotifications";
import { ForceUpdate } from "../../../@Utils/helperFiles/helpers";
import Config from "@Config/default";

const { VERSION_CHECK } = Config;

console.log('VERSION_CHECK splash.js',VERSION_CHECK)

const SplashScreen = ({ ...props }) => {
  const {
    userObj,
    navigation,
    updateInternetConnectivity,
    route: {
      params: { logout },
    },
    resetUser,
    updateAppUpgradeInfo,
    showIntroScreen,
    fetchSubscriptionPlans,
  } = props;

  const { user } = userObj;

  PushNotificationsConfigure(navigation, isObjectEmpty(user));

  useEffect(() => {
    if (VERSION_CHECK !== "2") {
        ForceUpdate();
    }
  }, [VERSION_CHECK]);

  useEffect(() => {
    if (logout) {
      resetUser();
      navigation.replace("Login");
    } else requestFirebaseMessagingPermission();
  }, []);

  useEffect(() => {
    backgroundUpdates();
  }, []);

  const backgroundUpdates = () => {
    fetchSubscriptionPlans();
  };

  const isUserLoggedIn = () => {
    if (isObjectEmpty(user))
      navigation.replace(showIntroScreen ? "AppIntro" : "Landing");
    else navigation.replace(showIntroScreen ? "AppIntro" : "Landing");
    // else checkForceUpgrade();
  };

  const checkForceUpgrade = () => {
    const { institute_id = "" } = userObj.user;
    console.log('institute_id, version',institute_id, version, Platform.OS)
    const platformVersion = Platform.OS === 'ios' ? iOSVersion : version;

    checkAppForceUpgrade(institute_id, `v${platformVersion}`, Platform.OS)
      .then((res) => {
        console.log('check app upgrade response 68',res);
        const {
          data: { isForceUpgradable = 0, redirectUrl = "" },
          data,
        } = res;
        console.log('check app upgrade response 75',res);
        updateAppUpgradeInfo(data);
        if (isForceUpgradable)
          navigation.replace("ForceUpgrade", { redirectUrl: redirectUrl });
        else checkNavigation();
      })
      .catch(() => {
        const data = { isForceUpgradable: 0, isLatest: 1 };
        updateAppUpgradeInfo(data);
        checkNavigation();
      });
  };

  const checkNavigation = () => {
    const { token } = userObj;
    setAxiosConfig(token, true, navigation);
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "CoreTabs" }],
      });
    }, 200);
  };

  const extractDeviceInfo = async () => {
    if (Platform.OS === "android") checkStoragePermissions1();
    else isUserLoggedIn();
  };

  const isNotificationPermissionEnabled = async () => {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  const requestFirebaseMessagingPermission = async () => {
    if (isNotificationPermissionEnabled()) {
      checkInternet();
    } else {
      if (isNotificationPermissionEnabled()) checkInternet();
      Toast.show("Please allow the permission to use the app", Toast.LONG);
    }
  };

  const checkStoragePermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        // PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        // PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        // PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        // PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      const granted2 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      const granted3 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        // PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
      );
      if (
        granted === "granted" &&
        granted2 === "granted" &&
        granted3 === "granted"
      ) {
        isUserLoggedIn();
      } else {
        Toast.show("Please allow the permissions", Toast.LONG);
      }
    } catch (err) {
      Toast.show("Please allow the permissions", Toast.LONG);
    }
  };
  const checkStoragePermissions1 = async () => {
    const res = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    ]);
    console.log({ res });
    if (
      (
        res["android.permission.READ_MEDIA_AUDIO"] === "granted" &&
        res["android.permission.CAMERA"] === "granted") ||
      (res["android.permission.WRITE_EXTERNAL_STORAGE"] === "granted" &&
        res["android.permission.READ_EXTERNAL_STORAGE"] === "granted" &&
        res["android.permission.CAMERA"] === "granted")
    ) {
      isUserLoggedIn();
    } else {
      Toast.show("Please allow the permissions", Toast.LONG);
    }
  };
  const checkInternet = () => {
    NetInfo.addEventListener((connectionInfo) => {
      if (connectionInfo.isInternetReachable) {
        const { type } = connectionInfo;
        if (type === "none" || type === "unknown")
          updateInternetConnectivity(false);
        else updateInternetConnectivity(true);
      } else updateInternetConnectivity(false);
    });
    extractDeviceInfo();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Image
        resizeMode={"contain"}
        source={require("@Assets/images/SpenowrLogoIcon.png")}
        style={{ width: 100, height: 100 }}
      />

      <View style={{ margin: 10 }}>
        <Image
          resizeMode={"contain"}
          source={require("@Assets/images/SpenowrTextIcon.png")}
          style={{ width: 150, height: 100 }}
        ></Image>
      </View>
    </View>
  );
};

SplashScreen.propTypes = {
  fetchSubscriptionPlans: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  resetUser: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  showIntroScreen: PropTypes.bool.isRequired,
  updateAppUpgradeInfo: PropTypes.func.isRequired,
  updateInternetConnectivity: PropTypes.func.isRequired,
  userObj: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userObj: state.userObj,
    showIntroScreen: state.appData.showIntroScreen,
  };
};

const mapDispatchToProp = (dispatch) => ({
  updateInternetConnectivity: (connectivity) =>
    dispatch(internetActions.updateInternetConnectivity(connectivity)),
  updateAppUpgradeInfo: (upgrades) =>
    dispatch(moreActions.updateAppUpgradeInfo(upgrades)),
  resetUser: () => dispatch(userActions.resetUser()),
  fetchSubscriptionPlans: () => dispatch(moreActions.fetchSubscriptionPlans()),
});

export default connect(mapStateToProps, mapDispatchToProp)(SplashScreen);
