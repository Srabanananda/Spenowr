/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import DefaultHeader from '../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../@GlobalStyles';
import CardLayout from './CardLayout';
import * as ShopActions from '../../../../@Redux/actions/shopActions';
import PropTypes from 'prop-types';
import { isObjectEmpty } from '../../../../@Utils/helperFiles/isObjectEmpty';
import ScreenLoader from '../../../../@GlobalComponents/ScreenLoader';
import LinearGradient from 'react-native-linear-gradient';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import NoInternet from '../../../../@GlobalComponents/NoInternet';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const {
  GRADIENT_COLORS: { PIGGY, SKY, NETFLIX, OCEAN, ORANGE, VISION, INSTA },
  COLOR: { WHITE },
} = Config;

const COLOR_SHADES = [NETFLIX, OCEAN, ORANGE, PIGGY, SKY, VISION, INSTA];


const prodParams = new FormData();
prodParams.append('sort', 'rating');
prodParams.append('currency', 'USD');

const ShopScreen = ({ ...props }) => {
  const isFocused = useIsFocused();
  const [bodyHeight, setBodyHeight] = useState(0);
  const {
    fetchShopProducts,
    isInternetAvailable,
    shopData: { shopProducts, shopProductApiCalled },
    navigation,
    route,
  } = props;

  const {
    top_deals_product = [],
    product_list = [],
    featured = [],
  } = shopProducts;

  const willExploreAll = route?.params?.exploreAll || false;

  const dataSet = useMemo(
    () => [
      { element: 'card' },
      ...(top_deals_product.length
        ? [
            {
              headerText: 'Top Deals',
              products: top_deals_product,
              colors: PIGGY,
              type: 'today-deals',
              subcat: '',
            },
          ]
        : []),
      ...(featured.length
        ? [
            {
              headerText: 'Featured Products',
              products: featured,
              colors: SKY,
              type: 'featured',
              subcat: '',
            },
          ]
        : []),
    ],
    [top_deals_product, featured]
  );

  const showLoader = isObjectEmpty(shopProducts) && shopProductApiCalled === true;

  useEffect(() => {
    isFocused && fetchShopProducts(prodParams);
  }, [isFocused]);

  useEffect(() => {
    if (willExploreAll) exploreAllProd();
  }, [willExploreAll]);

  const exploreAllProd = () =>
    navigation.navigate('ProductList', {
      productDetails: { type: '', subcat: '', cat: '', sort: 'ranking' },
    });
  const dynamicProd = product_list.filter((x) => x.type === 'product-data');

  const renderData = () => (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.scrollContent,
        bodyHeight > 0 && { minHeight: bodyHeight },
      ]}
      showsVerticalScrollIndicator={false}
      bounces
    >
      {dataSet.map((product, i) => {
        if (product.element) {
          return (
            <LinearGradient
              key="shop-banner"
              colors={VISION}
              end={{ x: 1, y: 0 }}
              start={{ x: 0, y: 0 }}
              style={[GlobalStyles.primaryCard, styles.gradientBox]}
            >
              <Text style={styles.textProd}>
                We have a wide variety of Products for you to explore.
              </Text>
              <DefaultButton
                buttonStyle={styles.btnTextStyles}
                buttonText={'Explore All Products'}
                onPress={exploreAllProd}
                showLoader={false}
                textStyle={styles.btnTextStyles}
                type={'outline'}
              />
            </LinearGradient>
          );
        }
        return (
          <CardLayout
            key={`card-${product.headerText}-${i}`}
            layoutContainerStyles={{ marginBottom: moderateScale(10) }}
            product={product}
          />
        );
      })}
      {dynamicProd.map((row, i) => {
        const seeMore = row.see_more_button || {};
        const btnType = seeMore.type ?? row?.type;
        const products = row?.products;
        const header_title = row?.header_title ?? row?.headerText;
        const category = row?.cat;
        const subcategory = row?.subcat;
        const cardProduct = {
          ...row,
          headerText: header_title,
          products,
          type: btnType,
          subcat: category === 'sculptures' ? category : subcategory,
          cat: category === 'sculptures' ? '' : category,
          colors:
            COLOR_SHADES[Math.floor(Math.random() * COLOR_SHADES.length)],
        };
        return (
          <CardLayout
            key={`dynamic-${row.type}-${i}-${header_title}`}
            layoutContainerStyles={{ marginBottom: moderateScale(10) }}
            product={cardProduct}
          />
        );
      })}
    </ScrollView>
  );

  const renderLoader = () => <ScreenLoader text={'Fetching Products'} />;

  if (!isInternetAvailable) return <NoInternet />;
  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={[GlobalStyles.GlobalContainer, { backgroundColor: '#fff' }]}
    >
      <DefaultHeader headerText={'My Shop'} showBackButton={false} />
      <View
        style={styles.body}
        onLayout={(e) => setBodyHeight(e.nativeEvent.layout.height)}
      >
        {showLoader ? (
          <View style={styles.loaderWrap}>
            {renderLoader()}
          </View>
        ) : (
          renderData()
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    shopData: state.shop,
    isInternetAvailable: state.InternetConnectivity.isConnected,
  };
};
const mapDispatchToProp = (dispatch) => ({
  fetchShopProducts: (data) => dispatch(ShopActions.fetchShopProducts(data)),
});

ShopScreen.propTypes = {
  fetchShopProducts: PropTypes.func.isRequired,
  isInternetAvailable: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object,
  shopData: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProp)(ShopScreen);

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    minHeight: 0,
    width: '100%',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    paddingBottom: moderateScale(12),
  },
  loaderWrap: {
    flex: 1,
    minHeight: 0,
    width: '100%',
    justifyContent: 'center',
  },
  textProd: {
    maxWidth: '55%',
  },
  gradientBox: {
    borderRadius: 0,
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnTextStyles: {
    color: WHITE,
    borderColor: WHITE,
    fontWeight: 'bold',
  },
});
