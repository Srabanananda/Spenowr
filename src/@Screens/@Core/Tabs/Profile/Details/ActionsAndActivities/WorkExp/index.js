/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import DefaultHeader from '@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import WorkExpListing from './WorkExpListing';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Help from './Help';
 
 type ExpProps = {
     navigation: Object,
     route: Object
 }
 
const MyWorkExperienceScreen = ({ ...props }: ExpProps) => {
 
    const { navigation, route: { params: { mode } } } = props;
 
    return (
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={mode === 'PRIVATE' ? 'My Work Experience' : 'Work Experience'} >
                {
                    (mode === 'PRIVATE') && <Help />
                }
            </DefaultHeader>
            <WorkExpListing mode={mode} />
            {
                (mode === 'PRIVATE') &&
                 (
                     <TouchableOpacity onPress={() => navigation.navigate('AddWorkExp')} style={GlobalStyles.AddButton}>
                         <Icon color={'#fff'} name={'plus'} size={20} />
                     </TouchableOpacity>
                 )
            }
        </SafeAreaView>
    );
};
 
export default MyWorkExperienceScreen;