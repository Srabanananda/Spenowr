import Config from '@Config/default';
import { StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
const { COLOR: { WHITE, APP_PINK_COLOR,SUBNAME } } = Config;

const styles = StyleSheet.create({
    container:{
        flex:1,padding:20,
        backgroundColor:WHITE
    },
    headerText:{
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:moderateScale(20)
    },
    header:{
        fontWeight:'bold',
        fontSize:moderateScale(14)
    },
    description:{
        color:SUBNAME,
        marginTop:moderateScale(2),
        textAlign:'center',
        fontSize:moderateScale(11)
    },
    bagIcon:{
        color:WHITE
    },
    betterText:{
        marginBottom:moderateScale(5),
        fontWeight:'bold',
        fontSize:moderateScale(14)
    },
    iconCircle:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:APP_PINK_COLOR,
        alignSelf:'center',
        margin:moderateScale(25),
        padding:moderateScale(20),
        borderRadius:moderateScale(20)
    }
});

export default styles;