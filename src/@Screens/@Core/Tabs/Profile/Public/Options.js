import React, { useState } from 'react';
import { TouchableOpacity, View,Text } from 'react-native';
import Modal from 'react-native-modal';
import ReviewForm from '../../Spenowr/TrainingClasses/ReviewForm';
import styles from './styles';
import Contact from './Contact';
import ReportUser from './ReportUser';
import BlockUser from './BlockUser';

export const Options = ({
    account_type_id,
    userData,
    userObj,
    callApi,
    isUserBlocked
}: any ) => {

    const [isActive, setIsActive] = useState(false);

    const renderOptions = () => {
        return (
            <View style={styles.optionModal}>
                {
                   
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        {
                            account_type_id !== '4' && <ReviewForm id={userData.institute_id} refreshData={callApi} showinHeader type={'artists'} width={80} />
                        }
                        <Contact userObj={userObj} />
                        <ReportUser userObj={userObj} />
                        <BlockUser isUserBlocked={isUserBlocked} refreshData={callApi} userObj={userObj} />
                    </View>
                }
            </View>
        );

    };

    return(
        <>
            <TouchableOpacity onPress={()=>setIsActive(true)}>
                <Text style={styles.editButton}>Options</Text>
            </TouchableOpacity>
            <Modal
                animationIn={'slideInDown'}
                animationOut={'slideOutUp'}
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
                style={{margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderOptions()}
            </Modal>
        </>
    );

};

export default Options;