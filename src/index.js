import './sass/main.scss';
import fetchCountries from './js/fetchCountries.js';
import notif from './js/notification.js'
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';
import debounce  from 'lodash.debounce';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  searchCountry: document.querySelector('.js-searchCountry')
}

refs.searchCountry.addEventListener('input', debounce((onSearch), 500));
// refs.searchCountry.addEventListener('input', onSearch) ;

function onSearch(event) {
  const country = event.target.value.trim();
  refs.searchCountry.value = country;

  clearCountryCard();

  // if (country === '') {
  //   return
  // }

  fetchCountries(country)
    .then(renderCountryCard)
    .catch(error => console.log(error));
    //.finally(() => country.reset());
}

function renderCountryCard(result) {
  if (result.length > 2 && result.length < 10) {
    const markup = countryListTpl({ countries: result });
    refs.cardContainer.innerHTML = markup;
  }

  if (result.length === 1) {
    const markup = countryCardTpl(result[0]);
    refs.cardContainer.innerHTML = markup;
  }

  // if (result.length > 10) {
  //   alert({
  //     text: 'Error!!!'
  //   });
  // }

}

function clearCountryCard() {
  refs.cardContainer.innerHTML = '';
  } 
