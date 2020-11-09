import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';
import currentUser from './currentUser';
import countryList from './countryList';
import stats from './stats';

export default combineReducers({
  alerts,
  auth,
  countryList,
  currentUser,
  stats,
});
