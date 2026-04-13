import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import { connect } from 'react-redux';
import * as homeActions from '@Redux/actions/homeActions';
import { moderateScale } from 'react-native-size-matters';
import { TabsFormData } from '../..';
import Card from '../WhatsNew/WhatsNewCard';
import PropTypes from 'prop-types';
import ScreenLoader from '../../../../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../../../@GlobalStyles';
import useUserData from '../../../../../../@Hooks/useUser';
import MyAdView from '../../../../../@Common/AdView';

const ShopSale = ({...props}) => {
  const {
    fetchForSaleFeed,
    forSaleFeed,
    apiCalled,
    updateFeed,
    fetchManagedAds,
    managedAds,
  } = props;

  const [refreshing, setRefreshing] = useState(false);
  const [subscription, setSubscription] = useState();
  const { UserProfileData } = useUserData();

  useEffect(() => {
    if (UserProfileData?.subscription_plan === 'spenowr_basic') {
      fetchManagedAds();
      setSubscription(UserProfileData?.subscription_plan);
    }
    callApi();
  }, []);

  const callApi = (length = 0) => {
    const manualFilters = {
      searchText: '',
      appliedModules: [{ name: 'Product', value: 'product', selected: true }],
    };
    const apiData = TabsFormData(manualFilters, length, UserProfileData?.user_id ?? '');
    fetchForSaleFeed(apiData, length);
  };

  const onRefresh = () => {
    setRefreshing(true);
    updateFeed('products');
    callApi();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const renderPages = useCallback(({ index, item }) => {
    return (
      <>
        {index !== 0 && index % 5 === 0 && subscription === 'spenowr_basic' ? (
          <>
            <MyAdView
              type={managedAds?.type}
              key={`ad-${index}`}
              buttonTitle={managedAds?.button_text}
              link={managedAds?.button_link}
              imagePath={managedAds?.image}
            />
            <Card info={item} key={`card-${index}`} />
          </>
        ) : (
          <Card info={item} key={`card-${index}`} />
        )}
      </>
    );
  }, [managedAds, subscription]);

  if (forSaleFeed.length)
    return (
      <View style={{ flex: 1, marginTop: moderateScale(5) }}>
        <FlatList
          contentContainerStyle={{ paddingTop: moderateScale(8) }}
          data={forSaleFeed}
          horizontal={false}
          initialNumToRender={4}
          keyExtractor={(item) => item.id.toString()}
          removeClippedSubviews={true}
          onEndReached={() => !apiCalled && callApi(forSaleFeed.length)}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshing}
              title="Refreshing .."
              titleColor="#000"
            />
          }
          renderItem={renderPages}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
      </View>
    );

  if (!forSaleFeed.length && apiCalled) return <ScreenLoader text="Loading data.." />;

  if (!forSaleFeed.length && !apiCalled)
    return (
      <>
        <Text style={GlobalStyles.noDataFound}> No Products Found !!</Text>
      </>
    );
};

ShopSale.propTypes = {
  appliedFilters: PropTypes.object.isRequired,
  fetchForSaleFeed: PropTypes.func.isRequired,
  forSaleFeed: PropTypes.array.isRequired,
  updateFeed: PropTypes.func.isRequired,
  fetchManagedAds: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    forSaleFeed: state.home.forSaleFeed,
    apiCalled: state.home.forSaleApiCalled,
    appliedFilters: state.home.filters,
    managedAds: state.home.managedAds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchForSaleFeed: (data, length) => dispatch(homeActions.fetchForSaleFeed(data, length)),
    fetchManagedAds: () => dispatch(homeActions.fetchManagedAds()),
    updateFeed: (data) => dispatch(homeActions.updateFeed(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopSale);
