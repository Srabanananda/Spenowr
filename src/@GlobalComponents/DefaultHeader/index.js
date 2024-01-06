/**
 * Create By @name Sukumar_Abhijeet on 
 */

import React, { useEffect, useState, useContext } from 'react';
import { TouchableOpacity,View,Text, Image,StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Config from '@Config/default';
import { connect } from 'react-redux';
import { GlobalStyles } from '../../@GlobalStyles';
import UpgradeApp from '../../@Utils/helperFiles/UpgradeApp';
import SearchSelector from './searchSelector';
import  LinearGradient  from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-material-dropdown';
import { useCurrency } from '../../@Context';

const {COLOR:{DARKGRAY,WHITE,APP_PINK_COLOR}} = Config;

const DefaultHeader = ({headerText='Loading',showUpgrade = false,onPress,children,showBackButton=true,gradientColor,showCurr=false,inCart = false,getSelectedCurrency,...props}) =>{
    const { currency, setCurrency } = useCurrency();
    const {totalUnreadMessages,notificationCount=0,cartItemsNumber=0,appUpgradeInfo:{isLatest}} = props;
    const navigation = useNavigation();
    const renderUpgradeButton = () =>{
        if(isLatest?.length && showUpgrade) 
            return(
                <TouchableOpacity onPress={()=>UpgradeApp('abcd')} style={{...GlobalStyles.seeMoreButtonRev,marginLeft:moderateScale(10)}} >
                    <Text style={GlobalStyles.seeMoreButtonTextRev}>Upgrade App</Text>
                </TouchableOpacity>
            );
        return null;
    };
    
    const CurrencyTypes = [
        {name : 'INR',value : 'INR'},
        {name : 'USD',value : 'USD'},
    ];

    const renderIcons = () =>{
        return(
            <View style={styles.iconWrapper}>
                <SearchSelector navigation={navigation} />
                <TouchableOpacity onPress={()=>navigation.navigate('Notifications')} style={{padding:moderateScale(10)}}>
                    {
                        notificationCount ?
                            <View style={styles.circle}>
                                <Text style={styles.text}>{notificationCount}</Text>
                            </View> : null
                    }
                    
                    <Image source={require('../../assets/svgs/bell.svg')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('MessageCenter')} style={{padding:moderateScale(10)}}>
                    {
                        totalUnreadMessages ?  
                            <View style={styles.circle}>
                                <Text style={styles.text}>{totalUnreadMessages}</Text>
                            </View>
                            : null
                    }
                    
                    <Image source={require('../../assets/svgs/message.svg')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Cart')} style={{padding:moderateScale(10)}}>
                    {
                        cartItemsNumber ?
                            <View style={styles.circle}>
                                <Text style={styles.text}>{cartItemsNumber}</Text>
                            </View>
                            : null
                    }
                    
                    <Image 
                        source={require('../../assets/svgs/cart.jpeg')} 
                        style={{width:moderateScale(16),height:moderateScale(16)}} 
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const onBackIconPress = () => {
        onPress ? onPress() : navigation.goBack();
    };

    const renderContent= () =>{
        return(
            <>
                
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    {
                        showBackButton && 
                    (
                        <TouchableOpacity onPress={onBackIconPress} style={styles.touch} >
                            <Image resizeMode={'cover'} source={require('@Assets/images/back_arrow.png')} style={styles.backImage}></Image>
                        </TouchableOpacity>
                    )
                    }
                    <Text style={styles.headerText}>{headerText}</Text>
                    {!showBackButton && renderUpgradeButton()}
                </View>
                
                <View style={{flexDirection: 'row'}}>
                    {showCurr &&
                     <Dropdown
                        containerStyle={[{width: moderateScale(50), marginTop: moderateScale(-20)},inCart && {marginTop: moderateScale(-30), height: moderateScale(40), marginRight: moderateScale(5)}]}
                        data={CurrencyTypes}
                        fontSize={12}
                        dropdownPosition={-3}
                        onChangeText={value => {
                            setCurrency(value)
                            getSelectedCurrency(value)
                        }}
                        value={currency}
                    />}
                    {children ? children : !showBackButton ? renderIcons() : null}
                </View>
            </>
        );
    };

    if(gradientColor)
        return(
            <LinearGradient colors={gradientColor} end={{x: 1, y: 0}} start={{x: 0, y: 0}} style={styles.header}>
                {renderContent()}
            </LinearGradient>
        );

    return(
        <View style={styles.header}>
            {renderContent()}
        </View>
    );
};

DefaultHeader.propTypes = {
    appUpgradeInfo:PropTypes.object.isRequired,
    cartItemsNumber:PropTypes.number.isRequired,
    children:PropTypes.node,
    gradientColor: PropTypes.array,
    headerText:PropTypes.string.isRequired,
    notificationCount:PropTypes.number.isRequired,
    onPress:PropTypes.func,
    showBackButton:PropTypes.bool,
    showUpgrade : PropTypes.bool,
    totalUnreadMessages:PropTypes.number.isRequired,
    showCurr: PropTypes.bool,
    getCurr: PropTypes.func.isRequired,
};

function mapStateToProps(state){
    return{
        totalUnreadMessages : state.more.totalUnreadMessages,
        notificationCount : state.home.inAppNotifications.notificationCount,
        appUpgradeInfo : state.more.appUpgradeInfo,
        cartItemsNumber : state.shop.cartItemsNumber,
    };
}

export default connect(mapStateToProps)(DefaultHeader);

const styles = StyleSheet.create({

    header:{
        flexDirection:'row',
        height:moderateScale(50),
        alignItems:'center',
        borderBottomColor:DARKGRAY,
        borderBottomWidth:1,
        backgroundColor:WHITE,
        justifyContent:'space-between',
        paddingHorizontal:moderateScale(20)
    },
    touch:{
        // padding:moderateScale(6),
    },
    headerText:{
        fontSize:moderateScale(16),
        fontWeight:'bold'
    },
    backImage:{
        width:moderateScale(30),height:moderateScale(20)
    },
    circle:{
        backgroundColor:APP_PINK_COLOR,
        width:moderateScale(18),
        height:moderateScale(18),
        borderRadius:moderateScale(10),
        position:'absolute',
        right:0,
        zIndex:100,
        borderColor:WHITE,
        borderWidth:1,
        justifyContent:'center',alignItems:'center'
    },
    text:{
        color:WHITE,
        fontWeight:'bold',
        fontSize:moderateScale(10)
    },
    iconWrapper:{
        flexDirection:'row'
    }

});