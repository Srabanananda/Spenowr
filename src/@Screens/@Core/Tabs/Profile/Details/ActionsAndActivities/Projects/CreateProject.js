/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {SafeAreaView,ScrollView,Text,View,TextInput,Keyboard,TouchableOpacity} from 'react-native';
import DefaultHeader from '@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import { Dropdown } from 'react-native-material-dropdown';
import { getJobCategoriesList,getJobSubCategoryList } from '../../../../../../../@Utils/helperFiles/Jobs';
import { getKeyByValue, isCurrentDateGreater, tagValidator } from '../../../../../../../@Utils/helperFiles/helpers';
import { addJob, addProject } from '../../../../../../../@Endpoints/Core/Tabs/More/index';
import GLOBALJSON from '@Assets/JsonFiles/global.json';
import DatePicker from 'react-native-datepicker';
import DefaultButton from '../../../../../../../@GlobalComponents/DefaultButton';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';

const {data:{country,Currency,Accounts}} = GLOBALJSON;

const currencyList = Currency.map((each)=>{
    const {label,name,value} = each;
    return {name : label,value:name ,currency_id:value};
});

type CreateProjectProps = {
    route : Object,
    navigation : Object
}

const Types = [{name : 'Select Type', value : 'Select Type'},{name : 'Ongoing', value : 'Ongoing'},{name : 'One Time', value : 'One Time'}]

