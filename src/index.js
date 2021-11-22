import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './countries-api';
import allCountries from "./all-countries";
import country from "./country"
import { parseWithoutProcessing } from 'handlebars';

const DEBOUNCE_DELAY = 300;


const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info');


inputEl.addEventListener("input", debounce(inputFunction, DEBOUNCE_DELAY))



function inputFunction(event) {
    event.preventDefault();
    const nameOfCountry = inputEl.value.trim();
  fetchCountries(nameOfCountry).then(renderMarkup)
    .catch(showError)
}

function showError () {
  Notiflix.Notify.failure("Oops, there is no country with that name" );
     countryInfo.innerHTML = "";
    countryList.innerHTML = "";
};


function renderMarkup(userCountry) {
  const numberOfCountries = userCountry.length;

  if (numberOfCountries < 10 && numberOfCountries > 1) {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    countryList.innerHTML = allCountries(userCountry);
  } else if (numberOfCountries === 1) {
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";
    countryInfo.innerHTML = country(userCountry);
  } else {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
  }
}