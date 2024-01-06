/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState} from 'react';
import {View,Text,StyleSheet,ActivityIndicator, TouchableOpacity, SafeAreaView} from 'react-native';
import Config from '@Config/default';
import { moderateScale, scale } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';
import HTML from 'react-native-render-html';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import DefaultButton from '../../../../../../../../@GlobalComponents/DefaultButton';
import ModalHeader from '../../../../../../../../@GlobalComponents/ModalHeader';
import openExternalLinks from '../../../../../../../../@Utils/helperFiles/ExternalLinks';
import PropTypes from 'prop-types';
import { deleteArticle, publishArticle, editArticle } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import ScaledImage from '../../../../../../../../@GlobalComponents/ScalableImage';
import { ScrollView } from 'react-native-gesture-handler';
import SubmitToContest from '../../Artworks/MyArtWork/SubmitToContest';
import AudioPlayer from '../../../../../../../@Common/MusicPlayer/AudioPlayer';

const { COLOR: { APP_PINK_COLOR,WHITE,APP_THEME_COLOR,SUBNAME }, NEW_IMG_BASE } = Config;

const Card = ({cardData,refreshData,mode,}) =>{

    const navigation = useNavigation();

    const {
        article_image_thumbnail_path,
        slug_url='',
        source_url,
        article_description,
        article_title,
        status : STATUS = '1',
        article_id,
        play_audio,
        polly_response_msg,
    }=cardData;
    console.log('Article Data : ',cardData);
    const [loader, setLoader] = useState(false);
    const [loaderPublish, setLoaderPublish] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [status, setStatus] = useState(STATUS);
    const [deletedLoader, setDeleteLoader ] = useState(false);
    const [editLoader, setEditLoader] = useState(false);

    const funcEditArticle = () =>{
        setEditLoader(true);
        editArticle(article_id)
            .then((res)=>{
                const {data:{articleData}} = res;
                navigation.navigate('AddArticle',{EditData:articleData})
            })
            .catch(()=>Toast.show('Oops something went wrong',Toast.LONG))
            .finally(()=>setEditLoader(false));
    };
    
    const deleteData = () =>{
        setDeleteLoader(true);
        const body = new FormData();
        body.append('article_id',article_id);
        deleteArticle(body)
            .then(()=>refreshData())
            .catch(()=>Toast.show('Oops something went wrong',Toast.LONG))
            .finally(()=>setDeleteLoader(false));
    };
    const publish = () =>{
        setLoaderPublish(true);
        const body = new FormData();
        body.append('article_id',article_id);
        publishArticle(body)
            .then(()=>{
                Toast.show('Article submitted for review',Toast.LONG);
                setStatus('2');
            })
            .catch(()=>{
                Toast.show('Oops Something went wrong',Toast.LONG);
            })
            .finally(()=>setLoaderPublish(false));
    };
    const renderPreviewForm = () =>{
        return(
            <SafeAreaView style={styles.reviewModal}>
                <ModalHeader headerText={article_title} onPress={()=>setIsActive(false)} />
                <ScrollView showsVerticalScrollIndicator={false} style={{padding:moderateScale(10)}}>
                    <HTML html={article_description} />
                </ScrollView>
                {
                    source_url !== '' && 
                    <View style={{flexDirection:'row',alignSelf:'flex-end',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:SUBNAME,fontSize:moderateScale(10)}}>Reference Link : </Text>
                        <Text numberOfLines={1} onPress={()=>openExternalLinks(source_url)} style={styles.EditBtn}>{source_url}</Text>
                    </View>
                }
            </SafeAreaView>
        );
    };
    const checkNavigation = () =>{
        const slgs = slug_url.split('/');
        if(mode==='PRIVATE')
        {
            if(status === '1') navigation.navigate('ArticleDetails',{mediaId:article_id,articleSlug:slgs[0]});
            else
            {
                if(status === '2') Toast.show('Article is pending for review');
                else Toast.show('Article is not published');
            }
        }
        else
        {
            navigation.navigate('ArticleDetails',{mediaId:article_id,articleSlug:slgs[0]});
        }
    };

    return(
        <View style={styles.cardBox}>
            <TouchableOpacity onPress={()=>checkNavigation()} style={styles.upperCard}>
                <ScaledImage source={{ uri: NEW_IMG_BASE + article_image_thumbnail_path }} />
            </TouchableOpacity>
            <View style={styles.bottomCard}>
                {
                    (status === '3' && mode === 'PRIVATE') &&
                    <TouchableOpacity onPress={()=>publish()} style={styles.bookingButton}>
                        {loaderPublish ? <ActivityIndicator color={'#cd2121'} size={'small'} />  : <Text style={styles.bookingDetails}>Publish for Review</Text> } 
                    </TouchableOpacity>
                }
                <View>
                    <Text style={styles.titleText}>{article_title}</Text>
                    {
                        (mode === 'PRIVATE') && 
                            <Text style={styles.organiser}>{status === '3' ? 'Saved As Draft' : status === '2'  ? 'Pending for Review' : ''} </Text>
                    }
                </View>
                <TouchableOpacity onPress={()=>setIsActive(true)}>
                    <View style={styles.blurView}>
                        <Text style={styles.reviewText}>Preview</Text>
                    </View>
                </TouchableOpacity>
                {(mode === 'PRIVATE' && status === '1') ? <SubmitToContest cardData={cardData} refreshData={refreshData} type={'stories'} /> : null}
                {(mode === 'PRIVATE') && 
                (
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:6}}>
                        <DefaultButton buttonText={'Edit'}  onPress={funcEditArticle} showLoader={editLoader} type={'outline'} />
                        {polly_response_msg != null && (polly_response_msg.includes('.mp3') || polly_response_msg.includes('.mp4')) && <AudioPlayer Track={polly_response_msg} />}
                        {play_audio != null && (play_audio.includes('.mp3') || play_audio.includes('.mp4')) && <AudioPlayer Track={play_audio} />}
                        <DefaultButton  buttonText={status === '0' ? 'Deleted' : 'Delete'} isDeactivated={status === '0'} onPress={deleteData} showLoader={deletedLoader} type={ 'outline'} />
                        {/* <TouchableOpacity onPress={()=>navigation.navigate('AddArticle',{EditData:cardData})} style={GlobalStyles.seeMoreButton}>
                            <Text style={GlobalStyles.seeMoreButtonText}>Edit</Text>
                        </TouchableOpacity>
                        {
                            loader ? <ActivityIndicator color={'#cd2121'} size={'small'} /> : <Text onPress={()=>deleteData()} style={GlobalStyles.deleteText}>Delete</Text>
                        } */}
                    </View>
                )
                }
            </View>
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={isActive}
                onBackButtonPress= {()=>{
                    setIsActive(false); 
                }}
                onBackdropPress = {()=>{
                    setIsActive(false); 
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderPreviewForm()}
            </Modal>
        </View>
    );
};

