import Config from '@Config/default';
import { StyleSheet} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
const { COLOR: { APP_PINK_COLOR,DARK_BLACK,ORANGE,LIGHTGREY,SUBNAME,APP_THEME_COLOR,WHITE } } = Config;

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
    },
    container:{
        margin:moderateScale(10),
        padding:moderateScale(10),
        backgroundColor:'#fff',
        shadowColor: '#000', 
        shadowOpacity: .2,
        shadowRadius: moderateScale(4), 
        elevation: moderateScale(2),
        shadowOffset: {
            height: scale(2),
            width: scale(2)
        },
    },
    lowerContainer:{
        marginTop:moderateScale(10),
        paddingLeft:moderateScale(10),
    },
    titleText:{
        fontSize:moderateScale(20),
        fontWeight:'bold',
        color:DARK_BLACK
    },
    subText:{
        color:DARK_BLACK,
    },
    subText2:{
        color:APP_PINK_COLOR,
        fontWeight:'600'
    },
    dataBox:{
        flexDirection:'row',
        alignItems:'center',
    },
    discountBox:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:ORANGE,
        paddingHorizontal:moderateScale(10),
        borderRadius:moderateScale(4)
    },
    names:{
        color:DARK_BLACK,
        fontWeight:'bold'
    },
    fewLeft:{
        color:APP_PINK_COLOR,
    },
    values:{
        fontWeight:'bold'
    },
    bottomContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:moderateScale(15),
        paddingBottom:moderateScale(5)
    },
    reviewModal:{
        width:'90%',
        backgroundColor:'#fff',
        padding:moderateScale(15),
        borderRadius:moderateScale(4),
    },
    textInput:{
        borderWidth:1,paddingHorizontal:moderateScale(15),
        borderColor:LIGHTGREY,
        marginVertical:moderateScale(8),
        borderRadius:moderateScale(3),
        height:moderateScale(80),
        textAlignVertical:'top'
    },
    textInputSmall:{
        borderWidth:1,paddingHorizontal:moderateScale(15),
        borderColor:LIGHTGREY,
        marginVertical:moderateScale(8),
        borderRadius:moderateScale(3),
        height:moderateScale(40),
        textAlignVertical:'top'
    },
    reviewContainer:{
        borderColor:APP_PINK_COLOR,
        borderWidth:0.6,
        borderRadius:4,
        padding:8,
        width:'100%',
        marginTop:6,
        marginRight:6
    },
    name:{
        fontWeight:'bold',
        marginLeft:5
    },
    comment:{
        color:SUBNAME,fontSize:10,
        marginTop:moderateScale(4)
    },
    circle:{
        width:moderateScale(20),
        height:moderateScale(20),
        borderRadius:moderateScale(10),
        backgroundColor:APP_THEME_COLOR
    },
    buttonContainer:{
        width:'100%',
        height:moderateScale(40),
        flexDirection:'row'
    },
    button:{
        flex:1,
        backgroundColor:APP_PINK_COLOR,
        justifyContent:'center',
        alignItems:'center'
    },
    button2:{
        backgroundColor:LIGHTGREY
    },
    addText:{
        fontSize:moderateScale(16),
        fontWeight:'bold',
        color:WHITE
    },
    buyNow:{
        fontSize:moderateScale(16),
        fontWeight:'bold',
        color:DARK_BLACK
    }
});

export default styles;