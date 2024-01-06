/**
 * Create By @name Sukumar_Abhijeet
 */

import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Text,
  FlatList,
  View,
  RefreshControl,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import Card from "./WhatsNewCard";
import { connect } from "react-redux";
import * as homeActions from "@Redux/actions/homeActions";
import * as moreActions from "@Redux/actions/moreActions";
import Filters from "./filters";
import ScreenLoader from "../../../../../../@GlobalComponents/ScreenLoader";
import { moderateScale } from "react-native-size-matters";
import Config from "@Config/default";
import { TabsFormData } from "../..";
import FallBackUI from "../../../../../../@GlobalComponents/FallBackUI";
import ErrorBoundary from "react-native-error-boundary";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import AllContestsList from "../Featured/Contests/AllContestsList";
import EachArtist from "../Featured/Artists/EachArtist";
import HorizontalSlider from "@GlobalComponents/HorizontalSlider";
import FormHeader from "@GlobalComponents/FormHeader";
import {
  getWinnerList,
  TrendingDayList,
} from "../../../../../../@Endpoints/Core/Tabs/Home";
import useUserData from "../../../../../../@Hooks/useUser";
import SpotLight from "./Spotlight";
import { getUserDetailsNew } from "../../../../../../@Endpoints/Auth";
import MyAdView from "../../../../../@Common/AdView";
const {
  COLOR: { SUBNAME },
  NEW_IMG_BASE,
} = Config;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const WhatsNew = ({ yAxisAnimatedValue, filterType, ...props }: any) => {
  const {
    fetchWhatsNewFeed,
    whatsNewFeed,
    votesofday,
    fetchManagedAds,
    managedAds,
    featuredFeeds,
    apiCalled,
    updateFeed,
    appliedFilters,
    fetchMessageCenterMessages,
    fetchInAppNotifications,
  } = props;

  const [refreshing, setRefreshing] = useState(false);
  const [contestAvailable, setContestAvailable] = useState(false);
  const [fromLimit, setFromLimit] = useState(0);
  const [winnersList, setWinnersList] = useState([]);
  const [trendingList, setTrendingList] = useState([]);
  const [subscription, setSubscription] = useState();
  const winnerContestListRef = useRef(0);
  const { UserProfileData } = useUserData();

  var counter = 0
  useEffect(() => {
    if(UserProfileData?.subscription_plan == "spenowr_basic"){
      fetchManagedAds();
      setSubscription(UserProfileData?.subscription_plan);
    }
    fetchMessageCenterMessages();
    fetchInAppNotifications();
    callApi(fromLimit);
    callWinnerListApi();
    TrendingOfTheDay();
  }, []);
  
  const callWinnerListApi = () => {
    getWinnerList(fromLimit)
      .then((res) => {
        const {
          data: { contest_winners = [], winnerContestList },
        } = res;
        setWinnersList(contest_winners);
        winnerContestListRef.current = winnerContestList;
      })
      .catch();
  };

  const callApi = (length = 0) => {   
    const apiData = TabsFormData(
      appliedFilters,
      length,
      UserProfileData?.user_id ?? ""
    );
    console.log('apiData : ', JSON.stringify(apiData));
    fetchWhatsNewFeed(apiData, length);
  };

  const TrendingOfTheDay = () => {
    TrendingDayList()
      .then((response) => {
        const {
          data: { voteofday = [] },
        } = response;
        setTrendingList(voteofday);
      })
      .catch((error) => console.log("TrendingDayList Error : ", error));
  };

  const onRefresh = () => {
    setRefreshing(true);
    updateFeed("whatsnew");
    callApi(0);
    TrendingOfTheDay();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const renderWhatsNewCards = (index, item) => {
    
    return (
      <ErrorBoundary FallbackComponent={FallBackUI} key={index}>
        {(index != 0 && (index) % 5 == 0 && subscription == "spenowr_basic" && (
          <>
            {/* <MyAdView
              obj={managedAds}
              type={managedAds?.type}
              key={index}
              buttonTitle={managedAds?.button_text}
              link={managedAds?.button_link}
              imagePath={managedAds?.image}
            /> */}
            <Card
              info={item}
              key={index}
              refresh={onRefresh}
              isVoted={votesofday}
            />
          </>
        )) || (
          <Card
            info={item}
            key={index}
            refresh={onRefresh}
            isVoted={votesofday}
          />
        )}
      </ErrorBoundary>
    );
  };

  const renderListHeader = () => {
    return (
      <>
        <View style={{ marginBottom: contestAvailable ? 0 : 8 }}>
          <SpotLight announcements={featuredFeeds?.AnnouncementData ?? []} />
        </View>
        <View style={{ marginBottom: contestAvailable ? 0 : 8 }}>
          <SpotLight Stories={trendingList ?? []} />
        </View>
        {winnersList.length && winnerContestListRef.current ? (
          <View style={{ marginBottom: contestAvailable ? 0 : 8 }}>
            <FormHeader
              containerStyle={{ marginVertical: 8 }}
              headerText={"CONTEST WINNERS"}
            />
            <HorizontalSlider>
              {winnersList.map((item, index) => {
                item.slug_url = item.artist_slug_url;
                item.module_image_path = item.image_path;
                item.module_title = item.institute_name;
                return <EachArtist artist={item} key={index} />;
              })}
            </HorizontalSlider>
          </View>
        ) : null}
        <AllContestsList extraFunc={setContestAvailable} />
      </>
    );
  };

  const scrollHandler = useAnimatedScrollHandler((event) => {
    // yAxisAnimatedValue.value = event.contentOffset.y;
  });

  if (whatsNewFeed.length)
    return (
      <View style={{ marginTop: moderateScale(5),flex:1 }}>
        <AnimatedFlatList
          ListFooterComponent={()=><ActivityIndicator color={'red'} />}
          contentContainerStyle={{
            paddingTop: moderateScale(contestAvailable ? 0 : 8),
          }}
          data={whatsNewFeed}
          ListHeaderComponent={renderListHeader}
          horizontal={false}
          initialNumToRender={5}
          keyExtractor={(item) => item.id.toString()}
          bounces={false}
          onEndReached={()=>{
            if (!apiCalled) {
              callApi(fromLimit + 10);
              setFromLimit(fromLimit + 10);
            }
          }}
          onEndReachedThreshold={0.3} 
          onScroll={scrollHandler}
          refreshControl={
            <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            title="Refreshing .."
            titleColor={"#000"}
            />
          }
          renderItem={({ item, index }) => renderWhatsNewCards(index, item)}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          legacyImplementation={true}
          windowSize={30}
        />
        <Filters type={"whatsnew"} filterwith={filterType}/>
      </View>
    );
  if (!whatsNewFeed.length && apiCalled)
    return <ScreenLoader text={"Loading data.."} />;

  if (!whatsNewFeed.length && !apiCalled)
    return (
      <>
        <Text
          style={{
            alignSelf: "center",
            marginTop: moderateScale(50),
            color: SUBNAME,
          }}
        >
          {" "}
          No Feed Found !!
        </Text>
        <Filters type={"whatsnew"} />
      </>
    );
};

WhatsNew.propTypes = {
  fetchManagedAds: PropTypes.func.isRequired,
  appliedFilters: PropTypes.object.isRequired,
  fetchWhatsNewFeed: PropTypes.func.isRequired,
  updateFeed: PropTypes.func.isRequired,
  whatsNewFeed: PropTypes.array.isRequired,
  votesofday: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    managedAds: state.home.managedAds,
    whatsNewFeed: state.home.whatsNewFeed,
    votesofday: state.home.votesofday,
    apiCalled: state.home.apiCalled,
    appliedFilters: state.home.filters,
    featuredFeeds: state.home.featuredFeeds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchManagedAds: () => dispatch(homeActions.fetchManagedAds()),
    fetchWhatsNewFeed: (data, length) =>
      dispatch(homeActions.fetchWhatsNewFeed(data, length)),
    updateFeed: (data) => dispatch(homeActions.updateFeed(data)),
    fetchMessageCenterMessages: () =>
      dispatch(moreActions.fetchMessageCenterMessages()),
    fetchInAppNotifications: (skip) =>
      dispatch(homeActions.fetchInAppNotifications(skip)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WhatsNew);
