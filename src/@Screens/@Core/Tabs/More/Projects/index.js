/**
 * Create By @name Sukumar_Abhijeet
 */

import React,{useState} from 'react';

import ProjectList from './ProjectList';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const Projects = () =>{
    
    const [loading , setLoading] = useState(true);

    return(
        <SafeAreaView edges={['left', 'right']} style={{flex:1}}>
            <DefaultHeader headerText={'Projects'} />
            <ProjectList />
        </SafeAreaView>
    );
};

export default Projects;