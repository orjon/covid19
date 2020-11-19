import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { calculateChartData } from './calculateChartData';
import { Line } from 'react-chartjs-2';
import '../../styles/Chart.scss';

const LineChart = ({ chartMode, dataField, countries, selectedCountries }) => {
  //Get user selected Countries
  useEffect(() => {
    console.log('lineChart state change!');
    console.log('chartMode', chartMode);
    console.log('dataField', dataField);
    setChartData(
      calculateChartData({
        chartMode,
        dataField,
        countries,
        selectedCountries,
      })
    );
  }, [chartMode, dataField, countries, selectedCountries]);

  const [chartData, setChartData] = useState([]);

  if (chartData !== null) console.log(chartData);

  return (
    <div className='LineChart'>
      {/* {chartData !== null && ( */}
      <Line
        redraw
        data={chartData}
        options={{
          legend: {
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
                  maxTicksLimit: 42,
                },
              },
            ],
          },
          maintainAspectRatio: false,
        }}
      />
      {/* )} */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  countries: state.countryList.countries,
  selectedCountries: state.stats.countries,
  chartMode: state.stats.chartMode,
  dataField: state.stats.dataField,
});

export default connect(mapStateToProps, {})(LineChart);
