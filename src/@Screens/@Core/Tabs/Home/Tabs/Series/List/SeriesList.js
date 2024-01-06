import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  View,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import {useNavigation} from '@react-navigation/native';
import styles from "../../WhatsNew/styles";
import Config from "@Config/default";

const { NEW_IMG_BASE, DUMMY_IMAGE_URL, DEFAULT_PROFILE } = Config;
const PrintList = ({ dataSet, refresh }: any) => {
  console.log("data : ", dataSet);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    refresh();
    setRefreshing(false);
  };

  const renderPages = ({ item, index }) => {
    const {
      title,
      image_path,
      feed_description,
      avg_rating,
      institute_name,
      type,
      series_id
    } = item;

    console.log('=> series_id :' ,series_id);
    return (
      <TouchableOpacity style={[styles.cardBox,{borderRadius: moderateScale(10)}]} onPress={()=>navigation.navigate('SeriesDetails', { series_id: series_id})}>
          <Image
            source={{
              uri: image_path
                ? NEW_IMG_BASE + image_path
                : NEW_IMG_BASE + DEFAULT_PROFILE,
            }}
            style={{
              width: "100%",
              height: 150,
              borderRadius: moderateScale(15),
              marginTop: 10,
            }}
            resizeMode="cover"
          />
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.artistName}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        contentContainerStyle={{ padding: moderateScale(10) }}
        data={dataSet}
        horizontal={false}
        initialNumToRender={5}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            title="Refreshing .."
            titleColor={"#000"}
          />
        }
        keyExtractor={item => item.series_id}
        removeClippedSubviews={true}
        renderItem={renderPages}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.3}
      />
    </>
  );
};
export default PrintList;
