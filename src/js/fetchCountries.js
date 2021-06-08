import error from './notification.js';

function fetchCountries(searchQuery) {
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

  return fetch(url)
    .then(response => response.json())

    
    .catch(
      error({
        text: 'Too many matches found. Please enter a more specific query!',
        //delay: 2000,
      })
    );
}

export default fetchCountries;