/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState, useRef} from 'react';
import {View,TouchableOpacity, SafeAreaView,ScrollView,TextInput,Text} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ModalHeader from '../../../../../@GlobalComponents/ModalHeader';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import styles from './styles';
import COUNTRIES from '@Assets/JsonFiles/country.json';
import { AirbnbRating } from 'react-native-ratings';
import ArtistGenre from './Genre';
import PropTypes from 'prop-types';
import GLOBALJSON from '@Assets/JsonFiles/global.json';
import { moderateScale } from 'react-native-size-matters';

const {
    data:{
        country : COUNTRY_LIST
    }
} = GLOBALJSON;

const SERVICES = [
    {name:'Training Class', value : 'traning_class'},
    {name:'Custom Artworks', value : 'custom_artwork'},
];

export const getApiData = (dataSet={isCustom:false, filters : '',find_trainer:''}) => {

    const getSortType = () =>{
        switch (filters) {
        case 'contributors':
            return 'point';
        case 'top-rated-dance-schools':
            return 'rating';
        case 'top-rated-music-schools':
            return 'rating';
        case 'top-contest-winners':
            return 'date';
        default:
            return 'date';
        }
    };

    const {
        category= '',
        rating = '',
        searchText='',
        selectedCountry={country_id:null},
        selectedState={state_id:null},
        subCategory  = '',
        type  = '',
        isCustom = false,
        filters = '',
        find_trainer= '',
        selectedService = isCustom ? SERVICES[1] :  SERVICES[0]
    } = dataSet;

    return {
        query: searchText,
        page: 'FIRST',
        offset: 0,
        pageRange: 30,
        country: selectedCountry.country_id ? selectedCountry.country_id : '' ,
        state: selectedState.state_id ? selectedState.state_id : '',
        rating: rating,
        cat: category,
        subcat: subCategory,
        find_trainer: find_trainer,
        type: type,
        artist_featured: false,
        service_type : selectedService.value,
        summary_filter : filters,
        sort: getSortType(),
        limit_from: 0,
        limit_to: 30,
    };
};

const ArtistFilters = ({setFilterData,showStates,showServiceType,isCustom}) =>{

    const childGenreRef = useRef();

    const [isActive, setIsActive] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedCountry, setSelectedCountry] = useState({name:'',country_id:null});
    const [rating, setRating] = useState('');
    const [selectedState, setSelectedState] = useState({value:'',state_id:null});
    const [selectedService, setSelectedService] = useState(isCustom ? SERVICES[1] : SERVICES[0]);

    const resetFilters = () =>{
        setIsActive(false);
        setSearchText('');
        setSelectedCountry({name:''});
        setRating('');
        setSelectedState({value:''});
        setSelectedService(SERVICES[0]);
        setFilterData({reset:true});
    };

    const applyFilters = () =>{
        setIsActive(false);
        const {selectedCat,selectedSubCat,selectedType} = childGenreRef.current.extractData();

        const category =  selectedCat.map((each)=>{
            return each.type.value;
        });
        const subCategory =  selectedSubCat.map((each)=>{
            return each.subcatGroup.value;
        });
        const type =  selectedType.map((each)=>{
            return each.item.value;
        });

        const filterObj = {
            searchText,
            selectedService,
            selectedCountry,
            selectedState,
            rating,
            category : category.toString(),
            subCategory: subCategory.toString(),
            type : type.toString()
        };
        setFilterData(filterObj);
    };

    const renderServices = () =>{
        return(
            <>
                <Text style={styles.filterHeader}>Select A Service</Text>
                {SERVICES.map((service,index)=>{
                    const {name} = service;
                    return(
                        <TouchableOpacity key={index} onPress={()=>setSelectedService(service)} style={selectedService.name === name ? {...styles.eachModuleSelected,marginVertical:moderateScale(5)} : styles.eachModule}>
                            <Text style={selectedService.name === name  ?  styles.moduleNameSelected : styles.defaultName}>{name}</Text>
                        </TouchableOpacity>
                    );
                })} 
            </>
        );
    };
   
    const renderEachCountry = (item,index) =>{
        const {name} = item;
        return(
            <TouchableOpacity key={index} onPress={()=>setSelectedCountry(item)} style={selectedCountry.name === name ? styles.eachModuleSelected : styles.eachModule}>
                <Text style={selectedCountry.name === name  ?  styles.moduleNameSelected : styles.defaultName}>{name}</Text>
            </TouchableOpacity>
        );
    };

    const getStates = () =>{
        const {state_list=[]} = COUNTRY_LIST.find((x)=>x.country_id === selectedCountry.country_id);
        if(state_list.length)
            return(
                <>
                    <Text style={styles.filterHeader}>Select State</Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        {state_list.map((state,i)=>{
                            const {value} = state;
                            return(
                                <TouchableOpacity key={i} onPress={()=>setSelectedState(state)} style={selectedState.value === value ? {...styles.eachModuleSelected,marginVertical:moderateScale(5)} : {...styles.eachModule,marginVertical:moderateScale(5)}}>
                                    <Text style={selectedState.value === value  ?  styles.moduleNameSelected : styles.defaultName}>{value}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </>
            );
        return null;
    };

    const renderFilterBox = () =>{
        return(
            <SafeAreaView style={GlobalStyles.GlobalContainer} >
                <View  style={styles.filterContainer}>
                    <ModalHeader headerText={'Filters'}>
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
                    <ScrollView>
                        <TextInput 
                            autoCapitalize='none' 
                            onChangeText={(string) => setSearchText(string) } 
                            placeholder="Search Artists " 
                            placeholderTextColor="#000" 
                            style={styles.textInputBox}
                            value={searchText}
                        />
                        { showServiceType && renderServices()}
                        <Text style={styles.filterHeader}>Select Country</Text>
                        <View style={{flexDirection:'row'}}>
                            {
                                COUNTRIES.map((item,index)=>(
                                    renderEachCountry(item,index)
                                ))
                            }
                        </View>
                        {( showStates && selectedCountry.country_id) ? getStates() : null}
                        <Text style={styles.filterHeader}>Avg Customer Reviews</Text>
                        <AirbnbRating 
                            defaultRating={0}
                            onFinishRating={(value)=>setRating(value)}
                            ratingCount={5}
                            showRating={false}
                            type='custom'
                        />
                        <ArtistGenre ref={childGenreRef}  />
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

ArtistFilters.propTypes = {
    isCustom : PropTypes.bool,
    setFilterData : PropTypes.func.isRequired,
    showServiceType: PropTypes.bool,
    showStates : PropTypes.bool,
};

export default ArtistFilters;