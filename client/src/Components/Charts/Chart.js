import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import LineChart from './LineChart';
import { formatDate } from '../../utils/helpers';
import ModeButton from './ModeButton';
import DataButton from './DataButton';
import '../../styles/Chart.scss';

const Chart = ({ chartMode, dataField, selectedCountries }) => {
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

  let chartTitle = `${fields.title[dataField]} (${modes[chartMode]})`;
  let chartFrom = formatDate(selectedCountries[0].from);
  let chartTo = formatDate(selectedCountries[0].to);
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
      </Fragment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedCountries: state.stats.countries,
  chartMode: state.stats.chartMode,
  dataField: state.stats.dataField,
});

export default connect(mapStateToProps, {})(Chart);
