import axios from 'axios';
import {
  STATS_DELETE,
  MULTI_STATS_LOADED,
  STATS_FAILED,
  SCALE_CHANGE,
  MEASURE_CHANGE,
  DATA_CHANGE,
} from './types';

//setMode
export const setMeasure = (value) => async (dispatch) => {
  try {
    dispatch({
      type: MEASURE_CHANGE,
      payload: value,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: STATS_FAILED,
    });
  }
};

//setData
export const setScale = (value) => async (dispatch) => {
  try {
    dispatch({
      type: SCALE_CHANGE,
      payload: value,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: STATS_FAILED,
    });
  }
};

//setField
export const setData = (value) => async (dispatch) => {
  try {
    dispatch({
      type: DATA_CHANGE,
      payload: value,
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
    const res = await axios.get(`/covidapi/stats/${country}`);
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
