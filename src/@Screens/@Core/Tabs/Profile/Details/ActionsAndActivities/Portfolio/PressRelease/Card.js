/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,StyleSheet,Text,ActivityIndicator} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { deletArtistPressRelease } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import Config from '@Config/default';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import AddArtistPressRelease from './AddPressRelease';
import Capitalize from '../../../../../../../../@Utils/helperFiles/Capitalize';
import ScaledImage from '../../../../../../../../@GlobalComponents/ScalableImage';

const { COLOR: { APP_PINK_COLOR,WHITE,LIGHTGREY,APP_THEME_COLOR,SUBNAME }, NEW_IMG_BASE,DUMMY_IMAGE_URL } = Config;

const Card = ({refreshData,cardItem,mode='PRIVATE'}) =>{

    const {
        reduced_press_image,
        description,
        press_date,
        press_name,
        press_id
    } = cardItem;

    const [loader, setLoader] = useState(false); 

    const deleteData = () =>{
        setLoader(true);
        const body = new FormData();
        body.append('press_id',press_id);
        deletArtistPressRelease(body)
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
            <View style={styles.upperCard}>
                <ScaledImage source={{ uri: reduced_press_image && reduced_press_image!==''  ?  NEW_IMG_BASE + reduced_press_image : DUMMY_IMAGE_URL   }} />
                <View style={styles.overlayImage} />
                <View style={styles.titleView}>
                    <Text numberOfLines={1} style={styles.titleText}>{press_name}</Text>
                    <Text style={styles.date}> { press_date}</Text>
                </View>
            </View>
            <View style={styles.bottomCard}>
                <Text style={styles.desc}>{Capitalize(description)}</Text>
                {(mode === 'PRIVATE') && 
                    (
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <AddArtistPressRelease cardItem={cardItem} refreshData={refreshData} showEdit={true} />
                            {
                                loader ? <ActivityIndicator color={'#cd2121'} size={'small'} /> : <Text onPress={()=>deleteData()} style={GlobalStyles.deleteText}>Delete</Text>
                            }
                        </View>
                    )
                }
            </View>
        </View>
    );
};

export default Card;

Card.propTypes = {
    cardItem:PropTypes.object.isRequired,
    mode: PropTypes.string,
    refreshData : PropTypes.func.isRequired,
};

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
        width:moderateScale(40),
        height:moderateScale(40),
        borderRadius:moderateScale(20),
        position:'absolute',
        alignSelf:'center',
        top:moderateScale(50),
        justifyContent:'center',
        alignItems:'center'
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
        position:'absolute',
        right:moderateScale(8),
        top:moderateScale(8)
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
    }
});