import React, {useState } from 'react';

import { WebView } from 'react-native-webview';
import DefaultHeader from '../../../../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../../../../@GlobalComponents/ScreenLoader';
import { SafeAreaView } from 'react-native-safe-area-context';

const SocialWebViewScreen = (props)=> {
    const { route } = props;
    const [loading, setLoading] = useState(true);
    const { url } = route.params;
    console.log('url in webview',url);

    return(
        <SafeAreaView edges={['left', 'right']} style={{flex:1}}>
            <DefaultHeader headerText={'Social Profile'} />
            <WebView
                onLoad={()=>{setLoading(false);}} 
                source={{uri: url}}
            />
            {
                loading && (
                    <ScreenLoader text={'Loading Please Wait'} />
                )
            }
                
        </SafeAreaView>
    );
    
};

export default SocialWebViewScreen;