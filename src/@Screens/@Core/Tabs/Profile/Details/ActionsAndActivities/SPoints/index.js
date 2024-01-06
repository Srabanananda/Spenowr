/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState} from 'react';
import {View,ScrollView, SafeAreaView,Text} from 'react-native';
import { getVirtualPoints } from '../../../../../../../@Endpoints/Core/Tabs/Common';
import DefaultHeader from '../../../../../../../@GlobalComponents/DefaultHeader';
import FormHeader from '../../../../../../../@GlobalComponents/FormHeader';
import styles from './styles';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import ScreenLoader from '../../../../../../../@GlobalComponents/ScreenLoader';
import { useStore } from 'react-redux';
import moment from 'moment';
import EarnMore from './EarnMore';
import Capitalize from '../../../../../../../@Utils/helperFiles/Capitalize';

const SPointsLogScreen = () =>{

    const [loader, setLoader] = useState(true);
    const [points, setPoints] = useState([]);

    const store = useStore();
    const {
        userObj:{
            user:{earned_point=0}
        },
    } = store.getState();

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = () =>{
        getVirtualPoints()
            .then(res=>{
                const {data:{points=[]}} = res;
                setPoints(points);
            })
            .catch()
            .finally(()=>{
                setLoader(false);
            });
    };

    const EachPoint = ({point}) =>{
        const {
            module_point,
            date,
            type
        } = point;
        const Title = type.replace(/-/g,' ');
        return(
            <View style={styles.eachCard}>
                <View>
                    <Text style={styles.title}>{Capitalize(Title)}</Text>
                    <Text style={styles.date}>{moment(date).format('MMMM Do YYYY')}</Text>
                </View>
                <Text style={styles.pointsText}>+{module_point}</Text>
            </View>
        );
    };

    const getData = () =>{
        if(loader) 
            return <ScreenLoader text={'Fetching points...'} />;
        if(!loader && !points.length)
            return <Text style={styles.noPoints}>No Points Found!!</Text>;
        return(
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {
                    points.map((item,index)=>(
                        <EachPoint key={index} point={item} />
                    ))
                }
            </ScrollView>
        );
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Spenowr Points'} >
                <Text style={styles.earnedPoints}>{earned_point} Points</Text>
            </DefaultHeader>
            <View style={styles.container}>
                <FormHeader headerText={'Virtual Points'} >
                    <EarnMore />
                </FormHeader>
                {getData()}
            </View>
        </SafeAreaView>
    );
};

export default SPointsLogScreen;