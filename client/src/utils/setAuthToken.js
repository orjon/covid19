import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    console.log(token);
    axios.defaults.headers.common['covidTrackerToken'] = token;
  } else {
    delete axios.defaults.headers.common['covidTrackerToken'];
  }
};

export default setAuthToken;
