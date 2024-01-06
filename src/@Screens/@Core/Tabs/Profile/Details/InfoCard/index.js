/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState } from 'react';
import {View,Text, ImageBackground,Share,ScrollView} from 'react-native';
import Image from 'react-native-image-progress';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../../../../@GlobalStyles';
import Config from '@Config/default';
import StarRating from '../../../../../../@GlobalComponents/StarRating';
import { connect } from 'react-redux';
import DefaultButton from '../../../../../../@GlobalComponents/DefaultButton';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import ARTNCRAFT from '../../../../../../assets/JsonFiles/FilterJsons/productcat_subcat.json';
import DANCE from '../../../../../../assets/JsonFiles/FilterJsons/dancecat_subcat.json';
import PHOTOGRAPHY from '../../../../../../assets/JsonFiles/FilterJsons/photographycat_subcat.json';
import EXERCISE from '../../../../../../assets/JsonFiles/FilterJsons/exercisecat_subcat.json';
import SPORTS from '../../../../../../assets/JsonFiles/FilterJsons/sportscat_subcat.json';
import MUSICAL from '../../../../../../assets/JsonFiles/FilterJsons/musicalcat_subcat.json';
import SINGING from '../../../../../../assets/JsonFiles/FilterJsons/singingcat_subcat.json';
import { GetSubCatValue } from '../../../../../../@Utils/helperFiles/GetCatSubcat';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { setLikeUnlikeUser,setFollowUnfollowUser, getUserDetails } from '../../../../../../@Endpoints/Auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import { getSkillRemoved } from '../../../../../../@Endpoints/Core/Tabs/EditProfile';
import * as userActions from '@Redux/actions/userActions';
import SellerProfileButton from '../../SellerAccount/SellerProfileButton';
import EditProfileImage from '../EditProfileImage';
import styles from './styles';
import ProfileCompletion from './ProfileCompletion';
import Capitalize from '../../../../../../@Utils/helperFiles/Capitalize';
import { getCountry,getState } from '../../../../../../@Utils/helperFiles/CardDetails';
import Likes from './LikesAndFollower/Likes';
import Followers from './LikesAndFollower/Followers';
import VerifyProfile from '../Verification/VerifyProfile';
 
const AllCategories =  [{
    'category':[
        ...ARTNCRAFT.category,...MUSICAL.category,...SINGING.category,
        ...DANCE.category,...PHOTOGRAPHY.category,...EXERCISE.category,
        ...SPORTS.category
    ]
}];
 
const CategoryList = AllCategories[0].category;
 
const {
    COLOR:{APP_PINK_COLOR,SUBNAME}
} = Config;
 
export const getAccountType = (accountId) =>{
    switch (accountId) {
    case '1':
        return 'Artist';   
    case '2':
        return 'Art Craft Business';
    case '3':
        return 'Art Institute';
    case '4':
        return 'Visitor/Buyer';
    default:
        return 'Artist';   
    }
};
 
