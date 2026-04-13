/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState,useEffect, useCallback, } from 'react';
import { FlatList, Text } from 'react-native';
import { getAllProducts } from '../../../../../@Endpoints/Core/Tabs/Shop';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import PropTypes from 'prop-types';
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import ErrorBoundary from 'react-native-error-boundary';
import FallBackUI from '../../../../../@GlobalComponents/FallBackUI';
import ProductCard from './ProductCard';
import Toast from 'react-native-simple-toast';
import Filters from './Filters';
import { useCurrency } from '../../../../../@Context';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductListScreen = ({ navigation, route: { params: { productDetails } } }) => {
    const { currency, setCurrency } = useCurrency();
    const { type, subcat, cat, headerText, sort } = productDetails;
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [filterData, setFilterObj] = useState();

    useEffect(() => {
        callApi();
        // Clean up any potential memory leaks
        return () => {
            setProducts([]);
            setLoading(false);
        };
    }, [currency]);

    console.log('productDetails 31',productDetails);

    const getParams = (length,filters=false) =>{
        const apiParams = new FormData();

        apiParams.append('currency',currency);
        apiParams.append('minPrice','');
        apiParams.append('maxprice','');
        apiParams.append('offset',0);
        apiParams.append('country','');
        apiParams.append('state','');
        apiParams.append('navcd','');
        apiParams.append('type','');
        apiParams.append('price','');
        apiParams.append('navrating','');
        apiParams.append('radius','');
        apiParams.append('postcode','');
        apiParams.append('summary_filter','');
        apiParams.append('today_deals',type ? type : '');
        apiParams.append('page','FIRST');
        apiParams.append('limit_from', length);
        apiParams.append('limit_to', length+16);
        apiParams.append('pageRange', 16);
        console.log('apiParamsapiParams',apiParams);
        if (filters) {
            for (var key in filters) {
                apiParams.append(key, filters[key]);
            }
        } else {
            // Set subcat to cat if cat is 'handmade-bag' or 'handmade-jewelry'
            const adjustedSubcat = (cat === 'handmade-bag' || cat === 'handmade-jewelry') ? cat : subcat;
            apiParams.append('subcat', adjustedSubcat);

            // Only append cat if it is not 'handmade-bag' or 'handmade-jewelry'
            if (cat !== 'handmade-bag' && cat !== 'handmade-jewelry') {
                apiParams.append('cat', cat);
            }

            apiParams.append('sort', sort ?? 'new');
        }
        return apiParams;
    };

    // const setAppliedFilters = appliedFilters => {
    //     // console.log('FILTERS'+JSON.stringify(appliedFilters))
    //     setFilterObj(appliedFilters)
    //     callApi(0,appliedFilters);
    // };

    const callApi = useCallback((length = 0, filters) => {
        !length && setLoading(true);
        getAllProducts(getParams(length, filters))
            .then(res => {
                console.log('====================================');
                console.log('res9000', res);
                console.log('====================================');
                const { data: { list = [], count = 0 } } = res;
                setProducts(length ? [...products, ...list] : list);
                setTotalCount(count);
            })
            .catch(() => {
                Toast.show('Oops Could not Load Products');
                setTimeout(() => { navigation.goBack(); }, 400);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [products, currency]);

    const renderLoader = () =>(
        <ScreenLoader text={'Fetching All Products'} />
    );

    const setAppliedFilters = useCallback(appliedFilters => {
        setFilterObj(appliedFilters);
        callApi(0, appliedFilters);
    }, [callApi]);

    const renderPages = useCallback(({ index, item }) => (
        <ErrorBoundary FallbackComponent={FallBackUI} key={index}>
            <ProductCard key={index} product={item} smallBox />
        </ErrorBoundary>
    ), []);

    const renderData = () => {
        if(products.length)
            return(
                <FlatList
                    contentContainerStyle={{justifyContent:'space-between',alignItems:'center'}}
                    data={products}
                    keyExtractor={item=> item.id.toString()}
                    numColumns={2}
                    onEndReached={()=> totalCount-products.length > 0  && callApi(products.length,filterData)}
                    onEndReachedThreshold={0.5} 
                    initialNumToRender={16}
                    removeClippedSubviews={true}
                    renderItem = {renderPages} 
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    // getItemLayout={(data, index) => (
                    //     { length: 100, offset: 100 * index, index }
                    // )}
                />
            );
        return <Text style={GlobalStyles.noDataFound}>No Products Found</Text>;
    };
console.log('subcat==>'+subcat)
console.log('cat==>'+cat)

    return(
        <SafeAreaView edges={['left', 'right']} style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={headerText ? headerText : 'All Products'} showCurr={true} getSelectedCurrency={setCurrency} />
            {loading ? renderLoader() : renderData() }
            {/* {productDetails:{type,subcat,cat,headerText}} */}
            <Filters extCat={cat} extSubcat={subcat} setAppliedFilters={setAppliedFilters} />
        </SafeAreaView>
    );
};

ProductListScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
    route:PropTypes.object.isRequired,
};

export default ProductListScreen;