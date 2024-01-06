/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { GlobalStyles } from "../../../../../../../@GlobalStyles/index";
import DefaultHeader from "../../../../../../../@GlobalComponents/DefaultHeader/index";
import DefaultButton from "../../../../../../../@GlobalComponents/DefaultButton";
import {
  fetchMyCreditPoints,
  BuyAIPoints,
  BuyJOBPoints
} from "../../../../../../../@Endpoints/Core/Tabs/EditProfile";
import ScreenLoader from "../../../../../../../@GlobalComponents/ScreenLoader";
import ModalHeader from "../../../../../../../@GlobalComponents/ModalHeader";
import Toast from "react-native-simple-toast";
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView } from "react-native-gesture-handler";
import { moderateScale, scale } from "react-native-size-matters";
import Config from "@Config/default";
import Capitalize from "@Utils/helperFiles/Capitalize";
import moment from "moment";

const {
  COLOR: { SUBNAME, WHITE, LIGHTGREY },
} = Config;

const MyCreditPointScreen = ({ ...props }) => {
  const { navigation, route, userObj:{ userProfile:{ email, mobile=""} } } = props;
  const { type } = route?.params;
  const [loading, setLoading] = useState(true);
  const [buyLoading, setBuyLoading] = useState(false);
  const [credPoints, setCredPoints] = useState([]);
  const [aiPoints, setAIPoints] = useState(0);

  const [points, setPoints] = useState("");
  const [phone, setPhone] = useState(mobile=="" ? "" : mobile);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    fetchMyCreditPoints()
      .then(({ data }) => {
        const { point_history = [], institute } = data;
        const { ai_point } = institute;
        setCredPoints(point_history);
        setAIPoints(ai_point);
      })
      .catch(() => {
        Toast.show("Oops something went wrong");
      })
      .finally(() => setLoading(false));
  };

  const BuyAiPoints = () => {
    if(phone == ""){
      Toast.show("Please Enter phone number!");
      return;
    }
    if(points == ""){
      Toast.show("Please enter points!");
      return;
    }
    setBuyLoading(true);
    BuyAIPoints(points, phone)
      .then(({ data }) => {
        const { status = "", payment_list } = data;
        if (status == "succes") {
          console.log("payment_list : ", JSON.stringify(payment_list));
          navigation.navigate("ProductPay", { payload: payment_list });
        }
      })
      .catch(() => {
        Toast.show("Oops something went wrong");
      })
      .finally(() => setBuyLoading(false));
  };


  const BuyJobPoints = () => {
    if(phone == ""){
      Toast.show("Please Enter phone number!");
      return;
    }
    if(points == ""){
      Toast.show("Please enter points!");
      return;
    }
    setBuyLoading(true);
    BuyJOBPoints(points, phone)
      .then(({ data }) => {
        const { status = "", payment_list } = data;
        if (status == "succes") {
          console.log("payment_list : ", JSON.stringify(payment_list));
          navigation.navigate("ProductPay", { payload: payment_list });
        }
      })
      .catch(() => {
        Toast.show("Oops something went wrong");
      })
      .finally(() => setBuyLoading(false));
  };

  const renderEachCredit = (credit, i) => {
    const { title = "", slug_url, point, created_date } = credit;
    return (
      <TouchableOpacity
        key={i}
        onPress={() => navigation.navigate("JobDetails", { jobSlug: slug_url })}
        style={styles.eachCard}
      >
        <View>
          <Text style={styles.title}>{Capitalize(title)}</Text>
          <Text style={styles.date}>
            {moment(created_date).format("MMMM Do YYYY")}
          </Text>
        </View>
        <Text style={styles.pointsText}>+{point}</Text>
      </TouchableOpacity>
    );
  };

  const getJobCreditData = () => {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {(!credPoints.length && (
          <Text
            style={GlobalStyles.noDataFound}
          >{`You have not applied for any job opportunities yet!`}</Text>
        )) || (
          <>
            {credPoints.map((credit, i) => renderEachCredit(credit, i))}
          </>
        )}
        
        <DefaultButton
          buttonStyle={{ paddingVertical: moderateScale(15), marginTop: 25 }}
          buttonText={"Buy Points"}
          onPress={() => setIsActive(true)}
          showLoader={false}
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
            <ModalHeader headerText={"Buy Spenowr points to apply Jobs"}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => setIsActive(false)}>
                  <Text style={styles.closeText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ModalHeader>
            <ScrollView>
              {mobile == "" && <TextInput
                keyboardType="numeric"
                onChangeText={setPhone}
                placeholder="Mobile"
                maxLength={10}
                placeholderTextColor="#414756"
                style={styles.textInputBox}
                value={phone}
              />}
              <TextInput
                keyboardType="numeric"
                onChangeText={setPoints}
                placeholder="Points"
                placeholderTextColor="#414756"
                style={styles.textInputBox}
                value={points}
              />

              <DefaultButton
                buttonText={"Buy"}
                onPress={BuyJobPoints}
                showLoader={buyLoading}
                textStyle={{ fontSize: moderateScale(12) }}
              />
            </ScrollView>
          </View>
        </Modal>
      </ScrollView>
    );
  };

  const getAiPointData = () => {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {(aiPoints == 0 && (
          <Text
            style={GlobalStyles.noDataFound}
          >{`You have no AI points yet, get more!`}</Text>
        )) || (
          <Text
            style={GlobalStyles.noDataFound}
          >{`Your Available ChatGPT AI Points is : ${aiPoints}`}</Text>
        )}
        <DefaultButton
          buttonStyle={{ paddingVertical: moderateScale(15), marginTop: 25 }}
          buttonText={"Buy Points"}
          onPress={() => setIsActive(true)}
          showLoader={false}
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
            <ModalHeader headerText={"Buy points to use Spenowr AI"}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => setIsActive(false)}>
                  <Text style={styles.closeText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ModalHeader>
            <ScrollView>
              {mobile == "" && <TextInput
                keyboardType="numeric"
                onChangeText={setPhone}
                maxLength={10}
                placeholder="Mobile"
                placeholderTextColor="#414756"
                style={styles.textInputBox}
                value={phone}
              />}
              <TextInput
                keyboardType="numeric"
                onChangeText={(string) => setPoints(string)}
                placeholder="Points"
                placeholderTextColor="#414756"
                style={styles.textInputBox}
                value={points}
              />

              <DefaultButton
                buttonText={"Buy"}
                onPress={BuyAiPoints}
                showLoader={buyLoading}
                textStyle={{ fontSize: moderateScale(12) }}
              />
            </ScrollView>
          </View>
        </Modal>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.GlobalContainer}>
      <DefaultHeader
        headerText={`My ${type == "JobCredits" ? "Credit" : "AI"} Points`}
      />
      {loading ? (
        <ScreenLoader text={"Fetching..."} />
      ) : type == "JobCredits" ? (
        getJobCreditData()
      ) : (
        getAiPointData()
      )}
    </SafeAreaView>
  );
};

// export default MyCreditPointScreen;

MyCreditPointScreen.propTypes = {
  userObj: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
      userObj: state.userObj,
  };
};

export default connect(mapStateToProps)(MyCreditPointScreen);

const styles = StyleSheet.create({
  scrollContainer: {
    padding: moderateScale(15),
  },
  eachCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: WHITE,
    marginVertical: moderateScale(6),
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(6),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(3),
    elevation: moderateScale(2),
    shadowOffset: {
      height: scale(2),
      width: scale(2),
    },
  },
  textInputBox: {
    height: moderateScale(40),
    backgroundColor: LIGHTGREY,
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
    width: "100%",
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
  },
  title: {
    fontWeight: "bold",
    marginBottom: moderateScale(4),
  },
  date: {
    color: SUBNAME,
    fontSize: moderateScale(10),
  },
  pointsText: {
    color: "green",
    fontSize: moderateScale(14),
  },
});
