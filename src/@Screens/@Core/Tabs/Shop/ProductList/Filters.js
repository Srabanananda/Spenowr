/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,SafeAreaView,TouchableOpacity, StyleSheet,Text,TextInput,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import ModalHeader from '../../../../../@GlobalComponents/ModalHeader';
import { AirbnbRating } from 'react-native-ratings';
import ALL_CAT from '@Assets/JsonFiles/ProductsJson/product_category.json';
import FILTERS from '@Assets/JsonFiles/ProductsJson/filters.json';
import CheckBox from '@react-native-community/checkbox';
import { removeFromArray } from '../../../../../@Utils/helperFiles/helpers';
import FormHeader  from '@GlobalComponents/FormHeader';

const {PRICE_RANGES,MONTHLY_SHOPS,TYPES,SORTING} = FILTERS;
const {product_category : CATEGORIES} = ALL_CAT;
const {COLOR:{SUBNAME,APP_PINK_COLOR,WHITE,LIGHTGREY}} = Config;

type FilterProps = {
    setAppliedFilters : Function,
    extCat : string,
    extSubcat: string
}

const Filters = ({...props}:FilterProps) =>{

    const  {setAppliedFilters,extCat,extSubcat} = props;
    
    const [isActive, setIsActive] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [rating, setRating] = useState('');
    const [minSize,setMinSize] = useState('');
    const [maxSize, setMaxSize] = useState('');
    const [arrivals, setArrivals] = useState([]);
    const [priceRanges, setPriceRanges] = useState([]);
    const [categories,setCategories] = useState(extCat);
    const [subCategories,setSubCategories] = useState(extSubcat);

    const [showCat,setShowCat] = useState(false);
    const [showPrice, setShowPrice] = useState(false);
    const [sorting,setSorting] = useState('new');

    const filteredObj = {
        cat : categories.toString(),
        subcat : subCategories.toString(),
        priceRange : priceRanges.toString(),
        monthlyshop: arrivals.toString(),
        rating: rating,
        min_size:minSize,
        max_size:maxSize,
        query : searchText,
        sort : sorting,
    };

    const applyFilters = () =>{
        setIsActive(false);
        setAppliedFilters(filteredObj);
    };

    const resetFilters = () =>{
        setArrivals([]);
        setPriceRanges([]);
        setCategories(extCat);
        setSubCategories(extSubcat);
        setSearchText('');
        setMinSize('');
        setMinSize('');
        setRating('');
        setIsActive(false);
        setSorting('new');
        filteredObj.cat = extCat;
        filteredObj.subcat= extSubcat;
        filteredObj.query = '';
        filteredObj.priceRange = '';
        filteredObj.monthlyshop = '';
        filteredObj.rating = '';
        filteredObj.min_size = '';
        filteredObj.max_size = '';
        filteredObj.sort = 'new';
        setAppliedFilters(filteredObj);
    };

    const getArrayByType = (type) =>{
        let arr = [];
        switch (type) {
        case TYPES[0]:
            arr = arrivals;
            break;
        case TYPES[1]:
            arr = priceRanges;
            break;
        case TYPES[2]:
            arr = categories;
            break;
        case TYPES[3]:
            arr = subCategories;
            break;
        default:
            break;
        }
        return arr;
    };

    const checkArrays = (each,value,type) => {
        let currentArr = getArrayByType(type);
        if(each){
            let temp = [...currentArr];
            temp.push(value);
            if(type === TYPES[0]) setArrivals(temp);
            if(type === TYPES[1]) setPriceRanges(temp);
            if(type === TYPES[2]) setCategories(temp);
            if(type === TYPES[3]) setSubCategories(temp);
        }
        else {
            if(type === TYPES[0])setArrivals(removeFromArray(currentArr,value));
            if(type === TYPES[1])setPriceRanges(removeFromArray(currentArr,value));
            if(type === TYPES[2])setCategories(removeFromArray(currentArr,value));
            if(type === TYPES[3])setSubCategories(removeFromArray(currentArr,value));
        }
    };

    const isCheckboxSelected = (value,type) => {
        const arr = getArrayByType(type);
        const index = arr.indexOf(value);
        if(index === -1) return false;
        return true;
    };

    // ============================================================================> RENDERING <============================================================================= 

    const renderPriceRanges = (item,i) => {
        return(
            <View key={i} style={styles.checkboxWrapper}>
                <CheckBox
                    disabled={false}
                    onValueChange={(val)=>checkArrays(val,item.Value,TYPES[1])}
                    style={{marginRight:moderateScale(10)}}
                    value={isCheckboxSelected(item.Value,TYPES[1])}
                />
                <Text style={GlobalStyles.inputHeaderName}>{item.Name}</Text>
            </View>
        );
    };

    const renderArrivals = (item,i) => {
        return(
            <View key={i} style={styles.checkboxWrapper}>
                <CheckBox
                    disabled={false}
                    onValueChange={(val)=>checkArrays(val,item.Value,TYPES[0])}
                    style={{marginRight:moderateScale(10)}}
                    value={isCheckboxSelected(item.Value,TYPES[0])}
                />
                <Text style={GlobalStyles.inputHeaderName}>{item.Name}</Text>
            </View>
        );
    };

    const renderCategories = ({type},i) => {
        const {label,value,subcat=[]} = type;
        return(
            <View key={i}>
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        disabled={false}
                        onValueChange={(val)=>checkArrays(val,value,TYPES[2])}
                        style={{marginRight:moderateScale(10)}}
                        value={isCheckboxSelected(value,TYPES[2])}
                    />
                    <Text style={GlobalStyles.inputHeaderName}>{label}</Text>
                </View>
                {renderSubCategory(subcat,value)}
            </View>
        );
    };

    const renderSubCategory = (subcats,catVal) => {
        const isSelected = isCheckboxSelected(catVal,TYPES[2]);
        if(isSelected && subcats.length)
        {
            return(
                <>
                    {
                        subcats.map(({subcatGroup},i)=>{
                            const {label,value} = subcatGroup;
                            return(
                                <View key={i} style={{...styles.checkboxWrapper,marginLeft:moderateScale(35)}}>
                                    <CheckBox
                                        disabled={false}
                                        onValueChange={(val)=>checkArrays(val,value,TYPES[3])}
                                        style={{marginRight:moderateScale(10)}}
                                        value={isCheckboxSelected(value,TYPES[3])}
                                    />
                                    <Text style={GlobalStyles.inputHeaderName}>{label}</Text>
                                </View>
                            );
                        })
                    }
                </>
            );
        }
        return null;
    };

    // ============================================ FILTER BOXES =================================================

    const categoryFilter = () => showCat?CATEGORIES.map((item,i)=>renderCategories(item,i)) : null;
    const priceFilter = () => showPrice ? PRICE_RANGES.map((item,i)=>renderPriceRanges(item,i)) : null;
   
    // ============================================ FILTER BOXES =================================================

    const renderFilterBox = () =>{
        return(
            <SafeAreaView style={GlobalStyles.GlobalContainer} >
                <View  style={styles.filterContainer}>
                    <ModalHeader headerText={'Filters'} onPress={()=>setIsActive()} >
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>applyFilters()} style={{...GlobalStyles.seeMoreButtonRev,marginRight:moderateScale(10)}}>
                                <Text style={GlobalStyles.seeMoreButtonTextRev} >Apply</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>resetFilters()} style={GlobalStyles.seeMoreButton}>
                                <Text style={GlobalStyles.seeMoreButtonText} >Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>setIsActive(false)}>
                                <Text style={styles.closeText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </ModalHeader>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <TextInput 
                            autoCapitalize='none' 
                            onChangeText={(string) => setSearchText(string) } 
                            placeholder="Search Products " 
                            placeholderTextColor="#000" 
                            style={styles.textInputBox}
                            value={searchText}
                        />
                        
                        <FormHeader accordianChild={categoryFilter} headerText={'Categories'} onPress={()=> showCat ? null : setShowCat(!showCat)} outlined >
                            <TouchableOpacity onPress={()=>setShowCat(!showCat)}>
                                <Icon color={APP_PINK_COLOR} name={!showCat ? 'chevron-down' : 'chevron-up'} size={24} />
                            </TouchableOpacity>
                        </FormHeader>

                        <FormHeader accordianChild={priceFilter} containerStyle={{marginTop:moderateScale(8)}} headerText={'Price Range'} onPress={()=> showPrice ? null : setShowPrice(!showPrice)} outlined >
                            <TouchableOpacity onPress={()=>setShowPrice(!showPrice)}>
                                <Icon color={APP_PINK_COLOR} name={!showCat ? 'chevron-down' : 'chevron-up'} size={24} />
                            </TouchableOpacity>
                        </FormHeader>
                       
                        <Text style={styles.filterHeader}>Dimensions</Text>
                        <View style={styles.sizesWrapper}>
                            <TextInput 
                                autoCapitalize='none' 
                                onChangeText={(string) => setMinSize(string) } 
                                placeholder="Min Size " 
                                placeholderTextColor="#000" 
                                style={{...styles.textInputBox,width:'48%'}}
                                value={minSize}
                            />
                            <TextInput 
                                autoCapitalize='none' 
                                onChangeText={(string) => setMaxSize(string) } 
                                placeholder="Max Size" 
                                placeholderTextColor="#000" 
                                style={{...styles.textInputBox,width:'48%'}}
                                value={maxSize}
                            />
                        </View>
                        <Text style={styles.filterHeader}>New Arrivals</Text>
                        {MONTHLY_SHOPS.map((item,i)=>renderArrivals(item,i))}
                        <Text style={styles.filterHeader}>Avg Customer Reviews</Text>
                        <AirbnbRating 
                            defaultRating={0}
                            onFinishRating={(value)=>setRating(value)}
                            ratingCount={5}
                            showRating={false}
                            type='custom'
                        />
                        <Text style={styles.filterHeader}>Sort By</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            {
                                SORTING.map((item,i)=>{
                                    return(
                                        <TouchableOpacity key={i} onPress={()=>setSorting(item.Value)} style={[GlobalStyles.seeMoreButton,{marginRight:moderateScale(15)},sorting === item.Value ? GlobalStyles.seeMoreButtonRev : {}]}>
                                            <Text style={[GlobalStyles.seeMoreButtonText,sorting === item.Value ? GlobalStyles.seeMoreButtonTextRev : {}]}>{item.Name}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    };

    return(
        <>
            <TouchableOpacity onPress={()=>setIsActive(true)} style={styles.filterIcon}>
                <Icon color={'#fff'} name={'filter'} size={20} />
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
                style={{margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderFilterBox()}
            </Modal>
        </>
    );
};

export default Filters;

const styles = StyleSheet.create({
    filterIcon:{
        position:'absolute',
        bottom:moderateScale(20),
        right:moderateScale(20),
        backgroundColor:APP_PINK_COLOR,
        width:moderateScale(50),
        height:moderateScale(50),
        justifyContent:'center',alignItems:'center',
        borderRadius:moderateScale(30),
        zIndex:100
    },
    filterContainer:{
        backgroundColor:WHITE,
        padding:moderateScale(10),
        flex:1,
    },
    closeText:{
        color:SUBNAME,
        marginLeft:moderateScale(10)
    },
    textInputBox:{
        height:moderateScale(40),
        backgroundColor:LIGHTGREY,
        borderRadius:moderateScale(10),
        marginVertical:moderateScale(10),
        width:'100%',
        paddingHorizontal:moderateScale(10),
    },
    sizesWrapper:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    filterHeader:{
        marginVertical:moderateScale(10),
        fontWeight:'bold',
        fontSize:moderateScale(14)
    },
    checkboxWrapper:{flexDirection:'row',marginTop:moderateScale(8),paddingLeft:moderateScale(8)},
});