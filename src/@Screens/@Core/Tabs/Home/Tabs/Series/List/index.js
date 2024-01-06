import React, { useEffect, useState } from 'react';
import {SafeAreaView, Text} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { getAudioPodCastList } from '../../../../../../../@Endpoints/Core/Tabs/More';
import DefaultHeader from '../../../../../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../../../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import MySeriesList from './Detail';

const SeriesScreen = (props) => {

    const [loader, setLoader] = useState(true);
    const [printsData, setPrintsData] = useState([]);
    const [seriesList, setSeriesList] = useState([]);

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = (fromLimit = 0,toLimit = 20) => {
        getAudioPodCastList(fromLimit,toLimit)
            .then(res=>{
                const { poddata, count } = res?.data
                console.log('series Data : ', JSON.stringify(res?.data));
                if(count > 0){
                    setSeriesList(poddata);
                }
            })
            .catch(()=>SimpleToast.show('Oops Something went wrong'))
            .finally(()=>setLoader(false));
    };

    if(loader) return <ScreenLoader text={'Fetching Series ..'} />;
    
    return(
        <SafeAreaView style={{flex:1}}>
            <DefaultHeader headerText={'Series'} />
            {
                (seriesList?.length) ? <MySeriesList {...props} dataSet={seriesList} refresh={callApi} />  : <Text style={GlobalStyles.noDataFound}> No Data Found</Text>
            }
        </SafeAreaView>
    );

};

export default SeriesScreen;