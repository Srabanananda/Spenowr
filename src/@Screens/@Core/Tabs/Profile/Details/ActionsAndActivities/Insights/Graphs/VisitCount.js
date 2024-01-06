/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,Text} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Config from '../../../../../../../../@Config/default';

const {COLOR:{DARKGRAY}} = Config;

import {
    LineChart,
} from 'react-native-chart-kit';
import { connect } from 'react-redux';

const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 1,
    fillShadowGradient:'rgba(134, 65, 244)',
    fillShadowGradientOpacity:1,
    color: (opacity = 1) => DARKGRAY,
    strokeWidth: 1.5,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    propsForVerticalLabels:{
        fontSize:moderateScale(9)
    }
};

const VisitCountGraph = ({...props}) =>{

    const {visitData} = props;
    
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
            {
                data: visitData,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2
            }
        ],
        legend: ['Visit Counts']
    };
    

    return(
        <View style={{margin:moderateScale(10),backgroundColor:'#fff',padding:moderateScale(10)}}>
            {
                visitData.length ? 
                    <LineChart
                        bezier
                        chartConfig={chartConfig}
                        data={data}
                        height={256}
                        width={moderateScale(325)}
                    />
                    : <Text>No Insights Available</Text>
            }
        </View>
    );
};

const mapStateToProps =(state) =>{
    return {
        visitData : state.userObj.userInsights.viewCounter
    };
};

export default connect(mapStateToProps)(VisitCountGraph);