/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {Text,StyleSheet, TouchableOpacity, Image} from 'react-native';
import Config from '@Config/default';
import { moderateScale, scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

const {COLOR:{WHITE,APP_PINK_COLOR,DARK_BLACK,LIGHTGREY,SUBNAME}} = Config;

const Card = ({cardItem,currentSkill,handleChange,data,type='large'}) =>{

    const [selected, setSelected] = useState(false);
    useEffect(()=>{ 
        if(currentSkill)
        {
            const res = data.find(x=>x.item.label === cardItem.item.label);
            if(res) setSelected(true);
        }
    },[currentSkill]);

    const action = () =>{
        if(selected)
        {
            let index = -1;
            if(type === 'large') index = data.findIndex(x => x.name === cardItem.name );
            else index = data.findIndex(x => x.item.label === cardItem.item.label );
            data.splice(index,1);
            handleChange(data);
        }
        else
        {
            data.push(cardItem);handleChange(data);
        }
        setSelected(!selected);
    };

    if(type === 'small')
        return(
            <TouchableOpacity onPress={()=>action()} style={{...styles.smallBox,backgroundColor:selected ? APP_PINK_COLOR : WHITE}}>
                <Text style={{...styles.cardName, color: selected ? WHITE : DARK_BLACK}}>{cardItem.item.label}</Text>
            </TouchableOpacity>
        );
    return(
        <TouchableOpacity onPress={()=>action()} style={{...styles.cardBox,backgroundColor:selected ? APP_PINK_COLOR : WHITE}}>
            <Image resizeMode={'contain'} source={selected ? cardItem.imgPathSelected :  cardItem.imgPath} style={{width:moderateScale(60)}} />
            <Text 
                style={{...styles.cardName,fontWeight: 'normal' ,color: selected ? WHITE : SUBNAME,marginTop:moderateScale(15)}}
            >{cardItem.name}</Text>
        </TouchableOpacity>
    );
};

Card.propTypes = {
    cardItem:PropTypes.object.isRequired,
    data:PropTypes.array.isRequired,
    handleChange:PropTypes.func.isRequired,
    type:PropTypes.string.isRequired
};

export default Card;

const styles = StyleSheet.create({
    cardBox: {
        width:moderateScale(160),
        height:moderateScale(170),
        backgroundColor:WHITE,
        marginBottom:moderateScale(10),
        borderRadius:moderateScale(8),
        justifyContent:'center',
        alignItems:'center',
        borderColor:LIGHTGREY,
        borderWidth:1
    },
    smallBox:{
        height:moderateScale(40),
        paddingHorizontal:moderateScale(15),
        borderColor:APP_PINK_COLOR,
        backgroundColor:WHITE,
        marginBottom:moderateScale(10),
        borderRadius:moderateScale(8),
        justifyContent:'center',
        alignItems:'center',
        shadowColor: '#000', shadowOpacity: .2,
        shadowRadius: moderateScale(2), 
        elevation: moderateScale(3),
        shadowOffset: {
            height: scale(1),
            width: scale(1)
        },
        marginRight:moderateScale(10)
    },
    cardName:{
        textAlign:'center',
        maxWidth:moderateScale(120),
        fontWeight:'bold'
    }
});