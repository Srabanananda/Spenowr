/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {SafeAreaView,ScrollView,View,StyleSheet,Text} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import { GlobalStyles } from '../../../@GlobalStyles';
import Card from './Card';
import Config from '@Config/default';
import { setUserUse } from '../../../@Endpoints/Auth';
import Toast from 'react-native-simple-toast';

const {COLOR:{APP_PINK_COLOR,WHITE}} = Config;

const OnboardingScreen = ({...props}) =>{

    const {navigation} = props;

    const Options = [
        {name:'Showcase Creative Portfolio',pos:1,imgPath:require('../../../assets/svgs/showcase.svg'),imgPathSelected:require('../../../assets/svgs/showcaseWhite.svg')},
        {name:'Collaborate & Get Visibility',pos:2,imgPath:require('../../../assets/svgs/collaborate.svg'),imgPathSelected:require('../../../assets/svgs/collaborateWhite.svg')},
        {name:'Sell or Buy through marketplace',pos:3,imgPath:require('../../../assets/svgs/marketplace.svg'),imgPathSelected:require('../../../assets/svgs/marketplaceWhite.svg')},
        {name:'Get Custom orders or students',pos:4,imgPath:require('../../../assets/svgs/customorders.svg'),imgPathSelected:require('../../../assets/svgs/customordersWhite.svg')},
        {name:'Look For Jobs or Hire Creatives',pos:5,imgPath:require('../../../assets/svgs/job.svg'),imgPathSelected:require('../../../assets/svgs/jobWhite.svg')},
        {name:'Participate In Contests',pos:6,imgPath:require('../../../assets/svgs/contest.svg'),imgPathSelected:require('../../../assets/svgs/contestWhite.svg')},
    ];

    const [selectedData, setSelectedData] = useState([]);
    const [loader, setLoader] = useState(false);

    const checkSelection = () =>{
        setLoader(true);
        let obj = {usersUse1:false,usersUse2:false,usersUse3:false,usersUse4:false,usersUse5:false,usersUse6:false};
        selectedData.map(each=>{
            if(each.pos === 1)obj.usersUse1 = true;
            if(each.pos === 2)obj.usersUse2 = true;
            if(each.pos === 3)obj.usersUse3 = true;
            if(each.pos === 4)obj.usersUse4 = true;
            if(each.pos === 5)obj.usersUse5 = true;
            if(each.pos === 6)obj.usersUse6 = true;
        });
        var form_data = new FormData();
        for ( var key in obj ) {
            form_data.append(key, obj[key]);
        }
        if(selectedData.length !== 0) {
            setUserUse(form_data)
                .then(()=>{
                    setLoader(false);
                    navigation.navigate('Specialization');
                })
                .catch(()=>{
                    Toast.show('Oops Server Error',Toast.LONG);
                    setLoader(false);
                });
        } else {
            Toast.show('Please select atleast one Type',Toast.LONG);
            setLoader(false);
        }
    };

    const handleChange = (data) =>{
        setSelectedData(data);
    };

    return(
        <SafeAreaView style={[GlobalStyles.GlobalContainer,{backgroundColor:WHITE}]}>
            <View style={styles.headerBox}>
                <Text style={styles.headerText}>What you want to use Spenowr for?</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.cardWrapper}>
                    {
                        Options.map((item,index)=>(
                            <Card cardItem = {item} data={selectedData} handleChange={handleChange} key={index} type={'large'} />
                        ))
                    }
                </View>
            </ScrollView>
            <DefaultButton 
                buttonStyle={{width:'90%',alignSelf:'center'}} 
                buttonText={'Next'} 
                onPress={()=>checkSelection()} 
                showLoader={loader}
            />
        </SafeAreaView>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    saveText: {
        color:APP_PINK_COLOR
    },
    cardWrapper:{
        flexDirection:'row',flexWrap:'wrap',
        justifyContent:'space-around',
        alignItems:'center',
       
    },
    scrollContainer:{
        padding:moderateScale(15),
        paddingBottom:moderateScale(100)
    },
    headerBox:{
        justifyContent:'center',
        alignItems:'center',
        height:moderateScale(50)
    },
    headerText:{
        maxWidth:moderateScale(160),
        textAlign:'center',
        fontWeight:'bold',
        fontSize:moderateScale(14)
    }
});