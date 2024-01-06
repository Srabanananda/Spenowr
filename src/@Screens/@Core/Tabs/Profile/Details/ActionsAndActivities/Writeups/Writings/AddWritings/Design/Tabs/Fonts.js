/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,ScrollView,StyleSheet,TouchableOpacity,Text} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';

export const FONTS = [
    {
        label: 'Arial',
        value: 'Arial',
        hasVariations : true,
        bold : 'Arial-BoldMT',
        italic : 'Arial-ItalicMT',
        both:'Arial-BoldItalicMT',
    },
    {
        label: 'Algerian',
        value: 'Algerian',
        hasVariations : false,
        bold : '',
        italic : '',
        both:'',
    },
    {
        label: 'Sofia',
        value: 'Sofia',
        hasVariations : false,
        bold : '',
        italic : '',
        both:'',
    },
    {
        label: 'Trirong',
        value: 'Trirong',
        hasVariations : true,
        bold : 'Trirong-Bold',
        italic : 'Trirong-Italic',
        both:'Trirong-BoldItalic',
    },
    {
        label: 'Audiowide',
        value: 'Audiowide',
        hasVariations : false,
        bold : '',
        italic : '',
        both:'',
    },
    {
        label: 'Helvetica',
        value: 'Helvetica',
        hasVariations : false,
        bold : '',
        italic : '',
        both:'',
    },
    {
        label: 'Roboto',
        value: 'Roboto',
        hasVariations : false,
        bold : '',
        italic : '',
        both:'',
    },
];

const {COLOR : {LIGHTGREY,APP_PINK_COLOR,WHITE,BLACK}} = Config;

type FontsProps = {
    onFontChange : Function,
    font: string,
};

const Fonts = ({...props}:FontsProps) =>{
    const {onFontChange,font} = props;
    const DISPLAY_FONTS = FONTS.slice(0,5);

    const isSelected = each => font === each.label || font === each.bold || font === each.italic || font === each.both;

    return(
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.fontsWrapper}>
                {
                    DISPLAY_FONTS.map((each,i) =>
                        <View key={i}>
                            <TouchableOpacity onPress={()=>onFontChange(each)}  style={[styles.eachFontBox,isSelected(each) ? styles.fontSelected : {}]}>
                                <Text style={[styles.text,{fontFamily:each.value},isSelected(each) ? styles.fontSelected : {color:BLACK}]}>S</Text>
                            </TouchableOpacity>
                            <Text style={styles.label}>{each.label}</Text>
                        </View>
                    )
                }
            </View>
        </ScrollView>
    );
};
 
export default Fonts;
const styles = StyleSheet.create({
    fontsWrapper:{flexDirection: 'row',alignItems:'center',paddingLeft:moderateScale(5)},
    eachFontBox:{
        backgroundColor:LIGHTGREY,
        height:moderateScale(60),
        width:moderateScale(60),
        justifyContent:'center',
        alignItems:'center',
        marginRight:moderateScale(10),
        borderRadius:moderateScale(4)
    },
    fontSelected:{
        color:WHITE,
        backgroundColor:APP_PINK_COLOR
    },
    text:{
        fontSize:moderateScale(35)
    },
    label:{
        alignSelf:'center',marginTop:moderateScale(8),
        fontSize:moderateScale(12),marginLeft:moderateScale(-10),
    }
});