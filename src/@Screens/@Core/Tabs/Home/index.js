/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  BackHandler,
  Modal,
  View,
  Image,
} from "react-native";
import { connect } from "react-redux";
import DefaultHeader from "../../../../@GlobalComponents/DefaultHeader";
import NoInternet from "../../../../@GlobalComponents/NoInternet";
import WhatsNew from "./Tabs/WhatsNew";
import { moderateScale } from "react-native-size-matters";
import Config from "@Config/default";
import Featured from "./Tabs/Featured";
import { GlobalStyles } from "../../../../@GlobalStyles";
import * as ProfileDataActions from "@Redux/actions/profileActions";
import Stories from "./Stories";
import * as homeActions from "@Redux/actions/homeActions";
import * as shopActions from "@Redux/actions/shopActions";
import MyFollowings from "./Tabs/MyFollowings";
import BySpenowr from "./Tabs/BySpenowr";
import ShopSale from "./Tabs/Sale";
import Projects from "./Tabs/ProjectList";
import FallBackUI from "../../../../@GlobalComponents/FallBackUI";
import ErrorBoundary from "react-native-error-boundary";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import * as moreActions from "@Redux/actions/moreActions";
import { withNavigationFocus } from "@react-navigation/compat";
import TrackPlayer from "react-native-track-player";
// import { InterstitialAd, TestIds, AdEventType} from '@react-native-firebase/admob';
import { InterstitialAd, AdEventType, TestIds, useInterstitialAd } from 'react-native-google-mobile-ads';
import useUserData from "../../../../@Hooks/useUser";

