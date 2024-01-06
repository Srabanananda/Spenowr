/**
 *  Created By @name Ramakanta
 *  Edited By @name Sukumar_Abhijeet
 */
import React,{useState}  from 'react';
import {Text,StyleSheet, View, TouchableOpacity} from 'react-native';
import Config from '../../../../../@Config/default';
import { moderateScale, scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import ReviewForm from './ReviewForm';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../../@GlobalComponents/ModalHeader';
import Capitalize from '../../../../../@Utils/helperFiles/Capitalize';
import { getAddress, getCurrency } from '../../../../../@Utils/helperFiles/CardDetails';
import ImageOverlay from 'react-native-image-overlay';
import { connect } from 'react-redux';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import YouTubePlayer from '../../../../../@GlobalComponents/YoutubePlayer';

const {
    COLOR:{WHITE,LIGHTGREY,SUBNAME,APP_PINK_COLOR,APP_THEME_COLOR},
    NEW_IMG_BASE,DUMMY_IMAGE_URL,
} = Config;

const EachCard = ({each, largeCard = false}) =>{
    const {
        country,state,city,currency,
        display_media_type='1',
        media_url_path='',
        course_id,
        tutor_name,
        fee
    } = each;
    const  navigation = useNavigation();
    const [isActive, setIsActive] = useState(false);

    const getMediaController = () =>{
        if(display_media_type === '2')
            return <YouTubePlayer playerContainerStyles={styles.upperCard} videoId={media_url_path} />;
        return(
            <View style={styles.upperCard}>
                <ImageOverlay
                    containerStyle={styles.tinyLogo}
                    contentPosition="center"
                    source={{uri: each.course_image_path && each.course_image_path !== '/' ? NEW_IMG_BASE+each.course_image_path : DUMMY_IMAGE_URL}}
                />
            </View>
        );
    };

    const renderShowMore = () =>{
        return(
            <View style={styles.seeMoreModal}>
                <ModalHeader headerText={each.course_name.toUpperCase()} onPress={()=>setIsActive(false)} />
                <View style={styles.upperViewBox}>
                    <Text style={{marginBottom:moderateScale(3)}}>Service Type : {Capitalize(each.service_type.replace(/_/g, ' '))}</Text>
                    <Text style={{marginBottom:moderateScale(3)}}>Category : {Capitalize(each.category.replace(/-/g, ' '))}</Text>
                    {tutor_name ? <Text style={{marginBottom:moderateScale(3)}}>Trainer : {tutor_name} </Text> : null}
                </View>
                <Text style={{marginVertical:moderateScale(8),alignSelf:'center',fontWeight:'bold'}}>Service Details</Text>
                {fee ? <Text style={{marginBottom:moderateScale(3)}}>Service Fee :{getCurrency(currency)}{fee} </Text> : null}
                <Text style={{marginBottom:moderateScale(3)}}>City/State/Country : {getAddress(country,state,city)} </Text>
                <Text style={{marginTop:moderateScale(6),color:SUBNAME}}>{each.course_description}</Text>
            </View>
        );
    };

    const checkNavigation = () =>  navigation.navigate('ServiceDetails',{course_id :course_id});

    const courseDescription = each?.course_description?.length > 255 ? `${each?.course_description?.substr(0, 255)}...` : each?.course_description ?? '';

    return(
        <TouchableOpacity onPress={checkNavigation} style={{...styles.cardBox,width: largeCard ? '97%' : moderateScale(200)}}>
            {getMediaController()}
            <View style={styles.bottomCard}>
                <TouchableOpacity onPress={()=>navigation.navigate('PublicProfile',{slug:each.slug_url})}>
                    <Text style={styles.subtitleText}>{Capitalize(each.institute_name)}</Text>
                </TouchableOpacity>
                <View style={styles.titleView}>
                    <Text numberOfLines={1} style={styles.titleText}>{each.course_name}</Text>
                    {each.fee !== '' ?  <Text style={styles.priceText}>{getCurrency(currency) + each.fee}</Text> : null}
                </View>
                <Text style={{color:SUBNAME,fontSize:moderateScale(10)}}>{courseDescription}</Text>
                <View style={styles.bottomButtons}>
                    <ReviewForm color={APP_PINK_COLOR} id={each.course_id} type={'course'} />
                    <TouchableOpacity onPress={()=>setIsActive(true)} style={GlobalStyles.seeMoreButton} >
                        <Text  style={GlobalStyles.seeMoreButtonText}  >See More</Text>
                    </TouchableOpacity>
                </View>
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
                {renderShowMore()}
            </Modal>
        </TouchableOpacity>
    );

};

const mapStateToProps = (state) => {
    return {
        userProfile: state.userObj.userProfile
    };
};

export default connect(mapStateToProps)(EachCard);

EachCard.propTypes = {
    each:PropTypes.object.isRequired,
    largeCard:PropTypes.bool,
    userProfile:PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    cardBox: {
        minHeight:moderateScale(300),
        backgroundColor:WHITE,
        marginBottom:moderateScale(20),
        borderRadius:moderateScale(4),
        justifyContent:'center',
        alignItems:'center',
        marginRight: moderateScale(5),
        marginLeft: moderateScale(5),
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(2),
        elevation: moderateScale(3),
        shadowOffset: {
            height: scale(1),
            width: scale(1)
        },
        overflow:'hidden'
    },
    titleView: {
        width: '100%',
        marginBottom: moderateScale(5),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems:'center'
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
        color: '#000',
        fontSize: moderateScale(20),
        fontWeight:'600',
    },
    bottomCard: {
        width: '100%',
        backgroundColor: WHITE,
        padding:moderateScale(15)
    },
    upperCard: {
        height:moderateScale(200),
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
    tinyLogo: {
        width: '100%',
        height: '100%',
    },
    bottomButtons:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        padding:moderateScale(5)
    },
    buttons:{
        width:'30%',
        backgroundColor:'transparent'
    },
    seeMoreModal:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:'#fff',
        padding:moderateScale(15),
    },
    upperViewBox:{
        paddingVertical:moderateScale(10),
        borderBottomColor:LIGHTGREY,
        borderBottomWidth:1
    }
    
});
