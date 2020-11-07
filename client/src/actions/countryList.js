import axios from 'axios';
import { COUNTRIES_LOADED, COUNTRIES_FAILED } from './types';

//get country list
export const getCountries = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/countries');
    console.log('Got ' + res.data.length + ' countries.');
    const countries = res.data;
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
