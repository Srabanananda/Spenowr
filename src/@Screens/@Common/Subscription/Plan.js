/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text,StyleSheet,TouchableWithoutFeedback,TouchableOpacity,TextInput} from 'react-native';
import { DEVICE_HEIGHT } from '../../../@Utils/helperFiles/DeviceInfoExtractor';
import { getCurrency } from '../../../@Utils/helperFiles/CardDetails';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import { GlobalStyles } from '../../../@GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale } from 'react-native-size-matters';
import { getKeysFromObj } from '../../../@Utils/helperFiles/helpers';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import { updateMobileNumber } from '../../../@Endpoints/Core/Tabs/EditProfile';
import Toast from 'react-native-simple-toast';
import { getUserDetails } from '../../../@Endpoints/Auth';
import * as userActions from '@Redux/actions/userActions';
import { ActivityIndicator } from 'react-native-paper';
import { upgradeToFreePlan } from '../../../@Endpoints/Core/Payments/index';

const {COLOR:{PINK_LIGHT,WHITE,APP_PINK_COLOR,BLACK,GOLD,SUBNAME}} = Config;

type PlanProps = {
    plan: Object,
    selectedPlan: String,
    setPlan: Function,
    currentPlan : String,
    isFromReg? :Boolean,
    userDetails : Object,
    onUpgradeClickCallBack ?: Function,
    willShowLoader ?: boolean 
}

