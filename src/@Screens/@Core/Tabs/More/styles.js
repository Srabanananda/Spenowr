import {StyleSheet,Dimensions} from 'react-native';



import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';

const WIDTH = Dimensions.get('window').width;

const {COLOR:{WHITE,APP_PINK_COLOR,DARK_BLACK,DARKGRAY,LIGHTGREY}} = Config;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        height: 60,
        width: WIDTH,
        justifyContent:'center',
        alignItems:'center',
    },
    
    settingCellDesign: {
        height: moderateScale(50),
        flex: 1,
        marginVertical: 1,
    },
    cellTextDesign: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 20,
        marginTop: 10,
        color: DARK_BLACK,

    },
    switchStyle: {
        marginHorizontal: 20,
    },
    logoutButton:{
        backgroundColor:APP_PINK_COLOR,
        paddingHorizontal:moderateScale(35),
        padding:moderateScale(6),
        borderRadius:moderateScale(6)
    },
    logoutText:{
        color:WHITE,fontWeight:'bold',
        fontSize:moderateScale(15)
    },
    footerView:{ backgroundColor: DARKGRAY, height: 0.5, width: WIDTH },
    footerText: {
        color: APP_PINK_COLOR,
        fontSize: moderateScale(10),
        fontWeight: 'bold',
        marginTop:moderateScale(5)
    },
    eachRow:{
        paddingVertical:moderateScale(15),
        borderBottomWidth:1,
        borderBottomColor:LIGHTGREY,
        flexDirection:'row',
        justifyContent:'space-between'
    }
});

export default styles;