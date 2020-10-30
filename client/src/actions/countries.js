import axios from 'axios';
import { GET_COUNTRIES } from './types';

//get country list
export const getCountries = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/countries');
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};
