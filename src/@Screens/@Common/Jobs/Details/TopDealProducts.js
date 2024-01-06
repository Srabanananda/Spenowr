/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,FlatList,StyleSheet} from 'react-native';
import ListHeader from '../../../../@GlobalComponents/ListHeader';
import ErrorBoundary from 'react-native-error-boundary';
import FallBackUI from '../../../../@GlobalComponents/FallBackUI';
import EachProduct from '../../../@Core/Tabs/Shop/EachProduct';
import { moderateScale } from 'react-native-size-matters';

const TopDealProducts = ({...props}) =>{

    const {
        products
    } = props;

    const renderPages = ({ index,item }) =>{
        item.name=item.title;
        return (
            <ErrorBoundary FallbackComponent={FallBackUI} key={index}>
                <EachProduct containerStyle={{marginRight:10}} key={index} product={item} />
            </ErrorBoundary>
        );
    };

    return(
        <View style={styles.wrapper}>
            <ListHeader headerText={'Top Deals'} headerViewStyle={{marginBottom:10}} />
            <FlatList
                data={products}
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

export default TopDealProducts;
const styles = StyleSheet.create({
    wrapper:{
        marginTop:moderateScale(10)
    }
});