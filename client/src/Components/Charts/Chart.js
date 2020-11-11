import React from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { Bar, Line, Pie } from 'react-chartjs-2';
import '../../styles/Chart.scss';

const Chart = ({ type, countryData, countries }) => {
  let multiplier = 1;

  if (type === 'capita') {
    multiplier = population / 100000;
  }

  let chartData = {
    country: countryData.countrySlug,
    startDate: dayjs(countryData.from).format('DD.MMM.YYYY'),
    endDate: dayjs(countryData.to).format('DD.MMM.YYYY'),
    labels: countryData.data.date.map((date) =>
      dayjs(date).format('DD.MMM.YYYY')
    ),
    datasets: [
      {
        label: 'Deaths',
        data: countryData.data.deaths.map((entry) =>
          (entry / multiplier).toFixed(1)
        ),
        backgroundColor: 'red',
        fill: false,
        borderColor: 'red',
        borderWidth: 1,
        pointRadius: 1,
      },
      {
        label: 'Confirmed',
        data: countryData.data.confirmed.map((entry) =>
          (entry / multiplier).toFixed(1)
        ),
        backgroundColor: 'orange',
        fill: false,
        borderColor: 'orange',
        borderWidth: 1,
        pointRadius: 1,
      },
      {
        label: 'Active',
        data: countryData.data.active.map((entry) =>
          (entry / multiplier).toFixed(1)
        ),
        backgroundColor: 'green',
        fill: false,
        borderColor: 'green',
        borderWidth: 1,
        pointRadius: 1,
      },
    ],
  };

  console.log(chartData.datasets[0].data);

  return (
    <div className='Chart'>
      {/* <div className='optionButtons'>
        <div className='option first'>TOTAL</div>
        <div className='option center selected'>100k</div>
        <div className='option last'>%</div>
      </div> */}
      {chartData && (
        <Line
          data={chartData}
          options={{
            title: {
              display: true,
              text: chartData.country,
            },
            maintainAspectRatio: true,
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  countries: state.countryList.countries,
});

export default connect(mapStateToProps, {})(Chart);
