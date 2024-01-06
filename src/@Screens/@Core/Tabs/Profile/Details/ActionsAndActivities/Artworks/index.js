/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {SafeAreaView,TouchableOpacity} from 'react-native';
import DefaultHeader from '../../../../../../../@GlobalComponents/DefaultHeader';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import MyArtWorkScreen from './MyArtWork';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ArtWorksScreen = ({...props}) =>{

    const {navigation,route:{params:{mode, subscription_plan, ai_point}}} = props;

    return(
        <SafeAreaView style={GlobalStyles.GlobalContainer}>
            <DefaultHeader headerText={mode === 'PRIVATE' ? 'My Artworks' : 'Artworks'} />
            <MyArtWorkScreen mode={mode} subscription={subscription_plan} points={ai_point}/>
            {
                (mode === 'PRIVATE') &&
                (
                    <TouchableOpacity onPress={() => navigation.navigate('AddArtWork', {subscription: subscription_plan, points: ai_point})} style={GlobalStyles.AddButton}>
                        <Icon color={'#fff'} name={'plus'} size={20} />
                    </TouchableOpacity>
                )
            }
        </SafeAreaView>
    );
};

export default ArtWorksScreen;