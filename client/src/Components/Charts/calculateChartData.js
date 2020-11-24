import {
  countryNameFromSlug,
  formatDate,
  cumulativeToDifference,
  cumulativeErrorFix,
  per100k,
  populationString,
} from '../../utils/helpers';

const fields = {
  slug: ['confirmed', 'deaths'],
  title: ['Confirmed Covid-19 Cases', 'Covid-19 Deaths'],
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
  chartModeMeasure,
  chartModeData,
  chartModeScale,
  countries,
  selectedCountries,
}) => {
  let selectedData = [];

  // set chart measure mode
  switch (chartModeMeasure) {
    case 0:
      selectedData = selectedCountries.map((country) => ({
        countrySlug: country.countrySlug,
        data: cumulativeErrorFix(country.data[fields.slug[chartModeData]]),
      }));
      break;

    case 1:
      selectedData = selectedCountries.map((country) => ({
        countrySlug: country.countrySlug,
        data: cumulativeToDifference(
          cumulativeErrorFix(country.data[fields.slug[chartModeData]])
        ),
      }));
      break;

    default:
      selectedData = selectedCountries.map((country) => ({
        countrySlug: country.countrySlug,
        data: country.data[fields.slug[chartModeData]],
      }));
  }

  // // set chart scale
  switch (chartModeScale) {
    case 1:
      selectedData = selectedData.map((country) => ({
        data: country.data,
      }));
      break;

    case 0:
      selectedData = selectedData.map((country) => ({
        data: per100k(country.countrySlug, country.data, countries),
      }));
      break;

    default:
      selectedData = selectedData.map((country) => ({
        data: country.data,
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
