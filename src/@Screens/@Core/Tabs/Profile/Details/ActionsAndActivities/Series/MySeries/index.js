import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import SimpleToast from "react-native-simple-toast";
import { fetchSeriesData, deleteSeries, editSeries } from "../../../../../../../../@Endpoints/Core/Tabs/MyAccount";
import ScreenLoader from "../../../../../../../../@GlobalComponents/ScreenLoader";
import { GlobalStyles } from "../../../../../../../../@GlobalStyles";
import { moderateScale } from "react-native-size-matters";
import styles from "../../../../../Home/Tabs/WhatsNew/styles";
import Config from "@Config/default";

const { COLOR: { SUBNAME,WHITE,APP_PINK_COLOR,APP_THEME_COLOR }, NEW_IMG_BASE, DUMMY_IMAGE_URL, DEFAULT_PROFILE } = Config;
// import MySeriesList from './List/SeriesList';

const MySeriesScreen = (props) => {
    const { navigation } = props
  const [loader, setLoader] = useState(true);
  const [printsData, setPrintsData] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [editLoader, setEditLoader] = useState(false);
  const [refreshing,setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      callApi();
    });
    return unsubscribe;
  }, []);

  const callApi = () => {
    fetchSeriesData()
      .then((res) => {
        const { seriesdata } = res?.data;
        setSeriesList(seriesdata);
        setLoader(false)
      })
      .catch(() => SimpleToast.show("Oops Something went wrong"))
      .finally(() => setLoader(false));
  };

  const MySeriesList = ({ dataSet, refresh }) => {
      const getEditData = (series_id) =>{
        setEditLoader(true);
        editSeries(series_id)
            .then(res=>{
                const {data:{seriesData}} = res;
                console.log('Edit Data : ', seriesData);
                setEditLoader(false);
                navigation.navigate('AddSeries',{EditData:seriesData, refresh: callApi()});
            })
            .catch(()=>{
                setEditLoader(false);
                Toast.show('Loading details Failed!',Toast.LONG);
            }).finally(()=>callApi());
    };
      const callDeleteService = (series_id) =>{
        setDeleteLoader(true);
        deleteSeries(series_id)
            .then(()=>{
                setDeleteLoader(false);
                Toast.show('Series Deleted Successfully!',Toast.LONG);
            })
            .catch(()=>{
                setDeleteLoader(false);
                Toast.show('Series Delete Failed!',Toast.LONG);
            }).finally(() => callApi());
    };
    
    const renderPages = ({ item, index }) => {
      const { series_title, series_image, series_id } = item;

      return (
        <TouchableOpacity
          style={[styles.cardBox, { borderRadius: moderateScale(10) }]}
          activeOpacity={1}
          /* onPress={() => {
            navigation.navigate("SeriesDetails", { series_id: series_id })
          }} */
        >
          <Image
            source={{
              uri: series_image
                ? NEW_IMG_BASE + series_image
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
            <Text style={styles.artistName}>{series_title}</Text>
          </View>
          <View style={[styles.bottomButtons,{marginBottom: 10}]}>
            <TouchableOpacity disabled={editLoader} onPress={()=>getEditData(series_id)} style={GlobalStyles.seeMoreButton} >
                {editLoader ? <ActivityIndicator color={APP_PINK_COLOR} /> : <Text  style={GlobalStyles.seeMoreButtonText}>Edit</Text>}
            </TouchableOpacity>

            <TouchableOpacity disabled={deleteLoader} onPress={()=>callDeleteService(series_id)} >
                {deleteLoader ? <ActivityIndicator color={APP_PINK_COLOR} /> : <Text  style={styles.buttonText}>Delete</Text>}
            </TouchableOpacity>
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
                  onRefresh={refresh}
                  refreshing={refreshing}
                  title="Refreshing .."
                  titleColor={"#000"}
                />
              }
          keyExtractor={(item) => item.series_id.toString()}
          removeClippedSubviews={true}
          renderItem={renderPages}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.3}
        />
      </>
    );
  };

  if (loader) return <ScreenLoader text={"Fetching Series Details .."} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {seriesList?.length ? (
        <MySeriesList dataSet={seriesList} refresh={callApi} />
      ) : (
        <Text style={GlobalStyles.noDataFound}> No Series Data Found</Text>
      )}
    </SafeAreaView>
  );
};

export default MySeriesScreen;
