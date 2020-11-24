import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import LineChart from './LineChart';
import { formatDate, countryNameFromSlug } from '../../utils/helpers';
import ModeButton from './ModeButton';
import '../../styles/Chart.scss';

const Chart = ({
  chartModeData,
  chartModeMeasure,
  chartModeScale,
  selectedCountries,
  stats,
  countryList,
}) => {
  const modeScale = ['per 100k', 'total'];
  const modeMeasure = ['Cumulative', 'Daily'];
  const modeData = {
    slug: ['confirmed', 'deaths'],
    title: ['Confirmed Covid-19 Cases', 'Covid-19 Deaths'],
  };

  let chartTitle = 'Title';
  let chartFrom = 'from';
  let chartTo = 'to';

  let notAvailableList = null;
  if (selectedCountries.length > 0) {
    chartTitle = `${modeData.title[chartModeData]} (${modeMeasure[chartModeMeasure]} ${modeScale[chartModeScale]})`;
    chartFrom = formatDate(selectedCountries[0].from);
    chartTo = formatDate(selectedCountries[0].to);
  }

  if (stats.loaded && stats.notAvailable.length > 0) {
    let list = stats.notAvailable
      .map((country) => countryNameFromSlug(country, countryList.countries))
      .toString()
      .replaceAll(',', ', ');
    notAvailableList = <div>*Data not available for: {list}</div>;
  }
  return (
    <div className='Chart'>
      {selectedCountries.length > 0 && (
        <Fragment>
          <div className='title'>
            <h1>{chartTitle}</h1>
            {chartFrom} - {chartTo}
          </div>
          <div className='controls'>
            <div className='modeButtons'>
              {/* Data mode */}
              <ModeButton text={'cases'} position='first' mode={0} value={0} />
              <ModeButton text={'deaths'} position='last' mode={0} value={1} />
            </div>
            <div className='modeButtons'>
              {/* Measure mode */}
              <ModeButton
                text={'cumulative'}
                position='first'
                mode={1}
                value={0}
              />
              <ModeButton text={'daily'} position='last' mode={1} value={1} />
            </div>
            <div className='modeButtons'>
              {/* Scale mode */}
              <ModeButton
                text={'per 100k'}
                position='first'
                mode={2}
                value={0}
              />
              <ModeButton text={'total'} position='last' mode={2} value={1} />
            </div>
          </div>

          <LineChart />
          {notAvailableList && <div className='note'>{notAvailableList}</div>}
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  stats: state.stats,
  countryList: state.countryList,
  selectedCountries: state.stats.countries,
  chartModeData: state.stats.chartModeData,
  chartModeMeasure: state.stats.chartModeMeasure,
  chartModeScale: state.stats.chartModeScale,
});

export default connect(mapStateToProps, {})(Chart);