const Plan = ({...props}: PlanProps) =>{
    const {plan, selectedPlan, setPlan, currentPlan, isFromReg, userDetails, onUpgradeClickCallBack,willShowLoader } = props;
    const {
        label,
        price,
        key,
        plan_list,
        popular,
    } = plan;

    const dispatch = useDispatch();

    const navigation = useNavigation();
    const [isActive, setIsActive] = useState(false);
    const [number, setNumber] = useState('');
    const [loader, setLoader] = useState(false);
    const [btnLoader, setBtnLoader] = useState(false);

    const isSelected = selectedPlan === key;
    const isCurrentPlan = currentPlan === key;

    const planKeys= getKeysFromObj(plan_list);

    const checkSelectedPlan = () =>{
        if(!isSelected) setPlan(key);
    };

    const renderPrice = () =>{
        if(price === 'Free') return <Text style={styles(isSelected).freePrice}>{price}</Text>;
        return(
            <>
                <View style={styles(isSelected).priceBox}>
                    <Text style={styles(isSelected).currency}>{getCurrency('1')}</Text>
                    <Text style={styles(isSelected).priceTag}>{price}</Text>
                    <Text style={styles(isSelected).yearText}> /year</Text>
                </View>
                {
                    <Text style={styles(isSelected).planIncludes}>{ key=== 'spenowr_bronze_plan' ? '(* Includes Basic Plan)' : '(* Includes Bronze Plan)' } </Text>
                }
            </>
        );
    };

    const renderPlanBenefits = (benefits,i) =>{
        return(
            <View key={i} style={styles().benefitView}>
                <Icon color={isSelected?WHITE:BLACK} name={'check'} />
                <Text style={styles(isSelected).benefits}>{benefits.title}</Text>
            </View>
        );
    };

    const checkPlans = () =>{
        isFromReg ? navigation.navigate('Register',{newPlan: key}) : key === 'spenowr_basic'? freeUpgrade()  : checkNumber();
    };

    const freeUpgrade = () =>{
        if(currentPlan === key){
            Toast.show('You are already on this plan');
            return;
        }
        setBtnLoader(true);
        upgradeToFreePlan(key,userDetails.user_id)
            .then(()=>{
                Toast.show('Upgraded to Free Plan!');
                updateProfile(true);
            })
            .catch(()=>{
                setBtnLoader(false);
                Toast.show('Oops something went wrong');
            });
    };

    const checkPaymentPlatform = () => onUpgradeClickCallBack ? onUpgradeClickCallBack() :  navigation.navigate('SubscriptionPayment',{payLoad:key});

    const checkNumber = () => {
        if( userDetails.mobile && userDetails.mobile.length === 10) checkPaymentPlatform();
        else setIsActive(true);
    };

    const updateProfile = (toProfile=false) =>{
        getUserDetails()
            .then(res=>{
                const {data:{institute={},profileData={}}} = res;
                dispatch(userActions.updateUserDetails(institute,profileData));
                setTimeout(()=>{
                    if(toProfile){
                        navigation.popToTop();
                        navigation.navigate('Profile');
                    }
                    else
                    {
                        setIsActive(false);
                        checkPaymentPlatform();
                    }
                    
                },600);
            })
            .catch(()=>{
                setLoader(false);
                Toast.show('Oops something went wrong');
            });
    };

    const updateNumber = () =>{
        setLoader(true);
        updateMobileNumber(userDetails.user_id,number)
            .then(()=>{
                updateProfile();
            })
            .catch(()=>{
                setLoader(false);
                Toast.show('Oops something went wrong');
            });
    };

    const getBtnText=() =>{
        if(isFromReg)
            return isCurrentPlan ? 'Current Plan' : 'Choose Plan';
        return key === 'spenowr_basic' ? isCurrentPlan ? '' : 'Move To Basic' : 'Upgrade Now';
    };

    const removeText = !isFromReg && key === 'spenowr_basic' && isCurrentPlan;

    const renderActions = () =>{
        return(
            <TouchableOpacity  
                disabled={(isFromReg&&isCurrentPlan) || btnLoader||willShowLoader} 
                onPress={checkPlans} 
                style={styles((isFromReg&&isCurrentPlan)|| btnLoader||willShowLoader).actionButton}
            >
                {(btnLoader ||willShowLoader)
                    ? <ActivityIndicator color={APP_PINK_COLOR} /> : 
                    removeText ? null : <Text style={styles().actionText}>{getBtnText()}</Text>
                }
                {(isCurrentPlan && !isFromReg) ?  <Text style={styles().currentPlan}>Current Plan</Text> : null}
            </TouchableOpacity>
        );
    };

    const renderPopularity = () =>{
        if(popular) return (
            <View style={styles().popularTag}>
                <Text style={styles(isSelected).popular}>Popular</Text>
            </View>
        );
        return null;
    };

    const renderNumberInput = () =>{
        return(
            <View style={styles().modalBox}>
                <Text style={GlobalStyles.inputHeaderName}>MOBILE NUMBER
                    <Text style={GlobalStyles.starColor}>*</Text>
                </Text>
                <TextInput 
                    onChangeText = {(value)=>setNumber(value)}
                    placeholder  = {'Please enter your mobile number'}
                    style={GlobalStyles.textInput}
                    value={number}
                />
                <DefaultButton 
                    buttonText={'Update Number'} 
                    isDeactivated={number.length!==10} 
                    onPress={updateNumber}  
                    showLoader={loader}    
                />
            </View>
        );
    };

    const renderModal = () =>{
        return(
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
                {renderNumberInput()}
            </Modal>
        );
    };

    return(
        <TouchableWithoutFeedback onPress={checkSelectedPlan} >
            <View 
                style={[GlobalStyles.primaryCard,styles(isSelected).planBox]}
            >
                {renderPopularity()}
                <Text style={styles(isSelected).label}>{label}</Text>
                {renderPrice()}
                {
                    planKeys.map((eachPlan,i)=>(renderPlanBenefits(plan_list[eachPlan],i)))
                }
                {isSelected && renderActions()}
                {renderModal()}
            </View>
        </TouchableWithoutFeedback>
    );
};
function mapStateToProps(state){
    return{
        userDetails : state.userObj.userProfile
    };
}
export default connect(mapStateToProps)(Plan);
const styles = (selected) => StyleSheet.create({
    planBox:{
        height:DEVICE_HEIGHT-150,
        borderRadius:moderateScale(8),
        padding:moderateScale(20),
        shadowOpacity: 1,
        shadowOffset: {
            height: scale(1),
            width: scale(5)
        },
        shadowRadius:2,
        elevation:8,
        backgroundColor : selected ? APP_PINK_COLOR : PINK_LIGHT,
    },
    label:{
        fontWeight:selected ? 'bold' : '200',
        alignSelf:'center',
        fontSize:moderateScale(18),
        color : selected ? WHITE : BLACK,
        marginTop:moderateScale(5)
    },
    benefitView:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:moderateScale(5)
    },
    benefits:{
        marginLeft:moderateScale(5),
        color: selected? WHITE: BLACK,
        fontWeight:selected ? 'bold' : '200',
        fontSize:moderateScale(11)
    },
    priceBox:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:moderateScale(10),
        alignSelf:'center'
    },
    freePrice:{
        alignSelf:'center',
        marginVertical:moderateScale(10),
        fontSize:moderateScale(20),
        fontWeight:selected ? 'bold' : '200',
        color: selected? WHITE: BLACK
    },
    currency:{
        fontSize:moderateScale(18),
        marginTop:moderateScale(-8),
        color: selected? WHITE: BLACK
    },
    priceTag:{
        fontSize:moderateScale(30),
        fontWeight:selected ? 'bold' : '200',
        color: selected? WHITE: BLACK
    },
    yearText:{
        color: selected? WHITE: BLACK,
        marginTop:moderateScale(5)
    },
    actionButton:{
        ...GlobalStyles.primaryCard,
        position:'absolute',
        bottom:20,
        backgroundColor:WHITE,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:moderateScale(30),
        alignSelf:'center',
        paddingVertical:moderateScale(10),
        opacity  : selected ? 0.7 : 1
    },
    actionText:{
        fontWeight:'bold',
        fontSize:moderateScale(14),
        color:APP_PINK_COLOR
    },
    currentPlan:{
        color:APP_PINK_COLOR
    },
    popularTag:{
        backgroundColor:BLACK,position:'absolute',
        paddingHorizontal:moderateScale(14),
        padding:moderateScale(5),
    },
    popular:{
        fontSize:moderateScale(14),
        color:GOLD,
        fontWeight:'bold'
    },
    modalBox:{
        backgroundColor:WHITE,
        width:'95%',
        borderRadius:moderateScale(4),
        padding:moderateScale(15)
    },
    planIncludes:{
        alignSelf:'center',
        fontSize:moderateScale(10),
        marginBottom:moderateScale(4),
        color: selected ? WHITE : SUBNAME,
        fontWeight:selected ? 'bold' : '200',
    }
});