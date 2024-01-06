/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,ScrollView,StyleSheet,TouchableOpacity} from 'react-native';
import QuoteImageJSON from '../../../../../../../../../../../assets/JsonFiles/Quotes/quotes.js';
import { moderateScale } from 'react-native-size-matters';
import ColorPicker from '../../../../../../../../../../../@GlobalComponents/ColorPicker/index';

const BACKGROUND_COLORS = QuoteImageJSON.quotes[3].bgColors;

type BackgroundColorsProps = {
    onColorChange : Function
}

const BackgroundColors = ({...props}:BackgroundColorsProps) =>{

    const {onColorChange} = props;

    const getColorFromPicker = pickedColor => {
        onColorChange({
            color_code : pickedColor,
            text_color: '#000'
        });
    };

    const pickerProps ={
        setCurrentColor : getColorFromPicker,
        currentColor : '#000'
    };

    return(
        <ScrollView
        >
            <View style={styles.colorWrapper}>
                {
                    BACKGROUND_COLORS.map((each,i) =>
                        (
                            <>
                                {
                                    each.bg_type === 'custom' ?  <ColorPicker containerStyles={[styles.colorBox, styles.colorPickerBox]} key={i} {...pickerProps} /> :
                                        <TouchableOpacity key={i} onPress={()=>onColorChange(each)}>
                                            <View style={[styles.colorBox,{backgroundColor:each.color_code}]} />
                                        </TouchableOpacity>
                                }
                            </>
                        )
                    )
                }
            </View>
        </ScrollView>
    );
};

export default BackgroundColors;
const styles = StyleSheet.create({
    colorWrapper:{flexDirection: 'row',flexWrap:'wrap',padding:moderateScale(5)},
    colorBox:{
        height: moderateScale(75),
        width: moderateScale(75),
        borderRadius: moderateScale(4),
        margin:moderateScale(5)
    },
    colorPickerBox:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#b0b0b0'
    }
});