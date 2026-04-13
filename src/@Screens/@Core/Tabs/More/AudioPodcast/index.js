import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground, RefreshControl, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import PlayIcon from 'react-native-vector-icons/AntDesign'
import Config from '@Config/default';
import axios from 'axios';
import { featuredSeriesData, getAudioPodCastList } from '../../../../../@Endpoints/Core/Tabs/More';
const { COLOR: { APP_PINK_COLOR, DARK_BLACK }, NEW_IMG_BASE } = Config;
import Carousel from 'react-native-snap-carousel';
import { DEVICE_WIDTH } from '../../../../../@Utils/helperFiles/DeviceInfoExtractor';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const PAGE_SIZE = 100;

const AudioPodcast = () => {
    const [loader, setLoader] = useState(true);
    const [getFeature, setGetFeature] = useState([]);
    const [getImage, setGetImages] = useState();
    const [audioPodcastList, setAudioPodcastList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [seriesID, setSeriesID] = useState('');
    const [page, setPage] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const scrollViewRef = useRef();

    const navigation = useNavigation();

    useEffect(() => {
        callApi();
        callFeaturedSeries();
    }, []);

    const callApi = async (bearerToken) => {
        try {
            const formData = new FormData();
            formData.append("limit_from", page * PAGE_SIZE);
            formData.append("limit_to", (page + 1) * PAGE_SIZE);
            formData.append("pageRange", PAGE_SIZE);
            formData.append("offset", page * PAGE_SIZE);
            formData.append("language", "");

            if (page === 0) setLoader(true);
            else setLoadingMore(true);

            const response = await axios.post(
                "https://backend.spenowr.com/profile/audio-podcast-list",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${bearerToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const newPodcasts = response.data.data.poddata;
            console.log('newPodcasts', newPodcasts);

            setAudioPodcastList(prevList => {
                // Filter out duplicates
                const existingIds = prevList.map(podcast => podcast.id); // Assuming each podcast has a unique 'id'
                const filteredNewPodcasts = newPodcasts.filter(podcast => !existingIds.includes(podcast.id));
                return [...prevList, ...filteredNewPodcasts];
            });
            setLoader(false);
            setLoadingMore(false);
        } catch (error) {
            console.log("Error:", error);
            setLoader(false);
            setLoadingMore(false);
        }
    };

    const callFeaturedSeries = async () => {
        const formData = new FormData();
        formData.append("limit_from", 0);
        formData.append("limit_to", 20);
        formData.append("pageRange", 20);
        formData.append("offset", 0);
        formData.append("language", "");

        console.log('formData', formData);
        setLoader(true);
        await featuredSeriesData(formData)
            .then(res => {
                const featuredSeries = res?.data?.featuredSeries ?? [];
                setGetFeature(featuredSeries);
                console.log('series Data 866: ', featuredSeries);
                setSeriesID(featuredSeries.map(item => item.series_id));
                setGetImages(featuredSeries.map(item => item.image_path));
            })
            .catch(() => console.log('Oops Something went wrong'))
            .finally(() => setLoader(false));
    };


    const onRefresh = () => {
        setRefreshing(true);
        setPage(0);
        setAudioPodcastList([]);
        callApi();
        setTimeout(() => { setRefreshing(false); }, 500);
    };

    const loadMore = () => {
        if (!loadingMore) {
            setPage(prevPage => prevPage + 1);
            callApi();
        }
    };

    if (loader && audioPodcastList.length === 0) return <ScreenLoader text={'Loading data ..'} />;

    return (
        <SafeAreaView edges={['left', 'right']} style={{ flex: 1, backgroundColor: '#fff' }}>
            <DefaultHeader headerText={'Audio Podcast'} />
            <ScrollView
                ref={scrollViewRef}
                style={{ backgroundColor: '#fff', flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        loadMore();
                    }
                }}
                scrollEventThrottle={400}
            >
                <View style={{ backgroundColor: '#fff' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, paddingHorizontal: 15, marginTop: 20, textAlign: 'center' }}>{'Featured Series'}</Text>
                    <Carousel
                        activeSlideAlignment="center"
                        autoplay
                        containerCustomStyle={{ paddingTop: 10, backgroundColor: '#fff' }}
                        data={getFeature}
                        enableMomentum={false}
                        inactiveSlideShift={10}
                        itemWidth={DEVICE_WIDTH - scale(60)}
                        layout="default"
                        lockScrollWhileSnapping={true}
                        loop={true}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SeriesDetails', { series_id: item.series_id })} style={{ backgroundColor: '#fff' }}>
                                <Image
                                    source={{ uri: NEW_IMG_BASE + item.image_path }}
                                    style={{ width: '100%', height: 220, resizeMode: 'cover', borderRadius: 10 }}
                                />
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 16 }}><Text style={{ color: '#EF2D56', fontSize: 16 }}>By: </Text>{item.institute_name}</Text>
                                </View>

                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 16 }}><Text style={{ color: '#EF2D56', fontSize: 16 }}>Series Title: </Text>{item.title}</Text>
                                </View>
                            </TouchableOpacity>

                        )}
                        sliderHeight={100}
                        sliderWidth={DEVICE_WIDTH}
                    />
                </View>
                {audioPodcastList && audioPodcastList.map((item, index) => (
                    <View key={item.id || index} style={{ padding: 5, borderRadius: 5, width: '95%', alignSelf: 'center', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'center', alignContent: 'center', }}>
                                {item.type === 'article' ?
                                    <ImageBackground
                                        source={item.image_path ? { uri: NEW_IMG_BASE + item.image_path } : require("../../../../../../src/assets/images/SpenowrLogoIcon.png")}
                                        style={{ height: 60, width: 60, borderRadius: 30, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        {item.polly_response_msg == 'null' || item.polly_response_msg == '' || item.polly_response_msg == null ? null :
                                            <TouchableOpacity onPress={() => navigation.navigate('AudioMusic', { songsss: item.polly_response_msg, imageUrl: item.image_path, titleMusic: item.title, artistMusic: item.institute_name })} style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flex: 1 }}>
                                                <PlayIcon name={'play'} size={22} />
                                            </TouchableOpacity>
                                        }
                                    </ImageBackground>
                                    :
                                    <ImageBackground
                                        source={item.image_path ? { uri: NEW_IMG_BASE + item.image_path } : require("../../../../../../src/assets/images/SpenowrLogoIcon.png")} style={{ height: 60, width: 60, borderRadius: 30, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        {item.polly_response_msg == 'null' || item.polly_response_msg == '' || item.polly_response_msg == null ? null :
                                            <TouchableOpacity onPress={() => navigation.navigate('AudioMusic', { songsss: item.polly_response_msg, imageUrl: item.image_path, titleMusic: item.title, artistMusic: item.institute_name })} style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flex: 1 }}>
                                                <PlayIcon name={'play'} size={22} />
                                            </TouchableOpacity>
                                        }
                                    </ImageBackground>
                                }
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                {item.type === 'article' ?
                                    <TouchableOpacity onPress={() => navigation.navigate('ArticleDetails', { mediaId: item.module_id, articleSlug: item.slug_url })} activeOpacity={0.6}>
                                        <Text style={{ color: '#EF2D56', marginTop: 10, fontSize: 15, fontWeight: 'bold' }}>{item.title.length > 28 ? item.title.substring(0, 28) + '...' : item.title}
                                        </Text>
                                    </TouchableOpacity>
                                    : item.type === 'series' ?

                                        <TouchableOpacity onPress={() => navigation.navigate('SeriesDetails', { series_id: item.module_id })} activeOpacity={0.6}>
                                            <Text style={{ color: '#EF2D56', marginTop: 10, fontSize: 15, fontWeight: 'bold' }}>{item.title.length > 28 ? item.title.substring(0, 28) + '...' : item.title}
                                            </Text>
                                        </TouchableOpacity>

                                        : item.type === "Quote" ?

                                            <TouchableOpacity onPress={() => navigation.navigate('QuotesDetails', { quoteSlug: item.slug_url })} activeOpacity={0.6}>
                                                <Text style={{ color: '#EF2D56', marginTop: 10, fontSize: 15, fontWeight: 'bold' }}>{item.title.length > 28 ? item.title.substring(0, 28) + '...' : item.title}
                                                </Text>
                                            </TouchableOpacity>

                                            :

                                            <TouchableOpacity onPress={() => navigation.navigate('PublicProfile', { slug: item.institute_slug_url })} activeOpacity={0.6}>
                                                <Text style={{ color: '#EF2D56', marginTop: 10, fontSize: 15, fontWeight: 'bold' }}>{item.title.length > 28 ? item.title.substring(0, 28) + '...' : item.title}
                                                </Text>
                                            </TouchableOpacity>
                                }
                                <Text style={{ fontSize: 15, marginTop: 5 }}>By: <Text>{item.institute_name}</Text></Text>
                            </View>
                        </View>
                    </View>
                ))}
                {loadingMore && (
                    <View style={{ padding: 10 }}>
                        <ActivityIndicator size="large" color={APP_PINK_COLOR} />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

export default AudioPodcast
