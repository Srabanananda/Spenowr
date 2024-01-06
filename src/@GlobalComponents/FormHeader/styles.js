import Config from '@Config/default';
import { StyleSheet} from 'react-native';
import { moderateScale} from 'react-native-size-matters';
const { COLOR: { WHITE,APP_PINK_COLOR,APP_THEME_COLOR } } = Config;

const styles = StyleSheet.create({
    formHeader:{
        backgroundColor:APP_THEME_COLOR,
        paddingHorizontal:moderateScale(10),
        padding:moderateScale(10),  
    },
    formHeaderOutlined:{
        borderColor:APP_PINK_COLOR,
        paddingHorizontal:moderateScale(10),
        borderWidth:1,
        padding:moderateScale(10),  
        backgroundColor:WHITE
    },
    justifyAlign:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    headerText:{color:WHITE,fontWeight:'bold'},
    headerTextOutlined:{
        color:APP_PINK_COLOR,fontWeight:'bold'
    }
});

export default styles;