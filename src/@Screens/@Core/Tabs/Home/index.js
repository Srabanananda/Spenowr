import React, { useState, useEffect,useRef } from "react";
import { TouchableOpacity, Text, ScrollView, BackHandler, Modal, View, Image, Dimensions, ImageBackground, Platform, ActivityIndicator, StyleSheet } from "react-native";
import { connect } from "react-redux";
import DefaultHeader from "../../../../@GlobalComponents/DefaultHeader";
import NoInternet from "../../../../@GlobalComponents/NoInternet";
import WhatsNew from "./Tabs/WhatsNew";
import { moderateScale } from "react-native-size-matters";
import Config from "@Config/default";
import QUOTES from '@Assets/JsonFiles/Quotes/quotes.js';
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
import * as moreActions from "@Redux/actions/moreActions";
import { SafeAreaView } from "react-native-safe-area-context";
// import { InterstitialAd, TestIds, AdEventType} from '@react-native-firebase/admob';
import { InterstitialAd, AdEventType, TestIds, useInterstitialAd } from 'react-native-google-mobile-ads';
import useUserData from "../../../../@Hooks/useUser";
import axios from 'axios';
import methods from "../../../../constants/methods";
import { ForceUpdate } from "../../../../@Utils/helperFiles/helpers";
// import Slider from "./NewModal/NewModal";
import SimpleToast from 'react-native-simple-toast';
import { getAllStoriessListAndData, makeVote, submitVoteApi } from "../../../../@Endpoints/Core/Tabs/Home";
import AntDesign from 'react-native-vector-icons/AntDesign';
import InstaStory from 'react-native-insta-story';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { getWhatsNewFeed } from "../../../../@Endpoints/Core/Tabs/WhatsNew";
import Toast from 'react-native-simple-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get('window');  // Get the device's screen width
const avatarSize = width * 0.15;  // Set avatarSize to 15% of the screen width (adjust the percentage as needed)

const SwipeUpComponent = ({ onPress, swipeText }) => (
  <TouchableOpacity activeOpacity={0.7} style={{ position: 'absolute', right: 0, left: 0, alignItems: 'center', 
      bottom: Platform.OS == 'ios' ? 20 : 60,}} 
      onPress={onPress}
  >
    <Text style={{color: '#fff',fontSize: 18, textAlign:'center', fontWeight:'bold', width:'95%'}}>{swipeText}</Text>
    <Text style={{color:'#EF2D56', fontSize:13, textDecorationLine:'underline'}}>Click Here For Details</Text>
  </TouchableOpacity>
);

