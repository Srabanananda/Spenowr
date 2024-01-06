import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DefaultHeader from "../../../../../../../../@GlobalComponents/DefaultHeader";
import SimpleToast from "react-native-simple-toast";
import { addSeries, updateSeries } from "../../../../../../../../@Endpoints/Core/Tabs/MyAccount";
import ScreenLoader from "../../../../../../../../@GlobalComponents/ScreenLoader";
import { GlobalStyles } from "../../../../../../../../@GlobalStyles";
import { moderateScale } from "react-native-size-matters";
import styles from "../../../../../Home/Tabs/WhatsNew/styles";
import DefaultButton from "../../../../../../../../@GlobalComponents/DefaultButton";
import { pickImage } from "../../../../../../../../@Utils/helperFiles/ImagePicker";
import { Dropdown } from "react-native-material-dropdown";
import Toast from "react-native-simple-toast";
import Config from "@Config/default";

const { NEW_IMG_BASE, DUMMY_IMAGE_URL, DEFAULT_PROFILE } = Config;
// import MySeriesList from './List/SeriesList';
const SeriesStatus = [
  { name: "Publish Now", value: "Publish Now" , value2: "1" },
  { name: "Save As Draft", value: "Save As Draft", value2: "2" },
];
const AddSeriesScreen = (props) => {
  const { route, navigation } = props;
  const EditData = route?.params ? route.params.EditData : null;
  const [loader, setLoader] = useState(true);
  const [printsData, setPrintsData] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [title, setTitle] = useState(EditData ? EditData?.series_title : "");
  const [description, setDescription] = useState(EditData ? EditData?.series_description : "");
  const [avgRating, setAvgRating] = useState(EditData ? EditData?.avg_rating : "");
  const [status, setStatus] = useState(EditData ? EditData?.status == "1" ? SeriesStatus[0].value : SeriesStatus[1].value : SeriesStatus[0].value);
  const [primaryImg, setPrimaryImg] = useState(EditData ? EditData?.series_image : undefined);
  
  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    setLoader(false);
  };

  const validateData = () => {
    if (title === "" || description === "" || primaryImg == undefined)
      Toast.show("Fill all mandatory fields", Toast.LONG);
    else {
      if (primaryImg) createFormData();
      else Toast.show("Select the Primary image", Toast.LONG);
    }
  };

  const createFormData = () => {
    setLoader(true);
    const body = new FormData();
    body.append("series_title", title);
    body.append("series_description", description);
    body.append("status", status ==  "Publish Now" ? 1 : 2);
    body.append("avg_rating", avgRating);
    body.append("application", true);
    EditData ? startEditing(body) : startAdding(body);
  };

  const startAdding = (body) => {
    body.append("series_image", primaryImg.base64 ? "data:image/jpeg;base64," + primaryImg.base64 :  primaryImg);
    addSeries(body)
      .then(() => {
        Toast.show("Series Added Successfully", Toast.LONG);
        setTimeout(() => {
          navigation.goBack();
        }, 300);
      })
      .catch((error) => {
        Toast.show("Series Adding Failed", Toast.LONG);
        console.log('error : ', JSON.stringify(error));
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const startEditing = (body) => {
    body.append("series_image", primaryImg.base64 ? "data:image/jpeg;base64," + primaryImg.base64 :  primaryImg);
    body.append("series_id", EditData.series_id);
    updateSeries(body)
      .then(() => {
        Toast.show("Series Updated Successfully", Toast.LONG);
        setTimeout(() => {
          navigation.goBack();
        }, 300);
      })
      .catch((error) => {
        Toast.show("Series Updating Failed", Toast.LONG);
        console.log('error : ', JSON.stringify(error));
      })
      .finally(() => {
        setLoader(false);
      });
  };


  const renderSelectedFile = () => {
    const chooseFile = () => {
      pickImage((res) => {
        let response = res;
        if (Platform.OS === "android") {
          if (res?.assets) response = res.assets[0];
          setPrimaryImg(response);
        }
        if (response.didCancel) return;
      });
    }; 
    return (
      <TouchableOpacity style={{borderWidth: 1, borderColor: 'lightgray', borderRadius: 5}} onPress={() => chooseFile()}>
        <Image
          resizeMode={"contain"}
          source={{ uri: primaryImg?.base64
            ? "data:image/jpeg;base64," + primaryImg?.base64
            : NEW_IMG_BASE + primaryImg, }}
          style={{
            height: moderateScale(150),
            width: "100%",
            marginTop: moderateScale(6),
            borderRadius: moderateScale(6),
          }}
        />
      </TouchableOpacity>
    );
  }

  if (loader) return <ScreenLoader text={"Fetching Series Form .."} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultHeader headerText={EditData ? "Edit Series" : "Add Series"} />
      <ScrollView
        contentContainerStyle={{
          padding: moderateScale(10),
          paddingBottom: moderateScale(100),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={GlobalStyles.formWrapper}>
          <Text style={GlobalStyles.inputHeaderName}>
            SERIES TITLE
            <Text style={styles.starColor}>*</Text>
          </Text>
          <TextInput
            onChangeText={(value) => setTitle(value)}
            placeholder={"Enter a title (no special characters)"}
            style={GlobalStyles.textInput}
            value={title}
          />
          <Text style={GlobalStyles.inputHeaderName}>
            SERIES DESCRIPTION
            <Text style={styles.starColor}>*</Text>
          </Text>
          <TextInput
            multiline={true}
            onChangeText={(value) => setDescription(value)}
            placeholder={"Enter series description"}
            style={{
              ...GlobalStyles.textInput,
              height: moderateScale(100),
              textAlignVertical: "top",
            }}
            value={description}
          />
          <Text style={GlobalStyles.inputHeaderName}>
            SERIES COVER IMAGE
            <Text style={styles.starColor}>*</Text>
          </Text>
          {renderSelectedFile()}
          <Text style={GlobalStyles.inputHeaderName}>
            AVG RATING
            {/* <Text style={styles.starColor}>*</Text> */}
          </Text>
          <TextInput
            onChangeText={(value) => setAvgRating(value)}
            style={GlobalStyles.textInput}
            value={avgRating}
          />
          <Text style={GlobalStyles.inputHeaderName}>ARTWORK TYPE</Text>
          <View style={styles.dropDownView}>
            <Dropdown
              data={SeriesStatus}
              fontSize={12}
              onChangeText={(value) => setStatus(value)}
              value={status}
            />
          </View>
          <DefaultButton
            buttonText={EditData ? "Update Series" : "Add Series"}
            onPress={() => validateData()}
            showLoader={loader}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddSeriesScreen;
