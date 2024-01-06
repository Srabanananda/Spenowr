/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {SafeAreaView,View,TouchableOpacity,Text, ScrollView} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import DefaultHeader from '../../../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import Config from '@Config/default';
import PropTypes from 'prop-types';

import Awards from './Awards';
import MeetTheTeam from './MeetTheTeam';
import Event from './Event';
import PressRelease from './PressRelease';


const {COLOR:{DARK_BLACK,DARKGRAY,APP_PINK_COLOR}} = Config;

const tabs = [
    {name : 'Awards',value : 'awards'},{name : 'Meet The Team', value : 'meet_the_team'},
    {name : 'Event', value : 'event'},{name : 'Press Release', value : 'press_release'}
];

const PortfolioScreen = ({...props}) =>{

    const {route} = props;
    const mode =  route.params.mode;

    const [selectedTab, setSelectedTab] = useState('awards');

    const renderEachTab = (tab,index) =>{
        return (
            <TouchableOpacity 
                key={index}
                onPress={()=>setSelectedTab(tab.value)} 
                style={{padding:moderateScale(10),paddingHorizontal:moderateScale(15),borderBottomColor:APP_PINK_COLOR,borderBottomWidth:tab.value === selectedTab ? 1.5 :0}}
            >
                <Text style={{fontWeight:'bold',fontSize:moderateScale(12),color : tab.value === selectedTab ? DARK_BLACK  : DARKGRAY}}>{tab.name}</Text>
            </TouchableOpacity>
        );
    };

    const renderSelectedTabData = () =>{
        switch(selectedTab)
        {
        case  'awards' : 
            return <Awards mode={mode} />;
        case  'meet_the_team' : 
            return <MeetTheTeam mode={mode} />;
        case  'event' : 
            return <Event mode={mode} />;
        case  'press_release' : 
            return <PressRelease mode={mode} />;
        default : 
            return <Awards mode={mode} />;
        }
    };

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={mode === 'PRIVATE '? 'My Portfolio' : 'Portfolio'} />
            <View style={{flex:1}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <ScrollView 
                        contentContainerStyle={{flexDirection:'row'}} 
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false}>
                        {
                            tabs.map((item,index)=>(
                                renderEachTab(item,index)
                            ))
                        }
                    </ScrollView>
                </View>
                <View style={{flex:1}}>
                    {renderSelectedTabData()}
                </View>
            </View>
        </SafeAreaView>
    );
};

PortfolioScreen.propTypes = {
    route: PropTypes.object.isRequired,
};

export default PortfolioScreen;