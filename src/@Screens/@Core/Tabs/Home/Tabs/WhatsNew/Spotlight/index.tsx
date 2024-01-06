import React from 'react';
import { Image, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Config from '@Config/default';
import { useNavigation } from '@react-navigation/native';
// import DefaultButton from '../../../../../../../@GlobalComponents/DefaultButton';
import styles from '../styles';
import { DEVICE_WIDTH } from '../../../../../../../@Utils/helperFiles/DeviceInfoExtractor';
import Carousel from 'react-native-snap-carousel';
import { scale } from 'react-native-size-matters';
import ScaledImage from '../../../../../../../@GlobalComponents/ScalableImage';
import { AppleInc } from '../../../../More/Contest/ContestList/ContestCard';

const {COLOR: { APP_PINK_COLOR, DARK_BLACK },NEW_IMG_BASE} = Config;

const SpotLight = ({announcements,Stories}:any) => {

    const handleCarouselItem = ({item, index}) => (
        <AnnouncementCard announcement={item} key={index} list={announcements}/>
    );

    const handleStoryItem = ({item, index}) => (
        <StoryCard story={item} key={index} list={Stories}/>
    );

    if(Stories?.length) return(
        <View style={{backgroundColor:'#fff'}}>
            {Stories?.length !== 1 && <Text style={{fontWeight: '500',fontSize: 18, marginTop: 10, textAlign:'center' }}>{'Trending for the Day'}</Text>}
            <Carousel
                activeSlideAlignment="center"
                autoplay
                containerCustomStyle={{paddingTop:10,backgroundColor:'#fff'}}
                data={Stories}
                enableMomentum={false}
                inactiveSlideShift={10}
                itemWidth={announcements?.length == 1 ? DEVICE_WIDTH : DEVICE_WIDTH - scale(20)}
                layout="default"
                lockScrollWhileSnapping={true}
                loop={true}
                renderItem={handleStoryItem}
                sliderHeight={100}
                sliderWidth={DEVICE_WIDTH}
            />
        </View>
    );
    if(!announcements?.length) return<></>;
    if(announcements?.length == 1) return <AnnouncementCard announcement={announcements[0]} key={1} list={announcements}/>
    return(
        <View style={{backgroundColor:'#fff'}}>
            <Text style={{fontWeight: '500',fontSize: 18,paddingHorizontal: 15, marginTop: 10 }}>{'In the Spotlight'}</Text>
            <Carousel
                activeSlideAlignment="center"
                autoplay
                containerCustomStyle={{paddingTop:10,backgroundColor:'#fff'}}
                data={announcements}
                enableMomentum={false}
                inactiveSlideShift={10}
                itemWidth={announcements?.length == 1 ? DEVICE_WIDTH : DEVICE_WIDTH - scale(60)}
                layout="default"
                lockScrollWhileSnapping={true}
                loop={true}
                renderItem={handleCarouselItem}
                sliderHeight={100}
                sliderWidth={DEVICE_WIDTH}
            />
        </View>
    );
};

export default SpotLight;

const AnnouncementCard = ({announcement,list}:any) => {
    const navigation = useNavigation();
    const { payload = '{}', route, title } = announcement;
    const newPayload =  JSON.parse(payload) ?? '';
    const _handleOnPress = () => {  
        navigation.navigate(route,newPayload);
    };

    return(
        <>
            {list?.length != 1 && 
                 <TouchableOpacity onPress={_handleOnPress} style={styles.announcementCard}>
                    <ImageBackground source={{ uri: NEW_IMG_BASE + announcement?.image_path }} style={[styles.scaledImageStyle,{justifyContent:'center'}]} blurRadius={90}>
                        <ScaledImage  source={{uri: NEW_IMG_BASE + announcement?.image_path}}/>
                    </ImageBackground>
                    <View style={styles.SliderTitleParent}>
                        <Text style={styles.scaledTitle}>{title}</Text>
                    </View>
                    <AppleInc />
                </TouchableOpacity>
            || 
                <View style={{backgroundColor:'#fff'}}>
                    <Text style={{fontWeight: '500',fontSize: 18,padding: 10 }}>{'In the Spotlight'}</Text>
                    <TouchableOpacity onPress={_handleOnPress} style={styles.singleAnnouncementCard}>
                    <ImageBackground source={{ uri: NEW_IMG_BASE + announcement?.image_path }} style={[styles.scaledImageStyle,{justifyContent:'center'}]} blurRadius={90}>
                        <ScaledImage  source={{uri: NEW_IMG_BASE + announcement?.image_path}}/>
                    </ImageBackground>
                        <View style={styles.SliderTitleParent}>
                            <Text style={styles.scaledTitle}>{title}</Text>
                        </View>
                        <AppleInc />
                    </TouchableOpacity>
                </View>
            }
        </>
    );
};

const StoryCard = ({story,list}:any) => {
    // const navigation = useNavigation();
    // const newPayload =  JSON.parse(payload) ?? '';
    // const _handleOnPress = () => {  
    //     navigation.navigate(route,newPayload);
    // };
    const {
        post_image, photo_title, added_by
    } = story;

    return(
        <>
            {list?.length != 1 && 
                 <View /* onPress={_handleOnPress}  */style={styles.storyCard}>
                    <Image source={{ uri: NEW_IMG_BASE + post_image }} style={styles.scaledImageStyle} resizeMode={'center'}/>
                    <View style={styles.SliderTitleParent}>
                        <Text style={[styles.scaledTitle,{color: APP_PINK_COLOR}]}>
                            {'Artist Name: '}
                            <Text style={[styles.scaledTitle,{color: DARK_BLACK}]}>{added_by}</Text>
                        </Text>
                        <Text style={[styles.scaledTitle,{color: APP_PINK_COLOR}]}>
                            {'Artwork: '}
                            <Text style={[styles.scaledTitle,{color: DARK_BLACK}]}>{photo_title}</Text>
                        </Text>
                    </View>
                </View>
            || 
                <View style={{backgroundColor:'#fff'}}>
                    <Text style={{fontWeight: '500',fontSize: 18,padding: 10, textAlign:'center' }}>{'Trending for the Day'}</Text>
                    <View /* onPress={_handleOnPress} */ style={styles.storyCard}>
                        <Image source={{ uri: NEW_IMG_BASE + post_image }} style={styles.scaledImageStyle} resizeMode={'center'}/>
                        <Text style={[styles.scaledTitle,{color: APP_PINK_COLOR}]}>
                            {'Artist Name: '}
                            <Text style={[styles.scaledTitle,{color: DARK_BLACK}]}>{added_by}</Text>
                        </Text>
                        <Text style={[styles.scaledTitle,{color: APP_PINK_COLOR}]}>
                            {'Artwork: '}
                            <Text style={[styles.scaledTitle,{color: DARK_BLACK}]}>{photo_title}</Text>
                        </Text>
                    </View>
                </View>
            }
        </>
    );
};