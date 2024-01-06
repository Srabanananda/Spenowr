/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,TouchableOpacity,Image,Linking,Text} from 'react-native';
import { useStore } from 'react-redux';
import FormHeader from '../../../@GlobalComponents/FormHeader';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import Config from '@Config/default';
import { useNavigation } from '@react-navigation/native';
import { getSkill } from '../../../@Utils/helperFiles/GetSkill';
import { GlobalStyles } from '../../../@GlobalStyles';
import StarRating from '../../../@GlobalComponents/StarRating/index';
import { GetCatValue } from '../../../@Utils/helperFiles/GetCatSubcat';
import Capitalize from '../../../@Utils/helperFiles/Capitalize';
const {
    NEW_IMG_BASE,DEFAULT_PROFILE
} = Config;


const ArtistInfo = () =>{
    const navigation = useNavigation();
    const store = useStore();
    const {
        productDetails:{articleDetailsData:{institute = {},article,user_name=''}}
    } = store.getState();

    const {
        link_artist = 0,
        article_title,
        category,
        avg_rating,
        heart_count,
    } = article;

    const checkAction = (url) =>{
        if(url && url !== '')
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Toast.show('Don\'t know how to open URI: ' + url,Toast.SHORT);
                }
            });
        else Toast.show('No link found', Toast.SHORT);
    };

    const renderEachAction = (item,index) =>{
        if(item.desc === '' || item.desc === null) return null;
        return(
            <TouchableOpacity key={index} onPress={()=>checkAction(item.desc)} style={styles.actionBox}>
                <Image resizeMode={'contain'} source={item.img} style={styles.images} />
            </TouchableOpacity>
        );
    };

    const navigateToProfile = (slug_url) =>{
        const slgs = slug_url.split('/');
        navigation.push('PublicProfile',{slug:slgs[0]});
    };

    if(link_artist)
    {
        const {
            instagram_url='',
            facebook_url='',
            website='',
            twitter_url='',
            profile_image_thumbnail_path='',
            slug_url='',
            skill1='',
            skill2='',
            skill3='',
        } = institute;

        const s1 = getSkill(skill1);
        const s2 = getSkill(skill2);
        const s3 = getSkill(skill3);

        const getActions = ()  =>[
            {name : 'Website',desc :  website ,img : require('@Assets/svgs/website.svg')},
            {name : 'Instagram',desc :  instagram_url,img : require('@Assets/svgs/insta.svg')},
            {name : 'Facebook',desc :  facebook_url, img : require('@Assets/svgs/fb.svg')},
            {name : 'Twitter',desc :  twitter_url,img : require('@Assets/svgs/twitter.svg')},
        ];

        const renderSkill = skill =>{
            if(skill) return(
                <View style={GlobalStyles.skillBox}>
                    <Text style={GlobalStyles.skillText}>{skill.type.label}</Text>
                </View>
            );
            return null;
        };

        const cat = GetCatValue(category);
        const isBiography = category === 'biography';
        return(
            <>
                {isBiography && <FormHeader headerText={'About Artist'} />}
                <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                    <View style={{height:'100%'}}>
                        {
                            isBiography ? 
                                <TouchableOpacity disabled={slug_url === ''} onPress={()=>navigateToProfile(slug_url)} style={styles.profilePic}>
                                    <Image 
                                        source={{ uri:profile_image_thumbnail_path ? NEW_IMG_BASE + profile_image_thumbnail_path : NEW_IMG_BASE +DEFAULT_PROFILE }} 
                                        style={{width:null,height:null,flex:1}} 
                                    />
                                </TouchableOpacity>
                                : null
                        }
                        {
                            (avg_rating !== '0.0') && 
                             <View style={styles.justifyAlign}>
                                 <Text style={styles.ratingText}>{avg_rating}/5</Text>
                                 <StarRating starSelected={avg_rating} />
                             </View>
                        }
                    </View>
                    <View style={{marginLeft:10,width:'72%'}}>
                        {article_title ? <Text numberOfLines={2}  style={styles.title}>{article_title}</Text> : null}
                        {user_name ? <Text numberOfLines={1} onPress={()=>navigateToProfile(slug_url)} style={styles.name}>{user_name}</Text> : null}
                        <View>
                            {category ? <Text style={styles.category}>Category : {Capitalize(category)}</Text> : null}
                            { heart_count ? <Text style={styles.likes}>{heart_count} Likes</Text> : null}
                        </View>
                        <View style={{flexDirection:'row',marginBottom:8,marginTop:4}}>
                            {s1 ? renderSkill(s1) : null}
                            {s2 ? renderSkill(s2) : null}
                            {s3 ? renderSkill(s3) : null}
                        </View>
                        <View style={styles.socialIconWrapper}>
                            {
                                getActions().map((item,index)=>(
                                    renderEachAction(item,index)
                                ))
                            }
                        </View>
                    </View>
                </View>
            </>
        );
    }

    return null;
};

export default ArtistInfo;