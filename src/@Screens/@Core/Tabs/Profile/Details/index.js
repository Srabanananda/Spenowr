/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import FallBackUI from '../../../../../@GlobalComponents/FallBackUI';
import ArtLovers from './Accounts/ArtLover';
import ContactInfo from './ContactInfo';
import InfoCard from './InfoCard';
import Logout from './Logout';
import PropTypes from 'prop-types';
import ProfileActions from './ProfileActions';

const Details = ({userObj,profileData}) =>{
    const {
        userProfile:{
            account_type ,
            mobile,
            email,
        }
    } = userObj;

    if(account_type === '4')
        return(
            <>
                <ErrorBoundary FallbackComponent={FallBackUI}>
                    <ArtLovers mode={'PRIVATE'} />
                </ErrorBoundary>
                <ErrorBoundary FallbackComponent={FallBackUI}>
                    <Logout />
                </ErrorBoundary>
            </>
        );

    return(
        <>
            <ErrorBoundary FallbackComponent={FallBackUI}>
                <InfoCard data={profileData} mode={'PRIVATE'} />
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={FallBackUI}>
                <ProfileActions mode={'PRIVATE'} />
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={FallBackUI}>
                <ContactInfo mode={'PRIVATE'} />
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={FallBackUI}>
                <Logout />
            </ErrorBoundary>
        </>
    );
};


Details.propTypes = {
    profileData: PropTypes.object,
    userObj:PropTypes.object.isRequired,
};

export default Details;