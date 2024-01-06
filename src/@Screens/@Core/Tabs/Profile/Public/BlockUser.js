import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import SimpleToast from 'react-native-simple-toast';
import { requestBlockPublicUser } from '../../../../../@Endpoints/Auth';
import DefaultButton from '../../../../../@GlobalComponents/DefaultButton';
import ModalHeader from '../../../../../@GlobalComponents/ModalHeader';
import Capitalize from '../../../../../@Utils/helperFiles/Capitalize';
import styles from './styles';
const BlockUser = ({userObj,isUserBlocked,refreshData}:any) => {

    const [isActive, setIsActive] = useState(false);
    const [loader, setLoader] = useState(false);

    const {
        publicUserData:{
            institute:
                {
                    institute_id : public_institute_id,
                    institute_name = '',
                }
        },
    } =  userObj;

    const _handleOnPress = () => {
        setLoader(true);
        requestBlockPublicUser(public_institute_id,isUserBlocked)
            .then(()=>{
                SimpleToast.show('User Is blocked');
                refreshData();
            })
            .catch()
            .finally(()=>setLoader(false));
    };


    const renderBlockConfirmation = () =>{
        return(
            <View style={styles.adminModal}>
                <ModalHeader headerText={`${isUserBlocked ? 'Unblock' : 'Block'} ${Capitalize(institute_name??'')}`} onPress={()=>setIsActive(false)} />
                {
                    !isUserBlocked && 
                <>
                    <Text style={styles.blockHeadText}> Are You sure you want to block this user ?</Text>
                    <Text style={styles.blockSubText}> The Blocked user will not be able to see your content.</Text>
                </>
                }
               
                <DefaultButton buttonText={isUserBlocked ? 'Unblock Now' : 'Block Now'} onPress={_handleOnPress} showLoader={loader} />
            </View>
        );
    };

    return(
        <>
            <TouchableOpacity onPress={()=>setIsActive(true)} style={styles.adminBox}>
                <Text style={styles.editButton}>{isUserBlocked ? 'Unblock' : 'Block'}</Text>
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
                {renderBlockConfirmation()}
            </Modal>
        </>
    );

};

export default BlockUser;
