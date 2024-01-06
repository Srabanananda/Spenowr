/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View, Image} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const StarRating = ({starCount=5,starSelected=3,size=12}) =>{

    const renderEachStar = (position) =>{
        return(
            <Image 
                key={position}
                resizeMode={'contain'} 
                source={Math.floor(starSelected) > position ? require('../../assets/svgs/starChecked.svg') :  require('../../assets/svgs/starUnchecked.svg')} 
                style={{width:moderateScale(size),height:moderateScale(size),margin:3}} 
            />
        );
    };

    return(
        <View style={{flexDirection:'row'}}>
            {
                [...Array(starCount)].map((item,index)=>(
                    renderEachStar(index)
                ))
            }
        </View>
    );
};

export default StarRating;