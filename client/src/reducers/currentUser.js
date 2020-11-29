import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  COUNTRIES_UPDATE,
  GUEST_COUNTRIES_UPDATE,
  LOGIN_GUEST,
} from '../actions/types';

const initialState = {
  guest: false,
  loaded: false,
  countries: [],
  _id: undefined,
  name: undefined,
  date: undefined,
  __v: undefined,
};

const currentUser = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_GUEST:
      return {
        ...state,
        guest: true,
        loaded: true,
      };
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
        guest: false,
        loaded: true,
      };
    case COUNTRIES_UPDATE:
      return {
        ...state,
        countries: payload,
      };
    case GUEST_COUNTRIES_UPDATE:
      return {
        ...state,
        countries: payload,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        loaded: false,
        guest: false,
        countries: [],
        _id: undefined,
        name: undefined,
        // email: undefined,
        date: undefined,
        __v: undefined,
      };

    default:
      return state;
  }
};

export default currentUser;
