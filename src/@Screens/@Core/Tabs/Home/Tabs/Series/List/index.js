import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { getAudioPodCastList } from '../../../../../../../@Endpoints/Core/Tabs/More';
import DefaultHeader from '../../../../../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../../../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import MySeriesList from './Detail';
import { SafeAreaView } from 'react-native-safe-area-context';

const SeriesScreen = (props) => {

    const [loader, setLoader] = useState(true);
    const [printsData, setPrintsData] = useState([]);
    const [seriesList, setSeriesList] = useState([]);

    

    const callApi = useCallback((fromLimit = 0, toLimit = 20) => {
        getAudioPodCastList(fromLimit, toLimit)
            .then(res => {
                const { poddata, count } = res?.data;
                if (count > 0) {
                    setSeriesList(poddata);
                }
            })
            .catch(() => SimpleToast.show('Oops Something went wrong'))
            .finally(() => setLoader(false));
    }, []);

    useEffect(() => {
        callApi();
    }, [callApi]);

    if(loader) return <ScreenLoader text={'Fetching Series ..'} />;
    
    return(
        <SafeAreaView edges={['left', 'right']} style={{ flex: 1 }}>
            <DefaultHeader headerText={'Series Detail'} />
            <View style={{ flex: 1, minHeight: 0 }}>
                {(seriesList?.length)
                    ? <MySeriesList {...props} dataSet={seriesList} refresh={callApi} />
                    : <Text style={GlobalStyles.noDataFound}> No Data Found</Text>}
            </View>
        </SafeAreaView>
    );

};

export default SeriesScreen;