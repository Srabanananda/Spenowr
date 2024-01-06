/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text,TouchableOpacity,StyleSheet, ActivityIndicator, Linking} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import Config from '@Config/default';
import AddAwards from './AddAwards';
import { deleteArtistAwards } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import PropTypes from 'prop-types';
import ScaledImage from '../../../../../../../../@GlobalComponents/ScalableImage';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import { handleCertificateDownload } from '../../../../../../../../@Utils/helperFiles/helpers';

const { COLOR: { APP_THEME_COLOR,WHITE,SUBNAME,APP_PINK_COLOR },NEW_IMG_BASE } = Config;

const Card = ({refreshData,cardItem,mode='PRIVATE'}) =>{

    const {
        award_image_path,
        award_givenby,
        award_name,
        description,
        award_date,
        getaward_id,
        owned_by = '0'
    } = cardItem;

    const cetificateImage = NEW_IMG_BASE + award_image_path;

    const [loader, setLoader] = useState(false); 

    const deleteData =() =>{
        setLoader(true);
        const body = new FormData();
        body.append('getaward_id',getaward_id);
        deleteArtistAwards(body)
            .then(()=>{
                setLoader(false);
                refreshData();
            })
            .catch(()=>{
                setLoader(false);
            });
    };



    return(
        <View style={styles.cardBox}>
            <TouchableOpacity disabled={true} style={styles.upperCard}>
                <ScaledImage source={{ uri: cetificateImage }} />
            </TouchableOpacity>
            <View style={styles.bottomCard}>
                <View>
                    <Text numberOfLines={1} style={styles.titleText}>{award_name}</Text>
                    <Text style={styles.date}>{award_date}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.awardSubmittedby}>Submitted by </Text>
                    <Text style={styles.awardGivenby}>{award_givenby}</Text>
                </View>
                <Text numberOfLines={4} style={styles.desc}>{description}</Text>
                {(mode === 'PRIVATE' && owned_by === '0') && 
                    (
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:moderateScale(5)}}>
                            <AddAwards cardItem={cardItem} refreshData={refreshData} showEdit={true} />
                            {loader ? <ActivityIndicator color={APP_PINK_COLOR} /> : <Text onPress={()=>deleteData()} style={styles.delete} >Delete</Text>} 
                        </View>
                    )
                }
                {
                    (mode === 'PRIVATE') &&
                    <TouchableOpacity onPress={()=>handleCertificateDownload(cetificateImage)} style={[GlobalStyles.seeMoreButton,{width:moderateScale(150),marginTop:moderateScale(5)}]}>
                        <Text style={GlobalStyles.seeMoreButtonText}>Download Certificate</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};

Card.propTypes = {
    cardItem:PropTypes.object,
    mode:PropTypes.string,
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

    titleText: {
        fontSize: moderateScale(16),
        fontWeight:'bold'
    },
    date:{
        fontSize:moderateScale(10),
        color:SUBNAME
    },
    desc:{
        fontSize:moderateScale(12),
        color:SUBNAME
    },
    awardGivenby:{
        fontSize:moderateScale(14),
        fontWeight:'bold',
        color:APP_PINK_COLOR,
        marginVertical:moderateScale(4)
    },
    awardSubmittedby:{
        fontSize:moderateScale(14),
        color:SUBNAME,
        marginVertical:moderateScale(4)
    },
    delete:{
        color:SUBNAME,
        marginRight:moderateScale(15)
    }
});
