import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import CountryPicker from 'react-native-country-picker-modal';


const Phone = ({ countryCode, phone, email, placeholder='Email or Phone Number' }) => {

    // const [email, setEmailOrPhone] = useState('');
    // const [email, setEmailOrPhone] = useState('');
    const [showCountry, setShowCountry] = useState(false);
    const [openCountry, setOpenCountry] = useState(false);
    const [country, setCountry] = useState();

    const onSelect = (country) => {
        setCountry(country);
        countryCode(`+${country?.callingCode[0]??''}`)
    };
    return(
        <View style={styles.container}>
            {
                showCountry &&
                <TouchableOpacity onPress={()=>setOpenCountry(true)} style={[GlobalStyles.textInput,styles.countryCodePicker]}>
                    <CountryPicker
                        {...{
                            countryCode : country?.cca2 ?? '',
                            withFilter : true,
                            withFlag : true,
                            withCallingCodeButton: true,
                            withCallingCode : true,
                            onSelect,
                        }}
                        visible={openCountry}
                    />
                </TouchableOpacity>
            }
            <TextInput 
                autoCapitalize='none' 
                onChangeText={(value) => {
                    console.log("P/E : ", value);
                    if(isNaN(value) || value == '') {
                        email(value)
                        phone('')
                        setShowCountry(false);
                    } else {
                        phone(value)
                        email('')
                        setShowCountry(true);
                    }
                }} 
                placeholder={placeholder}
                placeholderTextColor="#414756" 
                returnKeyType="next" 
                style={[GlobalStyles.textInput,showCountry && styles.phone]} />
        </View>
    );
}
export default Phone;
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    countryCodePicker:{
        flex:0.7,
        justifyContent:'center'
    },
    phone:{
        flex:1,
        marginLeft: 5,
    }
});