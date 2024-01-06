/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState} from 'react';
import {ScrollView,View,TouchableOpacity} from 'react-native';
import Config from '@Config/default';
import ScaledImage from '../../../@GlobalComponents/ScalableImage';
import PropTypes from 'prop-types';

const {NEW_IMG_BASE} = Config;

const ImageSlides = ({artworkDetails}) =>{
    const {
        photo_details:{
            reduced_media_path='',reduced_secondary_media1='',reduced_secondary_media2='',reduced_secondary_media3='',reduced_secondary_media4=''
        },
    } = artworkDetails;

    const [imageList, setImageList] = useState([]);

    const [selectedImageUri , setSelectedImageUri] = useState(NEW_IMG_BASE + reduced_media_path); 

    useEffect(()=>{
        const eachImage = [NEW_IMG_BASE + reduced_media_path];
        if(reduced_secondary_media1) eachImage.push(NEW_IMG_BASE + reduced_secondary_media1);
        if(reduced_secondary_media2) eachImage.push(NEW_IMG_BASE + reduced_secondary_media2);
        if(reduced_secondary_media3) eachImage.push(NEW_IMG_BASE + reduced_secondary_media3);
        if(reduced_secondary_media4) eachImage.push(NEW_IMG_BASE + reduced_secondary_media4);
        setImageList(eachImage);
    },[]);

    return(
        <>
            <View style={{flexDirection:'row'}}>
                <View style={{marginBottom:8,width:'100%',height:'100%'}}>
                    <ScaledImage  source={{uri:selectedImageUri}} />
                </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    imageList.map((img,i)=>(
                        <TouchableOpacity 
                            key={i} onPress={()=>setSelectedImageUri(img)} 
                            style={{margin:10,width:100}}>
                            <ScaledImage  source={{uri:img}} />
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </>
    );
};

ImageSlides.propTypes = {
    artworkDetails:PropTypes.object.isRequired,
};


export default ImageSlides;