
import JOB_JSON from '../../assets/JsonFiles/Jobs/categories.json';

const {category : CATEGORIES} = JOB_JSON;

const formDropDownList = (ARR,OBJECT) => {
    return ARR.map((cat)=>{
        const {label} = OBJECT[cat];
        let obj = {};
        obj.value = label;
        obj.name = cat;
        return obj;
    });
};

export const getJobCategoriesList = () =>{
    const CAT_ARR = Object.keys(CATEGORIES);
    return formDropDownList(CAT_ARR,CATEGORIES);
};

export const getJobSubCategoryList  = cat => {
    const {subcat} = CATEGORIES[cat];
    const SUB_CAT_ARR = Object.keys(subcat);
    return formDropDownList(SUB_CAT_ARR,subcat);
};

