/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {TouchableOpacity,Text,View,TextInput} from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import Modal from 'react-native-modal';
import ModalHeader from '../../../@GlobalComponents/ModalHeader';
import Config from '@Config/default';
import Toast  from 'react-native-simple-toast';
import DefaultButton from '../../../@GlobalComponents/DefaultButton';
import { customizeMyProduct } from '../../../@Endpoints/Core/Tabs/Shop';
import { connect } from 'react-redux';

const {COLOR:{SUBNAME}} = Config;

type CustomizeProps = {
    productDetails : {
        singleproduct:Object,
        sellerName:String,
    },
    user:Object
}

const Customize = ({productDetails,user} : CustomizeProps) =>{

    const [isActive, setIsActive] = useState(false);
    const [budget, setBudget] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {first_name,last_name,email,user_id} = user;
    const {sellerName, singleproduct:{seller_id,id,title,customized_order}} = productDetails;

    const onSubmit = () =>{
        if(budget.length && message.length){
            setIsLoading(true);
            const data = new FormData();
            data.append('budget_range',budget);
            data.append('description',message);

            data.append('seller_id',seller_id);
            data.append('seller_name',sellerName);
            data.append('product_id',id);
            data.append('product_name',title);
            data.append('sender_user_name',first_name+' '+last_name);
            data.append('sender_user_id',user_id);
            data.append('sender_email',email);
            customizeMyProduct(data)
                .then(() => {
                    Toast.show('Customization Request Sent Successfully');
                    setTimeout(() => {
                        setIsActive(false);
                    },400);
                })
                .catch(() => Toast.show('Something went wrong'))
                .finally(() => setIsLoading(false));
        }else{
            Toast.show('Please fill all the fields');
        }
    };

    const renderModal = () =>{
        return(
            <View style={GlobalStyles.adminModal}>
                <ModalHeader headerText={'Add Cusomizations'} onPress={()=>setIsActive(false)} />
                <TextInput 
                    keyboardType = {'numeric'}
                    onChangeText = {(value)=>setBudget(value)}
                    placeholder  = {'Your Budget'}
                    placeholderTextColor={SUBNAME}
                    style={GlobalStyles.textInput}
                    value={budget}
                />
                <TextInput 
                    multiline
                    numberOfLines={5}
                    onChangeText = {(value)=>{
                        if(value.length < 250) setMessage(value); 
                        else Toast.show('Message should be less than 250 characters');
                    }}
                    placeholder  = {'Message for seller'}
                    placeholderTextColor={SUBNAME}
                    style={[GlobalStyles.textInput,{height:100}]}
                    value={message}
                />
                <Text style={[GlobalStyles.starColor,{alignSelf:'flex-end'}]}>* max 250 characters</Text>
                <DefaultButton buttonText={'Submit'} onPress={onSubmit} showLoader={isLoading} />
            </View>
        );
    };

    if(customized_order != 1) return null;

    return(
        <>
            <TouchableOpacity onPress={()=>setIsActive(true)} style={GlobalStyles.seeMoreButtonRev}>
                <Text style={GlobalStyles.seeMoreButtonTextRev}>Customize</Text>
            </TouchableOpacity>
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
                {renderModal()}
            </Modal>
        </>
    );
};
function mapStateToProps(state){
    return{
        productDetails : state.productDetails.productDetailsData,
        user : state.userObj.userProfile
    };
}

export default connect(mapStateToProps)(Customize);