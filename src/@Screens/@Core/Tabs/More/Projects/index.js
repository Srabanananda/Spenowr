/**
 * Create By @name Sukumar_Abhijeet
 */

import React,{useState} from 'react';
import {  SafeAreaView } from 'react-native';
import ProjectList from './ProjectList';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';

const Projects = () =>{
    
    const [loading , setLoading] = useState(true);

    return(
        <SafeAreaView style={{flex:1}}>
            <DefaultHeader headerText={'Projects'} />
            <ProjectList />
        </SafeAreaView>
    );
};

export default Projects;