Card.propTypes = {
    cardData:PropTypes.object.isRequired,
    mode:PropTypes.string.isRequired,
    refreshData:PropTypes.func.isRequired,
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
    overlayImage:{
        backgroundColor:'#000',
        width:'100%',
        height:'30%',
        position:'absolute',
        opacity:0.5,
        bottom:0
    },
    upperCard: {
        width: '100%',
        backgroundColor:APP_THEME_COLOR
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
    },
    bottomCard: {
        width: '100%',
        backgroundColor: WHITE,
        padding:moderateScale(15)
    },
    titleView: {
        position:'absolute',
        bottom:moderateScale(8),
        left:moderateScale(15),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'92%'
    },
    organiser:{
        color:APP_PINK_COLOR,
        fontSize:moderateScale(10),
        fontWeight:'bold'
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
        alignSelf:'flex-end'
    },
    bookingDetails:{
        fontSize:moderateScale(12),
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
    EditBtn:{
        color:APP_PINK_COLOR,
        fontWeight:'bold',
        fontSize:moderateScale(14)
    },
    blurView:{
        padding:moderateScale(8),
        borderRadius:moderateScale(3),
        backgroundColor:APP_PINK_COLOR,
        width:'20%',
        justifyContent:'center',alignItems:'center',
        marginTop:5
    },
    reviewText:{
        fontSize:moderateScale(10),
        color:WHITE,
        fontWeight:'bold'
    },
    reviewModal:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:'#fff',
        height:moderateScale(600),
        padding:moderateScale(10)
    },
    titleText:{
        fontWeight:'bold'
    }
});