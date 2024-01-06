/**
 * Create By @name Sukumar_Abhijeet
 */

import React,{useState} from 'react';
import { View,StyleSheet,Text,TouchableOpacity, ActivityIndicator} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import Config  from '@Config/default';
import { useNavigation } from '@react-navigation/native';
import {deleteService,editService} from '../../../../../../../../@Endpoints/Core/Tabs/Service';
import Toast from 'react-native-simple-toast';
import { getCurrency } from '../../../../../../../../@Utils/helperFiles/CardDetails';
import Image from 'react-native-image-progress';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import YouTubePlayer from '../../../../../../../../@GlobalComponents/YoutubePlayer';
import DefaultButton  from '@GlobalComponents/DefaultButton';

const {
    COLOR:{APP_THEME_COLOR,APP_PINK_COLOR,WHITE,SUBNAME},
    NEW_IMG_BASE,DUMMY_IMAGE_URL
} = Config;

const DefaultCard = ({cardData,mode,refreshData}) =>{

    const navigation = useNavigation();
    const {navigate} = navigation;
    const {
        service_image_path,
        course_name='',
        course_description='',
        fee='',
        course_id,
        country = '1',
        display_media_type='1',
        media_url_path='',
        package_exist=0,
    } = cardData;

    const [deleteLoader, setDeleteLoader] = useState(false);
    const [editLoader, setEditLoader] = useState(false);

    const EditActivity = () =>{
        setEditLoader(true);
        editService(course_id)
            .then(res=>{
                const {data:{courseData}} = res;
                courseData.img_title = '';
                navigate('AddServices',{EditData:courseData});  
            })
            .catch(()=>{
                Toast.show('Oops Couldnot load details',Toast.LONG);
            })
            .finally(()=>{
                setEditLoader(false);
            });
    };

    const deleteAction = () =>{
        setDeleteLoader(true);
        deleteService(course_id)
            .then(()=>{
                Toast.show('Course Deleted Successfully',Toast.LONG);
                refreshData();
            })
            .catch(()=>{
                Toast.show('Oops, Course Delete Failed',Toast.LONG);
            })
            .finally(()=>{
                setDeleteLoader(false);
            });
    };

    const getMediaController = () =>{
        if(display_media_type === '2')
            return<YouTubePlayer playerContainerStyles={styles.upperCard} videoId={media_url_path} />;
        return(
            <View style={styles.upperCard}>
                <Image
                    source={{uri: (service_image_path === '/' || service_image_path === '' || service_image_path === null) ? DUMMY_IMAGE_URL : NEW_IMG_BASE + service_image_path }}
                    style={styles.tinyLogo}
                />
            </View>
        );
        
    };

    const navigateToDetails = () => navigation.navigate('ServiceDetails',{course_id});

    return(
        <TouchableOpacity disabled={mode==='PRIVATE' || !package_exist} onPress={navigateToDetails} style={styles.cardBox}>
            {getMediaController()}
            <View style={styles.bottomCard}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{course_name}</Text>
                    {
                        fee !== '' ? <Text style={styles.priceText}>{getCurrency(country) + fee}</Text> : null
                    }
                </View>
                <Text style={{color:SUBNAME,fontSize:moderateScale(10)}}>{course_description}</Text>
                {
                    (mode === 'PUBLIC' && package_exist) ? <DefaultButton buttonText={'View Package'} onPress={navigateToDetails} showLoade={false} /> : null
                }
                {
                    (mode === 'PRIVATE') &&
                        (
                            <View style={styles.bottomButtons}>
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity disabled={editLoader} onPress={()=>EditActivity(true)} style={GlobalStyles.seeMoreButton} >
                                        {editLoader ? <ActivityIndicator color={APP_PINK_COLOR} /> : <Text  style={GlobalStyles.seeMoreButtonText}>Edit</Text>}
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={editLoader} onPress={()=>navigation.navigate('Package',{course_id,mode})} style={[GlobalStyles.seeMoreButton,{marginLeft:moderateScale(8)}]} >
                                        <Text  style={GlobalStyles.seeMoreButtonText}>Manange Package</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity disabled={deleteLoader} onPress={()=>deleteAction(true)} >
                                    {deleteLoader ? <ActivityIndicator color={APP_PINK_COLOR} /> : <Text  style={styles.buttonText}>Delete</Text>}
                                </TouchableOpacity>
                            </View>
                        )
                }
            </View>
        </TouchableOpacity>
    );
};

DefaultCard.propTypes = {
    cardData:PropTypes.object.isRequired,
    mode:PropTypes.string.isRequired,
    refreshData:PropTypes.func.isRequired,
};

export default DefaultCard;

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
    overlayImage:{
        backgroundColor:'#000',
        width:'100%',
        height:'100%',
        position:'absolute',
        opacity:0.5,
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
        fontSize: moderateScale(16),
        fontWeight:'bold',
        maxWidth:'80%',
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