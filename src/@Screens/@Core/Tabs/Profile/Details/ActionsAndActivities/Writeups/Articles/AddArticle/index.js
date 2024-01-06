/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect, useCallback} from 'react';
import {View,Text,SafeAreaView,ScrollView,TextInput,Image,TouchableOpacity,Platform,Alert, ViewComponent} from 'react-native';
import PropTypes from 'prop-types';
import DefaultHeader from '../../../../../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';
import Config from '@Config/default';
import { Dropdown } from 'react-native-material-dropdown';
import COUNTRIES from '@Assets/JsonFiles/country.json';
import INDIANSTATES from '@Assets/JsonFiles/indiaState.json';
import USASTATES from '@Assets/JsonFiles/USAState.json';
import SelectImage from '../../../../../../../../../@GlobalComponents/SelectImage';
import EditorScreen from '../../../../../../../../../@GlobalComponents/TextEditor';
import DefaultButton from '../../../../../../../../../@GlobalComponents/DefaultButton';

import DocumentPicker from 'react-native-document-picker';

import ARTNCRAFT from '@Assets/JsonFiles/FilterJsons/productcat_subcat.json';
import DANCE from '@Assets/JsonFiles/FilterJsons/dancecat_subcat.json';
import PHOTOGRAPHY from '@Assets/JsonFiles/FilterJsons/photographycat_subcat.json';
import EXERCISE from '@Assets/JsonFiles/FilterJsons/exercisecat_subcat.json';
import SPORTS from '@Assets/JsonFiles/FilterJsons/sportscat_subcat.json';
import MUSICAL from '@Assets/JsonFiles/FilterJsons/musicalcat_subcat.json';
import SINGING from '@Assets/JsonFiles/FilterJsons/singingcat_subcat.json';
import { addArticle, TextToAudio, aiSearch, getUserSeries } from '../../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import { fetchMyCreditPoints } from '../../../../../../../../../@Endpoints/Core/Tabs/EditProfile';
import { GetCatValue, GetSubCatValue } from '../../../../../../../../../@Utils/helperFiles/GetCatSubcat';
import FallBackUI from '../../../../../../../../../@GlobalComponents/FallBackUI';
import ErrorBoundary from 'react-native-error-boundary';
import { tagValidator } from '../../../../../../../../../@Utils/helperFiles/helpers';
import { pickImage } from '../../../../../../../../../@Utils/helperFiles/ImagePicker';
import Speakers from '@Common/Speakers'
import ModalHeader from "../../../../../../../../../@GlobalComponents/ModalHeader";
import Modal from "react-native-modal";
import { forEach } from 'lodash';
const {NEW_IMG_BASE, LANGUAGES, COLOR:{ APP_PINK_COLOR }} = Config;

const AllCategories =  [{
    'category':[
        ...ARTNCRAFT.category,...MUSICAL.category,...SINGING.category,
        ...DANCE.category,...PHOTOGRAPHY.category,...EXERCISE.category,
        ...SPORTS.category
    ]
}];
const PODCAST_TYPES = [
    { label: '-- Audio Podcast --', value: '-- Audio Podcast --', id: -1},
    { label: 'Auto generate using Spenowr AI', value: 'Auto generate using Spenowr AI', id: 0},
    { label: 'Upload my recorded audio', value: 'Upload my recorded audio', id: 1},
]

const tempArr = AllCategories[0].category;
const categoryList = tempArr.map((each)=>{
    const {type :{label,value}} = each;
    return {name : value,value:label};
});

