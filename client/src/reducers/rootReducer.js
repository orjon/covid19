import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import countries from './countries';

export default combineReducers({
  alert,
  auth,
  countries,
  user,
});
