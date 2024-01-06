/**
 * Create By @name Sukumar_Abhijeet
 */

import React, { useState } from 'react';
import { TouchableOpacity,View,Text,TextInput,ScrollView,SafeAreaView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import styles from './styles';
import Modal from 'react-native-modal';
import DefaultButton from '../../../../../../@GlobalComponents/DefaultButton';
import CheckBox from '@react-native-community/checkbox';
import * as galleryActions from '../../../../../../@Redux/actions/galleryActions';
import { connect } from 'react-redux';
import ARTNCRAFT from '../../../../../../assets/JsonFiles/FilterJsons/productcat_subcat.json';
import DANCE from '../../../../../../assets/JsonFiles/FilterJsons/dancecat_subcat.json';
import PHOTOGRAPHY from '../../../../../../assets/JsonFiles/FilterJsons/photographycat_subcat.json';
import EXERCISE from '../../../../../../assets/JsonFiles/FilterJsons/exercisecat_subcat.json';
import SPORTS from '../../../../../../assets/JsonFiles/FilterJsons/sportscat_subcat.json';
import MUSICAL from '../../../../../../assets/JsonFiles/FilterJsons/musicalcat_subcat.json';
import SINGING from '../../../../../../assets/JsonFiles/FilterJsons/singingcat_subcat.json';

import ModalHeader from '../../../../../../@GlobalComponents/ModalHeader';

export const ALLJSONFILTERDATA =  [{
    'category':[
        ...ARTNCRAFT.category,...MUSICAL.category,...SINGING.category,
        ...DANCE.category,...PHOTOGRAPHY.category,...EXERCISE.category,
        ...SPORTS.category
    ]
}];

const Filters = ({...props}) =>{

    const {fetchGalleryPhotography} = props;

    const [isActive, setIsActive] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedCat , setSelectedCat] = useState([]);
    const [selectedSubCat , setSelectedSubCat] = useState([]);
    const [selectedType , setSelectedType] = useState([]);

    const applyFilters = () =>{

        const category =  selectedCat.map((each)=>{
            return each.type.value;
        });
        const subCategory =  selectedSubCat.map((each)=>{
            return each.subcatGroup.value;
        });
        const type =  selectedType.map((each)=>{
            return each.item.value;
        });

        callApi(category.toString() , subCategory.toString() ,type.toString());
    };

    const callApi = (cat , subcat , type) =>{
        let formData = new FormData();
        formData.append('id','');
        formData.append('page','FIRST');
        formData.append('offset',0);
        formData.append('sort','');
        formData.append('photography_name',searchText);
        formData.append('photography_category','');
        formData.append('cat',cat);
        formData.append('subcat',subcat);
        formData.append('type',type);
        formData.append('slug','');
        formData.append('user_id','');
        formData.append('pageRange',15);
        formData.append('limit_from',0);
        formData.append('limit_to',20);
        fetchGalleryPhotography(formData,0);
        setIsActive(false);
    };

    const clearFilters = () =>{
        setIsActive(false);
    };

    const categoryAction = (item,type) =>{
        if(type)
        {
            const arr = [...selectedCat,item];
            setSelectedCat(arr);
        }
        else
        {
            const newArr = [...selectedCat];
            const index = newArr.findIndex(x => x.type.label === item.type.label);
            newArr.splice(index, 1);
            setSelectedCat(newArr);
        }
    };

    const subCategoryAction = (item,type) =>{
        if(type)
        {
            const arr = [...selectedSubCat,item];
            setSelectedSubCat(arr);
        }
        else
        {
            const newArr = [...selectedSubCat];
            const index = newArr.findIndex(x => x.subcatGroup.label === item.subcatGroup.label);
            newArr.splice(index, 1);
            setSelectedSubCat(newArr);
        }
    };

    const typeAction = (selectedItem,type) =>{
        if(type)
        {
            const arr = [...selectedType,selectedItem];
            setSelectedType(arr);
        }
        else
        {
            const newArr = [...selectedType];
            const index = newArr.findIndex(x => x.item.label === selectedItem.item.label);
            newArr.splice(index, 1);
            setSelectedType(newArr);
        }
    };

    const getCategoryValue =(item)=> {
        const index = selectedCat.findIndex(x => x.type.label === item.type.label);
        if(index === -1) return false;
        else return true;
    };

    const getSubCategoryValue = (item) =>{
        const index = selectedSubCat.findIndex(x => x.subcatGroup.label === item.subcatGroup.label);
        if(index === -1) return false;
        else return true;
    };

    const getTypeValue = (selectedItem) =>{
        const index = selectedType.findIndex(x => x.item.label === selectedItem.item.label);
        if(index === -1) return false;
        else return true;
    };

    const renderData = (item) =>{
        const {category} = item;
        return(
            <View>
                {
                    category.map((eachCategory,index)=>(
                        renderEachCategory(eachCategory,index)
                    ))
                }
            </View>
        );
    };

    const renderEachCategory = (eachCategory,index) =>{
        if(eachCategory.type.subcat.length) 
            return(
                <View key={index}>
                    <View  style={{flexDirection:'row',alignItems:'center',paddingLeft:moderateScale(5),paddingTop:moderateScale(4)}}>
                        <CheckBox
                            onValueChange={(newValue) => {
                                categoryAction(eachCategory,newValue);
                            }}
                            style={styles.checkBox}
                            value={getCategoryValue(eachCategory)}
                        />
                        <Text style={{fontWeight:'bold',fontSize:moderateScale(15),marginLeft:moderateScale(10)}}>{eachCategory.type.label.toUpperCase()}</Text>
                    </View>
                    {checkSubCat(eachCategory)}
                </View>
            );
        return null;
    };

    const checkSubCat = (eachCategory) =>{
        const {type=undefined} = eachCategory;
        if(type && type.subcat.length)
            return(
                <View style={{marginLeft:moderateScale(40)}}>
                    {
                        type.subcat.map((eachSubcat,index)=>(
                            <View key={index}>
                                <View style={{flexDirection:'row',alignItems:'center',marginBottom:moderateScale(10)}}>
                                    <CheckBox
                                        disabled={false}
                                        onValueChange={(newValue) => {
                                            subCategoryAction(eachSubcat,newValue);
                                        }}
                                        style={styles.checkBox}
                                        value={getSubCategoryValue(eachSubcat)}
                                    />
                                    <Text style={{fontWeight:'600',fontSize:moderateScale(14),marginLeft:moderateScale(10)}}>{eachSubcat.subcatGroup.label}</Text>
                                </View>
                                {checkFurtherSubCatGroup(eachSubcat.subcatGroup)}
                            </View>
                        ))
                    }
                </View>
            );
        return null;        
    };

    const checkFurtherSubCatGroup = (eachSubcat) =>{
        const {type=undefined} = eachSubcat;
        if(type && type.length)
            return(
                <View style={{marginLeft:moderateScale(50)}}>
                    {
                        type.map((furtherSubcat,index)=>(
                            <View key={index}>
                                <View style={{flexDirection:'row',alignItems:'center',marginBottom:moderateScale(10)}}>
                                    <CheckBox
                                        disabled={false}
                                        onValueChange={(newValue) => {
                                            typeAction(furtherSubcat,newValue);
                                        }}
                                        style={styles.checkBox}
                                        value={getTypeValue(furtherSubcat)}
                                    />
                                    <Text style={{marginLeft:moderateScale(10)}}>{furtherSubcat.item.label}</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
            );
        return null;        
    };

    const renderFilterBox = () =>{
        return(
            <SafeAreaView style={styles.filterContainer}>
                <View style={{margin:Platform.OS === 'ios' ? moderateScale(10) : 0 }}>
                    <ModalHeader headerText={'Apply Filters'} onPress={()=>setIsActive(false)} />
                    <TextInput 
                        autoCapitalize='none' 
                        onChangeText={(string) => setSearchText(string) } 
                        placeholder="Search Artwork here .." 
                        placeholderTextColor="#414756" 
                        style={styles.textInputBox}
                    />
                    <Text style={styles.filterHeader}>Choose Category</Text>
                    <ScrollView contentContainerStyle={{paddingBottom:moderateScale(100)}} showsVerticalScrollIndicator={false}>
                        {
                            ALLJSONFILTERDATA.map((item)=>(
                                renderData(item)
                            ))
                        }
                    </ScrollView>
                   
                </View>
                <View  style={styles.bottomWrapper} >
                    <DefaultButton buttonStyle={styles.clearButton} buttonText={'Cancel'} onPress={()=>clearFilters()} showLoader={false} textStyle={{fontSize:moderateScale(12)}} />
                    <DefaultButton buttonStyle={styles.applyButton} buttonText={'Apply'} onPress={()=>applyFilters()} showLoader={false} textStyle={{fontSize:moderateScale(12)}} />
                </View>
            </SafeAreaView>
        );
    };

    return(
        <>
            <TouchableOpacity onPress={()=>setIsActive(true)} style={styles.filterIcon}>
                <Icon color={'#fff'} name={'filter'} size={moderateScale(20)}  />
            </TouchableOpacity>
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={isActive}
                onBackButtonPress= {()=>{
                    setIsActive(false); 
                }}
                onBackdropPress = {()=>{
                    setIsActive(false); 
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderFilterBox()}
            </Modal>
        </>
    );
};

Filters.propTypes = {
    fetchGalleryPhotography:PropTypes.func.isRequired,
};

function mapStateToProps(){
    return{};
}

function mapDispatchToProps(dispatch){
    return{
        fetchGalleryPhotography:(data,fromLimit) =>
            dispatch(galleryActions.fetchGalleryPhotography(data,fromLimit)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Filters);