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
    const http = new XMLHttpRequest();
    http.open('GET',`https://restcountries.com/v2/name/${country}`);
    http.onloadstart = function(){
       
        countriescontainer.classList.add('loading');
        
    }
    http.send();

    http.addEventListener('load', function(){
        countriescontainer.classList.remove('loading');
 
        console.log(http.responseText);
        const [countries] = JSON.parse(http.responseText);
        renderCountry(countries);
      function getNeighbours(code){
        const http2 = new XMLHttpRequest();
        http2.open('GET',`https://restcountries.com/v2/alpha/${code}`);
        http2.send();

        http2.addEventListener('load',function(){
            console.log(http2.responseText);
            const neighbours = JSON.parse(http2.responseText);
           renderCountry(neighbours,"neighbour");
        })
    }

    
    const [codes,...code] = countries.borders;
    if(!codes) return;
    getNeighbours(codes);
    code.forEach(code => {
        getNeighbours(code);
    });
    })
}




// 7th December 2021
// Language: jabaScript
// Himanshu Sah

