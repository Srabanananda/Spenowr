import React, { useEffect, useState } from 'react';
import {SafeAreaView, Text} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { getCustomPrintsList } from '../../../../../@Endpoints/Core/Tabs/More';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import PrintList from './List/PrintList';

const CustomPrintScreen = () => {

    const [loader, setLoader] = useState(true);
    const [printsData, setPrintsData] = useState([]);

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = (fromLimit = 0,toLimit = 15) => {
        getCustomPrintsList(fromLimit,toLimit)
            .then(res=>{
                setPrintsData(res?.data);
            })
            .catch(()=>SimpleToast.show('Oops Something went wrong'))
            .finally(()=>setLoader(false));
    };

    if(loader) return <ScreenLoader text={'Fetching Prints ..'} />;
    
    return(
        <SafeAreaView style={{flex:1}}>
            <DefaultHeader headerText={'Custom Prints'} />
            {
                (printsData?.list?.length) ? <PrintList dataSet={printsData} refresh={callApi} />  : <Text style={GlobalStyles.noDataFound}> No Data Found</Text>
            }
        </SafeAreaView>
    );

};

export default CustomPrintScreen;