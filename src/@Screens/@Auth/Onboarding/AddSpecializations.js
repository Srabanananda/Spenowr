/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {SafeAreaView,ScrollView,StyleSheet,Text, TouchableOpacity,View, ActivityIndicator} from 'react-native';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../@GlobalStyles';
import Config from '@Config/default';
import { moderateScale, scale } from 'react-native-size-matters';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import { Dropdown } from 'react-native-material-dropdown';
import Card from './Card';
import Toast from 'react-native-simple-toast';
import CheckBox from '@react-native-community/checkbox';
import { getUserDetails, setUserSpecialization } from '../../../@Endpoints/Auth';
import { AirbnbRating } from 'react-native-ratings';
import {GetASubCatTypes, GetCatValue,GetSubCatValue} from '../../../@Utils/helperFiles/GetCatSubcat';
import * as userActions from '@Redux/actions/userActions';

import ARTNCRAFT from '../../../assets/JsonFiles/FilterJsons/productcat_subcat.json';
import DANCE from '../../../assets/JsonFiles/FilterJsons/dancecat_subcat.json';
import PHOTOGRAPHY from '../../../assets/JsonFiles/FilterJsons/photographycat_subcat.json';
import EXERCISE from '../../../assets/JsonFiles/FilterJsons/exercisecat_subcat.json';
import SPORTS from '../../../assets/JsonFiles/FilterJsons/sportscat_subcat.json';
import MUSICAL from '../../../assets/JsonFiles/FilterJsons/musicalcat_subcat.json';
import SINGING from '../../../assets/JsonFiles/FilterJsons/singingcat_subcat.json';
import WRITER from '../../../assets/JsonFiles/FilterJsons/writercat_subcat.json';
import MAGICIAN from '../../../assets/JsonFiles/FilterJsons/magiccat_subcat.json';
import THEATER from '../../../assets/JsonFiles/FilterJsons/actorcat_subcat.json';
import SCULPTURE from '../../../assets/JsonFiles/FilterJsons/sculpcat_subcat.json';
import ILLUSTRATOR from '../../../assets/JsonFiles/FilterJsons/illucat_subcat.json';
import OTHERS from '../../../assets/JsonFiles/FilterJsons/othercat_subcat.json';

//Illustrator
import { connect } from 'react-redux';

const {COLOR:{APP_PINK_COLOR,DARK_BLACK,RED,SUBNAME,LIGHTGREY}} = Config;

const AllCategories =  [{
    'category':[
        ...ARTNCRAFT.category,...MUSICAL.category,...SINGING.category,
        ...DANCE.category,...PHOTOGRAPHY.category,...EXERCISE.category,
        ...SPORTS.category,...WRITER.category,...MAGICIAN.category,
        ...THEATER.category,...SCULPTURE.category,...ILLUSTRATOR.category,
        ...OTHERS.category
    ]
}];

const tempArr = AllCategories[0].category;

const categoryList = tempArr.map((each)=>{
    const {type :{label,value}} = each;
    return {name : value,value:label};
});

