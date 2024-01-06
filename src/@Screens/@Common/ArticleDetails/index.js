/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect, createRef} from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
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

const { NEW_IMG_BASE, DUMMY_IMAGE_URL } = Config;

const ArticleDetailScreen = ({...props}) =>{
    
    const {route,navigation,updateArticleDetails} = props;
    const {articleSlug} = route.params;
    const [loader, setLoader] = useState(true);
    const [articleId, setArticleId] = useState('');

    const [recommendedArticles, setRecommendedArticles] = useState([]);
    const [rest, setRest] = useState([]);

    useEffect(()=>{
        callApi();
        return () => {

        }
    },[]); 

    // useEffect(()=>{
    //     if(recommendedArticles.length > 0 && rest.length === 0){
    //         setRest(recommendedArticles.length > 0 ? recommendedArticles.splice(1,3) : []);
    //     }
    // },[recommendedArticles]);


    const callApi = () => {
        getArticleDetails(articleSlug)
            .then(res=>{
                if(res.data != null && res.data.article){
                    setArticleId(res.data.article.article_id);
                    updateArticleDetails(res.data);
                    let recentlyCategoryViewed = res?.data?.recentlyCategoryViewed
                    setRecommendedArticles(recentlyCategoryViewed);
                    setRest(recentlyCategoryViewed.length > 0 ? recentlyCategoryViewed.splice(1,3) : []);
                    setLoader(false);
                } else {
                    setTimeout(()=>{navigation.goBack();},300);
                    Toast.show('Oops Couldnot get Article Details',Toast.LONG);
                }
            }).catch(()=>{
                Toast.show('Oops Couldnot get Article Details',Toast.LONG);
                setTimeout(()=>{navigation.goBack();},300);
            });
    };

    const renderRecommendedArticles = () => {
        return (
            <>
                <Text style={{fontSize: 21, fontWeight: 'bold', marginBottom: 20, marginTop: 20}}>
                Recommended Articles
                </Text>
                {
                    rest && rest.map((each, position)=>{
                        return(
                            <View
                                key={position+'Element'}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    height: 80,
                                    marginBottom: 16,
                                }}
                            >
                                <TouchableRipple onPress={()=> {
                                    navigation.push('ArticleDetails', {articleSlug: each.slug_url});
                                }}>
                                    <View
                                        key={position+'Element'}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            width: '100%',
                                            height: 80,
                                            alignItems:'center'
                                        }}
                                    >
                                        <View style={{
                                            width: '27%',
                                            height: '100%',
                                        }}>
                                            <Image
                                                resizeMode={'stretch'}
                                                source={{uri: each.article_image_thumbnail_path != "" ? NEW_IMG_BASE + each.article_image_thumbnail_path : DUMMY_IMAGE_URL}}
                                                style={{
                                                    width: null,
                                                    height: null,
                                                    flex: 1
                                                }}
                                            />
                                        </View>
                                        <View style={{display: 'flex', flexDirection: 'column', width: '73%'}}>
                                            <Text style={{fontSize: 17, marginLeft: 8}}>
                                                {each.article_title}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableRipple>
                            </View>
                        );
                    })
                }
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
                        {renderRecommendedArticles()}
                    </View>
                </ScrollView>
            );
        return <ScreenLoader text={'Fetching Article Details..'} />;
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
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