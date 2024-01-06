/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { Image, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const imageStyle = {
    width: moderateScale(25), height: moderateScale(25)
};

const TabIcons = ({...props}) =>{

    const { imageOption, focused } = props;

    const renderTabImage = () => {
        switch (imageOption) {
        case 'Home':

            return(
                <Image 
                    resizeMode={'contain'} 
                    source={
                        focused ? 
                            require('@Assets/tabs/homeRed.svg')  : 
                            require('@Assets/tabs/home.svg')
                    } 
                    style={imageStyle}
                />
            );
        case 'Shop' :

            return(
                <Image 
                    resizeMode={'contain'} 
                    source={
                        focused ? 
                            require('@Assets/tabs/shopRed.svg') : 
                            require('@Assets/tabs/shop.svg')
                    } 
                    style={imageStyle} />
            );

        case 'Spenowr' :
            return(
                <Image 
                    resizeMode={'contain'} 
                    source={
                        focused ? 
                            require('@Assets/tabs/close.svg') : 
                            require('@Assets/tabs/spenowr.svg')
                    }
                    style={imageStyle} />
            );

        case 'Profile' :
            return(
                <Image 
                    resizeMode={'contain'} 
                    source={
                        focused ? 
                            require('@Assets/tabs/profileRed.svg') : 
                            require('../assets/tabs/profile.svg')
                    }
                    style={imageStyle} />
            );

        case 'More' :
            return(
                <Image 
                    resizeMode={'contain'} 
                    source={
                        focused ? 
                            require('@Assets/tabs/moreRed.svg') : 
                            require('../assets/tabs/more.svg')
                    }
                    style={imageStyle} />
            );
        }
    };
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {renderTabImage()}
        </View>
    );
};

export default TabIcons;