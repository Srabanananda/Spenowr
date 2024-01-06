/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState, forwardRef, useImperativeHandle} from 'react';
import {View,Text} from 'react-native';
import {ALLJSONFILTERDATA} from '../../More/Gallery/Gallery/filters';
import styles from './styles';
import CheckBox from '@react-native-community/checkbox';
import { moderateScale } from 'react-native-size-matters';

const CATEGORIES = ALLJSONFILTERDATA[0].category;

const ArtistGenre = forwardRef((props, ref) => {

    const [selectedCat , setSelectedCat] = useState([]);
    const [selectedSubCat , setSelectedSubCat] = useState([]);
    const [selectedType , setSelectedType] = useState([]);

    useImperativeHandle(ref, () => ({
        extractData() {
            return {selectedCat,selectedSubCat,selectedType};
        }
    }));

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

    const renderEachCategory = (eachCategory,index) =>{
        if(eachCategory.type.subcat.length) 
            return(
                <View key={index}>
                    <View  style={styles.eachCategoryCheckBoxView}>
                        <CheckBox
                            onValueChange={(newValue) => {
                                categoryAction(eachCategory,newValue);
                            }}
                            style={styles.checkBox}
                            value={getCategoryValue(eachCategory)}
                        />
                        <Text style={{fontSize:moderateScale(12),marginLeft:moderateScale(10)}}>{eachCategory.type.label.toUpperCase()}</Text>
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
                                    <Text style={{fontWeight:'300',fontSize:moderateScale(14),marginLeft:moderateScale(10)}}>{eachSubcat.subcatGroup.label}</Text>
                                </View>
                                {checkTypesOfSubCategory(eachSubcat.subcatGroup)}
                            </View>
                        ))
                    }
                </View>
            );
        return null;        
    };

    const checkTypesOfSubCategory = (eachSubcat) =>{
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

    return(
        <>
            <Text style={styles.filterHeader}>Artist By Genre</Text>
            {
                CATEGORIES.map((item,index)=>(
                    renderEachCategory(item,index)
                ))
            }
        </>
    );
});

export default ArtistGenre;