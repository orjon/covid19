import axios from 'axios';
import { STATS_LOADED, STATS_FAILED } from './types';

//get country list
export const getCountryStats = (country) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://api.covid19api.com/total/country/${country}`
    );
    // console.log('Got ' + res.data.length + ' entries for ' + country);
    // console.log(res.data);
    const stats = res.data;
    dispatch({
      type: STATS_LOADED,
      payload: { [country]: stats },
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: STATS_FAILED,
    });
  }
};
