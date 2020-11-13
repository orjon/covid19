import React, { Fragment, useEffect } from 'react';
import Nav from './Nav/Nav';
import { getCountries } from '../actions/countryList';
import { deleteCountryStats, getCountryStats } from '../actions/stats';
import { connect } from 'react-redux';
import Charts from './Charts/Charts';
import PropTypes from 'prop-types';
import '../styles/Stats.scss';

const Stats = ({
  countryList,
  stats,
  getCountries,
  deleteCountryStats,
  getCountryStats,
  currentUser,
}) => {
  let userCountries = currentUser.countries;
  let userCountriesValid = false;

  let loading =
    'Loading ' + currentUser.countries.length + ' country statistics...';

  //Load countryList
  useEffect(() => {
    deleteCountryStats();
    return () => {
      deleteCountryStats();
    };
  }, [deleteCountryStats]);

  //Load countryList
  useEffect(() => {
    if (!countryList.loaded) {
      console.log('Getting countries');
      getCountries();
    }
  }, [getCountries, countryList]);

  //Load stats for usercountries
  useEffect(() => {
    if (countryList.loaded) {
      Promise.all(userCountries.map((country) => getCountryStats({ country })));
    }
  }, [countryList, userCountries, getCountryStats]);

  if (stats.countries.length === userCountries.length) {
    userCountriesValid = stats.countries.filter(
      (country) => country.dataAvailable === true
    );

    userCountriesValid.sort(function (a, b) {
      if (a.countrySlug < b.countrySlug) {
        return -1;
      }
      if (a.countrySlug > b.countrySlug) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }

  return (
    <Fragment>
      <Nav />
      <div className='pageWrapper'>
        <div>
          {userCountriesValid ? (
            <Fragment>
              <Charts countriesData={userCountriesValid} />
              {/* <ChartBlock countriesData={userCountriesValid} /> */}
            </Fragment>
          ) : (
            <Fragment>{loading}</Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Stats.propTypes = {
  getCountryStats: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stats: state.stats,
  currentUser: state.currentUser,
  countryList: state.countryList,
});

export default connect(mapStateToProps, {
  getCountries,
  deleteCountryStats,
  getCountryStats,
})(Stats);
