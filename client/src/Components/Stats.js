import React, { Fragment, useEffect } from 'react';
import Nav from './Nav/Nav';
import { getCountries } from '../actions/countryList';
import { deleteCountryStats, getStats } from '../actions/stats';
import { countryNameFromSlug } from '../utils/helpers';
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
  let notAvailableList = null;

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

  if (stats.loaded && stats.notAvailable.length > 0) {
    let list = stats.notAvailable
      .map((country) => countryNameFromSlug(country, countryList.countries))
      .toString();
    notAvailableList = <div>*No data available for: {list}</div>;
  }

  return (
    <Fragment>
      <Nav />
      <div className='pageWrapper'>
        <div>
          {stats.loaded ? (
            <Fragment>
              <Chart />
              {notAvailableList && notAvailableList}
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
