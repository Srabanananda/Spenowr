/**
 * Create By @name Sukumar_Abhijeet
 */

import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Modal, Alert, TextInput} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import Config from '@Config/default';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { deleteArtWork, editArtWork, makeAnimateArtwork, requestCustomPrint } from '../../../../../../../../@Endpoints/Core/Tabs/ArtWork';
import Toast from 'react-native-simple-toast';
import SubmitToContest from './SubmitToContest';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import ScaledImage from '../../../../../../../../@GlobalComponents/ScalableImage';
import Video from 'react-native-video';
import CloseIcon from "react-native-vector-icons/AntDesign";

const { COLOR: { SUBNAME,WHITE,APP_PINK_COLOR,APP_THEME_COLOR }, NEW_IMG_BASE } = Config;

const DefaultCard = ({ cardData,mode,refreshData,isContestActive,subscription,points, animate_point}) => {

    const navigation = useNavigation();
    const {
        reduced_media_path, photo_title = '',
        photo_description = '',media_id = '',
        institute_slug_url='',paticipate_status,contest_id="",
        custom_print_enable, paticipation_status="",PhotographyContest=0
    } = cardData;

    console.log('cardData30',cardData);
    console.log('subscription',subscription);
    console.log('points',points);
    console.log('animate_point',animate_point);

    const slgs = institute_slug_url.split('/');
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [editLoader, setEditLoader] = useState(false);
    const [cpLoader, setCPLoader] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false); 
    const [myAnimateLoader, setmyAnimateLoader] = useState(false);
    const [textPrompt, setTextPrompt] = useState("Animate the image");
    const [isRegenerateModalVisible, setIsRegenerateModalVisible] = useState(false); 

    useFocusEffect(
        useCallback(() => {
            // Close both modals when the screen loses focus
            return () => {
                setIsModalVisible(false); // Close the first modal
                setIsRegenerateModalVisible(false); // Close the second modal
            };
        }, []) // Empty dependency array to ensure this runs only when the screen focus changes
    );
    

    const regenerate3DImage = () => {
        setIsModalVisible(false); // Close the current modal
        setIsRegenerateModalVisible(true); // Open the regenerate modal
    };

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

    const viewAnimatedResult = () => {
        setIsModalVisible(true);  
    };

    const animateArtwork = (promptText) => {
        if (subscription === "spenowr_basic") {
            Alert.alert(
                "Oops!",
                "Upgrade to a premium subscription to animate your artwork.",
                [
                    {
                        text: "Upgrade",
                        onPress: () =>
                            navigation.navigate("Subscription", { 
                                current: subscription, 
                                selected: subscription 
                            }), 
                    },
                  { text: "CANCEL", style: "cancel" },
                ]
              );
            return;  
        }
    
        if (animate_point < 30) {
            Alert.alert(
                "Oops!",
                "You need at least 30 points to animate your artwork.",
                [
                  {
                    text: "Buy Points",
                    onPress: () =>
                      navigation.navigate("CreditPoints", {
                        animate_point: animate_point,
                        type: "AnimateCredits",
                      }),
                  },
                  { text: "CANCEL", style: "cancel" },
                ]
              );
            return;
        }
    
        setmyAnimateLoader(true);
        
        const promptImage = NEW_IMG_BASE + reduced_media_path; 

    
        makeAnimateArtwork(media_id, promptImage, promptText) 
            .then(res => {
                console.log('response of animate my artwork', res);
                console.log('media_id, promptImage, promptText', media_id, promptImage, promptText)
                setmyAnimateLoader(false);
                Toast.show('Requested for Animate Artwork Successfully', Toast.LONG);
                refreshData();
                setIsRegenerateModalVisible(false);
            })
            .catch(() => {
                setmyAnimateLoader(false);
                Toast.show('Loading details Failed!', Toast.LONG);
            });
    }
    
    

    const renderContestButton = () =>{
        if((PhotographyContest == "0" && paticipation_status == 5) || (PhotographyContest == "1" && paticipation_status == "1"))
            return(
                <SubmitToContest cardData={cardData} refreshData={refreshData} />
            );
        return null;
    };

    const handleGenerate = () => {
        if (textPrompt.trim() === "") {
            Toast.show('Please enter a prompt before submitting.', Toast.LONG);
            return;
        }
    
        animateArtwork(textPrompt)
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

                                {cardData.animation_status == "0" && <TouchableOpacity disabled={myAnimateLoader}  
                                onPress={() => {
                                    setIsModalVisible(false);
                                    setIsRegenerateModalVisible(true);
                                }} 
                                style={GlobalStyles.seeMoreButton}>
                                    {myAnimateLoader ? <ActivityIndicator color={APP_PINK_COLOR} /> : <Text  style={GlobalStyles.seeMoreButtonText}>Animate Your Artwork</Text>}
                                </TouchableOpacity>}

                                {cardData.animation_status == "1" && <TouchableOpacity activeOpacity={0.7} style={GlobalStyles.seeMoreButton} >
                                    {editLoader ? <ActivityIndicator color={APP_PINK_COLOR} /> : <Text  style={GlobalStyles.seeMoreButtonText}>Generating</Text>}
                                </TouchableOpacity>}

                                {cardData.animation_status == "2" && <TouchableOpacity disabled={cpLoader} onPress={viewAnimatedResult} style={GlobalStyles.seeMoreButton} >
                                    {editLoader ? <ActivityIndicator color={APP_PINK_COLOR} /> : <Text  style={GlobalStyles.seeMoreButtonText}>View Animated Artwork</Text>}
                                </TouchableOpacity>}

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
             <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    <Video
                        source={{ uri: NEW_IMG_BASE + cardData.animated_video_url }}  
                        style={styles.videoPlayer}
                        // controls={true}
                        resizeMode="contain"
                        repeat
                    />
                    <TouchableOpacity onPress={regenerate3DImage} style={{padding:10, borderRadius:10, backgroundColor: '#EF2D56', width:'50%', alignSelf:'center', alignItems:'center'}}>
                        <Text style={{color:'#fff'}}>REGENERATE 3D IMAGE</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isRegenerateModalVisible}
                onRequestClose={() => setIsRegenerateModalVisible(false)}
            >
    <View style={styles.modalContainer}>
        

        <View style={{backgroundColor:'#fff', width:'95%', alignSelf:'center', paddingVertical:20, borderRadius:10}}>
        <TouchableOpacity onPress={() => setIsRegenerateModalVisible(false)} style={{alignSelf:'flex-end', marginRight:20}}>
            <CloseIcon size={28} name={"closecircleo"} />
        </TouchableOpacity>
            <Text style={{color:'#EF2D56', textAlign:'center', fontSize:18, marginTop:15}}>Enter prompt for 3D regeneration</Text>
        <TextInput
            style={styles.textInput}
            placeholder="Enter prompt"
            value={textPrompt}
            onChangeText={setTextPrompt}
        />

        <TouchableOpacity 
            onPress={handleGenerate} 
            style={{padding: 10, borderRadius: 10, backgroundColor: '#EF2D56', width: '50%', alignSelf: 'center', alignItems: 'center', marginTop:35}}
        >
            {myAnimateLoader ? <ActivityIndicator color="#fff" /> : <Text style={{color: '#fff'}}>GENERATE</Text>}
        </TouchableOpacity>
        </View>
    </View>
</Modal>
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    videoPlayer: {
        width: '100%',
        height: 300,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
    },
    textInput: {
        height: moderateScale(40),
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: moderateScale(8),
        paddingLeft: moderateScale(15),
        marginTop: moderateScale(20),
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#fff'
    },
});