import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCountries } from '../actions/countryList';
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
  countriesLoaded: state.countryList.loaded,
});

export default connect(mapStateToProps, { getCountries })(Home);
