import { COUNTRIES_LOADED, COUNTRIES_FAILED } from '../actions/types';

const initialState = {
  countries: [],
  loaded: false,
};

const countryList = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case COUNTRIES_LOADED:
      return {
        ...state,
        countries: payload,
        loaded: true,
      };
    case COUNTRIES_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default countryList;
