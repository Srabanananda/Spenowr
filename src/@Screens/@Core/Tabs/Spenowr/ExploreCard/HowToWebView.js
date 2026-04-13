import React, { Component } from 'react';

import { WebView } from 'react-native-webview';
import DefaultHeader from '../../../../../@GlobalComponents/DefaultHeader';
import ScreenLoader from '../../../../../@GlobalComponents/ScreenLoader';
import { HIDE_FOOTER } from '../../../../../constants/WebUrls';
import Config from '@Config/default';
import { SafeAreaView } from 'react-native-safe-area-context';

const { SHARABLE_BASE_URL } = Config;

class HowToWebView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    render() {
        const { route } = this.props;
        const {howToSlug} = route.params;

        return (
            <SafeAreaView edges={['left', 'right']} style={{ flex: 1 }}>
                <DefaultHeader headerText={'How to '} />
                <WebView
                    onLoad={() => { this.setState({ loading: false }); }}
                    source={{ uri: SHARABLE_BASE_URL + 'how-to/detail/' + howToSlug + HIDE_FOOTER }}
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

export default HowToWebView;