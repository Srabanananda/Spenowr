import React, { Component } from 'react';

import { WebView } from 'react-native-webview';
import DefaultHeader from '../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../@GlobalComponents/ScreenLoader';
import { SafeAreaView } from 'react-native-safe-area-context';

class WebViewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    render() {
        const { route } = this.props;
        const {URI,ScreenTitle} = route.params;

        return (
            <SafeAreaView edges={['left', 'right']} style={{ flex: 1 }}>
                <DefaultHeader headerText={ScreenTitle} />
                <WebView
                    onLoad={() => { this.setState({ loading: false }); }}
                    source={{ uri: URI }}
                />
                {
                    this.state.loading && (
                        <ScreenLoader text={'Loading Please Wait'} />
                    )
                }

            </SafeAreaView>
        );
    }
}

export default WebViewScreen;