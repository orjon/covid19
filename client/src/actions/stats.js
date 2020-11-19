import axios from 'axios';
import {
  STATS_DELETE,
  MULTI_STATS_LOADED,
  STATS_LOAD,
  STATS_FAILED,
  FIELD_CHANGE,
  MODE_CHANGE,
} from './types';

//setMode
export const setMeasurementMode = (mode) => async (dispatch) => {
  try {
    dispatch({
      type: MODE_CHANGE,
      payload: mode,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: STATS_FAILED,
    });
  }
};

//setField
export const setDataField = (field) => async (dispatch) => {
  try {
    dispatch({
      type: FIELD_CHANGE,
      payload: field,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: STATS_FAILED,
    });
  }
};

//delete country stats
export const deleteCountryStats = () => async (dispatch) => {
  try {
    dispatch({
      type: STATS_DELETE,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: STATS_FAILED,
    });
  }
};

//get all selected country stats
export const getStats = ({ userCountries }) => async (dispatch) => {
  const getCountryStats = async (country) => {
    const res = await axios.get(`api/stats/${country}`);
    return res.data;
  };

  try {
    let responses = await Promise.all(
      userCountries.map((country) => getCountryStats(country))
    );

    responses.sort(function (a, b) {
      if (a.countrySlug < b.countrySlug) {
        return -1;
      }
      if (a.countrySlug > b.countrySlug) {
        return 1;
      }
      // names must be equal
      return 0;
    });

    let notAvailable = responses
      .filter((country) => country.dataAvailable === false)
      .map((country) => country.countrySlug);

    let countriesStats = responses.filter(
      (country) => country.dataAvailable === true
    );

    let payloadObject = {
      notAvailable: notAvailable,
      countriesStats: countriesStats,
    };

    console.log('getCountries', payloadObject);

    dispatch({
      type: MULTI_STATS_LOADED,
      payload: payloadObject,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: STATS_FAILED,
    });
  }
};

//get individual country stats
// export const getCountryStats = ({ country }) => async (dispatch) => {
//   try {
//     // console.log('getting stats for: ' + country);
//     const res = await axios.get(`api/data/${country}`);
//     const countryStats = res.data;
//     // countryStats.countryName = countries.find(
//     //   (country) => country.slug === countryStats.slug
//     // ).country;
//     dispatch({
//       type: STATS_LOAD,
//       payload: countryStats,
//     });
//   } catch (error) {
//     console.error(error);
//     dispatch({
//       type: STATS_FAILED,
//     });
//   }
// };
