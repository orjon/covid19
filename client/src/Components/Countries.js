import React, { Fragment, useEffect } from 'react';
// import { getCountries } from '../actions/countries';
// import PropTypes from 'prop-types';
import '../styles/Countries.scss';
import axios from 'axios';

const Countries = () => {
  useEffect(() => {
    console.log('Getting countries');
    // getCountries();
    async function getCountries() {
      const res = await axios.get('/api/countries');
      console.log(res.data);
    }
    getCountries();
  }, []);

  return (
    <Fragment>
      <div className='Countries'>Countries Page</div>
    </Fragment>
  );
};

export default Countries;
