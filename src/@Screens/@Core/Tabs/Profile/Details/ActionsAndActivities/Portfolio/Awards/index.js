/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect,useState } from 'react';
import {View,StyleSheet,Text,ScrollView} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useStore } from 'react-redux';
import { getArtistAwards } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import ScreenLoader from '../../../../../../../../@GlobalComponents/ScreenLoader';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import AddAwards from './AddAwards';
import Card from './card';
import PropTypes from 'prop-types';

const Awards = ({mode}) =>{

    const store = useStore();
    const {
        userObj:{
            publicUserData:{awards}
        }
    } = store.getState();

    const [loader, setLoader] = useState(false);
    const [awardList, setAwardList] = useState([]);

    useEffect(()=>{
        if(mode === 'PRIVATE')
            callApi();
        else
            setAwardList(awards);
    },[]);

    const callApi = () =>{
        setLoader(true);
        getArtistAwards()
            .then(res=>{
                const {data:{awardData}} = res;
                setAwardList(awardData);
                setLoader(false);
            })
            .catch(()=>{
                setLoader(false);
            });
    };

    const renderAwards = () =>{
        if(loader)
            return <ScreenLoader text={'loading your Awards'} />;
        if(!loader && !awardList.length)
            return <Text style={styles.noAwardText}>No Awards found</Text>;
        return(
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    awardList.map((item,index)=>(
                        <Card cardItem={item} key={index} mode={mode} refreshData={callApi} />
                    ))
                }
            </ScrollView>
        );
    };

    return(
        <View style={styles.container}>
            {renderAwards()}
            {
                (mode === 'PRIVATE') &&
                (
                    <View style={GlobalStyles.AddButton}>
                        <AddAwards  refreshData={callApi} />
                    </View>
                )
            }
        </View>
    );
};

export default Awards;

Awards.propTypes = {
    mode: PropTypes.string.isRequired,
};


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
