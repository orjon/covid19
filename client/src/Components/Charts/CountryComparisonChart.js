import React from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { Bar, Line, Pie } from 'react-chartjs-2';
import '../../styles/Chart.scss';

const CountryComparisonChart = ({ countriesData }) => {
  let multiplier = 1;

  // if (type === 'capita') {
  //   multiplier = population / 100000;
  // }

  // let userCountriesData = countries.filter((country) =>
  //   userCountries.includes(country.slug)
  // );
  console.log(countriesData);

  // console.log(availableCountries);

  let chartDataSets = countriesData.map((countryData) => ({
    label: countryData.countrySlug,
    data: countryData.data.confirmed,
    backgroundColor: 'red',
    fill: false,
    borderColor: 'red',
    borderWidth: 1,
    pointRadius: 1,
  }));

  console.log(chartDataSets);

  let chartData = {
    // country: countryData.countrySlug,
    // startDate: dayjs(countryData.from).format('DD.MMM.YYYY'),
    // endDate: dayjs(countryData.to).format('DD.MMM.YYYY'),
    // labels: countriesData[0].data.date.map((date) =>
    //   dayjs(date).format('DD.MMM.YYYY')
    // ),
    labels: countriesData[0].data.date,
    datasets: chartDataSets,
  };

  console.log(chartData);

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
            // title: {
            //   display: true,
            //   text: chartData.country,
            // },
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

export default connect(mapStateToProps, {})(CountryComparisonChart);
