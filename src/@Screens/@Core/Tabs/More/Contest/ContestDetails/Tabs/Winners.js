/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { View,Text,TouchableOpacity,ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Config from '@Config/default';
import {useNavigation} from '@react-navigation/native';
import Image from 'react-native-image-progress';
import Comments from '../Comments';

const {NEW_IMG_BASE} = Config;

const Winners = ({winnerList,contestDetails,Status}) =>{

    const {type} = contestDetails;
    const navigation = useNavigation();

    const Card = (eachWinner,index) =>{
        const {artist_slug_url,media_id=''} = eachWinner;
        const slgs = artist_slug_url.split('/');
        return(
            <TouchableOpacity 
                key={index} 
                onPress={()=>navigation.navigate('ArtworkDetails',{mediaId:media_id,artworkSlug:slgs[0]})} 
                style={styles.eachWinner}
            >
                <View style={styles.imageCircle}>
                    <Image resizeMode={'cover'} source={{uri: NEW_IMG_BASE + eachWinner.image_path}} style={{width:null,height:null,flex:1}} />
                    <View style={styles.imageOverlayBlack} />
                    <Text 
                        numberOfLines={1}
                        onPress={()=>navigation.navigate('PublicProfile',{slug:slgs[0]})} 
                        style={styles.winnerName}>
                        {eachWinner.institute_name}
                    </Text>
                </View>
                <Text style={styles.position}>
                    {eachWinner.position}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderEachWinner = (winner,index,category) =>{
        const {
            contest_type
        } = winner;

        if(contest_type === category)
            return Card(winner,index);
        return null;
    };

    const renderCategory = (category,index) =>{
        const categoryName = category[1].name;
        const categoryVal = category[0];
        const temp = winnerList.findIndex(x=>x.contest_type === categoryVal);
        return(
            <View key={index}>
                <Text style={styles.categoryName}>{categoryName}</Text>
                {
                    temp === -1 ? 
                        <Text style={styles.noParticipants}>Winners are yet to be declared</Text>
                        : 
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {winnerList.map((item,index)=>renderEachWinner(item,index,categoryVal))}
                        </ScrollView>
                }
            </View>
        );
    };

    const checkTypes = () =>{
        if(type!=='1')
        {
            const objTest = JSON.parse(type);
            var res = Object.entries(objTest);
            return(
                <>
                    {
                        res.map((item,index)=>(
                            renderCategory(item,index)
                        ))
                    }
                </>
            );
        }
        else
            return(
                <>
                    { winnerList.map((item,index)=>( Card(item,index)))}
                </>
            );
    };

    if(Status)
        return(
            <>
                <View style={styles.winnerBox}>
                    <Text style={styles.noParticipants}>Winners will be declared after the contest is over.</Text>
                </View>
                <Comments contestDetails={contestDetails} />
            </>
        );

    return(
        <>
            <View style={styles.winnerBox}>
                {checkTypes()}
            </View>
            <Comments contestDetails={contestDetails} />
        </>
    );
};

Winners.propTypes = {
    Status:PropTypes.number.isRequired,
    contestDetails:PropTypes.object.isRequired,
    winnerList:PropTypes.array.isRequired,
};

export default Winners;