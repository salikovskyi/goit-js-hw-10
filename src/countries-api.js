export function fetchCountries(countryName) {
  return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => {
          if (!response.ok) {
              throw Error(response.status)
          }
    return response.json()})}

