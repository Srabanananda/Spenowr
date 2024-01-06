/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Config from '../../../../../../../../@Config/default';

const {COLOR:{APP_THEME_COLOR}} = Config;

import {
    BarChart,
} from 'react-native-chart-kit';

import { connect } from 'react-redux';

const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => APP_THEME_COLOR,
    fillShadowGradient:'rgba(134, 65, 244)',
    fillShadowGradientOpacity:1,
    strokeWidth: 1.5, 
    barPercentage: 0.6,
    useShadowColorFromDataset: false, 
    propsForVerticalLabels:{
        fontSize:moderateScale(9)
    }
};

 
const ContributionsGraph = ({...props}) =>{

    const {contNames,contDatas} = props;
    const data = {
        labels: contNames,
        datasets: [
            {
                data: contDatas,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, 
                strokeWidth: 2 
            }
        ],
        legend: ['My Contributions'] 
    };


    return(
        <View style={{margin:moderateScale(10),backgroundColor:'#fff',padding:moderateScale(10)}}>
            <BarChart
                chartConfig={chartConfig}
                data={data}
                height={250}
                showValuesOnTopOfBars={true}
                width={moderateScale(320)}
            />
        </View>
    );
};

const mapStateToProps =(state) =>{
    return {
        contNames : state.userObj.userInsights.barGraphNameCounter,
        contDatas : state.userObj.userInsights.barGraphCounter
    };
};

export default connect(mapStateToProps)(ContributionsGraph);