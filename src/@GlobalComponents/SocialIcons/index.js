/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { TouchableOpacity,Linking,View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import Config from '@Config/default';
const {COLOR:{APP_PINK_COLOR}} = Config;

const socialIcons = [
    {name:'facebook-f'},
    {name:'twitter'},
    {name:'linkedin-in'},
    {name:'pinterest-p'},
];
const ShareURL = 'www.spenowr.com';

const SocialIcons = ({shareUrl=ShareURL}) =>{
    const checkSharing = (type) =>{
        let facebookParameters = [];
        let twitterParameters = [];

        facebookParameters.push('u=' + encodeURI(shareUrl));
        twitterParameters.push('url=' + encodeURI(shareUrl));

        let url = '';
        if(type === 1)
            url = 'https://www.facebook.com/sharer/sharer.php?'+ facebookParameters.join('&');
        if(type === 2)
            url = 'https://twitter.com/intent/tweet?'+ twitterParameters.join('&');
        if(type === 3)
            url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        if(type === 4)
            url = `https://in.pinterest.com/pin/create/button/?url=${shareUrl}`;

        Linking.openURL(url)
            .then(() => {
            })
            .catch(() => {
            });

    };

    return(
        <View style={{flexDirection:'row'}}>
            {
                socialIcons.map((item,index)=>(
                    <TouchableOpacity key={index} onPress={()=>checkSharing(index+1)} style={styles.socialIcon}>
                        <Icon color={'#fff'} name={item.name} size={moderateScale(12)} />
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

SocialIcons.propTypes = {
    shareUrl:PropTypes.string,
};

export default SocialIcons;


const styles = StyleSheet.create({
    
    socialContainer:{
        position:'absolute',
        bottom:10,
        height:moderateScale(50),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        marginLeft:moderateScale(20)
    },
    socialIcon:{
        backgroundColor:APP_PINK_COLOR,
        width:moderateScale(25),
        height:moderateScale(25),
        borderRadius:moderateScale(20),
        marginRight:moderateScale(8),
        justifyContent:'center',
        alignItems:'center'
    },
    

});
