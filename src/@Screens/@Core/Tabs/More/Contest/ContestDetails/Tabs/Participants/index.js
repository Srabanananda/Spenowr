/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';
import Comments from '../../Comments';
import ContestTypes from './ContestTypes';

const Participants = ({contestDetails}) =>{

    const {type,contest_type,contest_id,vote_enable} = contestDetails;

    const checkType = () =>{
        if(type !== '1')
        {
            const objTest = JSON.parse(type);
            var Types = Object.entries(objTest);
            return <ContestTypes Types={Types} contest_id={contest_id} contest_type={contest_type} showVoteOption={vote_enable==='1'} />;
        }
        return <></>;
    };

    return(
        <>
            <View style={styles.winnerBox}>
                {checkType()}
            </View>
            <Comments contestDetails={contestDetails} />
        </>
    );
};

Participants.propTypes = {
    contestDetails:PropTypes.object.isRequired,
    participantList:PropTypes.array.isRequired,
};

export default Participants;