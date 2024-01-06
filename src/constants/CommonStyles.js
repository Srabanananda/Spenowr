//'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';

import APP_CONSTANT from '../constants/Constant';



module.exports = StyleSheet.create({

    navigationbar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backArrow: {
        height: 25,
        width: 25,
        margin: 20,
    },
    navigationCenterTitle: {

        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        margin: 5,
        marginTop: 15,
        color: APP_CONSTANT.COLOR.DARK_BLACK,

    },
    rightButton: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 5,
        marginTop: 15,
        color: APP_CONSTANT.COLOR.APP_PINK_COLOR,
        marginRight: 20,

    },
    ProfileImage: {
        height: 120,
        width: 120,
        margin: 5,
        borderRadius: 60,
        borderWidth: 5,
        borderColor: APP_CONSTANT.COLOR.ProfileImage,
    },
    errorText: {
        margin: 20,
        color: '#E67E22',
        fontSize: 17,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center'

    },
    navigationTitle: {
        fontSize: 22,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#00A0AA',
        width: "100%",
        textAlign: "center",
        justifyContent: 'center',

    },

});

