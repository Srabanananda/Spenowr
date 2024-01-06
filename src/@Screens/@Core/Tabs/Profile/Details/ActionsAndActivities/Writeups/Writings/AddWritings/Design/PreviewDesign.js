/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {View,TouchableOpacity,StyleSheet,ImageBackground,Text,ScrollView} from 'react-native';
import Icon  from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';
import { scale } from 'react-native-size-matters';
import Config from '@Config/default';

import BackgroundImages from './Tabs/BackgroundImages';
import BackgroundColors from './Tabs/BackgroundColors';
import CustomImages from './Tabs/CustomImages';
import Fonts from './Tabs/Fonts';
import { GlobalStyles } from '@GlobalStyles';
import { DEVICE_WIDTH,DEVICE_HEIGHT } from '@Utils/helperFiles/DeviceInfoExtractor';
import CustomTexts from './Tabs/CustomTexts';
import QuoteImageJSON from '../../../../../../../../../../assets/JsonFiles/Quotes/quotes.js';
import { FONTS } from './Tabs/Fonts';

const {COLOR : {BLACK,APP_PINK_COLOR,DARKGRAY, WHITE,RED}} = Config;

type PreviewDesignProps = {
    Data: Object,
    EditData : Object | null;
}

const PreviewDesign = ({...props}:PreviewDesignProps) =>{

    const {
        Data:
        {
            type,title,description,
            currentColor,setCurrentColor,
            isBold,setIsBold,
            isItalic,setIsItalic,
            setFont,font,
            allCustomAppliedStyles,
            onTop,setOnTop,
            primaryImg,setPrimaryImg,
            backgroundColor, setBackgroundColor,
            setCurrentImageValue
        }, 
        EditData
    } = props;
    
    const charLimitLength = type === 'poem' ? 250 : 100;

    const tabs = [
        {name : 'backgroundImages', icon : 'images' },
        {name : 'backgroundColors', icon : 'palette' },
        {name : 'customImages', icon : 'camera' },
        {name : 'fonts', icon : 'font' },
        {name : 'textCustom', icon : 'text-height' },
    ];

    const tab2 = [
        {name : 'backgroundColors', icon : 'palette' },
        {name : 'fonts', icon : 'font' },
        {name : 'textCustom', icon : 'text-height' },
    ];

    const BACKGROUNDS = type === 'poem' ? QuoteImageJSON.quotes[0].quoteVerticalImage :  QuoteImageJSON.quotes[1].quoteHorizontalImage;
    const getCurrentImg = () => EditData ? EditData.theme_image !== '0' ?  BACKGROUNDS[parseInt(EditData.theme_image)-1].local_image : undefined : description.length > charLimitLength ? undefined : BACKGROUNDS[0].local_image;
    const [currentImage, setCurrentImage] = useState(getCurrentImg());    
    const [isNewColorPicked, setIsNewColorPicked] = useState(false);
    const [isCharLimitApplied, setIsCharLimitApplied] = useState(description.length > charLimitLength);
    const [selectedTab,setSelectedTab] = useState(description.length > charLimitLength ? tab2[0] : tabs[0]);

    const customTextProps = {
        isBold,setIsBold,
        isItalic,setIsItalic,
        currentColor,setCurrentColor,
        setIsNewColorPicked,
        font
    };

    const customImageProps = {
        primaryImg,
        setPrimaryImg,
        onTop,setOnTop
    };

    const Tabs = tab => {
        return(
            <View>
                <TouchableOpacity onPress={()=> selectedTab.icon !== tab.icon && setSelectedTab(tab)}>
                    <Icon color={selectedTab.icon === tab.icon ? APP_PINK_COLOR : DARKGRAY} name={tab.icon} size={18} />
                </TouchableOpacity>
            </View>
        );
    };

    const onChangeCurrentImage = ({local_image,value}) => {
        setBackgroundColor(undefined);
        setPrimaryImg(undefined);
        local_image && setCurrentImage(local_image.toString());
        setCurrentImageValue(value);
        setOnTop(false);
    };

    const onChangeCustomImage = customImg =>{
        setPrimaryImg(customImg);
        setBackgroundColor(undefined);
        setCurrentImage(undefined);
        setOnTop(false);
        setCurrentImageValue(0);
    };

    const onChangeBackgroundColor = selectedColor =>{
        setPrimaryImg(undefined);
        setCurrentImage(undefined);
        setBackgroundColor(selectedColor);
        setIsNewColorPicked(false);
        setOnTop(false);
        setCurrentImageValue(0);
    };

    const onChangeContentFont = selectedFont => {
        if(selectedFont.hasVariations) selectWeight(selectedFont);
        else {
            setFont( selectedFont.value);
            setIsBold(false);
            setIsItalic(false);
        }
    };

    const renderTabContent = () => {
        switch (selectedTab.name) {
        case 'backgroundImages':
            return <BackgroundImages isLimitCrossed={isCharLimitApplied} BACKGROUNDS={BACKGROUNDS} onImageChange={onChangeCurrentImage} type={type} />;
        case 'backgroundColors':
            return <BackgroundColors onColorChange={onChangeBackgroundColor} />;
        case 'customImages':
            return <CustomImages isLimitCrossed={isCharLimitApplied} onImageChange={onChangeCustomImage} {...customImageProps} />;
        case 'fonts':
            return <Fonts font={font} onFontChange={onChangeContentFont} />;
        case 'textCustom':
            return <CustomTexts {...customTextProps} />;
        }
    };

    const renderTabContent2 = () => {
        switch (selectedTab.name) {
        case 'backgroundColors':
            return <BackgroundColors onColorChange={onChangeBackgroundColor} />;
        case 'fonts':
            return <Fonts font={font} onFontChange={onChangeContentFont} />;
        case 'textCustom':
            return <CustomTexts {...customTextProps} />;
        }
    };

    const rendeContentData = () => {
        let contentColor = currentColor;
        if(backgroundColor && !isNewColorPicked) contentColor = backgroundColor.text_color;
        let limitedDesc = description;
        isCharLimitApplied  ?  limitedDesc = description.substring(0,charLimitLength) : null;

        return(
            <>
                <Text style={{fontSize:22,textAlign:'center',marginBottom:10,...allCustomAppliedStyles,color:contentColor}}>{title}</Text>
                <Text style={{textAlign:'center',...allCustomAppliedStyles,color:contentColor}}>{limitedDesc}</Text>
            </>
        );
    };

    const renderPreview = () =>{
        if(backgroundColor)
        {
            const {color_code=WHITE} = backgroundColor;
            return(
                <View style={[styles.colorPreviewBox,{backgroundColor:color_code}]}>
                    {rendeContentData()}
                </View>
            );
        }
        
        const primaryImage = primaryImg ? primaryImg.data ? { uri: 'data:image/jpeg;base64,' + primaryImg.data } :  primaryImg : '';

        return(
            <>
                {/* {onTop && rendeContentData()} */}
                <ImageBackground
                    resizeMode={'contain'}
                    source={ currentImage ?  currentImage  : primaryImage}
                    style={[styles.previewBackgroundImage]}
                >
                    {/* !onTop &&  */rendeContentData()}
                </ImageBackground>
            </>
        );
    };

    const selectWeight = selectedFont => {
        if(isBold) setFont(selectedFont.bold);
        if(isItalic) setFont(selectedFont.italic);
        if(!isBold && !isItalic) setFont(selectedFont.value);
        if(isBold && isItalic) setFont(selectedFont.both);
    };

    useEffect(()=>{
        if(font)
        {
            const selectedFont = FONTS.find(x=> x.value === font || x.bold === font || x.italic === font || x.both === font );
            if(selectedFont)
                selectWeight(selectedFont);
        }
        
    },[isBold,isItalic]);

    return(
        <View style={GlobalStyles.GlobalContainer}>
            <View style={styles.previewContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderPreview()}
                </ScrollView>
            </View>
            <View style={styles.tabContentContainer}>
                {isCharLimitApplied && <Text style={styles.maxChar}>*Max Character limit {charLimitLength} </Text>}
                <View style={styles.tabWrappers}> 
                    {isCharLimitApplied ? tab2.map((tab,i) => <Tabs key={i} {...tab} />) : tabs.map((tab,i) => <Tabs key={i} {...tab} />)} 
                </View>
                {isCharLimitApplied ? renderTabContent2() : renderTabContent()}
            </View>
        </View>
    );
};

