/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect,} from 'react';
import {View,Text,StyleSheet,ScrollView,TextInput} from 'react-native';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import Modal from 'react-native-modal';
import ModalHeader from '@GlobalComponents/ModalHeader';
import { moderateScale } from 'react-native-size-matters';
import { getAssignmentBids } from '../../../../@Endpoints/Core/Tabs/More';
import { GlobalStyles } from '../../../../@GlobalStyles';
import Config from '@Config/default';
import moment from 'moment';
import BidDetails from './BidDetails';

const {COLOR:{APP_THEME_COLOR,WHITE,SUBNAME,DARKGRAY}} = Config;

type ProposalProps= {
    response : String,
    id : String
};

const AssignmentProposals = ({...props}:ProposalProps) =>{
    const {response,id} = props;
    const [modal,setModal] = useState(false);
    const [proposals, setProposals] = useState([]);

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = () =>{
        getAssignmentBids(id)
            .then(res=>{
                const {data=[]} =  res;
                setProposals(data);
            })
            .catch()
            .finally();
    };

    const renderProposalList= () => {
        return(
            <View style={styles.filterContainer}>
                <ModalHeader headerText={'Proposals'} onPress={()=>setModal(false)} />
                {!proposals.length && <Text style={GlobalStyles.noDataFound}>No Proposals Found</Text>}
                <ScrollView>
                    {
                        proposals.map((item,i)=>(
                            <View key={i} style={styles.viewWrapper}>
                                <Text style={styles.Name}>{item.first_name} ({item.message_count})</Text>
                                <View style={[GlobalStyles.primaryCard,styles.textWrapper]}>
                                    <Text style={styles.bidPrice}>{item.bid_quote}</Text>
                                    <Text style={styles.comment}>{item.bid_comment}</Text>
                                    <Text style={styles.posted}>{moment(item.message_datetime).format('MMMM Do YYYY')}</Text>
                                    <BidDetails proposal={item} />
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        );
    };

    
    return(
        <View>
            <DefaultButton 
                buttonStyle={{marginVertical:moderateScale(5),alignItems:'center'}}  
                buttonText={`Assignment Proposals (${response})`} 
                onPress={()=>setModal(true)} 
                type={'outline'}     
            />  
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={modal}
                onBackButtonPress= {()=>{
                    setModal(false); 
                }}
                onBackdropPress = {()=>{
                    setModal(false); 
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderProposalList()}
            </Modal>
        </View>
    );
};

export default AssignmentProposals;
const styles = StyleSheet.create({
    filterContainer:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:'#fff',
        padding:moderateScale(10),
    },
    viewWrapper:{
        backgroundColor:APP_THEME_COLOR,
        padding:moderateScale(8),
        marginBottom:moderateScale(6),
        borderRadius:moderateScale(5)
    },
    Name:{
        fontWeight:'bold',
        color:WHITE
    },
    textWrapper:{
        padding:moderateScale(5),
        marginTop:moderateScale(5)
    },
    bidPrice:{
        fontWeight:'600',
    },
    posted:{
        color:DARKGRAY,
        fontSize:moderateScale(10)
    },
    comment:{
        color:SUBNAME,
        marginBottom:moderateScale(3),
        fontSize:moderateScale(11)
    }
});