const MARGIN_TOP = moderateScale(135);
const {
  VERSION_CHECK,
  COLOR: { APP_PINK_COLOR, DARKGRAY, LIGHTGREY, WHITE },
  NEW_IMG_BASE,
  INTERSTITIALID,BASE_PATH,API_VERSIONING
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

const HomeScreen = (props) => {
  const scrollViewRef = useRef();
const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const route = useRoute();
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
    appliedFilters
    
  } = props;
  const { params } = route
  const requestOptions = {};
  const {quotes} = QUOTES;
  console.log('quotes[0]',quotes[0]);
  const setTab = params?.setTab || "whats_new";
  const [selectedTab, setSelectedTab] = useState(setTab);
  const [isVisible, setVisible] = useState(false);
  const [date, setDate] = useState("");
  const [postid, setPostId] = useState("");
  const [artistid, setArtistId] = useState("");
  const [type, setType] = useState("");
  const [images, setImages] = useState([]);
  const { UserProfileData } = useUserData();
  const { isLoaded, isClosed, load, show } = useInterstitialAd(INTERSTITIALID, requestOptions)
  const [stories, setStories] = useState([]);
  const [moduleTypes, setModuleTypes] = useState([]);
  const [showStories, setShowStories] = useState(true);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [usersID, setUsersID] = useState('')
  const [latestPollId, setLatestPollId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  // useEffect(()=>{
  //   callApi()
  //     },[]);
  
  //     const callApi = (length=0) =>{
  //         const apiData =  TabsFormData(appliedFilters,length,'');
  //         getWhatsNewFeed(apiData)
  //             .then(res=>{
  //                 console.log('pollsList data',res?.data?.pollsList)
  //             })
  //             .catch()
  //             .finally(()=>{
  //                 console.log('Finally')
  //             });
  //     };

      const ArtCategoryModal = ({ visible, onClose, userId }) => {
        const [pollData, setPollData] = useState(null);
        const [hasVoted, setHasVoted] = useState(false);
        const [isReady, setIsReady] = useState(false); // Control when to show modal
        const isMounted = useRef(true); // Add a ref to track mounted state
      
        useEffect(() => {
          isMounted.current = true; 
      
          if (visible) {
            fetchPollData();
          }
      
          // Cleanup function
          return () => {
            isMounted.current = false;
          };
        }, [visible]);
      
      
        const fetchPollData = (length = 0) => {
          const apiData = TabsFormData(appliedFilters, length, '');
          getWhatsNewFeed(apiData)
            .then((res) => {
              // Only update state if component is still mounted
              if (isMounted.current) {
                console.log('res of pools', res);
                const poll = res?.data?.pollsList?.[0];
                setUsersID(res?.data?.logged_in_id);
                if (poll) {
                  setPollData({
                    id: poll.polls_id,
                    question: poll.question,
                    options: poll.options.map((opt) => ({
                      text: opt.text,
                      percentage: opt.percentage,
                    })),
                  });
                  setHasVoted(poll.login_vote_count === 1);
                }
                setIsReady(true);
              }
            })
            .catch((error) => {
              if (isMounted.current) {
                console.log("Error fetching poll data:", error);
                setIsReady(true); // Still set ready even on error
              }
            });
        };
      
        const handleVote = (selectedOption) => {
          if (hasVoted || !isMounted.current) return;
      
          const payload = {
            polls_id: pollData.id,
            selected_option: selectedOption,
            user_id: usersID,
          };
      
          console.log('payload127', payload);
      
          submitVoteApi(payload.user_id, payload.polls_id, payload.selected_option)
            .then((response) => {
              if (isMounted.current) {
                Toast.show(response?.data?.response_msg || "Vote submitted!");
                setPollData((prevData) => ({
                  ...prevData,
                  options: prevData.options.map((opt) =>
                    opt.text === selectedOption
                      ? { ...opt, percentage: opt.percentage + 1 }
                      : opt
                  ),
                }));
                setHasVoted(true);
              }
            })
            .catch((error) => {
              if (isMounted.current) {
                console.log("Error submitting vote:", error);
              }
            });
        };

        const handleClose = async () => {
          try {
            // Store both the fact that it was shown and the poll ID
            await AsyncStorage.setItem('pollModalData', JSON.stringify({
              shown: true,
              pollId: pollData?.id || latestPollId,
              hasVoted: hasVoted || (pollData?.login_vote_count === 1 || pollData?.login_vote_count === "1")
            }));
            onClose();
          } catch (error) {
            console.log('AsyncStorage error on close:', error);
            onClose();
          }
        };
      
        if (!isReady || !visible) {
          return null;
        }
      
        return (
          <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                {pollData ? (
                  <>
                    <Text style={styles.modalTitle}>{pollData.question}</Text>
                    {pollData.options.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleVote(item.text)}
                        disabled={hasVoted}
                        style={styles.optionContainer}
                      >
                        <View style={styles.option}>
                          <Text style={styles.optionText}>{item.text}</Text>
                          {hasVoted && (
                            <View style={styles.progressBarContainer}>
                              <View style={styles.progressBarBackground}>
                                <View
                                  style={[
                                    styles.progressFill,
                                    { width: `${item.percentage}%` },
                                  ]}
                                />
                              </View>
                              <Text style={styles.percentage}>
                                {item.percentage.toFixed(2)}%
                              </Text>
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </>
                ) : (
                  <Text style={styles.modalTitle}>No Poll Available</Text>
                )}
      
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <Text style={styles.closeButtonText}>CLOSE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        );
      };
      

      const checkAndShowModal = async () => {
        try {
          // Fetch the latest poll data
          const apiData = TabsFormData(appliedFilters, 0, '');
          const res = await getWhatsNewFeed(apiData);
          const poll = res?.data?.pollsList?.[0];
          const newPollId = poll?.polls_id || null;
          const voteCount = poll?.login_vote_count || 0;
          
          setLatestPollId(newPollId);
    
          if (!newPollId) return; // No poll available, don't show modal
    
          const storedData = await AsyncStorage.getItem('pollModalData');
          let shouldShowModal = true;
    
          if (storedData) {
            const { pollId, hasVoted } = JSON.parse(storedData);
            // Don't show if user has voted (vote count was 1) or if poll hasn't changed
            shouldShowModal = !hasVoted && pollId !== newPollId;
          }
    
          // Check current vote count - if 1, don't show modal
          if (voteCount === 1 || voteCount === "1") {
            // Update storage to reflect that user has voted
            await AsyncStorage.setItem('pollModalData', JSON.stringify({
              shown: true,
              pollId: newPollId,
              hasVoted: true
            }));
            shouldShowModal = false;
          }
    
          if (shouldShowModal) {
            setModalVisible(true);
          }
        } catch (error) {
          console.log('Error checking modal status:', error);
          setModalVisible(true); // Fallback to showing modal on error
        }
      };
    
      useEffect(() => {
        AsyncStorage.getAllKeys().then((allKeys) => {
          console.log('allKeysallKeys', allKeys);
          checkAndShowModal();
        });
      }, []);

  useEffect(() => {
    if (isFocused) {
      fetchStories();
      setShowStories(true); // Reset showStories when the screen is focused
    }
  }, [isFocused]);

  console.log('{params?.filter} 115',params?.filter);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        setSelectedTab(params?.setTab || "whats_new");
        // Only call ForceUpdate if VERSION_CHECK is not 2
        if (VERSION_CHECK !== "2") {
            ForceUpdate();
        }
    });
    return unsubscribe;
}, [navigation, VERSION_CHECK]); // Add VERSION_CHECK to dependencies

 
  
  useEffect(() => {
    fetchUserStories();
    fetchFeaturedFeed();
    updateProfileDetails();
    fetchInAppNotifications();
    fetchCartDetails();
    fetchShippingAddressList();
    fetchWhatsNewFeed();
    getDate();
    //getdata();
    // if (UserProfileData?.subscription_plan == "spenowr_basic")
      // showInterstitialAd();
    // BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    // return () =>
    //   BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  }, []);
  useEffect(() => {
    getdata();
  }, [currentPage]);

  const scrollToNextPage = () => {
    if (currentPage < images.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      scrollViewRef.current.scrollTo({
        x: nextPage * screenWidth,
        animated: true,
      });
    }
  };
  
  const scrollToPreviousPage = () => {
    if (currentPage > 0) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      scrollViewRef.current.scrollTo({
        x: previousPage * screenWidth,
        animated: true,
      });
    }
  };
  const truncateText = (text) => {
    const words = text.split(' ');
    if (words.length > 15) {
      return words.slice(0, 15).join(' ') + '...';
    }
    return text;
  };

  // const formatDescription = (description) => {
  //   let cleanedDescription = description.replace(/\n/g, ' ');
  //   let words = cleanedDescription.split(' ');

  //   if (words.length > 15) {
  //     cleanedDescription = words.slice(0, 20).join(' ') + '...';
  //   }
  //   return cleanedDescription;
  // };

  const formatDescription = (description) => {
    // Replace new lines with spaces
    let cleanedDescription = description.replace(/\n/g, ' ');

    // Truncate to 20 words if there are more than 15 words
    let words = cleanedDescription.split(' ');
    if (words.length > 15) {
        cleanedDescription = words.slice(0, 20).join(' ') + '...';
    }

    // Ensure ellipsis for descriptions longer than 20 characters
    if (cleanedDescription.length > 100) {
        cleanedDescription = cleanedDescription.slice(0, 100) + '...';
    }

    return cleanedDescription;
};

const formatDescriptionTitle = (description) => {
  // Replace new lines with spaces
  let cleanedDescription = description.replace(/\n/g, ' ');

  // Truncate to 20 words if there are more than 15 words
  let words = cleanedDescription.split(' ');
  if (words.length > 15) {
      cleanedDescription = words.slice(0, 20).join(' ') + '...';
  }

  // Ensure ellipsis for descriptions longer than 20 characters
  if (cleanedDescription.length > 50) {
      cleanedDescription = cleanedDescription.slice(0, 50) + '...';
  }

  return cleanedDescription;
};

const truncateTextLimit = (text, limit) => {
  if (text.length <= limit) {
      return text;
  }
  return text.substring(0, limit) + '...';
};

  console.log('pageeeee===',currentPage)
  const getdata = async () => {
    const url = `${BASE_PATH+API_VERSIONING}/feed/get-feed-current-data`;
    try {
      const response = await axios.post(url);
      setImages(response.data.data.feedcurrentday);
      console.log('response.data.data.feedcurrentday',response.data.data.feedcurrentday);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
  const updateProfileDetails = () => {
    fetchArtistAwards();
    fetchArtistArtwoks();
    fetchArtistWritings();
    fetchArtistProducts();
    fetchArtistServices();
    fetchContestData();
    fetchArtistWorkExperience();
    callGetAllStories()
  };

  const fetchStories = async (bearerToken) => {
    try {
      const response = await axios.post('https://backend.spenowr.com/feed/get-story-all-list-details', {}, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "multipart/form-data",
      },
      });

      console.log('fetchStories API Response:', response.data);
      if (response.data.status === 'success') {
        setStories(response.data.data.storyreal); // Assuming 'storyreal' contains the array of stories
        console.log('response.data.data.storyreal',response.data.data.storyreal);
        response.data.data.storyreal.forEach((story, index) => {
          console.log(`Module Type of story ${index}: ${story.module_type}`);
        });
        const moduleTypesArray = response.data.data.storyreal.map(story => story.module_type);
          setModuleTypes(moduleTypesArray);
          console.log('moduleTypesArray',moduleTypesArray);

      } else {
        // Handle API error if necessary
        console.error('fetchStories API Error:', response.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error('fetchStories API Error:', error);
      // Handle error
      setLoading(false);
    }
  };

  const handleSwipeUpPress = (item) => {
    setShowStories(false); // Hide the story component before navigating
    if (item.module_type === "product") {
      navigation.navigate('ProductDetails', { productSlug: item.story_id });
    } else if (item.module_type === "contest") {
      navigation.navigate('ContestDetails', { contestID: item.contest_id });
    } else if (item.module_type === "article") {
      navigation.navigate('ArticleDetails', { mediaId: item.contest_id, articleSlug: item.story_id });
    } else if (item.module_type === "artwork") {
      navigation.navigate('ArtworkDetails', { mediaId: item.media_id, artworkSlug: item.story_id });
    }
  };

  const callGetAllStories = async () => {
    loading(true);
  await getAllStoriessListAndData({})
        .then(response =>{
          setStories(response.data.data.storyreal);
          console.log('response.data.data.storyreal',response.data.data.storyreal);
        })
        .catch(()=>SimpleToast.show('Oops Something went wrong'))
        .finally(()=>setLoading(false));
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
  const voteOnPost = (data,id,type) => {
    console.log(data,id,type)
   makeVote(data,id,type)
    .then((res) => {
      console.log(res.data)
        const {data: {status, response_msg}} = res
        status && SimpleToast.show(response_msg);
    }).catch((error)=>{
        console.log("Voting error response : ", JSON.stringify(error));
    })
   
}

console.log('images[currentPage]',images);
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
        <View style={{ backgroundColor: "#fff", width: '95%', height: Platform.OS === 'android' ? '65%' : '55%',
         borderRadius: 10,alignItems: 'center', justifyContent:'center',}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
           paddingHorizontal: 20, marginTop: 10 }}>
    <Text style={{ fontSize: 18,width:'70%',textAlign:'center',marginLeft:50, fontWeight:'bold' }}>Vote for the best one you like today!</Text>
    {/* <TouchableOpacity onPress={() => console.log('Cross button pressed')}>
      <Text style={{ fontSize: 18 }}>Cross</Text>
    </TouchableOpacity> */}
     <AntDesign name="close" size={30} color="#000"  style={{marginLeft:40}} 
      onPress={() => {
            setVisible(true), makeUpdateDate();
          }}/>
  </View>
  <View style={{ flex: 1 }}>
  <ScrollView
    ref={scrollViewRef}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    onScroll={(event) => {
      const page = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
      setCurrentPage(page);
    }}
    scrollEventThrottle={200}
  >
    {images.map((item, index) => (
  <View style={{ width: screenWidth -30, marginTop: 10,
    alignItems: 'center', borderRadius: 20, marginHorizontal: 6, height:'75%', }} key={index}>
  
    {images[currentPage].image_path !== "" ?
      <>
        <Text style={{ color: '#000', fontSize: 16, width: '75%', marginTop: 2,textAlign:'center' }}>{truncateTextLimit(images[currentPage].feed_title, 50)}</Text>
        <Image
          source={{ uri: NEW_IMG_BASE + images[currentPage].image_path }}
          style={{ width: '100%', height: 200, justifyContent: 'center', marginTop: 1, borderRadius: 10, resizeMode:'contain' }} />
        <Text style={{ color: '#000', fontSize: 15, marginTop:5, width: '70%', textAlign: 'center' }}>{truncateTextLimit(images[currentPage].feed_description,100)}</Text>
        
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, width: '100%', position: 'absolute',
          bottom: 40
        }}>
          {currentPage !== 0 && (
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 20 }} onPress={scrollToPreviousPage}>
              <AntDesign name="leftcircleo" size={30} color="#000" />
            </TouchableOpacity>
          )}
          {currentPage !== images.length - 1 && (
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 20 }} onPress={scrollToNextPage}>
              <AntDesign name="rightcircleo" size={30} color="#000" />
            </TouchableOpacity>
          )}
        </View>
      </>
      :
      <View style={{ justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'center', borderRadius:10, marginTop:10, width:'100%'}}>
        <ImageBackground 
          resizeMode="cover"  
          style={{height: 250, width:'100%', justifyContent:'center', alignContent:'center', alignItems:'center', paddingTop:20, paddingBottom:20}} source={quotes[0].quoteVerticalImage[currentPage].local_image}
        >
          <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold', width: '60%' ,textAlign:'center' }}>{images[currentPage].feed_title}</Text>
          <Text style={{ color: '#000', fontSize: 15, textAlign: 'center', width:'75%' }}>{truncateTextLimit(images[currentPage].feed_description, 100)}</Text>
        </ImageBackground>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, width: '100%', position: 'absolute',
          bottom: 40
        }}>
          {currentPage !== 0 && (
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 20 }} onPress={scrollToPreviousPage}>
              <AntDesign name="leftcircleo" size={30} color="#000" />
            </TouchableOpacity>
          )}
          {currentPage !== images.length - 1 && (
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 20 }} onPress={scrollToNextPage}>
              <AntDesign name="rightcircleo" size={30} color="#000" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    }

  </View>
))}
  </ScrollView>
 
