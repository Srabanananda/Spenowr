/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {TouchableOpacity,Text,View,Image} from 'react-native';
import styles from '../styles';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import ModalHeader from '../../../../../../../@GlobalComponents/ModalHeader';
import { getUserLiked } from '../../../../../../../@Endpoints/Auth';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import Config from '@Config/default';
import Capitalize from '../../../../../../../@Utils/helperFiles/Capitalize';
import { useNavigation } from '@react-navigation/native';

const {NEW_IMG_BASE,DEFAULT_PROFILE} = Config;

const Likes = ({...props}) =>{
    const navigation = useNavigation();
    const {mode,numberOfLikes,id,isUserBlocked} = props;
    const [isActive, setIsActive] = useState(false);
    const [likedList, setLikedList] = useState(false);

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = () =>{
        getUserLiked(id)
            .then(res=>{
                const {data:{userLikesData=[]}} =res;
                setLikedList(userLikesData);
            })
            .catch();
    };

    const checkNavigation = (memberId,slug) =>{
        setIsActive(false);
        memberId !==id && navigation.push('PublicProfile',{slug:slug});
    };

    const renderLikes = () =>{
        return(
            <SafeAreaView style={styles.modalContainer}>
                <ModalHeader 
                    headerStyle={{paddingHorizontal:10}} 
                    headerText={'Users Who liked you'} 
                    onPress={()=>setIsActive(false)}  
                />
                {!likedList.length ?<Text style={GlobalStyles.noDataFound}>No Likes yet</Text> : 
                    <View style={styles.likesContainer}>
                        {
                            likedList.map((eachMember,i)=>{
                                const {institute_name='',institute_id,heart_count,user_slug_url,image_path} = eachMember;
                                return(
                                    <View key={i} style={styles.memberRowContainer}>
                                        <TouchableOpacity onPress={()=>checkNavigation(institute_id,user_slug_url)} style={styles.imageContainer}>
                                            <View style={styles.circle}>
                                                <Image 
                                                    source={{ uri: image_path ? NEW_IMG_BASE+ image_path :  NEW_IMG_BASE +DEFAULT_PROFILE }} 
                                                    style={{width:null,height:null,flex:1}} 
                                                />
                                            </View>
                                            <Text style={styles.userName}>{Capitalize(institute_name)}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity  style={heart_count ? styles.filled  : styles.outlined}>
                                            <Text style={ heart_count ? styles.filledText :styles.outlinedText}> {heart_count ? 'Liked' : 'Like'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        }
                    </View>
                }
            </SafeAreaView>
        );
    };

    return(
        <>
            <TouchableOpacity disabled={isUserBlocked} onPress={()=>setIsActive(true)} style={styles.justifyAlign}>
                <Text style={styles.numberText}>{numberOfLikes}</Text>
                <Text style={styles.locationText}>Likes</Text>
            </TouchableOpacity>
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={isActive}
                onBackButtonPress= {()=>{
                    setIsActive(false); 
                }}
                onBackdropPress = {()=>{
                    setIsActive(false); 
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderLikes()}
            </Modal>
        </>
    );
};

export default Likes;