const AddSpecializationsScreen = ({...props}:any) =>{

    const {navigation,route:{params},updateUserDetails} = props;

    const currentSkill = params ? JSON.parse(params.currentSkill) : null;
    const skillNum = params ? params.skillNum : 1;
    const createNew = params ? params.createNew : false;

    const [specializationNum, setSpecializationNum] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('Select A Category');

    const [mainSubcat, setMainSubCat] = useState([]);

    const [selectedSubCat, setSelectedSubCat] = useState('Select A Sub-category');
    const [subCatList, setSubCatList] = useState([]);

    const [types, setTypes] = useState([]);
    const [isArtTrainer,  setIsArtTrainer] = useState(false);
    const [rating, setRating] =  useState(4);

    const [selectedTypes, setSelectedTypes] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(()=>{
        if(currentSkill && !createNew)
        {
            try {
                const {cat,subcat,type,trainer,rating} = currentSkill;
                const category = GetCatValue(cat);
                setSelectedCategory(category ? category : 'Select A Category');
                setRating(rating);
                setIsArtTrainer(trainer === '0' ? false : true);
                setSpecializationNum(skillNum);

                const subCategory = GetSubCatValue(cat,subcat);
                const mainCatObj = GetCatValue(cat,true);
                if(subCategory) {
                    const types = GetASubCatTypes(mainCatObj.type.subcat,subCategory);
                    const res = type.split(',');
                    const typeArr = [];
                    res.map(each=>{
                        const tp = types.subcatGroup.type.filter(eachType => eachType.item.value === each);
                        typeArr.unshift(...tp);
                    });
                    setMainSubCat(mainCatObj.type.subcat);
                
                    setTimeout(()=>{
                        setTypes(types.subcatGroup.type);
                        setSelectedSubCat(subCategory ? subCategory : 'Select A Sub-category');
                        setSelectedTypes(typeArr);
                    },500);
                }
            } catch (error) {
                Toast.show('Oops Couldnot Set Data',Toast.LONG);
            }
        }
        else
        {
            if(createNew)  setSpecializationNum(skillNum);
        }
    },[]);

    useEffect(()=>{
        if(mainSubcat.length)
        {
            const subCats = mainSubcat.map((each)=>{
                const {subcatGroup :{label,value}} = each;
                return {name : value,value:label};
            });
            setTypes([]);
            setSelectedTypes([]);
            if(subCats.length) 
                setSelectedSubCat('Select A Sub-category');
            setSubCatList(subCats);
        }
        else setSubCatList([]);
    },[mainSubcat]);

    useEffect(()=>{
        if(specializationNum>3) navigation.navigate('CoreTabs');
        else {
            currentSkill ? null : Toast.show('Select your next specialization',Toast.SHORT);
        }
    },[specializationNum]);

    const getNumber = () =>{
        switch (specializationNum) {
        case 1:
            return '1st';
        case 2:
            return '2nd';
        case 3:
            return '3rd';
        default:
            return '1st';
        }
    };

    const resetForm = () =>{
        setSelectedCategory('Select A Category');
        setSelectedSubCat('Select A Sub-category');
        setTypes([]);setSelectedTypes([]);
        setRating(4);
        setIsArtTrainer(false);
    };

    const prepareData =() =>{
        const cat = categoryList.find(x=>x.value === selectedCategory);
        const subCat = subCatList.find(x=>x.value === selectedSubCat);
        const types = selectedTypes.map(each=>{
            return each.item.value;
        });
        
        const body = new FormData();
        body.append(`skill${specializationNum}category`,cat.name);
        if(subCat) body.append(`skill${specializationNum}sub_category`,subCat.name);
        else body.append(`skill${specializationNum}sub_category`,'');
        if(types)body.append(`skill${specializationNum}type`,types.toString());
        else body.append(`skill${specializationNum}type`,'');
        body.append(`skill${specializationNum}art_trainer`,isArtTrainer);
        body.append(`skill${specializationNum}rating`,rating);
        return body;
    };

    const addMore = (type) =>{
        if(selectedCategory === 'Select A Category')
            Toast.show('Please Select A Category',Toast.LONG);
        else{
            setLoader(true);
            const body = prepareData();
            setUserSpecialization(body,specializationNum === 1 ? '' : specializationNum === 2  ? '-one' : '-two')
                .then(()=>{
                    if(currentSkill){
                        if(createNew) Toast.show('Specialization Added successfully',Toast.LONG);
                        else Toast.show('Specialization updated successfully',Toast.LONG);
                        refreshProfileDetails();
                    }
                    else
                    {   
                        if(type === 'save')
                        {
                            navigation.navigate('CoreTabs');
                            setLoader(false);
                        }
                        else
                        {
                            setLoader(false);
                            resetForm();
                            setSpecializationNum(specializationNum+1);
                        }
                    }
                })
                .catch(()=>{
                    setLoader(false);
                    Toast.show('Oops Something went wrong',Toast.LONG);
                });
        }
    };

    const refreshProfileDetails = () =>{
        getUserDetails()
            .then(res=>{
                const {data:{institute={},profileData={}}} = res;
                updateUserDetails(institute,profileData);
                setLoader(false);
                navigation.goBack();
            })
            .catch(()=>{
                Toast.show('Couldnot refresh profile',Toast.LONG);
                setLoader(false);
            });
    };

    const checkSubCategory =  (selected) =>{
        setSelectedCategory(selected);
        const val = tempArr.find((x)=>x.type.label === selected);
        setMainSubCat(val.type.subcat);
    };

    const checkType = (selected) =>{
        setSelectedSubCat(selected);
        const val = mainSubcat.find((x)=>x.subcatGroup.label === selected);
        if(val)setTypes(val.subcatGroup.type);
    };

    const handleChange = (value) =>{
        setSelectedTypes(value);
    };

    const checkActions = () =>{ 
        if(currentSkill) addMore('save');
        else getNumber() === '1st' ?  addMore('save') : navigation.navigate('CoreTabs'); 
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={currentSkill && !createNew ? 'Edit Your Specialization'  : `Choose Your ${getNumber()} Specialization`} showBackButton={false} >
                <TouchableOpacity 
                    onPress={()=>checkActions()}
                >
                    {
                        (loader) && <ActivityIndicator color={APP_PINK_COLOR} size={'small'} /> 
                    }
                    {
                        (!loader) && <Text style={styles.saveText}>{currentSkill ? createNew ? 'Add' : 'Update' : getNumber() === '1st' ? 'Save' : 'Skip'}</Text>
                    }
                </TouchableOpacity>
            </DefaultHeader >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.formWrapper}>
                    <Text style={styles.inputHeaderName}>CATEGORY 
                        <Text style={styles.starColor}>*</Text>
                    </Text>
                    <View style={styles.dropDownView}>
                        <Dropdown
                            data={categoryList}
                            fontSize={12}
                            onChangeText={(value)=>checkSubCategory(value)}
                            pickerStyle={{height:moderateScale(280),padding:moderateScale(10)}}
                            value={selectedCategory}
                        />
                    </View>
                    <Text style={styles.inputHeaderName}>SUB CATEGORY </Text>
                    <View style={styles.dropDownView}>
                        <Dropdown
                            data={subCatList}
                            fontSize={12}
                            onChangeText={(value)=>checkType(value)}
                            pickerStyle={{paddingHorizontal:moderateScale(10)}}
                            value={selectedSubCat}
                        />
                    </View>
                    <Text style={styles.inputHeaderName}>TYPES</Text>
                    <View style={styles.subCatView}>
                        {
                            types.map((item,index)=>(
                                <Card cardItem={item} currentSkill={currentSkill} data={selectedTypes} handleChange={handleChange}  key={index} type={'small'} />
                            ))
                        }
                        {
                            (!types.length) && <Text style={styles.notTypes}>No Types Available.</Text>
                        }
                    </View>
                    <View style={{flexDirection:'row',marginVertical:moderateScale(10),alignItems:'center'}}>
                        <CheckBox
                            disabled={false}
                            onValueChange={(newValue) => {
                                setIsArtTrainer(newValue);
                            }}
                            style={{marginRight:moderateScale(10),width:25,height:25}}
                            value={isArtTrainer}
                        />
                        <Text style={[styles.inputHeaderName,{marginTop:-2}]}>Available As Art Trainer ?</Text>
                    </View>
                    <Text style={styles.inputHeaderName}>Rate Yourself</Text>
                    <AirbnbRating 
                        defaultRating={rating}
                        minValue={1}
                        onFinishRating={(value)=>setRating(value)}
                        ratingCount={5}
                        style={{width:moderateScale(250),marginTop:5}}
                        type='heart'
                    />
                </View> 
            </ScrollView>
            {
                currentSkill ? null : <DefaultButton 
                    buttonStyle={{width:'90%',alignSelf:'center'}} 
                    buttonText={getNumber() === '3rd' ? 'Save' : 'Save & Add More'} 
                    onPress={()=>addMore()} 
                    showLoader={loader}
                />
            }
        </SafeAreaView>
    );
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProp = (dispatch) => ({
    updateUserDetails:(instituteObj,profileObj) =>
        dispatch(userActions.updateUserDetails(instituteObj,profileObj)),
});

