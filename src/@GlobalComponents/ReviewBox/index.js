/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import { moderateScale,scale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import ModalHeader from '../ModalHeader/index';
import { AirbnbRating } from 'react-native-ratings';
import CheckBox from '@react-native-community/checkbox';
import DefaultButton from '../DefaultButton';
import Config from '@Config/default';

const {COLOR:{SUBNAME,LIGHTGREY,APP_PINK_COLOR,APP_THEME_COLOR,WHITE,DARK_BLACK,ORANGE}} = Config;

const ReviewBoxProps = {
    reviewsList:Array,
    renderReviewsUi:Function,
    onSubmitReview:Function,
    showLoader:Boolean,
    isActive:Boolean,
    setIsActive:Function
};

const ReviewBox = ({...props} : ReviewBoxProps) =>{
    const {reviewsList,renderReviewsUi,onSubmitReview,showLoader,isActive,setIsActive} = props;

    const [review, setReview] = useState('');
    const [title, setTitle] = useState('');
    const [yes, setYes] = useState(true);
    const [no, setNo] = useState(false);
    const [rating, setRating] = useState(4);
    const [name, setName] = useState('');

    const onSubmit = () =>{
        onSubmitReview?.({
            name,
            title,
            review,
            rating,
            yes,
            no
        });
    };

    const renderReviewBox = ()=>{
        return(
            <View style={styles.reviewModal}>
                <ModalHeader headerText={'Write a review'} onPress={()=>setIsActive(false)} />

                <TextInput
                    onChangeText={(value)=>setName(value)}
                    placeholder={'Name'}
                    placeholderTextColor={LIGHTGREY}
                    style={styles.textInputSmall}
                    value={name}
                />
                
                <TextInput
                    onChangeText={(value)=>setTitle(value)}
                    placeholder={'Email'}
                    placeholderTextColor={LIGHTGREY}
                    style={styles.textInputSmall}
                    value={title}
                />

                <TextInput
                    multiline={true}
                    onChangeText={(value)=>setReview(value)}
                    placeholder={'Add your review.'}
                    style={styles.textInput}
                    value={review}
                />

                <Text style={styles.names}>Rate</Text>
                <AirbnbRating 
                    defaultRating={4}
                    minValue={1}
                    onFinishRating={(value)=>setRating(value)}
                    ratingCount={5}
                    startingValue={4}
                    type='custom'
                />

                <Text style={[styles.names,{marginVertical:moderateScale(10)}]}>Recommended</Text>
                <View style={styles.dataBox}>
                    <CheckBox
                        disabled={false}
                        onValueChange={(newValue) => {
                            if(newValue)setNo(false);
                            setYes(newValue);
                        }}
                        style={{marginRight:moderateScale(10)}}
                        value={yes}
                    />
                    <Text style={styles.subText}>Yes</Text>
                    <CheckBox
                        disabled={false}
                        onValueChange={(newValue) => {
                            if(newValue) setYes(false);
                            setNo(newValue);
                        }}
                        style={{marginRight:moderateScale(10),marginLeft:moderateScale(10)}}
                        value={no}
                    />
                    <Text style={styles.subText}>No</Text>
                </View>
                <DefaultButton buttonText={'SUBMIT'} onPress={()=>onSubmit()} showLoader={showLoader} />
            </View>
        );
    };

    return(
        <View>
            <View style={{padding:moderateScale(15)}}>
                {!reviewsList.length ? <Text style={styles.subText}>No reviews yet !</Text> : reviewsList.map((item,index)=>renderReviewsUi(item,index))}
                <TouchableOpacity onPress={()=>setIsActive(true)} style={{alignSelf:'flex-end'}}>
                    <Text style={{textDecorationLine:'underline',color:APP_PINK_COLOR,}}>Write a review ? </Text>
                </TouchableOpacity>
                
            </View>
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={isActive}
                onBackButtonPress= {()=>{
                    setIsActive(false); 
                }}
                onBackdropPress = {()=>{
                    setIsActive(false); 
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderReviewBox()}
            </Modal>
        </View>
    );
};

export default ReviewBox;
const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
    },
    container:{
        margin:moderateScale(10),
        padding:moderateScale(10),
        backgroundColor:'#fff',
        shadowColor: '#000', 
        shadowOpacity: .2,
        shadowRadius: moderateScale(4), 
        elevation: moderateScale(2),
        shadowOffset: {
            height: scale(2),
            width: scale(2)
        },
    },
    lowerContainer:{
        marginVertical:moderateScale(10),
        paddingLeft:moderateScale(10),
    },
    titleText:{
        fontSize:moderateScale(20),
        fontWeight:'bold',
        color:DARK_BLACK
    },
    subText:{
        color:DARK_BLACK,
    },
    subText2:{
        color:APP_PINK_COLOR,
        fontWeight:'600'
    },
    dataBox:{
        flexDirection:'row',
        alignItems:'center',
    },
    discountBox:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:ORANGE,
        paddingHorizontal:moderateScale(10),
        borderRadius:moderateScale(4)
    },
    names:{
        color:DARK_BLACK,
        fontWeight:'bold'
    },
    fewLeft:{
        color:APP_PINK_COLOR,
    },
    values:{
        fontWeight:'bold'
    },
    bottomContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:moderateScale(15),
        paddingBottom:moderateScale(5)
    },
    reviewModal:{
        width:'90%',
        backgroundColor:'#fff',
        padding:moderateScale(15),
        borderRadius:moderateScale(4),
    },
    textInput:{
        borderWidth:1,paddingHorizontal:moderateScale(15),
        borderColor:LIGHTGREY,
        marginVertical:moderateScale(8),
        borderRadius:moderateScale(3),
        height:moderateScale(80),
        textAlignVertical:'top'
    },
    textInputSmall:{
        borderWidth:1,paddingHorizontal:moderateScale(15),
        borderColor:LIGHTGREY,
        marginVertical:moderateScale(8),
        borderRadius:moderateScale(3),
        height:moderateScale(40),
        textAlignVertical:'top'
    },
    reviewContainer:{
        borderColor:APP_PINK_COLOR,
        borderWidth:0.6,
        borderRadius:4,
        padding:8,
        width:'100%',
        marginTop:6,
        marginRight:6
    },
    name:{
        fontWeight:'bold',
        marginLeft:5
    },
    comment:{
        color:SUBNAME,fontSize:10,
        marginTop:moderateScale(4)
    },
    circle:{
        width:moderateScale(20),
        height:moderateScale(20),
        borderRadius:moderateScale(10),
        backgroundColor:APP_THEME_COLOR
    },
    buttonContainer:{
        width:'100%',
        height:moderateScale(40),
        flexDirection:'row'
    },
    button:{
        flex:1,
        backgroundColor:APP_PINK_COLOR,
        justifyContent:'center',
        alignItems:'center'
    },
    button2:{
        backgroundColor:LIGHTGREY
    },
    addText:{
        fontSize:moderateScale(16),
        fontWeight:'bold',
        color:WHITE
    },
    buyNow:{
        fontSize:moderateScale(16),
        fontWeight:'bold',
        color:DARK_BLACK
    }
});