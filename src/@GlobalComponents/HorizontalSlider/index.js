/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const HorizontalSlider = ({children}) =>{
    return(
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
            {children ? children : null}
        </ScrollView>
    );
};

export default HorizontalSlider;