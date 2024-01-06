/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import {View,ScrollView,StyleSheet,TouchableOpacity,Image} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';

type BackgroundImagesProps = {
    BACKGROUNDS : Array,
    onImageChange : Function
};
 
const BackgroundImages = ({...props} : BackgroundImagesProps) =>{

    const {BACKGROUNDS,onImageChange, isLimitCrossed} = props;
    const limitReached = () => Toast.show('Given text Reached the Maximum character Limit')
    return(
        <ScrollView
        >
            <View style={styles.imagesWrapper}>
                {
                    BACKGROUNDS.map((each,i) =>
                        <TouchableOpacity key={i} onPress={() => {isLimitCrossed ? limitReached() : onImageChange(each);}}>
                            <View style={styles.selectionView}>
                                <Image
                                    source={each.local_image}
                                    style={{width:null, height:null,flex:1}}
                                />
                            </View>
                        </TouchableOpacity>
                    ) 
                }
            </View>
        </ScrollView>
    );
};
 
export default BackgroundImages;
const styles = StyleSheet.create({
    imagesWrapper:{flexDirection: 'row',flexWrap:'wrap',alignItems:'center',padding:moderateScale(5)},
    selectionView: {
        height: moderateScale(75),
        width: moderateScale(75),
        borderRadius: moderateScale(4),
        overflow:'hidden',
        margin:moderateScale(5),
    },
});