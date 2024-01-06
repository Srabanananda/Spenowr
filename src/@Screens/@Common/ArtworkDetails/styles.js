import Config from '@Config/default';
import { StyleSheet} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
const { COLOR: { APP_PINK_COLOR,DARK_BLACK,DARK_VIOLET,ORANGE,LIGHTGREY,SUBNAME,APP_THEME_COLOR } } = Config;

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
    },
    container:{
        flex:1,
        margin:moderateScale(10),
        padding:moderateScale(10),
        backgroundColor:'#fff',
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(4), elevation: moderateScale(2),
        shadowOffset: {
            height: scale(2),
            width: scale(2)
        },
    },
    similarArtworkWrapper:{
        padding:moderateScale(10),
    },
    titleText:{
        fontSize:moderateScale(16),
        fontWeight:'bold',
        color:DARK_VIOLET,
        marginBottom:moderateScale(5)
    },
    subText:{
        color:SUBNAME,
        paddingVertical:moderateScale(4)
    },
    subText2:{
        color:APP_PINK_COLOR,
        paddingVertical:moderateScale(4),
        fontWeight:'600'
    },
    dataBox:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:moderateScale(5)
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
    contactPerson:{
        color:APP_PINK_COLOR
    },
    saveComment:{
        color:APP_PINK_COLOR,
        alignSelf:'flex-end',
        fontWeight:'bold'
    },
    eachCommentBox:{
        marginVertical:moderateScale(10),
        flexDirection:'row'
    },
    circle:{
        width:moderateScale(40),
        height:moderateScale(40),
        borderRadius:moderateScale(25),
        backgroundColor:APP_THEME_COLOR,
        overflow:'hidden'
    },
    commentInfoBox:{
        marginLeft:moderateScale(10)
    },
    dateCreated:{
        fontSize:moderateScale(8),
        color:SUBNAME
    },
    comment:{
        fontWeight:'bold'
    },
    adminModal:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:'#fff',
        padding:moderateScale(15)
    },
});

export default styles;