import React, { Fragment, useEffect } from 'react';
import { getCountries } from '../actions/countryList';
import { getCountryStats } from '../actions/stats';
import { connect } from 'react-redux';
// import Chart from './Charts/Chart';
import CountryComparisonChart from './Charts/CountryComparisonChart';
import PropTypes from 'prop-types';
import '../styles/Stats.scss';

const Stats = ({
  countryList,
  stats,
  getCountries,
  getCountryStats,
  currentUser,
}) => {
  let userCountries = currentUser.countries;
  let userCountriesValid = false;

  let loading =
    'Loading ' + currentUser.countries.length + ' country statistics...';

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
      Promise.all(
        userCountries.map((country) => {
          getCountryStats({ country });
        })
      );
    }
  }, [countryList, userCountries, getCountryStats]);

  if (stats.countries.length === userCountries.length) {
    userCountriesValid = stats.countries.filter(
      (country) => country.dataAvailable === true
    );
  }

  return (
    <div>
      {userCountriesValid ? (
        <Fragment>
          <CountryComparisonChart countriesData={userCountriesValid} />
          {/* <Chart type='total' countryData={stats} /> */}
          {/* <Chart type='capita' countryData={stats} /> */}
        </Fragment>
      ) : (
        <Fragment>{loading}</Fragment>
      )}
    </div>
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

export default connect(mapStateToProps, { getCountries, getCountryStats })(
  Stats
);
