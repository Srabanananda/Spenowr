import Config from '@Config/default';
import { StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
const { COLOR: { PINK_LIGHT,WHITE,APP_THEME_COLOR,SUBNAME,DARK_BLACK,APP_PINK_COLOR } } = Config;

const styles = StyleSheet.create({
    containerUnread:{
        padding:moderateScale(10),
        backgroundColor:PINK_LIGHT,
        flexDirection:'row',
        alignItems:'center',
        width:'100%'
    },
    containerRead:{
        padding:moderateScale(10),
        flexDirection:'row',
        alignItems:'center',
        width:'100%'
    },
    imageCircle:{
        width:moderateScale(45),
        height:moderateScale(45),
        borderRadius:moderateScale(25),
        backgroundColor:APP_THEME_COLOR,
        marginRight:moderateScale(10),
        overflow:'hidden'
    },
    FlatList:{
        backgroundColor:WHITE
    },
    titleHead:{
        fontWeight:'bold',
        fontSize:moderateScale(14),
        marginBottom:moderateScale(2)
    },  
    SenderUnread:{
        color:DARK_BLACK,
        fontWeight:'bold',
        fontSize:moderateScale(12)
    },
    SenderRead:{
        color:DARK_BLACK,
        fontSize:moderateScale(12),
    },
    messageTextUnread:{
        color:DARK_BLACK,
        fontWeight:'bold',
        maxWidth:'90%',
        fontSize:moderateScale(12)
    },
    messageTextRead:{
        color:DARK_BLACK,
        maxWidth:'90%',
        fontSize:moderateScale(12),
    },
    desc:{
        fontSize:moderateScale(10),
        color:SUBNAME,
        maxWidth:moderateScale(260)
    },
    noNotificationContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    noNotifications:{
        fontWeight:'bold'
    },
    subText:{
        color:SUBNAME,
        fontSize:moderateScale(11),
        marginTop:moderateScale(5)
    },
    bellBox:{
        width:moderateScale(100),
        height:moderateScale(100),
        borderRadius:moderateScale(50),
        justifyContent:'center',
        alignItems:'center',
        marginTop:moderateScale(10),
        backgroundColor:APP_PINK_COLOR
    },
    refreshButton:{
        marginTop:moderateScale(20)
    }
});

export default styles;