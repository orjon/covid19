import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { calculateChartData } from './calculateChartData';
import { Line } from 'react-chartjs-2';
import '../../styles/Chart.scss';

const LineChart = ({
  chartModeData,
  chartModeMeasure,
  chartModeScale,
  countries,
  selectedCountries,
}) => {
  //Get user selected Countries
  useEffect(() => {
    setChartData(
      calculateChartData({
        chartModeData,
        chartModeMeasure,
        chartModeScale,
        countries,
        selectedCountries,
      })
    );
  }, [
    chartModeData,
    chartModeMeasure,
    chartModeScale,
    countries,
    selectedCountries,
  ]);

  const [chartData, setChartData] = useState(null);

  const chartOptionsWide = {
    legend: {
      onHover: function (e) {
        e.target.style.cursor = 'pointer';
      },
      display: true,
      position: 'right',
      labels: {
        boxWidth: 20,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            minRotation: 90,
            maxTicksLimit: 40,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  const chartOptionsNormal = {
    legend: {
      onHover: function (e) {
        e.target.style.cursor = 'pointer';
      },
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 20,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            minRotation: 90,
            maxTicksLimit: 20,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  const chartOptionsNarrow = {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 20,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            minRotation: 90,
            maxTicksLimit: 10,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  return (
    <div className='LineChart'>
      {chartData !== null && (
        <Fragment>
          <div className='chartWide'>
            <Line redraw data={chartData} options={chartOptionsWide} />
          </div>
          <div className='chartNormal'>
            <Line redraw data={chartData} options={chartOptionsNormal} />
          </div>
          <div className='chartNarrow'>
            <Line redraw data={chartData} options={chartOptionsNarrow} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  countries: state.countryList.countries,
  selectedCountries: state.stats.countries,
  chartModeData: state.stats.chartModeData,
  chartModeMeasure: state.stats.chartModeMeasure,
  chartModeScale: state.stats.chartModeScale,
});

export default connect(mapStateToProps, {})(LineChart);
