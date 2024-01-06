import React, { useEffect, useState } from 'react';
import {SafeAreaView, Text, FlatList, TouchableOpacity, Image, View, RefreshControl} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { getAudioPodCastList } from '../../../../../../@Endpoints/Core/Tabs/More';
import DefaultHeader from '../../../../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../../../@GlobalStyles';
import { moderateScale } from "react-native-size-matters";
import styles from "../WhatsNew/styles";
import Config from "@Config/default";

const { NEW_IMG_BASE, DUMMY_IMAGE_URL, DEFAULT_PROFILE } = Config;

const SeriesScreen = (props) => {

    const [loader, setLoader] = useState(true);
    const [printsData, setPrintsData] = useState([]);
    const [seriesList, setSeriesList] = useState([]);
    const [refreshing,setRefreshing] = useState(false);

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = (fromLimit = 0,toLimit = 20) => {
        getAudioPodCastList(fromLimit,toLimit)
            .then(res=>{
                const { poddata } = res?.data
                setSeriesList(poddata);
            })
            .catch(()=>SimpleToast.show('Oops Something went wrong'))
            .finally(()=>setLoader(false));
    };
    const onRefresh = () =>{
      setRefreshing(true);
      callApi();
      setTimeout(()=>{setRefreshing(false);},500);
  };

    const MySeriesList = ({ dataSet, refresh }) => {
              
        const renderPages = ({ item, index }) => {
          const {
            title,
            image_path,
            series_id
          } = item;
      
          return (
            <TouchableOpacity style={[styles.cardBox,{borderRadius: moderateScale(10)}]} onPress={()=>{
              props.navigation.navigate('SeriesDetails', { series_id: series_id})
            }}>
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

    if(loader) return <ScreenLoader text={'Fetching Series Details ..'} />;
    
    return(
        <SafeAreaView style={{flex:1}}>
            <DefaultHeader headerText={'Series Detail'} />
            {
                (seriesList?.length) ? <MySeriesList dataSet={seriesList} refresh={callApi} />  : <Text style={GlobalStyles.noDataFound}> No Data Found</Text>
            }
        </SafeAreaView>
    );

};

export default SeriesScreen;