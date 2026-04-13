/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useCallback, useState } from 'react';
import {ScrollView, View, TouchableOpacity, Text, Linking} from 'react-native';
import { useStore } from 'react-redux';
import Config from '@Config/default';
import HTML from 'react-native-render-html';
import FormHeader from '../../../@GlobalComponents/FormHeader';
import MusicPlayer from '../../@Common/MusicPlayer';
const {COLOR:{APP_THEME_COLOR}} = Config;
import YoutubeIcon from 'react-native-vector-icons/FontAwesome'
import SpotifyIcon from 'react-native-vector-icons/Entypo'
import { getAudioPlayCountArticle } from '../../../@Endpoints/Core/Tabs/MyAccount';
import Toast from 'react-native-simple-toast';
import { useFocusEffect } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import YouTubePlayer from '../../../@GlobalComponents/YoutubePlayer';
import { moderateScale } from 'react-native-size-matters';

const Content = () =>{
    const store = useStore();
    const {
        productDetails:{articleDetailsData:{article}}
    } = store.getState();
    const {article_description, polly_response_msg, youtube_url, spotify_url} = article;

    console.log('====================================');
    console.log('article 25',article);
    console.log('====================================');

    const openURL = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    let desc = article_description.replace(/style="line-height: 1.38;/g,'');
    desc = desc.replace(/#f2184f/g,`${APP_THEME_COLOR}`);

    const callApi = () =>{
        getAudioPlayCountArticle(article.article_id, 1)
            .then((res)=>{
                // const {data:{packagedata=[]}}  = res;
                // setPackages(packagedata);
                console.log('====================================');
                console.log('res of article count', res);
                console.log('====================================');
            })
            .catch(()=>{
                Toast.show('Oops Something went wrong');
                // setTimeout(()=>{navigation.goBack();},400);
            })
            .finally(()=>{
                // setLoading(false);
                console.log('finally');
            });
    };

    // useEffect(() => {
    //     callApi()
    // }, [])

    useFocusEffect(
        useCallback(() => {
            return () => {
                TrackPlayer.pause(); // Pause the player when screen loses focus
                TrackPlayer.reset(); // Reset the player when screen loses focus
            };
        }, [])
    );

    // const getYoutubeVideoId = (url) => {
    //     if (!url) return null; // Early return if url is empty or undefined
    //     const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=|youtu.be\/|\/v\/|v=)([^#&?]*).*/;
    //     const match = url.match(regExp);
    //     return (match && match[2].length === 11) ? match[2] : null;
    // };

    // const videoId = getYoutubeVideoId(youtube_url);

    return(
        <ScrollView>    
            {
                polly_response_msg != null && (polly_response_msg.includes('.mp3') || polly_response_msg.includes('.mp4')) && 
                <MusicPlayer track={polly_response_msg} onPresses={callApi}  />
            }

            
            {spotify_url == '' || spotify_url == null ?
            null :
                <View style={{flexDirection: 'row', marginTop:10, alignItems:'center'}}>
                    <Text style={{fontWeight: 'bold'}}>Also Listen from :</Text>
                    {spotify_url && 
                        <TouchableOpacity onPress={() => openURL(spotify_url)} style={{marginLeft:15}}>
                            <SpotifyIcon color={'#1db954'} size={25} name={"spotify"} />
                        </TouchableOpacity>
                    }
                </View>
            }

            {youtube_url == '' || youtube_url == null ?
            null :
                <View style={{ width: '100%', alignSelf: 'center', marginTop: moderateScale(20) }}>
                    <YouTubePlayer playerContainerStyles={{ height: moderateScale(190), width: '100%', backgroundColor: APP_THEME_COLOR }} videoId={youtube_url} />
                </View>
            }

            <HTML 
                renderers = {{
                    h4: (htmlAttribs, children ,convertedCSSStyles, passProps) => {
                        const  {transientChildren = []} = passProps;
                        if(transientChildren[0] !== undefined)
                        {
                            const {children : innerChild = [{data  : ''}]} = transientChildren[0];
                            if(innerChild[0].data==undefined){
                                var {data = ''} = innerChild[0].children[0];

                                return  <>
                                    {data != "" && 
                                    <View style={{marginTop:8}}><FormHeader headerText={data} /></View>
                                    || null}
                                </>
                            }else{
                            var {data = ''} = innerChild[0];
                            return  <>
                                {data != "" && 
                                <View style={{marginTop:8}}><FormHeader headerText={data} /></View>
                                || null}
                            </>

                            }

                   
                        }
                        return null;
                    }
                }}
                source={{html : desc}}
            />
        </ScrollView>
    );
};

export default Content;