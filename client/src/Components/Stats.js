import React, { useEffect } from 'react';
import { getCountryStats } from '../actions/stats';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const Stats = ({ stats, getCountryStats }) => {
  let country = 'south-africa';

  useEffect(() => {
    getCountryStats(country);
  }, [country, getCountryStats]);

  let data = `${country} statistics loading...`;
  let dataD3 = [];

  if (stats[country]) {
    data = stats[country].map((day) => {
      return (
        <div key={day.Date}>
          Date: {day.Date}
          Confirmed: {day.Confirmed}
          Deaths: {day.Deaths}
          Recovered: {day.Recovered}
          Active: {day.Active}
        </div>
      );
    });
    dataD3 = stats[country].map((day) => ({
      Date: day.Date,
      Confirmed: day.Confirmed,
      Deaths: day.Deaths,
      Recovered: day.Recovered,
      Active: day.Active,
    }));
  }

  d3.select('.d3')
    .selectAll('p')
    .data(dataD3)
    .enter()
    .append('p')
    .text((dta) => dta.Deaths);

  return (
    <div>
      {/* {data} */}
      <div className='d3'></div>
    </div>
  );
};

Stats.propTypes = {
  getCountryStats: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stats: state.stats,
});

export default connect(mapStateToProps, { getCountryStats })(Stats);
