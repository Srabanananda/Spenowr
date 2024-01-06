/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState} from 'react';
import {View,StyleSheet,Text,ScrollView} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useStore } from 'react-redux';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import AddPressRelease from './AddPressRelease';
import PropTypes from 'prop-types';
import { getArtistPressRelease } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import ScreenLoader from '../../../../../../../../@GlobalComponents/ScreenLoader';
import Card from './Card';

const PressRelease = ({mode}) =>{

    const store = useStore();
    const {
        userObj:{
            publicUserData:{pressData=[]}
        },
    } = store.getState();

    const [loader, setLoader] = useState(false);
    const [releasePressList, setReleasePress] = useState([]);

    useEffect(()=>{
        if(mode === 'PRIVATE')
            callApi();
        else
            setReleasePress(pressData);
    },[]);

    const callApi = () =>{
        setLoader(true);
        getArtistPressRelease()
            .then(res=>{
                const {data:{pressData}} = res;
                setReleasePress(pressData);
                setLoader(false);
            })
            .catch(()=>{
                setLoader(false);
            });
    };

    const renderEvents = () =>{
        if(loader)
            return <ScreenLoader text={'Checking your Press Release..'} />;
        if(!loader && !releasePressList.length)
            return <Text style={styles.noPressReleaseText}>No Press Releases found</Text>;
        return(
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    releasePressList.map((item,index)=>(
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
                        <AddPressRelease  refreshData={callApi} />
                    </View>
                )
            }
        </View>
    );
};

PressRelease.propTypes = {
    mode: PropTypes.string.isRequired,
};

export default PressRelease;

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:moderateScale(5)
    },
    noPressReleaseText:{
        alignSelf:'center',
        marginTop:moderateScale(10),
    }
});
