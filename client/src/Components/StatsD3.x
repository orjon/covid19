import React, { useEffect, useRef } from 'react';
import { getCountryStats } from '../actions/stats';
import { connect } from 'react-redux';
import Chart from './Chart';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import '../styles/Stats.scss';

const Stats = ({ stats, getCountryStats, currentUser }) => {
  let country = 'south-africa';

  let userCountries = currentUser.countries;

  const svgRef = useRef();

  let data = `${country} statistics loading...`;
  let dataD3 = [];

  let lineData = [0, 2, 4, 5, 8, 10, 15, 24, 32, 61, 64, 72, 82, 88, 91, 99];

  useEffect(() => {
    getCountryStats(country);
  }, [country, getCountryStats]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const dataLine = d3
      .line()
      .x((value, index) => index * 20)
      .y((value) => 100 - value);

    const lineChart = d3.select('.lineChart');

    svg
      .selectAll('path')
      .data([lineData])
      .join('path')
      .attr('d', (value) => dataLine(value))
      .attr('fill', 'none')
      .attr('stroke', 'blue');
  }, [dataD3]);

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

  const xScale = d3
    .scaleBand()
    .domain(dataD3.map((dataPoint) => dataPoint.Date))
    .rangeRound([0, 500])
    .padding(0.1);

  const yScale = d3.scaleLinear().domain([0, 25000]).range([500, 0]);

  const barChartContainer = d3.select('.barChart');

  barChartContainer
    .selectAll('.bar')
    .data(dataD3)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', xScale.bandwidth())
    .attr('height', (data) => 500 - yScale(data.Deaths))
    .attr('x', (data) => xScale(data.Date))
    .attr('y', (data) => yScale(data.Deaths));

  const countryListChart = d3
    .select('ul')
    .selectAll('li')
    .data(userCountries)
    .enter()
    .append('li')
    .text((data) => data);

  return (
    <div>
      {/* {data} */}
      <svg ref={svgRef}></svg>
      {/* <svg className='lineChart'></svg> */}
      <ul className='countriesChart'></ul>
      <svg className='barChart'></svg>
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
