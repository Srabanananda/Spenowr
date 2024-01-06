/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Image from 'react-native-image-progress';
import Config from '@Config/default';
import PropTypes from 'prop-types';

import Capitalize from '../../@Utils/helperFiles/Capitalize';
import { moderateScale } from 'react-native-size-matters';
import { getSkill } from '../../@Utils/helperFiles/GetSkill';
import { setFollowUnfollowUser } from '../../@Endpoints/Auth/index';

const {NEW_IMG_BASE,DEFAULT_PROFILE,COLOR:{APP_PINK_COLOR,APP_THEME_COLOR,WHITE}} = Config;

const ArtistBox = ({artistData, externalCall, showFollow}) =>{
    const navigation = useNavigation();
    const {
        institute_slug_url = '',
        skill1 = '{}',
        skill2 = '{}',
        skill3 = '{}',
        artist_name='',
        profile_image='',
        addedBy= 2,
        login_follow_count = 0,
        institute_id,
    } = artistData;

    const [follow, setFollow] = useState(login_follow_count===1);

    const checkFollowing  = () =>{
        setFollowUnfollowUser(follow ? 1 : 0 ,institute_id)
            .then()
            .catch();
        setFollow(!follow);
    };

    const instSlug = institute_slug_url ? institute_slug_url : '';
    const slgs = instSlug.split('/');
    const s1 = getSkill(skill1);
    const s2 = getSkill(skill2);
    const s3 = getSkill(skill3);
    return(
        <TouchableOpacity
            disabled={artist_name === 'Spenowr'} onPress={()=>{
                externalCall?.();
                navigation.push('PublicProfile',{slug:slgs[0]});
            }} style={styles.imageWrapper}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={styles.circle}>
                    <Image 
                        source={{ uri: profile_image ? NEW_IMG_BASE+ profile_image :  NEW_IMG_BASE +DEFAULT_PROFILE }} 
                        style={{width:null,height:null,flex:1}} 
                    />
                </View>
                <View>
                    {(artist_name!==null) && <Text style={styles.name}>{Capitalize(artist_name)}</Text>}
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.nameTag}>{addedBy === 1 ? 'Creators':s1?s1.type.label:'Others'}</Text>
                        {s2&&<Text style={{fontSize:moderateScale(10)}}>{', '+s2.type.label}</Text>}
                        {s3&&<Text style={{fontSize:moderateScale(10)}}>{', '+s3.type.label}</Text>}
                    </View>
                </View>
                
            </View>
            {
                (showFollow && artist_name !== 'Spenowr') ? 
                    <View>
                        <TouchableOpacity onPress={checkFollowing}  style={follow ? styles.filled  : styles.outlined}>
                            <Text style={ follow ? styles.filledText :styles.outlinedText}> {follow ? 'Following' : 'Follow'}</Text>
                        </TouchableOpacity>
                    </View>
                    : null
            }
        </TouchableOpacity>
    );
};

ArtistBox.propTypes = {
    artistData:PropTypes.object.isRequired,
    externalCall: PropTypes.func,
    showFollow: PropTypes.bool,
};

export default ArtistBox;

const styles = StyleSheet.create({
    circle:{
        width:moderateScale(40),
        height:moderateScale(40),
        borderRadius:moderateScale(25),
        backgroundColor:APP_THEME_COLOR,
        overflow:'hidden'
    },
    imageWrapper:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:moderateScale(10),
    },
    name:{
        color:APP_PINK_COLOR,
        fontSize:moderateScale(12),
        marginLeft:moderateScale(10),
        maxWidth:moderateScale(190),
    },
    nameTag:{
        fontSize:moderateScale(10),
        marginLeft:moderateScale(10)
    },
    outlined:{
        borderColor:APP_PINK_COLOR,
        borderWidth:1,
        borderRadius:moderateScale(15),
        width:moderateScale(80),
        padding:moderateScale(4),
        marginRight:moderateScale(5)
    },
    filled:{
        backgroundColor:APP_PINK_COLOR,
        borderRadius:moderateScale(15),
        width:moderateScale(80),
        padding:moderateScale(4),
        marginRight:moderateScale(5)
    },
    outlinedText:{
        color:APP_PINK_COLOR,
        fontSize:moderateScale(12),
        alignSelf:'center'
    },
    filledText:{
        color:WHITE,
        fontSize:moderateScale(12),
        alignSelf:'center'
    },
});
