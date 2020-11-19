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

const modes = ['total', 'per 100k', '%'];
const fields = {
  slug: ['active', 'confirmed', 'recovered', 'deaths'],
  title: [
    'Active Covid-19 Cases',
    'Confirmed Covid-19 Cases',
    'Recovered Covid-19 Cases',
    'Covid-19 Deaths',
  ],
};

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

export const calculateChartData = ({
  chartMode,
  dataField,
  countries,
  selectedCountries,
}) => {
  let selectedData = [];

  switch (modes[chartMode]) {
    case 'total':
      selectedData = selectedCountries.map((country) => ({
        // data: cumulativeErrorFix(country.data[fields.slug[dataField]]),
        data: country.data[fields.slug[dataField]],
      }));
      break;

    case 'per 100k':
      selectedData = selectedCountries.map((country) => ({
        data: per100k(
          country.countrySlug,
          // cumulativeErrorFix(country.data[fields.slug[dataField]]),
          country.data[fields.slug[dataField]],
          countries
        ),
      }));
      break;

    case '%':
      selectedData = selectedCountries.map((country) => ({
        data: percentage(
          country.countrySlug,
          // cumulativeErrorFix(country.data[fields.slug[dataField]]),
          country.data[fields.slug[dataField]],
          countries
        ),
      }));
      break;

    default:
      selectedData = selectedCountries.map((country) => ({
        data: country.data[fields.slug[dataField]],
      }));
  }

  let chartData = {
    labels: selectedCountries[0].data.date.map((date) => formatDate(date)),
    datasets: selectedCountries.map((country, index) => ({
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

  return chartData;
};
