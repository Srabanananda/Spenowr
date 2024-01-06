/**
 * Create By @name Sukumar_Abhijeet
 */

import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import Config from '@Config/default';
import { useNavigation } from '@react-navigation/native';
import { deleteArtWork, editArtWork, requestCustomPrint } from '../../../../../../../../@Endpoints/Core/Tabs/ArtWork';
import Toast from 'react-native-simple-toast';
import SubmitToContest from './SubmitToContest';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import ScaledImage from '../../../../../../../../@GlobalComponents/ScalableImage';

const { COLOR: { SUBNAME,WHITE,APP_PINK_COLOR,APP_THEME_COLOR }, NEW_IMG_BASE } = Config;

const DefaultCard = ({ cardData,mode,refreshData,isContestActive,subscription,points}) => {

    const navigation = useNavigation();
    const {
        reduced_media_path, photo_title = '',
        photo_description = '',media_id = '',
        institute_slug_url='',paticipate_status,contest_id="",
        custom_print_enable, paticipation_status="",PhotographyContest=0
    } = cardData;

    const slgs = institute_slug_url.split('/');
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [editLoader, setEditLoader] = useState(false);
    const [cpLoader, setCPLoader] = useState(false);

    const callDeleteService = () =>{
        setDeleteLoader(true);
        deleteArtWork(media_id)
            .then(()=>{
                setDeleteLoader(false);
                Toast.show('Artwork Deleted Successfully!',Toast.LONG);
                refreshData();
            })
            .catch(()=>{
                setDeleteLoader(false);
                Toast.show('Artwork Delete Failed!',Toast.LONG);
            });
    };

    const getEditData = () =>{
        setEditLoader(true);
        editArtWork(media_id)
            .then(res=>{
                const {data:{galleryData}} = res;
                setEditLoader(false);
                navigation.navigate('AddArtWork',{EditData:galleryData,subscription: subscription,points: points});
            })
            .catch(()=>{
                setEditLoader(false);
                Toast.show('Loading details Failed!',Toast.LONG);
            }).finally(()=>refreshData());
    };

    const requestForCustomPrint = () =>{
        setCPLoader(true);
        requestCustomPrint(media_id)
            .then(res=>{
                setCPLoader(false);
                Toast.show('Requested for Custom Print Successfully!',Toast.LONG);
            })
            .catch(()=>{
                setCPLoader(false);
                Toast.show('Loading details Failed!',Toast.LONG);
            });
    };

    const renderContestButton = () =>{
        if((PhotographyContest == "0" && paticipation_status == 5) || (PhotographyContest == "1" && paticipation_status == "1"))
            return(
                <SubmitToContest cardData={cardData} refreshData={refreshData} />
            );
        return null;
    };

    return (
        <TouchableOpacity 
            onPress={()=>navigation.push('ArtworkDetails',{mediaId:media_id,artworkSlug:slgs[0]})} 
            style={styles.cardBox}
        >
            <View style={styles.upperCard}>
                <ScaledImage source={{ uri: NEW_IMG_BASE + reduced_media_path }} />
            </View>
            <View style={styles.bottomCard}>
                <Text numberOfLines={1} style={styles.titleText}>{photo_title}</Text>
                <Text style={{color:SUBNAME,fontSize:moderateScale(12)}}>{photo_description}</Text>
                {paticipation_status == "1" && <TouchableOpacity onPress={()=>navigation.navigate('ContestDetails',{"contestID": contest_id})}>
                    <Text numberOfLines={1} style={{fontSize: moderateScale(12),color: APP_PINK_COLOR}}>{'Participated in contest'}</Text>
                </TouchableOpacity>}
                {
                    (mode === 'PRIVATE') &&
                        (
                            <View style={styles.bottomButtons}>
                                <TouchableOpacity disabled={editLoader} onPress={()=>getEditData(true)} style={GlobalStyles.seeMoreButton} >
                                    {editLoader ? <ActivityIndicator color={APP_PINK_COLOR} /> : <Text  style={GlobalStyles.seeMoreButtonText}>Edit</Text>}
                                </TouchableOpacity>
                                {custom_print_enable == "0" && <TouchableOpacity disabled={cpLoader} onPress={requestForCustomPrint} style={GlobalStyles.seeMoreButton} >
                                    {editLoader ? <ActivityIndicator color={APP_PINK_COLOR} /> : <Text  style={GlobalStyles.seeMoreButtonText}>Custom Print</Text>}
                                </TouchableOpacity>}
                                {custom_print_enable == "2" && <Text style={GlobalStyles.seeMoreButton} >
                                    <Text style={GlobalStyles.seeMoreButtonText}>Approval Pending</Text>
                                </Text>}
                                <TouchableOpacity disabled={deleteLoader} onPress={()=>callDeleteService(true)} >
                                    {deleteLoader ? <ActivityIndicator color={APP_PINK_COLOR} /> : <Text  style={styles.buttonText}>Delete</Text>}
                                </TouchableOpacity>
                            </View>
                        )
                }
                {/* {renderContestButton()} */}
                {mode === 'PRIVATE' ? renderContestButton() : null}
            </View>
        </TouchableOpacity>
    );
};

DefaultCard.propTypes = {
    cardData: PropTypes.object.isRequired,
    isContestActive:PropTypes.number.isRequired,
    mode:PropTypes.string.isRequired,
    refreshData:PropTypes.func,
};

export default DefaultCard;

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
        height:'15%',
        position:'absolute',
        opacity:0.5,
        bottom:0
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
    },
    titleText: {
        fontSize: moderateScale(16),
        fontWeight:'bold',
        marginBottom:2
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
        paddingVertical:moderateScale(10)
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
    }
});