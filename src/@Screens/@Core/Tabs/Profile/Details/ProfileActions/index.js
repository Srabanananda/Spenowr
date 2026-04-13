/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, {useState} from 'react';
import {
    View, TouchableOpacity, Text, ImageBackground, Image, Pressable
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../../../../@GlobalStyles';
import Config from '@Config/default';
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GetWritingImages from '../../../../../../@Utils/helperFiles/GetWritingImages';
import { getWritingsTextStyle } from '../../../../../../@GlobalComponents/WritingsView';
import ServiceCard from './ServiceActions';
import styles from './styles';
import StoryBlogCard from './Stories_BlogsActions';
import { getRandomColor } from '../../../../../../@Utils/helperFiles/helpers';
import WorkExpCard from './workExpActions';
import JobsCardAction from './JobsCardAction';

const { NEW_IMG_BASE, DUMMY_IMAGE_URL ,DARKGRAY, LIGHTGREY, WHITE, BLACK, APP_PINK_COLOR} = Config;

const ProfileActions = ({ mode = 'PRIVATE',...props }) => {
    const maxItem = 3
    const {
        userObj: {
            user: { profile_views, earned_point = 0, credit_point = 0, ai_point=0, animate_point=0},
            userProfile: { seller_profile, mobile, email, first_name, last_name, subscription_plan },
            publicUserData: {
                awards: publicAwards,
                courses: publicCourses,
                galleryAlbumImages: publicArtworks,
                QuoteData: publicQuotesPoems,
                products: publicProducts,
                articleData: publicStoryBlogs,
                workexp : publicWorkExp,
            }
        },
        profileData: {
            artworks: privateArtworks,
            awards: privateAwards,
            products: privateProducts,
            services: privateServices,
            writings: privateQuotesPoems,
            storyBlogs: privateStoryBlogs,
            projects: privateProjects,
            jobs: privateJobs,
            workExp : privateWorkExp,
            series: privateSeries,
        },
    } = props;
    console.log('artworks',props);
    const jsonData = props
    const profileData = jsonData
    const publicjsonData = props
    const publicUserData = publicjsonData
    console.log('publicUserData.userObj.publicUserData.institute.facebook_url 62',publicUserData.userObj.publicUserData.institute.facebook_url);

// Access social sites followers property
const facebookFollowers = profileData.userObj.user.facebook_followers;
const InstaFollowers = profileData.userObj.user.instagram_followers;
const LinkedinFollowers = profileData.userObj.user.linkedin_followers;
const PintrestFollowers = profileData.userObj.user.pinterest_followers;
const TiktokFollowers = profileData.userObj.user.tiktok_followers;

// Access social sites URL propert
const facebookURL = profileData.userObj.user.facebook_url;
const InstagramURL = profileData.userObj.user.instagram_url;
const LinkedinURL = profileData.userObj.user.linkedin_url;
const PintrestURL = profileData.userObj.user.pinterest_url;
const TiktokURL = profileData.userObj.user.tiktok_url;

// Access social sites followers property public
const facebookFollowersPublic = publicUserData.userObj.publicUserData.institute.facebook_followers;
const InstaFollowersPublic = publicUserData.userObj.publicUserData.institute.instagram_followers;
const LinkedinFollowersPublic = publicUserData.userObj.publicUserData.institute.linkedin_followers;
const PinterestFollowersPublic = publicUserData.userObj.publicUserData.institute.pinterest_followers;
const TiktokFollowersPublic = publicUserData.userObj.publicUserData.institute.tiktok_followers;

// Access social sites URL property of Public
const facebookURLPublic = publicUserData.userObj.publicUserData.institute.facebook_url;
const InstagramURLPublic = publicUserData.userObj.publicUserData.institute.instagram_url;
const LinkedinURLPublic = publicUserData.userObj.publicUserData.institute.linkedin_url;
const PinterestURLPublic = publicUserData.userObj.publicUserData.institute.pinterest_url;
const TiktokURLPublic = publicUserData.userObj.publicUserData.institute.tiktok_url;

console.log('profileData 67',profileData);

    const navigation = useNavigation();
    const topTabs = [
        { icon: "facebook", label: "Facebook", 
        followers: mode === 'PRIVATE' ? facebookFollowers : facebookFollowersPublic, 
        url: mode === 'PRIVATE' ? facebookURL : facebookURLPublic },
        { icon: "instagram", label: "Instagram", 
        followers: mode === 'PRIVATE' ? InstaFollowers : InstaFollowersPublic, 
        url: mode === 'PRIVATE' ? InstagramURL : InstagramURLPublic },
        { icon: "linkedin", label: "LinkedIn", 
        followers: mode === 'PRIVATE' ? LinkedinFollowers : LinkedinFollowersPublic, 
        url: mode === 'PRIVATE' ? LinkedinURL : LinkedinURLPublic },
        { icon: "pinterest-square", label: "Pinterest", 
        followers: mode === 'PRIVATE' ? PintrestFollowers : PinterestFollowersPublic, 
        url: mode === 'PRIVATE' ? PintrestURL : PinterestURLPublic },
        { icon: "tiktok", label: "Tiktok", 
        followers: mode === 'PRIVATE' ? TiktokFollowers : TiktokFollowersPublic, 
        url: mode === 'PRIVATE' ? TiktokURL : TiktokURLPublic },
    ].filter(tab => 
        tab.followers !== null && 
        tab.followers !== undefined && 
        tab.followers !== 0 && 
        tab.followers !== '' &&
        tab.url !== null && 
        tab.url !== undefined && 
        tab.url !== '' &&
        tab.url !== '/'
    );
      const [activeTab, setActiveTab] = useState(0);

    // Function to format large numbers
const formatNumber = (number) => {
    if (number < 1000) {
        // return number.toString();
        return number;
    } else if (number < 1000000) {
        const formattedNumber = (number / 1000).toFixed(1);
        return formattedNumber.endsWith('.0') ? Math.floor(formattedNumber) + 'K' : formattedNumber + 'K';
    } else {
        return (number / 1000000).toFixed(1) + 'M';
    }
};

    const actions = [
        { name: 'Portfolio', desc: 'Showcase awards, events, press releases etc.', img: require('../../../../../../assets/svgs/portfolio.svg'), route: 'PortfolioScreen', routeParams: {} },
        { name: 'Influencer Profile', desc: 'Offer Influencer marketing packages.', img: require('../../../../../../assets/svgs/influncer.svg'), route: 'InfluencerProfile', routeParams: {} },
        { name: 'Series', desc: 'Series to represent your creatives', img: require('../../../../../../assets/svgs/artwork.svg'), route: 'MySeries', routeParams: {} },
        { name: 'Artworks', desc: 'Photo Gallery to represent your creatives', img: require('../../../../../../assets/svgs/artwork.svg'), route: 'ArtWorksScreen', routeParams: { subscription_plan: subscription_plan, ai_point: ai_point, animate_point: animate_point } },
        { name: 'Quotes/Poems', desc: 'Showcase your creative quotes/poems writing skills', img: require('../../../../../../assets/svgs/writeups.svg'), route: 'WriteupScreen', routeParams: { currentTab: 'writings', subscription_plan: subscription_plan, ai_point: ai_point } },
        { name: 'Stories/Blogs', desc: 'Showcase your creative stories/blogs writing skills', img: require('../../../../../../assets/svgs/writeups.svg'), route: 'WriteupScreen', routeParams: { currentTab: 'articles', subscription_plan: subscription_plan, ai_point: ai_point } },
        { name: 'Products', desc: 'Sell your art products through marketplace', img: require('../../../../../../assets/svgs/products.svg'), route: 'SellerProfile', routeParams: {} },
        { name: 'Services', desc: 'Market custom artwork or trainings you offer', img: require('../../../../../../assets/svgs/services.svg'), route: 'ServicesScreen', routeParams: {} },
        { name: 'Projects', desc: 'Add your Project here', img: require('../../../../../../assets/svgs/services.svg'), route: 'UserProject', routeParams: {} },
        { name: 'Jobs', desc: 'Add your job hiring here', img: require('../../../../../../assets/svgs/services.svg'), route: 'MyJobs', routeParams: {} },
        { name: 'Work Experience', desc: 'Add your work experiences here', img: require('../../../../../../assets/svgs/services.svg'), route: 'MyWorkExp', routeParams: {} }
    ];
    const activitites = [
        {
        name: "Spenowr Points",
        points: earned_point,
        img: require("../../../../../../assets/svgs/points.svg"),
        route: "SpointLogs",
        routeParams: {},
      },
      {
        name: "Reward Earnings",
        points: 0,
        img: require("../../../../../../assets/svgs/rewards.svg"),
        route: "RedeemReward",
        routeParams: {},
      },
      {
        name: "My Earnings",
        points: 0,
        img: require("../../../../../../assets/svgs/earnings.svg"),
        route: "MyEarnings",
        routeParams: {},
      },
      {
        name: "Insights",
        points: profile_views,
        img: require("../../../../../../assets/svgs/insights.svg"),
        route: "ProfileInsights",
        routeParams: {},
      },
      {
        name: "ChatGPT AI Credits",
        points: ai_point,
        img: require("../../../../../../assets/svgs/earnings.svg"),
        route: "CreditPoints",
        routeParams: { type: "AICredits", subscription_plan: subscription_plan },
      },
      {
        name: "Available Job Credits",
        points: credit_point,
        img: require("../../../../../../assets/svgs/earnings.svg"),
        route: "CreditPoints",
        routeParams: {
          type: "JobCredits",
          mobile: mobile,
          email: email,
          name: `${first_name} ${last_name}`,
        },
      },
      {
        name: "Animate Credits",
        points: animate_point,
        img: require("../../../../../../assets/svgs/earnings.svg"),
        route: "CreditPoints",
        routeParams: { type: "AnimateCredits", subscription_plan: subscription_plan },
      },
    ];

    const NoItems = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: moderateScale(45) }}>
                <Image resizeMode={'contain'} source={require('../../../../../../assets/svgs/noItem.svg')} style={{ ...styles.images, marginBottom: moderateScale(5) }} />
                <Text style={styles.noItemText}>No Items</Text>
            </View>
        );
    };

    const DisplaySmallImage = ({ content, type, count = 0, itemNum }:any) => {
        const {
            award_image_thumbnail_path = '',
            media_thumbnail_path = '',
            primary_thumbnail_image = '',
            course_image_path = '',
            image_path = '',
            reduce_workexp_image = '',
            series_image = ''
        } = content;

        let MEDIA = NEW_IMG_BASE;

        switch (type) {
        case 'Portfolio':
            MEDIA = MEDIA + award_image_thumbnail_path;
            break;

        case 'Series':
            MEDIA = MEDIA + series_image;
            break;

        case 'Artworks':
            MEDIA = MEDIA + media_thumbnail_path;
            break;

        case 'Products':
            MEDIA = MEDIA + primary_thumbnail_image;
            break;
            case 'Influencer Profile':
                MEDIA = MEDIA + primary_thumbnail_image;
                break;
        case 'Services':
            MEDIA = MEDIA + course_image_path;
            break;
        
        case 'Work Experience':
            MEDIA = reduce_workexp_image ? MEDIA + reduce_workexp_image : DUMMY_IMAGE_URL;
            break;
    
        case 'Projects':
            {
                const isImagePath = image_path !== '' && image_path !== '/' && image_path !== null && image_path !== undefined;
                MEDIA = isImagePath ? MEDIA + image_path : DUMMY_IMAGE_URL;
            }
            break;
                
        case 'Jobs':
            {
                const isImagePath = image_path !== '' && image_path !== '/' && image_path !== null && image_path !== undefined;
                MEDIA = isImagePath ? MEDIA + image_path : DUMMY_IMAGE_URL;
            }
            break;

        default:
            break;
        }

        if (type === 'Quotes/Poems') {
            const { image_type, theme_image, media_thumbnail_path } = content;
            if (media_thumbnail_path !== '' && media_thumbnail_path !== null)
                MEDIA = MEDIA + media_thumbnail_path;
            else {
                const ImgObj = GetWritingImages(image_type, theme_image);
                if (ImgObj)
                    MEDIA = ImgObj.local_image;
            }
        }
        const ifQuoteHasNoUploadedImage = type === 'Quotes/Poems' && (content.media_thumbnail_path === null || content.media_thumbnail_path === '');
        return (
            <View>
                <Image
                    source={ifQuoteHasNoUploadedImage ? MEDIA : { uri: MEDIA }}
                    style={[
                        { backgroundColor: getRandomColor() },
                        [styles.smallImgBoc, {width: 95, height: 90}],
                        (type === 'Portfolio' || type === 'Artworks') && { width: 95, height: 90 ,} // Example height and width values                    
                    ]}
                />
                {
                    count > 0 && itemNum === maxItem - 1 ?
                        <View style={[styles.moreOptions, {width:95,
                            height:90}]}>
                            <View style={[styles.imageOverlay, {width:95,height:90}]} />
                            <Image
                                resizeMode={'contain'}
                                source={require('../../../../../../assets/svgs/forward.svg')}
                                style={styles.forwardArrow} />
                            <Text style={styles.countText}>View More</Text>
                        </View>
                        :
                        type === 'Quotes/Poems' ?
                            <View style={styles.moreOptions}>
                                <Text style={[getWritingsTextStyle(content), { fontSize: moderateScale(10) }]}>{content.title}</Text>
                            </View>
                            : null

                }
            </View>
        );
    };

    const checkData = (type) => {
        let data = [];
        switch (type) {
        case 'Portfolio':
            data = mode === 'PRIVATE' ? privateAwards : publicAwards;
            break;

        case 'Artworks':
            data = mode === 'PRIVATE' ? privateArtworks : publicArtworks;
            break;

        case 'Quotes/Poems':
            data = mode === 'PRIVATE' ? privateQuotesPoems : publicQuotesPoems;
            break;

        case 'Stories/Blogs':
            data = mode === 'PRIVATE' ? privateStoryBlogs : publicStoryBlogs;
            break;

        case 'Products':
            data = mode === 'PRIVATE' ? privateProducts : publicProducts;
            break;

        case 'Services':
            data = mode === 'PRIVATE' ? privateServices : publicCourses;
            break;

        case 'Projects':
            data = mode === 'PRIVATE' ? privateProjects : privateProjects;
            break;

        case 'Jobs':
            data = mode === 'PRIVATE' ? privateJobs : [];
            break;

        case 'Work Experience':
            data = mode === 'PRIVATE' ? privateWorkExp : publicWorkExp;
            break;
        case 'Influencer Profile':
                data = mode === 'PRIVATE' ?topTabs : topTabs;
                break;
        case 'Series':
            data = mode === 'PRIVATE' ? privateSeries : [];
            break;
        default:
            break;
        }
        return data;
    };

    const getImages = (type) => {

        let data = checkData(type);
        if (data.length) {
            if (type === 'Services' || type === 'Work Experience')
                return (
                    <>
                        <View style={styles.ServiceCardViewWrapper}>
                            {
                                data.map((item, index) => (
                                    index > 2 ? null :
                                        type === 'Services' ? <ServiceCard key={index} service={item} /> : <WorkExpCard exp={item} key={index} />
                                ))
                            }

                        </View>
                        {
                            data.length > 2 && <Text style={styles.viewMore}>View More</Text>
                        }
                    </>
                );

                if (type === 'Jobs')
                    return (
                        <>
                            <View style={styles.ServiceCardViewWrapper}>
                            {
                                data.map((item, index) => (
                                    index > 2 ? null :
                                        <JobsCardAction key={index} jobsAction={item} />
                                ))
                            }
    
                            </View>
                            {
                                data.length > 2 && <Text style={styles.viewMore}>View More</Text>
                            }
                        </>
                    );

            if (type === 'Stories/Blogs')
                return (
                    <>
                        <View style={styles.ServiceCardViewWrapper}>
                            {
                                data.map((item, index) => (
                                    index > 2 ? null :
                                        <StoryBlogCard key={index} storyBlog={item} />
                                ))
                            }

                        </View>
                        {
                            data.length > 2 && <Text style={styles.viewMore}>View More</Text>
                        }
                    </>
                );

            return (
                <View style={{ ...styles.displayBoxWrapper }}>
                {type === 'Influencer Profile' ?
                 <View style={{ flexDirection: "row",alignItems: "center",justifyContent: "center",flexWrap: "wrap"}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    
            {topTabs.map((val, index) => {
              return (
                <View key={index} style={{ alignItems: 'center', height: 80, bottom:20 }}>
                    {mode === 'PRIVATE' ?
                    <>
                   <Pressable
                   key={index}
                   onPress={() => {
                       setActiveTab(index);
                       switch (index) {
                           case 0:
                            {facebookURL === "" || facebookURL === null ? '' :
                               navigation.navigate('SocialWebViewScreen', {url: facebookURL})}
                               break;
                           case 1:
                            {InstagramURL === "" || InstagramURL === null ? '' :
                            navigation.navigate('SocialWebViewScreen', {url: InstagramURL})}
                            console.log('InstagramURL',InstagramURL);
                               break;
                           case 2:
                            {LinkedinURL === "" || LinkedinURL === null ? '' :
                            navigation.navigate('SocialWebViewScreen', {url: LinkedinURL})}
                               break;
                           case 3:
                            {PintrestURL === "" || PintrestURL === null ? '' :
                            navigation.navigate('SocialWebViewScreen', {url: PintrestURL})}
                               break;
                           case 4:
                            {TiktokURL === "" || TiktokURL === null ? '' :
                            navigation.navigate('SocialWebViewScreen', {url: TiktokURL})}
                               break;
                           default:
                               break;
                       }
                   }}
                    style={styles.tabButton}
                  >
                    {index === 4 ? (
                      <Image
                        source={require("../../../../../../assets/svgs/tiktok.svg")}
                        style={{height: 20,width: 20,marginBottom: 1,tintColor: activeTab === index ? APP_PINK_COLOR : BLACK}}
                        resizeMode="contain"
                      />
                    ) : (
                      <FontAwesome
                        name={val.icon}
                        size={20}
                        color={activeTab === index ? APP_PINK_COLOR : BLACK}
                      />
                    )}
                    <Text
                      style={{
                        fontSize:11,
                        color:  '#EF2D56',
                        marginTop: 5, // Adjust as needed
                      }}
                    >
                      {val.label}
                    </Text>
                  </Pressable>
                    </>    
                    :
                    <>
                   <Pressable
                   key={index}
                   onPress={() => {
                       setActiveTab(index);
                       switch (index) {
                           case 0:
                            {facebookURLPublic === "" || facebookURLPublic === null ? '' :
                               navigation.navigate('SocialWebViewScreen', {url: facebookURLPublic})}
                               break;
                           case 1:
                            {InstagramURLPublic === "" || InstagramURLPublic === null ? '' :
                            navigation.navigate('SocialWebViewScreen', {url: InstagramURLPublic})}
                            console.log('InstagramURLPublic',InstagramURLPublic);
                               break;
                           case 2:
                            {LinkedinURLPublic === "" || LinkedinURLPublic === null ? '' :
                            navigation.navigate('SocialWebViewScreen', {url: LinkedinURLPublic})}
                               break;
                           case 3:
                            {PinterestURLPublic === "" || PinterestURLPublic === null ? '' :
                            navigation.navigate('SocialWebViewScreen', {url: PinterestURLPublic})}
                               break;
                           case 4:
                            {TiktokURLPublic === "" || TiktokURLPublic === null ? '' :
                            navigation.navigate('SocialWebViewScreen', {url: TiktokURLPublic})}
                               break;
                           default:
                               break;
                       }
                   }}
                    style={styles.tabButton}
                  >
                    {index === 4 ? (
                      <Image
                        source={require("../../../../../../assets/svgs/tiktok.svg")}
                        style={{height: 20,width: 20,marginBottom: 1,tintColor: activeTab === index ? APP_PINK_COLOR : BLACK}}
                        resizeMode="contain"
                      />
                    ) : (
                      <FontAwesome
                        name={val.icon}
                        size={20}
                        color={activeTab === index ? APP_PINK_COLOR : BLACK}
                      />
                    )}
                    <Text
                      style={{
                        fontSize:11,
                        color:  '#EF2D56',
                        marginTop: 5, // Adjust as needed
                      }}
                    >
                      {val.label}
                    </Text>
                  </Pressable>
                    </>
                }
              

                  {mode === 'PRIVATE' ?
                  <>
                <Text style={{ fontSize: 12, fontWeight:'bold', color:'#EF2D56', bottom:15 }}>
                    {val.label === 'Facebook' ? formatNumber(facebookFollowers) : ''}
                    {val.label === 'Instagram' ? formatNumber(InstaFollowers) : ''}
                    {val.label === 'LinkedIn' ? formatNumber(LinkedinFollowers) : ''}
                    {val.label === 'Pinterest' ? formatNumber(PintrestFollowers) : ''}
                    {val.label === 'Tiktok' ? formatNumber(TiktokFollowers) : ''}
                  </Text>
                  </>
                  :
                  <>
                  <Text style={{ fontSize: 12, fontWeight:'bold', color:'#EF2D56', bottom:15 }}>
                    {val.label === 'Facebook' ? formatNumber(facebookFollowersPublic || 0) : ''}
                    {val.label === 'Instagram' ? formatNumber(InstaFollowersPublic || 0) : ''}
                    {val.label === 'LinkedIn' ? formatNumber(LinkedinFollowersPublic || 0) : ''}
                    {val.label === 'Pinterest' ? formatNumber(PinterestFollowersPublic || 0) : ''}
                    {val.label === 'Tiktok' ? formatNumber(TiktokFollowersPublic || 0) : ''}
                  </Text>
                  </>
                  
                }
                
                </View>
              );
            })}
          </View>
          
                </View>   :
<>
                {
                    data.map((item, index) => (
                        index > maxItem - 1 ?
                            null : 
                            <DisplaySmallImage
                                content={item}
                                count={data.length - 6}
                                itemNum={index}
                                key={index}
                                type={type}
                            />
                            
                    ))
                    
                }
                </>
            }
                
               
            </View>
            );
        }
        else return <NoItems />;
    };

    const renderEachAction = (item, index) => {
    const isDataAvailable = checkData(item.name).length;
    if (!isDataAvailable && mode !== 'PRIVATE') return null;
    const isTouchableDisabled = item.name === 'Influencer Profile' && mode === 'PUBLIC';

    // Hide Influencer Profile if no valid social media tabs are available
    if (item.name === 'Influencer Profile' && topTabs.length === 0) {
        return null;
    }

    return (
        <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.route, { 'mode': mode, ...item.routeParams })}
            style={{ ...GlobalStyles.primaryCard, ...styles.cardWrapper }}
            disabled={isTouchableDisabled}
        >
            <View style={styles.actionBox}>
                <Image resizeMode={'contain'} source={item.img} style={styles.images} />
                <View style={styles.borderBox}>
                    <View>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.descText}>{item.desc}</Text>
                    </View>
                    <Icon color={'#C1C1C1'} name={'angle-right'} />
                </View>
            </View>
            {getImages(item.name)}
        </TouchableOpacity>
    );
};

    const renderEachActivity = (item, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(item.route, { 'mode': mode, ...item.routeParams})}
                style={[GlobalStyles.primaryCard, styles.activityBox]}
            >
                <ImageBackground resizeMode={'contain'} source={item.img} style={styles.activityImg} >
                    <Text style={styles.pointsText}>{item.points}</Text>
                </ImageBackground>
                <Text style={styles.nameBigText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    let tempActions = actions;

    if (seller_profile !== '1' && mode === 'PRIVATE')
        tempActions = actions.filter(x => x.name !== 'Products');

    return (
        <>
            <View style={{ marginTop: moderateScale(10) }}>
                {
                    tempActions.map((item, index) => (
                        renderEachAction(item, index)
                    ))
                }
            </View>
            {
                (mode === 'PRIVATE') &&
                (
                    <View style={styles.eachActivityWrapper}>
                        {
                            activitites.map((item, index) => (
                                renderEachActivity(item, index)
                            ))
                        }
                    </View>
                )
            }
        </>
    );
};

ProfileActions.propTypes = {
    mode: PropTypes.string.isRequired,
    profileData: PropTypes.object.isRequired,
    userObj: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        userObj: state.userObj,
        profileData: state.profileData
    };
};

export default connect(mapStateToProps)(ProfileActions);

