import { STATS_LOADED, STATS_FAILED } from '../actions/types';

const initialState = {
  loaded: false,
};

const stats = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case STATS_LOADED:
      return {
        ...state,
        ...payload,
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
