/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import HorizontalSlider from '@GlobalComponents/HorizontalSlider';
import ListHeader  from '@GlobalComponents/ListHeader';
import { GlobalStyles } from '../../../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import ScaledImage from '../../../../@GlobalComponents/ScalableImage';
import Config from '@Config/default';

const {NEW_IMG_BASE,DEFAULT_PROFILE} = Config;

type RelatedJobProps = {
    Jobs : Array;
}

type EachJobProp = {
    job : Object
}

const EachPhotographer = ({job}: EachJobProp) => {
    const navigation = useNavigation();
    const navigateArtist = ()=> navigation.push('PublicProfile',{slug:slug_url});
    const {institute_name,slug_url,city,profile_image_path} = job;

    const IMG_PATH = profile_image_path? profile_image_path : DEFAULT_PROFILE;

    return (
        <TouchableOpacity onPress={navigateArtist} style={[GlobalStyles.primaryCard,styles.eachCard]}>
            {<ScaledImage source={{ uri: NEW_IMG_BASE + IMG_PATH }} style={{maxHeight:160,minWidth:160}} />}
            <View style={styles.boxWrapper}>
                <Text style={styles.instName}>{institute_name}</Text>
                <Text>{city}</Text>
            </View>
        </TouchableOpacity>
    );
};

const RelatedJobs = ({...props}:RelatedJobProps) =>{
    const {Jobs} = props;
    return(
        <View style={styles.Container}>
            <ListHeader headerText={'Artists'} headerViewStyle={{marginBottom:10}} />
            <HorizontalSlider>
                {
                    Jobs.map((item,index)=>{
                        return <EachPhotographer job={item} key={index} />;
                    })
                } 
            </HorizontalSlider>
        </View>
    );
};

export default RelatedJobs;
const styles = StyleSheet.create({
    Container:{
        marginTop:10,
    },
    eachCard:{
        padding:moderateScale(5),
        width:moderateScale(160),
        marginRight:moderateScale(8),
        // maxHeight:moderateScale(200)
    },
    boxWrapper:{
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:moderateScale(4)
    },
    instName:{
        textAlign:'center',
        marginBottom:moderateScale(5),
        fontWeight:'bold'
    }
});