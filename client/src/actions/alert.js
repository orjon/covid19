import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuid } from 'uuid';

// thunk allows the dispatch
export const setAlert = (message, color) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { message, color, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};

export const closeAlert = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id,
  });
};
