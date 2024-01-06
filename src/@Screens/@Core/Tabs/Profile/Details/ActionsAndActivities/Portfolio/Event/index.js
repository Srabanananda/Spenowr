/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState} from 'react';
import {View,StyleSheet,Text, ScrollView} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import AddEvent from './AddEvent';
import PropTypes from 'prop-types';
import { getArtistEvents } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import Card from './Card';
import { useStore } from 'react-redux';
import ScreenLoader from '../../../../../../../../@GlobalComponents/ScreenLoader';

const Event = ({mode}) =>{

    const store = useStore();
    const {
        userObj:{
            publicUserData:{eventData=[]}
        },
    } = store.getState();

    const [loader, setLoader] = useState(false);
    const [eventList, setEventList] = useState([]);
    useEffect(()=>{
        if(mode === 'PRIVATE')
            callApi();
        else
            setEventList(eventData);
    },[]);

    const callApi = () =>{
        setLoader(true);
        getArtistEvents()
            .then(res=>{
                const {data:{eventData}} = res;
                setEventList(eventData);
                setLoader(false);
            })
            .catch(()=>{
                setLoader(false);
            });
    };

    const renderEvents = () =>{
        if(loader)
            return <ScreenLoader text={'Checking your Events'} />;
        if(!loader && !eventList.length)
            return <Text style={styles.noAwardText}>No Events found</Text>;
        return(
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    eventList.map((item,index)=>(
                        <Card cardItem={item} key={index} mode={mode} refreshData={callApi} />
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
                        <AddEvent  refreshData={callApi} />
                    </View>
                )
            }
        </View>
    );
};

Event.propTypes = {
    mode: PropTypes.string.isRequired,
};


export default Event;


const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:moderateScale(5)
    },
    noAwardText:{
        alignSelf:'center',
        marginTop:moderateScale(10),
    }
});
