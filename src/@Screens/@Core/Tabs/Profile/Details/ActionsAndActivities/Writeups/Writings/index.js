/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState,useEffect} from 'react';
import {FlatList,RefreshControl,Text,TouchableOpacity,View} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { connect,useDispatch } from 'react-redux';
import ScreenLoader from '../../../../../../../../@GlobalComponents/ScreenLoader';
import Card from './WritingsCard';
import { moderateScale } from 'react-native-size-matters';
import { fetchWritingsData } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as homeActions from '@Redux/actions/homeActions';

const Writings = ({mode,subscription,points,...props}) =>{

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {publicUserData} = props;
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);
    const [writingsList, setWritingsList] = useState([]);  
    const [refreshing,setRefreshing] = useState(false);

    useEffect(()=>{
        if(isFocused)
            if(mode === 'PRIVATE') callApi();
            else setWritingsList(publicUserData.QuoteData);
    },[isFocused]);

    const onRefresh = () =>{
        if(mode === 'PRIVATE')
        {
            setRefreshing(true);
            callApi();
            setTimeout(()=>{setRefreshing(false);},500);
        }
    };

    const callApi =() => 
    {
        dispatch(homeActions.fetchContestData());
        setLoading(true);
        fetchWritingsData()
            .then(res=>{
                const {data:{QuoteData=[]}} = res;
                setWritingsList(QuoteData);
            })
            .catch()
            .finally(()=>setLoading(false));
    };

    const  _renderFlatListAdapter = ({ item }) => {
        return <Card cardData={item} mode={mode} refreshData={callApi} />;
    };

    if(loading)
        return <ScreenLoader text={'Fetching Writings..'} />;

    if(!loading && writingsList.length)
        return(
            <View style={{flex:1}}>
                <FlatList
                    contentContainerStyle={{padding:moderateScale(10)}}
                    data={writingsList}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            onRefresh={onRefresh} refreshing={refreshing}
                            title="Refreshing .."
                            titleColor={'#000'} />
                    }
                    renderItem={_renderFlatListAdapter}
                    showsVerticalScrollIndicator={false}
                >
                </FlatList>
                {
                    (mode === 'PRIVATE') &&
                    (
                        <TouchableOpacity onPress={() => navigation.navigate('AddWritings',{ subscription: subscription, points: points})} style={GlobalStyles.AddButton}>
                            <Icon color={'#fff'} name={'plus'} size={20} />
                        </TouchableOpacity>
                    )
                }
            </View>
            
        );

    if(!loading && !writingsList.length)
        return(
            <View style={{flex:1}}>
                <Text style={{alignSelf:'center',marginTop:moderateScale(20),fontSize:moderateScale(12)}}>No Writings Available</Text>
                {
                    (mode === 'PRIVATE') &&
                    (
                        <TouchableOpacity onPress={() => navigation.navigate('AddWritings',{ subscription: subscription, points: points})} style={GlobalStyles.AddButton}>
                            <Icon color={'#fff'} name={'plus'} size={20} />
                        </TouchableOpacity>
                    )
                }
            </View>
        );
    
    return null;
};

const mapStateToProps = (state) => {
    return {
        publicUserData: state.userObj.publicUserData
    };
};


export default connect(mapStateToProps)(Writings);