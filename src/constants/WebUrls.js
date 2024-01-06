
import Config  from '@Config/default';
const {SHARABLE_BASE_URL} = Config;

export const HIDE_FOOTER = '?source=mobileapp&pwd=390b89dbbdf3171a31bfad90ab9b54db';
export const WEB_URLS = {
    data_policy : `${SHARABLE_BASE_URL}data-policy${HIDE_FOOTER}`,
    faq: `${SHARABLE_BASE_URL}faq${HIDE_FOOTER}`,
    how_to : `${SHARABLE_BASE_URL}how-to${HIDE_FOOTER}`,
    terms_n_conditions : `${SHARABLE_BASE_URL}terms-conditions${HIDE_FOOTER}`,
    about_us : `${SHARABLE_BASE_URL}about-us${HIDE_FOOTER}`,
    contest_rules : `${SHARABLE_BASE_URL}how-to/detail/ios-contest-terms${HIDE_FOOTER}`,
};