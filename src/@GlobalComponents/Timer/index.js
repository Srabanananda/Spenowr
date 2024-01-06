/**
 * Create By @name Sukumar_Abhijeet,
 */

import React, {useState, useEffect} from 'react';

import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CountDown from 'react-native-countdown-component';
import PropTypes from 'prop-types';
import Config from '@Config/default';

const {COLOR:{APP_PINK_COLOR}} = Config;

import moment from 'moment';

const CountDownTimer = ({showText = 'Counting Down' , startDate , endDate}) => {

    const [totalDuration, setTotalDuration] = useState(0);

    useEffect(() => {
    // Coundown timer for a given expiry date-time
        let date = startDate;
        let expirydate = endDate;
    
        let diffr = moment.duration(moment(expirydate).diff(moment(date)));

        // Difference of the expiry date-time
        var hours = parseInt(diffr.asHours());
        var minutes = parseInt(diffr.minutes());
        var seconds = parseInt(diffr.seconds());

        // Converting in seconds
        var d = hours * 60 * 60 + minutes * 60 + seconds;
        setTotalDuration(d);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {showText}
                </Text>
                <CountDown
                    // onFinish={() => alert('finished')}
                    digitStyle={{backgroundColor:APP_PINK_COLOR}}
                    //formate to show
                    digitTxtStyle={{color:'#fff'}}
                    // onPress={() => alert('hello')}
                    size={25}
                    //on Finish call
                    timetoShow={['D','H', 'M', 'S']}
                    //on Press call
                    until={totalDuration}
                />
            </View>
        </SafeAreaView>
    );
};

export default CountDownTimer;


CountDownTimer.propTypes = {
    endDate : PropTypes.string.isRequired,
    showText:PropTypes.string.isRequired,
    startDate : PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
});