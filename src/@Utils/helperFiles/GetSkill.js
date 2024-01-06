/**
 *  Created By @name Sukumar_Abhijeet
 */


import ARTNCRAFT from '@Assets/JsonFiles/FilterJsons/productcat_subcat.json';
import DANCE from '@Assets/JsonFiles/FilterJsons/dancecat_subcat.json';
import PHOTOGRAPHY from '@Assets/JsonFiles/FilterJsons/photographycat_subcat.json';
import EXERCISE from '@Assets/JsonFiles/FilterJsons/exercisecat_subcat.json';
import SPORTS from '@Assets/JsonFiles/FilterJsons/sportscat_subcat.json';
import MUSICAL from '@Assets/JsonFiles/FilterJsons/musicalcat_subcat.json';
import SINGING from '@Assets/JsonFiles/FilterJsons/singingcat_subcat.json';

const AllCategories =  [{
    'category':[
        ...ARTNCRAFT.category,...MUSICAL.category,...SINGING.category,
        ...DANCE.category,...PHOTOGRAPHY.category,...EXERCISE.category,
        ...SPORTS.category
    ]
}];

const CategoryList = AllCategories[0].category;

export const getSkill = skill =>{
    if(skill === '' || skill === null) skill = '{}';
    const selected = JSON.parse(skill.toString());
    return CategoryList.find(x=>x.type.value === selected.cat);
};