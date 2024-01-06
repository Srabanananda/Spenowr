/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {SafeAreaView,ScrollView,View} from 'react-native';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../@GlobalStyles';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { getQuotesDetails } from '../../../@Endpoints/Core/Tabs/Common';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import * as productDetailActions from '../../../@Redux/actions/productDetailActions';
import { connect } from 'react-redux';
import QuoteBox from './QuoteBox';
import SimilarQuotesPoems from './SimilarQuotes';
import ArtistBox from '../../../@GlobalComponents/ArtistBox';
import { useIsFocused } from '@react-navigation/core';
import CardActions from '../../@Core/Tabs/Home/Tabs/WhatsNew/CardActions';
import { moderateScale } from 'react-native-size-matters';
import { isObjectEmpty } from '../../../@Utils/helperFiles/isObjectEmpty';
import InviteFriendToVote from '../ArtworkDetails/InviteFriendToVote';
import VoteOptions from '../ArtworkDetails/VoteOptions';
import MusicPlayer from '../../@Common/MusicPlayer';

const QuotesDetailScreen = ({...props}) =>{
    const isFocused = useIsFocused();
    const {route,navigation,updateQuoteDetails,quoteDetails} = props;
    const {quoteSlug} = route.params;
    const [loader, setLoader] = useState(true);
    
    const details = {
        login_vote_count : quoteDetails?.login_vote_count??'',
        mediaType : quoteDetails?.mediaType ?? '',
        photo_details:{
            media_id : quoteDetails?.quotesData?.id ?? ''
        },
        contest_is_active : quoteDetails?.contest_is_active,
        voted_id:quoteDetails?.voted_id
    };

    useEffect(()=>{
        if(isFocused)callApi();
    },[isFocused]);

    const callApi = () =>{
        setLoader(true);
        getQuotesDetails(quoteSlug)
            .then(res=>{
                const {data={}} = res;
                updateQuoteDetails(data);
            })
            .catch(()=>{
                Toast.show('Oops Couldnot get Quote Details',Toast.LONG);
                setTimeout(()=>{navigation.goBack();},300);
            })
            .finally(()=>setLoader(false));
    };

    const getData = ()=>{
        if(!loader)
        {
            const {
                quotesData:{id='',slug_url='',play_audio='',polly_response_msg=''},
                quotesData = {},
                institute={},
                userquotesOtherData =[],
                quotesReletedData = [],
                heart_count = 0,comment_count = 0,
            } = quoteDetails;
            const cardActionData = { type : 'Quote', module_id: id, slug_url,heart_count,comment_count};
            let userInfo ={};
            if(!isObjectEmpty(institute))
            {
                userInfo = {...institute};
                userInfo.artist_name = userInfo.institute_name;
                userInfo.institute_slug_url = userInfo.slug_url;
                userInfo.profile_image = userInfo.profile_image_thumbnail_path;
            }
            else userInfo=false;
            return (
                <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                    <View style={styles.container}>
                        {userInfo && <ArtistBox artistData={userInfo} hideShare showFollow />}
                        <QuoteBox quote={quotesData} />
                        {polly_response_msg != null && (polly_response_msg.includes('.mp3') || polly_response_msg.includes('.mp4')) && 
                            <MusicPlayer track={polly_response_msg}  />
                        }
                        {play_audio != null && (play_audio.includes('.mp3') || play_audio.includes('.mp4')) && 
                            <MusicPlayer track={play_audio}  />
                        }
                        <VoteOptions details={details} refreshData={callApi} />
                        <View style={{marginVertical:moderateScale(10)}}>
                            <CardActions info={cardActionData} />
                        </View>
                    </View>
                    <SimilarQuotesPoems listTitle={'User other Quotes/Poems'} relatedQuotes={userquotesOtherData} />
                    <SimilarQuotesPoems listTitle={'Related Quotes/Poems'} relatedQuotes={quotesReletedData} />
                </ScrollView>
            );
        }
        return <ScreenLoader text={'Fetching Quote Details..'} />;
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Quote Details'} >
                {!loader && <InviteFriendToVote details={details} />}
            </DefaultHeader>
            {getData()}
        </SafeAreaView>
    );
};

function mapStateToProps(state){
    return{
        quoteDetails : state.productDetails.quoteDetailsData
    };
}

function mapDispatchToProps(dispatch){
    return{
        updateQuoteDetails:(data) =>
            dispatch(productDetailActions.updateQuoteDetails(data)),
    };
}

QuotesDetailScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    quoteDetails: PropTypes.object.isRequired,
    route:PropTypes.object.isRequired,
    updateQuoteDetails: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,mapDispatchToProps)(QuotesDetailScreen);