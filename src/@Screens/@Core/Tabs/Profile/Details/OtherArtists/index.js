/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {View,StyleSheet,Text} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../../../../@GlobalStyles';
import Config from '@Config/default';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArtistBox from '../../../../../../@GlobalComponents/ArtistBox';
import Capitalize from '../../../../../../@Utils/helperFiles/Capitalize';
import StarRating from '../../../../../../@GlobalComponents/StarRating';
import HorizontalSlider from '../../../../../../@GlobalComponents/HorizontalSlider';
import { getPublicProfileReviews } from '../../../../../../@Endpoints/Core/Tabs/EditProfile';
import DefaultButton from '../../../../../../@GlobalComponents/DefaultButton';

const {COLOR:{APP_PINK_COLOR,SUBNAME,APP_THEME_COLOR}} = Config;

const RecommendedArtist = ({userObj}) =>{

    const {
        publicUserData:{
            instituteData = [],
            institute:{
                institute_id = ''
            }
        }
    } = userObj;

    const [reviews, setReviewsData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const [loader, setLoader] = useState(false);

    useEffect(()=>{
        callReviewsApi(0);
    },[]);

    const callReviewsApi = (skip=0) =>{
        setLoader(true);
        getPublicProfileReviews(institute_id,skip)
            .then(res=>{
                const {data:{reviewsData = [],count}} = res;
                setTotalCount(count);
                setReviewsData(skip ? [...reviews,...reviewsData] : reviewsData);
            })
            .catch()
            .finally(()=>setLoader(false));
    };

    if(!instituteData.length) return null;
    return(
        <>
            {reviews.length  ? 
                <View style={{...GlobalStyles.primaryCard,marginBottom:moderateScale(10)}}>
                    <View style={styles.container}>
                        <View style={{marginBottom:10}}>
                            <Text style={styles.detailText}>Top Reviews</Text>
                            <HorizontalSlider>
                                {
                                    reviews.map((each,i)=>(
                                        <View key={i} style={styles.reviewContainer}>
                                            <View style={{flexDirection:'row',alignItems:'center',marginBottom:4}}>
                                                <View style={styles.circle}></View>
                                                <Text style={styles.name}>{Capitalize(each.author)}</Text>
                                            </View>
                                            <StarRating size={8} starSelected={each.rating} />
                                            <Text style={styles.comment}>{each.comment}</Text>
                                        </View>
                                    ))
                                }
                                {
                                    parseInt(totalCount) - reviews.length > 0 ?  
                                        <DefaultButton 
                                            buttonStyle={{alignSelf:'center',marginLeft:moderateScale(5)}} 
                                            buttonText={'Load More'} 
                                            onPress={()=>callReviewsApi(reviews.length)} 
                                            showLoader={loader} 
                                            type='outline'
                                        /> 
                                        : null
                                }
                            </HorizontalSlider>
                        </View>
                    </View>
                </View>  :  null
            }
            {
                instituteData.length ? 
                    <View style={{...GlobalStyles.primaryCard}}>
                        <View style={styles.container}>
                            <Text style={styles.detailText}>People also viewed</Text>
                            {
                                instituteData.map((each,i)=>{
                                    const modified = each;
                                    modified. institute_slug_url = each.slug_url,
                                    modified.specialiazation = each.skill1 ? each.skill1 : '{}',
                                    modified.artist_name = each.institute_name,
                                    modified.profile_image=each.profile_image_path,
                                    modified.addedBy= each.owned_by;
                                    return   <ArtistBox artistData={each} key={i} />;
                                })
                            }
                        </View>
                    </View> : null
            }
        </>
    );
};

RecommendedArtist.propTypes = {
    mode:PropTypes.string.isRequired,
    userObj:PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        userObj: state.userObj,
    };
};


export default connect(mapStateToProps)(RecommendedArtist);

const styles = StyleSheet.create({
    container: {
        margin:moderateScale(20)
    },
    detailText:{
        fontWeight:'600',
        marginBottom:moderateScale(5)
    },
    actionBox:{
        flexDirection:'row',alignItems:'center',
        marginBottom:moderateScale(10)
    },
    images:{
        width:moderateScale(40),
        height:moderateScale(40)
    },
    borderBox:{
        borderBottomColor:'#F1F1F1',
        borderBottomWidth:1,
        marginLeft:moderateScale(15),
        paddingBottom:moderateScale(10),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'82%'
    },
    nameText:{
        color:APP_PINK_COLOR
    },
    seeAll:{color:APP_PINK_COLOR,fontWeight:'500',fontSize:moderateScale(14)},
    descText:{
        color:SUBNAME
    },
    reviewContainer:{
        borderColor:APP_PINK_COLOR,
        borderWidth:0.6,
        borderRadius:4,
        padding:8,
        minWidth:moderateScale(200),
        marginTop:6,
        marginRight:6
    },
    name:{
        fontWeight:'bold',
        marginLeft:5,
    },
    comment:{
        color:SUBNAME,fontSize:10,
        marginTop:moderateScale(4),
        maxWidth:moderateScale(200)
    },
    circle:{
        width:moderateScale(20),
        height:moderateScale(20),
        borderRadius:moderateScale(10),
        backgroundColor:APP_THEME_COLOR
    }
});
