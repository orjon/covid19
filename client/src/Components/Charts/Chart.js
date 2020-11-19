import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import LineChart from './LineChart';
import { formatDate, countryNameFromSlug } from '../../utils/helpers';
import ModeButton from './ModeButton';
import DataButton from './DataButton';
import '../../styles/Chart.scss';

const Chart = ({
  chartMode,
  dataField,
  selectedCountries,
  stats,
  countryList,
}) => {
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

  let notAvailableList = null;

  let chartTitle = `${fields.title[dataField]} (${modes[chartMode]})`;
  let chartFrom = formatDate(selectedCountries[0].from);
  let chartTo = formatDate(selectedCountries[0].to);

  if (stats.loaded && stats.notAvailable.length > 0) {
    let list = stats.notAvailable
      .map((country) => countryNameFromSlug(country, countryList.countries))
      .toString()
      .replace(',', ', ');
    notAvailableList = <div>*Data not available for: {list}</div>;
  }
  return (
    <div className='Chart'>
      <Fragment>
        <div className='title'>
          <h1>{chartTitle}</h1>
          {chartFrom} - {chartTo}
        </div>
        <div className='modeButtons'>
          <DataButton text={'active'} position='first' field={0} />
          <DataButton text={'confirmed'} position='center' field={1} />
          <DataButton text={'recovered'} position='center' field={2} />
          <DataButton text={'deaths'} position='last' field={3} />
        </div>
        <div className='modeButtons'>
          <ModeButton text={'total'} position='first' mode={0} />
          <ModeButton text={'100k'} position='center' mode={1} />
          <ModeButton text={'%'} position='last' mode={2} />
        </div>
        <LineChart />
        {notAvailableList && <div className='note'>{notAvailableList}</div>}
      </Fragment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stats: state.stats,
  countryList: state.countryList,
  selectedCountries: state.stats.countries,
  chartMode: state.stats.chartMode,
  dataField: state.stats.dataField,
});

export default connect(mapStateToProps, {})(Chart);
