import React, { useEffect, useState } from 'react';
import {View,Text, ScrollView,TouchableOpacity} from 'react-native';
import Config from '@Config/default';
import styles from '../styles';
import { getContestTypeParticipants } from '../../../../../../../../@Endpoints/Core/Tabs/More';
import Toast from 'react-native-simple-toast';
import ScreenLoader from '../../../../../../../../@GlobalComponents/ScreenLoader';
import { moderateScale } from 'react-native-size-matters';
import { ParticipantCard } from './Card';

const {COLOR:{APP_PINK_COLOR,APP_THEME_COLOR}} = Config;

const ContestTypes = ({Types,contest_id,contest_type,showVoteOption} : any ) => {
    
    const [currentCategory , setCurrentCategory] = useState(Types[0]?.[0]);
    const [participantsData, setParticipantsData] = useState({});
    const [loading, setLoading] = useState(false);
    const [votedContest, setVotedContest] = useState();

    const fetchCurrentTypeParticipants = () => {
        setLoading(true);
        getContestTypeParticipants(contest_id, currentCategory,contest_type)
            .then(res => {
                if(res?.data) {
                    setParticipantsData(res?.data);
                    const votedContest = res?.data?.ContestPhotos?.findIndex(eachParticipant => eachParticipant?.paticipant_vote_submit === 1);
                    if(votedContest!==-1) setVotedContest(votedContest);
                }
            })
            .catch(()=>Toast.show('Oops something went wrong'))
            .finally(()=>setLoading(false));
    };

    useEffect(()=>{
        fetchCurrentTypeParticipants();
    },[currentCategory]);

    const renderCategory = (category,index) =>{
        const categoryName = category[1]?.name;
        const categoryVal = category[0];
        const isSelected = currentCategory === categoryVal;
        return(
            <TouchableOpacity key={index} onPress={()=>!isSelected && setCurrentCategory(categoryVal)} style={[styles.category,{borderBottomWidth : isSelected ? 1 : 0}]}>
                <Text style={[styles.categoryName,{color: isSelected ? APP_PINK_COLOR : APP_THEME_COLOR,fontWeight: isSelected ? 'bold' : '400',}]}>{categoryName}</Text>
            </TouchableOpacity>
        );
    };

    const renderParticipants = () => {
        if(loading) return <ScreenLoader customStyles={{height:moderateScale(200)}} text={'Fetching Participants...'} />;
        if(!participantsData?.ContestPhotos?.length) return (<Text>No Participants Found</Text>);
        
        return (
            <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between'}}>
                {
                    participantsData?.ContestPhotos?.map((item,index)=>{
                        const cardProps = {
                            contest_type,
                            fetchCurrentTypeParticipants,
                            index,
                            participant : item,
                            showVoteOption,
                        };
                        return <ParticipantCard 
                            isVotedContest={votedContest===index}  
                            key={index}  
                            large={false}  
                            vote_submit={participantsData?.vote_submit} 
                            {...cardProps} 
                        />;
                    })
                }
            </View>
        );
    };

    return(
        <View>
            <ScrollView contentContainerStyle={{flexDirection:'row',marginBottom:moderateScale(10)}} horizontal showsHorizontalScrollIndicator={false}>
                {Types.map((item,index)=>renderCategory(item,index))}
            </ScrollView>
            {renderParticipants()}
        </View>
    );

};



export default ContestTypes;