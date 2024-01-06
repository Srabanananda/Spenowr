import { moderateScale } from "react-native-size-matters";

export  const getItemLayout = (data, index,eachHeight=300)=> {
    return (
        {
            length: moderateScale(eachHeight),
            offset: moderateScale(eachHeight) * index,
            index
        }
    );
};