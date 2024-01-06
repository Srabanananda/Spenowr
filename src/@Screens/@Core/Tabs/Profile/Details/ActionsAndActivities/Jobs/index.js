/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import DefaultHeader from '@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import JobsListScreen from './JobsListScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';

type JobsProps = {
    navigation: Object,
    route: Object
}

const MyJobsScreen = ({ ...props }: JobsProps) => {

    const { navigation, route: { params: { mode } } } = props;

    return (
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={mode === 'PRIVATE' ? 'My Jobs' : 'Jobs'} />
            <JobsListScreen mode={mode} />
            {
                (mode === 'PRIVATE') &&
                (
                    <TouchableOpacity onPress={() => navigation.navigate('AddJob')} style={GlobalStyles.AddButton}>
                        <Icon color={'#fff'} name={'plus'} size={20} />
                    </TouchableOpacity>
                )
            }
        </SafeAreaView>
    );
};

export default MyJobsScreen;