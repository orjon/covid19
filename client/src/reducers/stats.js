import {
  STATS_DELETE,
  MULTI_STATS_LOADED,
  STATS_LOAD,
  STATS_FAILED,
  SCALE_CHANGE,
  MEASURE_CHANGE,
  DATA_CHANGE,
} from '../actions/types';

const initialState = {
  loaded: false,
  countries: [],
  notAvailable: [],
  chartModeMeasure: 0,
  chartModeData: 0,
  chartModeScale: 0,
};

const stats = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case MEASURE_CHANGE:
      return {
        ...state,
        chartModeMeasure: payload,
      };
    case SCALE_CHANGE:
      return {
        ...state,
        chartModeScale: payload,
      };
    case DATA_CHANGE:
      return {
        ...state,
        chartModeData: payload,
      };
    case STATS_DELETE:
      return {
        ...state,
        countries: [],
        notAvailable: [],
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
