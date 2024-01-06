/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState} from 'react';
import {View,StyleSheet,Text,ScrollView} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useStore } from 'react-redux';
import { getArtistTeam } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import ScreenLoader from '../../../../../../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import AddTeams from './AddTeams';
import Card from './Card';
import PropTypes from 'prop-types';
import ErrorBoundary from 'react-native-error-boundary';
import FallBackUI from '../../../../../../../../@GlobalComponents/FallBackUI';

const MeetTheTeam = ({mode}) =>{

    const store = useStore();
    const {
        userObj:{
            publicUserData:{teamData=[]}
        },
    } = store.getState();

    const [loader, setLoader] = useState(false);
    const [teamsList, setTeams] = useState([]);

    useEffect(()=>{
        if(mode === 'PRIVATE')
            callApi();
        else
            setTeams(teamData);
    },[]);

    const callApi = () =>{
        setLoader(true);
        getArtistTeam()
            .then(res=>{
                const {data:{teamData}} = res;
                setTeams(teamData);
                setLoader(false);
            })
            .catch(()=>{
                setLoader(false);
            });
    };

    const renderEvents = () =>{
        if(loader)
            return <ScreenLoader text={'Checking your Team..'} />;
        if(!loader && !teamsList.length)
            return <Text style={styles.noTeamsText}>No Teams found</Text>;
        return(
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    teamsList.map((item,index)=>(
                        <ErrorBoundary FallbackComponent={FallBackUI} key={index}>
                            <Card cardItem={item}  mode={mode} refreshData={callApi} />
                        </ErrorBoundary>
                    ))
                }
            </ScrollView>
        );
    };
    
    return(
        <View style={styles.container}>
            {renderEvents()}
            {
                (mode === 'PRIVATE') &&
                (
                    <View style={GlobalStyles.AddButton}>
                        <AddTeams  refreshData={callApi} />
                    </View>
                )
            }
        </View>
    );
};

export default MeetTheTeam;

MeetTheTeam.propTypes = {
    mode: PropTypes.string.isRequired,
};


const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:moderateScale(5)
    },
    noTeamsText:{
        alignSelf:'center',
        marginTop:moderateScale(10),
    }
});
