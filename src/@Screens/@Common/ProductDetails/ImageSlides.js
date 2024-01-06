/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState} from 'react';
import {ScrollView,TouchableOpacity,View} from 'react-native';
import Config from '@Config/default';
import { useStore } from 'react-redux';
import ScaledImage from '../../../@GlobalComponents/ScalableImage';
import { DEVICE_WIDTH } from '../../../@Utils/helperFiles/DeviceInfoExtractor';

const {NEW_IMG_BASE} = Config;

const ImageSlides = () =>{
    const store = useStore();
    const {productDetails:{productDetailsData:{singleproduct}}} = store.getState();

    const {
        reduced_primary_image,
        reduced_secondary_image1,
        reduced_secondary_image2,
        reduced_secondary_image3,
        reduced_secondary_image4
    } = singleproduct;

    const [selectedImageUri , setSelectedImageUri] = useState(NEW_IMG_BASE + reduced_primary_image); 
    const [imageList, setImageList] = useState([]);

    const images = [NEW_IMG_BASE + reduced_primary_image];

    useEffect(()=>{
        if(reduced_secondary_image1) images.push(NEW_IMG_BASE + reduced_secondary_image1);
        if(reduced_secondary_image2) images.push(NEW_IMG_BASE + reduced_secondary_image2);
        if(reduced_secondary_image3) images.push(NEW_IMG_BASE + reduced_secondary_image3);
        if(reduced_secondary_image4) images.push(NEW_IMG_BASE + reduced_secondary_image4);
        setImageList(images);
    },[]);

    return(
        <>
            <ScaledImage source={{uri:selectedImageUri}} />
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

export default ImageSlides;