'use strict';

const countriescontainer = document.querySelector('.countries');
const search = document.querySelector('.btn-country');
const input = document.querySelector('#country');
const inputField = document.querySelector('.input-field');


search.addEventListener('click',function(){
    document.querySelector('.countries').innerHTML= '';
    const getCountry = document.querySelector('#country').value;
    console.log(getCountry);
    getCountries(getCountry);
})
input.addEventListener('keyup',function(event){
    if(event.keyCode ===13){
        document.querySelector('.countries').innerHTML= '';
        const getCountry = document.querySelector('#country').value;
        console.log(getCountry);
        getCountries(getCountry);
    }   
})

function renderCountry(country, className =''){
    console.log(country);
    countriescontainer.insertAdjacentHTML('beforeend',`<article class="country ${className}">
    <img class="country__img" src="${country.flags.png}" />
    <div class="country__data">
    <h3 class="country__name">${country.name}</h3>
    <h4 class="country__region">${country.region}</h4>
    <p class="country__row"><span>👫</span>${country.population}</p>
    <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
    </div>
</article>`)
}

function getCountries(country){
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
        renderCountry(data[0]);
        if(!data[0].borders) return;
        let [code,...codes] = data[0].borders;
        return fetch(`https://restcountries.com/v2/alpha/${code}`);

    }).then((response) => response.json())
    .then((data) => {
        renderCountry(data,"neighbour");
    })
    .catch((error) => console.log("Resource not Found",error));
    
}




// 7th December 2021
// Language: jabaScript
// Himanshu Sah


//Add class loading