import { Image, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import DefaultHeader from "../../../../../@GlobalComponents/DefaultHeader";
import Config from "@Config/default";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { GlobalStyles } from "../../../../../@GlobalStyles";
import { Dropdown } from "react-native-material-dropdown";
import GLOBALJSON from "@Assets/JsonFiles/global.json";
import { scale } from "react-native-size-matters";
import Toast from "react-native-simple-toast";
import DefaultButton from "../../../../../@GlobalComponents/DefaultButton";
import axios from "axios";
import { submitInfluencerProfileNew } from "../../../../../@Endpoints/Core/Tabs/More";
import { SafeAreaView } from "react-native-safe-area-context";

const {
  COLOR: { DARKGRAY, LIGHTGREY, WHITE, BLACK, APP_PINK_COLOR },
} = Config;
const {
  data: { influencerCategories },
} = GLOBALJSON;

const InfluencerProfile = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [profileName, setProfileName] = useState("facebook");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loader, setLoader] = useState(false);

  const [instagram_url, setInstagram_url] = useState('');
  const [instagram_followers, setInstagram_followers] = useState('');

  const [facebook_url, setFacebook_url] = useState('');
  const [facebook_followers, setFacebook_followers] = useState('');

  const [linkedin_url, setLinkedin_url] = useState('');
  const [linkedin_followers, setLinkedin_followers] = useState('');

  const [pinterest_url, setPinterest_url] = useState('');
  const [pinterest_followers, setPinterest_followers] = useState('');

  const [tiktok_url, setTiktok_url] = useState('');
  const [tiktok_followers, setTiktok_followers] = useState('');

  const topTabs = [
    { icon: "facebook", label: "Facebook" },
    { icon: "instagram", label: "Instagram" },
    { icon: "linkedin", label: "LinkedIn" },
    { icon: "pinterest-square", label: "Pinterest" },
    { icon: "tiktok", label: "Tiktok" },
  ];

  useEffect(() => {
    // Fetch data from the API
    axios.post("https://backend.spenowr.com/profile/user-detail")
      .then((response) => {
        // Handle success response here
        const responseData = response.data;
        console.log('responseData',responseData);
        if (responseData && responseData.data && responseData.data.institute) {
          const data = responseData.data.institute;
          setInstagram_url(data.instagram_url === null || data.instagram_url === 'null' ? '' : data.instagram_url);
          setInstagram_followers(data.instagram_followers);
          setFacebook_url(data.facebook_url === null || data.facebook_url === 'null' ? '' : data.facebook_url);
          setFacebook_followers(data.facebook_followers);
          setLinkedin_url(data.linkedin_url === null || data.linkedin_url === 'null' ? '' : data.linkedin_url);
          setLinkedin_followers(data.linkedin_followers);
          setPinterest_url(data.pinterest_url === null || data.pinterest_url === 'null' ? '' : data.pinterest_url);
          setPinterest_followers(data.pinterest_followers);
          setTiktok_url(data.tiktok_url === null || data.tiktok_url === 'null' ? '' : data.tiktok_url);
          setTiktok_followers(data.tiktok_followers);
          setSelectedCategory(data.category);
        } else {
          console.log("Error: No institute data found in the response");
          Toast.show("Error occurred while fetching data. Please try again later.", Toast.LONG);
        }
      })
      .catch((error) => {
        // Handle error response here
        console.log("Error fetching data:", error);
        Toast.show("Error occurred while fetching data. Please try again later.", Toast.LONG);
      });
  }, []);
  
  

  const onSave = () => {
    

    switch (profileName) {
      case "facebook":
        if (!facebook_url || !facebook_followers) {
          return Toast.show("Please fill in all fields for Facebook", Toast.LONG);
        }
        break;
      case "instagram":
        if (!instagram_url || !instagram_followers) {
          return Toast.show("Please fill in all fields for Instagram", Toast.LONG);
        }
        break;
      case "linkedin":
        if (!linkedin_url || !linkedin_followers) {
          return Toast.show("Please fill in all fields for LinkedIn", Toast.LONG);
        }
        break;
      case "pinterest":
        if (!pinterest_url || !pinterest_followers) {
          return Toast.show("Please fill in all fields for Pinterest", Toast.LONG);
        }
        break;
      case "tiktok":
        if (!tiktok_url || !tiktok_followers) {
          return Toast.show("Please fill in all fields for Tiktok", Toast.LONG);
        }
        break;
      default:
        break;
    }

    if (!selectedCategory) return Toast.show("Please Select Category", Toast.LONG);

    setTimeout(() => {
      navigation.goBack();
    }, 1500);
    submitInfluencerProfile();
  };

  const submitInfluencerProfile = async () => {
    const formData = new FormData();
      formData.append("category", selectedCategory);
      formData.append("instagram_url", instagram_url);
      formData.append("instagram_followers", instagram_followers);
      formData.append("pinterest_url", pinterest_url);
      formData.append("facebook_url", facebook_url);
      formData.append("linkedin_url", linkedin_url);
      formData.append("pinterest_followers", pinterest_followers);
      formData.append("tiktok_url", tiktok_url);
      formData.append("facebook_followers", facebook_followers);
      formData.append("linkedin_followers", linkedin_followers);
      formData.append("tiktok_followers", tiktok_followers);
      console.log('formData', formData);
    setLoader(true);
  await  submitInfluencerProfileNew(formData)
  .then((response) => {
    console.log("Response 166:", response.data);
    Toast.show("Data added successfully", Toast.LONG);
    setLoader(false);
  })
  .catch((error) => {
    console.log("Error:", error);
    setLoader(false);
  });
};
  
