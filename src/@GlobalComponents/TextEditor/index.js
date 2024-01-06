import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import {
    actions,
    RichEditor,
    RichToolbar,
    defaultActions
} from 'react-native-pell-rich-editor';
import Config from '@Config/default';
import { GlobalStyles } from '../../@GlobalStyles';
import { moderateScale } from 'react-native-size-matters';
import HTML from 'react-native-render-html';
// import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';

const { COLOR: { SUBNAME, APP_PINK_COLOR } } = Config;

const EditorScreen = ({ showPreview = true, getContent, setContent = '' }) => {
    // const strikethrough = require('@Assets/svgs/arrow-right.svg'); //icon for strikethrough
    // const video = require('@Assets/svgs/bell.svg'); //icon for Addvideo
    const RichText = useRef(); //reference to the RichEditor component
    const [article, setArticle] = useState(setContent);
    const [selectedFile, setSelectedFile] = useState('');
    const initHTML = setContent;
    useEffect(() => {
      setArticle(setContent);
    }, [setContent, initHTML]);

    // this function will be called when the editor has been initialized
    function editorInitializedCallback() {
        RichText.current?.registerToolbar(function (items) {
            // items contain all the actions that are currently active
            console.log(
                'Toolbar click, selected items (insert end callback):',
                items
            );
        });
    }

    const chooseFile = () => {
        // var options = {
        //     title: 'Select Image',

        //     storageOptions: {
        //         skipBackup: true,
        //         path: 'images',
        //     },
        // };
        // ImagePicker.showImagePicker(options, response => {

        //     if (response.didCancel) {
        //         Toast.show('Picking Image is cancelled');
        //     } else if (response.error) {
        //         Toast.show('Picking Image encountered some error');
        //     } else if (response.customButton) {
        //         Toast.show('Picking Image encountered some error');
        //     } else {
        //         setSelectedFile(response);
        //         onPressAddImage(response);
        //     }
        // });
    };

    // function onPressAddImage(imgObj) {
    //     const uri = Platform.OS === 'android' ? imgObj.uri : imgObj.uri.replace('file://', '');
    //     // you can easily add images from your gallery
    //     RichText.current?.insertImage(imgObj.origURL);
    // }

    // Callback after height change
    function handleHeightChange(height) {
        // console.log("editor height change:", height);
    }

    function insertVideo() {
        // you can easily add videos from your gallery
        RichText.current?.insertVideo(
            'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4'
        );
    }

    
    return (
        <ScrollView style={styles.container}>
            <Text style={GlobalStyles.inputHeaderName}>ARTICLE DESCRIPTION
                <Text style={GlobalStyles.starColor}>*</Text>
            </Text>
            {/* <RichEditor
                containerStyle={styles.editor}
                disabled={false}
                editorInitializedCallback={editorInitializedCallback}
                initialContentHTML={initHTML}
                onChange={(text) => { setArticle(text), getContent(text); }}
                onHeightChange={handleHeightChange}
                placeholder={'Enter Description Here'}
                ref={RichText}
                style={styles.rich}
            /> */}
            {/* <RichToolbar
                actions={[
                    // 'insertVideo',
                    // actions.insertImage,
                    ...defaultActions,
                    actions.heading1,
                    actions.undo,
                ]}
                disabled={false}
                disabledIconTint={APP_PINK_COLOR}
                editor={RichText}
                iconMap={{
                    [actions.heading1]: ({ tintColor }) => (
                        <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
                    ),
                    // [actions.setStrikethrough]: strikethrough,
                    // ['insertVideo']: video,
                }}
                iconSize={15}
                iconTint={APP_PINK_COLOR}
                // insertVideo={insertVideo}
                // onPressAddImage={chooseFile}
                // map icons for self made actions
                selectedIconTint={'pink'}
                style={[styles.richBar]}
            />
            {
                (showPreview && article !== '') &&
                <>
                    <Text style={GlobalStyles.inputHeaderName}>PREVIEW</Text>
                    <View style={styles.previewBox}>
                        <HTML html={article} />
                    </View>
                </>
            } */}
        </ScrollView>
    );
};


EditorScreen.propTypes = {
    getContent: PropTypes.func.isRequired,
    setContent: PropTypes.string,
    showPreview: PropTypes.bool.isRequired,
};


export default EditorScreen;

const styles = StyleSheet.create({
    a: {
        fontWeight: 'bold',
        color: 'purple',
    },
    div: {
        fontFamily: 'monospace',
    },
    p: {
        fontSize: 30,
    },
    container: {
        flex: 1
    },
    editor: {
        borderColor: SUBNAME,
        borderWidth: 1,
        borderRadius: moderateScale(4)
    },
    rich: {
        minHeight: 300,
        flex: 1,
        marginTop: moderateScale(10)
    },
    richBar: {
        height: moderateScale(40),
        marginTop: moderateScale(5),
        borderRadius: moderateScale(4)
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    tib: {
        textAlign: 'center',
        color: '#515156',
    },
    previewBox: {
        marginVertical: moderateScale(10),
        borderColor: SUBNAME,
        borderWidth: 1,
        padding: moderateScale(8),
        borderRadius: moderateScale(4)
    }
});