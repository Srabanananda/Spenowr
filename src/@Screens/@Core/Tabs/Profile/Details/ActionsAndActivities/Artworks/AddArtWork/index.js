/**
 *  Created By @name Sukumar_Abhijeet
 */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import DefaultHeader from "../../../../../../../../@GlobalComponents/DefaultHeader";
import { GlobalStyles } from "../../../../../../../../@GlobalStyles";
import APP_CONSTANT from "../../../../../../../../constants/Constant";
import Config from "@Config/default";
const {
  COLOR: { RED },
  NEW_IMG_BASE,
  SUBNAME,
  DUMMY_IMAGE_URL,
} = Config;

import ARTNCRAFT from "../../../../../../../../assets/JsonFiles/FilterJsons/productcat_subcat.json";
import PHOTOGRAPHY from "../../../../../../../../assets/JsonFiles/FilterJsons/photographycat_subcat.json";
import ModalHeader from "../../../../../../../../@GlobalComponents/ModalHeader";
import Modal from "react-native-modal";
import { Dropdown } from "react-native-material-dropdown";
import SelectImage from "../../../../../../../../@GlobalComponents/SelectImage";
import Toast from "react-native-simple-toast";
import DefaultButton from "../../../../../../../../@GlobalComponents/DefaultButton";
import {
  addArtWork,
  updateArtWork,
  getImageFromChatGPT,
} from "../../../../../../../../@Endpoints/Core/Tabs/ArtWork";
import { useDispatch } from "react-redux";
import * as userActions from "@Redux/actions/userActions";
import PointShowCase from "@Spoints/PointShowCase";
import { pickImage } from "../../../../../../../../@Utils/helperFiles/ImagePicker";

const categoryData = [
  {
    category: [...ARTNCRAFT.category, PHOTOGRAPHY.category[0]],
  },
];

const categoryJson = categoryData[0].category.map((each) => {
  const {
    type: { label, value },
  } = each;
  return { name: value, value: label };
});

