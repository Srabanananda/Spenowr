/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text} from 'react-native';
import * as userActions from '@Redux/actions/userActions';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import ModalHeader from '../../../../../../../@GlobalComponents/ModalHeader';
import DefaultButton from '../../../../../../../@GlobalComponents/DefaultButton';

const PointShowCase = ({pointsEarned=0,totalPoints=0,disableBackNavigation=false,refresh=null,...props}) =>{

    const navigation = useNavigation();
    const {updatePointShowCase,isActive} = props;

    const renderShowCase = () =>{
        return(
            <View style={styles.showCaseModal}>
                <ModalHeader headerText={'S-Points Earned'} onPress={()=>closeModal()} />
                <View style={styles.pointsContainer}>
                    <Text style={styles.yayText}>Yaaay !!</Text>
                    <Text style={styles.ePoints}> + {pointsEarned}</Text>
                    <Text style={styles.spenowrPoints}>Congratulations, you have earned Spenowr points</Text>
                    <Text>Total Points Available : {totalPoints}</Text>
                </View>
                <DefaultButton buttonText={'OK'} onPress={()=>closeModal()} showLoader={false} />
            </View>
        );
    };

    const closeModal = () =>{
        updatePointShowCase(false); 
        refresh != null && refresh()
        disableBackNavigation ? null : navigation.goBack();
    };

    return(
        <Modal
            backdropColor={'#000'}
            dismissable={true}
            hasBackdrop={true}
            isVisible={isActive}
            onBackButtonPress= {()=>closeModal()}
            onBackdropPress = {()=>closeModal}
            style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
            useNativeDriver={true}
        >
            {renderShowCase()}
        </Modal>
    );
};

const mapStateToProps =(state) =>{
    return {
        isActive : state.userObj.pointsShowCase
    };
};

const  mapDispatchToProp =(dispatch)=>({
    updatePointShowCase:data =>
        dispatch(userActions.updatePointShowCase(data))
});

PointShowCase.propTypes = {
    disableBackNavigation:PropTypes.bool,
    isActive:PropTypes.bool.isRequired,
    pointsEarned:PropTypes.string.isRequired,
    totalPoints:PropTypes.any.isRequired,
    updatePointShowCase:PropTypes.func.isRequired,
    
};

export default connect(mapStateToProps,mapDispatchToProp)(PointShowCase);