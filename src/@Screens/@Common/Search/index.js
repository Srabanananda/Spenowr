/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useRef,useEffect} from 'react';
import {ScrollView,Text,StyleSheet,SafeAreaView,TextInput,TouchableOpacity,View} from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import WhatsNewSearch from './WhatsNew';
import ProductsSearch from './Products';
import ServicesSearch from './Services';
import ArtistsSearch, { artistDataSet } from './Artists';
import ArtworksSearch from './Artworks';
import ArticlesSearch from './Articles';
import QuotesNPoemsScreen from './QuotesNPoems';
import { TabsFormData } from '../../@Core/Tabs/Home';
import { getWhatsNewFeed } from '../../../@Endpoints/Core/Tabs/WhatsNew/index';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import Toast from 'react-native-simple-toast';
import { getAllInstitutesWithFilter } from '../../../@Endpoints/Core/Dialog/FindArtiest';
import { HOME_FILTERS } from '../../../assets/JsonFiles/HomeFilters';
import ContestSearch from './Contests';
import JobsSearch from './Jobs';

const {COLOR:{LIGHTGREY,APP_PINK_COLOR, DARKGRAY}} = Config;

interface searchProps{
    route: Object
}

const tabs = [
    {name:'Relevant',value:'whatsnew',feedType:''},
    {name : 'Artists', value:'artist',feedType:''},
    ...HOME_FILTERS
];

const SearchScreen = ({...props}:searchProps) =>{
    
    const {route:{params:{searchLoad}}} = props;

    const scrollViewRef = useRef();

    const {searchString, type} = searchLoad;
    const [search, setSearch] = useState(searchString);
    const [loading, setLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState(type ? type : 'whatsnew');
    const [searchResult, setSearchResult] = useState({list:[]});
    const [artistResults, setArtistResults] = useState({list:[]});

    useEffect(()=>{
        currentTab === 'artist' ?  callArtistApi(searchString) : callApi(searchString);
    },[]);

    const callApi = (string) => {
        setArtistResults([]);
        setLoading(true);
        const filters = {searchText :string };
        const {feedType=''} = tabs.find(tab => tab.value === currentTab);
        const getData = TabsFormData(filters,0,'',feedType);
        getWhatsNewFeed(getData)
            .then(res=>setSearchResult(res.data))
            .catch(()=> Toast.show('Oops Something went wrong'))
            .finally(()=>setLoading(false));
    };

    const callArtistApi = (string) => {
        setSearchResult([]);
        setLoading(true);
        const getData = artistDataSet(string);
        getAllInstitutesWithFilter(0,getData)
            .then((res)=>setArtistResults(res.data)).catch()
            .finally(()=>{
                setLoading(false);
            });
    };

    const renderEachTab = (tab,index) =>{
        return (
            <TouchableOpacity 
                key={index}
                onPress={()=>setCurrentTab(tab.value)} 
                style={[styles.defaultTab,{borderBottomWidth: tab.value === currentTab ? 1.5 : 0}]}
            >
                <Text style={{fontWeight:'bold',fontSize:moderateScale(12),color : tab.value === currentTab ? APP_PINK_COLOR  : DARKGRAY}}>{tab.name}</Text>
            </TouchableOpacity>
        );
    };

    const renderSelectedTabData = () =>{

        const {list=[]} = searchResult;
        const {list: artistList=[]} = artistResults;
        switch (currentTab) {
        case 'whatsnew':
            return <WhatsNewSearch results={list} />;
        case 'product':
            return <ProductsSearch results={list.filter(item=>item.type==='product')} />;
        case 'service':
            return <ServicesSearch results={list.filter(item=>item.type==='service')} />;
        case 'artist':
            return <ArtistsSearch results={artistList} />;
        case 'art-work':
            return <ArtworksSearch results={list.filter(item=>item.type==='gallery')} />;
        case 'quote':
        case 'poem':
            return <QuotesNPoemsScreen results={list.filter(item=>item.type==='Quote')} />;
        case 'story-blogs':
            return <ArticlesSearch results={list.filter(item=>item.type==='article')} />;
        case 'contest':
            return <ContestSearch results={list.filter(item=>item.type==='contest')} />;
        case 'jobs':
            return <JobsSearch results={list.filter(item=>item.type==='jobs')} />;
        
        default:
            return <WhatsNewSearch results={list} />;
        }
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Search'} />
            <TextInput 
                autoCapitalize='none' 
                onChangeText={(string) => {
                    setSearch(string);
                    if(string.length > 3) currentTab === 'artist' ? callArtistApi(string) :  callApi(string); 
                }} 
                placeholder="Enter your query .."
                placeholderTextColor="#414756"
                style={styles.textInputBox}
                value={search}
            />
            <View>
                <ScrollView 
                    horizontal={true}
                    ref={scrollViewRef} 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.tabScrollContainer} 
                >
                    {
                        tabs.map((item,index)=>(
                            renderEachTab(item,index)
                        ))
                    }
                </ScrollView>
            </View>
            <View style={styles.contentBox}>
                {loading? <ScreenLoader /> : renderSelectedTabData()}
            </View>
        </SafeAreaView>
    );
};

export default SearchScreen;
const styles = StyleSheet.create({
    textInputBox:{
        height:moderateScale(40),
        backgroundColor:LIGHTGREY,
        borderRadius:moderateScale(10),
        marginBottom:moderateScale(10),
        width:'95%',
        paddingHorizontal:moderateScale(10),
        marginTop:moderateScale(10),
        alignSelf:'center'
    },
    defaultTab:{
        paddingHorizontal:moderateScale(12), paddingVertical:moderateScale(9),
        borderBottomColor:APP_PINK_COLOR, borderRadius:10
    },
    tabScrollContainer:{
        paddingLeft:moderateScale(10),flexDirection:'row',
    },
    contentBox:{
        marginHorizontal:moderateScale(10),
        paddingTop:moderateScale(10),
        flex:1,
    }
});