import Config from '@Config/default';
import { StyleSheet} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
const { COLOR: { APP_PINK_COLOR, SUBNAME} } = Config;

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
    },
    container:{
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
    saveComment:{
        color:APP_PINK_COLOR,
        alignSelf:'flex-end',
        fontWeight:'bold'
    },
    similarArtworkWrapper:{
        padding:moderateScale(10),
        flex:1
    },
    imgBackgroundVerticalContainer:{
        flex:1,width:null,height:null,
        minHeight:moderateScale(420),
        alignItems:'center',justifyContent:'center'
    },
    imgBackgroundContainer:{
        flex:1,width:null,height:null,
        minHeight:moderateScale(320),
        alignItems:'center',justifyContent:'center'
    },
    WritingsContainer:{
        width:moderateScale(150),height:moderateScale(150),marginRight:10
    },
    WritingsImageContainer:{
        maxHeight:moderateScale(150),minHeight:moderateScale(150)
    },
    quoteHead:{
        color:APP_PINK_COLOR,
        fontWeight:'bold'
    },
    detailWrapper:{
        marginTop:moderateScale(6)
    },
    desc:{
        marginTop:moderateScale(4),
        color:SUBNAME
    }

});

export default styles;