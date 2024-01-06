/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import Config from '@Config/default';
import PropTypes from 'prop-types';
import Capitalize from '../../../../../../@Utils/helperFiles/Capitalize';
import { moderateScale, scale } from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import ScaledImage from '../../../../../../@GlobalComponents/ScalableImage';

const {NEW_IMG_BASE,COLOR:{SUBNAME,WHITE,APP_PINK_COLOR,APP_THEME_COLOR}} = Config;
const Card = ({info}) =>{

    const navigation = useNavigation();

    const {
        reduced_media_path,
        photo_owner,
        photo_title,
        author_profile_url,
        media_id='',
        photo_description
    } = info;

    const slgs = author_profile_url.split('/');
    return (
        <TouchableOpacity 
            onPress={()=>navigation.navigate('ArtworkDetails',{mediaId:media_id,artworkSlug:slgs[0]})} 
            style={styles.cardBox}
        >
            <View style={styles.upperCard}>
                <ScaledImage source={{ uri: NEW_IMG_BASE + reduced_media_path }} />
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('PublicProfile',{slug:author_profile_url})} 
                    style={styles.nameBox}
                >
                    <Text style={styles.ownerName}>{Capitalize(photo_owner)}</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.bottomCard}>
                <View style={styles.titleView}>
                    <Text numberOfLines={1} style={styles.titleText}>{photo_title}</Text>
                </View>
                <Text style={{color:SUBNAME,fontSize:moderateScale(10),marginVertical:5}}>{photo_description}</Text>
            </View>
        </TouchableOpacity>
    );
};

Card.propTypes = {
    info:PropTypes.object.isRequired,
};

export default Card;

const styles = StyleSheet.create({
    cardBox: {
        backgroundColor:WHITE,
        marginBottom:moderateScale(20),
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(2),
        elevation: moderateScale(3),
        shadowOffset: {
            height: scale(1),
            width: scale(1)
        },
        overflow:'hidden',
        borderRadius:moderateScale(8)
    },
    overlayImage:{
        backgroundColor:'#000',
        width:'100%',
        height:moderateScale(30),
        position:'absolute',
        opacity:0.5,
        bottom:0
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
    },
    titleView: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems:'center',
        marginTop:moderateScale(5)
    },
    titleText: {
        color: SUBNAME,
        fontSize: moderateScale(12),
        fontWeight:'bold'
    },
    priceText: {
        fontSize: moderateScale(14),
        fontWeight:'bold'
    },
    nameWrapper:{
    },
    subtitleText: {
        color: WHITE,
        fontSize: moderateScale(20),
        marginTop:moderateScale(-40),
        fontWeight:'600',
        marginLeft:moderateScale(20)
    },
    bottomCard: {
        width: '100%',
        backgroundColor: WHITE,
        paddingHorizontal:moderateScale(15),
        paddingBottom:moderateScale(5)
    },
    upperCard: {
        width: '100%',
        backgroundColor:APP_THEME_COLOR
    },
    likeButton: {
        position: 'absolute',
    },
    image: {
        width: moderateScale(150),
        height: moderateScale(150),
    },
    bottomButtons:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:moderateScale(10)
    },
    buttons:{
        width:'30%',
        backgroundColor:'transparent'
    },
    buttonText:{
        fontSize:moderateScale(12),
        color:SUBNAME
    },
    buttonTextEdit:{
        fontSize:moderateScale(14),
        color:APP_PINK_COLOR,
        fontWeight:'bold'
    },
    nameBox:{
        position:'absolute',
        bottom:moderateScale(5),
        left:moderateScale(15)
    },
    ownerName:{
        fontWeight:'bold',
        fontSize:moderateScale(15),
        color:WHITE
    }

});