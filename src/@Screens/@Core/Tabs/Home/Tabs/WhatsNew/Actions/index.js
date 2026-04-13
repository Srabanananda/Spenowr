import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import ReportPost from './ReportPost';

type MoreOptionProps = {
    reportParams: Object,
    VoteforPost: () => void,
    isVoted: string,
    postType: string,
};

const MoreOptions = React.memo(({ reportParams, VoteforPost, isVoted, postType }: MoreOptionProps) => {
    const [show, setShow] = useState(false);

    // Define options based on conditions
    const options = useCallback(() => {
        return (isVoted === '0' && (postType === 'gallery' || postType === 'Quote'))
            ? [{ name: 'Report' }, { name: 'Vote For the Post' }]
            : [{ name: 'Report' }];
    }, [isVoted, postType]);

    // Handle menu option selection
    const checkSelected = useCallback((selected: number) => {
        switch (selected) {
            case 0:
                setShow(true);
                break;
            case 1:
                VoteforPost();
                break;
            default:
                break;
        }
    }, [VoteforPost]);

    return (
        <View>
            <Menu onSelect={checkSelected}>
                <MenuTrigger>
                    <Icon name={'ellipsis-v'} size={20} />
                </MenuTrigger>
                <MenuOptions>
                    {options().map(({ name }, index) => (
                        <View style={styles.optionContainer} key={index}>
                            <MenuOption text={name} value={index} />
                        </View>
                    ))}
                </MenuOptions>
            </Menu>
            <ReportPost reportParams={reportParams} setShow={setShow} show={show} />
        </View>
    );
});

const styles = StyleSheet.create({
    optionContainer: {
        height: 40,
        justifyContent: 'center',
    },
});

export default MoreOptions;
