/**
 * Create By @name Sukumar_Abhijeet
 */

import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { moderateScale } from "react-native-size-matters";
import PropTypes from "prop-types";
import styles from "./styles";
import Modal from "react-native-modal";
import DefaultButton from "../../../../../../@GlobalComponents/DefaultButton";
import * as homeActions from "../../../../../../@Redux/actions/homeActions";
import { connect } from "react-redux";
import ModalHeader from "../../../../../../@GlobalComponents/ModalHeader";
import Toast from "react-native-simple-toast";
import { TabsFormData } from "../..";
import { HOME_FILTERS } from "../../../../../../assets/JsonFiles/HomeFilters";

const _ = require("lodash");
let FILTER_MOCK = _.cloneDeep(HOME_FILTERS);

const Filters = ({ type, filterwith, ...props }) => {
  const {
    fetchWhatsNewFeed,
    fetchMyFollowingFeed,
    fetchBySpenowrFeed,
    updateFeed,
    updateFilters,
    appliedFilters,
    userId,
  } = props;

  const [isActive, setIsActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [modules, setModules] = useState([]);

  useEffect(() => {
    setAppliedFiltes();
  }, []);

  useEffect(() => {
    console.log("Filter Type : ", filterwith);
    filterwith && ChangeFilters(filterwith);
  }, [filterwith]);

  const setAppliedFiltes = () => {
    const { searchText, appliedModules } = appliedFilters;
    setSearchText(searchText);
    setModules([..._.cloneDeep(appliedModules)]);
  };
  /* const FetchFilter = each =>{
        console.log('received Filter obj : ', each);
        var obj = {...each}
        obj.selected = true;
        const tempArr = [...modules];
        const index = tempArr.findIndex(x=>x.value === each.value);
        tempArr[index] === obj;
        setModules(tempArr);
    }; */
  const ChangeFilters = (filtertype) => {
    // clearFilters()
    var list = [...modules];
    if (filtertype) {
        for (let index = 0; index < list.length; index++) {
            if (list[index].value == filtertype) {
            list[index].selected = true;
            } else {
            list[index].selected = false;
            }
        }
        // setModules(list);
    }
    const selectedModules = list.filter((x) => x.selected === true);
    if (selectedModules.length || searchText.length) {
      const values = selectedModules.map((x) => x.value);
      updateFeed(type);
      setIsActive(false);
      const filterData = {
        searchText: searchText,
        appliedModules: modules,
      };
      console.log("filterData => ", JSON.stringify(filterData));
      updateFilters(filterData);
      const apiData = TabsFormData(
        filterData,
        0,
        type === "following" ? userId : type === "spenowr" ? "1" : ""
      );
      apiData.append("feed_type", values.toString());

      if (type === "following") fetchMyFollowingFeed(apiData);
      else if (type === "spenowr") fetchBySpenowrFeed(apiData);
      else fetchWhatsNewFeed(apiData);
    } 
  };

  const applyFilters = () => {
    const selectedModules = modules.filter((x) => x.selected === true);
    if (selectedModules.length || searchText.length) {
      const values = selectedModules.map((x) => x.value);
      updateFeed(type);
      setIsActive(false);
      const filterData = {
        searchText: searchText,
        appliedModules: modules,
      };
      console.log("filterData => ", JSON.stringify(filterData));
      updateFilters(filterData);
      const apiData = TabsFormData(
        filterData,
        0,
        type === "following" ? userId : type === "spenowr" ? "1" : ""
      );
      apiData.append("feed_type", values.toString());

      if (type === "following") fetchMyFollowingFeed(apiData);
      else if (type === "spenowr") fetchBySpenowrFeed(apiData);
      else fetchWhatsNewFeed(apiData);
    } else Toast.show("Please Select a filter to apply", Toast.LONG);
  };

  const clearFilters = () => {
    setIsActive(false);
    updateFeed(type);
    setIsActive(false);
    const filterData = {
      searchText: "",
      appliedModules: FILTER_MOCK,
    };
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

    if (type === "following") fetchMyFollowingFeed(formData);
    else if (type === "spenowr") fetchBySpenowrFeed(formData);
    else fetchWhatsNewFeed(formData);
  };

  const setSelected = (each) => {
    const obj = (each.selected = !each.selected);
    const tempArr = [...modules];
    const index = tempArr.findIndex((x) => x.value === each.value);
    tempArr[index] === obj;
    setModules(tempArr);
  };

  const renderEach = (item, index) => {
    const { name, selected } = item;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => setSelected(item)}
        style={!selected ? styles.eachModule : styles.eachModuleSelected}
      >
        <Text style={selected ? styles.moduleNameSelected : styles.defaultName}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFilterBox = () => {
    return (
      <View style={styles.filterContainer}>
        <ModalHeader
          headerText={"Apply Filters"}
          onPress={() => setIsActive(false)}
        />
        <ScrollView>
          <TextInput
            autoCapitalize="none"
            onChangeText={(string) => setSearchText(string)}
            placeholder="Search here .."
            placeholderTextColor="#414756"
            style={styles.textInputBox}
            value={searchText}
          />
          <Text style={styles.filterHeader}>Select Module</Text>
          <View style={styles.modulesWrapper}>
            {modules.map((item, index) => renderEach(item, index))}
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "flex-end",
              marginTop: moderateScale(20),
            }}
          >
            <DefaultButton
              buttonStyle={styles.clearButton}
              buttonText={"Reset"}
              onPress={() => clearFilters()}
              showLoader={false}
              textStyle={{ fontSize: moderateScale(12) }}
            />
            <DefaultButton
              buttonStyle={styles.applyButton}
              buttonText={"Apply"}
              onPress={() => applyFilters()}
              showLoader={false}
              textStyle={{ fontSize: moderateScale(12) }}
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsActive(true)}
        style={styles.filterIcon}
      >
        <Icon color={"#fff"} name={"filter"} size={moderateScale(20)} />
      </TouchableOpacity>
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
        {renderFilterBox()}
      </Modal>
    </>
  );
};

Filters.propTypes = {
  appliedFilters: PropTypes.object.isRequired,
  fetchBySpenowrFeed: PropTypes.func.isRequired,
  fetchMyFollowingFeed: PropTypes.func.isRequired,
  fetchWhatsNewFeed: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  updateFeed: PropTypes.func.isRequired,
  updateFilters: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    appliedFilters: state.home.filters,
    userId: state.userObj.userProfile.user_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWhatsNewFeed: (data) => dispatch(homeActions.fetchWhatsNewFeed(data)),
    fetchMyFollowingFeed: (data) =>
      dispatch(homeActions.fetchMyFollowingFeed(data)),
    fetchBySpenowrFeed: (data) =>
      dispatch(homeActions.fetchBySpenowrFeed(data)),
    updateFeed: (data) => dispatch(homeActions.updateFeed(data)),
    updateFilters: (data) => dispatch(homeActions.updateFilters(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
