/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {SafeAreaView,ScrollView,View} from 'react-native';
import { getArtworkDetails } from '../../../@Endpoints/Core/Tabs/Common';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../@GlobalStyles';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as productDetailActions from '../../../@Redux/actions/productDetailActions';
import ImageSlides from './ImageSlides';
import UserArtworks from './SimilarArtworks/UserArtworks';
import RelatedArtworks from './SimilarArtworks/RelatedArtworks';
import CardActions from '../../@Core/Tabs/Home/Tabs/WhatsNew/CardActions';
import InfoBox from './InfoBox';
import VoteOptions from './VoteOptions';
import InviteFriendToVote from './InviteFriendToVote';

const ArtworkDetailsScreen = ({...props}) =>{

    const {route,navigation,updateArtworkDetails,artworkDetails} = props;

    const [loader, setLoader] = useState(true);
    const {artworkSlug,mediaId} = route.params;

    const {
        heart_count = 0,comment_count = 0,login_heart_count=0
    } = artworkDetails;


    useEffect(()=>{
        callApi();
    },[]);

    const callApi = () => {
        setLoader(true);
        getArtworkDetails(mediaId,artworkSlug)
            .then(res=>{
                if(res.data.instituteDetail)
                {
                    updateArtworkDetails(res.data);
                    
                }
                else
                {
                    Toast.show('Oops Couldnot get Artwork Details',Toast.LONG);
                    setTimeout(()=>{navigation.goBack();},300);
                }
                
            })
            .catch(()=>{
                Toast.show('Oops Couldnot get Artwork Details',Toast.LONG);
                setTimeout(()=>{navigation.goBack();},300);
            })
            .finally(()=>setLoader(false));
    };

    const cardActionData ={
        module_id : mediaId,
        type : 'artwork',
        slug_url : artworkDetails.artwork_slug_url,
        heart_count,
        comment_count,
        login_heart_count
    };

    const getData = ()=>{
        if(loader) return <ScreenLoader text={'Fetching Artwork Details..'} />;
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <ImageSlides artworkDetails={artworkDetails} /> 
                    <InfoBox artworkDetails={artworkDetails} />
                    <VoteOptions details={artworkDetails} refreshData={callApi} />
                    <CardActions info={cardActionData} />
                </View>
                <UserArtworks artworkDetails={artworkDetails} />
                <RelatedArtworks artworkDetails={artworkDetails} />
            </ScrollView>
        );
        
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Artwork Details'}>
                {!loader && <InviteFriendToVote details={artworkDetails} />}
            </DefaultHeader>
            {getData()}
        </SafeAreaView>
    );
};

function mapStateToProps(state){
    return{
        artworkDetails : state.productDetails.artworkDetailsData,
        userId : state.userObj.userProfile.institute_id
    };
}

function mapDispatchToProps(dispatch){
    return{
        updateArtworkDetails:(data) =>
            dispatch(productDetailActions.updateArtworkDetails(data)),
    };
}

ArtworkDetailsScreen.propTypes = {
    artworkDetails:PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    route:PropTypes.object.isRequired,
    updateArtworkDetails:PropTypes.func.isRequired
};


export default connect(mapStateToProps,mapDispatchToProps)(ArtworkDetailsScreen);