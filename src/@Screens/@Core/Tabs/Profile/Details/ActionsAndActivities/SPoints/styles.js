/**
 *  Created By @name Sukumar_Abhijeet
 */

import {StyleSheet} from 'react-native';
import Config from '@Config/default';
import { moderateScale, scale } from 'react-native-size-matters';

const {COLOR:{SUBNAME,APP_PINK_COLOR,WHITE}} = Config;

const styles = StyleSheet.create({
    container:{
        margin:moderateScale(10),
        flex:1
    },
    noPoints:{
        alignSelf:'center',
        color:SUBNAME,
        marginTop:moderateScale(20)
    },
    earnedPoints:{
        color:APP_PINK_COLOR,
        fontWeight:'bold',
        fontSize:moderateScale(14)
    },
    eachCard:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:WHITE,
        marginVertical:moderateScale(6),
        padding:moderateScale(10),
        paddingHorizontal:moderateScale(15),
        borderRadius:moderateScale(6),
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(3), elevation: moderateScale(2),
        shadowOffset: {
            height: scale(2),
            width: scale(2)
        },
    },
    title:{
        fontWeight:'bold',
        marginBottom:moderateScale(4)
    },
    date:{
        color:SUBNAME,
        fontSize:moderateScale(10)
    },
    pointsText:{
        color:'green',
        fontSize:moderateScale(14)
    },
    scrollContainer:{
        margin:moderateScale(2)
    },
    earnMore:{
        color:WHITE
    },
    earnModal:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:WHITE,
        padding:moderateScale(15)
    },
    morePointsWrapper:{
        flexDirection:'row',
        marginVertical:moderateScale(8),
        justifyContent:'space-between',
        alignItems:'center'
    },
    pointType:{
        color:SUBNAME
    },
    eachPoint:{
        color:APP_PINK_COLOR,
        fontWeight:'bold'
    },
    showCaseModal:{
        width:'80%',
        borderRadius:moderateScale(6),
        backgroundColor:WHITE,
        padding:moderateScale(10)
    },
    pointsContainer:{
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:moderateScale(20)
    },
    yayText:{
        fontSize:moderateScale(18),
        fontWeight:'bold'
    },
    spenowrPoints:{
        textAlign:'center',
        color:SUBNAME,
        marginVertical:moderateScale(5)
    },
    ePoints:{
        fontSize:moderateScale(40),
        marginVertical:moderateScale(10),
        color:'green'
    }
});

export default styles;