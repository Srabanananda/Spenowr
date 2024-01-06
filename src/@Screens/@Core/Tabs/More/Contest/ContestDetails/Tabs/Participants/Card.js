import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { getContestVoteSubmitted } from '../../../../../../../../@Endpoints/Core/Tabs/More';
import Toast from 'react-native-simple-toast';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import styles from '../styles';
import WritingsView from '../../../../../../../../@GlobalComponents/WritingsView';
import { getFooter } from '../../../../../Home/Tabs/WhatsNew/WhatsNewCard';
import Config from '@Config/default';

const {NEW_IMG_BASE} = Config;

export const ParticipantCard = ({participant,index,large=false,contest_type,vote_submit,isVotedContest,fetchCurrentTypeParticipants,showVoteOption} : any)=>{
    const navigation = useNavigation();
    const {
        media_thumbnail_path,
        artist_slug_url,
        media_id,
        id,
        user_name,
        title='',
        article_image_thumbnail_path='',
        slug_url='',
        contest_id = '',
        paticipant_vote_submit,
        contest_entitie_id,
        contest_type : internalContestType,
        vote_count = '0'
    } = participant;

    participant.feed_less_description = title;

    let imgPath = contest_type === 'stories' ? article_image_thumbnail_path : media_thumbnail_path;
    let route = contest_type === 'stories' ? 'ArticleDetails' : 'ArtworkDetails';
    let routeParams = contest_type === 'stories' ? {mediaId:contest_id,articleSlug:slug_url} : {mediaId:media_id,artworkSlug:artist_slug_url};

    const onVoteChange = () => {
        getContestVoteSubmitted(contest_entitie_id,contest_id, paticipant_vote_submit,internalContestType,media_id||id)
            .then(()=>fetchCurrentTypeParticipants())
            .catch(()=>Toast.show('Oops Something Went Wrong'));
    };

    const renderVoteUI = () => {
        if(!showVoteOption) return<></>;
        return(
            <>
                {
                    (isVotedContest)? 
                        <TouchableOpacity  onPress={onVoteChange} style={[{backgroundColor:'white',marginTop:moderateScale(10)},vote_submit ? GlobalStyles.seeMoreButton : GlobalStyles.seeMoreButtonRev]}>
                            <Text style={vote_submit ? GlobalStyles.seeMoreButtonText : GlobalStyles.seeMoreButtonTextRev }>{!vote_submit ? 'Vote This' : 'Revoke Vote'}</Text>
                        </TouchableOpacity>
                        :
                        (!vote_submit) ? 
                            <TouchableOpacity  onPress={onVoteChange} style={[{backgroundColor:'white',marginTop:moderateScale(10)}, GlobalStyles.seeMoreButtonRev ]}>
                                <Text style={GlobalStyles.seeMoreButtonTextRev}>{'Vote This'}</Text>
                            </TouchableOpacity>
                            :<></>
                }
            </>
        );
    };

    if(contest_type === 'writings')
        return(
            <View key={index} style={styles.writingBox}>
                <WritingsView 
                    Writing={participant} 
                    customTopDescriptionTextStyles= {{maxWidth:moderateScale(120)}}
                    horizontalContainer={styles.WritingsContainer}
                    horizontalContainerImage={styles.WritingsImageContainer}  
                    key={index}
                    plainTextContainer={{width:moderateScale(150),minHeight:moderateScale(150)}}
                    verticalContainer={styles.WritingsContainer}
                    verticalContainerImage={styles.WritingsImageContainer}
                    
                >
                    {getFooter()}
                </WritingsView>
                <TouchableOpacity>
                    <Text 
                        numberOfLines={1} 
                        onPress={()=>navigation.navigate('PublicProfile',{slug:artist_slug_url})} 
                        style={[styles.eachArtistName,{
                            color : '#000' ,
                            fontWeight:'bold'}]}
                    >
                        {user_name}
                    </Text>
                    {
                        showVoteOption &&
                        <Text 
                            numberOfLines={1} 
                            style={[styles.eachArtistName,{ color : '#000',alignSelf:'center'}]}
                        >
                            Vote : {vote_count}
                        </Text>
                    }
                </TouchableOpacity>
                {renderVoteUI()}
            </View>
        );

    return(
        <View key={index} style={styles.artistBox}>
            <TouchableOpacity 
                onPress={()=>navigation.navigate(route,routeParams)} 
                style={large ? styles.productPicHorizontalLarge : styles.productPicHorizontal}
            >
                <Image 
                    resizeMode={large  ?  'contain' : 'cover'} 
                    source={{uri: NEW_IMG_BASE +imgPath}} 
                    style={{width:null,height:null,flex:1}}
                />
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('PublicProfile',{slug:artist_slug_url})} 
                    style={styles.imageOverlay}  
                />
                <Text 
                    numberOfLines={1} 
                    onPress={()=>navigation.navigate('PublicProfile',{slug:artist_slug_url})} 
                    style={[styles.eachArtistName,{
                        marginLeft:moderateScale(15),
                        fontWeight:'bold'}]}
                >
                    {user_name}
                </Text>
                {
                    showVoteOption && 
                    <Text 
                        numberOfLines={1} 
                        style={[styles.eachArtistName,{marginLeft:moderateScale(15)}]}
                    >
                            Vote : {vote_count}
                    </Text>
                }
            </TouchableOpacity>
            {renderVoteUI()}
        </View>
    );
};