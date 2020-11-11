import axios from 'axios';
import { STATS_LOADED, STATS_FAILED } from './types';

//get country list
export const getCountryStats = ({ country }) => async (dispatch) => {
  try {
    // console.log('getting stats for: ' + country);
    const res = await axios.get(`api/data/${country}`);
    const countryStats = res.data;
    // countryStats.countryName = countries.find(
    //   (country) => country.slug === countryStats.slug
    // ).country;
    dispatch({
      type: STATS_LOADED,
      payload: countryStats,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: STATS_FAILED,
    });
  }
};
