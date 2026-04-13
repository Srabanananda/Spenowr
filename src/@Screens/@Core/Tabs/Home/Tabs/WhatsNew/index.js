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
import CrossIcon from 'react-native-vector-icons/Feather';
import { HOME_FILTERS } from "../../../../../../assets/JsonFiles/HomeFilters";
const {
  COLOR: { SUBNAME },
  NEW_IMG_BASE,
} = Config;
const _ = require("lodash");
let FILTER_MOCK = _.cloneDeep(HOME_FILTERS);

const WhatsNew = ({ filterType, ...props }: any) => {
  const {
    fetchWhatsNewFeed,
    whatsNewFeed,
    votesofday,
    fetchManagedAds,
    managedAds,
    updateFilters,
    featuredFeeds,
    apiCalled,
    updateFeed,
    appliedFilters,
    fetchMessageCenterMessages,
    fetchInAppNotifications,
  } = props;

  // console.log('whatsNewFeed',whatsNewFeed[0]);

  const [refreshing, setRefreshing] = useState(false);
  const [contestAvailable, setContestAvailable] = useState(false);
  const [fromLimit, setFromLimit] = useState(0);
  const [winnersList, setWinnersList] = useState([]);
  const [trendingList, setTrendingList] = useState([]);
  const [subscription, setSubscription] = useState();
  const [isActive, setIsActive] = useState(false);
  const winnerContestListRef = useRef(0);
  const [filterTypeData, setFilterTypeData] = useState([])
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

  // useEffect(() => {
   
  //   filterFunc()
  // }, [whatsNewFeed])

//   const filterFunc=()=>{

//     let tempArr=[]
//     if(whatsNewFeed.length>0){
//       whatsNewFeed.filter((item,index)=>{
       
// tempArr.push(item.feed_type.toLowerCase())

// let filteredArr=removeDuplicates(tempArr)
// setTypeData(filteredArr)
//       })

//     }
//   }
//   function removeDuplicates(arr) {
//     return arr.filter((item,
//       index) => arr.indexOf(item) === index);
// }
  // console.log('typeData',typeData);
  console.log('filterTypeData',filterTypeData);

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

  const renderPages = ({ index,item }) =>{
    return (
        <>
            {index != 0 && (index) % 5 == 0 && subscription == "spenowr_basic" && 
                <>
                    <MyAdView
                        type={managedAds?.type}
                        key={`ad-${index}`}
                        buttonTitle={managedAds?.button_text}
                        link={managedAds?.button_link}
                        imagePath={managedAds?.image}
                    />
                    <Card info={item} key={`card-${item.id}`} />
                </>
            || 
            <Card info={item} key={`card-${item.id}`}  refresh={onRefresh}
            isVoted={votesofday} />}
        </>
    );
};

  const renderWhatsNewCards = (index, item) => {

   
    
    return (
      <ErrorBoundary FallbackComponent={FallBackUI} key={index}>
        {(index != 0 && (index) % 5 == 0 && subscription == "spenowr_basic" && (
          <>
            
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
        <View style={{ marginBottom: contestAvailable ? 0 : 3 }}>
          <SpotLight announcements={featuredFeeds?.AnnouncementData ?? []} />
        </View>
        <View style={{ marginBottom: contestAvailable ? 0 : 3 }}>
          <SpotLight Stories={trendingList ?? []} />
        </View>
        {winnersList.length && winnerContestListRef.current ? (
          <View style={{ marginBottom: contestAvailable ? 0 : 3 }}>
            <FormHeader
              containerStyle={{ marginVertical: 8 }}
              headerText={"CONTEST WINNERS"}
            />
            <HorizontalSlider>
              {winnersList.map((item, index) => {
                item.slug_url = item.artist_slug_url;
                item.module_image_path = item.image_path;
                item.module_title = item.institute_name;
                return <EachArtist artist={item} key={`artist-${item.id}`} />;
              })}
            </HorizontalSlider>
          </View>
        ) : null}
        <AllContestsList extraFunc={setContestAvailable} />
      </>
    );
  };

  const selectedFilterTypes = useMemo(() => {
    return filterTypeData.filter(item => item.selected);
  }, [filterTypeData]);

  const setSelected = (each) => {
    const obj = (each.selected = !each.selected);
    const tempArr = [...filterTypeData];
    const index = tempArr.findIndex((x) => x.value === each.value);
    tempArr[index] === obj;
    setFilterTypeData(tempArr);
    let arr = tempArr.filter((x) => x.selected == true)
    console.log('tempArr',tempArr);
    console.log('arr.length check',arr);
    if (arr.length == 0) {
      clearFilters(); // Call clearFilters if length is 0
    } else {
      applyFilters(); // Otherwise, apply the selected filters
    }
  };

  const clearFilters = () => {
    setIsActive(false);
    updateFeed("whatsnew");
    setIsActive(false);
    const filterData = {
      searchText: "",
      appliedModules: FILTER_MOCK,
    };
    console.log("filterData clear => ", JSON.stringify(filterData));
    updateFilters(filterData);
    let formData = new FormData();
    formData.append("query", "");
    formData.append("feed_type", "");
    formData.append("page", "FIRST");
    formData.append("sort", "name");
    formData.append("offset", 0);
    formData.append("pageRange", 25);
    formData.append("category", "");
    formData.append("limit_from", 0);
    formData.append("limit_to", 20);
    formData.append("user_id", "");
    formData.append("tag", "");
    fetchWhatsNewFeed(formData);
  };

  const applyFilters = () => {
    const selectedModules = filterTypeData.filter((x) => x.selected === true);

    if (selectedModules.length) {
      const values = selectedModules.map((x) => x.value);
      updateFeed("whatsnew");
    setIsActive(false);
      const filterData = {
        searchText: '',
        appliedModules: filterTypeData,
      };
      console.log("filterData => ", JSON.stringify(filterData));
      updateFilters(filterData);
      // updateFilters(filterData);
      const apiData = TabsFormData(
        filterData,
        0,
        ''
      );
      apiData.append("feed_type", values.toString());
      console.log('values.toString()',values.toString());

       fetchWhatsNewFeed(apiData);
    } 
  };

  if (whatsNewFeed.length)
    return (

      <View style={{ marginTop: moderateScale(5), flex: 1, minHeight: 0 }}>
        <View
        style={{flexDirection:'row', maxWidth: '100%' , flexWrap: 'wrap', marginTop:0, marginBottom:2}}>
        {selectedFilterTypes.map((filterItem, index) => (
          <TouchableOpacity key={`filter-${filterItem.value}`} style={{backgroundColor:'#EF2D56', padding:5, marginLeft:7, borderRadius:5, marginTop:10, flexDirection:'row', alignItems:'center'}} onPress={() => {setSelected(filterItem)}}>
             
          <Text style={{color:'#fff', fontSize:12, fontWeight:'bold'}} >{filterItem.name}</Text>
          <CrossIcon style={{marginLeft:10}} name="x-circle" size={18} color="#fff" />
          </TouchableOpacity>
        ))}
        </View>
        <FlatList
          ListFooterComponent={()=><ActivityIndicator color={'red'} />}
          contentContainerStyle={{
            paddingTop: moderateScale(contestAvailable ? 0 : 8),
            flexGrow: 1,
            paddingBottom: moderateScale(8),
          }}
          data={whatsNewFeed}
          ListHeaderComponent={renderListHeader}
          horizontal={false}
          initialNumToRender={5}
          removeClippedSubviews
          keyExtractor={(item) => item.id.toString()}
          onEndReached={()=>{
            if (!apiCalled) {
              callApi(fromLimit + 10);
              setFromLimit(fromLimit + 10);
            }
          }}
          onEndReachedThreshold={0.3} 
          refreshControl={
            <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            title="Refreshing .."
            titleColor={"#000"}
            />
          }
          renderItem = {renderPages} 
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
       <Filters type={"whatsnew"} setFilterTypeData={setFilterTypeData} filterwith={filterType}/>
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
        <Filters type={"whatsnew"} setFilterTypeData={setFilterTypeData} />
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
  updateFilters: PropTypes.func.isRequired,
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
    updateFilters: (data) => dispatch(homeActions.updateFilters(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WhatsNew);
