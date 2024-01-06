/**
 *  Created By @name Sukumar_Abhijeet
 */

export const getContestButtonText = (status) =>{
    switch (status) {
    case '1':
        return 'Remove from contest';
    // case '1':
    //     return 'Participated in contest';
    case 5:
        return 'Submit To Contest';
    default:
        return '';
    }
};

export const isContestButtonDisabled = (status) =>{
    switch (status) {
    case '1':
        return true;
    case 5:
        return false;
    default:
        return false;
    }
};