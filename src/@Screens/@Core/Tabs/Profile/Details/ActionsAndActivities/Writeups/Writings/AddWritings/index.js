/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {
    View,TouchableOpacity,Text,StyleSheet,SafeAreaView,
    TextInput,ScrollView,Platform, ActivityIndicator, Alert
} from 'react-native';
import DefaultHeader from '@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '@GlobalStyles';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import * as userActions from '@Redux/actions/userActions';
import { Dropdown } from 'react-native-material-dropdown';
import DefaultButton from '../../../../../../../../../@GlobalComponents/DefaultButton';
import DocumentPicker from 'react-native-document-picker';
// QUOTES IMPORTS 
import QuoteImageJSON from '../../../../../../../../../assets/JsonFiles/Quotes/quotes.js';
import QuoteTypeJSON from '../../../../../../../../../assets/JsonFiles/Quotes/quoteTypes.json';
import { tagValidator } from '../../../../../../../../../@Utils/helperFiles/helpers';
import ModalHeader from "../../../../../../../../../@GlobalComponents/ModalHeader";
import Modal from "react-native-modal";
import PreviewDesign from './Design/PreviewDesign';
import Speakers from '@Common/Speakers'
import Toast from 'react-native-simple-toast';
import PointShowCase from '../../../SPoints/PointShowCase';
import { addWritingsData, TextToAudio, aiSearch } from '@Endpoints/Core/Tabs/MyAccount';
import FormHeader  from '@GlobalComponents/FormHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Capitalize from '@Utils/helperFiles/Capitalize';

const {COLOR : {APP_PINK_COLOR,DARKGRAY, BLACK,LIGHTGREY,WHITE},NEW_IMG_BASE, LANGUAGES} = Config;
const PODCAST_TYPES = [
    { label: '-- Audio Podcast --', value: '-- Audio Podcast --', id: -1},
    { label: 'Auto generate using Spenowr AI', value: 'Auto generate using Spenowr AI', id: 0},
    { label: 'Upload my recorded audio', value: 'Upload my recorded audio', id: 1},
]
type WritingProps = {
    navigation : Object,
    route: Object
};