const AddArtWorkScreen = ({ ...props }) => {
  const dispatch = useDispatch();

  const { route, navigation } = props;
  const { subscription, points } = route.params;
  const EditData = route.params ? route.params.EditData : null;
  console.log('Add Artwork screen : ', JSON.stringify(props?.route.params?.points));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryList] = useState(categoryJson);
  const [selectedCategory, setSelectedCategory] = useState("Select A Category");
  const [mainSubcat, setMainSubCat] = useState([]);
  const [subCategoryList, setSubCatList] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    "Select A Sub-Category"
  );
  const [mainType, setMainType] = useState();
  const [mainTypeValues, setMainTypeValues] = useState([]);
  const [selectedType, setSelectedType] = useState("Select A Type");

  const [primaryImg, setPrimaryImg] = useState(undefined);
  const [showImg, setShowImg] = useState(false);
  const [secondary1, setSecondary1] = useState(null);
  const [secondary2, setSecondary2] = useState(null);

  const [youtubeId, setYoutubeId] = useState("");
  const [imageTitle, setImageTitle] = useState(null);
  const [tag, setTag] = useState(null);
  const [location, setLocation] = useState(null);

  const [loader, setLoader] = useState(false);
  const [earned, setEarned] = useState(0);
  const [total, setTotal] = useState(0);

  const visibilities = [
    { name: "public", value: "Public" },
    { name: "private", value: "Private" },
  ];
  const [selectedVisibility, setSelectedVisiblity] = useState("Public");

  const [isActive, setIsActive] = useState(false);
  const [aiSearchText, setAISearchText] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchedImages, setSearchedImages] = useState([]);

  useEffect(() => {
    if (EditData) {
      const {
        media_path,
        secondary_media1,
        secondary_media2,
        photo_publish,
        photo_description,
        photo_title,
        photo_category,
        photo_tag,
        photo_location,
        image_alt_text,
        youtube_id,
      } = EditData;
      const eCategory = categoryData[0].category.find(
        (x) => x.type.value === photo_category
      );
      const activateShowImage = secondary_media1 || secondary_media2;
      if (
        activateShowImage !== "" &&
        activateShowImage !== null &&
        activateShowImage !== "null" &&
        activateShowImage !== undefined
      )
        setShowImg(true);
      if (eCategory) {
        setSelectedCategory(eCategory.type.label);
        setMainSubCat(eCategory.type.subcat);
      }
      setTitle(photo_title);
      setDescription(photo_description);
      setPrimaryImg(media_path);
      setSecondary1(secondary_media1);
      setSecondary2(secondary_media2);
      setTag(photo_tag);
      setLocation(photo_location);
      setImageTitle(image_alt_text);
      setYoutubeId(youtube_id);
      setSelectedVisiblity(photo_publish === "2" ? "Public" : "Private");
    }
  }, [EditData]);

  useEffect(() => {
    dispatch(userActions.updatePointShowCase(false));
  }, []);

  useEffect(() => {
    if (mainSubcat.length) {
      const subCats = mainSubcat.map((each) => {
        const {
          subcatGroup: { label, value },
        } = each;
        return { name: value, value: label };
      });
      setSubCatList(subCats);
      if (EditData) {
        const eSubCat = mainSubcat.find(
          (x) => x.subcatGroup.value === EditData.photo_subcategory
        );
        if (eSubCat) checkTypes(eSubCat.subcatGroup.label, true);
        else setSelectedSubCategory("Select A Sub-Category");
      } else setSelectedSubCategory("Select A Sub-Category");
    } else {
      setSubCatList([]);
      setSelectedSubCategory("Select A Sub-Category");
    }
  }, [mainSubcat]);

  useEffect(() => {
    if (mainType) {
      const types = mainType.type.map((each) => {
        const {
          item: { label, value },
        } = each;
        return { name: value, value: label };
      });
      setMainTypeValues(types);
    }
  }, [mainType]);

  useEffect(() => {
    if (earned) dispatch(userActions.updatePointShowCase(true));
  }, [earned]);

  const checkSubCategory = (selected) => {
    setSelectedCategory(selected);
    const val = categoryData[0].category.find((x) => x.type.label === selected);
    setMainSubCat(val.type.subcat);
  };

  const checkTypes = (value, isOnce = false) => {
    setSelectedSubCategory(value);
    const { subcatGroup = {} } = mainSubcat.find(
      (x) => x.subcatGroup.label === value
    );
    setMainType(subcatGroup);
    if (EditData && isOnce && subcatGroup.type.length) {
      const editedType = subcatGroup.type.find(
        (x) => x.item.value === EditData.photo_type
      );
      setSelectedType(editedType ? editedType.item.label : "Select A Type");
    }
  };

  const renderSelectedFile = (option) => {
    if (primaryImg && option === 0)
      return (
        <TouchableOpacity onPress={() => chooseFile(option)}>
          <Image
            resizeMode={"contain"}
            source={{
              uri: primaryImg.base64
                ? "data:image/jpeg;base64," + primaryImg.base64
                : primaryImg.includes('https') ? primaryImg : NEW_IMG_BASE + primaryImg,
            }}
            style={styles.selectedImageStyle}
          />
        </TouchableOpacity>
      );
    if (secondary1 && option === 1)
      return (
        <TouchableOpacity onPress={() => chooseFile(option)}>
          <Image
            resizeMode={"contain"}
            source={{
              uri: secondary1.base64
                ? "data:image/jpeg;base64," + secondary1.base64
                : NEW_IMG_BASE + secondary1,
            }}
            style={styles.selectedImageStyle}
          />
        </TouchableOpacity>
      );
    if (secondary2 && option === 2)
      return (
        <TouchableOpacity onPress={() => chooseFile(option)}>
          <Image
            resizeMode={"contain"}
            source={{
              uri: secondary2.base64
                ? "data:image/jpeg;base64," + secondary2.base64
                : NEW_IMG_BASE + secondary2,
            }}
            style={styles.selectedImageStyle}
          />
        </TouchableOpacity>
      );
    return <SelectImage onPress={() => chooseFile(option)} />;
  };

  const chooseFile = (option) => {
    pickImage((res) => {
      let response = res;
      if (Platform.OS === "android") {
        if (res?.assets) response = res.assets[0];
      }
      if (response.didCancel) return;
      switch (option) {
        case 0:
          setPrimaryImg(response);
          break;
        case 1:
          setSecondary1(response);
          break;
        case 2:
          setSecondary2(response);
          break;

        default:
          setPrimaryImg(response);
      }
    });
  };

  const getRestImageFormData = (body) => {
    if (secondary1 && typeof secondary1 !== "string")
      body.append(
        "secondary_media1",
        "data:image/jpeg;base64," + secondary1.base64
      );
    else body.append("secondary_media1", null);

    if (secondary2 && typeof secondary2 !== "string")
      body.append(
        "secondary_media2",
        "data:image/jpeg;base64," + secondary2.base64
      );
    else body.append("secondary_media2", null);
  };

  const validateData = () => {
    if (title === "" || selectedCategory === "Select A Category")
      Toast.show("Fill all mandatory fields", Toast.LONG);
    else {
      if (primaryImg) createFormData();
      else Toast.show("Select the Primary image", Toast.LONG);
    }
  };

  const createFormData = () => {
    setLoader(true);
    const body = new FormData();

    body.append("secondary_media3", null);
    body.append("application", true);
    body.append("secondary_media4", null);
    body.append("apply_signature", null);
    body.append("apply_watermark_shade", null);
    body.append("apply_spenowr_watermark_shade", null);
    body.append("photo_title", title);
    body.append("photo_description", description);
    const cat = categoryJson.find((x) => x.value === selectedCategory);
    body.append("photo_category", cat.name);
    const subcat = subCategoryList.find((x) => x.value === selectedSubCategory);
    body.append("photo_subcategory", subcat ? subcat.name : null);
    const type = mainTypeValues.find((x) => x.value === selectedType);
    body.append("photo_type", type ? type.name : null);
    body.append("photo_tag", tag);
    body.append("photo_location", location);
    body.append("photo_publish", selectedVisibility === "Public" ? 2 : 1);
    body.append("image_alt_text", imageTitle);
    body.append("youtube_id", youtubeId);
    EditData ? startEditing(body) : startAdding(body);
  };

  const startAdding = (body) => {
    body.append("primary_media", "data:image/jpeg;base64," + primaryImg.base64);
    getRestImageFormData(body);
    addArtWork(body)
      .then((res) => {
        const {
          data: {
            artworkPoint: { earnedPoint = 0, totalPoint = 0 },
          },
        } = res;
        setEarned(earnedPoint);
        setTotal(totalPoint);
        Toast.show("Artwork Added Successfully", Toast.LONG);
      })
      .catch(() => {
        Toast.show("Artwork Adding Failed", Toast.LONG);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const startEditing = (body) => {
    body.append(
      "primary_media", primaryImg.base64 ? "data:image/jpeg;base64," + primaryImg.base64 :  null
    );
    getRestImageFormData(body);
    body.append("media_id", EditData.media_id);
    updateArtWork(body)
      .then(() => {
        Toast.show("Artwork Updated Successfully", Toast.LONG);
        setTimeout(() => {
          navigation.goBack();
        }, 300);
      })
      .catch((error) => {
        Toast.show("Artwork Updating Failed", Toast.LONG);
        console.log('error : ', JSON.stringify(error));
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const showMoreImageOptions = () => {
    if (showImg)
      return (
        <>
          <Text style={styles.inputHeaderName}>SECONDARY IMAGE 1</Text>
          {renderSelectedFile(1)}
          <Text style={styles.inputHeaderName}>SECONDARY IMAGE 2</Text>
          {renderSelectedFile(2)}
        </>
      );
    return null;
  };

  const ChatGPT_AI_Search = () => {
    setSearchLoader(true);
    getImageFromChatGPT(aiSearchText)
      .then((res) => {
        const { status, imageData } = res?.data;
        if (status == "true") {
          setSearchedImages(imageData)
        }
      })
      .catch(() => {
        Toast.show("Oops Something went wrong", Toast.LONG);
      })
      .finally(() => setSearchLoader(false));
  };

  const ChatGPT_Image = () => {

    return (
      <View>
        <DefaultButton
          buttonStyle={{ marginBottom: 10 }}
          buttonText={`Auto Generate Image with ChatGPT AI`}
          onPress={() => {
            if(points == 0){
                    if(subscription === 'spenowr_gold_plan'){
                        Alert.alert(
                          "Oops!",
                          "You don`t have credit to Generate AI Text",
                          [
                            {
                              text: "Buy Points",
                              onPress: () =>
                                navigation.navigate("CreditPoints", {
                                  subscription_plan: subscription,
                                  type: "AICredits",
                                }),
                            },
                            { text: "CANCEL", style: "cancel" },
                          ]
                        );
                    }else{
                        Alert.alert(
                          "To Use This ChatGPT - AI Art / Story",
                          "Please Upgrade Your subscription to GOLD PRO",
                          [
                            { text: "CANCEL", style: "cancel" },
                            {
                              text: "UPGRADE",
                              onPress: () =>
                                navigation.navigate("Subscription", {
                                  current: subscription,
                                  selected: subscription,
                                }),
                            },
                          ]
                        );
                    }
                }else{
                    setIsActive(true)
                }
          }}
        />
        <Modal
          backdropColor={"#000"}
          dismissable={true}
          hasBackdrop={true}
          isVisible={isActive}
          onBackButtonPress={() => {
            setIsActive(false);
          }}
          onBackdropPress={() => {
            setIsActive(false);
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
          useNativeDriver={true}
        >
          <View
            style={{
              width: "90%",
              backgroundColor: "#fff",
              padding: moderateScale(15),
              borderRadius: moderateScale(4),
            }}
          >
            <ModalHeader
              headerText={`Generate Image From ChatGPT`}
              onPress={() => setIsActive(false)}
            />

            <TextInput
              onChangeText={(string) => setAISearchText(string)}
              placeholder="Search"
              placeholderTextColor="#414756"
              style={styles.textInputBox}
              value={aiSearchText}
            />
            <DefaultButton
              buttonText={"Generate"}
              onPress={ChatGPT_AI_Search}
              showLoader={searchLoader}
              textStyle={{ fontSize: moderateScale(12) }}
            />
            {searchedImages.length != 0 && <ScrollView showsVerticalScrollIndicator={false} style={{height: 400, marginTop: 10}}>
              {searchedImages.map((item) => {
                return (
                  <View style={{}}>
                    <Image
                      resizeMode={"contain"}
                      source={{ uri: item.url }}
                      style={styles.selectedImageStyle}
                    />
                    <DefaultButton
                      buttonText={"Confirm"}
                      onPress={() => {
                        setPrimaryImg(item.url)
                        setIsActive(false);
                      }}
                      showLoader={false}
                      textStyle={{ fontSize: moderateScale(12) }}
                    />
                  </View>
                );
              })}
            </ScrollView>}
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DefaultHeader headerText={EditData ? "Edit Artwork" : "Add Artwork"} />
      <ScrollView
        contentContainerStyle={{
          padding: moderateScale(10),
          paddingBottom: moderateScale(100),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={GlobalStyles.formWrapper}>
          <Text style={GlobalStyles.inputHeaderName}>
            ARTWORK TITLE
            <Text style={styles.starColor}>*</Text>
          </Text>
          <TextInput
            onChangeText={(value) => setTitle(value)}
            placeholder={"Enter a title (no special characters)"}
            style={GlobalStyles.textInput}
            value={title}
          />
          <Text style={GlobalStyles.inputHeaderName}>
            ARTWORK DESCRIPTION
            <Text style={styles.starColor}>*</Text>
          </Text>
          <TextInput
            multiline={true}
            onChangeText={(value) => setDescription(value)}
            placeholder={"Enter a description"}
            style={{
              ...GlobalStyles.textInput,
              height: moderateScale(100),
              textAlignVertical: "top",
            }}
            value={description}
          />

          <Text style={GlobalStyles.inputHeaderName}>
            ARTWORK CATEGORY
            <Text style={styles.starColor}>*</Text>
          </Text>
          <View style={styles.dropDownView}>
            <Dropdown
              data={categoryList}
              fontSize={12}
              onChangeText={(value) => checkSubCategory(value)}
              value={selectedCategory}
            />
          </View>

          <Text style={GlobalStyles.inputHeaderName}>ARTWORK SUB CATEGORY</Text>
          <View style={styles.dropDownView}>
            <Dropdown
              data={subCategoryList}
              fontSize={12}
              onChangeText={(value) => checkTypes(value)}
              value={selectedSubCategory}
            />
          </View>

          <Text style={GlobalStyles.inputHeaderName}>ARTWORK TYPE</Text>
          <View style={styles.dropDownView}>
            <Dropdown
              data={mainTypeValues}
              fontSize={12}
              onChangeText={(value) => setSelectedType(value)}
              value={selectedType}
            />
          </View>

          <Text style={GlobalStyles.inputHeaderName}>
            PRIMARY IMAGE
            <Text style={styles.starColor}>*</Text>
          </Text>
          {renderSelectedFile(0)}
          {!showImg && (
            <TouchableOpacity onPress={() => setShowImg(true)}>
              <Text style={styles.addMore}>Add More Images</Text>
            </TouchableOpacity>
          )}
          {showMoreImageOptions()}
          {ChatGPT_Image()}
          <Text style={GlobalStyles.inputHeaderName}>
            YOUTUBE : ONLY VIDEO ID{" "}
          </Text>
          <TextInput
            onChangeText={(value) => setYoutubeId(value)}
            placeholder={"Ex : JLHJZ8ziTWk"}
            style={GlobalStyles.textInput}
            value={youtubeId}
          />

          <Text style={GlobalStyles.inputHeaderName}>TAG</Text>
          <TextInput
            onChangeText={(value) => setTag(value)}
            placeholder={"Enter Photo tag"}
            style={GlobalStyles.textInput}
            value={tag}
          />

          <Text style={GlobalStyles.inputHeaderName}>LOCATION</Text>
          <TextInput
            onChangeText={(value) => setLocation(value)}
            placeholder={"Enter Photo Location"}
            style={GlobalStyles.textInput}
            value={location}
          />

          <Text style={GlobalStyles.inputHeaderName}>
            VISIBILITY
            <Text style={styles.starColor}>*</Text>
          </Text>
          <View style={styles.dropDownView}>
            <Dropdown
              data={visibilities}
              fontSize={12}
              onChangeText={(value) => setSelectedVisiblity(value)}
              value={selectedVisibility}
            />
          </View>

          <DefaultButton
            buttonText={EditData ? "Update Artwork" : "Add Artwork"}
            onPress={() => validateData()}
            showLoader={loader}
          />
        </View>
      </ScrollView>
      <PointShowCase pointsEarned={earned} totalPoints={total} />
    </SafeAreaView>
  );
};

export default AddArtWorkScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: APP_CONSTANT.COLOR.WHITE,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  buttonDesign: {
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
    padding: moderateScale(10),
    backgroundColor: APP_CONSTANT.COLOR.APP_PINK_COLOR,
    height: moderateScale(50),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: "#fff",
    alignContent: "center",
    alignItems: "center",
  },
  btntext: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    justifyContent: "center",
  },
  starColor: {
    color: RED,
  },
  dropDownView: {
    height: moderateScale(60),
    justifyContent: "center",
    marginTop: moderateScale(-10),
  },
  selectedImageStyle: {
    height: moderateScale(300),
    width: "100%",
    marginTop: moderateScale(6),
    borderRadius: moderateScale(6),
  },
  addMore: {
    alignSelf: "flex-end",
    color: SUBNAME,
    textDecorationLine: "underline",
  },
});
