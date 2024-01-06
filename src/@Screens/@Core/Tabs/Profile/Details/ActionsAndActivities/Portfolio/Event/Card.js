/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text, ActivityIndicator,StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { deletArtistEvent } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import Toast from 'react-native-simple-toast';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import AddEvent from './AddEvent';
import { moderateScale, scale } from 'react-native-size-matters';
import Config from '@Config/default';
import openExternalLinks from '../../../../../../../../@Utils/helperFiles/ExternalLinks';
import ScaledImage from '../../../../../../../../@GlobalComponents/ScalableImage';

const { COLOR: { APP_PINK_COLOR,WHITE,LIGHTGREY,APP_THEME_COLOR,SUBNAME }, NEW_IMG_BASE, DUMMY_IMAGE_URL } = Config;

const Card = ({refreshData,cardItem,mode='PRIVATE'}) =>{

    const {
        event_id,
        reduced_event_banner_path,
        event_name,
        event_date,
        event_month,
        street_address,
        event_week,
        from_time_hr,
        event_marketing_video,
        event_web_url,
        event_booking_url,
        event_description,
        event_organizer_name
    }= cardItem;

    const [loader, setLoader] = useState(false); 

    const deleteData = () =>{
        setLoader(true);
        const body = new FormData();
        body.append('event_id',event_id);
        deletArtistEvent(body)
            .then(()=>{
                setLoader(false);
                refreshData();
            })
            .catch(()=>{
                Toast.show('Oops something went wrong',Toast.LONG);
                setLoader(false);
            });
    };

    return(
        <View style={styles.cardBox}>
            <TouchableOpacity disabled={event_web_url === ''} onPress={()=>openExternalLinks(event_web_url)} style={styles.upperCard} >
                <ScaledImage source={{ uri: reduced_event_banner_path ?  NEW_IMG_BASE + reduced_event_banner_path : DUMMY_IMAGE_URL  }} />
                <View style={styles.overlayImage} />
                <View style={styles.titleView}>
                    <Text numberOfLines={1} style={styles.titleText}>{event_name}</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text numberOfLines={2} style={styles.organiser}>{street_address}</Text>
                        
                        <Text style={styles.date}> { ' ('+ event_date +' '+ event_month +' - '+event_week +','+from_time_hr+')'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.bottomCard}>
                {event_organizer_name !== '' ?  <Text style={styles.eventOrganiser}>{event_organizer_name}</Text> : null}
                {event_description !== '' ? <Text style={styles.desc}>{event_description}</Text> : null}
                <View style={styles.wrapper}>
                    {
                        (event_marketing_video !== '') &&  
                        <TouchableOpacity onPress={()=>openExternalLinks(event_marketing_video)} style={styles.playButton}>
                            <Text style={styles.bookingDetails}>Watch Video</Text>
                        </TouchableOpacity>
                    }
                    {
                        (event_booking_url !== '') &&  
                        <TouchableOpacity onPress={()=>openExternalLinks(event_booking_url)} style={styles.bookingButton}>
                            <Text style={styles.bookingDetails}>Booking Details</Text>
                        </TouchableOpacity>
                    }
                </View>
                {(mode === 'PRIVATE') && 
                    (
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <AddEvent cardItem={cardItem} refreshData={refreshData} showEdit={true} />
                            {loader ? <ActivityIndicator color={'#cd2121'} size={'small'} /> : <Text onPress={()=>deleteData()} style={GlobalStyles.deleteText}>Delete</Text>}
                        </View>
                    )
                }
            </View>
            
        </View>
    );
};


Card.propTypes = {
    cardItem:PropTypes.object.isRequired,
    mode: PropTypes.string,
    refreshData : PropTypes.func.isRequired,
};

export default Card;

const styles = StyleSheet.create({
    cardBox: {
        backgroundColor:WHITE,
        marginBottom:moderateScale(20),
        borderRadius:moderateScale(4),
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(2),
        elevation: moderateScale(3),
        shadowOffset: {
            height: scale(1),
            width: scale(1)
        },
        overflow:'hidden'
    },
    upperCard: {
        width: '100%',
        backgroundColor:APP_THEME_COLOR
    },
    overlayImage:{
        backgroundColor:'#000',
        width:'100%',
        height:'100%',
        position:'absolute',
        opacity:0.5,
        bottom:0
    },
    tinyLogo: {
        width: '100%',
        height: moderateScale(150),
        backgroundColor:APP_THEME_COLOR
    },
    titleText: {
        color: WHITE,
        fontSize: moderateScale(16),
        fontWeight:'bold'
    },
    bottomCard: {
        width: '100%',
        backgroundColor: WHITE,
        padding:moderateScale(15)
    },
    titleView: {
        position:'absolute',
        bottom:moderateScale(8),
        left:moderateScale(15)
    },
    organiser:{
        color:LIGHTGREY,
        fontSize:moderateScale(11),
        maxWidth:moderateScale(200)
    },
    playButton:{
        backgroundColor:APP_PINK_COLOR,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        padding:moderateScale(4),
        paddingHorizontal:moderateScale(10),
        borderRadius:moderateScale(4)
    },
    date:{
        fontSize:moderateScale(10),
        color:WHITE
    },
    bookingButton:{
        backgroundColor:APP_PINK_COLOR,
        paddingHorizontal:moderateScale(15),
        padding:moderateScale(4),
        borderRadius:moderateScale(2),
        marginLeft: moderateScale(6)
    },
    bookingDetails:{
        fontSize:moderateScale(10),
        color:WHITE,
        fontWeight:'bold'
    },
    desc:{
        marginBottom:moderateScale(5),
        color:SUBNAME,
        fontSize:moderateScale(10)
    },
    eventOrganiser:{
        fontSize: moderateScale(16),
        fontWeight:'bold'
    },
    wrapper:{
        flexDirection:'row',alignItems:'center',
        paddingVertical:moderateScale(5)
    }
});