const InfoCard = ({mode='PRIVATE',isUserBlocked=false,...props}) =>{
   
    const navigation = useNavigation();
    const {
        userObj:{
            user:{earned_point=0,level=1},
            user,
            publicUserData:{
                awards:publicAwards=[],
                institute:{
                    earned_point : publicPoints = 0,
                    level: publicLevel = 1
                },
                institute:{
                    slug_url : publicSlugUrl  = '',
                    contact_person: publicContactPerson = '',
                }
            },
            publicUserData
        },
        userObj,
        profileData:{awards:privateAwards},
        data,updateUserDetails
    } = props;

    const userData = mode === 'PRIVATE' ? user : publicUserData.institute;
    const userArticle = mode === 'PRIVATE' ? {slug_url:''} : publicUserData.article;
    const {
        institute_name,heart_count=0,
        follow_count=0,institute_desc = '',
        avg_rating,account_type_id,country,state,
        skill1,skill2,skill3,
        institute_id='',
        biography_article_id='',
        badges = '{}'
    } = userData;

    const {contest_winner = false,top_contributor=false,verified_profile=false,verified_seller=false} = JSON.parse(badges.length?badges : '{}');
 
    const [numberOfLikes, setNumberOfLikes] = useState(parseInt(heart_count));
    const [followCount, setFollowCount] = useState(parseInt(follow_count));
 
    const [isFollowing,setIsFollowing] = useState(mode === 'PUBLIC' ?publicUserData.login_follow_count : 0);
    const [isLiked, setIsLiked] = useState( mode === 'PUBLIC' ? publicUserData.login_heart_count : 0);
    const [showWholeDesciption, setShowWholeDesciption] = useState(false);
 
    const refreshProfile = () =>{
        getUserDetails()
            .then(res=>{
                const {data:{institute={},profileData={}}} = res;
                updateUserDetails(institute,profileData);
            })
            .catch();
    };
 
    const deleteSkill  = num =>{
        getSkillRemoved(num)
            .then(()=>{
                Toast.show('Specialization removed successfully',Toast.SHORT);
                refreshProfile();
            })
            .catch(()=>{
                Toast.show('Oops something went wrong',Toast.LONG);
            });
    };
 
    const getCategoryActionIcons = (skill,type) =>{
        if(type !== 1)
            return (
                <View style={{flexDirection:'row'}}>
                    <Icon name={'pen'} onPress={()=> navigation.navigate('Specialization',{currentSkill:skill,skillNum:type})} />
                    <Icon name={'trash'} onPress={()=> deleteSkill(type)} style={{marginLeft:moderateScale(10)}} />
                </View>
            );
        return <Icon name={'pen'} onPress={()=> navigation.navigate('Specialization',{currentSkill:skill,skillNum:type})} style={{marginLeft:moderateScale(10)}} />;
    };
 
    const renderChips = (type,showSubCat=false) =>{
        let skill = skill1;
        switch (type) {
        case 1:
            skill = skill1;
            break;
        case 2:
            skill = skill2;
            break;
        case 3:
            skill = skill3;
            break;
        default:
            skill = skill1;
            break;
        }
 
        if(skill !== '' && skill !== null)
        {
            const selected = JSON.parse(skill);
            const obj = CategoryList.find(x=>x.type.value === selected.cat);
            if(obj)
                return(
                    <View style={{flexDirection:'row',alignItems:'center',marginBottom :  showSubCat ? 8:0}}>
                        { showSubCat && <Icon color={APP_PINK_COLOR} name={'check'} style={{marginRight:5}} />}
                        <View style={{...styles.chips,marginRight :  showSubCat ? 0:moderateScale(12)}}>
                            <Text numberOfLines={1} style={{fontSize:moderateScale(11),maxWidth:moderateScale(100)}}>{obj.type.label}</Text>
                        </View>
                        {
                            showSubCat && GetSubCatValue(selected.cat,selected.subcat) !== '' ? 
                                <View style={styles.chips}>
                                    <Text style={styles.subCatText}>{GetSubCatValue(selected.cat,selected.subcat)}</Text>
                                </View>
                                : null
                        }
                        {(showSubCat && mode === 'PRIVATE') ? getCategoryActionIcons(skill,type) : null}
                    </View>
                );
            return null;
        }
        return null;
    };
 
    const renderSpecialized = (num=1) =>{
        return renderChips(num,true);
    };
 
    const setLike = () =>{
        setLikeUnlikeUser(isLiked,institute_id)
            .then()
            .catch();
        setIsLiked(isLiked ? 0 : 1);
        setNumberOfLikes(isLiked ? numberOfLikes-1 : numberOfLikes+1 );
    };
 
    const setUnfollow = () =>{
        setFollowUnfollowUser(isFollowing,institute_id)
            .then()
            .catch();
        setIsFollowing(isFollowing ? 0 : 1);
        setFollowCount(isFollowing ? followCount-1 : followCount+1 );
    };

    const shareProfile = async() =>{
        try {
            const result = await Share.share({
                message:`https://www.spenowr.com/artist/${publicSlugUrl}`,
                title:Capitalize(publicContactPerson),
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
 
    const checkSpecializationAddition = () =>{
        const sk1 = skill1 ? skill1 : '';
        const sk2 = skill2 ? skill2 : '';
        const sk3 = skill3 ? skill3 : '';
        if(!sk1.length) navigation.navigate('Specialization',{currentSkill:'{}',skillNum:1,createNew:true});
        else if(!sk2.length) navigation.navigate('Specialization',{currentSkill:'{}',skillNum:2,createNew:true});
        else if(!sk3.length) navigation.navigate('Specialization',{currentSkill:'{}',skillNum:3,createNew:true});
        else Toast.show('You have added all 3 Specializations',Toast.LONG);
    };
 
    const checkIfSpecializationCanBeAdded = () =>{
        const sk1 = skill1 ? skill1 : '';
        const sk2 = skill2 ? skill2 : '';
        const sk3 = skill3 ? skill3 : '';
        if(!sk1.length || !sk2.length || !sk3.length)
            return <Icon color={APP_PINK_COLOR} name={'plus'} onPress={()=>checkSpecializationAddition()} size={18} />;
        return null;
    };
    const checkArticleNavigation = () =>{
        navigation.navigate('ArticleDetails',{mediaId:biography_article_id,articleSlug:userArticle.slug_url});
    };

    const hasCountry = getCountry(country);
    const hasState = getState(country,state);

    const address = hasCountry ? hasState ? hasCountry.name+', '+hasState.value : hasCountry.name : '';

    const hasAnyBadge = top_contributor || contest_winner || verified_seller || verified_profile;

    const renderBadges = () => {
        return(
            <View style={{flexDirection:'row',marginVertical:moderateScale(10)}}>
                {
                    top_contributor && 
                                    <Image 
                                        resizeMode={'contain'} 
                                        source={require('@Assets/svgs/TopContributorBadge.svg')} 
                                        style={styles.badgeStyles}
                                    />
                }
                {
                    contest_winner && 
                                    <Image 
                                        resizeMode={'contain'} 
                                        source={require('@Assets/svgs/WinnerBadge.svg')} 
                                        style={styles.badgeStyles}
                                    />
                }
                {
                    verified_seller && 
                                    <Image 
                                        resizeMode={'contain'} 
                                        source={require('@Assets/svgs/VerifiedSellerBadge.svg')} 
                                        style={styles.badgeStyles}
                                    />
                }
                {
                    verified_profile && 
                                    <Image 
                                        resizeMode={'contain'} 
                                        source={require('@Assets/svgs/VerifiedUserBadge.svg')} 
                                        style={styles.badgeStyles}
                                    />
                }
            </View>
        );
    };


    const renderPublicActions = () =>{
        if(isUserBlocked) return <></>;
        return(
            <View style={styles.publicActions}>
                <TouchableOpacity onPress={()=>setLike()} style={isLiked ? styles.filled  : styles.outlined}>
                    <Text style={ isLiked ? styles.filledText :styles.outlinedText}> {isLiked ? 'Liked' : 'Like'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setUnfollow()} style={isFollowing ? styles.filled  : styles.outlined}>
                    <Text style={isFollowing ? styles.filledText  : styles.outlinedText}>{ isFollowing ? 'Following' :'Follow'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>shareProfile()} style={styles.outlined}>
                    <Text style={styles.outlinedText}>Share</Text>
                </TouchableOpacity>
            </View>
        );
    };
 
    const checkIfUserBlockedRenderer = () => {
        if(mode === 'PUBLIC' && isUserBlocked) 
            return (
                <View style={{...GlobalStyles.primaryCard,marginTop:moderateScale(10),padding:moderateScale(10)}}>
                    <Text style={{alignSelf:'center',color:SUBNAME,fontSize:moderateScale(10)}}>You have blocked this user.</Text>
                </View>
            );
        return(
            <>
                <SellerProfileButton mode={mode} /> 
                <View style={{...GlobalStyles.primaryCard,marginTop:moderateScale(10)}}>
                    <View style={styles.aboutWrapper}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={styles.aboutMeText}>About Me</Text>
                            {(biography_article_id && mode !== 'PRIVATE') ? <DefaultButton 
                                buttonStyle={{width:'25%'}} buttonText={'Biography'} 
                                onPress={() => checkArticleNavigation()} 
                                showLoader={false} 
                                textStyle={{fontSize:moderateScale(10)}}  
                            /> : null}
                        </View>
                        <Text numberOfLines={showWholeDesciption ? null : 3} style={styles.aboutMeDescription}>
                            {
                                institute_desc 
                                    ? institute_desc
                                    : 'Welcome to my page! Please visit my portfolio and provide your constructive feedback with what you would like see more.'
                            }
                        </Text>
                        {(!showWholeDesciption && institute_desc.length) > 100  && <Text onPress={()=>setShowWholeDesciption(true)} style={styles.seeMore}>See more</Text> }
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={styles.aboutMeText}>Specialized In</Text>
                            {mode === 'PRIVATE' && checkIfSpecializationCanBeAdded()}
                        </View>
                        <View style={{marginTop:moderateScale(10)}}>
                            {renderSpecialized(1)}
                            {renderSpecialized(2)}
                            {renderSpecialized(3)}
                        </View>
                        {
                            hasAnyBadge &&
                            <View>
                                <Text style={styles.aboutMeText}>Badges</Text>
                                {renderBadges()}
                            </View>
                        }
                    </View>
                </View>
            </>
        );
    };
 
    return(
        <>
            <View style={GlobalStyles.primaryCard}>
                <ImageBackground resizeMode={'cover'} source ={require('../../../../../../assets/svgs/flag.svg')} style={styles.flagImg} >
                    <Text style={styles.number}>{mode === 'PRIVATE' ? level  : publicLevel}</Text>
                    <Text style={styles.level}>Level</Text>
                </ImageBackground>
                <View style={styles.container}>
                    <View style={styles.rowContainer}>
                        <EditProfileImage mode={mode} updateUserDetails={updateUserDetails} userObj={userObj} />
                        <View style={{marginLeft:moderateScale(20),justifyContent:'center'}}>
                            <Text numberOfLines={1} style={styles.name}>{institute_name}</Text>
                            <Text style={styles.subName}>{getAccountType(account_type_id)}</Text>
                            <View style={{...styles.rowContainer,alignItems:'center'}}>
                                {hasCountry && <Image resizeMode={'contain'} source ={require('../../../../../../assets/svgs/location.svg')} style={styles.locationImg} />}
                                <Text numberOfLines={2} style={styles.locationText}>{address}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{...styles.rowContainer,paddingVertical:moderateScale(6)}}>
                        {
                            (avg_rating !== '0.0') && 
                             <View style={styles.justifyAlign}>
                                 <Text style={styles.ratingText}>{avg_rating}/5</Text>
                                 <StarRating starSelected={avg_rating} />
                             </View>
                        }
                        {
                            (avg_rating === '0.0') && 
                             <View style={styles.justifyAlign}>
                                 <Text style={styles.noRatingText}>No Ratings</Text>
                             </View>
                        }
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.chipBox}>
                                {renderChips(1)}
                                {renderChips(2)}
                                {renderChips(3)}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={[styles.rowContainer,styles.shortInfoWrapper]}>
                        <Likes id={institute_id} isUserBlocked={isUserBlocked} mode={mode} numberOfLikes={numberOfLikes} />
                        <Followers  followCount={followCount} id={institute_id} isUserBlocked={isUserBlocked} mode={mode} />
                        <View style={styles.justifyAlign}>
                            <Text style={styles.numberText}>{mode === 'PRIVATE' ? privateAwards.length : publicAwards.length}</Text>
                            <Text style={styles.locationText}>Awards</Text>
                        </View>
                        <View style={styles.justifyAlign}>
                            <Text style={styles.numberText}>{ mode === 'PRIVATE' ? earned_point : publicPoints}</Text>
                            <Text style={styles.locationText}>S points</Text>
                        </View>
                    </View>
                    <ProfileCompletion data={data} mode ={mode} />
                    {(mode !== 'PUBLIC') && <VerifyProfile />}
                    {(mode === 'PUBLIC') && renderPublicActions()}
                </View>
            </View>
            {checkIfUserBlockedRenderer()}
        </>
    );
};
 
InfoCard.propTypes = {
    data:PropTypes.object,
    isUserBlocked : PropTypes.bool,
    mode:PropTypes.string.isRequired,
    profileData:PropTypes.object.isRequired,
    updateUserDetails:PropTypes.func.isRequired,
    userObj:PropTypes.object.isRequired,
};
 
const mapStateToProps = (state) => {
    return {
        userObj: state.userObj,
        profileData: state.profileData
    };
};
const mapDispatchToProp = (dispatch) => ({
    updateUserDetails:(instituteObj,profileObj) =>
        dispatch(userActions.updateUserDetails(instituteObj,profileObj))
});
 
export default connect(mapStateToProps,mapDispatchToProp)(InfoCard);