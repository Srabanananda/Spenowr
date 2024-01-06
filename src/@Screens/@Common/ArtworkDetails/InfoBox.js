/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { connect} from 'react-redux';
import Capitalize from '../../../@Utils/helperFiles/Capitalize';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const InfoBox = ({artworkDetails}) =>{

    const navigation = useNavigation();
    const {
        photo_details:{
            photo_title,
            photo_description,
        },
        institute_details:{
            institute_name,
            slug_url
        },
    } = artworkDetails;


    return(
        <View style={{marginVertical:moderateScale(10)}}>
            <View>
                <Text style={styles.titleText}>{Capitalize(photo_title)}</Text>
                {
                    institute_name !== '' && <Text onPress={()=>navigation.navigate('PublicProfile',{slug:slug_url})} style={styles.contactPerson}>{institute_name}</Text>
                }
                <Text style={{...styles.subText,fontSize:moderateScale(12)}}>{photo_description}</Text>
            </View>
        </View>
    );
};

InfoBox.propTypes = {
    artworkDetails:PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{
        userObj : state.userObj
    };
}

export default connect(mapStateToProps)(InfoBox);