</View>
{images.length>0 && 
  <>
  <TouchableOpacity
            onPress={() => {
              // Handle vote action
              voteOnPost(images[currentPage].module_id, images[currentPage].institute_id, images[currentPage].feed_type);
              setVisible(true);
              makeUpdateDate();
            }}
            style={{
              width: 100,
              height: 40,
             // marginTop: 10,
              borderWidth: 1,
              borderColor: "#EF2D56",
             // borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#EF2D56",
              bottom:30
            }}
          >
            <Text style={{ color: "#FFF" }}>Vote</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            setVisible(true), makeUpdateDate();
          }}
          style={{
           // position: 'absolute',
           // bottom: '25%', // Adjust the position as needed, for example, '5%' from the bottom
           //width: 50,
           height: 40,
           marginTop: -15,
           borderWidth: 1,
           borderColor: "#EF2D56",
          // borderRadius: 10,
           alignItems: "center",
           justifyContent: "center",
           backgroundColor: "#EF2D56",
           alignSelf:'center',
           paddingHorizontal:10,
           marginBottom:10
          }}
        >
         
            <Text style={{ color: "#fff" }}>I WILL VOTE OTHER POSTS</Text>
         
        </TouchableOpacity>
  </>
}
        
        </View>
        
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

  const renderSelectedTabData = () => {
    switch (selectedTab) {
      case "whats_new":
        return <WhatsNew filterType={params?.filter}/>;
      case "sale":
        return <ShopSale />;
      case "project_list":
        return <Projects />;
      case "followings":
        return <MyFollowings />;
      case "spenowr":
        return <BySpenowr />;
      case "featured":
        return <Featured />;
    }
  };

  if (!isInternetAvailable) return <NoInternet />;
  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={[GlobalStyles.GlobalContainer, { backgroundColor: LIGHTGREY }]}
    >
      {isFocused && !isVisible && votesofday == "0" &&
        date != new Date().toLocaleDateString() && images.length > 0 &&
         (
          <InitialVotingPopUp visible={!isVisible} />
        )}
        <ArtCategoryModal visible={modalVisible} onClose={() => setModalVisible(false)} />
         {/* <InitialVotingPopUp/> */}
      <DefaultHeader headerText={"Home"} showBackButton={false} showUpgrade />

      <View style={{ flexShrink: 0 }}>
        <ErrorBoundary FallbackComponent={FallBackUI}>
          {showStories && stories.length > 0 ? (
            <InstaStory
              data={stories.map(story => ({
                user_id: story.story_id,
                user_name: story.story_title,
                user_image: story.module_image_path == '' ? 'https://media.spenowr.com/images/theme/default/favicon.png' : NEW_IMG_BASE + story.module_image_path,
                stories: story.storyItems.map(item => ({
                  story_id: item.slug_url,
                  story_image: NEW_IMG_BASE + item.module_image_path,
                  swipeText: item.module_title,
                  module_type: story.module_type,
                  contest_id: item.contest_id,
                  media_id: item.media_id,
                })),
              }))}
              avatarSize={avatarSize}
              duration={10}
              onStart={() => console.log('Story started')}
              onClose={() => console.log('Story closed')}
              renderSwipeUpComponent={({ item }) => (
                <SwipeUpComponent
                  onPress={() => handleSwipeUpPress(item)}
                  swipeText={item.swipeText}
                />
              )}
              style={GlobalStyles.containerHome}
            />
          ) : (
            <View style={{ paddingVertical: moderateScale(12), alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#EF2D56" />
            </View>
          )}
        </ErrorBoundary>
      </View>

      <View style={{ flexShrink: 0, backgroundColor: WHITE }}>
        <ScrollView
          contentContainerStyle={{
            paddingLeft: moderateScale(10),
            paddingVertical: moderateScale(6),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {tabs.map((item, index) => renderEachTab(item, index))}
        </ScrollView>
      </View>

      <View style={{ flex: 1, minHeight: 0 }}>
        {renderSelectedTabData()}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  // console.log('votesss',state.home.votesofday)
  return {
    isInternetAvailable: state.InternetConnectivity.isConnected,
    votesofday: state.home.votesofday,
    appliedFilters : state.home.filters,
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
)(HomeScreen);

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

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  optionContainer: {
    width: "100%",
  },
  option: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: "100%",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressBarBackground: {
    height: 10,
    flex: 1,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6495ED",
    borderRadius: 5,
  },
  percentage: {
    fontSize: 14,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#e63946",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});