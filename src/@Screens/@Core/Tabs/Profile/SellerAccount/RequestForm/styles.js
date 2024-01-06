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
    inputHeaderName:{
        color:DARK_BLACK,
        marginTop:moderateScale(8),
        fontSize:moderateScale(12)
    },
    starColor:{
        color:RED,
    },  
    textInput:{
        borderWidth:1,paddingLeft:moderateScale(15),
        borderColor:LIGHTGREY,
        marginVertical:moderateScale(8),
        borderRadius:moderateScale(3),
        height:moderateScale(40)
    },
    selectedImageStyle: {
        height: moderateScale(300), width: '100%',
        marginTop:moderateScale(6),
        borderRadius:moderateScale(6)
    },
    gettinStartedContainer:{
        padding:moderateScale(20),
    },
    actionContainer:{
        flexDirection:'row',
        paddingBottom:moderateScale(16),
        width:'90%'
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
        marginTop:moderateScale(8),
    },
    bagIcon:{
        color:WHITE
    },
    iconCircle:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:APP_PINK_COLOR,
        alignSelf:'center',
        margin:moderateScale(25),
        padding:moderateScale(20),
        borderRadius:moderateScale(20)
    },
    wrapper:{
        marginTop:moderateScale(40)
    },
    smallIconStyles:{
        color:APP_PINK_COLOR
    }
});

export default styles;