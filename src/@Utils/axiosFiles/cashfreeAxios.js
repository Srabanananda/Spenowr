import Axios from 'axios';
import Config from '@Config/default';

const {CASHFREE_BASE_PATH}  = Config;
export const CashFreeAxios = Axios.create({
    baseURL: CASHFREE_BASE_PATH,
});