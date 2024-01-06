/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useEffect, useState} from 'react';
import {
    View,StyleSheet, SafeAreaView,Text, ScrollView
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import DefaultButton from '../../../../../../../../@GlobalComponents/DefaultButton';
import Modal from 'react-native-modal';
import Config from '@Config/default';
import ModalHeader from '../../../../../../../../@GlobalComponents/ModalHeader';
import { 
    applyForContest, fetchOpenContests, 
    removeFromContest,fetchContestRemoveData, applyForChangeOfArtworkInAContest 
} from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';
import PointShowCase from '@Spoints/PointShowCase';
import * as userActions from '@Redux/actions/userActions';
import { connect, useDispatch } from 'react-redux';
import ScreenLoader from '../../../../../../../../@GlobalComponents/ScreenLoader';
import AddUserNumber from './AddNumber';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import { getContestButtonText, isContestButtonDisabled } from '../../../../../../../../@Utils/helperFiles/Contest';

const {COLOR:{WHITE,APP_PINK_COLOR}} = Config;

type submitContestProps = {
    cardData : Object,
    UserContactNumber : Number,
    refreshData : Function,
    isArtworkContestActive : Number,
    isStoriesContestActive : Number,
    isWritingContestActive : Number,
    type : String
};

const SubmitToContest = ({...props}:submitContestProps) =>{

    const {
        cardData, 
        UserContactNumber, 
        refreshData, 
        // isContestActive,
        isArtworkContestActive,
        isStoriesContestActive,
        isWritingContestActive,
        type = 'artwork',
    } = props;
    // console.log('SubmitToContest : ', JSON.stringify(props));
    const isContestActive = type === 'artwork' ? isArtworkContestActive : type === 'writings' ? isWritingContestActive : isWritingContestActive;//isStoriesContestActive

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const {
        ContestExist=0,
        media_id='',
        paticipation_status,
        paticipate_status,
        contest_payment_status,
        mediaType='',
        id= '',
        article_id='',
        PhotographyContest=0,
        photo_publish="",
    } = cardData;

    const ent_id = type === 'artwork' ? media_id : type === 'stories' ? article_id :  id;
    
    const [showModal, setShowModal] = useState(false);
    const [activeContests, setActiveContests] = useState([]);
    const [contestExist, setContestExist] = useState(ContestExist);
    const [contactNo, setContactNo] = useState(UserContactNumber);
    const [usersData, setUsersData] = useState({});

    const [loader, setLoader] = useState(false);
    const [submitLoader, setSubmitLoader] = useState(false);

    const [selectedContest, setSelectedContest] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [earned, setEarned] = useState('0');
    const [total, setTotal] = useState('0');

    const checkSubmit = () =>{
        if(photo_publish == "1"){
            Toast.show('Your Image is Private , Make it Public to Add on Contest',Toast.LONG);
        }else if(photo_publish == "2"){
            setShowModal(true);
            if(contest_payment_status === '1') callApi(false);
            else paticipate_status != 1 ? callApi(false) : removeContestData();
        }
        if(type === 'stories' || type === 'writings'){
            setShowModal(true);
            if(contest_payment_status === '1') callApi(false);
            else paticipate_status != 1 ? callApi(false) : removeContestData();
        }
    };

    useEffect(()=>{
        if(earned !== '0')
        {
            setShowModal(false);setContestExist(1);
            setTimeout(()=>{
                dispatch(userActions.updatePointShowCase(true));
            },600);
        }
    },[earned]);

    useEffect(()=>{
        dispatch(userActions.updatePointShowCase(false));
    },[]);

    const callApi = (setDefault=true) =>{
        setLoader(true);
        fetchOpenContests(type === 'stories' ? 'writings' :  mediaType)
            .then(res=>{
                const {data:{ContestListData=[],userData}} = res;
                console.log("@=> fetchOpenContests :  ", JSON.stringify(res));
                setActiveContests(ContestListData);
                setSelectedContest('');
                setUsersData(userData);
                setDefault ? setContestExist(0) : null;
            })
            .catch((error)=>console.log("@=> fetchOpenContests error :  ", JSON.stringify(error)))
            .finally(()=>{
                setLoader(false);
                setSubmitLoader(false);
            });
    };

    const callApiRemove = () =>{
        setLoader(true);
        fetchContestRemoveData()
            .then(res=>{
                const {data:{ContestListData=[]}} = res;
                setSelectedContest(ContestListData[0].contest_id);
                setSelectedType('asdasd');
                setActiveContests(ContestListData);
            })
            .catch()
            .finally(()=>setLoader(false));
    };

    const getSelectedType = (type) =>{
        if(type === selectedType)
            return true;
        return false;
    };

    const getSelectedContestVal = id =>{
        if(id === selectedContest) return true;
        return false;
    };

    const getSelectedContest = ()=>{
        const contest = activeContests.find(x=>x.contest_id === selectedContest);
        if(contest)return contest;
        else return {status:0,payment_contest:'0',contest_fee:'0',currency:'1'}; 
    };
    
    const submitContestData = ()=>{
        const data = new FormData();
        data.append('contest_id',selectedContest);
        data.append('contest_type',selectedType);
        data.append('media_id',ent_id);
        data.append('entity_id',ent_id);
        data.append('media_type',mediaType);
        const res = getSelectedContest();
        const {status,payment_contest,contest_fee,currency} = res;
        if(payment_contest === '1'){
            if(contactNo){
                if(!status){
                    setShowModal(false);
                    const {email,user_id,first_name,last_name} = usersData;
                    const paymentObj = {
                        'media_id': media_id,
                        'orderAmount': contest_fee,
                        'orderCurrency':currency === 1 ? 'INR' : 'USD',
                        'customerEmail': email,
                        'userId': user_id,
                        'customerName': `${first_name} ${last_name}`,
                        'customerPhone': contactNo,
                        'contest_payment': 1,
                        'shippingAddress': '',
                        'contest_id': selectedContest,
                        'contest_type': selectedType,
                    };
                    navigation.navigate('PaymentInitiation',{payload:paymentObj});
                } else {
                    Toast.show('You Cannot Submit two Artworks to a single Contest',Toast.LONG);
                }
            } else Toast.show('Please Add Your Phone Number',Toast.LONG);
        } else {

            if(!status){
                setSubmitLoader(true);
                applyForContest(data)
                    .then(res=>{
                        const {data:{pointData:{earnedPoint=0,totalPoint=0}}} = res;
                        setEarned(earnedPoint);
                        setTotal(totalPoint);
                    })
                    .catch(()=>{
                        Toast.show('Oops, Our Server ran into a problem',Toast.LONG);
                    })
                    .finally(()=>{
                        setSubmitLoader(false);
                    });
            }
            else Toast.show('You Cannot Submit two Artworks to a single Contest',Toast.LONG);
        }
    };

    const changeSubmission = () =>{
        setSubmitLoader(true);
        const body = new FormData();
        body.append('entity_id',ent_id); 
        body.append('contest_id',selectedContest);
        body.append('contest_type',selectedType);
        applyForChangeOfArtworkInAContest(body)
            .then(()=>{
                Toast.show('Artwork Changed Successfully',Toast.LONG);
                setSubmitLoader(false);
                refreshData?.();
            })
            .catch(()=>{
                setSubmitLoader(false);
                Toast.show('Something went wrong',Toast.LONG);
            }).finally(()=>refreshData());
    };

    const removeContestData = () =>{
        setSubmitLoader(true);
        const data = new FormData();
        data.append('entity_id',ent_id);
        // data.append('entity_id',media_id);
        removeFromContest(data)
            .then(()=>{
                callApi();
                Toast.show('Artwork removed Successfully',Toast.LONG);
                setTimeout(()=>{
                    setShowModal(false);
                },600);
            })
            .catch(()=>{
                setSubmitLoader(false);
                Toast.show('Oops, something went wrong',Toast.LONG);
            }).finally(()=>refreshData());
    };

    const renderTypes = (contest_id,type) =>{
        const objTest = JSON.parse(type);
        var res = Object.entries(objTest);

        if(contest_id === selectedContest)
        {
            return(
                <>
                    <Text style={styles.selectCategory}>Select A Category</Text>
                    {
                        res.map((item,index)=>(
                            <View key={index} style={styles.typeWrapper}>
                                <CheckBox
                                    disabled={false}
                                    onValueChange={(newValue) => {
                                        newValue ? setSelectedType(item[0]) : setSelectedType('');
                                    }}
                                    style={styles.checkBox}
                                    value={getSelectedType(item[0])}
                                />
                                <Text style={styles.title}>{item[1].name ? item[1].name : item[1]}</Text>
                            </View>
                        ))
                    }
                </>
            );
        }
        return null;
    };

    const EachContest = ({contest}) =>{
        const {contest_title,type,contest_id} = contest;
        return(
            <>
                <View style={contestExist <=0 ? styles.EachContestWrapper: styles.EachContestWrapperDeactive}>
                    <CheckBox
                        disabled={contestExist <=0 ? false : true}
                        onValueChange={(newValue) => {
                            setSelectedType('');
                            newValue ? setSelectedContest(contest_id) : setSelectedContest('');
                        }}
                        style={styles.checkBox}
                        value={getSelectedContestVal(contest_id)}
                    />
                    <Text style={styles.title}>{contest_title}</Text>
                </View>
                {contestExist <=0 ? renderTypes(contest_id,type) : null}
            </>
        );
    };

    const renderSubmitModal = () =>{
        const currentSelected = getSelectedContest();
        const {contest_fee,payment_contest,currency,status} = currentSelected;
        return(
            <SafeAreaView style={styles.contestModal}>  
                <View style={styles.wrapper}>
                    <ModalHeader 
                        headerText={ contest_payment_status === '1' ? 'Retry Submit' :contestExist <=0  ? 'Select A Contest' : 'Remove From Contest'} 
                        onPress={()=>setShowModal(false)} 
                    /> 
                    {
                        loader ? 
                            <ScreenLoader text={'Getting Contest Details..'} />
                            :
                            <ScrollView>
                                {activeContests.length ?
                                    <View style={styles.contentsHolder}>
                                        {
                                            activeContests.map((item, index)=>(
                                                <EachContest contest={item} key={index} />
                                            ))
                                        }
                                    </View>
                                    : 
                                    <Text>No Active Contests Found!!</Text>
                                }
                                {
                                    contest_payment_status === '1' ? 
                                        <DefaultButton 
                                            buttonText={status ? 'Submit against this contest' :  'Submit'}
                                            onPress={()=>status ? changeSubmission() :checkSubmit()} 
                                            showLoader={loader}
                                            textStyle={styles.buttonText}
                                        /> 
                                        :
                                        <DefaultButton 
                                            buttonText={status ? 'Submit against this contest' :  contestExist <=0 ? 'Submit' : 'Remove'} 
                                            isDeactivated={selectedContest === '' || selectedType === ''} 
                                            onPress={()=>{status ? changeSubmission() : contestExist <=0 ? submitContestData() : removeContestData();}} 
                                            showLoader={submitLoader} 
                                            textStyle={styles.buttonText}
                                        />
                                }
                                
                                {payment_contest === '1' ? <Text style={styles.contestFee}> Contest Fee is {`${contest_fee} ${currency === '1' ? 'INR' : 'USD'}` } </Text> : null}
                                {
                                    !contactNo ? 
                                        <AddUserNumber setNumberCallback={(num)=>setContactNo(num)}>
                                            <Text style={{alignSelf:'center',marginTop:5,color:APP_PINK_COLOR,fontSize:12}}>Please Add Your Number here <Text style={GlobalStyles.starColor}>*</Text></Text>
                                        </AddUserNumber> : null
                                }
                            </ScrollView>
                    }
                </View>
            </SafeAreaView>
        );
    };

    const willShowSubmitButton = () =>{
        if(isContestActive>0)
            return(
                <DefaultButton 
                    buttonText={getContestButtonText(paticipation_status)}
                    // isDeactivated={isContestButtonDisabled(paticipation_status)}
                    onPress={()=>checkSubmit()} 
                    showLoader={false}
                    textStyle={styles.buttonText}
                />
            );
        return null;
    };

    return(
        <View>
            <PointShowCase disableBackNavigation={true} pointsEarned={earned} totalPoints={total} refresh={refreshData} />
            {willShowSubmitButton()}
            <Modal
                animationIn={'slideInDown'}
                animationOut={'slideOutUp'}
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={showModal}
                onBackButtonPress= {()=>{
                    setShowModal(false); 
                }}
                onBackdropPress = {()=>{
                    setShowModal(false); 
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderSubmitModal()}
            </Modal>
        </View>
    );
};

function mapStateToProps(state){
    return{
        UserContactNumber : state.userObj.userProfile.mobile,
        isArtworkContestActive : state.home.isContestActive,
        isWritingContestActive : state.home.isWritingContestActive,
        isStoriesContestActive : state.home.isStoriesContestActive,
    };
}

export default connect(mapStateToProps)(SubmitToContest);

const styles = StyleSheet.create({
    buttonText:{
        fontSize:moderateScale(10)
    },
    contestModal:{
        backgroundColor:WHITE,
        width:'100%',
        position:'absolute',
        top:0,
    },
    wrapper:{
        margin:moderateScale(15)
    },
    contentsHolder:{
        padding:moderateScale(10)
    },
    checkBox:{
        width:moderateScale(25),
        height:moderateScale(25)
    },
    title:{
        marginLeft:moderateScale(10)
    },
    EachContestWrapper:{
        flexDirection:'row',alignItems:'center',
        marginVertical:moderateScale(10)
    },
    selectCategory:{
        fontWeight:'bold'
    },
    typeWrapper:{
        flexDirection:'row',
        alignItems:'center',
        padding:moderateScale(10),
        paddingLeft:moderateScale(15)
    },
    EachContestWrapperDeactive:{
        flexDirection:'row',alignItems:'center',
        marginVertical:moderateScale(10),
        opacity:.5
    },
    contestFee:{
        alignSelf:'center',
        marginTop:moderateScale(10)
    }
});