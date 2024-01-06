/**
 * Create By @name Sukumar_Abhijeet 
 */

import React,{useState} from 'react';
import { View,Text,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import HTML from 'react-native-render-html';
import styles from './styles';
import CountDownTimer from '../../../../../../../@GlobalComponents/Timer';
import HowToParticipate from '../HowToParticipate';
import FormHeader  from '@GlobalComponents/FormHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Config from '@Config/default';
import Comments from '../Comments';

const { COLOR:{APP_PINK_COLOR}} = Config;

const Details = ({contestDetails,Status}) =>{

    const {
        active_prize,end_datetime,end_time,
        first_reward_amount='',
        second_reward_amount='',
        third_reward_amount='',
        fourth_reward_amount='',
        video_url= '',
    } = contestDetails;

    const presentDate = new Date().toString();

    const begin = presentDate ;
    const expire = end_datetime+' '+end_time;

    let desc = contestDetails?.contest_description?.replace(/font-family: Roboto, sans-serif;/g,'') || '';
    desc = desc.replace(/font-family: Roboto,sans-serif;/g,'');
    desc = desc.replace(/style="line-height: 1.38;/g,'');
    desc = desc.replace(/background-color: #ffffff;/g,'');

    const [showDetails,setShowDetails] = useState(true);
    const [showRules,setShowRules] = useState(false);
    


    const renderPrize  = (value,text) =>{
        if(value === '') return null;
        return (
            <View style={styles.prize}>
                <Text style={{color:'#fff',fontWeight:'bold'}}>{text} : ₹ {value} </Text>
            </View>);
    };

    const renderData = () =>{
        if(!showDetails) return null;
        return(
            <View>
                {(active_prize === 'true')&&
                <>
                    {renderPrize(first_reward_amount,'FIRST WINNER PRIZE')}
                    {renderPrize(second_reward_amount,'SECOND WINNER PRIZE')}
                    {renderPrize(third_reward_amount,'THIRD WINNER PRIZE')}
                    {renderPrize(fourth_reward_amount,'FOURTH WINNER PRIZE')}
                </> 
                }
                {
                    !Status ? <Text style={styles.contestOver}>CONTEST OVER !!</Text> : null
                }
                {
                    Status ? 
                        <>
                            <CountDownTimer endDate={expire} showText={'Contest Will Finish In.'} startDate={begin} />
                            <HowToParticipate vID={video_url} />
                        </>
                        : null
                }
            </View>
        );
    };

    const renderRules = () => {
        if(!showRules) return null;
        return <HTML source={{html : desc}} />;
    };

    const onDetailPress = () => setShowDetails(!showDetails);
    const onRulePress = () => setShowRules(!showRules);

    return(
        <View>
            <FormHeader accordianChild={renderData} headerText={'View Details'} onPress={onDetailPress} outlined >
                <TouchableOpacity onPress={onDetailPress}>
                    <Icon color={APP_PINK_COLOR} name={!showDetails ? 'chevron-down' : 'chevron-up'} size={24} />
                </TouchableOpacity>
            </FormHeader>

            <FormHeader accordianChild={renderRules} containerStyle={{marginTop:10}} headerText={'View Rules'} onPress={onRulePress} outlined >
                <TouchableOpacity onPress={onRulePress}>
                    <Icon color={APP_PINK_COLOR} name={!showRules ? 'chevron-down' : 'chevron-up'} size={24} />
                </TouchableOpacity>
            </FormHeader>
            <Comments contestDetails={contestDetails} />
        </View>
    );
};

Details.propTypes = {
    Status:PropTypes.number.isRequired,
    contestDetails:PropTypes.object.isRequired,
};

export default Details;