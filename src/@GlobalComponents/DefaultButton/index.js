/**
 * Create By @name Sukumar_Abhijeet on 
 */

import React from 'react';
import { 
    TouchableOpacity, ActivityIndicator,Text,StyleSheet 
} from 'react-native';
import PropTypes from 'prop-types';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../@GlobalStyles';
const {COLOR:{APP_PINK_COLOR,LIGHTGREY,WHITE}} = Config;

const DefaultButton = ({
    showLoader = false,onPress,buttonText,buttonStyle,
    textStyle,isDeactivated = false,
    type='button'
}) =>{
    if(type==='outline')
        return(
            <TouchableOpacity  disabled={showLoader || isDeactivated}  onPress={onPress} style={[GlobalStyles.seeMoreButton,buttonStyle,isDeactivated && styles.outlineDeactivated]}>
                {showLoader ? <ActivityIndicator color={APP_PINK_COLOR} size={'small'} /> : <Text style={[GlobalStyles.seeMoreButtonText,isDeactivated && {color:WHITE},textStyle]}>{buttonText}</Text>}
            </TouchableOpacity>
        );
    return(
        <TouchableOpacity 
            disabled={showLoader || isDeactivated} 
            onPress={onPress} 
            style={isDeactivated ? {...styles.buttonDeactivated,...buttonStyle} :{...styles.button,opacity:showLoader ? .4 : 1,...buttonStyle}}>
            {showLoader && <ActivityIndicator color={'#fff'} size={'small'} />}
            <Text style={{...styles.buttonText,...textStyle}}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

DefaultButton.propTypes = {
    buttonStyle:PropTypes.object,
    buttonText:PropTypes.string.isRequired,
    isDeactivated:PropTypes.bool,
    onPress:PropTypes.func.isRequired,
    showLoader:PropTypes.bool.isRequired,
    textStyle:PropTypes.object,
    type: PropTypes.string
};


export default DefaultButton;

const styles = StyleSheet.create({
    
    button:{
        backgroundColor:APP_PINK_COLOR,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:moderateScale(10),
        paddingVertical:moderateScale(10),
        borderRadius:moderateScale(4)
    },
    buttonDeactivated:{
        backgroundColor:LIGHTGREY,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:moderateScale(10),
        paddingVertical:moderateScale(10),
        borderRadius:moderateScale(4)
    },
    buttonText:{
        color:'#fff',marginRight:moderateScale(5),
        fontSize:moderateScale(16),fontWeight:'bold'
    },
    outlineDeactivated:{
        backgroundColor:LIGHTGREY,
        borderWidth:0,
    }

});