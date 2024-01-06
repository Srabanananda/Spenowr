/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text} from 'react-native';
import { GlobalStyles } from '../../@GlobalStyles';

const ListHeader = ({headerText,textStyles={},children,headerViewStyle}) =>{
    return(
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',...headerViewStyle}}>
            <Text style={[GlobalStyles.listHeaderText,textStyles]}>{headerText}</Text>
            {children ? children : null}
        </View>
    );
};

export default ListHeader;