import methods from "../../../../constants/methods";
import { ForceUpdate } from "../../../../@Utils/helperFiles/helpers";
const MARGIN_TOP = moderateScale(135);
const {
  COLOR: { APP_PINK_COLOR, DARKGRAY, LIGHTGREY, WHITE },
  NEW_IMG_BASE,
  INTERSTITIALID,
} = Config;
const tabs = [
  { name: "Whats New", value: "whats_new" },
  { name: "For Sale", value: "sale" },
  { name: "Open Projects", value: "project_list" },
  { name: "Featured", value: "featured" },
  { name: "My Followings", value: "followings" },
  { name: "By Spenowr", value: "spenowr" },
];
const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
  // keywords: ['fashion', 'clothing'],
});
const HomeScreen = ({ ...props }: any) => {
  const {
    isInternetAvailable,
    fetchWhatsNewFeed,
    fetchArtistAwards,
    fetchArtistArtwoks,
    fetchArtistWritings,
    fetchArtistProducts,
    fetchArtistServices,
    fetchFeaturedFeed,
    fetchContestData,
    fetchUserStories,
    fetchInAppNotifications,
    fetchCartDetails,
    fetchShippingAddressList,
    fetchArtistWorkExperience,
    votesofday,
    route,
    navigation,
  } = props;
  const { params } = route
  const requestOptions = {};
  const yAxisAnimatedValue = useSharedValue(0);
  const setTab = params?.setTab || "whats_new";
  const [selectedTab, setSelectedTab] = useState(setTab);
  const [isVisible, setVisible] = useState(true);
  const [date, setDate] = useState("");
  const { UserProfileData } = useUserData();
  const { isLoaded, isClosed, load, show } = useInterstitialAd(INTERSTITIALID, requestOptions)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      setSelectedTab(params?.setTab || "whats_new")
      ForceUpdate()
    });
    return unsubscribe;
  }, [navigation]);
  
  useEffect(() => {
    fetchFeaturedFeed();
    updateProfileDetails();
    fetchContestData();
    fetchUserStories();
    fetchInAppNotifications();
    fetchCartDetails();
    fetchShippingAddressList();
    setUpPlayer();
    fetchWhatsNewFeed();
    getDate();
    // if (UserProfileData?.subscription_plan == "spenowr_basic")
      // showInterstitialAd();
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  }, []);

  
  




  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
  //     // Start loading the interstitial straight away
  //     if (UserProfileData?.subscription_plan == "spenowr_basic") {
  //       console.log('=> interstitialAd Ad loaded');
  //       interstitial.load();
  //     }
  //   },AdEventType.ERROR, () => {
  //       console.log('=> interstitialAd Ad loadING ERROR ');
  //   });

  //   // Unsubscribe from events on unmount
  //   return unsubscribe;
  // }, []);

  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };
  const getDate = async () => {
    methods
      .getVoteDate()
      .then((res) => {
        setDate(res);
      })
      .catch((error) => {
        console.log("Date Error: ", JSON.stringify(error));
      });
  };
  const setUpPlayer = async () => {
    await TrackPlayer.setupPlayer();
  };
  const updateProfileDetails = () => {
    fetchArtistAwards();
    fetchArtistArtwoks();
    fetchArtistWritings();
    fetchArtistProducts();
    fetchArtistServices();
    fetchContestData();
    fetchArtistWorkExperience();
  };

  const showInterstitialAd = async () => {
    // // Create a new instance
    // const interstitialAd = InterstitialAd.createForAdRequest(INTERSTITIALID);

    // // Add event handlers
    // interstitialAd.onAdEvent((type, error) => {
    //   if (type === AdEventType.LOADED) {
    //     interstitialAd.show();
    //   }
    // });

    // // Load a new advert 
    // interstitialAd.load();
    console.log('=> interstitialAd Ad showInterstitialAd');

    interstitial.addAdEventsListener(({ type, payload })  => {
      console.log('=> interstitialAd Ad addAdEventsListener');
      if(type === AdEventType.LOADED) {
        // Preload an app open ad
        console.log('=> interstitialAd Ad loaded');
        interstitial.load();
      }

      if(type === AdEventType.ERROR) {
        console.log('=> interstitialAd Ad loading error : ', JSON.stringify(payload));
      }

    });

    // Show the app open ad when user brings the app to the foreground.
    await interstitial.show();
  };

  const InitialVotingPopUp = ({ visible }) => {
    const makeUpdateDate = async () => {
      if (date != new Date().toLocaleDateString()) {
        methods.setVoteDate();
      } else {
        console.log("=> Date matched <=");
      }
    };

    return (
      <Modal
        backdropColor={"#00000080"}
        dismissable={true}
        hasBackdrop={true}
        animationType="fade"
        transparent={true}
        isVisible={visible}
        style={{ justifyContent: "center", alignItems: "center" }}
        useNativeDriver={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000080",
          }}
        >
          <Image
            source={{ uri: NEW_IMG_BASE + "/images/theme/default/newVote.jpg" }}
            style={{ height: "30%", width: "90%", borderRadius: 5 }}
            resizeMode="stretch"
          />
          <TouchableOpacity
            onPress={() => {
              setVisible(false), makeUpdateDate();
            }}
            style={{
              width: 100,
              height: 40,
              borderWidth: 1,
              borderColor: "#FFF",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#FFF" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  const renderEachTab = (tab, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => setSelectedTab(tab.value)}
        style={{
          paddingHorizontal: moderateScale(12),
          paddingVertical: moderateScale(9),
          borderBottomWidth: tab.value === selectedTab ? 1.5 : 0,
          borderBottomColor: APP_PINK_COLOR,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: moderateScale(12),
            color: tab.value === selectedTab ? APP_PINK_COLOR : DARKGRAY,
          }}
        >
          {tab.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const animatedMargin = interpolate(
    yAxisAnimatedValue.value,
    [0, MARGIN_TOP],
    [MARGIN_TOP, MARGIN_TOP / 2 - 20],
    { extrapolateTop: Extrapolation.CLAMP }
  );

  const animatedMarginTop = interpolate(
    yAxisAnimatedValue.value,
    [0, MARGIN_TOP],
    [10, 0],
    { extrapolateTop: Extrapolation.CLAMP }
  );

  const animatedContainerMargin = interpolate(
    yAxisAnimatedValue.value,
    [0, MARGIN_TOP],
    [MARGIN_TOP - 10, MARGIN_TOP / 2 - 35],
    { extrapolateTop: Extrapolation.CLAMP }
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: animatedMargin,
      marginTop: animatedMarginTop,
    };
  });

  const animatedContainerStyles = useAnimatedStyle(() => {
    return {
      paddingTop: animatedContainerMargin,
    };
  });

  const renderSelectedTabData = () => {
    switch (selectedTab) {
      case "whats_new":
        return <WhatsNew yAxisAnimatedValue={yAxisAnimatedValue} filterType={params?.filter}/>;
      case "sale":
        return <ShopSale yAxisAnimatedValue={yAxisAnimatedValue} />;
      case "project_list":
        return <Projects yAxisAnimatedValue={yAxisAnimatedValue} />;
      case "followings":
        return <MyFollowings yAxisAnimatedValue={yAxisAnimatedValue} />;
      case "spenowr":
        return <BySpenowr yAxisAnimatedValue={yAxisAnimatedValue} />;
      case "featured":
        return <Featured yAxisAnimatedValue={yAxisAnimatedValue} />;
    }
  };

  if (!isInternetAvailable) return <NoInternet />;
  return (
    <SafeAreaView
      style={[GlobalStyles.GlobalContainer, { backgroundColor: LIGHTGREY }]}
    >
      {isVisible &&
        votesofday == "0" &&
        date != new Date().toLocaleDateString() && (
          <InitialVotingPopUp visible={!isVisible} />
        )}
      <DefaultHeader headerText={"Home"} showBackButton={false} showUpgrade />

      <ErrorBoundary FallbackComponent={FallBackUI}>
        <Stories yAxisAnimatedValue={yAxisAnimatedValue} />
      </ErrorBoundary>

      <Animated.View
        style={[
          {
            zIndex: 1,
            position: "absolute",
            backgroundColor: WHITE,
          },
          animatedStyles,
        ]}
      >
        <ScrollView
          contentContainerStyle={{
            paddingLeft: moderateScale(10),
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {tabs.map((item, index) => renderEachTab(item, index))}
        </ScrollView>
      </Animated.View>
      <Animated.View style={[{ flex: 1 }, animatedContainerStyles]}>
        {renderSelectedTabData()}
      </Animated.View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    isInternetAvailable: state.InternetConnectivity.isConnected,
    votesofday: state.home.votesofday,
  };
};
const mapDispatchToProp = (dispatch) => ({
  fetchWhatsNewFeed: (data, length) =>
    dispatch(homeActions.fetchWhatsNewFeed(data, length)),
  fetchArtistAwards: () => dispatch(ProfileDataActions.fetchArtistAwards()),
  fetchArtistArtwoks: () => dispatch(ProfileDataActions.fetchArtistArtwoks()),
  fetchArtistWritings: () => dispatch(ProfileDataActions.fetchArtistWritings()),
  fetchArtistProducts: () => dispatch(ProfileDataActions.fetchArtistProducts()),
  fetchArtistServices: () => dispatch(ProfileDataActions.fetchArtistServices()),
  fetchArtistWorkExperience: () =>
    dispatch(ProfileDataActions.fetchArtistWorkExperience()),
  fetchFeaturedFeed: () => dispatch(homeActions.fetchFeaturedFeed()),
  fetchContestData: () => dispatch(homeActions.fetchContestData()),
  fetchUserStories: (skip) => dispatch(homeActions.fetchUserStories(skip)),
  fetchInAppNotifications: (skip) =>
    dispatch(homeActions.fetchInAppNotifications(skip)),
  fetchCartDetails: () => dispatch(shopActions.fetchCartDetails()),
  fetchShippingAddressList: () =>
    dispatch(moreActions.fetchShippingAddressList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(withNavigationFocus(HomeScreen));

export const TabsFormData = (
  appliedFilters,
  length,
  user_id = "",
  feed_type = "",
  follow = false
) => {
  let formData = new FormData();
  const { searchText, appliedModules } = appliedFilters;
  const selectedModules = appliedModules
    ? appliedModules.filter((x) => x.selected === true)
    : [];
  if (selectedModules.length) {
    const values = selectedModules.map((x) => x.value);
    formData.append("feed_type", values.toString());
  } else formData.append("feed_type", feed_type);

  formData.append("query", searchText);
  formData.append("page", "FIRST");
  formData.append("sort", "name");
  formData.append("offset", 0);
  formData.append("pageRange", 10);
  formData.append("category", "");
  formData.append("limit_from", length);
  formData.append("limit_to", 10 + length);
  formData.append("user_id", user_id);
  formData.append("follow", follow);
  return formData;
};
