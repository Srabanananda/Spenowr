/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import DefaultHeader from '../../../../@GlobalComponents/DefaultHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import { fetchCustomExploreList } from './ExploreCard/api';
import CardLayout from './ExploreCard/CardLayout';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';

const { GRADIENT_COLORS: { PIGGY, SKY, NETFLIX, OCEAN, ORANGE, VISION, INSTA }, COLOR: { WHITE } } = Config;

const COLOR_SHADES = [NETFLIX, OCEAN, ORANGE, PIGGY, SKY, VISION, INSTA];

const SpenowrModal = ({ ...props }) => {
    const colors = PIGGY

    const { navigation } = props;
    const [exploreList, setExploreList] = useState([]);

    const dismissScreen = () => {
        navigation.goBack();
    };

    const options = [
        /* {name : 'Find Artist', route:'FindArtist', Imgs:require('../../../../assets/svgs/artist.svg')},
        {name : 'Find Trainer', route:'FindTrainer', Imgs:require('../../../../assets/svgs/trainer.svg')},
        {name : 'Training Classes', route:'TrainingClasses', Imgs:require('../../../../assets/svgs/classes.svg')},
        {name : 'Custom Order', route:'CustomOrder', Imgs:require('../../../../assets/svgs/mixer.svg')}, */
        // {name : 'Read Stories', route:'Home', param:{ setTab: 'whats_new', filter: 'story-blogs' }, Imgs:require('../../../../assets/tabs/Spenowr/readstories.png')},
        // {name : 'Products', route:'ProductList', param:{productDetails:{type:'',subcat:'',cat:'',sort:'ranking'}}, Imgs:require('../../../../assets/tabs/Spenowr/productIcon.png')},
        // {name : 'Quotes/Poems', route:'WriteupScreen', param:{ mode: 'PRIVATE' }, Imgs:require('../../../../assets/tabs/Spenowr/quotepoem.png')},
        // {name : 'Art Gallery', route:'CustomOrder', param:{}, Imgs:require('../../../../assets/tabs/Spenowr/artgallery.png')},

        { name: 'Read Stories', route: 'Series', param: {}, Imgs: require('../../../../assets/tabs/Spenowr/readstories.png') },
        { name: 'Audio Podcast', route: 'AudioPodcast', param: {}, Imgs: require('../../../../assets/tabs/Spenowr/audiopodcast.png') },
        { name: 'Quotes/Poems', route: 'Home', param: { setTab: 'whats_new', filter: 'quote', mode: 'PRIVATE' }, Imgs: require('../../../../assets/tabs/Spenowr/quotepoem.png') },
        { name: 'Art Gallery', route: 'Gallery', param: {}, Imgs: require('../../../../assets/tabs/Spenowr/artgallery.png') },
        { name: 'Custom Print', route: 'CustomPrints', param: {}, Imgs: require('../../../../assets/tabs/Spenowr/customprint.png') },
        { name: 'Contests', route: 'Contest', param: {}, Imgs: require('../../../../assets/tabs/Spenowr/contest.png') },
        { name: 'Jobs', route: 'Jobs', param: {}, Imgs: require('../../../../assets/tabs/Spenowr/job.png') },
        { name: 'Find Artist', route: 'FindArtist', param: {}, Imgs: require('../../../../assets/tabs/Spenowr/findartist.png') },
        { name: 'Products', route: 'Shop', param: {}, Imgs: require('../../../../assets/tabs/Spenowr/productIcon.png') },

    ];

    const renderEachOption = (item, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => {
                if (item.route == 'Home') {
                    navigation.navigate(item.route, { screen: 'HomeTab', params: item.param })
                } else {
                    navigation.navigate(item.route, item.param)
                }
            }} style={styless.wrapper}>
                <Image resizeMode={'contain'} source={item.Imgs} style={styless.Img} />
                <Text style={styless.text}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    const renderOptionsInPairs = () => {
        const rows = [];
        for (let i = 0; i < options.length; i += 3) {
            rows.push(
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    {renderEachOption(options[i], i)}
                    {options[i + 1] && renderEachOption(options[i + 1], i + 1)}
                    {options[i + 2] && renderEachOption(options[i + 2], i + 2)}
                </View>
            );
        }
        return rows;
    };

    useEffect(() => {
        callApi()
    }, [])

    const callApi = () => {
        fetchCustomExploreList()
            .then(res => {
                console.log('resres 81', res);
                const { data: { explore_list = [] } } = res;
                setExploreList(explore_list);
            })
    };

    return (
        <SafeAreaView edges={['left', 'right']} style={{ flex: 1, backgroundColor: '#f7f5f6' }}>
            <DefaultHeader headerText={'Explore'} showBackButton={false} />
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}>

                <LinearGradient colors={colors} style={styless.layoutContainer}>
                    <Text style={{ padding: moderateScale(10), fontWeight: 'bold', fontSize: moderateScale(16) }}>Explore creative content and features</Text>
                    <TouchableWithoutFeedback onPress={() => dismissScreen()}>
                        {/* <ScrollView onPress={()=>dismissScreen()} style={{flex:1, backgroundColor:'#fff'}}> */}

                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={{ paddingBottom: 20 }}>
                                {renderOptionsInPairs()}
                            </View>
                        </TouchableWithoutFeedback>
                        {/* </ScrollView> */}
                    </TouchableWithoutFeedback>
                </LinearGradient>
                {
                    exploreList.map((product, i) => {
                        const { see_more_button: { type = product?.type }, products = product?.products, header_title = product?.headerText, category = product?.cat, subcategory = product?.subcat } = product;

                        product.headerText = header_title;
                        product.products = products;
                        product.type = type;
                        product.subcat = category == 'sculptures' ? category : subcategory;
                        product.cat = category == 'sculptures' ? '' : category;
                        product.colors = COLOR_SHADES[Math.floor(Math.random() * COLOR_SHADES.length)];
                        return (
                            <CardLayout
                                key={i}
                                layoutContainerStyles={{ marginBottom: moderateScale(10) }}
                                product={product}
                            />
                        );
                    })
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default SpenowrModal;

const styless = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff', // Background color of the box
        borderRadius: 10, // Rounded corners
        padding: 10, // Padding inside the box
        marginHorizontal: 10, // Space between boxes
        alignItems: 'center',
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.1, // Shadow opacity
        shadowRadius: 5, // Shadow radius
        elevation: 3, // Android shadow effect
        marginTop: 15,
    },
    buttonStyle: {
        paddingHorizontal: moderateScale(10)
    },
    layoutContainer: {
        marginTop: moderateScale(10),
        width: SCREEN_WIDTH - moderateScale(20),
        minHeight: moderateScale(300),
        alignSelf: 'center',
        borderRadius: moderateScale(10),
        // padding: moderateScale(0)
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: moderateScale(10),
        marginHorizontal: moderateScale(15)
    },
    headerStyle: {
        fontWeight: 'bold', fontSize: moderateScale(16)
    },
    viewAllTextStyle: {
        fontSize: moderateScale(10)
    },
    Img: {
        width: moderateScale(30),
        height: moderateScale(30),
    },
    text: {
        // maxWidth:moderateScale(50),
        textAlign: 'center',
        color: '#EF2D56',
        fontWeight: '600',
        fontSize: moderateScale(12),
        marginTop: moderateScale(10)
    },
})