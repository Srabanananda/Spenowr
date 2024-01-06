/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, TextInput } from 'react-native';
import Config from '@Config/default';
import { moderateScale } from 'react-native-size-matters';
import moment from 'moment';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import Image from 'react-native-image-progress';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';
import { editComment, deleteComment } from '../../@Endpoints/Core/Tabs/Home';
import { ActivityIndicator } from 'react-native-paper';
import { DEVICE_WIDTH } from '../../@Utils/helperFiles/DeviceInfoExtractor';

const { COLOR: { APP_PINK_COLOR, LIGHTGREY, SUBNAME, APP_THEME_COLOR, DARK_BLACK } } = Config;

const { NEW_IMG_BASE, DEFAULT_PROFILE } = Config;

const Commenters = ({
    comments,
    showDirectDate,
    userId,
    deactivateModal = (() => null),
    customHtmlTextStyles = {},
    refresh,
    type = 'artwork',
    refreshCount,
}) => {

    const navigation = useNavigation();
    const {
        images: image_path,
        name,
        created_date,
        gallery_comment = '',
        description = '',
        attachment_path = '',
        sender_slug = '',
        sender_id = '',
        comment = '',
        media_id = '',
        id = '',
        review_id = '',
    } = comments;

    const commentID = id || review_id;

    const slgs = sender_slug.split('/');

    const [showEdit, setShowEdit] = useState(false);
    const [commentText, setCommentText] = useState(description || gallery_comment || comment);
    const [showActionLoader, setActionLoader] = useState(false);

    const edit = () => {
        if (commentText === '') {
            Toast.show('comment cannot be empty');
            return;
        }
        setActionLoader(true);
        editComment(media_id, commentID, type, commentText)
            .then(() => refresh?.(type))
            .catch(() => Toast.show('Something went wrong'))
            .finally(() => {
                setActionLoader(false);
                setShowEdit(false);
            });
    };

    const deleteC = () => {
        setActionLoader(true);
        deleteComment(media_id, commentID, type)
            .then(() => refresh?.(type),refreshCount())
            .catch(() => Toast.show('Something went wrong'))
            .finally(() => setActionLoader(false)
            );
    };

    const checkActions = type => {
        if (showEdit) {
            if (type === 'edit') setShowEdit(false);
            else edit();
        }
        else {
            if (type === 'edit') {
                setShowEdit(true);
            }
            else deleteC();
        }
    };

    const getIconName = type => {
        if (showEdit) return type === 'delete' ? 'arrow-right' : 'times';
        return type === 'delete' ? 'trash' : 'pen';
    };

    const openAttachment = () => {
        const url = NEW_IMG_BASE + '/' + attachment_path;
        Linking.openURL(url).catch(() => {
            Toast.show('Oops couldnot open External link', Toast.LONG);
        });
    };

    const renderAttachment = () => {
        if (attachment_path === '' || attachment_path === null)
            return null;
        return (
            <TouchableOpacity onPress={() => openAttachment()} style={styles.attachment}>
                <Icon color={'#fff'} name={'paperclip'} size={moderateScale(15)} />
            </TouchableOpacity>
        );
    };

    const renderCommentActions = (type = 'delete') => {
        return (
            <TouchableOpacity disabled={showActionLoader} onPress={() => checkActions(type)} style={styles.attachment}>
                {
                    type === 'spin' ? <ActivityIndicator color={'red'} size={'small'} />
                        :
                        <Icon color={'#fff'} name={getIconName(type)} size={moderateScale(12)} />
                }
            </TouchableOpacity>
        );
    };

    const checkNavigation = () => {
        deactivateModal();
        if (userId === sender_id) navigation.navigate('Profile');
        else navigation.push('PublicProfile', { slug: slgs[0] });
    };

    return (
        <View style={{ marginVertical: moderateScale(8) }}>
            <View style={styles.commentViewWrapper}>
                <TouchableOpacity disabled={sender_slug === '' || sender_slug === null || sender_slug === undefined} onPress={() => checkNavigation()} style={styles.leftBox}>
                    <View style={styles.imageCircle}>
                        <Image
                            source={{ uri: image_path ? NEW_IMG_BASE + image_path : NEW_IMG_BASE + DEFAULT_PROFILE }}
                            style={{ width: null, height: null, flex: 1 }}
                        />
                    </View>
                    <View style={{ marginLeft: moderateScale(10), width: '80%' }}>
                        <Text style={styles.name}>{name}</Text>
                        {
                            showEdit ?
                                <TextInput
                                    multiline={true}
                                    numberOfLines={5}
                                    onChangeText={(str) => setCommentText(str)}
                                    placeholder={'Write a comment'}
                                    returnKeyLabel={'done'}
                                    style={styles.inputBox}
                                    value={commentText}
                                /> :
                                <View style={[{ maxWidth: moderateScale(280) }, customHtmlTextStyles]}>
                                    <HTML
                                        source={{ html: gallery_comment || description || comment }}
                                    />
                                </View>
                        }
                        <Text style={styles.dateCreated}>{showDirectDate ? created_date : moment(created_date).format('MMMM Do YYYY, h A')}</Text>
                    </View>
                </TouchableOpacity>
                {renderAttachment()}
            </View>
            {
                userId === sender_id ?
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                        {!showActionLoader && renderCommentActions('edit')}
                        {!showActionLoader && renderCommentActions()}
                        {showActionLoader && renderCommentActions('spin')}
                    </View>
                    : null
            }
        </View>
    );
};


Commenters.propTypes = {
    comments: PropTypes.object.isRequired,
    customHtmlTextStyles: PropTypes.object,
    deactivateModal: PropTypes.func.isRequired,
    refresh: PropTypes.func,
    showDirectDate: PropTypes.bool,
    type: PropTypes.string.isRequired,
    userId: PropTypes.PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        userId: state.userObj.userProfile.institute_id
    };
};

export default connect(mapStateToProps)(Commenters);

const styles = StyleSheet.create({
    leftBox: {
        flexDirection: 'row'
    },
    commentViewWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: moderateScale(DEVICE_WIDTH - 80)
    },
    imageCircle: {
        backgroundColor: LIGHTGREY,
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(30),
        borderWidth: 1,
        borderColor: LIGHTGREY,
        overflow: 'hidden'
    },
    name: {
        color: APP_PINK_COLOR,
        fontSize: moderateScale(12),
    },
    dateCreated: {
        color: SUBNAME,
        marginTop: moderateScale(5),
        fontSize: moderateScale(10)
    },
    attachment: {
        width: moderateScale(30),
        height: moderateScale(30),
        borderRadius: moderateScale(20),
        backgroundColor: APP_THEME_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(5)
    },
    inputBox: {
        height: moderateScale(100),
        color: DARK_BLACK,
        backgroundColor: LIGHTGREY,
        borderRadius: moderateScale(6),
        marginTop: moderateScale(5),
        paddingLeft: moderateScale(10),
        width: '100%',
        textAlignVertical: 'top'
    },
});