export default PreviewDesign;
const styles = StyleSheet.create({
    tabWrappers:{
        flexDirection:'row',
        justifyContent:'space-between',
        elevation : 6,
        shadowRadius: moderateScale(1), 
        shadowOffset: {
            height: scale(1),
            width: scale(1)
        },
        shadowColor: BLACK, 
        shadowOpacity: .2,
        backgroundColor:WHITE,
        padding:moderateScale(15),
        paddingVertical:moderateScale(10)
    },
    previewContainer:{
        flex:7.5,
        justifyContent:'center',alignItems:'center',
        paddingTop:moderateScale(6)
    },
    tabContentContainer:{
        flex:2.5
    },
    previewBackgroundImage:{
        width:DEVICE_WIDTH-30,
        minHeight:DEVICE_HEIGHT*0.6,
        borderRadius:moderateScale(10),
        justifyContent:'center',
        alignItems:'center',
    },
    colorPreviewBox:{
        width:DEVICE_WIDTH-30,
        minHeight:DEVICE_HEIGHT*0.6,
        borderRadius:moderateScale(10),
        justifyContent:'center',
        alignItems:'center',
        padding:moderateScale(15)
    },
    contentDataWrapper:{
        height:'100%'
    },
    maxChar:{
        color:RED,
        marginLeft:moderateScale(10),
        marginBottom:moderateScale(5),
        fontStyle:'italic'
    }
});