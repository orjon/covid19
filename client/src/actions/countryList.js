import axios from 'axios';
import { COUNTRIES_LOADED, COUNTRIES_FAILED } from './types';

//get country list
export const getCountries = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/countries');
    console.log('Got ' + res.data.length + ' countries.');
    const countries = res.data;

    countries.forEach((country) => {
      country.country = country.country
        .split('(')[0]
        .split(',')[0]
        .replace(' and ', ' & ')
        .trim();
    });

    countries.forEach((country, index) => {
      if (country.country === 'ALA Aland Islands') {
        country.country = 'Aland Islands';
      } else if (country.slug === 'korea-north') {
        country.country = 'North Korea';
      }
    });

    dispatch({
      type: COUNTRIES_LOADED,
      payload: countries,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: COUNTRIES_FAILED,
    });
  }
};
