/**
 * Create By @name Sukumar_Abhijeet 
 */

import Config from '@Config/default';
import {StyleSheet} from 'react-native';
const {COLOR : {WHITE}} = Config;


const styles = StyleSheet.create({
    container: {
        backgroundColor: WHITE,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        //justifyContent: "flex-end",
        //marginTop: 20,

    },
    logoImg: {
        width: '70%',
        height: 100,
        alignContent: 'center',
    },
    loginContainer: {
        backgroundColor: 'white',

    },
});

export default styles;