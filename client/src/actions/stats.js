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
export const setMode = (mode) => async (dispatch) => {
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
export const setField = (field) => async (dispatch) => {
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
export const getCountriesStats = ({ countries }) => async (dispatch) => {
  try {
    // console.log('getting stats for: ' + country);
    const res = await axios.get(`api/stats/${countries}`);
    const countriesStats = res.data;
    // countryStats.countryName = countries.find(
    //   (country) => country.slug === countryStats.slug
    // ).country;
    dispatch({
      type: MULTI_STATS_LOADED,
      payload: countriesStats,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: STATS_FAILED,
    });
  }
};

//get individual country stats
export const getCountryStats = ({ country }) => async (dispatch) => {
  try {
    // console.log('getting stats for: ' + country);
    const res = await axios.get(`api/data/${country}`);
    const countryStats = res.data;
    // countryStats.countryName = countries.find(
    //   (country) => country.slug === countryStats.slug
    // ).country;
    dispatch({
      type: STATS_LOAD,
      payload: countryStats,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: STATS_FAILED,
    });
  }
};