const CreateProject = ({...props}: CreateProjectProps) =>{

    const currentDate  = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    const {route,navigation} = props;
    const EditData = route.params ? route.params.EditData : null;
    const [states, setStates] = useState([]);
    const [subCatList, setSubCatList] = useState([]);
    const [selectedPtype, setSelectedPType] = useState({name : 'Select Type', value : 'Select Type'});
    const [title, setTitle] = useState(EditData ? EditData.title : '');
    const [description, setDescription] = useState(EditData ? EditData.description : '');
    // const [tag , setTag] = useState(EditData? EditData.tag :  null);
    const [startDate, setStartDate] = useState(EditData ? EditData.start_date : currentDate);
    const [endDate, setEndDate] = useState(EditData ? EditData.end_date : currentDate);
    const [selectedCategory, setSelectedCategory] = useState({name : 'Select A Category', value : 'Select A Category'});
    const [selectedSubCategory, setSelectedSubCategory] = useState({name : 'Select A Sub Category', value : 'Select A Sub Category'});

    const [loader, setLoader] = useState(false);

    const categoriesList =  getJobCategoriesList();

    useEffect(()=>{
        if(EditData){
            const {
                category,
                subcategory,
                type,
            } = EditData;

            const selectedCat = categoriesList.find(x=>x.name === category);
            setSelectedCategory(selectedCat);

            const subCatList = getJobSubCategoryList(selectedCat?.name)||[];
            const selectedSubCat = subCatList.find(x=>x.name === subcategory);
            setSubCatList(subCatList);
            if(selectedSubCat)
                setSelectedSubCategory(selectedSubCat);
            const pType = Types.find(x=>x.name === (type === "0" ? 'Ongoing' : type === "1" ? 'One Time' : 'Select Type'))
            setSelectedPType(pType)
        }
    },[EditData]);

    const checkSubCategory = cat => {
        const selectedCat = categoriesList.find(x=>x.value === cat);
        setSelectedCategory(selectedCat);
        setSubCatList(getJobSubCategoryList(selectedCat.name)||[]);
    };

    const setSubCat = value => {
        const selectedCat = subCatList.find(x=>x.value === value);
        setSelectedSubCategory(selectedCat);
    };

    const setProjectType = type => {
        const seletedType = Types.find(x=>x.value === type);
        setSelectedPType(seletedType);
    };

    const validateData = () => {
        Keyboard.dismiss();
        if(!title.length){
            Toast.show('Enter Title');
            return;
        }
        if(!description.length){
            Toast.show('Enter Description');
            return;
        }
        if(selectedCategory.value === 'Select A Category'){
            Toast.show('Select a category');
            return;
        }
        const data =  generateFormData();

        if(EditData) {
            data.append('project_id',EditData.project_id);
        }
        setLoader(true);
        addProject(data,EditData ? true : false)
            .then(()=>{
                Toast.show(EditData ? 'Project Edited Successfully'  : 'Project Added Successfully');
                navigation.goBack();
            })
            .catch(()=>Toast.show('Oops Something went wrong'))
            .finally(()=>{
                setLoader(false);
            });
    };

    const generateFormData = () => {
        const data = new FormData();
        data.append('title',title);
        data.append('description',description);
        data.append('category',selectedCategory.name);
        data.append('subcategory',selectedSubCategory.name);
        data.append('type',selectedPtype.value === 'One Time' ? 1 : 0);
        data.append('start_date',startDate ? moment(startDate).format('YYYY-MM-DD') : '');
        data.append('end_date',endDate ? moment(endDate).format('YYYY-MM-DD') : '');
        return data;
    };

    const renderForm =()=> {
        return(
            <View style={GlobalStyles.formWrapper}>
                <Text style={GlobalStyles.inputHeaderName}>TITLE
                    <Text style={GlobalStyles.starColor}>*</Text>
                </Text>
                <TextInput 
                    onChangeText = {(value)=>setTitle(value)}
                    placeholder  = {'Enter a title (no special characters)'}
                    style={GlobalStyles.textInput}
                    value={title}
                />
                <Text style={GlobalStyles.inputHeaderName}>DESCRIPTION 
                    <Text style={GlobalStyles.starColor}>*</Text>
                </Text>
                <TextInput 
                    multiline={true}
                    onChangeText = {(value)=>setDescription(value)}
                    placeholder  = {'Enter a description'}
                    style={{...GlobalStyles.textInput,height:moderateScale(100),textAlignVertical:'top'}}
                    value={description}
                />
                <Text style={GlobalStyles.inputHeaderName}>CATEGORY 
                    <Text style={GlobalStyles.starColor}>*</Text>
                </Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={categoriesList}
                        fontSize={12}
                        onChangeText={(name)=>checkSubCategory(name)}
                        value={selectedCategory.value}
                    />
                </View>
                <Text style={GlobalStyles.inputHeaderName}>SUB CATEGORY </Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={subCatList}
                        fontSize={12}
                        onChangeText={(name)=>setSubCat(name)}
                        value={selectedSubCategory.value}
                    />
                </View>
                <Text style={GlobalStyles.inputHeaderName}>TYPE</Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={Types}
                        fontSize={12}
                        onChangeText={(name)=>setProjectType(name)}
                        value={selectedPtype.value}
                    />
                </View>
                {
                    selectedPtype.value === 'One Time' && 
                    <>
                        <Text style={GlobalStyles.inputHeaderName}>START DATE</Text>
                        <DatePicker
                            cancelBtnText="Cancel"
                            confirmBtnText="Confirm"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 10,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 60,
                                    height:30
                                }
                            }}
                            date={startDate}
                            onDateChange={(time) => setStartDate(time)}
                            placeholder="Select date"
                            style={{width: 300}}
                        />      

                        <Text style={GlobalStyles.inputHeaderName}>END DATE</Text>
                        <DatePicker
                            cancelBtnText="Cancel"
                            confirmBtnText="Confirm"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 10,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 60,
                                    height:30
                                }
                            }}
                            date={endDate}
                            onDateChange={(time) => setEndDate(time)}
                            placeholder="Select date"
                            style={{width: 300}}
                        /> 
                    </>
                }
                                   
            </View>
        );
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={EditData ? 'Edit Project' : 'Add Project'} />
            <ScrollView 
                contentContainerStyle={{padding:moderateScale(5),paddingBottom:moderateScale(100)}} 
                showsVerticalScrollIndicator={false}
            >
                {renderForm()}
                <DefaultButton 
                    buttonText={EditData ? 'Update Project' : 'Add Project'} 
                    onPress={()=>validateData()} 
                    showLoader={loader} 
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateProject;