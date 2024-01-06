/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,TouchableOpacity,StyleSheet,Text} from 'react-native';
import FormHeader from '../../../../@GlobalComponents/FormHeader/index';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import ReviewBox from '../../../../@GlobalComponents/ReviewBox/index';
import Toast from 'react-native-simple-toast';
import { isEmailValid } from '../../../../@Utils/helperFiles/helpers';
import { addCourseReview } from '../../../../@Endpoints/Core/Tabs/MyAccount';
import { GlobalStyles } from '../../../../@GlobalStyles';
import StarRating from '../../../../@GlobalComponents/StarRating/index';
import { getServicePackageReviews } from '../../../../@Endpoints/Core/Tabs/MyAccount/index';

const {COLOR:{APP_PINK_COLOR,SUBNAME}} = Config;

type RatingAndReviewProps = {
    reviews:Array,
    course_id:String
}

const RatingsAndReviews = ({...props}:RatingAndReviewProps) =>{

    const {reviews,course_id} = props;
    const [showLoader, setShowLoader] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [reviewList, setReviewList] = useState(reviews);
    
    const loadReviews = () =>{
        getServicePackageReviews(course_id)
            .then(res=>{
                setReviewList(res.data.serviceComments);
            })
            .catch(() =>Toast.show('Something went wrong!'));
    };

    const onSubmitReview = ({name,rating,review,title,yes}) =>{
        if(!name.length){
            Toast.show('Please enter your name');
            return;
        }
        if(!title.length || !isEmailValid(title)){
            Toast.show('Please enter valid Email');
            return;
        }
        if(!review.length){
            Toast.show('Please enter your review');
            return;
        }  
        setShowLoader(true);
        addCourseReview(course_id,name,title,review,rating,yes)
            .then(() => {
                loadReviews();
                Toast.show('Review submitted successfully');
                setIsActive(false);
            })
            .catch(() => {Toast.show('Oops Something went wrong');})
            .finally(() => {setShowLoader(false);});
    };

    const renderReviewsUi = (item,index) =>{
        return(
            <View key={index} style={[GlobalStyles.primaryCard,styles.commentsBox]}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.comment}</Text>
                <StarRating size={8} starSelected={item.rating} />
            </View>
        );
    };

    const accordianChild = () =>{
        return(
            <>
                {
                    show &&
                    <View style={styles.container}>
                        <ReviewBox isActive={isActive} onSubmitReview={onSubmitReview} renderReviewsUi={renderReviewsUi} reviewsList={reviewList} setIsActive={setIsActive} showLoader={showLoader} />
                    </View>
                }
            </>
        );
    };

    const [show,setShow] = useState(false);
    const onPress = () => setShow(!show);

    return(
        <View>
            <FormHeader accordianChild={accordianChild} containerStyle={{backgroundColor:'transparent',marginTop:moderateScale(10)}} headerText={'Ratings And Reviews'} onPress={onPress} outlined>
                <TouchableOpacity onPress={onPress}>
                    <Icon color={APP_PINK_COLOR} name={!show ? 'chevron-down' : 'chevron-up'} size={24} />
                </TouchableOpacity>
            </FormHeader>
        </View>
    );
};

export default RatingsAndReviews;
const styles = StyleSheet.create({
    commentsBox:{
        marginBottom:moderateScale(10),
        padding:moderateScale(5),
        borderRadius:moderateScale(5),
    },
    name:{
        fontSize:moderateScale(14),
        fontWeight:'bold',
    },
    description:{
        color:SUBNAME,
        fontSize:moderateScale(12),
        marginTop:moderateScale(5),
    }
});