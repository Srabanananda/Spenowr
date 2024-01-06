/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,FlatList} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../../../../@GlobalComponents/ModalHeader';
import { DEVICE_HEIGHT} from '../../../../../../../@Utils/helperFiles/DeviceInfoExtractor';
import ScreenLoader from '../../../../../../../@GlobalComponents/ScreenLoader';
import {connect} from 'react-redux';
import { TabsFormData } from '../../..';
import { getWhatsNewFeed } from '../../../../../../../@Endpoints/Core/Tabs/WhatsNew/index';
import FallBackUI from '../../../../../../../@GlobalComponents/FallBackUI';
import ErrorBoundary from 'react-native-error-boundary';
import Card from '../WhatsNewCard';
import { GlobalStyles } from '../../../../../../../@GlobalStyles/index';
import { isValidEnglish } from '@Utils/helperFiles/helpers';

const {COLOR:{LIGHTBLUE,WHITE}} = Config;

type tagProps = {
    tag: String;
    appliedFilters: Object;
}

const Tags = ({...props}: tagProps) =>{

    const {tag,appliedFilters} = props;
    const [isActive , setIsActive] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null); 
    const [loader, setLoader] = useState(false);
    const [hashTagFeed, setHashTagFeed] = useState([]);

    const setTag = (selected) =>{
        setSelectedTag(selected);
        setIsActive(true);
        setLoader(true);
    };

    useEffect(()=>{
        selectedTag ? callApi() : null;
    },[selectedTag]);

    const callApi = (length=0) =>{
        const apiData =  TabsFormData(appliedFilters,length,'');
        apiData.append('tag',selectedTag);
        getWhatsNewFeed(apiData)
            .then(res=>{
                const {data:{list=[]}} = res;
                setHashTagFeed(list);
            })
            .catch()
            .finally(()=>{
                setLoader(false);
            });
    };

    const renderPages = ({ index,item }) =>{
        return (
            <ErrorBoundary FallbackComponent={FallBackUI} key={index}>
                <Card externalCall={setIsActive} info={item} key={index} noTags />
            </ErrorBoundary>
        );
    };

    const renderData = () =>{
        if(!hashTagFeed.length) return <Text style={GlobalStyles.noDataFound}>No #Tag feed found!</Text>;
        return (
            <FlatList
                bounces = {false}
                data={hashTagFeed}
                horizontal={false}
                initialNumToRender={10}
                keyExtractor={item=>item.id.toString()}
                legacyImplementation = {true}
                // onEndReached={()=> callApi(hashTagFeed.length)}
                onEndReachedThreshold={0.5} 
                renderItem = {renderPages} 
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                style={{flex:1}}
            />
        );
    };

    const renderTagFeeds = () =>{
        return(
            <View style={styles.tagFeedContainer}>
                <ModalHeader headerStyle={styles.headerStyle} headerText={selectedTag} onPress={()=>setIsActive(false)} textProps={{numberOfLines : 1}} />
                <ScrollView contentContainerStyle={{paddingTop:5}} showsVerticalScrollIndicator={false}>
                    {loader ? <ScreenLoader /> : renderData()}
                </ScrollView>
            </View>
        );
    };

    const renderTags = () =>{
        const tagArr = tag.split(',');
        return (
            <>
                {tagArr.map((hashTag,i)=>{
                    const isValid = isValidEnglish(hashTag);
                    if(hashTag === 'null' || hashTag === undefined || hashTag === null || !isValid) return null;
                    return(
                        <TouchableOpacity key={i} onPress={()=> setTag(hashTag)} style={{marginRight: moderateScale(8)}}>
                            <Text style={styles.hashTag}>#{hashTag}</Text>
                        </TouchableOpacity>
                    );
                })}
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
                    {renderTagFeeds()}
                </Modal>
            </>
        );
    };

    return(
        <View>
            {
                tag.length ? 
                    <View style={styles.tagBox}>
                        {renderTags()}
                    </View>
                    : null
            }
        </View>
    );
};

function mapStateToProps(state){
    return{
        appliedFilters : state.home.filters,
    };
}

export default connect(mapStateToProps)(Tags);
const styles = StyleSheet.create({
    tagBox:{
        flexDirection:'row',marginTop:moderateScale(2),
        flexWrap:'wrap'
    },
    hashTag:{
        color:LIGHTBLUE,
        fontWeight:'bold',
        fontSize:moderateScale(12)
    },
    tagFeedContainer:{
        backgroundColor:WHITE,
        width:'95%',
        borderRadius:moderateScale(6),
        maxHeight:moderateScale(DEVICE_HEIGHT-200),
        padding:moderateScale(10)
    },
    headerStyle:{
        // maxWidth:moderateScale(290)
    }
});