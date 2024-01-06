import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View,ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { requestOpenHowToData } from '../../../../../../../@Endpoints/Auth';
import ModalHeader from '../../../../../../../@GlobalComponents/ModalHeader';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import HTML from 'react-native-render-html';
export const Help = () => {

    const [isActive , setIsActive] = useState(false);
    const [howToData, setHowToData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        callApi();
    },[]);

    const callApi = () =>{
        setLoading(true);
        requestOpenHowToData('work-experience')
            .then(res=>{
                const {data:{howto={}}} =res;
                setHowToData(howto);
            })
            .catch()
            .finally(()=>setLoading(false));
    };

    const renderContentData = () => {
        if(howToData) return(
            <View style={{height:Dimensions.get('window').height-100}}>
                <ModalHeader 
                    headerStyle={{paddingHorizontal:10}} 
                    headerText={howToData?.heading??''} 
                    onPress={()=>setIsActive(false)}  
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HTML
                        source={{ html: howToData?.description??'' }}
                    />
                </ScrollView>
            </View>
        );
        return <></>;
    };

    const renderContent = () => {
        return(
            <View  style={GlobalStyles.adminModal}>
                {loading && <ActivityIndicator size={'small'} />}
                {!loading && renderContentData() }
            </View>
        );
    };

    return (
        <View>

            <TouchableOpacity onPress={()=>setIsActive(true)} style={GlobalStyles.seeMoreButtonRev} >
                <Text style={GlobalStyles.seeMoreButtonTextRev}>Help</Text>
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
                {renderContent()}
            </Modal>
        </View>
    );

};

export default Help;