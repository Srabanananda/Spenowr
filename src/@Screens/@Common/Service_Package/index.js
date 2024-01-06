/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect,useState} from 'react';
import {SafeAreaView,Text,View,TouchableOpacity} from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader/index';
import { getServicePackageData } from '../../../@Endpoints/Core/Tabs/MyAccount';
import Toast from 'react-native-simple-toast';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader/index';
import { moderateScale } from 'react-native-size-matters';
import PackageCard from './packageCard';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useIsFocused } from '@react-navigation/native';


type PackageScreenProps = {
    route:{
        params:{course_id:number}
    },
    navigation:Object
}

const PackageScreen = ({...props}: PackageScreenProps) =>{
    const {route:{params:{course_id,mode}},navigation} = props;

    const [loading, setLoading] = useState(true);
    const [packages, setPackages] = useState();
    const isFocused = useIsFocused();

    useEffect(()=>{
        if(isFocused)callApi();
    },[isFocused]);

    const callApi = () =>{
        getServicePackageData(course_id)
            .then((res)=>{
                const {data:{packagedata=[]}}  = res;
                setPackages(packagedata);
            })
            .catch(()=>{
                Toast.show('Oops Something went wrong');
                setTimeout(()=>{navigation.goBack();},400);
            })
            .finally(()=>{
                setLoading(false);
            });
    };

    const renderPackages = () =>
        packages.map((item,index)=><PackageCard item={item} key={index} mode={mode} refreshData={callApi} />);

    if(loading)
        return <ScreenLoader text={'Fetching Package info..'} />;

    if(!loading)
        return(
            <SafeAreaView style={GlobalStyles.GlobalContainer}>
                <DefaultHeader headerText={'Manage Package'} />
                <View style={{padding:moderateScale(10)}}>
                    {packages.length ? renderPackages() : <Text style={{alignSelf:'center',marginTop:moderateScale(20),fontSize:moderateScale(12)}}>No Packages added</Text>}
                </View>
                {
                    (mode === 'PRIVATE' && packages.length <3) &&
                (
                    <TouchableOpacity onPress={() => navigation.navigate('AddPackage',{course_id})} style={GlobalStyles.AddButton}>
                        <Icon color={'#fff'} name={'plus'} size={20} />
                    </TouchableOpacity>
                )
                }
            </SafeAreaView>
        );
};

export default PackageScreen;
