/**
 *  Created By @name Sukumar_Abhijeet
 */

import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import { deleteProject, getEditProjectDetails } from '../../../@Endpoints/Core/Tabs/More';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
type CardProps = {
    projectDetails: Object,
    refresh: Function
}

const CardActions = ({...props}: CardProps) =>{

    const {projectDetails, refresh} = props;
    const { project_id, status } = projectDetails;

    const navigation = useNavigation();

    const [deletedLoader, setDeleteLoader ] = useState(false);
    const [editLoader, setEditLoader] = useState(false);

    const editProject = () =>{
        setEditLoader(true);
        getEditProjectDetails(project_id)
            .then((res)=>{
                const {data:{ProjectData}} = res;
                navigation.navigate('CreateProject',{EditData:ProjectData});
            })
            .catch(()=>Toast.show('Oops Couldnot fetch details'))
            .finally(()=>setEditLoader(false));
    };

    const callDelete = () =>{
        setDeleteLoader(true);
        deleteProject(project_id,'delete')
            .then(()=>refresh())
            .catch(()=>Toast.show('Oops Something went wrong'))
            .finally(()=>{
                setDeleteLoader(false)
                Toast.show('Project deleted successfully.')
            });
    };

    return(
        <>
            <View style={styles.bottomButtons}>
                <DefaultButton buttonText={'Edit'}  onPress={editProject} showLoader={editLoader} type={'outline'} />
                <DefaultButton  buttonText={status === '0' ? 'Deleted' : 'Delete'} isDeactivated={status === '0'} onPress={callDelete} showLoader={deletedLoader} type={ 'outline'} />
            </View>
        </>
    );
};

export default CardActions;
const styles = StyleSheet.create({
    bottomButtons:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:moderateScale(10),
        marginBottom:moderateScale(4)
    }
});