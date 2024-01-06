import Config from '@Config/default';
import { StyleSheet} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
const { COLOR: {  LIGHTGREY,WHITE, DARK_BLACK,APP_PINK_COLOR,RED,SUBNAME } } = Config;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:moderateScale(10)
    },
    formWrapper:{
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(4), elevation: moderateScale(2),
        shadowOffset: {
            height: scale(2),
            width: scale(2)
        },
        backgroundColor:'#fff',
        margin:moderateScale(5),
        padding:moderateScale(5),
        paddingHorizontal:moderateScale(10),
        marginTop:moderateScale(10),
        borderTopColor:APP_PINK_COLOR,
        borderTopWidth:1.5
    },
    inputDisabled:{
        backgroundColor:LIGHTGREY
    },
    selectedImageStyle: {
        height: moderateScale(300), width: '100%',
        marginTop:moderateScale(6),
        borderRadius:moderateScale(6)
    },
});

export default styles;