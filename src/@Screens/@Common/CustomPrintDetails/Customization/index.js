import React, { useEffect ,useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated, PanResponder, Switch, Image } from 'react-native';
import Config from '@Config/default';
import DefaultHeader from '../../../../@GlobalComponents/DefaultHeader';
import ScaledImage from '../../../../@GlobalComponents/ScalableImage';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../../@GlobalStyles';
import { ScrollView, PanGestureHandler } from 'react-native-gesture-handler';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import ColorPicker from '../../../../@GlobalComponents/ColorPicker';
import { pickImage } from '../../../../@Utils/helperFiles/ImagePicker';
import Toast from 'react-native-simple-toast';
import { addPrintingItemToCart, UpdatePrintItemFromCart } from '../../../../@Endpoints/Core/Tabs/Shop';
import CustomImageView from '../CustomImageView';

const {COLOR:{APP_PINK_COLOR,LIGHTGREY,DARKGRAY,DARK_BLACK},NEW_IMG_BASE} = Config;

const PrintCustomizationScreen = ({...props}:any) => {

    const {route:{params:{details,selectedSize,productInfo,cartID,refresh}},navigation} = props;

    const printDetails = details?.printProductDetail;
    const artWorks = details?.artworkImages;
    console.log("productInfo : ", productInfo);
    const extraInfo = JSON.parse(printDetails?.product_info??'{}')?.[0];
    const frontImage = NEW_IMG_BASE + extraInfo?.thumbnail_front_image_path;
    const BackImage = NEW_IMG_BASE + extraInfo?.thumbnail_back_image_path;
    const [isCustomImage, setIsCustomImage]  = useState(false);
    const [isBackCustomImage, setIsBackCustomImage]  = useState(false);
    const [orderLoader, setOrderLoader]  = useState();
    
    const [isFrontSelected, setIsFrontSelected]  = useState(true);
    const [isEdit, setEdit]  = useState(productInfo != undefined ? true : false);
    
    const [selectedArtwork, setSelectedArtwork]  = useState();
    const [textPositionUp, setTextPositionUp]  = useState(false);
    const [addedText, setAddedText] = useState('');
    const [currentColor, setCurrentColor]  = useState('#000000');
    
    const [selectedBackArtwork, setSelectedBackArtwork]  = useState();
    const [backTextPositionUp, setBackTextPositionUp]  = useState(false);
    const [addedBackText, setAddedBackText] = useState('');
    const [currentBackColor, setCurrentBackColor]  = useState('#000000');

    useEffect(()=>{
        const {
            front_name='',
            font_text_color='',
            front_artwork_image='',
            x_cord='',
            front_position='',
            back_name='',
            back_text_color='',
            back_artwork_image='',
            y_cord='',
            back_position='',
            original_front_image='',
            original_image='',
            original_back_image='',
        } = productInfo ?? {}
        if(front_name && front_name.length>0){
            setAddedText(front_name)
        }
        if(back_name && back_name.length>0){
            setAddedBackText(back_name)
        }
        if(font_text_color.length>0){
            setCurrentColor(font_text_color)
        }
        if(back_text_color.length>0){
            setCurrentBackColor(back_text_color)
        }
        if(front_artwork_image != ""){
            setSelectedArtwork(front_artwork_image)
        }else if(original_front_image || original_front_image != ""){
            setSelectedArtwork(original_front_image)
        }else if(original_image || original_image != ""){
            setSelectedArtwork(original_image)
        }
        if(back_artwork_image != ""){
            setSelectedBackArtwork(back_artwork_image)
        }else if(original_back_image || original_back_image != ""){
            setSelectedBackArtwork(original_back_image)
        }
        setTextPositionUp(front_position == "true" ? true : false)
        setBackTextPositionUp(back_position == "true" ? true : false)

    },[productInfo]);

    const handleOrderNow = (extraInfo) => {
        if(!selectedSize?.length){
            Toast.show('Please Select a Size');
            return;
        }
        setOrderLoader(true);
        const formValues = {
            productImage : extraInfo.front_image_path,
            productSize : selectedSize,
            price : extraInfo.price,
            productId : printDetails.id,  
            productColor : extraInfo.color,
            discount_price : extraInfo.discount_price,
            frontPosition: textPositionUp,
            backPosition: backTextPositionUp,
        };
        if(addedText.length > 0){
            formValues['frontName'] = addedText
            formValues['frontTextColor'] = currentColor
        }
        if(addedBackText.length > 0){
            formValues['backName'] = addedBackText
            formValues['backTextColor'] = currentBackColor
        }
        if(selectedArtwork){
            formValues[isCustomImage ? 'frontCustomImage' : 'frontArtworkImage'] = selectedArtwork
        }

        if(selectedBackArtwork){
            formValues[isBackCustomImage ? 'backCustomImage' : 'backArtworkImage'] = selectedBackArtwork
        }
        const formData = createFormData(formValues, isEdit, cartID);
        console.log("Form values : ", JSON.stringify(formData));
        if(isEdit){
            UpdatePrintItemFromCart(formData)
            .then((res)=>{
                console.log("response : ", JSON.stringify(formData));
                if(res.status == "success"){
                    res?.response_msg && Toast.show(res?.response_msg)
                    refresh()
                    navigation.navigate('Cart');
                }
            }).catch((error)=>{Toast.show('Oops Something went wrong')})
            .finally(()=>setOrderLoader(false));
        }else{
            addPrintingItemToCart(formData)
            .then((res)=>{
                if(res.status == "success"){
                    res?.response_msg && Toast.show(res?.response_msg)
                    navigation.navigate('Cart');
                }
            }).catch(()=>{Toast.show('Oops Something went wrong')})
            .finally(()=>setOrderLoader(false));
        }
    };
    
    const translateFrontX = new Animated.Value(0);
    const translateFrontY = new Animated.Value(0);
    const translateBackX = new Animated.Value(0);
    const translateBackY = new Animated.Value(0);
    const   onFrontPanGestureEvent = Animated.event([{ nativeEvent: { translationX: translateFrontX, translationY: translateFrontY }  }],{ useNativeDriver: true });
    const onBackPanGestureEvent = Animated.event([{ nativeEvent: { translationX: translateBackX, translationY: translateBackY } }],{ useNativeDriver: true });

    const frontInterpolationX = translateFrontX.interpolate({
        inputRange: [-25, 38],
        outputRange: [-25, 38],
        extrapolate: 'clamp',
    });

    const frontInterpolationY = translateFrontY.interpolate({
        inputRange: [-50, 50],
        outputRange: [-10, 100],
        extrapolate: 'clamp',
    });

    const backInterpolationX = translateBackX.interpolate({
        inputRange: [-25, 38],
        outputRange: [-25, 38],
        extrapolate: 'clamp',
    });

    const backInterpolationY = translateBackY.interpolate({
        inputRange: [-50, 50],
        outputRange: [-40, 100],
        extrapolate: 'clamp',
    });
    
    const renderPreview=()=> {
 
        return(
            <View style={{justifyContent:'center',alignItems:'center'}}>
                {isFrontSelected &&
                <ScaledImage source={{ uri: frontImage }} >
                    <View style={{backgroundColor:'transparent',alignSelf:'center',marginTop: 80, height: 220, width: 170}}>
                        <PanGestureHandler onGestureEvent={onFrontPanGestureEvent}>
                            <Animated.View style={[{alignSelf:'center',justifyContent:'center',},{ transform: [{ translateX: frontInterpolationX }, { translateY: frontInterpolationY }] }]}>
                                {addedText?.length && textPositionUp && !isCustomImage  ? <Text style={[styles.customText,{color:currentColor,marginBottom:moderateScale(5)}]}>{addedText}</Text> : <></>}
                                {selectedArtwork &&  
                                    <View style={[styles.eachArtwork]}>
                                        {isEdit ? <ScaledImage source={{ uri: NEW_IMG_BASE + selectedArtwork }}/> : 
                                            <ScaledImage source={{ uri: isCustomImage ? selectedArtwork : NEW_IMG_BASE + selectedArtwork }}/>}
                                    </View>}
                                {addedText?.length && (!textPositionUp || isCustomImage)  ? <Text style={[styles.customText,{color:currentColor,bottom:textPositionUp==false &&selectedArtwork ?0:-90}]}>{addedText}</Text> : <></>}
                            </Animated.View>
                        </PanGestureHandler>
                    </View>
                </ScaledImage> ||
                <ScaledImage source={{ uri: BackImage }} >
                    <View style={{backgroundColor:'transparent',alignSelf:'center',marginTop: 80, height: 220, width: 170}}>
                        <PanGestureHandler onGestureEvent={onBackPanGestureEvent}>
                            <Animated.View style={[{alignSelf:'center',justifyContent:'center'},{ transform: [ {translateX: backInterpolationX}, {translateY: backInterpolationY} ]}]}>
                                {addedBackText?.length && backTextPositionUp  ? <Text style={[styles.customText,{color:currentBackColor,marginBottom:moderateScale(5)}]}>{addedBackText}</Text> : <></>}
                                {selectedBackArtwork &&  
                                    <View style={[styles.eachArtwork]}>
                                        {isEdit ? <ScaledImage source={{ uri: selectedBackArtwork ? NEW_IMG_BASE + selectedBackArtwork : selectedBackArtwork}} /> : 
                                            <ScaledImage source={{ uri: isBackCustomImage ? selectedBackArtwork : NEW_IMG_BASE + selectedBackArtwork }} />}
                                    </View>}
                                    {console.log(backTextPositionUp==false&& isBackCustomImage ==true,backTextPositionUp,isBackCustomImage)}
                                {addedBackText?.length && !backTextPositionUp  ? <Text style={[styles.customText,{color:currentBackColor,bottom:backTextPositionUp==false&& selectedBackArtwork ?0:-90}]}>{addedBackText}</Text> : <></>}
                            </Animated.View>
                        </PanGestureHandler>
                    </View>
                </ScaledImage>}
                <View style={styles.miniView}>
                    <TouchableOpacity onPress={()=>setIsFrontSelected(true)}>
                        {!isEdit && <Image source={{ uri: frontImage }} style={[isFrontSelected ? styles.miniViewItemsSelected : styles.miniViewItems]}/> ||
                        <CustomImageView 
                            Image={frontImage} 
                            ProductInfo={productInfo} 
                            forFront={true} 
                            MainStyle={[isFrontSelected ? styles.miniViewItemsSelected : styles.miniViewItems,{ justifyContent:'center'}]}
                            MiniStyle={{alignSelf:'center', height: 15, width: 15}}
                            textStyle={[styles.frontTextStyle,{ fontSize: 3, textAlign: 'center' }]}/>}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setIsFrontSelected(false)}>
                        {!isEdit && <Image source={{ uri: BackImage }} style={[!isFrontSelected ? styles.miniViewItemsSelected : styles.miniViewItems]}/> ||
                        <CustomImageView 
                            Image={BackImage} 
                            ProductInfo={productInfo} 
                            forFront={false} 
                            MainStyle={[!isFrontSelected ? styles.miniViewItemsSelected : styles.miniViewItems,{ justifyContent:'center'}]}
                            MiniStyle={{alignSelf:'center', height: 15, width: 15}}
                            textStyle={[styles.frontTextStyle,{ fontSize: 3, textAlign: 'center' }]}/>}
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderText = () => {
        return(
            <View style={[GlobalStyles.primaryCard,styles.artworkCard,{flexDirection:'column',}]}>
                <View style={[styles.artworkCard,{flexDirection:'row',}]}>
                    <View flex={1.4}>
                        <TextInput
                            onChangeText={isFrontSelected ? setAddedText : setAddedBackText}
                            placeholder={'Add Text Here'}
                            style={GlobalStyles.textInput}
                            value={isFrontSelected ? addedText : addedBackText}
                        />
                    </View>
                    <View flex={0.2} style={{alignItems:'flex-end'}}>
                        <ColorPicker setCurrentColor={(value) => {
                            if(isFrontSelected) setCurrentColor(value)
                            else setCurrentBackColor(value)
                        }} />
                    </View>
                </View>
                {!isCustomImage && isFrontSelected && 
                <View style={[{flexDirection: 'row',width: '100%', alignItems: 'center',justifyContent: 'space-around',paddingHorizontal: moderateScale(50) }]}>
                    <Text style={[{textAlign: 'center', justifyContent: 'center'}]}>{'SHOW TEXT ON TOP'}</Text>
                    <Switch
                        ios_backgroundColor="#3e3e3e"
                        thumbColor={textPositionUp ? APP_PINK_COLOR : LIGHTGREY}
                        trackColor={{ false: '#767577', true: DARK_BLACK }}
                        value={textPositionUp}
                        onValueChange={()=>{
                            setTextPositionUp(!textPositionUp)
                            // if(isFrontSelected) setTextPositionUp(!textPositionUp)
                            // else setBackTextPositionUp(!backTextPositionUp)
                        }}
                        // thumbColor={isFrontSelected ? textPositionUp ? APP_PINK_COLOR : LIGHTGREY : backTextPositionUp ? APP_PINK_COLOR : LIGHTGREY}
                        // value={isFrontSelected ? textPositionUp : backTextPositionUp}
                    />
                </View>}
                {!isBackCustomImage && !isFrontSelected && 
                <View style={[{flexDirection: 'row',width: '100%', alignItems: 'center',justifyContent: 'space-around',paddingHorizontal: moderateScale(50) }]}>
                    <Text style={[{textAlign: 'center', justifyContent: 'center'}]}>{'SHOW TEXT ON TOP'}</Text>
                    <Switch
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={()=>{
                            setBackTextPositionUp(!backTextPositionUp)
                            // if(isFrontSelected) setTextPositionUp(!textPositionUp)
                            // else setBackTextPositionUp(!backTextPositionUp)
                        }}
                        thumbColor={backTextPositionUp ? APP_PINK_COLOR : LIGHTGREY}
                        trackColor={{ false: '#767577', true: DARK_BLACK }}
                        value={backTextPositionUp}
                    />
                </View>}
            </View>
        );
    };

    const renderArtworks = () => {
        return(
            <View style={[GlobalStyles.primaryCard,styles.artworkCard]}>
                <Text style={styles.selectionText}>Select Artwork</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    {
                        artWorks.map(({reduced_media_path},idx)=>{
                            const artworkImg = NEW_IMG_BASE + reduced_media_path; 
                            return(
                                <TouchableOpacity key={idx} onPress={()=>{
                                    isFrontSelected ? setIsCustomImage(false) : setIsBackCustomImage(false)
                                    isFrontSelected ? setSelectedArtwork(reduced_media_path) : setSelectedBackArtwork(reduced_media_path)
                                }} style={[styles.eachArtwork,{marginRight:moderateScale(10)}]}>
                                    <ScaledImage  source={{ uri: NEW_IMG_BASE + reduced_media_path }} />
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
            </View>
        );
    };

    const renderCustomImage = () => {
        const chooseFile = () => {

            pickImage((res)=>{
                let response = res;
                if(Platform.OS === 'android'){
                    if(res?.assets) {
                        var imageData = res?.assets[0];
                        if(isFrontSelected){
                            setIsCustomImage(true)
                            setSelectedArtwork(imageData.base64 ? 'data:image/jpeg;base64,' + imageData.base64 :  imageData) 
                        }else{
                            setIsBackCustomImage(true)
                            setSelectedBackArtwork(imageData.base64 ? 'data:image/jpeg;base64,' + imageData.base64 :  imageData)
                        }
                    } 
                }
                if(response.didCancel) return;
            });
        };
        return(
            <View style={[GlobalStyles.primaryCard,{padding:moderateScale(10),marginTop:moderateScale(10),}]}>
                <Text style={[styles.selectionText,{textAlign: 'center'}]}>Select Custom Image</Text>
                <DefaultButton buttonText='Add Image' onPress={chooseFile}/>
            </View>
        );
    };
useEffect(()=>{
console.log(selectedBackArtwork,selectedArtwork)
},[selectedBackArtwork,selectedArtwork])
    return(
        <SafeAreaView style={{flex:1}}>
            <DefaultHeader headerText={`${isEdit ? 'Edit' : 'Add'} Customization`} />
            <View style={{padding:moderateScale(10),flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderPreview()}
                    {renderText()}
                    {renderArtworks()}
                    {renderCustomImage()}
                </ScrollView>
                <DefaultButton buttonText={isEdit ? 'Update Order' : 'Order Now'} onPress={()=>handleOrderNow(extraInfo)} showLoader={orderLoader} />
            </View>
        </SafeAreaView>
    );

};

export default PrintCustomizationScreen;

const styles = StyleSheet.create({
    artworkCard:{
        padding:moderateScale(10),
        marginTop:moderateScale(10),
        alignItems:'center',
    },
    eachArtwork : {
        width:moderateScale(100),
    },
    selectionText:{
        fontWeight:'bold',
        marginBottom:moderateScale(10)
    },
    miniView: {
        alignContent:'center', 
        marginVertical: moderateScale(5), 
        flexDirection: 'row'
    },
    miniViewItems: {
        width: moderateScale(50),
        height: moderateScale(50), 
        marginHorizontal: moderateScale(5)
    },
    miniViewItemsSelected: {
        width: moderateScale(50),
        height: moderateScale(50), 
        marginHorizontal: moderateScale(5),
        borderWidth:1,
        borderColor: APP_PINK_COLOR
    },
    customText:{maxWidth:moderateScale(100), fontWeight:'600',textAlign:'center',marginTop:moderateScale(5)},
});


export const createFormData = ({
    price = '',
    productColor ='',
    productImage ='',
    productType ='print-product',
    productId ='',
    productSize ='',
    artworkId = '',
    discount_price = '',
    
    frontName = '',
    frontTextColor ='',
    frontCustomImage = '',
    frontPosition = false,
    frontArtworkImage = '',

    backName = '',
    backTextColor ='',
    backCustomImage = '',
    backPosition = false,
    backArtworkImage = '',
},isEdit, cartID) => {

    const data = new FormData();
    data.append('currency',null);
    isEdit && data.append('cart_id', cartID);
    data.append('product_id',productId);
    data.append('product_type',productType);
    data.append('product_size',productSize);
    data.append('product_image',productImage);
    data.append('product_color',productColor);
    data.append('upload_Image', isEdit ? true : false);
    data.append('price',price);
    data.append('artwork_id',artworkId);
    
    //FRONT
    data.append('custom_upload_image',frontCustomImage);
    data.append('front_name',frontName);
    data.append('front_artwork_image',frontArtworkImage);
    data.append('font_text_color',frontTextColor);
    data.append('front_upload_Image','');
    data.append('front_position',frontPosition);
    
    
    // BACK
    data.append('custom_upload_back_image',backCustomImage);
    data.append('back_name',backName);
    data.append('back_artwork_image',backArtworkImage);
    data.append('back_text_color',backTextColor);
    data.append('back_upload_Image','');
    data.append('back_position',backPosition);
    
    data.append('inventory_id','');
    data.append('quantity','');
    data.append('discount_price',discount_price);
    return data;
};