/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ActivityIndicator} from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import Capitalize from '../../../@Utils/helperFiles/Capitalize';
import { getCurrency } from '../../../@Utils/helperFiles/CardDetails';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import { deleteServicePackage } from '../../../@Endpoints/Core/Tabs/MyAccount/index';
import  Toast from 'react-native-simple-toast';
import { editServicePackage } from '../../../@Endpoints/Core/Tabs/MyAccount/index';
import { useNavigation } from '@react-navigation/native';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import { addItemToCart } from '../../../@Endpoints/Core/Tabs/Shop/index';

const {COLOR:{APP_PINK_COLOR,SUBNAME}} = Config;

type CardProps = {
    mode?: string,
    item: Object,
    refreshData: Function
}

const PackageCard = ({...props}:CardProps) =>{

    const navigation = useNavigation();

    const {mode='PUBLIC',item, refreshData} = props;
    const [editLoader, setEditLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const editPackage = () =>{
        setEditLoader(true);
        editServicePackage(item.package_id)
            .then(res=>{
                const {data:{packagedata}} = res;
                navigation.navigate('AddPackage',{packagedata});
            })
            .catch(()=>{
                Toast.show('Oops Couldnot Edit now');
            })
            .finally(()=>{
                setEditLoader(false);
            });
    };
    const deletePackage = () =>{
        setDeleteLoader(true);
        deleteServicePackage(item.package_id)
            .then(() =>{
                Toast.show('Deleted Successfully');
                refreshData();
            })
            .catch(() =>{
                Toast.show('Oops Something went wrong');
            })
            .finally(() =>{
                setDeleteLoader(false);
            });
    };
    const addToCart = () => {
        setIsLoading(true);
        addItemToCart(item.package_id,'service',item.course_id)
            .then(({data}) =>{
                if(data.status)
                    Toast.show('Added to cart');
                else
                    Toast.show(data.response_msg);
            })
            .catch(() =>{
                Toast.show('Oops Something went wrong');
            })
            .finally(() =>{setIsLoading(false);});
    };

    return (
        <View style={[GlobalStyles.primaryCard,styles.cardStyle]}>
            <Text style={styles.packageName}>{Capitalize(item.package_name)}</Text>
            <Text style={styles.packagePrice}>Price : {getCurrency(item.package_currency)}{item.package_price}</Text>
            <Text>Duration : {item.delivery_time} Days</Text>
            <Text style={styles.packageDesciption}>{item.package_description}</Text>
            {
                mode === 'PUBLIC' && <DefaultButton buttonText={'OrderNow'} onPress={()=>addToCart()} showLoader={isLoading} />
            }
            {
                (mode === 'PRIVATE') &&
                (
                    <View style={styles.bottomButtons}>
                        <TouchableOpacity disabled={editLoader} onPress={()=>editPackage(true)} style={GlobalStyles.seeMoreButton} >
                            {editLoader ? <ActivityIndicator color={APP_PINK_COLOR} /> : <Text  style={GlobalStyles.seeMoreButtonText}>Edit</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity disabled={deleteLoader} onPress={()=>deletePackage(true)} >
                            {deleteLoader ? <ActivityIndicator color={APP_PINK_COLOR} /> : <Text  style={styles.buttonText}>Delete</Text>}
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    );
};

export default PackageCard;
const styles = StyleSheet.create({
    cardStyle:{
        padding:moderateScale(10),
        marginBottom:moderateScale(10),
    },
    packageName:{
        fontWeight:'bold',
        fontSize:moderateScale(20)
    },
    packagePrice:{
        marginTop:moderateScale(10),
        fontWeight:'bold'
    },  
    packageDesciption:{
        marginTop:moderateScale(15),
        fontWeight:'400',
        color:SUBNAME
    },
    bottomButtons:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:moderateScale(10)
    }
});