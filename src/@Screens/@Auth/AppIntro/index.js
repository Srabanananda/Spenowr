/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {SafeAreaView, View, Image, Text,ImageBackground} from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import SliderIntro from 'react-native-slider-intro';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import * as AppActions from '../../../@Redux/actions/appActions';
import PropTypes from 'prop-types';
import { DEVICE_WIDTH } from '../../../@Utils/helperFiles/DeviceInfoExtractor';
import { DEVICE_HEIGHT } from '../../../@Utils/helperFiles/DeviceInfoExtractor';

const AppIntroScreen = ({...props}) =>{

    const {updateIntroScreenStatus,navigation} = props;

    const slides = [
        {
            headerText: 'Creator\'s One Stop Solution',
            content : 'First Ever Professional Network & E-commerce Marketplace for Creators, Art Lovers & Businesses!',
            asset : require('../../../assets/intro/intro1.svg'),
            back : require('../../../assets/intro/back1.svg'),
            front : require('../../../assets/intro/front1.svg'),
            id:1
        },
        {
            headerText: 'Professional Page',
            content : 'Explore, Connect and Showcase Creative Portfolio!',
            asset: require('../../../assets/intro/intro2.svg'),
            back : require('../../../assets/intro/back2.svg'),
            front : require('../../../assets/intro/front2.svg'),
            id:2
        },
        {
            headerText: 'Marketplace for Creatives',
            content : 'Buy & Sell Products, Services Through Spenowr Marketplace & Earn Through Rewards!',
            asset : require('../../../assets/intro/intro3.png'),
            back : require('../../../assets/intro/back3.svg'),
            front : require('../../../assets/intro/front3.svg'),
            id:3
        },
        {
            headerText: 'Job Opportunities',
            content : 'Look for Jobs or Hire Creative Professionals! Find Art Trainers, Art Schools or Businesses in your neighborhood.',
            asset : require('../../../assets/intro/intro4.png'),
            back : require('../../../assets/intro/back4.svg'),
            front : require('../../../assets/intro/front4.svg'),
            id:4
        },
        {
            headerText: 'Contest & Rewards',
            content : 'Participate in Contests & Earn Through Rewards!',
            asset : require('../../../assets/intro/intro5.svg'),
            back : require('../../../assets/intro/back5.svg'),
            front : require('../../../assets/intro/front5.svg'),
            id:5
        }
    ];

    const renderNextButton = () => {
        return (
            <View style={styles.nextButton}>
                <Icon color={'#fff'} name='chevron-right' size={18} />
            </View>
        );
    };
      
    const renderDoneButton = () => {
        return (
            <View style={styles.nextButton}>
                <Icon color={'#fff'} name='check' size={18} />
            </View>
        );
    };

    const introCompleted = () =>{
        updateIntroScreenStatus(false);
        navigation.replace('Landing');
    };

    const getSlide = (item) =>{
        const {
            headerText,
            content,
            asset,
            back,
            front,
            id
        } = item;
        return(
            <View style={styles.slideContainer}>
                <View style={styles.imageContainer}>
                    <Image resizeMode={'contain'} source={asset}  style={styles.imageSet} />
                </View>
                <View style={styles.sliderBodyContainer}>
                    <ImageBackground source={back} style={{width:DEVICE_WIDTH,height:DEVICE_HEIGHT/2}}>
                        <ImageBackground source={front} style={{width:DEVICE_WIDTH,height:DEVICE_HEIGHT/2,alignItems:'center',justifyContent:'center'}}>
                            <Text style={[styles.headerText,id === 2 && {color:'#000'}]}>{headerText}</Text>
                            <Text style={[styles.content,id === 2 && {color:'#000'}]}>{content}</Text>
                        </ImageBackground>
                    </ImageBackground>
                    
                </View>
            </View>
        );
    };

    return(
        <SafeAreaView style={[GlobalStyles.GlobalContainer,styles.containerWrapper]}>
            <SliderIntro
                animatedDotBackgroundColor={'#fff'}
                data={slides}
                dotWidth={10}
                fixDotBackgroundColor={'rgba(0,0,0,0.27)'}
                fixDotOpacity={1}
                navContainerMaxSizePercent={0.3}
                navigationBarHeight={150}
                onDone={()=>introCompleted()}
                onSkip={()=>introCompleted()}
                renderDoneButton={renderDoneButton}
                renderItem={(item,i)=>getSlide(item,i)}
                renderNextButton={renderNextButton}
            />
        </SafeAreaView>
    );
};

AppIntroScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
    updateIntroScreenStatus: PropTypes.func.isRequired,
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProp = (dispatch) => ({
    updateIntroScreenStatus: isActive =>
        dispatch(AppActions.updateIntroScreenStatus(isActive)),
});

export default connect(mapStateToProps, mapDispatchToProp)(AppIntroScreen);