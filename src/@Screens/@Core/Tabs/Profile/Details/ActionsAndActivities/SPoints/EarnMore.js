/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {Text,View} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../../../../@GlobalComponents/ModalHeader';

const MorePoints =  [
    {type :'Account Activation',points:'50'},
    {type :'Profile completion',points:'10'},
    {type :'Add Artwork',points:'2'},
    {type :'Add Writings',points:'2'},
    {type :'Add Products',points:'5'},
    {type :'Add Services',points:'5'},
    {type :'Product Sell',points:'25'},
    {type :'Paticipate in Contest',points:'5'},
    {type :'1st Contest Winner',points:'25'},
    {type :'Other winners of contest',points:'20'},
    {type :'Page Like & Followes',points:'1'},
    {type :'Artist of the Week',points:'5'},

];

const EarnMore = () =>{

    const [isActive, setIsActive] = useState(false);

    const EachPoint = ({point}) =>{
        return(
            <View style={styles.morePointsWrapper}>
                <Text style={styles.pointType}>{point.type}</Text>
                <Text style={styles.eachPoint}>+{point.points}</Text>
            </View>
        );
    };

    const renderEarnMoreModal = () =>{
        return(
            <View style={styles.earnModal}>
                <ModalHeader headerText={'Point you can earn!!'} onPress={()=>setIsActive(false)} />
                {
                    MorePoints.map((item,index)=>(
                        <EachPoint key={index} point={item} />
                    ))
                }
            </View>
        );
    };

    return(
        <>
            <Text onPress={()=>setIsActive(true)} style={styles.earnMore}>Earn More ?</Text>
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
                {renderEarnMoreModal()}
            </Modal>
        </>
    );
};

export default EarnMore;