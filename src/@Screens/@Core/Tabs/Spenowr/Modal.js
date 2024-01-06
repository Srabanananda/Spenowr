/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text,TouchableWithoutFeedback, TouchableOpacity, Image} from 'react-native';
import styles from './styles';

const SpenowrModal = ({...props}) =>{

    const {navigation} = props;

    const dismissScreen = () =>{
        navigation.goBack();
    };

    const options = [
        /* {name : 'Find Artist', route:'FindArtist', Imgs:require('../../../../assets/svgs/artist.svg')},
        {name : 'Find Trainer', route:'FindTrainer', Imgs:require('../../../../assets/svgs/trainer.svg')},
        {name : 'Training Classes', route:'TrainingClasses', Imgs:require('../../../../assets/svgs/classes.svg')},
        {name : 'Custom Order', route:'CustomOrder', Imgs:require('../../../../assets/svgs/mixer.svg')}, */

        {name : 'Read Stories', route:'Home', param:{ setTab: 'whats_new', filter: 'story-blogs' }, Imgs:require('../../../../assets/tabs/Spenowr/readstories.png')},
        {name : 'Audio Podcast', route:'Home', param:{ setTab: 'whats_new', filter: 'story-blogs' }, Imgs:require('../../../../assets/tabs/Spenowr/audiopodcast.png')},
        {name : 'Quotes/Poems', route:'WriteupScreen', param:{ mode: 'PRIVATE' }, Imgs:require('../../../../assets/tabs/Spenowr/quotepoem.png')},
        {name : 'Art Gallery', route:'CustomOrder', param:{}, Imgs:require('../../../../assets/tabs/Spenowr/artgallery.png')},
        {name : 'Custom Print', route:'CustomPrints', param:{}, Imgs:require('../../../../assets/tabs/Spenowr/customprint.png')},
        {name : 'Contests', route:'Contest', param:{}, Imgs:require('../../../../assets/tabs/Spenowr/contest.png')},
        {name : 'Jobs', route:'Jobs', param:{}, Imgs:require('../../../../assets/tabs/Spenowr/job.png')},
        {name : 'Find Artist', route:'FindArtist', param:{}, Imgs:require('../../../../assets/tabs/Spenowr/findartist.png')}
    ];

    const renderEachOption = (item,index) =>{
        return(
            <TouchableOpacity key={index} onPress={()=>{
                if(item.route == 'Home'){
                    navigation.navigate(item.route,{ screen: 'HomeTab', params : item.param})
                }else {
                    navigation.navigate(item.route,item.param)
                }
            }} style={styles.wrapper}>
                <Image resizeMode={'contain'} source={item.Imgs} style={styles.Img} />
                <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return(
        <TouchableWithoutFeedback onPress={()=>dismissScreen()}>
            <View onPress={()=>dismissScreen()} style={{flex:1}}>
               
                <TouchableWithoutFeedback onPress={()=>{}}>
                    <View style={[styles.modalView,{flexWrap: 'wrap'}]}>
                        {
                            options.map((item,index)=>(
                                renderEachOption(item,index)
                            ))
                        }
                    </View>
                </TouchableWithoutFeedback>
                
            </View>
        </TouchableWithoutFeedback>
            
    );
};

export default SpenowrModal;