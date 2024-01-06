/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Clipboard } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { GlobalStyles } from '../../../../../@GlobalStyles';
import Config from '@Config/default';
import DefaultButton from '../../../../../@GlobalComponents/DefaultButton';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { getMyEmailVerifyLink } from '../../../../../@Endpoints/Core/Tabs/MyAccount';

const {
    COLOR: { APP_PINK_COLOR, SUBNAME }
} = Config;

export const resendEmailLink = () => {
    getMyEmailVerifyLink()
        .then(() => {
            Toast.show('Verification link has been sent to your Email', Toast.LONG);
        })
        .catch(() => {
            Toast.show('Oops couldnot send Verification link', Toast.LONG);

        });
};

const ContactInfo = ({ mode = 'PRIVATE', ...props }) => {
    const { userObj: {
        user: {
            website = '', twitter_url = '', instagram_url = '', facebook_url = '',
            slug_url = '',
        },
        userProfile: {
            email_verify, email = ''
        },
        publicUserData: {
            institute: {
                website: publicWebsite = '',
                twitter_url: publicTwitter = '',
                instagram_url: publicInstagram = '',
                facebook_url: publicFacebook = '',
                slug_url: publicSlugUrl = '',
            } = {}
        }
    }
    } = props;

    const [showAll, setShowAll] = useState(false);

    const getActions = () => [
        { name: 'Email', desc: email, img: require('../../../../../assets/svgs/email.svg'), blub: 'show-verify' },
        { name: 'Spenowr Profile', desc: `https://www.spenowr.com/artist/${mode === 'PRIVATE' ? slug_url : publicSlugUrl}`, img: require('../../../../../assets/tabs/spenowr.svg') },
        { name: 'Website', desc: mode === 'PRIVATE' ? website : publicWebsite, img: require('../../../../../assets/svgs/website.svg') },
        { name: 'Instagram', desc: mode === 'PRIVATE' ? instagram_url : publicInstagram, img: require('../../../../../assets/svgs/insta.svg') },
        { name: 'Facebook', desc: mode === 'PRIVATE' ? facebook_url : publicFacebook, img: require('../../../../../assets/svgs/fb.svg') },
        { name: 'Twitter', desc: mode === 'PRIVATE' ? twitter_url : publicTwitter, img: require('../../../../../assets/svgs/twitter.svg') },
    ];

    const checkAction = (url, index) => {
        if (!index) {
            Clipboard.setString(url);
            Toast.show('Email copied to clipboard');
            return;
        }
        if (url && url !== '')
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(index ? url : `mailto:${url}`);
                } else {
                    Toast.show('Don\'t know how to open URI: ' + url, Toast.SHORT);
                }
            });
    };

    const checkVerifyEmail = () => {
        if (email_verify === '0')
            return <Text style={GlobalStyles.seeMoreButtonText}>  (Not Verified)</Text>;
        else return <Text style={GlobalStyles.seeMoreButtonText}>  (Verified)</Text>;
    };

    const renderEachAction = (item, index) => {
        if ((!showAll && index > 1) || (index === 0 && mode === 'PUBLIC'))
            return null;
        return (
            <TouchableOpacity key={index} onPress={() => checkAction(item.desc, index)} style={styles.actionBox}>
                <Image resizeMode={'contain'} source={item.img} style={index === 1 ? styles.imagesSmall : styles.images} />
                <View style={index === 1 ? { ...styles.borderBox, marginLeft: moderateScale(20) } : styles.borderBox}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.nameText}>{item.name}</Text>
                            {(item.blub && index === 0 && mode === 'PRIVATE') ? checkVerifyEmail() : null}
                        </View>
                        <Text style={styles.descText}>{(item.desc === '' || item.desc === null) ? 'Not available' : item.desc}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        );
    };
    return (
        <View style={{ ...GlobalStyles.primaryCard, marginVertical: moderateScale(8) }}>
            <View style={styles.container}>
                <Text style={styles.detailText}>{mode === 'PRIVATE' ? 'Contact Details' : 'Follow Me'}</Text>
                {
                    getActions().map((item, index) => (
                        renderEachAction(item, index)
                    ))
                }
                {
                    (!showAll) &&
                    <DefaultButton
                        buttonStyle={{ backgroundColor: '#00000000', height: moderateScale(20), paddingVertical: 0 }}
                        buttonText={'SEE ALL'} onPress={() => setShowAll(true)}
                        showLoader={false}
                        textStyle={styles.seeAll}
                    />
                }
            </View>
        </View>
    );
};

ContactInfo.propTypes = {
    mode: PropTypes.string.isRequired,
    userObj: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        userObj: state.userObj,
    };
};

export default connect(mapStateToProps)(ContactInfo);

const styles = StyleSheet.create({
    container: {
        margin: moderateScale(20)
    },
    detailText: {
        fontWeight: '600',
        marginBottom: moderateScale(15)
    },
    actionBox: {
        flexDirection: 'row', alignItems: 'center',
        marginBottom: moderateScale(10)
    },
    images: {
        width: moderateScale(40),
        height: moderateScale(40)
    },
    imagesSmall: {
        width: moderateScale(35),
        height: moderateScale(35)
    },
    borderBox: {
        borderBottomColor: '#F1F1F1',
        borderBottomWidth: 1,
        marginLeft: moderateScale(15),
        paddingBottom: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '82%'
    },
    nameText: {
        color: APP_PINK_COLOR
    },
    seeAll: { color: APP_PINK_COLOR, fontWeight: '500', fontSize: moderateScale(14) },
    descText: {
        color: SUBNAME
    },
});
