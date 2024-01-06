/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useRef} from 'react';
import {View,TouchableOpacity,StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {fromHsv, TriangleColorPicker} from 'react-native-color-picker';
import DefaultButton from '@GlobalComponents/DefaultButton';
import ModalHeader from '@GlobalComponents/ModalHeader/index';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';

type ColorPickerProps = {
    currentColor : String,
    setCurrentColor : Function,
    setIsNewColorPicked ?: Function ,
    iconName ?: String,
    containerStyles ?: Object | Array
}

const ColorPicker = ({...props} :ColorPickerProps) =>{

    const {
        currentColor,setCurrentColor,setIsNewColorPicked,
        iconName = 'palette',
        containerStyles
    } = props;

    const [visible, setVisible] = useState(false);
    const selectedColorRef = useRef('#000000');

    const renderColorPallets = () =>{
        return(
            <View style={styles.adminModal}>
                <ModalHeader headerText={'Choose a Color'} onPress={()=>setVisible(false)} />
                <TriangleColorPicker
                    defaultColor={currentColor}
                    hideControls
                    onColorChange={color => {
                        selectedColorRef.current = fromHsv(color);
                    }}
                    style={{flex: 1}}
                />
                <DefaultButton
                    buttonText={'Submit'} onPress={()=>{
                        setCurrentColor(selectedColorRef.current);
                        setIsNewColorPicked?.(true);
                        setVisible(false);
                    }} />
            </View>
        );
    };

    return(
        <View>
            <TouchableOpacity onPress={()=>setVisible(true)}  style={containerStyles}>
                <Icon name={iconName} size={24} />
            </TouchableOpacity>
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={visible}
                onBackButtonPress= {()=>{
                    setVisible(false);
                }}
                onBackdropPress = {()=>{
                    setVisible(false);
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderColorPallets()}
            </Modal>
        </View>
    );
};

export default ColorPicker;
const styles = StyleSheet.create({
    adminModal:{
        width:'95%',
        height:'55%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius:moderateScale(6),
        backgroundColor:'#FFF',
        padding:moderateScale(15)
    },
});