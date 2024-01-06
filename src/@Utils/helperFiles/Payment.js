/**
 *  Created By @name Sukumar_Abhijeet
 */

import { GetTokenFromCashFree } from '../../@Endpoints/Core/Payments/index';

export const generateCashFreeToken = async (payload) =>{
    const CASH_FREE_TOKEN_RESPONSE = await GetTokenFromCashFree(payload);
    return CASH_FREE_TOKEN_RESPONSE;
};