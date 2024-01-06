/**
 *  Created By @name Ramakanta
 */
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import EachCard from './Card';
import {Text, TouchableRipple} from 'react-native-paper';
import Config from '../../../../../@Config/default';
import {moderateScale} from 'react-native-size-matters';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import ErrorBoundary from 'react-native-error-boundary';
import FallBackUI from '../../../../../@GlobalComponents/FallBackUI';

const {COLOR:{APP_PINK_COLOR}} = Config;

const SliderComponent = ({artist = false, data=[], loading = true, titleText, seeMoreLink}) =>{

    const navigation = useNavigation();
    return(
        <>
            <View style={{...styles.titleBar}}>
                <Text style={{...styles.leftTitle}}>
                    {titleText}
                </Text>
                <TouchableRipple onPress={()=>{
                    navigation.navigate('ViewMoreArtist',{filter: seeMoreLink});
                }}>
                    <Text style={{...styles.seeMoreText}}>
                        See All
                    </Text>
                </TouchableRipple>
            </View>
            {
                loading ?
                    <View style={styles.loader}>
                        <ScreenLoader text={''} />
                    </View>
                    :
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            {
                                data.map((each,i)=> (
                                    <ErrorBoundary FallbackComponent={FallBackUI} key={i}>
                                        <EachCard artist={artist} each={each} filter={seeMoreLink}  />
                                    </ErrorBoundary>
                                ))
                            }
                        </View>
                    </ScrollView>
            }

        </>
    );
};

export default SliderComponent;

const styles = StyleSheet.create({
    leftTitle: {
        fontSize: moderateScale(14),
    },
    seeMoreText: {
        textTransform: 'capitalize',
        fontSize: moderateScale(14),
        color: APP_PINK_COLOR,
        padding: moderateScale(5)
    },
    titleBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginVertical: moderateScale(10)
    },
    loader: {
        height:moderateScale(300),
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});


SliderComponent.propTypes = {
    artist:PropTypes.bool,
    data:PropTypes.array,
    loading:PropTypes.bool,
    seeMoreLink:PropTypes.string.isRequired,
    titleText:PropTypes.string.isRequired
};
