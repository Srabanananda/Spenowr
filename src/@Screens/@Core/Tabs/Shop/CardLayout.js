/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import  LinearGradient  from 'react-native-linear-gradient';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import EachProduct from './EachProduct';
import FallBackUI from '../../../../@GlobalComponents/FallBackUI';
import ErrorBoundary from 'react-native-error-boundary';

const { GRADIENT_COLORS: { PIGGY }, COLOR: { ORANGE, WHITE } } = Config;

const CardLayout = ({...props}) =>{
    const { headerStyle, layoutContainerStyles,product} = props;
    const {
        colors=PIGGY,
        headerText='',
        products=[],
        type='',
        subcat='',
        cat='',
    } = product;

    const navigation = useNavigation();
    const prodArr = products.length > 6 ? products.slice(0,6) : products;
    return(
        <LinearGradient  colors={colors} style={[styles.layoutContainer,layoutContainerStyles]}>
            <View style={styles.headerContainer}>
                <Text style={[styles.headerStyle,headerStyle]}>{headerText}</Text>
                <DefaultButton 
                    buttonStyle={styles.buttonStyle} 
                    buttonText={'View All'} 
                    onPress={()=>{
                        navigation.navigate('ProductList',{productDetails:{type,subcat,cat,headerText}})}
                    } 
                    showLoader={false}  
                    textStyle={styles.viewAllTextStyle}
                />
            </View>
            <View style={styles.productWrapper}>
                {prodArr.map((product,i)=>(
                    <ErrorBoundary FallbackComponent={FallBackUI} key={i}>
                        <EachProduct product={product} showDiscount />
                    </ErrorBoundary>
                    
                ))}
            </View>
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
        width: '100%',
        alignSelf: 'stretch',
        minHeight: moderateScale(300),
        padding: moderateScale(10),
        borderRadius: moderateScale(10),
    },
    headerContainer:{
        width: '94%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:moderateScale(10)
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        marginHorizontal: Platform.OS === 'ios' ? moderateScale(2) : moderateScale(1)
    },
    productCell: {
        width: '48%',
        maxWidth: '48%',
        marginVertical: moderateScale(10)
    },
    productCardWrapper:{
        width: '88%',
        aspectRatio: 1,
        backgroundColor: '#fff',
        borderRadius: moderateScale(6),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    productImage: {
        width: '100%',
        height: '100%'
    },
    textWrapper:{
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#000',
        padding: moderateScale(6)
    },
    titleHead:{
        fontWeight:'bold',
        color:'#000',
        marginTop:moderateScale(5),
        maxWidth: '93%',
        alignSelf: 'stretch'
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