const AddWritingsScreen = ({...props}: WritingProps) =>{

    const dispatch = useDispatch();

    const {route,navigation} = props;
    const { points, subscription } = route.params;
    const EditData = route.params ? route.params.EditData : null;

    const TextStyle = EditData && JSON.parse(EditData.text_style);

    const [earned, setEarned] = useState(0);
    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(false);
    const [showCategory, setShowCategory] = useState(false);

    const [title, setTitle] = useState(EditData ? EditData.title : '');
    const [description, setDescription] = useState(EditData ? EditData.description : '');
    
    const [category, setCategory] = useState(EditData ? EditData.sub_category : '');
    const [type, setType] = useState( EditData ? EditData.category : 'quote');

    const [tag,setTag] = useState(EditData ? EditData.tag : '');
    const [font, setFont] = React.useState(EditData ? TextStyle.textFont : Platform.OS === 'ios' ? 'Helvetica' : 'Roboto');
    const [currentColor, setCurrentColor] = useState(EditData ? TextStyle.textColor : BLACK);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [onTop, setOnTop] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(EditData ? EditData.bg_color !== 'undefined' ? {color_code : EditData.bg_color } : undefined : undefined);
    const [currentImgValue, setCurrentImageValue] = useState(EditData  ? EditData.theme_image : 1);

    const [primaryImg, setPrimaryImg] = useState(EditData && EditData.media_path ? {uri : NEW_IMG_BASE + EditData.media_path} : undefined );

    const [switchToDesign, setSwitchToDesign] = useState(false);
    const [authorName, setAuthorName] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('-- Select Language --');
    const [selectedPodCast, setSelectedPodCast] = useState('-- Audio Podcast --');
    const [speakerModal, setSpeakerModal] = useState(false);
    const [new_language, setNewLanguage] = useState('');
    const [audio_mode, setAudio_mode] = useState(-1);
    const [audio_file, setAudio_file] = useState(null);
    const allCustomAppliedStyles = {color:currentColor,fontStyle: isItalic ? 'italic' : 'normal',fontWeight: isBold ? 'bold' : '400',fontFamily:font};
    
    const [isActive, setIsActive] = useState(false);
    const [aiSearchText,setAISearchText] = useState('');
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchedText,setSearchedText] = useState('');

    const PreviewDesignData = {
        title,
        description,
        type,
        category,
        tag,
        currentColor,
        setCurrentColor,
        isBold,setIsBold,
        isItalic,setIsItalic,
        font, setFont,
        allCustomAppliedStyles,
        onTop,setOnTop,
        primaryImg,setPrimaryImg,
        backgroundColor, setBackgroundColor,
        setCurrentImageValue,
    };

    useEffect(()=>{
        if(EditData !== undefined && EditData !== null) {
            if(EditData.show_description === '1') {
                setPrimaryImg(EditData.media_path);
                setOnTop(true);
            }
            if(EditData.author != "null" && EditData.author != ""){
                setAuthorName(EditData.author)
            }

            if(EditData.language){
                if(EditData.language == "en-IN"){
                    setSelectedLanguage(LANGUAGES.find(x=>x.short_name2 === EditData.language).value)
                    setNewLanguage(LANGUAGES.find(x=>x.short_name2 === EditData.language).short_name)
                }else if(EditData.language == "hi-IN"){
                    setSelectedLanguage(LANGUAGES.find(x=>x.short_name2 === EditData.language).value)
                    setNewLanguage(LANGUAGES.find(x=>x.short_name2 === EditData.language).short_name)
                }else {
                    setSelectedLanguage(LANGUAGES.find(x=>x.short_name === EditData.language).value)
                    setNewLanguage(LANGUAGES.find(x=>x.short_name === EditData.language).short_name)
                }
            }
            if(EditData.audio_mode){
                setAudio_mode(parseInt(EditData.audio_mode))
                setSelectedPodCast(PODCAST_TYPES.find(x=>x.id === parseInt(EditData.audio_mode))?.value)
            }
        }
    },[EditData]);

    useEffect(()=>{
        dispatch(userActions.updatePointShowCase(false));
    },[]);
 
    useEffect(()=>{
        if(earned)
            dispatch(userActions.updatePointShowCase(true));
    },[earned]);

    singleFilePicker = () => {
        try {
            DocumentPicker.pick({
                type: [DocumentPicker.types.audio],
            }).then(res => {
                setAudio_file(res[0])
            }).catch(error => {
                console.log("Error : ", error);
            })
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Alert.alert('Canceled');
            } else {
                Alert.alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }

    const validatInputs = () => {
        if(!title.length) {Toast.show('Title Cannot be empty',Toast.LONG);}
        else if(!description.length) Toast.show('Writing Cannot be empty',Toast.LONG);
        else if(!category.length) Toast.show('Please select a category',Toast.LONG);
        else if(selectedLanguage === '-- Select Language --') Toast.show('Please select a language',Toast.LONG);
        else if ((new_language === "EN" || new_language === "HI") && audio_mode === 0 && authorName === '') Toast.show('Please select an author',Toast.SHORT);
        else if ((new_language === "EN" || new_language === "HI") && audio_mode === 1 && audio_file === null) Toast.show('Please pick an mp3 audio file',Toast.SHORT);
        else setSwitchToDesign(!switchToDesign);
    };

    const handleSave = () => {
        if (description.length > (type == 'quote' ? 100 : 250) && !backgroundColor){
            Toast.show('Please Add a background Color')
            return;
        }
        setLoading(true);
        if((new_language === "EN" || new_language === "HI") && audio_mode != -1){
            TextToAudio(description.substring(0,type == 'quote' ? 100 : 250), authorName, new_language, audio_file ? audio_file : null, audio_mode === 0 ? true : false)
            .then((res) =>{
                const {data:{resp}} = res; 
                addWritingsData(
                    title,type,category,description.substring(0,type == 'quote' ? 100 : 250),
                    primaryImg ? primaryImg.data ?  'data:image/jpeg;base64,' + primaryImg.data : null : null,
                    currentColor,
                    description.length > (type == 'quote' ? 100 : 250) ? null : currentImgValue,
                    backgroundColor ? backgroundColor.color_code : undefined,
                    isBold,isItalic,
                    font, EditData ? EditData.id : undefined,tag,
                    primaryImg ? primaryImg.data  ? onTop : false : false,
                    new_language, authorName, description.substring(0,type == 'quote' ? 100 : 250), audio_mode, 
                    audio_mode === 0 ? resp : null, audio_mode !== 0 ? resp : null
                )
                    .then((res) =>{
                        if(!EditData){
                            const {data:{QuotePoint:{earnedPoint=0,totalPoint=0}}} = res;
                            setEarned(earnedPoint);
                            setTotal(totalPoint);
                        }else
                            navigation.goBack();
                    })
                    .catch(()=>{
                        Toast.show('Oops Something went wrong',Toast.LONG);
                    })
                    .finally(()=>setLoading(false));
            })
            .catch(()=>Toast.show('Oops Something went wrong',Toast.LONG))
            .finally(()=>setLoading(false));
        }else{
            console.log("new_language : ", new_language);
            addWritingsData(
                title,type,category,description.substring(0,type == 'quote' ? 100 : 250),
                primaryImg ? primaryImg.data ?  'data:image/jpeg;base64,' + primaryImg.data : null : null,
                currentColor,
                description.length > (type == 'quote' ? 100 : 250) ? null : currentImgValue,
                backgroundColor ? backgroundColor.color_code : undefined,
                isBold,isItalic,
                font, EditData ? EditData.id : undefined,tag,
                primaryImg ? primaryImg.data  ? onTop : false : false,
                new_language, authorName, null, audio_mode, null, null
            )
                .then((res) =>{
                    if(!EditData){
                        const {data:{QuotePoint:{earnedPoint=0,totalPoint=0}}} = res;
                        setEarned(earnedPoint);
                        setTotal(totalPoint);
                    }else
                        navigation.goBack();
                })
                .catch(()=>{
                    Toast.show('Oops Something went wrong',Toast.LONG);
                })
                .finally(()=>setLoading(false));
        }
        
    };

    const getOnBackButtonPress = () => {
        switchToDesign ? setSwitchToDesign(false) : navigation.goBack();
    };

    const ChatGPT_AI_Search = (txt) => {
        setSearchLoader(true)
        aiSearch(aiSearchText)
        .then((res) =>{
            const {status, resp} = res?.data    
            if(status == "true"){
                setSearchedText(resp)
            }
        })
        .catch(()=>{
            Toast.show('Oops Something went wrong',Toast.LONG);
        })
        .finally(()=>setSearchLoader(false));
    }

    const onCategoryPress = () => setShowCategory(!showCategory);

    const renderCategories = () => {
        return(
            <>
                {
                    showCategory &&
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        {
                            QuoteImageJSON.quotes[2].quotesPoemSubCat.map((item,i)=>(
                                <TouchableOpacity key={i} onPress={()=>setCategory(item.value)} style={[styles.eachCategory,category===item.value ? styles.eachCategorySelected : {}]}>
                                    <Text style={category===item.value ? styles.eachCategorySelected : {color:BLACK}}>{item.label}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                }
            </>
        );
    };

    const renderSelections = () =>{
        return (
            <>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:moderateScale(5)}}>
                    {
                        QuoteTypeJSON.types.map((item,i)=>(
                            <TouchableOpacity key={i} onPress={()=>setType(item.value)} style={[styles.eachCategory,type===item.value ? styles.eachCategorySelected : {},{width:'48%',margin:0}]}>
                                <Text style={type===item.value ? styles.eachCategorySelected : {color:BLACK}}>{item.label}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <FormHeader accordianChild={renderCategories} headerText={ showCategory ? 'Select a category' : category.length ? Capitalize(category) : 'Select a category' } onPress={onCategoryPress} outlined >
                    <TouchableOpacity onPress={onCategoryPress}>
                        <Icon color={APP_PINK_COLOR} name={!showCategory ? 'chevron-down' : 'chevron-up'} size={24} />
                    </TouchableOpacity>
                </FormHeader>
            </>
        );
    };

    const renderTextInputs = () => {
        return (
          <View style={styles.textFieldContainer}>
            <TextInput
              multiline
              onChangeText={(value) => setTitle(value)}
              placeholder={"Title"}
              placeholderTextColor={BLACK}
              style={[styles.defaultTitleStyles]}
              value={title}
            />
            <TextInput
              multiline
              onChangeText={(value) => setDescription(value)}
              placeholder={"Add your writing here."}
              placeholderTextColor={BLACK}
              style={[styles.defaultContentStyles]}
              value={description}
            />
            <DefaultButton
              buttonStyle={{ marginBottom: 10 }}
              buttonText={`Auto Generate ${
                type == "quote" ? "Quote" : "Poem"
              } with ChatGPT AI`}
              onPress={()=>{
                if(points == 0){
                    if(subscription === 'spenowr_gold_plan'){
                        Alert.alert(
                          "Oops!",
                          "You don`t have credit to Generate AI Text",
                          [
                            {
                              text: "Buy Points",
                              onPress: () =>
                                navigation.navigate("CreditPoints", {
                                  subscription_plan: subscription,
                                  type: "AICredits",
                                }),
                            },
                            { text: "CANCEL", style: "cancel" },
                          ]
                        );
                    }else{
                        Alert.alert(
                          "To Use This ChatGPT - AI Art / Story",
                          "Please Upgrade Your subscription to GOLD PRO",
                          [
                            { text: "CANCEL", style: "cancel" },
                            {
                              text: "UPGRADE",
                              onPress: () =>
                                navigation.navigate("Subscription", {
                                  current: subscription,
                                  selected: subscription,
                                }),
                            },
                          ]
                        );
                    }
                }else{
                    setIsActive(true)
                }
              }}
            />
            <Modal
              backdropColor={"#000"}
              dismissable={true}
              hasBackdrop={true}
              isVisible={isActive}
              onBackButtonPress={() => {
                setIsActive(false);
              }}
              onBackdropPress={() => {
                setIsActive(false);
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: 0,
                padding: 0,
              }}
              useNativeDriver={true}
            >
              <View
                style={{
                  width: "90%",
                  backgroundColor: "#fff",
                  padding: moderateScale(15),
                  borderRadius: moderateScale(4),
                }}
              >
                <ModalHeader headerText={`Enter your thoughts about your ${type == "quote" ? 'Quote' : 'Poem'}`}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => setIsActive(false)}>
                      <Text style={styles.closeText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </ModalHeader>
                <ScrollView>
                  <TextInput
                    onChangeText={(string) => setAISearchText(string)}
                    placeholder="Search"
                    placeholderTextColor="#414756"
                    style={styles.textInputBox}
                    value={aiSearchText}
                  />

                  <DefaultButton
                    buttonText={"Generate"}
                    onPress={ChatGPT_AI_Search}
                    showLoader={searchLoader}
                    textStyle={{ fontSize: moderateScale(12) }}
                  />
                  {searchedText != '' && <>
                    <TextInput
                        multiline
                        onChangeText={(string) => setSearchedText(string)}
                        placeholderTextColor="#414756"
                        scrollEnabled
                        style={[styles.textInputBox,{height : 150 , borderColor: 'lightgray', borderWidth: 1, padding: 5, marginVertical: 10, borderRadius: 5}]}
                        value={searchedText}
                        />
                    <DefaultButton
                        buttonText={"Confirm"}
                        onPress={()=>{
                            setDescription(searchedText)
                            setIsActive(false)
                            setAISearchText('')
                            setSearchedText('')
                        }}
                        showLoader={false}
                        textStyle={{ fontSize: moderateScale(12) }}
                    />
                </>}
                </ScrollView>
              </View>
            </Modal>
          </View>
        );
    };

    const renderHashTags = () => {
        return(
            <>
                <View style={styles.dottedBox} />
                <TextInput 
                    multiline
                    onChangeText = {(value)=>{
                        const res = tagValidator(value);
                        setTag(res);
                    }}
                    placeholder = {'Add Comma separated hashTags. spenowr,awesome,beautiful'}
                    placeholderTextColor={DARKGRAY}
                    style={styles.hashTagInputBox}
                    value={tag}
                />
                <View style={styles.dottedBox} />
            </>
        );
    };



    const renderAudioSection = () => {
        const selectAuthor = (value) => {
            setAuthorName(value)
        }
        return(
            <>
                <Text style={GlobalStyles.inputHeaderName}>LANGUAGE
                    <Text style={GlobalStyles.starColor}>*</Text>
                </Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={LANGUAGES}
                        fontSize={12}
                        onChangeText={(value)=>{
                            setSelectedLanguage(value)
                            setNewLanguage(LANGUAGES.find(x=>x.value === value).short_name)
                        }}
                        value={selectedLanguage}
                    />
                </View>
                {
                    (selectedLanguage == "English" || selectedLanguage == "Hindi") && 
                    <>
                        <Text style={GlobalStyles.inputHeaderName}>AUDIO PODCAST</Text>
                        <View style={GlobalStyles.dropDownView}>
                            <Dropdown
                                data={PODCAST_TYPES}
                                fontSize={12}
                                onChangeText={(value)=>{
                                    setSelectedPodCast(value)
                                    setAudio_mode(PODCAST_TYPES.find(x=>x.value === value).id)
                                }}
                                value={selectedPodCast}
                            />
                        </View>
                    </>
                }
                {
                    (selectedPodCast == "Auto generate using Spenowr AI") && (selectedLanguage == "English" || selectedLanguage == "Hindi") && 
                    <View style={{flex:1, flexDirection: 'column'}}>
                            <Text style={GlobalStyles.inputHeaderName}>CHOOSE SPEAKER VOICE
                                <Text style={GlobalStyles.starColor}>*</Text>
                            </Text>
                            <View style={{flexDirection: 'row', alignContent: 'center' , justifyContent: 'space-between'}}>
                                <TextInput 
                                    editable={false}
                                    placeholder={''}
                                    style={[GlobalStyles.textInput,{flex:0.5, alignContent: 'center'}]}
                                    value={authorName}
                                />
                                <DefaultButton buttonStyle={styles.SpeakerButton} buttonText={'Speaker'} onPress={()=>setSpeakerModal(true)}/>
                            </View>
                            {speakerModal && 
                                <Speakers 
                                    selectedSpeaker={selectAuthor} 
                                    visible={!speakerModal} 
                                    setVisiblity={setSpeakerModal}
                                    speaker={authorName}
                                />}
                        </View>
                }
                {
                    (selectedPodCast == "Upload my recorded audio") && 
                    <DefaultButton buttonText={'Pick Audio File'} onPress={singleFilePicker} />
                }
                <DefaultButton buttonText={EditData ? 'Edit Design' : 'Add Design'} onPress={validatInputs} />
            </>
        );
    }

    const setHeader = type => `${type} ${switchToDesign ? 'Design' : 'Content'}`;

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={EditData ? setHeader('Edit') : setHeader('Add')} onPress={getOnBackButtonPress} >
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity disabled={loading} onPress={switchToDesign ? handleSave :validatInputs}>
                        {
                            loading ? <ActivityIndicator color={APP_PINK_COLOR} /> :  <Text style={styles.headerNextText}>{!switchToDesign ? ''/* `${EditData ? 'Edit' : 'Add'} Design` */ : switchToDesign && EditData ? 'Update'  : 'Save'}</Text>
                        }
                    </TouchableOpacity>
                </View>
            </DefaultHeader>
            <PointShowCase pointsEarned={earned} totalPoints={total} />
            {switchToDesign ? <PreviewDesign Data={PreviewDesignData} EditData={EditData} /> : 
                <ScrollView >
                    <View style={styles.container}>
                        <View style={[GlobalStyles.primaryCard,styles.upperContainer]}>
                            {renderSelections()}
                        </View>
                        <View style={[GlobalStyles.primaryCard, styles.lowerContainer]}>
                            {renderTextInputs()}
                            {renderHashTags()}
                        </View>
                        <View style={[GlobalStyles.primaryCard, styles.lowerContainer]}>
                            {renderAudioSection()}
                        </View>
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    );
};

export default AddWritingsScreen;
const styles = StyleSheet.create({
    headerNextText:{color:APP_PINK_COLOR,fontWeight:'bold'},
    container:{
        padding:moderateScale(5),
    },
    defaultTitleStyles:{
        fontSize:moderateScale(24),
        fontWeight:'bold',
        marginVertical:moderateScale(10),
        marginTop:moderateScale(20)
    },
    defaultContentStyles:{
        marginBottom:moderateScale(20),
        fontSize:moderateScale(14)
    },
    hashTagInputBox:{
        marginVertical:moderateScale(15)
    },
    dottedBox:{ 
        borderWidth : 1,
        borderColor:DARKGRAY,
        borderStyle: 'dashed',
        borderRadius:1
    },
    lowerContainer:{
        padding:moderateScale(10),
        marginTop:moderateScale(15)
    },
    eachCategory:{
        padding:moderateScale(10),
        margin:moderateScale(5),
        backgroundColor:LIGHTGREY,
        borderRadius:moderateScale(5)
    },
    eachCategorySelected:{
        backgroundColor:APP_PINK_COLOR,
        color:WHITE,
        fontWeight:'bold'
    },
    upperContainer:{
        padding:moderateScale(8)
    },
    SpeakerButton:{
        flex:0.4, 
        height: moderateScale(40), 
        marginTop:moderateScale(0),
        alignSelf: 'center'
    }
});