import React, { useEffect } from 'react';
import { getCountryStats } from '../actions/stats';
import { connect } from 'react-redux';
import Chart from './Chart';
import PropTypes from 'prop-types';
import '../styles/Stats.scss';

const Stats = ({ stats, getCountryStats, currentUser }) => {
  let country = 'italy';

  let data = `${country} statistics loading...`;
  let dataFormatted = undefined;

  useEffect(() => {
    getCountryStats(country);
  }, [country, getCountryStats]);

  if (stats[country]) {
    data = country;
    dataFormatted = stats[country].map((day) => ({
      Country: day.Country,
      Date: day.Date,
      Confirmed: day.Confirmed,
      Deaths: day.Deaths,
      Recovered: day.Recovered,
      Active: day.Active,
    }));
  }

  return (
    <div>
      {data}
      {dataFormatted && <Chart data={dataFormatted} />}
    </div>
  );
};

Stats.propTypes = {
  getCountryStats: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stats: state.stats,
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, { getCountryStats })(Stats);
