import ARTNCRAFT from '@Assets/JsonFiles/FilterJsons/productcat_subcat.json';
import DANCE from '@Assets/JsonFiles/FilterJsons/dancecat_subcat.json';
import PHOTOGRAPHY from '@Assets/JsonFiles/FilterJsons/photographycat_subcat.json';
import EXERCISE from '@Assets/JsonFiles/FilterJsons/exercisecat_subcat.json';
import SPORTS from '@Assets/JsonFiles/FilterJsons/sportscat_subcat.json';
import MUSICAL from '@Assets/JsonFiles/FilterJsons/musicalcat_subcat.json';
import SINGING from '@Assets/JsonFiles/FilterJsons/singingcat_subcat.json';
import WRITER from '@Assets/JsonFiles/FilterJsons/writercat_subcat.json';
import MAGIC from '@Assets/JsonFiles/FilterJsons/magiccat_subcat.json';
import ACTOR from '@Assets/JsonFiles/FilterJsons/actorcat_subcat.json';
import QUOTE_POEM from '@Assets/JsonFiles/FilterJsons/quotesPoemscat_subcat.json';
import SCULPTURE from '@Assets/JsonFiles/FilterJsons/sculpcat_subcat.json';
import ILLUSTRATOR from '@Assets/JsonFiles/FilterJsons/illucat_subcat.json';
import CRAFT from '@Assets/JsonFiles/FilterJsons/craftcat_subcat.json';
import THREEDARTIST from '@Assets/JsonFiles/FilterJsons/3d_artistcat_subcat.json';
import AIDESIGNER from '@Assets/JsonFiles/FilterJsons/ai_designer_artistcat_subcat.json';
import OTHERS from '@Assets/JsonFiles/FilterJsons/othercat_subcat.json';

const JsonData =  [{
    'category':[
        ...ARTNCRAFT.category,...MUSICAL.category,...SINGING.category,
        ...DANCE.category,...PHOTOGRAPHY.category,...EXERCISE.category,
        ...SPORTS.category,...WRITER.category,...MAGIC.category,...ACTOR.category,
        ...QUOTE_POEM.category,...SCULPTURE.category,...ILLUSTRATOR.category,...CRAFT.category,...THREEDARTIST.category,...AIDESIGNER.category,...OTHERS.category
    ]
}];

const {category} = JsonData[0];

export const GetCatValue = (cat,returnCatObject=false) =>{
    const catVal = category.find(x=>x.type.value === cat);
    if(catVal) {
        if(returnCatObject) return catVal;
        return catVal.type.label;
    }
    return '';
};

export const GetSubCatValue = (cat,subCat,returnSubCatObj=false) =>{
    const catVal = category.find(x=>x.type.value === cat);
    if(catVal)
    {
        const subcatVal = catVal.type.subcat.find(x=>x.subcatGroup.value === subCat);
        if(subcatVal)
        {
            if(returnSubCatObj)  return subcatVal ; 
            return subcatVal.subcatGroup.label;
        }
        else
            return '';
    }
    else
        return '';
};

export const GetASubCatTypes = (mainSubcat,selected) =>{
    const val = mainSubcat.find((x)=>x.subcatGroup.label === selected);
    if (val) return val;
    return '';
};