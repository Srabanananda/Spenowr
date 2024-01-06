/**
 * Create By @name Sukumar_Abhijeet 
 */

import {StyleSheet} from 'react-native';
import Config from '@Config/default';
import { moderateScale, scale } from 'react-native-size-matters';

const {
    COLOR :{
        WHITE,APP_PINK_COLOR,LIGHTGREY,DARK_BLACK,RED,
        SUBNAME,APP_THEME_COLOR
    }
} = Config;

export const GlobalStyles  = StyleSheet.create({
    GlobalContainer : {
        flex:1,
    },
    primaryCard:{
        backgroundColor:WHITE,
        width:'100%',
        borderRadius:moderateScale(4),
        shadowRadius: moderateScale(1), 
        elevation: scale(5),
        shadowOffset: {
            height: scale(1),
            width: scale(1)
        },
        shadowColor: '#000', 
        shadowOpacity: .2,
        overflow:'hidden'
    },
    AddButton:{
        position:'absolute',
        bottom:moderateScale(30),
        right:moderateScale(30),
        width:moderateScale(50),
        height:moderateScale(50),
        borderRadius:moderateScale(30),
        backgroundColor:APP_PINK_COLOR,
        justifyContent:'center',alignItems:'center',
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(2), elevation: scale(2),
        shadowOffset: {
            height: scale(2),
            width: scale(2)
        },
    },
    imageSelectionBox:{
        height:moderateScale(200),
        borderStyle: 'dotted',
        borderRadius: 1,
        borderWidth:1,
        borderColor:LIGHTGREY,
        marginVertical:moderateScale(10),
        justifyContent:'center',
        alignItems:'center'
    },
    selectedImageStyle: {
        height: moderateScale(300), 
        width: '100%',
        marginTop:moderateScale(6),
        borderRadius:moderateScale(6),
    },
    textInput:{
        borderWidth:1,
        paddingLeft:moderateScale(15),
        borderColor:LIGHTGREY,
        marginVertical:moderateScale(8),
        borderRadius:moderateScale(3),
        height:moderateScale(40),
        textAlignVertical:'top',
        width: '100%'
    },
    textArea:{
        borderWidth:1,
        paddingLeft:moderateScale(15),
        borderColor:LIGHTGREY,
        marginVertical:moderateScale(8),
        borderRadius:moderateScale(3),
        height:moderateScale(100),
        textAlignVertical:'top'
    },
    dropDownView:{
        height:moderateScale(50),justifyContent:'center',
    },
    starColor:{
        color:RED,
    },  
    required:{
        color:RED,
        fontSize:moderateScale(10)
    },  
    inputHeaderName:{
        color:DARK_BLACK,
        marginTop:moderateScale(8),
        fontSize:moderateScale(12)
    },
    formWrapper:{
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(4), elevation: moderateScale(2),
        shadowOffset: {
            height: scale(2),
            width: scale(2)
        },
        backgroundColor:'#fff',
        padding:moderateScale(5),
        paddingHorizontal:moderateScale(10),
        marginTop:moderateScale(10),
        borderTopColor:APP_PINK_COLOR,
        borderTopWidth:1.5
    },
    listHeaderText:{
        fontSize:moderateScale(14),
        fontWeight:'400',
    },
    seeMoreText:{
        fontSize:moderateScale(12),
        color:APP_PINK_COLOR
    },
    seeMoreBtn:{
        paddingHorizontal:moderateScale(10),
        backgroundColor:'transparent',
        marginTop:0
    },
    deleteText:{
        color:SUBNAME,
    },
    fallbackHead:{
        color:APP_THEME_COLOR,
        alignSelf:'center',
        fontWeight:'bold'
    },
    fallbackError:{
        alignSelf:'center',
        textAlign:'center',
        color:SUBNAME,
        fontSize:moderateScale(10),
        marginTop:moderateScale(6)
    },
    seeMoreButton:{
        borderColor:APP_PINK_COLOR,
        paddingHorizontal:moderateScale(10),
        padding:moderateScale(5),
        borderRadius:moderateScale(4),
        borderWidth:1
    },
    PlayButton:{
        borderColor:APP_PINK_COLOR,
        borderRadius:moderateScale(4),
        borderWidth:1
    },
    seeMoreButtonText:{
        fontSize:moderateScale(10),
        color:APP_PINK_COLOR
    },
    seeMoreButtonRev:{
        backgroundColor:APP_PINK_COLOR,
        paddingHorizontal:moderateScale(10),
        padding:moderateScale(5),
        borderRadius:moderateScale(4),
    },
    seeMoreButtonTextRev:{
        fontSize:moderateScale(10),
        color:WHITE,
        fontWeight:'bold'
    },
    skillBox:{
        backgroundColor:LIGHTGREY,
        paddingHorizontal:moderateScale(10),
        padding:moderateScale(3),
        borderRadius:moderateScale(10),
        marginRight:moderateScale(5)
    },
    skillText:{
        fontSize:moderateScale(10),
    },
    optionsBox:{
        paddingVertical:moderateScale(15),
        borderBottomColor: LIGHTGREY,
        borderBottomWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    noDataFound:{
        alignSelf:'center',
        color:SUBNAME,
        marginTop:moderateScale(20)
    },
    adminModal:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:WHITE,
        padding:moderateScale(15)
    },
}
);