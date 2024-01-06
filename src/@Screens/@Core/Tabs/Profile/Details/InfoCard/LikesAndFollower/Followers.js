/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {TouchableOpacity,Text,View,Image,ScrollView} from 'react-native';
import styles from '../styles';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import ModalHeader from '../../../../../../../@GlobalComponents/ModalHeader';
import { getUserFollowed } from '../../../../../../../@Endpoints/Auth';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import Config from '@Config/default';
import Capitalize from '../../../../../../../@Utils/helperFiles/Capitalize';
import { useNavigation } from '@react-navigation/native';
 
const {NEW_IMG_BASE,DEFAULT_PROFILE} = Config;
 
const Followers = ({...props}) =>{
    const navigation = useNavigation();
    const {followCount,id,isUserBlocked} = props;
    const [isActive, setIsActive] = useState(false);
    const [followedList, setFollowedList] = useState(false);
 
    useEffect(()=>{
        callApi();
    },[]);
 
    const callApi = () =>{
        getUserFollowed(id)
            .then(res=>{
                const {data:{userFollowData=[]}} =res;
                setFollowedList(userFollowData);
            })
            .catch();
    };
 
    const checkNavigation = (memberId,slug) =>{
        setIsActive(false);
        memberId !==id && navigation.push('PublicProfile',{slug:slug});
    };
 
    const renderFollowers = () =>{
        return(
            <SafeAreaView style={styles.modalContainer}>
                <ModalHeader 
                    headerStyle={{paddingHorizontal:10}} 
                    headerText={'Your Followers'} 
                    onPress={()=>setIsActive(false)}  
                />
                {!followedList.length ?<Text style={GlobalStyles.noDataFound}>No Followers yet</Text> : 
                    <ScrollView>
                        <View style={styles.likesContainer}>
                            {
                                followedList.map((eachMember,i)=>{
                                    const {institute_name='',institute_id,follow_count,user_slug_url,image_path} = eachMember;
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
                                            <TouchableOpacity  style={follow_count ? styles.filled  : styles.outlined}>
                                                <Text style={ follow_count ? styles.filledText :styles.outlinedText}> {follow_count ? 'Followed' : 'Follow'}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })
                            }
                        </View>
                    </ScrollView>
                }
            </SafeAreaView>
        );
    };
 
    return(
        <>
            <TouchableOpacity disabled={isUserBlocked} onPress={()=>setIsActive(true)} style={styles.justifyAlign}>
                <Text style={styles.numberText}>{followCount}</Text>
                <Text style={styles.locationText}>Followers</Text>
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
                {renderFollowers()}
            </Modal>
        </>
    );
};
 
export default Followers;
 