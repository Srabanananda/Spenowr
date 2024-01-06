/**
 *  Created By @name Sukumar_Abhijeet
 */

import React,{useEffect,useState} from 'react';
import {View,Text,TouchableOpacity,RefreshControl,FlatList} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { fetchArticlesData } from '../../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../../../../../../@GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import ScreenLoader from '../../../../../../../../@GlobalComponents/ScreenLoader';
import Card from './Card';
import * as homeActions from '@Redux/actions/homeActions';

const Articles = ({mode,subscription,points,...props}) =>{

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {publicUserData} = props;
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);
    const [articlesList, setArticlesList] = useState([]);  
    const [refreshing,setRefreshing] = useState(false);

    useEffect(()=>{
        if(isFocused)
            if(mode === 'PRIVATE') callApi();
            else setArticlesList(publicUserData.articleData);
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
        fetchArticlesData()
            .then(res=>{
                const {data:{articleData=[]}} = res;
                console.log(" Articles : ", JSON.stringify(articleData));
                setArticlesList(articleData);
            })
            .catch()
            .finally(()=>setLoading(false));
    };

    const  _renderFlatListAdapter = ({ item }) => {
        return <Card cardData={item} mode={mode} refreshData={callApi} />;
    };

    if(loading)
        return <ScreenLoader text={'Fetching Articles..'} />;

    if(!loading && articlesList.length)
        return(
            <View style={{flex:1}}>
                <FlatList
                    contentContainerStyle={{padding:moderateScale(10)}}
                    data={articlesList}
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
                        <TouchableOpacity onPress={() => navigation.navigate('AddArticle',{ subscription: subscription, points: points })} style={GlobalStyles.AddButton}>
                            <Icon color={'#fff'} name={'plus'} size={20} />
                        </TouchableOpacity>
                    )
                }
            </View>
            
        );


    if(!loading && !articlesList.length)
        return(
            <View style={{flex:1}}>
                <Text style={{alignSelf:'center',marginTop:moderateScale(20),fontSize:moderateScale(12)}}>No Articles Available</Text>
                {
                    (mode === 'PRIVATE') &&
                    (
                        <TouchableOpacity onPress={() => navigation.navigate('AddArticle',{ subscription: subscription, points: points})} style={GlobalStyles.AddButton}>
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

Articles.propTypes = {
    mode:PropTypes.string.isRequired,
    publicUserData:PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(Articles);