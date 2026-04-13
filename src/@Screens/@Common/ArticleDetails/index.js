/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect, useCallback } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../@GlobalStyles';
import PropTypes from 'prop-types';
import { getArticleDetails } from '../../../@Endpoints/Core/Tabs/Common';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import * as productDetailActions from '../../../@Redux/actions/productDetailActions';
import styles from './styles';
import AddReview from '../ProductDetails/AddReview';
import Content from './Content';
import ErrorBoundary from 'react-native-error-boundary';
import FallBackUI from '../../../@GlobalComponents/FallBackUI';
import ArtistInfo from './ArtistInfo';
import Config from '@Config/default';
import {TouchableRipple} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import { SafeAreaView } from 'react-native-safe-area-context';

const { NEW_IMG_BASE, DUMMY_IMAGE_URL } = Config;

const ArticleDetailScreen = ({...props}) =>{
    
    const {route,navigation,updateArticleDetails} = props;
    const {articleSlug} = route.params;
    const [loader, setLoader] = useState(true);
    const [articleId, setArticleId] = useState('');

    const [recommendedArticles, setRecommendedArticles] = useState([]);
    const [rest, setRest] = useState([]);
    const [topfeature, setTopFeature] = useState([]);
    const [otherSeries, setOtherSeries] = useState([]);
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (articleSlug) {
                callApi(); // Re-fetch the data when the screen gains focus
            }
        });
    
        return () => {
            unsubscribe();
            TrackPlayer.pause(); // Pause the player on unmount
            TrackPlayer.reset(); // Reset the player on unmount
        };
    }, [navigation, articleSlug]); // Track changes to `navigation` and `articleSlug`
    

    useFocusEffect(
        useCallback(() => {
            return () => {
                TrackPlayer.pause(); // Pause the player when screen loses focus
                TrackPlayer.reset(); // Reset the player when screen loses focus
            };
        }, [])
    );

    // useEffect(()=>{
    //     if(recommendedArticles.length > 0 && rest.length === 0){
    //         setRest(recommendedArticles.length > 0 ? recommendedArticles.splice(1,3) : []);
    //     }
    // },[recommendedArticles]);

    const callApi = () => {
        getArticleDetails(articleSlug)
            .then(res=>{
                console.log('====================================');
                console.log('resresresgetArticleDetails',res);
                console.log('====================================');
                if(res.data != null && res.data.article){
                    setArticleId(res.data.article.article_id);
                    updateArticleDetails(res.data);
                    let topCategoryArticle = res?.data?.topCategoryArticle
                    setRecommendedArticles(topCategoryArticle);
                    setRest(topCategoryArticle.length > 0 ? topCategoryArticle : []);
                    setTopFeature(res?.data?.topFeaturedArticles);
                    setOtherSeries(res?.data?.otherSeriesDetails);
                    setLoader(false);
                } else {
                    setTimeout(()=>{navigation.goBack();},300);
                    Toast.show('Oops Could not get Article Details',Toast.LONG);
                }
            }).catch(()=>{
                Toast.show('Oops Could not get Article Details',Toast.LONG);
                setTimeout(()=>{navigation.goBack();},300);
            });
    };

    const truncateText = (text, limit) => {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    };

    const renderRecommendedArticles = () => {
        return (
            <>
            <Text style={{fontSize: 21, fontWeight: 'bold', marginBottom: 10, marginTop: 20}}>
            Other Episodes Of the Series
            </Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {rest && rest.map((each, position) => {
                    return (
                        <TouchableRipple 
                            key={position+'Element'}
                            onPress={() => {
                                navigation.push('ArticleDetails', { articleSlug: each.slug_url });
                            }}
                            style={{
                                width: 100, // Set a width for each item
                                marginRight: 16, // Spacing between items
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column', // Stack image and text vertically
                                    width: '100%',
                                    alignItems: 'center',
                                }}
                            >
                                <View style={{
                                    width: '100%',
                                    height: 80, // Set a fixed height for the image
                                }}>
                                    <Image
                                        resizeMode={'stretch'}
                                        source={{uri: each.article_image_thumbnail_path !== "" ? NEW_IMG_BASE + each.article_image_thumbnail_path : DUMMY_IMAGE_URL}}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </View>
                                <View style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    marginTop: 8,
                                }}>
                                    <Text style={{fontSize: 14, textAlign: 'center'}}>
                                        {truncateText(each.article_title, 20)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableRipple>
                    );
                })}
            </ScrollView>
        </>
        );
    };

    // const renderTopFeatured = () => {
    //     return (
    //         <>
    //         <Text style={{fontSize: 21, fontWeight: 'bold', marginBottom: 10, marginTop: 20}}>
    //         Related Articles
    //         </Text>

    //         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    //             {topfeature && topfeature.map((each, position) => {
    //                 return (
    //                     <TouchableRipple 
    //                         key={position+'Element'}
    //                         onPress={() => {
    //                             navigation.push('ArticleDetails', { articleSlug: each.slug_url });
    //                         }}
    //                         style={{
    //                             width: 100, // Set a width for each item
    //                             marginRight: 16, // Spacing between items
    //                         }}
    //                     >
    //                         <View
    //                             style={{
    //                                 display: 'flex',
    //                                 flexDirection: 'column', // Stack image and text vertically
    //                                 width: '100%',
    //                                 alignItems: 'center',
    //                             }}
    //                         >
    //                             <View style={{
    //                                 width: '100%',
    //                                 height: 80, // Set a fixed height for the image
    //                             }}>
    //                                 <Image
    //                                     resizeMode={'stretch'}
    //                                     source={{uri: each.article_image_thumbnail_path !== "" ? NEW_IMG_BASE + each.article_image_thumbnail_path : DUMMY_IMAGE_URL}}
    //                                     style={{
    //                                         width: '100%',
    //                                         height: '100%',
    //                                     }}
    //                                 />
    //                             </View>
    //                             <View style={{
    //                                 width: '100%',
    //                                 alignItems: 'center',
    //                                 marginTop: 8,
    //                             }}>
    //                                 <Text style={{fontSize: 14, textAlign: 'center'}}>
    //                                     {truncateText(each.article_title, 20)}
    //                                 </Text>
    //                             </View>
    //                         </View>
    //                     </TouchableRipple>
    //                 );
    //             })}
    //         </ScrollView>
    //     </>
    //     );
    // };

    const renderOtherSeries = () => {
        return (
            <>
            <Text style={{fontSize: 21, fontWeight: 'bold', marginBottom: 10, marginTop: 20}}>
            Other Popular Series
            </Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {otherSeries && otherSeries.map((each, position) => {
                    return (
                        <TouchableRipple 
                            key={position+'Element'}
                            onPress={() => {
                                navigation.push('SeriesDetails', { series_id: each.series_id });
                            }}
                            style={{
                                width: 100, // Set a width for each item
                                marginRight: 16, // Spacing between items
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column', // Stack image and text vertically
                                    width: '100%',
                                    alignItems: 'center',
                                }}
                            >
                                <View style={{
                                    width: '100%',
                                    height: 80, // Set a fixed height for the image
                                }}>
                                    <Image
                                        resizeMode={'stretch'}
                                        source={{uri: each.series_image !== "" ? NEW_IMG_BASE + each.series_image : DUMMY_IMAGE_URL}}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </View>
                                <View style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    marginTop: 8,
                                }}>
                                    <Text style={{fontSize: 14, textAlign: 'center'}}>
                                        {truncateText(each.series_title, 20)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableRipple>
                    );
                })}
            </ScrollView>
        </>
        );
    };

    const getData = ()=>{
        if(!loader)
            return (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <ErrorBoundary FallbackComponent={FallBackUI} >
                            <ArtistInfo />
                        </ErrorBoundary>
                        <ErrorBoundary FallbackComponent={FallBackUI} >
                            <Content recommendedArticles={recommendedArticles} />
                        </ErrorBoundary>
                        <ErrorBoundary FallbackComponent={FallBackUI} >
                            <AddReview id={articleId} type={'article'} />
                        </ErrorBoundary>
                        {/* {renderTopFeatured()} */}
                        {renderRecommendedArticles()}
                        {renderOtherSeries()}
                    </View>
                </ScrollView>
            );
        return <ScreenLoader text={'Fetching Article Details..'} />;
    };

    return(
        <SafeAreaView edges={['left', 'right']} style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Article Details'} />
            {getData()}
        </SafeAreaView>
    );
};

ArticleDetailScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route:PropTypes.object.isRequired,
    updateArticleDetails:PropTypes.func.isRequired,
};

function mapStateToProps(){
    return{};
}

function mapDispatchToProps(dispatch){
    return{
        updateArticleDetails:(data) =>
            dispatch(productDetailActions.updateArticleDetails(data)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ArticleDetailScreen);