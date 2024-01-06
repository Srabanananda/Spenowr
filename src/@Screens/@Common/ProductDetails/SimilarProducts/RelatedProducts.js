/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,FlatList} from 'react-native';
import ListHeader from '@GlobalComponents/ListHeader';
import styles from '../styles';
import PropTypes from 'prop-types';
import EachProduct from '../../../@Core/Tabs/Shop/EachProduct';
import ErrorBoundary from 'react-native-error-boundary';
import FallBackUI from '@GlobalComponents/FallBackUI';
 
const RelatedProducts = ({productDetails,showHotDeals}) =>{
    const {
        related_product = [],
        top_deals_product= [],
    } = productDetails;

    const dataList = showHotDeals ? top_deals_product : related_product;
 
    if(!dataList.length) return null;

    const renderPages = ({ index,item }) =>{
        item.name=item.title;
        return (
            <ErrorBoundary FallbackComponent={FallBackUI} key={index}>
                <EachProduct containerStyle={{marginRight:10}} key={index} product={item} />
            </ErrorBoundary>
        );
    };
 
    return(
        <View style={styles.similarArtworkWrapper}>
            <ListHeader headerText={showHotDeals ? 'Hot Deals' :'Related Products'} headerViewStyle={{marginBottom:10}} />
            <FlatList
                data={dataList}
                horizontal={true}
                initialNumToRender={5}
                keyExtractor={item=>item.id.toString()}
                legacyImplementation = {true} 
                renderItem = {renderPages}
                scrollEventThrottle={16} 
                showsHorizontalScrollIndicator={false}
                style={{backgroundColor:'#FFF',padding:10}}
            />
        </View>
    );
};
 
 
RelatedProducts.propTypes = {
    productDetails:PropTypes.object.isRequired,
    showHotDeals:PropTypes.any
};
 
export default RelatedProducts;