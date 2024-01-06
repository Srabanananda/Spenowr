/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState} from 'react';
import {View} from 'react-native';
import { getFeaturedContest } from '@Endpoints/Core/Tabs/Featured';
import ContestCard from '../../../../More/Contest/ContestList/ContestCard';
import { moderateScale } from 'react-native-size-matters';
import Carousel,{Pagination} from 'react-native-snap-carousel';
import { DEVICE_WIDTH } from '../../../../../../../@Utils/helperFiles/DeviceInfoExtractor';
import styles from '../../WhatsNew/styles';

const AllContestsList = ({extraFunc}:any) =>{
    const [contestList, setContestList] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = () =>{
        setLoading(true);
        getFeaturedContest()
            .then(res=>{
                const {data:{openContestList = []}} = res;
                if(openContestList.length) extraFunc(true);
                setContestList(openContestList);
            })
            .finally(()=>setLoading(false));
    };

    const getContest = ({item, i}) =>{
        item.tagstatus = item.status;
        item.tag = 'Contest Active Now';
        return <ContestCard customStyles={{marginBottom:moderateScale(10),borderRadius:0,marginTop:moderateScale(8)}} info={item} key={i} />;
    };

    const pagination  = () => {
        return (
            <Pagination
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDot}
                dotsLength={contestList.length}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    };

    if(contestList.length)
    {
        return (
            <View style={styles.listViewWrapper}>
                <Carousel
                    data={contestList}
                    inactiveSlideOpacity={0.8}
                    itemWidth={DEVICE_WIDTH}
                    onSnapToItem={(index) => setActiveSlide(index)}
                    renderItem={getContest}
                    sliderWidth={DEVICE_WIDTH}
                />
                {pagination()}
            </View>
        );
    }
    return null;
};

export default AllContestsList;