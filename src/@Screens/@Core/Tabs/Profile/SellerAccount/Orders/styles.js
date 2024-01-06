import Config from '@Config/default';
import { StyleSheet} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
const { COLOR: { APP_PINK_COLOR,DARKGRAY,DARK_BLACK,LIGHTGREY,SUBNAME } } = Config;

const styles = StyleSheet.create({
    screenContainer:{
        flex:1
    },
    container: {
        flex:1,
        padding:moderateScale(10),
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
    orderCard:{
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(4), elevation: moderateScale(2),
        shadowOffset: {
            height: scale(2),
            width: scale(2)
        },
        backgroundColor:'#fff',marginVertical:moderateScale(10),
        overflow:'hidden',
    },
    detailCard:{
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(4), 
        elevation: moderateScale(2),
        shadowOffset: {
            height: scale(2),
            width: scale(2)
        },
        backgroundColor:'#fff',
        overflow:'hidden',
        padding:moderateScale(5)
    },
    upperBox:{
        backgroundColor:DARKGRAY,
        height:moderateScale(40),
        width:'100%',
        padding:moderateScale(10),
        justifyContent:'center'
    },
    lowerBox:{
        padding:moderateScale(10)
    },
    dataBox:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:moderateScale(4)
    },
    names:{
        color:DARK_BLACK
    },
    values:{
        fontWeight:'bold'
    },
    buttonBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:moderateScale(10)
    },
    Button:{
        backgroundColor:APP_PINK_COLOR,
        width:moderateScale(120),
        padding:moderateScale(8),
        borderRadius:moderateScale(4),
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        color:APP_PINK_COLOR,
        fontSize:moderateScale(18),
        fontWeight:'bold',
        marginTop:moderateScale(10)
    },
    imageHolder:{
        width:'100%',
        height:moderateScale(200),
        backgroundColor:LIGHTGREY,
        borderRadius:moderateScale(10)
    },
    orderCardWrapper:{
        marginBottom:moderateScale(10)
    },
    detailContainer:{
        padding:moderateScale(10),
        marginTop:moderateScale(10)
    },
    detailInnerBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:moderateScale(15),
        borderColor:LIGHTGREY,
        borderBottomWidth:1
    },
    detailText:{
        color:SUBNAME
    },
    detailValue:{
        fontWeight:'bold'
    }
});

export default styles;