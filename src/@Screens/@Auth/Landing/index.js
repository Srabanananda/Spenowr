/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View, SafeAreaView,StyleSheet, Image,Text } from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import PropTypes from 'prop-types';
import { ForceUpdate } from '../../../@Utils/helperFiles/helpers';


const {COLOR:{APP_PINK_COLOR,SUBNAME,APP_THEME_COLOR,WHITE}} = Config;

const LandingScreen = ({...props}) =>{
    const [isLatest, setLatest]  = React.useState(false)
    const {
        navigation:{navigate}
    } = props;
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setLatest(ForceUpdate())
        });
        return unsubscribe;
    }, [props.navigation])

    return(
        <SafeAreaView style={{...GlobalStyles.GlobalContainer,backgroundColor:WHITE}}>
            <View style={styles.container}>
                <Image resizeMode={'contain'} source={require('../../../assets/images/SpenowrLogoIcon.png')} style={styles.logo} />
                <Image resizeMode={'contain'} source={require('../../../assets/images/SpenowrTextIcon.png')} style={styles.textIcon} />
            </View>
            <View style={styles.lowerContainer}>
                <Text style={styles.title}>Art, Artists, Socialize & Earn</Text>
                <Text style={styles.appDesc}>
                Spenowr helps artists form various streams to showcase their portfolio, buy & sell their creative art products through marketplace,  get customers by listing their services or applying for open jobs. 
                </Text>
                <Text style={[styles.appDesc,{paddingTop:moderateScale(5),marginBottom:moderateScale(20)}]}>
                Spenowr’s vision is to bring in all creative personas and art enthusiasts to one platform where we facilitate them to socialize and grow with name, fame & revenue. 
                </Text>
                <DefaultButton buttonStyle={{width:'100%'}} buttonText={'Login'} onPress={()=>isLatest ? ForceUpdate() : navigate('Login')} showLoader={false} />
                <DefaultButton buttonStyle={styles.createAccount} buttonText={'Create An Account'} onPress={()=>isLatest ? ForceUpdate() : navigate('Register')} showLoader={false} textStyle={{color:APP_PINK_COLOR}} />
            </View>
        </SafeAreaView>
    );
};

LandingScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
};

export default LandingScreen;

const styles = StyleSheet.create({
    container:{
        flex:0.8,
        alignItems:'center',
        justifyContent:'center',
        padding:moderateScale(20),
    },
    lowerContainer:{
        flex:1.2,
        alignItems:'center',
        justifyContent:'center',
        padding:moderateScale(20),
        paddingTop:0,
    },
    textIcon:{
        height:moderateScale(40),marginTop:moderateScale(10)
    },
    title:{
        fontSize:moderateScale(18),
        fontWeight:'600',
        color:APP_THEME_COLOR,
    },
    saveText: {
        color:APP_PINK_COLOR
    },
    appDesc:{
        color:SUBNAME,
        textAlign:'center',
        paddingTop:moderateScale(30),
        fontSize:moderateScale(14)
    },
    createAccount:{
        width:'100%',backgroundColor:'#00000000',
        borderColor:APP_PINK_COLOR,borderWidth:1
    },
    logo:{
        width:moderateScale(120),
        height:moderateScale(120)
    }
});