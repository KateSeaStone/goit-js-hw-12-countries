import './sass/main.scss';
import fetchCountries from './js/fetchCountries.js';
import error from './js/notification.js';
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';
import debounce from 'lodash.debounce';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  searchCountry: document.querySelector('.js-searchCountry')
}

refs.searchCountry.addEventListener('input', debounce((onSearch), 500));

function onSearch(event) {
  const country = event.target.value.trim();
  refs.searchCountry.value = country;

  renderCountryCard('');

  if (!country) return;

  fetchCountries(country)
    .then(createMarkup)
    .catch(error => console.log(error));
}

function renderCountryCard(content) {
  refs.cardContainer.innerHTML = content;
}

function createMarkup(result) {
  if (result.length >= 2 && result.length <= 10) {
    const markup = countryListTpl({ countries: result });
    return renderCountryCard(markup);
  }

  if (result.length === 1) {
    const markup = countryCardTpl(result[0]);
    return renderCountryCard(markup);
  }

  if (result.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 1000,
    })
  }
}
