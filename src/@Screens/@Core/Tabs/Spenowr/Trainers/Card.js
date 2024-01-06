/**
 *  Created By @name Ramakanta
 */
import React, { useState } from 'react';
import {Text,StyleSheet, View, TouchableOpacity,Dimensions} from 'react-native';
import Config from '../../../../../@Config/default';
import { moderateScale} from 'react-native-size-matters';
import {IconButton} from 'react-native-paper';
import PropTypes from 'prop-types';
import {addRemoveHeart} from '../../../../../@Endpoints/Core/Dialog/FindArtiest';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import ReviewForm from '../TrainingClasses/ReviewForm';
import USState from '../../../../../assets/JsonFiles/USAState.json';
import INDState from '../../../../../assets/JsonFiles/indiaState.json';
import Image from 'react-native-image-progress';
import StarRating from '../../../../../@GlobalComponents/StarRating';
import Capitalize from '../../../../../@Utils/helperFiles/Capitalize';
import ImageOverlay from 'react-native-image-overlay';
const SCREEN_WIDTH = Dimensions.get('window').width;

const {COLOR:{WHITE,APP_PINK_COLOR,APP_THEME_COLOR,LIGHTGREY,RED},NEW_IMG_BASE,DUMMY_IMAGE_URL} = Config;

export default function EachCard({artist = false, each, largeCard = false}){

    const navigation = useNavigation();
    const {
        country_name='',state_name='',institute_name='',
        avg_rating=0,
        state=0,country=0,city,
    } = each;

    const [liked, setLiked] = useState(false);
    const handleLike = () => {
        addRemoveHeart(liked ? 1 : 0, artist ? each.artist_id : each.institute_id).
            then(()=>{
                setLiked(true);
                Toast.show('Liked Successfully',Toast.SHOW);
            }).catch(()=>{
                Toast.show('Something went wrong',Toast.SHOW);
            });
    };

    const getState = () =>{
        let selectedState = {value:''};
        if(country === '1') 
            selectedState = INDState.find(x=>x.state_id === state);
        if(country === '2')
            selectedState = USState.find(x=>x.state_id === state);
        return selectedState ? selectedState.value : '';
    };

    const getAddress=()=>{
        if(country_name) return state_name+','+country_name;
        const st =  getState();
        const newCity =  (city!=='' ? city+', ' : '');
        return Capitalize(newCity)+st;
    };

    return(
        <TouchableOpacity 
            onPress={()=>navigation.navigate('PublicProfile',{slug:each.slug_url})} 
        >
            <ImageOverlay
                containerStyle={largeCard ? styles.cardBoxLarge : styles.cardBox}
                contentPosition="center"
                source={{ uri:each.profile_image_thumbnail_path ? NEW_IMG_BASE+each.profile_image_thumbnail_path : DUMMY_IMAGE_URL }}>
                <View style={styles.absoluteBox}>
                    <View style={styles.upperWrapper}>
                        <View style={styles.tag}>
                            <Text style={styles.artist}>Artist</Text>
                        </View>
                        <IconButton
                            color={liked ? RED :WHITE}
                            icon={liked ? 'heart' : 'heart-outline'}
                            onPress={handleLike}
                            size={20}
                            style={{...styles.likeButton}}
                        />
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={{marginBottom:moderateScale(10)}}>
                            <Text numberOfLines={1} style={styles.name}>{Capitalize(institute_name.trim())}</Text>
                            <Text style={styles.address}>{getAddress()}</Text>

                            <View style={largeCard && {alignItems:'flex-end',width:'100%',alignSelf:'center',marginTop:moderateScale(-20)}}>
                                <StarRating size={largeCard ? 12 : 10} starSelected={avg_rating} />
                            </View>
                        </View>
                        <ReviewForm id={artist ? each.artist_id : each.institute_id} type={'trainer'} width={80} />
                        <Image source={require('../../../../../assets/svgs/arrow-right.svg')} style={styles.arrow} />
                    </View>
                </View>
            </ImageOverlay>
        </TouchableOpacity>
    );
}

EachCard.propTypes = {
    artist:PropTypes.bool,
    each:PropTypes.object.isRequired,
    filter:PropTypes.string.isRequired,
    largeCard:PropTypes.bool,
    showClaimForm:PropTypes.bool,
};

const styles = StyleSheet.create({
    cardBox: {
        backgroundColor:APP_THEME_COLOR,
        borderRadius:moderateScale(4),
        overflow:'hidden',
        width:moderateScale(180),
        height:moderateScale(200),
        marginRight:moderateScale(15)
    },
    cardBoxLarge:{
        backgroundColor:APP_THEME_COLOR,
        borderRadius:moderateScale(4),
        overflow:'hidden',
        width:SCREEN_WIDTH-20,
        height:moderateScale(200),
        marginBottom:moderateScale(15)
    },
    largeCardStarWrapper:{
        flexDirection:'row',justifyContent:'space-between',width:'90%'
    },
    absoluteBox:{
        position:'absolute',
        padding:moderateScale(10),
        width:'100%',
        height:'100%',
    },
    upperWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    tag:{
        backgroundColor:APP_PINK_COLOR,
        padding:moderateScale(3),
        paddingHorizontal:moderateScale(8),
        borderRadius:moderateScale(10)
    },
    artist:{
        color:WHITE,
        fontSize:moderateScale(10)
    },
    bottomContainer:{
        bottom:0,
        position:'absolute',
        padding:moderateScale(10),
        width:SCREEN_WIDTH-20,
        zIndex:100
    },
    name:{
        fontSize:moderateScale(14),
        fontWeight:'bold',
        color:WHITE
    },
    address:{
        color:LIGHTGREY,
        marginTop:moderateScale(4)
    },
    rowCard:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'80%'
    },
    arrow:{
        alignSelf:'flex-end',
        position:'absolute',bottom:15,
        right:20
    }
});
