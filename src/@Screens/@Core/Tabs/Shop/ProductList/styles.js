import Config from '@Config/default';
import { StyleSheet} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { DEVICE_WIDTH } from '@Utils/helperFiles/DeviceInfoExtractor';
const { COLOR: {LIGHTGREY,SUBNAME,APP_THEME_COLOR} } = Config;

const styles = StyleSheet.create({
    productCard:{
        shadowColor: '#000', 
        shadowOpacity: .2,
        shadowRadius: moderateScale(4), 
        elevation: moderateScale(2),
        shadowOffset: {
            height: scale(5),
            width: scale(5)
        },
        backgroundColor:'#fff',
        marginVertical:moderateScale(10),
        overflow:'hidden',
    },
    imageHolder:{
        width:'100%',
        backgroundColor:LIGHTGREY,
        borderRadius:moderateScale(6)
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
    strikeThrough:{
        textDecorationLine:'line-through',fontWeight:'400',marginLeft:moderateScale(5),fontSize:moderateScale(10)
    },
    buttonsWrapper:{
        flexDirection:'row',
        justifyContent:'space-between'
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
    imageHolderSmall:{
        backgroundColor:LIGHTGREY,
        borderRadius:moderateScale(6),
    },
    smallCard:{
        borderRadius:moderateScale(10),
        margin:moderateScale(5),
        width:moderateScale(DEVICE_WIDTH/2-20),
        marginVertical:moderateScale(5),
    }
});

export default styles;