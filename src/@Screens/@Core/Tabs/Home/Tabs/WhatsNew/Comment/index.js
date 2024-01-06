/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, Text, View, ScrollView, Keyboard, ActivityIndicator, StatusBar, Platform } from 'react-native';
import styles from '../styles';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../../../../@GlobalComponents/ModalHeader';
import {
    addArticleComments, addGalleryComments, addQuoteComments,
    getGalleryComments, getQuoteComments, getArticleComments,
    addProductComments, addServiceComments, getProductComments,
    getServiceComments,
    addContestComments,
    getContestComments,
    getJobsComments
} from '../../../../../../../@Endpoints/Core/Tabs/Home';
import ScreenLoader from '../../../../../../../@GlobalComponents/ScreenLoader';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import { moderateScale } from 'react-native-size-matters';
import { useStore } from 'react-redux';
import Commenters from '../../../../../../../@GlobalComponents/Commenters/Commenters';
import DefaultButton from '../../../../../../../@GlobalComponents/DefaultButton';
import { addModuleComment } from '../../../../../../../@Endpoints/Core/Tabs/More';
import { connect } from 'react-redux';

import useKeyboard from '../../../../../../../@Utils/customHooks/useKeyboard';

const Comments = ({ info, refreshCommentCount, refreshCount }) => {

    const store = useStore();
    const { userObj: { userProfile: { user_id } } } = store.getState();

    const { type, module_id } = info;

    const [isActive, setIsActive] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [loader, setLoader] = useState(true);
    const [internalLoader, setInternalLoader] = useState(false);
    const [commentLoader, setCommentLoader] = useState(false);
    const [totalComments, setTotalComments] = useState(0);
    const [liveComment, setLiveComment] = useState('');

    const isCommentBoxFocused = useRef(false);

    const {
        isKeyboardVisible,
    } = useKeyboard();

    useEffect(() => {
        if (isActive)
            loadComments();
    }, [isActive]);

    const addComment = () => {
        if (liveComment === '') Toast.show('Please write a comment', Toast.LONG);
        else {
            Keyboard.dismiss();
            setCommentLoader(true);
            switch (type) {
                case 'Quote':
                    quoteComment();
                    break;

                case 'gallery':
                    galleryComment();
                    break;

                case 'article':
                    articleComment();
                    break;

                case 'service':
                    serviceComments();
                    break;

                case 'product':
                    productComment();
                    break;

                case 'contest':
                    contestComment();
                    break;

                case 'jobs':
                    jobComment();
                    break;

                default:
                    galleryComment();
                    break;
            }
        }
    };

    const galleryComment = () => {
        addGalleryComments(module_id, user_id, liveComment)
            .then(() => {
                setCommentLoader(false);
                setLiveComment('');
                loadComments();
                refreshCommentCount();
            })
            .catch(() => {
                setCommentLoader(false);
            });
    };

    const productComment = () => {
        addProductComments(module_id, user_id, liveComment)
            .then(() => {
                setCommentLoader(false);
                setLiveComment('');
                loadComments();
                refreshCommentCount();
            })
            .catch(() => {
                setCommentLoader(false);
            });
    };

    const contestComment = () => {
        addContestComments(module_id, user_id, liveComment)
            .then(() => {
                setCommentLoader(false);
                setLiveComment('');
                loadComments();
                refreshCommentCount();
            })
            .catch(() => {
                setCommentLoader(false);
            });
    };

    const jobComment = () => {
        addModuleComment(user_id, module_id, liveComment, type)
            .then(() => {
                setCommentLoader(false);
                setLiveComment('');
                loadComments();
                refreshCommentCount();
            })
            .catch(() => {
                setCommentLoader(false);
            });
    };

    const serviceComments = () => {
        addServiceComments(module_id, user_id, liveComment)
            .then(() => {
                setCommentLoader(false);
                setLiveComment('');
                loadComments();
                refreshCommentCount();
            })
            .catch(() => {
                setCommentLoader(false);
            });
    };

    const quoteComment = () => {
        addQuoteComments(module_id, user_id, liveComment)
            .then(() => {
                setCommentLoader(false);
                setLiveComment('');
                loadComments();
                refreshCommentCount();
            })
            .catch(() => {
                setCommentLoader(false);
            });
    };

    const articleComment = () => {
        addArticleComments(module_id, user_id, liveComment)
            .then(() => {
                setCommentLoader(false);
                setLiveComment('');
                loadComments();
                refreshCommentCount();
            })
            .catch(() => {
                setCommentLoader(false);
            });
    };

    const loadComments = (skip = 0) => {
        switch (type) {
            case 'Quote':
                viewQuotesComment(skip);
                break;

            case 'gallery':
                viewGalleryComment(skip);
                break;

            case 'article':
                viewArticleComment(skip);
                break;

            case 'product':
                viewProductComment(skip);
                break;

            case 'service':
                viewServiceComment(skip);
                break;

            case 'contest':
                viewContestComment(skip);
                break;

            case 'jobs':
                viewJobsComment(skip);
                break;

            default:
                viewGalleryComment(skip);
                break;
        }
    };

    const viewProductComment = (skip = 0) => {
        setInternalLoader(true);
        getProductComments(module_id, skip)
            .then(res => {
                const { data: { productComments = [], totalComment = 0 } } = res;
                setCommentList(skip ? [...commentList, ...productComments] : productComments);
                setTotalComments(totalComment);
            })
            .catch()
            .finally(() => {
                setLoader(false);
                setInternalLoader(false);
            });
    };

    const viewServiceComment = (skip = 0) => {
        setInternalLoader(true);
        getServiceComments(module_id, skip)
            .then(res => {
                const { data: { serviceComments = [], totalComment = 0 } } = res;
                setCommentList(skip ? [...commentList, ...serviceComments] : serviceComments);
                setTotalComments(totalComment);
            })
            .catch()
            .finally(() => {
                setLoader(false);
                setInternalLoader(false);
            });
    };

    const viewContestComment = (skip = 0) => {
        setInternalLoader(true);
        getContestComments(module_id, user_id, skip)
            .then(res => {
                const { data: { contestComment = [], totalComment = 0 } } = res;
                setCommentList(skip ? [...commentList, ...contestComment] : contestComment);
                setTotalComments(totalComment);
            })
            .catch()
            .finally(() => {
                setLoader(false);
                setInternalLoader(false);
            });
    };

    const viewJobsComment = (skip = 0) => {
        setInternalLoader(true);
        getJobsComments(module_id, type, skip, 10)
            .then(res => {
                const { data: { commentListData = [], totalComment = 0 } } = res;
                setCommentList(skip ? [...commentList, ...commentListData] : commentListData);
                setTotalComments(totalComment);
            })
            .catch()
            .finally(() => {
                setLoader(false);
                setInternalLoader(false);
            });
    };

    const viewGalleryComment = (skip = 0) => {
        setInternalLoader(true);
        getGalleryComments(module_id, skip)
            .then(res => {
                const { data: { artworkComment = [], totalComment = 0 } } = res;
                setCommentList(skip ? [...commentList, ...artworkComment] : artworkComment);
                setTotalComments(totalComment);
            })
            .catch()
            .finally(() => {
                setLoader(false);
                setInternalLoader(false);
            });
    };

    const viewQuotesComment = (skip = 0) => {
        setInternalLoader(true);
        getQuoteComments(module_id, skip)
            .then(res => {
                const { data: { quoteComment = [], totalComment = 0 } } = res;
                setCommentList(skip ? [...commentList, ...quoteComment] : quoteComment);
                setTotalComments(totalComment);
            })
            .catch()
            .finally(() => {
                setLoader(false);
                setInternalLoader(false);
            });
    };

    const viewArticleComment = (skip = 0) => {
        setInternalLoader(true);
        getArticleComments(module_id, skip)
            .then(res => {
                skip ? setInternalLoader(false) : setLoader(false);
                const { data: { articleComment = [], totalComment = 0 } } = res;
                setCommentList(skip ? [...commentList, ...articleComment] : articleComment);
                setTotalComments(totalComment);
            })
            .catch()
            .finally(() => {
                setLoader(false);
                setInternalLoader(false);
            });
    };

    const refreshComments = () => loadComments();

    const renderData = () => {
        if (!loader && commentList.length) {
            return (
                <ScrollView contentContainerStyle={{ paddingBottom: moderateScale(80) }} showsVerticalScrollIndicator={false}>
                    {
                        commentList.map((item, index) => {
                            return (
                                <Commenters
                                    comments={item}
                                    deactivateModal={setIsActive}
                                    key={index}
                                    refresh={refreshComments}
                                    type={type}
                                    refreshCount={refreshCount}
                                />
                            );
                        })
                    }
                    {
                        totalComments - commentList.length > 0 ?
                            <DefaultButton
                                buttonStyle={{ alignSelf: 'center' }}
                                buttonText={'Load More'}
                                onPress={() => loadComments(commentList.length)}
                                showLoader={internalLoader}
                                type={'outline'}
                            />
                            : null
                    }
                </ScrollView>
            );
        }
        if (!loader && !commentList.length) return <Text style={styles.noComments}>No Comments Yet</Text>;
        return <ScreenLoader text={'Loading Comments..'} />;
    };

    const renderCommentView = () => {
        return (
            // <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.modalContainer}>
                {Platform.OS === 'ios' ? null : <StatusBar hidden />}
                <ModalHeader headerText={'Comments'} onPress={() => setIsActive(false)} />
                {renderData()}
                <View style={styles.commentBox}>
                    <TextInput
                        onBlur={() => isCommentBoxFocused.current = false}
                        onChangeText={(str) => setLiveComment(str)}
                        onFocus={() => isCommentBoxFocused.current = true}
                        onSubmitEditing={() => addComment()}
                        placeholder={'Write a comment'}
                        returnKeyLabel={'done'}
                        style={styles.inputBox}
                        value={liveComment}

                    />
                    <TouchableOpacity onPress={() => addComment()} style={styles.sendButton}>
                        {commentLoader && <ActivityIndicator color={'#fff'} size={'small'} />}
                        {!commentLoader && <Icon color={'#fff'} name={'arrow-right'} size={moderateScale(20)} />}
                    </TouchableOpacity>
                </View>
            </View>
            // </ScrollView>
        );
    };

    const getBottomHeight = () => {

        const willShowCommentBox = isCommentBoxFocused.current && isKeyboardVisible;

        if (Platform.OS === 'ios') return {
            bottom: 0
        };
        return willShowCommentBox ? {
            bottom: moderateScale(1)
        } : {
            justifyContent: 'flex-end',
        };
    };

    return (
        <>
            <TouchableOpacity onPress={() => setIsActive(true)} style={styles.actionBox}>
                <Text style={styles.actionText}>Comment</Text>
            </TouchableOpacity>
            <Modal
                backdropColor={'#000'}
                dismissable={true}
                hasBackdrop={true}
                isVisible={isActive}
                onBackButtonPress={() => {
                    setIsActive(false);
                }}
                onBackdropPress={() => {
                    setIsActive(false);
                }}
                style={[{ margin: 0, padding: 0, position: 'absolute', width: '100%' }, getBottomHeight()]}
                useNativeDriver={true}
            >
                {renderCommentView()}
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userName: state.userObj.userProfile.first_name
    };
};

export default connect(mapStateToProps)(Comments);