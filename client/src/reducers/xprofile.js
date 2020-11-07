import { PROFILE_UPDATE, PROFILE_ERROR } from '../actions/types';

const initialState = {
  countries: [],
  graphs: [],
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_UPDATE:
      return {
        ...state,
        countries: payload.countries,
        graphs: payload.graphs,
      };
    case PROFILE_ERROR:
      return state;

    default:
      return state;
  }
};

export default profile;
