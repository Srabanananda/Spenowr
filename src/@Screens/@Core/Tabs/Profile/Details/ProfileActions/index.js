/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {
    View, TouchableOpacity, Text, ImageBackground, Image
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../../../../@GlobalStyles';
import Config from '@Config/default';
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

const { NEW_IMG_BASE, DUMMY_IMAGE_URL } = Config;


const ProfileActions = ({ mode = 'PRIVATE',...props }) => {
    const maxItem = 3
    const {
        userObj: {
            user: { profile_views, earned_point = 0, credit_point = 0, ai_point=0 },
            userProfile: { seller_profile, mobile, email, first_name, last_name, subscription_plan },
            publicUserData: {
                awards: publicAwards,
                courses: publicCourses,
                galleryAlbumImages: publicArtworks,
                QuoteData: publicQuotesPoems,
                products: publicProducts,
                articleData: publicStoryBlogs,
                workexp : publicWorkExp
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
    const navigation = useNavigation();
    
    const actions = [
        { name: 'Portfolio', desc: 'Showcase awards, events, press releases etc.', img: require('../../../../../../assets/svgs/portfolio.svg'), route: 'PortfolioScreen', routeParams: {} },
        { name: 'Series', desc: 'Series to represent your creatives', img: require('../../../../../../assets/svgs/artwork.svg'), route: 'MySeries', routeParams: {} },
        { name: 'Artworks', desc: 'Photo Gallery to represent your creatives', img: require('../../../../../../assets/svgs/artwork.svg'), route: 'ArtWorksScreen', routeParams: { subscription_plan: subscription_plan, ai_point: ai_point } },
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
                    style={[{ backgroundColor: getRandomColor() }, styles.smallImgBoc,]}
                />
                {
                    count > 0 && itemNum === maxItem - 1 ?
                        <View style={styles.moreOptions}>
                            <View style={styles.imageOverlay} />
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
                </View>
            );
        }
        else return <NoItems />;
    };

    const renderEachAction = (item, index) => {
        const isDataAvailable = checkData(item.name).length;
        if (!isDataAvailable && mode !== 'PRIVATE') return null;
        return (
            <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(item.route, { 'mode': mode, ...item.routeParams })}
                style={{ ...GlobalStyles.primaryCard, ...styles.cardWrapper }}
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

