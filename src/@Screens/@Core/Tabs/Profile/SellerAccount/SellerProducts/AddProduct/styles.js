import Config from '@Config/default';
import { StyleSheet} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
const { COLOR: { APP_PINK_COLOR, DARK_BLACK,RED,LIGHTGREY,DARKGRAY,SUBNAME } } = Config;

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    formWrapper:{
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(4), elevation: moderateScale(2),
        shadowOffset: {
            height: scale(2),
            width: scale(2)
        },
        backgroundColor:'#fff',
        margin:moderateScale(10),
        padding:moderateScale(5),
        paddingHorizontal:moderateScale(10),
        borderTopColor:APP_PINK_COLOR,
        borderTopWidth:1.5
    },
    inputHeaderName:{
        color:DARK_BLACK,
        marginTop:moderateScale(8),
        fontSize:moderateScale(12)
    },
    starColor:{
        color:RED,
    },  
    textInput:{
        borderWidth:1,paddingHorizontal:moderateScale(15),
        borderColor:LIGHTGREY,
        marginVertical:moderateScale(8),
        borderRadius:moderateScale(3),
        height:moderateScale(40)
    },
    disabled:{
        backgroundColor:DARKGRAY,
        justifyContent:'center'
    },
    selectedImageStyle: {
        height: moderateScale(300), width: '100%',
        marginTop:moderateScale(6),
        borderRadius:moderateScale(6)
    },
    dropDownView:{
        height:moderateScale(60),justifyContent:'center',marginTop:moderateScale(-10)
    },
    addMore:{
        alignSelf:'flex-end',color:SUBNAME,
        textDecorationLine:'underline'
    }
});

export default styles;