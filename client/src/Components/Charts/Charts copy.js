import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ChartBlock from './ChartBlock';
import {
  countryNameFromSlug,
  formatDate,
  cumulativeToDifference,
  cumulativeErrorFix,
  movingAverage,
  per100k,
  percentage,
  populationString,
} from '../../utils/helpers';
import '../../styles/Chart.scss';

const Charts = ({ chartMode, dataField, countries, countriesData }) => {
  let selectedData = [];
  let modes = ['total', 'per 100k', '%'];
  let fields = {
    slug: ['active', 'confirmed', 'recovered', 'deaths'],
    title: [
      'Active Covid-19 Cases',
      'Confirmed Covid-19 Cases',
      'Recovered Covid-19 Cases',
      'Covid-19 Deaths',
    ],
  };

  switch (modes[chartMode]) {
    case 'total':
      selectedData = countriesData.map((country) => ({
        data: country.data[fields.slug[dataField]],
      }));
      break;

    case 'per 100k':
      selectedData = countriesData.map((country) => ({
        data: per100k(
          country.countrySlug,
          cumulativeErrorFix(country.data[fields.slug[dataField]]),
          countries
        ),
      }));
      break;

    case '%':
      selectedData = countriesData.map((country) => ({
        data: percentage(
          country.countrySlug,
          cumulativeErrorFix(country.data[fields.slug[dataField]]),
          countries
        ),
      }));
      break;

    default:
      selectedData = countriesData.map((country) => ({
        data: country.data[dataField],
      }));
  }

  let variableData = {
    title: `${fields.title[dataField]} (${modes[chartMode]})`,
    from: formatDate(countriesData[0].from),
    to: formatDate(countriesData[0].to),
    labels: countriesData[0].data.date.map((date) => formatDate(date)),
    datasets: countriesData.map((country, index) => ({
      label: `${countryNameFromSlug(
        country.countrySlug,
        countries
      )} ${populationString(country.countrySlug, countries)}`,
      data: selectedData[index].data,
      backgroundColor: randomColor[index],
      fill: false,
      borderColor: randomColor[index],
      borderWidth: 1,
      pointRadius: 1,
    })),
  };

  let chartData = {
    type: 'line',
    data: variableData,
    options: {
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
    },
  };

  return (
    <div className='Charts'>
      <ChartBlock chartData={chartData} />
      {/* <ChartBlock chartData={chartDataTotal} mode={0} />
      <ChartBlock chartData={chartData100k} mode={1} />
      <ChartBlock chartData={chartDataPercentage} mode={2} /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  countries: state.countryList.countries,
  chartMode: state.stats.chartMode,
  dataField: state.stats.dataField,
});

export default connect(mapStateToProps, {})(Charts);

const colorOpacity = 1;

const randomColor = [
  `rgba(255,0,0,${colorOpacity})`,
  `rgba(0,255,0,${colorOpacity})`,
  `rgba(0,0,175,${colorOpacity})`,
  `rgba(255,195,0,${colorOpacity})`,
  `rgba(144,0,255,${colorOpacity})`,
  `rgba(0,114,255,${colorOpacity})`,
  `rgba(255,125,0,${colorOpacity})`,
  `rgba(50,150,00,${colorOpacity})`,
  `rgba(225,0,225,${colorOpacity})`,
  `rgba(0,255,255,${colorOpacity})`,
];

// switch (modes[chartMode]) {
//   case 'total':
//     selectedData = countriesData.map((country) => ({
//       data: country.data[fields.slug[dataField]],
//     }));
//     break;

//   case 'per 100k':
//     selectedData = countriesData.map((country) => ({
//       data: per100k(
//         country.countrySlug,
//         cumulativeErrorFix(country.data[fields.slug[dataField]]),
//         countries
//       ),
//     }));
//     break;

//   case '%':
//     selectedData = countriesData.map((country) => ({
//       data: percentage(
//         country.countrySlug,
//         cumulativeErrorFix(country.data[fields.slug[dataField]]),
//         countries
//       ),
//     }));
//     break;

//   default:
//     selectedData = countriesData.map((country) => ({
//       data: country.data[dataField],
//     }));
// }

// let variableData = {
//   title: `${fields.title[dataField]} (${modes[chartMode]})`,
//   from: formatDate(countriesData[0].from),
//   to: formatDate(countriesData[0].to),
//   labels: countriesData[0].data.date.map((date) => formatDate(date)),
//   datasets: countriesData.map((country, index) => ({
//     label: `${countryNameFromSlug(
//       country.countrySlug,
//       countries
//     )} ${populationString(country.countrySlug, countries)}`,
//     data: selectedData[index].data,
//     backgroundColor: randomColor[index],
//     fill: false,
//     borderColor: randomColor[index],
//     borderWidth: 1,
//     pointRadius: 1,
//   })),
// };

// let chartData = {
//   type: 'line',
//   data: variableData,
//   options: {
//     legend: {
//       display: true,
//       position: 'right',
//       labels: {
//         boxWidth: 20,
//       },
//     },
//     scales: {
//       xAxes: [
//         {
//           ticks: {
//             minRotation: 90,
//             maxTicksLimit: 42,
//           },
//         },
//       ],
//     },
//     maintainAspectRatio: false,
//   },
// };
