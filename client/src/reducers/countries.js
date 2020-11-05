import { COUNTRIES_LOADED, COUNTRIES_FAILED } from '../actions/types';

const initialState = {
  countryList: [],
  loaded: false,
};

const countries = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case COUNTRIES_LOADED:
      return {
        ...state,
        countryList: payload,
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

export default countries;
