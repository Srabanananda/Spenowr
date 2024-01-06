/**
 * Create By @name Sukumar_Abhijeet
 */

import React, { useState } from "react";
import { View, Linking, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Config from "../../../@Config/default";
import ScaledImage from "../../../@GlobalComponents/ScalableImage";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

import DefaultButton from "../../../@GlobalComponents/DefaultButton";
import { isAValidImagePath } from "../../../@Utils/helperFiles/helpers";
const {
  COLOR: { LIGHTGREY },
  NEW_IMG_BASE,
  DUMMY_IMAGE_URL,
  BANNERID
} = Config;

const AdView = ({ type, buttonTitle, imagePath, link, key, obj }) => {
  const [visible, setVisible] = useState(false);
  const onAdPress = () => {
    Linking.openURL(link).catch(() => {
      Toast.show("Oops couldnot open External link", Toast.LONG);
    });
  };

  return (
    <View style={[styles.container, { height: visible ? 260 : 0 }]}>
      {(type == 0 && (
        <BannerAd
          unitId={BANNERID}
          size={BannerAdSize.MEDIUM_RECTANGLE}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
          onAdLoaded={() => {
            setVisible(true);
            console.log(`=> Advert loaded`);
          }}
          onAdFailedToLoad={(error) => {
            setVisible(false);
            console.error(`=> Advert failed to load: `, error);
          }}
        />
      )) || (
        <View style={styles.ComponentView}>
          <ScaledImage
            source={{
              uri: isAValidImagePath(imagePath)
                ? NEW_IMG_BASE + imagePath
                : DUMMY_IMAGE_URL,
            }}
          />
          <DefaultButton buttonText={buttonTitle} onPress={onAdPress} />
        </View>
      )}
    </View>
  );
};
export default AdView;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // borderColor: LIGHTGREY,
    // marginBottom: moderateScale(10),
    alignItems: "center",
  },
  ComponentView: {
    width: "100%",
    borderColor: LIGHTGREY,
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScale(10),
  },
});
