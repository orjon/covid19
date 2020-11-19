import {
  STATS_DELETE,
  MULTI_STATS_LOADED,
  STATS_LOAD,
  STATS_FAILED,
  FIELD_CHANGE,
  MODE_CHANGE,
} from '../actions/types';

const initialState = {
  loaded: false,
  countries: [],
  notAvailable: [],
  chartMode: 1,
  dataField: 1,
};

const stats = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case MODE_CHANGE:
      return {
        ...state,
        chartMode: payload,
      };
    case FIELD_CHANGE:
      return {
        ...state,
        dataField: payload,
      };
    case STATS_DELETE:
      return {
        ...state,
        countries: [],
        loaded: false,
      };
    case MULTI_STATS_LOADED:
      return {
        ...state,
        notAvailable: payload.notAvailable,
        countries: payload.countriesStats,
        loaded: true,
      };
    case STATS_LOAD:
      return {
        ...state,
        countries: [...state.countries, payload],
        loaded: true,
      };
    case STATS_FAILED:
      return {
        ...state,
        loaded: false,
      };
    default:
      return state;
  }
};

export default stats;
