/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {SafeAreaView,TouchableOpacity,Text,View} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import DefaultHeader from '../../../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import Articles from './Articles';
import Writings from './Writings';
import Config from '@Config/default';
import PropTypes from 'prop-types';

const {COLOR:{APP_PINK_COLOR,DARKGRAY,DARK_BLACK}} = Config;

const tabs = [
    {name : 'Quotes/Poem', value : 'writings'},
    {name : 'Stories/blogs', value : 'articles'},
];

const WriteupScreen = ({...props}) =>{

    const {route:{params:{mode,currentTab='writings',subscription_plan='',ai_point=''}}} = props;

    const [selectedTab, setSelectedTab] = useState(currentTab);

    const renderSelectedTabData = () =>{
        switch(selectedTab)
        {
        case  'writings' : 
            return  <Writings mode={mode} subscription={subscription_plan} points={ai_point} />;
        case  'articles' : 
            return <Articles mode={mode} subscription={subscription_plan} points={ai_point} />;
        }
    };

    const renderEachTab = (tab,index) =>{
        return (
            <TouchableOpacity 
                key={index}
                onPress={()=>setSelectedTab(tab.value)} 
                style={{padding:moderateScale(10),borderBottomColor:APP_PINK_COLOR,borderBottomWidth:tab.value === selectedTab ? 1.5 :0}}
            >
                <Text style={{fontWeight:'bold',fontSize:moderateScale(12),color : tab.value === selectedTab ? DARK_BLACK  : DARKGRAY}}>{tab.name}</Text>
            </TouchableOpacity>
        );
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={mode === 'PRIVATE' ? 'My Writings' : 'Writings'} />
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'65%',alignSelf:'center'}}>
                {
                    tabs.map((item,index)=>(
                        renderEachTab(item,index)
                    ))
                }
            </View>
            {renderSelectedTabData()} 
           
        </SafeAreaView>
    );
};

WriteupScreen.propTypes = {
    route:PropTypes.object.isRequired
};

export default WriteupScreen;