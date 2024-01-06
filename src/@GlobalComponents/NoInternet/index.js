/**
 * Create By @name Sukumar_Abhijeet on 5/5/2020,
 */

import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import { moderateScale, scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as internetActions from '../../@Redux/actions/internetActions';
import Config from '@Config/default';

const {COLOR:{APP_PINK_COLOR}} = Config;

const NoInternet = ({ ...props }) => {

    const { updateInternetConnectivity } = props;
    const netInfo = useNetInfo();

    const checkInternet = () => {
        if (netInfo.isInternetReachable) {
            const { type } = netInfo;
            if (type === 'none' || type === 'unknown') updateInternetConnectivity(false);
            else updateInternetConnectivity(true);
        }
        else updateInternetConnectivity(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    resizeMode="contain"
                    source={require('../../assets/svgs/no-wifi.svg')}
                    style={{ width: null, height: null, flex: 1 }}
                />
            </View>
            <View style={styles.bottomBox}>
                <Text style={styles.snap}>Oow Snap!</Text>
                <Text style={styles.connection}>Your Internet Connection is broken</Text>
                <TouchableOpacity onPress={() => checkInternet()} style={styles.retryBtn}>
                    <Text style={styles.retry}>Retry</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

NoInternet.propTypes = {
    updateInternetConnectivity: PropTypes.func.isRequired,
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProp = (dispatch) => ({
    updateInternetConnectivity: connectivity =>
        dispatch(internetActions.updateInternetConnectivity(connectivity)),
});

export default connect(mapStateToProps, mapDispatchToProp)(NoInternet);

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    imageContainer: {
        width: moderateScale(100),
        height: moderateScale(100),
        marginTop: moderateScale(100),
        alignSelf:'center'
    },
    bottomBox: {
        backgroundColor: APP_PINK_COLOR,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: moderateScale(160),
        borderTopLeftRadius: moderateScale(160),
        borderTopRightRadius: moderateScale(160),
        justifyContent: 'center', alignItems: 'center'
    },
    snap: {
        color: '#fff',
        fontSize: moderateScale(20),
        fontWeight: 'bold'
    },
    connection: {
        color: '#fff',
        fontSize: moderateScale(12)
    },
    retryBtn: {
        backgroundColor: '#fff',
        padding: moderateScale(6),
        marginTop: moderateScale(10),
        paddingHorizontal: moderateScale(15),
        borderRadius: moderateScale(20),
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(3), elevation: moderateScale(2),
        shadowOffset: {
            height: scale(2),
            width: scale(2)
        },
    },
    retry: {
        fontWeight: 'bold'
    }

});