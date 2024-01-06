import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import { addRemoveContestVote } from '../../../@Endpoints/Core/Tabs/More';
import { GlobalStyles } from '../../../@GlobalStyles';
import Config from '@Config/default';

const {COLOR:{APP_PINK_COLOR,WHITE}} = Config;

const VoteOptions = ({details,refreshData}:any) => {

    const {
        photo_details:{
            media_id = ''
        },
        contest_is_active = '0',
        login_vote_count = 0,
        voted_id = '',
    } = details;
    
    const showVote = contest_is_active === 1 && login_vote_count === 0;
    const showRevoke = contest_is_active === 1 && login_vote_count === 1 && voted_id === media_id;

    const [loading, setLoading] = useState(false);

    const onVoteChange = () => {
        setLoading(true);
        addRemoveContestVote(login_vote_count,media_id)
            .then(()=>{
                refreshData?.();
            })
            .catch(()=>Toast.show('Oops Something Went Wrong'))
            .finally(()=>setLoading(false));
    };
    if(contest_is_active!==1) return<></>;
    if(showVote)
        return(
            <>
                <TouchableOpacity disabled={loading}  onPress={onVoteChange} style={[{backgroundColor:'white'}, GlobalStyles.seeMoreButtonRev]}>
                    {!loading && <Text style={[ GlobalStyles.seeMoreButtonTextRev,{alignSelf:'center'} ]}>{'Vote This'}</Text>}
                    {loading && <ActivityIndicator color={WHITE} size={'small'} />}
                </TouchableOpacity>
            </>
        );
    if(showRevoke)
        return(
            <>
                <TouchableOpacity disabled={loading}  onPress={onVoteChange} style={[{backgroundColor:'white'},GlobalStyles.seeMoreButton]}>
                    {!loading && <Text style={[GlobalStyles.seeMoreButtonText,{alignSelf:'center'} ]}>{'Revoke Vote'}</Text>}
                    {loading && <ActivityIndicator color={APP_PINK_COLOR} size={'small'} />}
                </TouchableOpacity>
            </>
        );
    return <></>;

};
export default VoteOptions;