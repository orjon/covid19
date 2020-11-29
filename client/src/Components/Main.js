import React, { useEffect } from 'react';
import Nav from './Nav/Nav';
import Countries from './Countries';
import { getCountries } from '../actions/countryList';
import { deleteCountryStats, getStats } from '../actions/stats';
import { connect } from 'react-redux';
import Chart from './Charts/Chart';
import '../styles/Stats.scss';

const Main = ({
  countryList,
  stats,
  getCountries,
  deleteCountryStats,
  getStats,
  currentUser,
}) => {
  let userCountries = currentUser.countries;

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
      getStats({ userCountries });
    }
  }, [countryList, userCountries, getStats]);

  return (
    <div>
      <Nav />
      <div className='MainWrapper'>
        <div className='CountriesWrapper'>
          <Countries />
        </div>

        <div className='ChartWrapper'>
          {stats.loaded ? (
            <Chart />
          ) : (
            <div className='Chart'>
              <div className='title'>
                <h1>{loading}</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stats: state.stats,
  currentUser: state.currentUser,
  countryList: state.countryList,
});

export default connect(mapStateToProps, {
  getCountries,
  deleteCountryStats,
  getStats,
})(Main);
