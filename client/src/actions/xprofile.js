import axios from 'axios';
import { setAlert } from './alert';
import { PROFILE_UPDATE, PROFILE_ERROR } from './types';

//Update user profile
export const updateProfile = ({ countries, graphs }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ countries, graphs });

  try {
    const res = await axios.post('/api/profile', body, config);
    // console.log(res.data);
    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
