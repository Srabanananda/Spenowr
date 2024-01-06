/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import { closeJob, deleteJob, getEditJobDetails } from '../../../../@Endpoints/Core/Tabs/More';
import AssignmentProposals from './Proposals';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';

type CardProps = {
    jobDetails : Object,
    refresh: Function
}

const CardActions = ({...props}:CardProps) =>{

    const {jobDetails, refresh} = props;

    const {status,assignment_id,response,enable_record='0'} = jobDetails;

    const navigation = useNavigation();

    const [deletedLoader, setDeleteLoader ] = useState(false);
    const [closeLoader, setCloseLoader ] = useState(false);
    const [editLoader, setEditLoader] = useState(false);
    const [disableLoader, setDisableLoader] = useState(false);

    const callDelete = () => {
        setDeleteLoader(true);
        deleteJob(assignment_id,'delete')
            .then(()=>refresh())
            .catch(()=>Toast.show('Oops Something went wrong'))
            .finally(()=>setDeleteLoader(false));
    };

    const editJob = () =>{
        setEditLoader(true);
        getEditJobDetails(assignment_id)
            .then((res)=>{
                const {data:{photo_assignment}} = res;
                navigation.navigate('AddJob',{EditData:photo_assignment});
            })
            .catch(()=>Toast.show('Oops Couldnot fetch details'))
            .finally(()=>setEditLoader(false));

    };

    const callClose =()=>{
        setCloseLoader(true);
        closeJob(assignment_id)
            .then(()=>refresh())
            .catch()
            .finally(()=>setCloseLoader(false));
    };

    const callDisable = () =>{
        setDisableLoader(true);
        deleteJob(assignment_id,'disable')
            .then(()=>refresh())
            .catch(()=>Toast.show('Oops Something went wrong'))
            .finally(()=>setDisableLoader(false));
    };

    return(
        <>
            <View style={styles.bottomButtons}>
                <DefaultButton buttonText={'Edit'}  onPress={editJob} showLoader={editLoader} type={'outline'} />
                <DefaultButton buttonStyle={{marginRight:moderateScale(10)}}  buttonText={enable_record === '0' ? 'Disabled' : 'Disable'} isDeactivated={enable_record === '0'} onPress={callDisable} showLoader={disableLoader} type={ 'outline'} />
                <DefaultButton  buttonText={status === '0' ? 'Deleted' : 'Delete'} isDeactivated={status === '0'} onPress={callDelete} showLoader={deletedLoader} type={ 'outline'} />
       
                {
                    status !== '0' && enable_record !== '0' && <DefaultButton buttonText={ status === '2'  ? 'Closed' : 'Close'} isDeactivated={status === '2'} onPress={callClose}  showLoader={closeLoader} type={'outline'} /> 
                }
            </View>
            {status !== '0' && status !== '2'&& <AssignmentProposals  id={assignment_id} response={response} /> }  
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