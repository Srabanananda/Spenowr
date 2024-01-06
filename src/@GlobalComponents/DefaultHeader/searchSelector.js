/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ScrollView,TextInput} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import ModalHeader from '../ModalHeader/index';
import DefaultButton from '../DefaultButton';
import Config from '@Config/default';
import Toast from 'react-native-simple-toast';
import { HOME_FILTERS } from '../../assets/JsonFiles/HomeFilters';

const {COLOR:{LIGHTGREY,APP_PINK_COLOR,SUBNAME,WHITE}} = Config;

const modules = [
    {name : 'Artists', value:'artist'},
    ...HOME_FILTERS
];

type selectorProps = {
    navigation: Object
};

const SearchSelector = ({navigation}:selectorProps) =>{
    const [isActive, setIsActive] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedType, setSelectedType] = useState();

    const searchNavigate = () => {
        const searchLoad = {
            searchString: searchText,
            type: selectedType,
        };
        if(searchText.length)
        {
            setIsActive(false);
            navigation.navigate('SearchScreen',{'searchLoad':searchLoad});
        }
        else Toast.show('Search cannot be empty');
    };

    const renderType = (item,index) =>{
        const {name,value} = item;
        return(
            <TouchableOpacity key={index} onPress={()=>setSelectedType(value)} style={selectedType !== value ? styles.eachModule : styles.eachModuleSelected}>
                <Text style={selectedType===value ? styles.moduleNameSelected : styles.defaultName}>{name}</Text>
            </TouchableOpacity>
        );
    };

    const renderFilterBox = () =>{
        return(
            <View style={styles.searchContainer}>
                <ModalHeader headerText={'Search'} onPress={()=>setIsActive(false)} />
                <ScrollView>
                    <TextInput 
                        autoCapitalize='none' 
                        onChangeText={(string) => setSearchText(string) } 
                        placeholder="Enter your query .." 
                        placeholderTextColor="#414756"
                        style={styles.textInputBox}
                        value={searchText}
                    />
                    <Text style={styles.filterHeader}>Select Type</Text>
                    <View style={styles.modulesWrapper}>
                        {
                            modules.map((item,index)=>(
                                renderType(item,index)
                            ))
                        }
                    </View>
                    <DefaultButton buttonText={'Search'} onPress={searchNavigate} showLoader={false} textStyle={{fontSize:moderateScale(12)}} />
                </ScrollView>
            </View>
        );
    };

    return(
        <>
            <TouchableOpacity onPress={()=>setIsActive(true)} style={{padding:moderateScale(10)}}>
                <Icon name={'search'} size={18} />
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

export default SearchSelector;
const styles = StyleSheet.create({
    searchContainer:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:'#fff',
        padding:moderateScale(10),
    },
    textInputBox:{
        height:moderateScale(40),
        backgroundColor:LIGHTGREY,
        borderRadius:moderateScale(10),
        marginBottom:moderateScale(10),
        width:'100%',
        paddingHorizontal:moderateScale(10),
        marginTop:moderateScale(10)
    },
    filterHeader:{
        fontSize:moderateScale(14),
        fontWeight:'bold',
        marginBottom:moderateScale(10)
    },
    modulesWrapper:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    eachModuleSelected :{
        backgroundColor:APP_PINK_COLOR,
        borderWidth:0,
        borderColor:SUBNAME,
        borderRadius:moderateScale(10),
        paddingHorizontal:moderateScale(20),
        padding:moderateScale(8),
        marginRight:moderateScale(10),
        marginBottom:moderateScale(10)
    },
    eachModule:{
        borderColor:SUBNAME,
        borderWidth:1,
        borderRadius:moderateScale(10),
        paddingHorizontal:moderateScale(20),
        padding:moderateScale(8),
        marginRight:moderateScale(10),
        marginBottom:moderateScale(10)
    },
    moduleNameSelected:{
        color:WHITE,
        fontWeight:'bold'
    },
    defaultName:{
        color:'#000'
    },  
});