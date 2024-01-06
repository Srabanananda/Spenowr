/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {Text,SafeAreaView,StyleSheet,View,ScrollView,TouchableOpacity,RefreshControl} from 'react-native';
import { GlobalStyles } from '../../../../@GlobalStyles/index';
import DefaultHeader from '../../../../@GlobalComponents/DefaultHeader/index';
import { getServiceDetails } from '../../../../@Endpoints/Core/Tabs/MyAccount/index';
import Toast from 'react-native-simple-toast';
import ScreenLoader from '../../../../@GlobalComponents/ScreenLoader/index';
import ArtistBox from '../../../../@GlobalComponents/ArtistBox';
import { moderateScale } from 'react-native-size-matters';
import FormHeader from '../../../../@GlobalComponents/FormHeader/index';
import PackageCard from '../packageCard';
import Config from '@Config/default';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RatingsAndReviews from './RatingAndReviews';

const {COLOR:{SUBNAME,APP_PINK_COLOR}} = Config;

type DetailScreenProps = {
    route:{
        params:Object
    },
    navigation:Object
}

const ServiceDetailsScreen = ({...props}:DetailScreenProps) =>{

    const {navigation,route:{params:{course_id}}} = props;

    const [isLoading, setIsLoading] = useState(true);
    const [details, setDetails] = useState();
    const [show,setShow] = useState(true);
    const [refreshing,setRefreshing] = useState(false);

    useEffect(()=>{
        callApi();
    },[]);

    const onRefresh = () =>{
        setRefreshing(true);
        callApi();
        setTimeout(()=>{setRefreshing(false);},500);
    };

    const callApi = () =>{  
        getServiceDetails(course_id)
            .then(res => {
                setDetails(res.data);
            })
            .catch(() => {
                Toast.show('Oops Something went wrong');
                navigation.goBack();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const accordianChild = packages =>{
        return(
            <>
                {
                    show &&
                    <View style={styles.container}>
                        {packages.map((item, i)=>(
                            <PackageCard item={item} key={i} mode={'PUBLIC'} />
                        ))}
                        {!packages.length ? <Text style={GlobalStyles.noDataFound}>No Packages Added</Text> : null}
                    </View>
                }
            </>
        );
    };

    const onPress = () => setShow(!show);

    const renderDetails = () => {
        const userInfo = details.institute;
        const courseDetails = details.course;
        const packages = details.package;
        const reviews=details.reviewlist;
        userInfo.profile_image = userInfo.profile_image_thumbnail_path;
        userInfo.artist_name = userInfo.institute_name;
        userInfo.institute_slug_url = userInfo.slug_url;
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh} refreshing={refreshing}
                        title="Refreshing .."
                        titleColor={'#000'} />
                }>
                <View style={styles.container}>
                    <FormHeader headerText={'About Artist'} />
                    <ArtistBox artistData={details.institute} />
                    <FormHeader headerText={'About Service'} />
                    <Text style={styles.description}>{courseDetails.course_description}</Text>
                    {
                        packages.length ?
                            <FormHeader accordianChild={()=>accordianChild(packages)} containerStyle={{backgroundColor:'transparent'}} headerText={'Packages'} onPress={onPress} outlined >
                                <TouchableOpacity onPress={onPress}>
                                    <Icon color={APP_PINK_COLOR} name={!show ? 'chevron-down' : 'chevron-up'} size={24} />
                                </TouchableOpacity>
                            </FormHeader>
                            :
                            null
                    }
                    <RatingsAndReviews course_id={courseDetails.course_id} reviews={reviews} />
                </View>
            </ScrollView>);
    };

    if(isLoading)
        return <ScreenLoader text={'Fetching Service Details..'} />;

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={'Service Details'} />
            {details ? renderDetails() : <Text>Oops Couldnot load details</Text>}
        </SafeAreaView>
    );
};

export default ServiceDetailsScreen;
const styles = StyleSheet.create({
    container:{
        padding:moderateScale(10),
    },
    description:{
        marginTop:moderateScale(5),
        marginBottom:moderateScale(15),
        color:SUBNAME
    }
});