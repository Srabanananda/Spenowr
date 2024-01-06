/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View,Text,StyleSheet,ScrollView,TextInput} from 'react-native';
import Modal from 'react-native-modal';
import ModalHeader from '@GlobalComponents/ModalHeader';
import { addBidConversationReply, getAssignmentBidDetails } from '../../../../@Endpoints/Core/Tabs/More/index';
import Toast from 'react-native-simple-toast';
import DefaultButton from '../../../../@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../../@GlobalStyles';
import Config from '@Config/default';
import moment from 'moment';


const {COLOR:{DARKGRAY,SUBNAME}} = Config;

type DetailsProps = {
    proposal : Object,
}

const BidDetails = ({...props}:DetailsProps) =>{

    const {proposal} = props;

    const [detailModal,setDetailModal] = useState(false);
    const [bidDetails, setBidDetails] = useState([]);
    const [comment, setComment] = useState('');
    const [loader, setLoader] = useState(false);

    const addReply = () =>{
        setLoader(true);
        addBidConversationReply(proposal.conversation_id,comment)
            .then(()=>{
                setComment('');
                Toast.show('Comment Added Successfully');
                getBidDetails(proposal.conversation_id);
            })
            .catch(()=>{
                Toast.show('Oops Something went Wrong');
                setLoader(false);
            });
    };

    const renderDetails = () => {
        return(
            <View style={styles.filterContainer}>
                <ModalHeader headerText={'Proposal Details'} onPress={()=>setDetailModal(false)} />
                <ScrollView>
                    {
                        bidDetails.map((each,i)=>(
                            <View key={i} style={styles.box}>
                                <Text style={styles.name}>{each.first_name}</Text>
                                <Text style={styles.date}>{moment(each.message_datetime).format('MMMM Do YYYY')}</Text>
                                <Text style={styles.text}>Message : {each.message}</Text>
                                <Text style={styles.text}>Bid Amount : {each.bid_quote}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
                <View>
                    <TextInput 
                        multiline 
                        onChangeText={(res) => setComment(res)} 
                        placeholder={'Enter your comment'}
                        returnKeyType="next"
                        style={[GlobalStyles.textInput,{height:80,paddingLeft:10}]} 
                        value={comment} />
                    <DefaultButton buttonStyle={{alignSelf:'flex-end'}} buttonText={'Reply'} isDeactivated={!comment.length} onPress={addReply} showLoader={loader} type={'outline'} />
                </View>
            </View>
        );
    };

    const getBidDetails = id => {
        getAssignmentBidDetails(id)
            .then(res=>{
                const {data=[]} = res;
                setBidDetails(data);
                setDetailModal(true);
            })
            .catch(()=>Toast.show('Oops Something went wrong'))
            .finally(()=>setLoader(false));
    };


    return(
        <View>
            <DefaultButton buttonStyle={{alignSelf:'flex-end'}} buttonText={'Reply'} onPress={()=>getBidDetails(proposal.conversation_id)} type={'outline'} />
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={detailModal}
                onBackButtonPress= {()=>{
                    setDetailModal(false); 
                }}
                onBackdropPress = {()=>{
                    setDetailModal(false); 
                }}
                style={{justifyContent:'center',alignItems:'center',margin:0,padding:0}}
                useNativeDriver={true}
            >
                {renderDetails()}
            </Modal>
        </View>
    );
};

export default BidDetails;
const styles = StyleSheet.create({
    filterContainer:{
        width:'95%',
        borderRadius:moderateScale(6),
        backgroundColor:'#fff',
        padding:moderateScale(10),
        maxHeight:moderateScale(500),
    },
    box:{
        padding:moderateScale(8),
        borderWidth:.2,
        borderRadius:moderateScale(6),
        borderColor:SUBNAME,
        marginBottom:moderateScale(6)
    },
    name:{
        fontWeight:'bold',
        fontSize:moderateScale(14)
    },
    date:{
        marginBottom:moderateScale(5),
        fontSize:moderateScale(10),
        color:DARKGRAY
    },
    text:{
        fontSize:moderateScale(12),
        color:SUBNAME
    }
});