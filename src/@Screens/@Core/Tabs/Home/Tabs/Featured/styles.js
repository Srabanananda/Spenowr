/**
 * Create By @name Sukumar_Abhijeet,
 */

import {Dimensions, StyleSheet} from 'react-native';

import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const {COLOR:{WHITE,LIGHTGREY,SUBNAME,APP_THEME_COLOR}} = Config;
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    mainWrapper:{
        paddingTop:moderateScale(6)
    },
    componentWrapper:{
        marginBottom:moderateScale(10)
    },
    cardBox:{
        backgroundColor:WHITE,
        width:'100%',
        marginBottom : moderateScale(20),
        borderColor:LIGHTGREY,
        borderWidth:1,
        borderRadius:moderateScale(4),
        paddingHorizontal:moderateScale(10)
    },
    artistBox:{
        backgroundColor:WHITE,
        borderRadius:moderateScale(4),
        padding:moderateScale(10),
        marginRight:moderateScale(10),
        justifyContent:'center',
        alignItems:'center',
    },
    profilePic:{
        width:moderateScale(140),
        height:moderateScale(140),
        borderRadius:moderateScale(40),
        backgroundColor:APP_THEME_COLOR,
        borderWidth:.4,
        borderColor:APP_THEME_COLOR,
        overflow:'hidden'
    },
    productPicHorizontal:{
        minWidth:moderateScale(200),
        height:moderateScale(160),
        borderRadius:moderateScale(5),
        backgroundColor:APP_THEME_COLOR,
        borderWidth:.4,
        borderColor:APP_THEME_COLOR,
        overflow:'hidden'
    },
    productPicVertical:{
        minWidth:moderateScale(180),
        minHeight:moderateScale(300),
        borderRadius:moderateScale(5),
        backgroundColor:APP_THEME_COLOR,
        borderWidth:.4,
        borderColor:APP_THEME_COLOR,
        overflow:'hidden'
    },
    productPicVerticalLarge:{
        minWidth:SCREEN_WIDTH - 100,
        minHeight:moderateScale(350),
        borderRadius:moderateScale(5),
        backgroundColor:APP_THEME_COLOR,
        borderWidth:.4,
        borderColor:APP_THEME_COLOR,
        overflow:'hidden'
    },
    imageOverlay:{
        backgroundColor:'#000',
        opacity:0.5,
        width:'100%',
        height:'16%',
        position:'absolute',
        bottom:0
    },
    topArtist:{
        fontWeight:'bold',
        marginTop:moderateScale(10),
        color:SUBNAME
    },
    eachArtistName:{
        fontWeight:'bold',
        marginTop:moderateScale(10),
        color:WHITE,
        maxWidth:moderateScale(150),
        position:'absolute',
        bottom:moderateScale(5),
        left:moderateScale(15)
    },
    noDataText:{alignSelf:'center',marginTop:moderateScale(50),color:SUBNAME},

    contestWinnerCard:{
        backgroundColor:LIGHTGREY,
        padding:moderateScale(30),
        borderRadius:moderateScale(6),
        marginTop:moderateScale(20)
    },
    contestDesc:{
        textAlign:'center',
        color:WHITE,
    },
    emptyView:{
        height:moderateScale(30)
    },
    winner:{
        color:SUBNAME
    }
});

export default styles;