export default connect(mapStateToProps,mapDispatchToProp)(AddSpecializationsScreen);

const styles = StyleSheet.create({
    saveText: {
        color:APP_PINK_COLOR
    },
    cardWrapper:{
        flexDirection:'row',flexWrap:'wrap',
        justifyContent:'space-between',
        alignItems:'center',
       
    },
    scrollContainer:{
        padding:moderateScale(15),
        paddingBottom:moderateScale(100)
    },
    formWrapper:{
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(4), elevation: moderateScale(2),
        shadowOffset: {
            height: scale(2),
            width: scale(2)
        },
        backgroundColor:'#fff',
        margin:moderateScale(10),
        padding:moderateScale(10),
        paddingHorizontal:moderateScale(10),
        borderTopColor:APP_PINK_COLOR,
        borderTopWidth:1.5
    },
    inputHeaderName:{
        color:DARK_BLACK,
        marginTop:moderateScale(8),
        fontSize:moderateScale(12)
    },
    starColor:{
        color:RED,
    }, 
    subCatView:{
        flexDirection:'row',flexWrap:'wrap',
        marginTop:moderateScale(20)
    },
    notTypes:{
        color:SUBNAME,marginLeft:moderateScale(20),marginTop:moderateScale(-5)
    },
    textInput:{
        borderWidth:1,paddingHorizontal:moderateScale(15),
        borderColor:LIGHTGREY,
        marginVertical:moderateScale(8),
        borderRadius:moderateScale(3),
        height:moderateScale(40)
    },
});