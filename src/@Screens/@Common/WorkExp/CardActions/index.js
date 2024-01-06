/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';
import { deleteWork, editWork } from '../../../../@Endpoints/Core/Tabs/More';
import { useNavigation } from '@react-navigation/native';
import { handleCertificateDownload } from '../../../../@Utils/helperFiles/helpers';
 
 type CardProps = {
     workDetails : Object,
     refresh: Function,
     certificateUrl : string
 }
 
const CardActions = ({refresh,workDetails,certificateUrl}:CardProps) =>{

    const {
        exp_id
    } = workDetails;

    const [editLoader, setEditLoader] = useState(false);
    const [deletedLoader, setDeleteLoader ] = useState(false);

    const navigation = useNavigation();

    const editWorkExp = () => {
        setEditLoader(true);
        editWork(exp_id)
            .then((res)=>{
                const {data:{artistWorkExperinceData}} = res;
                if(artistWorkExperinceData)
                    navigation.navigate('AddWorkExp',{EditData : artistWorkExperinceData});
            })
            .catch(()=>Toast.show('Oops Something Went wrong..'))
            .finally(()=>setEditLoader(false));
    };


    const deleteWorkExp = () => {
        setDeleteLoader(true);
        deleteWork(exp_id)
            .then(()=>refresh())
            .catch(()=>Toast.show('Oops Something went wrong'))
            .finally(()=>setDeleteLoader(false));
    };

    return(
        <View style={styles.bottomButtons}>
            <DefaultButton buttonText={'Edit'}  onPress={editWorkExp} showLoader={editLoader} type={'outline'} />
            <DefaultButton buttonText={'Download Certificate'}  onPress={()=>handleCertificateDownload(certificateUrl)} showLoader={deletedLoader} type={'outline'} />
            <DefaultButton buttonText={'Delete'}  onPress={deleteWorkExp} showLoader={deletedLoader} type={'outline'} />
        </View>
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