/**
 *  Created By @name Sukumar_Abhijeet
 */
import React,{useState} from 'react';
import {View} from 'react-native';
import Icon  from 'react-native-vector-icons/FontAwesome5';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import ReportPost from './ReportPost';

type MoreOptionProps = {
    reportParams : Object
};

const MoreOptions = ({...props}:MoreOptionProps) =>{

    const {reportParams, VoteforPost, isVoted, postType} = props;

    const [show, setShow] = useState(false);

    const options = (isVoted === '0' && (postType == 'gallery' || postType == 'Quote')) ? [{name : 'Report'},{name : 'Vote For the Post'}] : [{name : 'Report'}];

    const checkSelected = selected => {
        switch (selected) {
        case 0:
            setShow(true);
            break;
        case 1:
            VoteforPost()
            break;
        default:
            break;
        }
    };

    const renderOptions = () => {
        return(
            <View>
                <Menu onSelect={checkSelected}>
                    <MenuTrigger text={ <Icon name={'ellipsis-v'} size={20} />} />
                    <MenuOptions>
                        {
                            options.map(({name},i)=>(
                                <View style={{height: 40, justifyContent: 'center'}}>
                                    <MenuOption key={i} text={name} value={i} />
                                </View>
                            ))
                        }
                    </MenuOptions>
                </Menu>  
                <ReportPost reportParams={reportParams} setShow={setShow} show={show} />
            </View>
        );
    };

    return(
        <View>
            {renderOptions()}
        </View>
    );
};

export default MoreOptions;