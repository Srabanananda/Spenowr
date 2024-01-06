/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,StyleSheet,Text,Platform} from 'react-native';
import SelectImage from '../../../../../../../../../../../@GlobalComponents/SelectImage/index';
import { moderateScale } from 'react-native-size-matters';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';
import { pickImage } from '../../../../../../../../../../../@Utils/helperFiles/ImagePicker';

type CustomImagesProps ={
    onTop : Boolean,
    setOnTop : Function,
    onImageChange: Function,
    primaryImg : any
}

const CustomImages = ({...props}:CustomImagesProps) =>{

    const {onTop,setOnTop,onImageChange,primaryImg,isLimitCrossed} = props;

    const chooseFile = () => {
        pickImage((res)=>{
            let response = res;
            if(Platform.OS === 'android'){
                if(res?.assets) response = res.assets[0];
            }
            if(response.didCancel) return;
            onImageChange(response);
        });
    };
    const limitReached = () => Toast.show('Given text Reached the Maximum character Limit')
    return(
        <View style={styles.Wrapper}>
            <SelectImage onPress={()=>isLimitCrossed ? limitReached() : chooseFile()} style={styles.selectedImageStyle} />
            {
                primaryImg && primaryImg.base64  ?  
                    <View style={styles.textShowBox}>
                        <CheckBox
                            onValueChange={(newValue) => {
                                setOnTop(newValue);
                            }}
                            value={onTop}
                        />
                        <Text style={{...styles.inputHeaderName,marginTop:0,marginLeft:moderateScale(8)}}>Show description on the top</Text>
                    </View>
                    : null
            }
        </View>
    );
};
 
export default CustomImages;
const styles = StyleSheet.create({
    Wrapper:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        flexDirection:'row'
    },
    selectedImageStyle: {
        height: moderateScale(60),
        width: moderateScale(60),
        margin: moderateScale(3),
        borderWidth: moderateScale(2),
        borderRadius: moderateScale(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textShowBox:{flexDirection:'row',alignItems:'center',marginBottom:moderateScale(5)}
});