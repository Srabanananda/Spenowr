/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,StatusBar,StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type CustomStatusBarProps = {
    gradientColor : Array
}

const CustomStatusBar = ({...props} : CustomStatusBarProps) =>{

    const {gradientColor} = props;

    const StatusBarHeight = StatusBar.currentHeight;

    return(
        <View>
            <View style={{ height : StatusBarHeight , width : '100%' }}>
                <LinearGradient 
                    colors={gradientColor} 
                    end={{x: 0.5, y: 1.0}} 
                    locations={[0,0.3,0.6]}
                    start={{x: 0.0, y: 0.5}} style={styles.Container}>
                </LinearGradient>
            </View>
        
        </View>
    );
};

export default CustomStatusBar;
const styles = StyleSheet.create({
    Container : {
        flex : 1,
        backgroundColor : '#2980b9',
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row'
    }
});