console.log('profileName',profileName);
  return (
    <SafeAreaView edges={['left', 'right']} style={{ flex: 1, backgroundColor: WHITE }}>
      <DefaultHeader headerText={"Influencer Profile"} />
      <View style={styles.tabWrapper}>
        {topTabs.map((val, index) => (
          <View style={{ flexDirection: "row" }} key={index}>
            <Pressable
              onPress={() => {
                setActiveTab(index);
                setProfileName(val.label.toLowerCase());
              }}
              style={styles.tabButton}
            >
              {index === 4 ? (
                <Image
                  source={require("../../../../../assets/svgs/tiktok.svg")}
                  style={{
                    height: 25,
                    width: 25,
                    marginTop: 5,
                    marginBottom: 5,
                    tintColor:
                      activeTab === index ? APP_PINK_COLOR : BLACK,
                  }}
                  resizeMode="contain"
                />
              ) : (
                <FontAwesome
                  name={val.icon}
                  size={30}
                  color={activeTab === index ? APP_PINK_COLOR : BLACK}
                />
              )}
              <Text
                style={{
                  color: activeTab === index ? APP_PINK_COLOR : BLACK,
                }}
              >
                {val.label}
              </Text>
            </Pressable>
            {index < 4 && (
              <View
                style={{ width: 2, backgroundColor: BLACK, height: 70 }}
              />
            )}
          </View>
        ))}
      </View>
      <View style={styles.body}>
       {profileName == 'facebook' && 
       <>
       <Text>
          {`${profileName.toUpperCase()} `}URL Example: https://www.
          {`${profileName.toLowerCase()}`}.com/(your-page-url)
        </Text>
        <TextInput value={facebook_url} onChangeText={(val) => setFacebook_url(val) } style={styles.input} />
        <Text>{`${profileName.toUpperCase()} FOLLOWERS`}</Text>
        <TextInput value={facebook_followers} onChangeText={(val) => setFacebook_followers(val) } style={styles.input} />
       </> 
       }
       
       {profileName == 'instagram' && 
          <>
          <Text>
             {`${profileName.toUpperCase()} `}URL Example: https://www.
             {`${profileName.toLowerCase()}`}.com/(your-page-url)
           </Text>
           <TextInput value={instagram_url} onChangeText={(val) => setInstagram_url(val)} style={styles.input} />
           <Text>{`${profileName.toUpperCase()} FOLLOWERS`}</Text>
           <TextInput value={instagram_followers} onChangeText={(val) => setInstagram_followers(val)} style={styles.input} />
          </>}
    
{profileName == 'linkedin' && 
   <>
   <Text>
      {`${profileName.toUpperCase()} `}URL Example: https://www.
      {`${profileName.toLowerCase()}`}.com/(your-page-url)
    </Text>
    <TextInput value={linkedin_url} onChangeText={(val) => setLinkedin_url(val)} style={styles.input} />
    <Text>{`${profileName.toUpperCase()} FOLLOWERS`}</Text>
    <TextInput value={linkedin_followers} onChangeText={(val) => setLinkedin_followers(val)} style={styles.input} />
   </>
}
      
 {profileName == 'pinterest' &&
 
 <>
 <Text>
    {`${profileName.toUpperCase()} `}URL Example: https://www.
    {`${profileName.toLowerCase()}`}.com/(your-page-url)
  </Text>
  <TextInput value={pinterest_url} onChangeText={(val) => setPinterest_url(val)} style={styles.input} />
  <Text>{`${profileName.toUpperCase()} FOLLOWERS`}</Text>
  <TextInput value={pinterest_followers} onChangeText={(val) => setPinterest_followers(val)} style={styles.input} />
 </>}
      

      {profileName == 'tiktok' &&
         <>
         <Text>
            {`${profileName.toUpperCase()} `}URL Example: https://www.
            {`${profileName.toLowerCase()}`}.com/(your-page-url)
          </Text>
          <TextInput value={tiktok_url} onChangeText={(val) => setTiktok_url(val)} style={styles.input} />
          <Text>{`${profileName.toUpperCase()} FOLLOWERS`}</Text>
          <TextInput value={tiktok_followers} onChangeText={(val) => setTiktok_followers(val)} style={styles.input} />
         </>
      }
        <Text>
          {`CATEGORY`}
          <Text style={GlobalStyles.starColor}>*</Text>
        </Text>
        <View style={GlobalStyles.dropDownView}>
          <Dropdown
            data={influencerCategories}
            fontSize={12}
            onChangeText={(val) => {setSelectedCategory(val), console.log('val',val);}}
            value={selectedCategory}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <DefaultButton
          buttonText={"Save"}
          onPress={onSave}
          buttonStyle={styles.button}
          textStyle={{ marginRight: 0 }}
          showLoader={loader}
        />
      </View>
    </SafeAreaView>
  );
};

export default InfluencerProfile;

const styles = StyleSheet.create({
  btnTxt: {
    color: WHITE,
  },
  button: {
    // backgroundColor: APP_PINK_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginTop: 20,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(20),
  },
  input: {
    borderWidth: 1,
    borderColor: LIGHTGREY,
    marginVertical: scale(20),
    height: Platform.OS === 'ios' ? scale(40) : null,
    paddingLeft: Platform.OS === 'ios' ? 10 : null
  },
  body: {
    borderTopWidth: 2,
    borderTopColor: APP_PINK_COLOR,
    marginHorizontal: scale(20),
    marginTop: scale(20),
    paddingTop: scale(20),
  },
  tabWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    borderTopWidth: 4,
    borderTopColor: APP_PINK_COLOR,
    marginTop: 10,
  },
  tabButton: {
    height: 75,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
});
