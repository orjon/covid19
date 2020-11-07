import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from '../actions/types';

const initialState = {
  loaded: false,
  countries: [],
  graphs: [],
  _id: undefined,
  name: undefined,
  email: undefined,
  date: undefined,
  __v: undefined,
};

const user = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        ...payload,
        loaded: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loaded: true,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        loaded: false,
        countries: [],
        graphs: [],
        _id: undefined,
        name: undefined,
        email: undefined,
        date: undefined,
        __v: undefined,
      };

    default:
      return state;
  }
};

export default user;
