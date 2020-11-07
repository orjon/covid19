import {
  // REGISTER_SUCCESS,
  // REGISTER_FAIL,
  // LOGIN_SUCCESS,
  // LOGIN_FAIL,
  // USER_LOADED,
  // AUTH_ERROR,
  // LOGOUT,
  AUTHORIZED,
  UNAUTHORIZED,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loaded: false,
  // currentUser: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // case USER_LOADED:
    //   return {
    //     ...state,
    //     isAuthenticated: true,
    //     loaded: true,
    //     // currentUser: payload,
    //   };
    case AUTHORIZED:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loaded: true,
      };
    case UNAUTHORIZED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loaded: false,
        // currentUser: null,
      };

    default:
      return state;
  }
};

export default auth;
