import Config from '@Config/default';
import { StyleSheet} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
const { COLOR: { APP_PINK_COLOR,LIGHTGREY,DARK_VIOLET,SUBNAME,APP_THEME_COLOR} } = Config;

const styles = StyleSheet.create({

    container: {
        flex:1,
        margin:moderateScale(10)
    },

    AddButton:{
        position:'absolute',
        bottom:moderateScale(20),
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

    formWrapper:{
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(4), elevation: moderateScale(2),
        shadowOffset: {
            height: scale(2),
            width: scale(2)
        },
        margin:moderateScale(5),
        marginTop:moderateScale(10),
        borderTopColor:APP_PINK_COLOR,
        borderTopWidth:1.5
    },

    productCard:{
        shadowColor: '#000', 
        shadowOpacity: .2,
        shadowRadius: moderateScale(4), elevation: moderateScale(2),
        shadowOffset: {
            height: scale(5),
            width: scale(5)
        },
        backgroundColor:'#fff',
        marginVertical:moderateScale(10),
        overflow:'hidden',
        padding:moderateScale(5)
    },

    imageHolder:{
        width:'100%',
        backgroundColor:LIGHTGREY,
        borderRadius:moderateScale(6)
    },
    imageOverlay:{
        width:'100%',
        height:moderateScale(200),
        backgroundColor:'#000',
        opacity:0.8,
        borderRadius:moderateScale(6),
        position:'absolute',
    },
    titleBox:{
        alignItems:'center',
        backgroundColor:DARK_VIOLET,
        paddingVertical:moderateScale(8)
    },

    title:{
        fontWeight:'bold',
        marginTop:moderateScale(5),
        fontSize:moderateScale(14)
    },

    categoryTitle:{
        marginTop:moderateScale(2),
        fontSize:moderateScale(12),
        color:SUBNAME
    },

    dataBox:{
        flexDirection:'row',
        marginVertical:moderateScale(4),
        alignItems:'center'
    },

    prices:{
        fontSize:moderateScale(14),
        fontWeight:'bold'
    },
    
    buttonBox:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:moderateScale(5)
    },

    Button:{
        backgroundColor:APP_PINK_COLOR,
        width:moderateScale(100),
        padding:moderateScale(8),
        borderRadius:moderateScale(4),
        justifyContent:'center',
        alignItems:'center'
    },
    strikeThrough:{
        textDecorationLine:'line-through',fontWeight:'400',marginLeft:moderateScale(5),fontSize:moderateScale(10)
    },
    offView:{
        backgroundColor:APP_THEME_COLOR,
        padding:moderateScale(4),
        borderRadius:moderateScale(4),
        maxWidth:moderateScale(60),
        marginLeft:moderateScale(10)
    },
    textOff:{
        color:'#FFF',
        fontSize:moderateScale(10)
    },
});

export default styles;