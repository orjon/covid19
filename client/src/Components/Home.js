import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCountries } from '../actions/countries';
import '../styles/Home.scss';

const Home = ({ countriesLoaded, getCountries }) => {
  useEffect(() => {
    if (!countriesLoaded) {
      console.log('Getting countries');
      getCountries();
    }
  }, [getCountries, countriesLoaded]);

  return (
    <Fragment>
      <div className='Home'>Home Page</div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  countriesLoaded: state.countries.loaded,
});

export default connect(mapStateToProps, { getCountries })(Home);
