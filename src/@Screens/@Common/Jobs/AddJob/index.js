/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {SafeAreaView,ScrollView,Text,View,TextInput,Keyboard,TouchableOpacity} from 'react-native';
import DefaultHeader from '@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import { Dropdown } from 'react-native-material-dropdown';
import { getJobCategoriesList,getJobSubCategoryList } from '../../../../@Utils/helperFiles/Jobs';
import { getKeyByValue, isCurrentDateGreater, tagValidator } from '../../../../@Utils/helperFiles/helpers';
import { getUserProjectList } from '../../../../@Endpoints/Core/Tabs/More';
import { addJob } from '../../../../@Endpoints/Core/Tabs/More/index';
import GLOBALJSON from '@Assets/JsonFiles/global.json';
import DatePicker from 'react-native-datepicker';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';

const {data:{country,Currency,Accounts}} = GLOBALJSON;

const currencyList = Currency.map((each)=>{
    const {label,name,value} = each;
    return {name : label,value:name ,currency_id:value};
});

type JobScreenProps = {
    route : Object,
    navigation : Object
}

const AddJobScreen = ({...props}: JobScreenProps) =>{

    const currentDate  = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    const {route,navigation} = props;

    const EditData = route.params ? route.params.EditData : null;

    const [states, setStates] = useState([]);
    const [subCatList, setSubCatList] = useState([]);
    const [plist , setPList] = useState([]);
    const [selectedProjectID , setSelectedProjectID] = useState(EditData?EditData.project_id :'');
    const [selectedProject , setSelectedProject] = useState({ value: 'Select Project', project_id: ''});
    const [looking, setSelectedLooking] = useState([Accounts[0]?.value]);
    const [isTrainer, setIsTrainer] = useState(false);
    const [title, setTitle] = useState(EditData ? EditData.assignment_title : '');
    const [description, setDescription] = useState(EditData ? EditData.description : '');
    const [tag , setTag] = useState(EditData? EditData.tag :  null);
    const [city, setSelectedCity] = useState(EditData?EditData.assignment_city :'');
    const [pincode, setPincode] = useState(EditData?EditData.assignment_zipcode :'');
    const [address, setAddress] = useState(EditData?EditData.assignment_street_address :'');
    const [startBudget, setStartBudget] = useState(EditData?EditData.start_range :'');
    const [endBudget, setEndBudget] = useState(EditData?EditData.end_range :'');
    const [days, setAssignmentDays] = useState(EditData?EditData.days_assignment :'');
    const [startTime, setStartTime] = useState(EditData ? EditData.created_date : currentDate);

    const [selectedCategory, setSelectedCategory] = useState({value : 'Select A Category'});
    const [selectedSubCategory, setSelectedSubCategory] = useState({value : 'Select A Sub Category'});
    const [selectedCountry, setSelectedCountry] = useState({value : 'Select A Country'});
    const [state, setSelectedState] = useState({value : 'Select A State'});
    const [selectedCurrency, setSelectedCurrency] = useState(EditData ? EditData.currency : currencyList[0]?.value);
    
    const [enableRecord, setEnableRecord] = useState(EditData ? EditData.enable_record === '0' ? false : true : false);

    const [loader, setLoader] = useState(false);

    const categoriesList =  getJobCategoriesList();

    useEffect(()=>{
        loadList()
    },[])

    useEffect(()=>{
        if(EditData){
            const {
                assignment_category,
                assignment_country,
                assignment_state,
                assignment_subcategory,
                looking_for,
                trainer,
                project_id
            } = EditData;

            // const trueKey = getKeyByValue(JSON.parse(looking_for),'true');
            // if(trueKey.length){
            //     setSelectedLooking(trueKey);
            // }
            setIsTrainer(trainer === '0' ? false : true);

            const selectedCat = categoriesList.find(x=>x.name === assignment_category);
            setSelectedCategory(selectedCat);

            const subCatList = getJobSubCategoryList(selectedCat.name)||[];
            const selectedSubCat = subCatList.find(x=>x.name === assignment_subcategory);
            setSubCatList(subCatList);
            if(selectedSubCat)
                setSelectedSubCategory(selectedSubCat);

            const val = country.find((x)=>x.country_id === assignment_country);
            if(val) {
                setSelectedCountry({value : val?.value,id:val.country_id});
                setStates(val.state_list);
            }
            const selectedState = val.state_list.find (x=>x.state_id === assignment_state);
            if(selectedState)
                setSelectedState({value : selectedState?.value,id : selectedState.state_id});
            if(project_id) setSelectedProjectID(project_id)
        }
    },[EditData]);
    const loadList = () =>{
        if(!plist.length) setLoader(true);
        getUserProjectList()
            .then(res=>{
                const {data:{projectData=[]}} = res;
                let projectList = projectData.map((item) => {
                    return {
                        value: item.title,
                        project_id: item.project_id
                    }
                })
                if(EditData && selectedProjectID) {
                    const selectedProject = projectList.find(x=>x.project_id === selectedProjectID);
                    setSelectedProject(selectedProject)
                }
                setPList(projectList);
                setLoader(false);
            })
            .catch(()=>{
                setLoader(false);
            });
    };
    const checkSubCategory = cat => {
        const selectedCat = categoriesList.find(x=>x.value === cat);
        setSelectedCategory(selectedCat);
        setSubCatList(getJobSubCategoryList(selectedCat.name)||[]);
    };

    const setSubCat = subcat => {
        const selectedCat = subCatList.find(x=>x.value === subcat);
        setSelectedSubCategory(selectedCat);
    };

    const checkState = (selected) =>{
        setSelectedState({value : 'Select A State'});
        const val = country.find((x)=>x.value === selected);
        if(val)
        {
            setSelectedCountry({value : val.Value,id:val.country_id});
            setStates(val.state_list);
        }
    };

    const checkSelectedState = state => {
        const selected = states.find (x=>x.value === state);
        if(selected)
            setSelectedState({value : selected.value,id : selected.state_id});
    };

    const setProject = project => {
        const selected = plist.find(x=>x.value === project);
        setSelectedProject(selected)
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
            data.append('assignment_id',EditData.assignment_id);
            data.append('enable_record',enableRecord);
        }
        setLoader(true);
        addJob(data,EditData ? true : false)
            .then(()=>{
                Toast.show(EditData ? 'Assignment Edited Successfully'  : 'Assignment Added Successfully');
                navigation.goBack();
            })
            .catch(()=>Toast.show('Oops Something went wrong'))
            .finally(()=>{
                setLoader(false);
            });
    };

    const generateFormData = () => {
        const data = new FormData();
        data.append('assignment_title',title);
        data.append('description',description);
        data.append('assignment_category',selectedCategory.name);
        data.append('assignment_subcategory',selectedSubCategory.name);
        data.append('other_cat_value','');
        looking.map((item)=>{
            data.append(item,true);
        });
        data.append('trainer',isTrainer);
        data.append('assignment_street_address',address);
        data.append('assignment_country',selectedCountry.id);
        data.append('assignment_state',state.id);
        data.append('assignment_city',city);
        data.append('assignment_zipcode',pincode);
        data.append('event_date',startTime ? moment(startTime).format('YYYY-MM-DD') : '');
        data.append('currency',selectedCurrency);
        data.append('start_range',startBudget);
        data.append('end_range',endBudget);
        data.append('days_assignment',days);
        data.append('project_id',selectedProject.project_id);
        data.append('tag',tag);
        return data;
    };

    const getLookingType = (itemValue, isClicked) => {
        const isSelected = looking.find(x=>x===itemValue);
        if(isClicked)
        {
            if(!isSelected) {
                const tempArr = [...looking];
                tempArr.push(itemValue);
                setSelectedLooking(tempArr);
            }
            else{
                const index = looking.indexOf(itemValue);
                const tempArr = [...looking];
                tempArr.splice(index,1);
                setSelectedLooking(tempArr);
            }
        }
        else
            return isSelected;
    };

    const renderForm =()=> {
        return(
            <View style={GlobalStyles.formWrapper}>
                <Text style={GlobalStyles.inputHeaderName}>LOOKING FOR</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:moderateScale(5)}}>
                    {
                        Accounts.map((item,i)=>{
                            return(
                                <TouchableOpacity key={i} onPress={()=> getLookingType(item.value,true)} style={[GlobalStyles.seeMoreButton,getLookingType(item.value) ? GlobalStyles.seeMoreButtonRev : {}]}>
                                    <Text style={[GlobalStyles.seeMoreButtonText,getLookingType(item.value) ? GlobalStyles.seeMoreButtonTextRev : {}]}>{item.name}</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>

               
                <View style={{flexDirection:'row',marginTop:moderateScale(10)}}>
                    <CheckBox
                        disabled={false}
                        onValueChange={(newValue) => {
                            setIsTrainer(newValue);
                        }}
                        style={{marginRight:moderateScale(10)}}
                        value={isTrainer}
                    />
                    <Text style={GlobalStyles.inputHeaderName}>IS A TRAINER</Text>
                </View>



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
                <Text style={GlobalStyles.inputHeaderName}>TAG</Text>
                <TextInput 
                    onChangeText = {(value)=>setTag(tagValidator(value))}
                    placeholder  = {'Enter Tag'}
                    style={GlobalStyles.textInput}
                    value={tag}
                />

                <Text style={GlobalStyles.inputHeaderName}>COUNTRY</Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={country}
                        fontSize={12}
                        onChangeText={(value)=>checkState(value)}
                        value={selectedCountry.value}
                    />
                </View>

                <Text style={GlobalStyles.inputHeaderName}>STATE</Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={states}
                        fontSize={12}
                        onChangeText={(value)=>checkSelectedState(value)}
                        value={state.value}
                    />
                </View>
                <Text style={GlobalStyles.inputHeaderName}>CITY</Text>
                <TextInput 
                    onChangeText = {(value)=>setSelectedCity(value)}
                    placeholder  = {'Enter your city name'}
                    style={GlobalStyles.textInput}
                    value={city}
                />
                <Text style={GlobalStyles.inputHeaderName}>PINCODE</Text>
                <TextInput 
                    keyboardType={'number-pad'}
                    onChangeText = {(value)=>setPincode(value)}
                    placeholder  = {'Enter address pincode'}
                    style={GlobalStyles.textInput}
                    value={pincode}
                />
                <Text style={GlobalStyles.inputHeaderName}>STREET ADDRESS</Text>
                <TextInput 
                    multiline={true}
                    onChangeText = {(value)=>setAddress(value)}
                    placeholder  = {'Enter address'}
                    style={{...GlobalStyles.textInput,height:moderateScale(100)}}
                    value={address}
                />

                <Text style={GlobalStyles.inputHeaderName}>EVENT DATE</Text>

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
                    date={startTime}
                    onDateChange={(time) => setStartTime(time)}
                    placeholder="Select date"
                    style={{width: 300}}
                />                    

                <Text style={GlobalStyles.inputHeaderName}>START BUDGET AMOUNT</Text>
                <TextInput 
                    keyboardType={'decimal-pad'}
                    onChangeText = {(value)=>setStartBudget(value)}
                    style={GlobalStyles.textInput}
                    value={startBudget}
                />

                <Text style={GlobalStyles.inputHeaderName}>END BUDGET AMOUNT</Text>
                <TextInput 
                    keyboardType={'decimal-pad'}
                    onChangeText = {(value)=>setEndBudget(value)}
                    style={GlobalStyles.textInput}
                    value={endBudget}
                />
                <Text style={GlobalStyles.inputHeaderName}>CURRENCY</Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={currencyList}
                        fontSize={12}
                        onChangeText={(value)=>setSelectedCurrency(value)}
                        value={selectedCurrency}
                    />
                </View>
                <Text style={GlobalStyles.inputHeaderName}>DAYS OF ASSIGNMENT</Text>
                <TextInput 
                    keyboardType={'number-pad'}
                    onChangeText = {(value)=>setAssignmentDays(value)}
                    placeholder  = {'Enter address pincode'}
                    style={GlobalStyles.textInput}
                    value={days}
                />
                <Text style={GlobalStyles.inputHeaderName}>PROJECT</Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={plist}
                        fontSize={12}
                        onChangeText={(value)=>setProject(value)}
                        value={selectedProject && selectedProject?.value}
                    />
                </View>
                {EditData && EditData.enable_record === '0' ? 
                    <>
                        <View style={{flexDirection:'row',marginVertical:moderateScale(10)}}>
                            <CheckBox
                                disabled={isCurrentDateGreater(currentDate, startTime)}
                                onValueChange={(newValue) => {
                                    if(isCurrentDateGreater(currentDate, startTime)){
                                        Toast.show('Date Should be greater than current date',Toast.LONG);
                                        setEnableRecord(false);
                                    }
                                    else
                                        setEnableRecord(newValue);
                                }}
                                style={{marginRight:moderateScale(10)}}
                                value={enableRecord}
                            />
                            <Text style={GlobalStyles.inputHeaderName}>ENABLE RECORD</Text>
                        </View>
                        {isCurrentDateGreater(currentDate, startTime) ? <Text style={[GlobalStyles.starColor,{fontSize:moderateScale(10)}]}>* Event Date should be greater than current date to enable Record</Text> : null}
                    </>
                    : null
                }
            </View>
        );
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={EditData ? 'Edit Job' : 'Add Job'} />
            <ScrollView 
                contentContainerStyle={{padding:moderateScale(5),paddingBottom:moderateScale(100)}} 
                showsVerticalScrollIndicator={false}
            >
                {renderForm()}
                <DefaultButton 
                    buttonText={EditData ? 'Update Job' : 'Add Job'} 
                    onPress={()=>validateData()} 
                    showLoader={loader} 
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddJobScreen;