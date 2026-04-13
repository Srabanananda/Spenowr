/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,StyleSheet,Dimensions, Platform, TouchableOpacity, ScrollView} from 'react-native';
import  LinearGradient  from 'react-native-linear-gradient';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import DefaultButton from '../../../../../@GlobalComponents/DefaultButton';
import FallBackUI from '../../../../../@GlobalComponents/FallBackUI';
import EachProduct from './EachProduct';
import { WEB_URLS } from '../../../../../constants/WebUrls';

const {GRADIENT_COLORS:{PIGGY},COLOR:{ORANGE,WHITE}} = Config;
const {width : SCREEN_WIDTH} = Dimensions.get('window');

const CardLayout = ({...props}) =>{
    const { headerStyle, layoutContainerStyles,product} = props;
    const {
        colors=PIGGY,
        headerText='',
        products=[],
        series=[],
        articles=[],
        type='',
        subcat='',
        cat='',
    } = product;

    const navigation = useNavigation();
    const prodArr = products;
    const seriesArr = series;
    const articleArr =  articles;

    console.log('productproduct 40',product);
    console.log('productproduct 41',type);

    const handlePress = () => {
        if (type == "product") {
            navigation.navigate('ProductList',{productDetails:{type:cat,subcat,cat: '',headerText}})
            console.log('====================================');
            console.log('type,subcat,cat,headerText new',type,subcat,cat,headerText);
            console.log('====================================');
        }  else if (type == "article") {
            navigation.navigate('CommonWebView', { 'URI': WEB_URLS.how_to, 'ScreenTitle': 'How to ' });
        } else {
            navigation.navigate('Series')
        }
    };

    return(
        <LinearGradient  colors={colors} style={[styles.layoutContainer,layoutContainerStyles]}>
            <View style={styles.headerContainer}>
                <Text style={[styles.headerStyle,headerStyle]}>{headerText}</Text>
                <TouchableOpacity style={[styles.buttonStyle, {backgroundColor:'#EF2D56', padding:10, borderRadius:5}]} onPress={()=> handlePress()} >
                    <Text style={{color:'#fff'}}>View All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productWrapper}>
                {prodArr.map((product,i)=>(
                    <ErrorBoundary FallbackComponent={FallBackUI} key={i}>
                        <View style={styles.itemWrapper}>
                        <EachProduct product={product} />
                        </View>
                    </ErrorBoundary>
                    
                ))}
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productWrapper}>
                {seriesArr.map((series, i) => (
                    <ErrorBoundary FallbackComponent={FallBackUI} key={i}>
                        <View style={styles.itemWrapper}>
                        <EachProduct product={series} />
                        </View>
                    </ErrorBoundary>
                ))}
            </ScrollView>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productWrapper}>
                {articleArr.map((article, i) => (
                    <ErrorBoundary FallbackComponent={FallBackUI} key={i}>
                        <View style={styles.itemWrapper}>
                        <EachProduct product={article} />
                        </View>
                    </ErrorBoundary>
                ))}
            </ScrollView>
        </LinearGradient>
    );
};

export default CardLayout;

CardLayout.propTypes = {
    headerStyle:PropTypes.object,
    layoutContainerStyles:PropTypes.object,
    product:PropTypes.object.isRequired
};

export const styles = StyleSheet.create({
    layoutContainer:{
        width: '95%',
        alignSelf: 'stretch',
        minHeight:moderateScale(200),
        padding:moderateScale(10),
        margin: moderateScale(10),
        borderRadius: moderateScale(10),
    },
    headerContainer:{
        width: '94%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:moderateScale(15)
    },
    viewAllTextStyle:{
        fontSize:moderateScale(10)
    },
    buttonStyle:{
        paddingHorizontal:moderateScale(10)
    },
    headerStyle:{
        fontWeight:'bold',fontSize:moderateScale(16)
    },
    productWrapper:{
        flexDirection:'row',
        margin: Platform.OS === 'ios' ? 0 : 4,
    },
    itemWrapper: {
        marginRight: moderateScale(10),
        marginBottom: moderateScale(20), // Added margin for space between items
    },
    productCardWrapper:{
        width:moderateScale(80),
        height:moderateScale(80),
        backgroundColor:'#fff',
        borderRadius:moderateScale(6),
        overflow:'hidden',
        // padding:moderateScale(4)
    },
    textWrapper:{
        width:moderateScale(160),
        position:'absolute',
        bottom:0,
        backgroundColor:'#000',
        padding:moderateScale(6)
    },
    titleHead:{
        fontWeight:'bold',
        color:'#000',
        maxWidth:moderateScale(90),
    },
    catSubcat:{
        flexDirection:'row'
    },
    cat:{
        fontSize:moderateScale(10)
    },
    percentOff:{
        fontWeight:'bold',
        fontSize:moderateScale(10),
        color:WHITE
    },
    priceDiscountTag:{
        backgroundColor:ORANGE,
        alignSelf:'flex-start',
        borderRadius:moderateScale(5),
        marginBottom:moderateScale(8),
        padding:moderateScale(4),
        marginTop:moderateScale(-5)
    }
});