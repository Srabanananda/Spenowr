/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import FallBackUI from '../../@GlobalComponents/FallBackUI';

const ErrorController = (children) =>{
    return(
        <ErrorBoundary FallbackComponent={FallBackUI} >
            {children}
        </ErrorBoundary>
    );
};

export default ErrorController;