const AddArticleScreen = ({...props}) =>{

    const {route,navigation} = props;
    const { points, subscription } = route.params;
    const EditData = route.params ? route.params.EditData : null;
    const [loader, setLoader] = useState(false);
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [reference, setReference] = useState(''); 
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Select A Category');
    const [mainSubcat, setMainSubCat] = useState([]);
    const [selectedSubCat, setSelectedSubCat] = useState('Select A Sub-category');
    const [subCatList, setSubCatList] = useState([]);
    const [authorName, setAuthorName] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('-- Select Country --');
    const [selectedState, setSelectedState] = useState('-- Select State --');
    const [selectedLanguage, setSelectedLanguage] = useState('-- Select Language --');
    const [new_language, setNewLanguage] = useState('');
    const [selectedPodCast, setSelectedPodCast] = useState('-- Audio Podcast --');
    const [speakerModal, setSpeakerModal] = useState(false);
    const [audio_mode, setAudio_mode] = useState(-1);
    const [audio_file, setAudio_file] = useState(null);
    const [stateList, setStateList] = useState([]);
    const [series, setSeries] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState('-- Series --');
    const [selectedSeriesID, setSelectedSeriesID] = useState(-1);
    const [isActive, setIsActive] = useState(false);
    const [aiSearchText,setAISearchText] = useState('');
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchedText,setSearchedText] = useState('');
    const [aiPoints, setAIPoints] = useState(0);
    useEffect(()=>{
        GetSeriesList()
        fetchCreditPoints()
    },[])

    useEffect(()=>{
        if(mainSubcat.length)
        {
            const subCats = mainSubcat.map((each)=>{
                const {subcatGroup :{label,value}} = each;
                return {name : value,value:label};
            });
            if(subCats.length) 
                setSelectedSubCat('Select A Sub-category');
            setSubCatList(subCats);
        }
        else setSubCatList([]);
    },[mainSubcat]);

    useEffect(()=>{
        if(EditData)
        {
            const {
                article_description,
                article_image_path,
                category,
                sub_category,
                country,
                state,
                source_url,
                article_title,
                tags,
                language,
                audio_mode,
                author,
                series_id
            } = EditData;
            const selectedCat = GetCatValue(category);
            setSelectedCategory(selectedCat);
            const val = tempArr.find((x)=>x.type.label === selectedCat);
            setMainSubCat(val.type.subcat);
            const selectedSub = GetSubCatValue(category,sub_category);
            setTimeout(()=>{
                selectedSub ? setSelectedSubCat(selectedSub) : null ;
            },400);
            const findCountry = COUNTRIES.find(x=>x.country_id === country);
            if(findCountry)
            {
                setSelectedCountry(findCountry.value);
                let states = findCountry.country_id === '1' ? INDIANSTATES  : USASTATES;
                setStateList(states);
                const findState = states.find(x=>x.state_id === state.toString());
                findState ? setSelectedState(findState.value) : null ;
            } 
            setName(article_title);
            setDescription(article_description);
            setTag(tags);
            setReference(source_url);
            setSelectedFile(article_image_path);
            if(author != "") 
                setAuthorName(author)
            if(language){
                if(language == "en-IN"){
                    setSelectedLanguage(LANGUAGES.find(x=>x.short_name2 === language).value)
                    setNewLanguage(LANGUAGES.find(x=>x.short_name2 === language).short_name)
                }else if(language == "hi-IN"){
                    setSelectedLanguage(LANGUAGES.find(x=>x.short_name2 === language).value)
                    setNewLanguage(LANGUAGES.find(x=>x.short_name2 === language).short_name)
                }else {
                    setSelectedLanguage(LANGUAGES.find(x=>x.short_name === language).value)
                    setNewLanguage(LANGUAGES.find(x=>x.short_name === language).short_name)
                }
            }
            if(audio_mode){
                setAudio_mode(parseInt(audio_mode))
                setSelectedPodCast(PODCAST_TYPES.find(x=>x.id === parseInt(audio_mode))?.value)
            }
            
        }
    },[EditData]);

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

    const GetSeriesList = () => {
        getUserSeries().then(res => {
            const { data: { seriesdata }} = res;
            var list = [{
                label: '-- Series --', value: '-- Series --', id: -1
            }]
            seriesdata.forEach(item => {
                list.push({
                    label: item.series_title, value: item.series_title, id: item.series_id
                })
            });
            if(EditData){
                setSelectedSeries(seriesdata.find(x=>x.series_id === EditData?.series_id).series_title)
                setSelectedSeriesID(EditData?.series_id)
            }
            setSeries(list)
        }).catch()
    }

    const chooseFile = () => {
        pickImage((res)=>{
            let response = res;
            if(Platform.OS === 'android'){
                if(res?.assets) response = res.assets[0];
            }
            if(response.didCancel) return;
            setSelectedFile(response);
        });
    };

    const checkSubCategory =  (selected) =>{
        setSelectedCategory(selected);
        const val = tempArr.find((x)=>x.type.label === selected);
        setMainSubCat(val.type.subcat);
    };

    const checkState = (selected) =>{
        setSelectedCountry(selected);
        if(selected === 'India') {
            setStateList(INDIANSTATES);
            setSelectedState('-- Select State --');
        }
        else if(selected === 'USA') {
            setStateList(USASTATES);
            setSelectedState('-- Select State --');
        }
        else {
            setStateList([]);
            setSelectedState('--NA--');
        }
    };

    const validateData = () =>{
        if(name === '' || description==='' || !selectedFile || selectedCategory === 'Select A Category' || selectedLanguage === '-- Select Language --')
            Toast.show('Please fill all mandatory fields',Toast.LONG);
        else if ((new_language === "EN" || new_language === "HI") && audio_mode === 0 && authorName === '')
            Toast.show('Please select an author',Toast.SHORT);
        else if ((new_language === "EN" || new_language === "HI") && audio_mode === 1 && audio_file === null)
            Toast.show('Please pick an mp3 audio file',Toast.SHORT);
        else
        {
            const body = prepareData();
            if(EditData) {
                body.append('article_id',EditData.article_id);
            }
            setLoader(true);
            if((new_language === "EN" || new_language === "HI") && audio_mode != -1){
                TextToAudio(description, authorName, new_language, audio_file ? audio_file : null, audio_mode === 0 ? true : false)
                .then((res) =>{
                    const {data:{resp}} = res;
                    if(audio_mode === 0){
                        body.append('polly_response_msg', resp);
                    }else{
                        body.append('play_audio', resp);
                    }
                    addArticle(body, EditData ? true : false)
                    .then((res)=>{
                        Toast.show('Article is saved as draft',Toast.LONG);
                        setTimeout(()=>{navigation.goBack();},300);
                    })
                    .catch((error)=>Toast.show('Oops, something went wrong ' + error,Toast.LONG))
                    .finally(()=>setLoader(false));
                    })
                .catch((error)=>Toast.show('Oops Something went wrong',Toast.LONG))
                .finally(()=>setLoader(false))
            }else{
                addArticle(body, EditData ? true : false)
                .then(()=>{
                    Toast.show('Article is saved as draft',Toast.LONG);
                    setTimeout(()=>{navigation.goBack();},300);
                })
                .catch((error)=>Toast.show('Oops, something went wrong ' + error,Toast.LONG))
                .finally(()=>setLoader(false));
            }
        }
    };

    const fetchCreditPoints = () => {
        fetchMyCreditPoints()
          .then(({ data }) => {
            const { institute } = data;
            const { ai_point } = institute;
            setAIPoints(ai_point);
          })
          .catch(() => {
            Toast.show("Oops something went wrong");
          })
          .finally(() => setLoading(false));
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

    const prepareData = () =>{
        const formData = new FormData();
        const cat = categoryList.find(x=>x.value === selectedCategory);
        const subCat = subCatList.find(x=>x.value === selectedSubCat);
        formData.append('article_image', selectedFile ? (typeof selectedFile === 'string' )?  null :  'data:image/jpeg;base64,' + selectedFile.base64 : null);
        formData.append('article_name',name);
        formData.append('article_desc',description);
        formData.append('category',cat.name);
        formData.append('articlesubcategory',selectedSubCat === 'Select A Sub-category' ? '' : subCat.name);
        formData.append('tags',tag);
        const findCountry = COUNTRIES.find(x=>x.value === selectedCountry);
        formData.append('country',findCountry ? findCountry.country_id : selectedCountry === '-- Select Country --' ? 0 : selectedCountry);
        const findState = stateList.find(x=>x.value === selectedState);
        formData.append('state',findState ? findState.state_id  : selectedState === '-- Select State --' ? 0 : selectedState);
        formData.append('source_url',reference);
        formData.append('series_id',selectedSeriesID);
        formData.append('language', selectedLanguage);
        formData.append('new_language', new_language);
        if(new_language === "EN" || new_language === "HI"){
            formData.append('audio_mode', audio_mode);
            if(audio_mode === 0){
                formData.append('author', authorName);
                formData.append('article_poly_description', description);
            }
        }
        return formData;
    };

    const renderSelectedFile = () =>{
        if(selectedFile) 
            return (
                <TouchableOpacity onPress={()=>chooseFile()}>
                    <Image 
                        resizeMode={'contain'} 
                        source={{ uri: EditData ? selectedFile.base64 ? 'data:image/jpeg;base64,' + selectedFile.base64 :   NEW_IMG_BASE + selectedFile :  'data:image/jpeg;base64,' + selectedFile.base64 }} 
                        style={GlobalStyles.selectedImageStyle} 
                    />
                </TouchableOpacity>
            );

        return <SelectImage onPress={()=>chooseFile()} />;
    };

    const ChatGPTAI = () => {
        return (
          <View>
            <DefaultButton
              buttonStyle={{ marginBottom: 10 }}
              buttonText={`Auto Generate Story with ChatGPT AI`}
              onPress={() => {
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
                <ModalHeader headerText={`Enter your thoughts here`}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => setIsActive(false)}>
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </ModalHeader>
                <ScrollView>
                  <TextInput
                    onChangeText={(string) => setAISearchText(string)}
                    placeholder="Search"
                    placeholderTextColor="#414756"
                    value={aiSearchText}
                  />

                  <DefaultButton
                    buttonText={"Generate"}
                    onPress={ChatGPT_AI_Search}
                    showLoader={searchLoader}
                    textStyle={{ fontSize: moderateScale(12) }}
                  />
                  {searchedText != "" && (
                    <>
                      <TextInput
                        multiline
                        onChangeText={(string) => setSearchedText(string)}
                        placeholderTextColor="#414756"
                        scrollEnabled
                        style={[{
                            height: 150,
                            borderColor: "lightgray",
                            borderWidth: 1,
                            padding: 5,
                            marginVertical: 10,
                            borderRadius: 5,
                          },
                        ]}
                        value={searchedText}
                      />
                      <DefaultButton
                        buttonText={"Confirm"}
                        onPress={() => {
                            setDescription(searchedText);
                            setIsActive(false);
                            setAISearchText("");
                            // setSearchedText("");
                        }}
                        showLoader={false}
                        textStyle={{ fontSize: moderateScale(12) }}
                      />
                    </>
                  )}
                </ScrollView>
              </View>
            </Modal>
          </View>
        );
    }

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={EditData ? 'Edit Article' : 'Add Article'} />   
            <ScrollView 
                contentContainerStyle={{padding:moderateScale(10),paddingBottom:moderateScale(100)}} 
                keyboardShouldPersistTaps="never"
                showsVerticalScrollIndicator={false}
            >
                <View style={GlobalStyles.formWrapper}>
                    <Text style={GlobalStyles.inputHeaderName}>ARTICLE NAME
                        <Text style={GlobalStyles.starColor}>*</Text>
                    </Text>
                    <TextInput 
                        onChangeText = {(value)=>setName(value)}
                        placeholder  = {'Enter the article name'}
                        style={GlobalStyles.textInput}
                        value={name}
                    />
                    
                    <ErrorBoundary FallbackComponent={FallBackUI}>
                        <EditorScreen getContent={setDescription} setContent={description} showPreview={true} />
                    </ErrorBoundary>
                    {ChatGPTAI()}
                    <Text style={GlobalStyles.inputHeaderName}>LISTING IMAGE
                        <Text style={GlobalStyles.starColor}>*</Text>
                    </Text>
                    {renderSelectedFile()}
                    <Text style={GlobalStyles.inputHeaderName}>CATEGORY 
                        <Text style={GlobalStyles.starColor}>*</Text>
                    </Text>
                    <View style={GlobalStyles.dropDownView}>
                        <Dropdown
                            data={categoryList}
                            fontSize={12}
                            onChangeText={(value)=>checkSubCategory(value)}
                            pickerStyle={{height:moderateScale(280),padding:moderateScale(10)}}
                            value={selectedCategory}
                        />
                    </View>
                    <Text style={GlobalStyles.inputHeaderName}>SUB CATEGORY </Text>
                    <View style={GlobalStyles.dropDownView}>
                        <Dropdown
                            data={subCatList}
                            fontSize={12}
                            onChangeText={(value)=>setSelectedSubCat(value)}
                            pickerStyle={{paddingHorizontal:moderateScale(10)}}
                            value={selectedSubCat}
                        />
                    </View>
                    <Text style={GlobalStyles.inputHeaderName}>TAGS (No Special Characters)</Text>
                    <TextInput 
                        onChangeText = {(value)=>{
                            const res = tagValidator(value);
                            setTag(res);
                        }}
                        placeholder  = {'Comma separated. Ex:- spenowr,awesome,beautiful'}
                        style={GlobalStyles.textInput}
                        value={tag}
                    />
                    <Text style={GlobalStyles.inputHeaderName}>COUNTRY</Text>
                    <View style={GlobalStyles.dropDownView}>
                        <Dropdown
                            data={COUNTRIES}
                            fontSize={12}
                            onChangeText={(value)=>checkState(value)}
                            value={selectedCountry}
                        />
                    </View>
                    <Text style={GlobalStyles.inputHeaderName}>STATE</Text>
                    <View style={GlobalStyles.dropDownView}>
                        <Dropdown
                            data={stateList}
                            fontSize={12}
                            onChangeText={(value)=>setSelectedState(value)}
                            value={selectedState}
                        />
                    </View>
                    <Text style={GlobalStyles.inputHeaderName}>REFERENCE</Text>
                    <TextInput 
                        onChangeText = {(value)=>setReference(value)}
                        placeholder  = {'Enter a reference link'}
                        style={GlobalStyles.textInput}
                        value={reference}
                    />
                    <Text style={GlobalStyles.inputHeaderName}>Series</Text>
                    <View style={GlobalStyles.dropDownView}>
                        <Dropdown
                            data={series}
                            fontSize={12}
                            onChangeText={(value)=>{
                                setSelectedSeries(value)
                                setSelectedSeriesID(series.find(x=>x.value === value).id)
                                console.log('value : ', series.find(x=>x.value === value).id);
                            }}
                            value={selectedSeries}
                        />
                    </View>
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
                                    style={[GlobalStyles.textInput,{ flex:0.5, alignContent: 'center'}]}
                                    value={authorName}
                                />
                                <DefaultButton buttonStyle={{flex:0.4, height: moderateScale(40), marginTop:moderateScale(0),alignSelf: 'center'}} buttonText={'Speaker'} onPress={()=>setSpeakerModal(true)}/>
                            </View>
                            {speakerModal && 
                                <Speakers 
                                    selectedSpeaker={setAuthorName} 
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
                    <DefaultButton buttonText={EditData ? 'Update' : 'Add'} onPress={()=>validateData()} showLoader={loader} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


AddArticleScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
    route:PropTypes.object.isRequired,
};

export default AddArticleScreen;