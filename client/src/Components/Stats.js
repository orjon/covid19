import React, { Fragment, useEffect } from 'react';
import Nav from './Nav/Nav';
import { getCountries } from '../actions/countryList';
import { deleteCountryStats, getStats } from '../actions/stats';
import { connect } from 'react-redux';
import Chart from './Charts/Chart';
import '../styles/Stats.scss';

const Stats = ({
  countryList,
  stats,
  getCountries,
  deleteCountryStats,
  getStats,
  currentUser,
}) => {
  let userCountries = currentUser.countries;
  let unAvailable = null;

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
    if (countryList.loaded && !stats.loaded) {
      getStats({ userCountries });
    }
  }, [countryList, userCountries, getStats]);

  if (stats.loaded) {
    let list = stats.notAvailable.toString();
    console.log('list', list);
    unAvailable = <div>* No statistics available for: {list}</div>;
  }

  return (
    <Fragment>
      <Nav />
      <div className='pageWrapper'>
        <div>
          {stats.loaded ? (
            <Fragment>
              <Chart />
              {unAvailable}
            </Fragment>
          ) : (
            <Fragment>{loading}</Fragment>
          )}
        </div>
      </div>
    </Fragment>
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
})(Stats);
