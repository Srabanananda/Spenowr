/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import ColorPicker from '../../../../../../../../../../../@GlobalComponents/ColorPicker/index';
import { FONTS } from './Fonts';

const {COLOR : {LIGHTGREY,WHITE,BLACK,APP_PINK_COLOR}} = Config;

type CustomTextsProps = {
    isBold:Boolean,
    setIsBold : Function,
    isItalic: Boolean,
    setIsItalic: Function,
    currentColor : String,
    setCurrentColor: Function,
    setIsNewColorPicked : Function,
    font : String
}
 
const CustomTexts = ({...props}:CustomTextsProps) =>{

    const {
        isBold, setIsBold, isItalic, setIsItalic, currentColor,
        setCurrentColor,setIsNewColorPicked,font
    } = props;

    const pickerProps = {
        currentColor,setCurrentColor,setIsNewColorPicked
    };

    const CUSTOM_TEXTS = [
        {icon : 'bold'},{icon:'italic'},{icon:'custom'}
    ];

    const onPress = i => {
        switch (i) {
        case 0:
            setIsBold(!isBold);
            break;
        case 1:
            setIsItalic(!isItalic);
            break;
        }
    };

    const getSelectedStyles = (i,isIcon = false) => {
        switch (i) {
        case 0:
            return  isIcon ?  isBold ? WHITE : BLACK : isBold ? [styles.eachBox,styles.selectedBox] :  styles.eachBox;
        case 1:
            return  isIcon ?  isItalic ? WHITE : BLACK : isItalic ? [styles.eachBox,styles.selectedBox] :  styles.eachBox;
        default:  
            return styles.eachBox;
        }
    };

    const {hasVariations = false,label} = FONTS.find(x=> x.value === font || x.bold === font || x.italic === font || x.both === font );

    return(
        <>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.customTextWrapper}>
                    {
                        CUSTOM_TEXTS.map((each,i) =>
                            (
                                <>
                                    {
                                        each.icon === 'custom' ?  <ColorPicker containerStyles={styles.eachBox} key={i} {...pickerProps} /> :
                                            hasVariations ?  <View key={i}>
                                                <TouchableOpacity onPress={()=>onPress(i)}  style={getSelectedStyles(i)}>
                                                    <Icon color={getSelectedStyles(i,true)} name={each.icon} size={24} />
                                                </TouchableOpacity>
                                            </View> : null
                                    }
                                </>
                            )
                        )
                    }
                </View>
            </ScrollView>
        </>
    );
};
 
export default CustomTexts;
const styles = StyleSheet.create({
    customTextWrapper:{flexDirection: 'row',alignItems:'center',paddingLeft:moderateScale(5)},
    eachBox:{
        backgroundColor:LIGHTGREY,
        height:moderateScale(75),
        width:moderateScale(75),
        justifyContent:'center',
        alignItems:'center',
        marginRight:moderateScale(10),
        borderRadius:moderateScale(4)
    },
    
    selectedBox:{
        backgroundColor:APP_PINK_COLOR
    }
});