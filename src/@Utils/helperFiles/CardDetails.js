/**
 *  Created By @name Sukumar_Abhijeet
 */


import Countries from '../../assets/JsonFiles/country.json';
import USState from '../../assets/JsonFiles/USAState.json';
import INDState from '../../assets/JsonFiles/indiaState.json';

export const getAddress = (country,state,city) =>{
    const selectedCountry = Countries.find(x=>x.country_id === country);
    let selectedState = {value:''};

    if(country === '1') 
        selectedState = INDState.find(x=>x.state_id === state);
    if(country === '2')
        selectedState = USState.find(x=>x.state_id === state);

    return  city ? city +', ' : '' + `${selectedState ? selectedState.value  : ''} ${selectedCountry ? selectedCountry.name : ''}`;
};

export const getCountry = (country) =>{
    const selectedCountry = Countries.find(x=>x.country_id === country);
    return selectedCountry;
};

export const getCountryId = (country) =>{
    const selectedCountry = Countries.find(x=>x.value === country);
    return selectedCountry.country_id;
};

export const getState = (country,state) =>{
    let selectedState = {value:''};
    if(country === '1') 
        selectedState = INDState.find(x=>x.state_id === state);
    if(country === '2')
        selectedState = USState.find(x=>x.state_id === state);
    
    return selectedState;
};

export const getStateId = (country,state) =>{
    let selectedState = '';
    if(country === '1') 
        selectedState = INDState.find(x=>x.value === state);
    else if(country === '2')
        selectedState = USState.find(x=>x.value === state);
    else
        selectedState = {state_id : ''};
    
    return selectedState.state_id;
};

export const getCurrency = (currency) =>{
    switch (currency) {
    case '1':
        return ' ₹ ';
    case '2':
        return ' $ ';
    case '3' :
        return ' € ';
    default:
        return ' ₹ ';
    }
};