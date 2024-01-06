/**
 *  Created By @name Sukumar_Abhijeet
 */

import QUOTES from '@Assets/JsonFiles/Quotes/quotes.js';
const {quotes} = QUOTES;
const GetWritingImages = (imageType,imageThemeNumber) =>{
    let imgObj = null;
    if(imageType === 'vertical')
        imgObj =  quotes[0].quoteVerticalImage.find(x=>x.value === imageThemeNumber);
    if(imageType === 'horizontal')
        imgObj =  quotes[1].quoteHorizontalImage.find(x=>x.value === imageThemeNumber);

    return imgObj;
};
export default GetWritingImages;
