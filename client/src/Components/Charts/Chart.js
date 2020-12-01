import React, { Fragment } from 'react';
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
  const modeScale = ['per\u00A0100k', 'total'];
  const modeMeasure = ['Cumulative', 'Daily'];
  const modeData = {
    slug: ['confirmed', 'deaths'],
    title: ['Confirmed\u00A0Covid-19\u00A0Cases', 'Covid-19\u00A0Deaths'],
  };

  let chartTitle = 'Title';
  let chartFrom = 'from';
  let chartTo = 'to';

  let notAvailableList = null;
  if (selectedCountries.length > 0) {
    chartTitle = `${modeData.title[chartModeData]} (${modeMeasure[chartModeMeasure]}\u00A0${modeScale[chartModeScale]})`;
    chartFrom = formatDate(selectedCountries[0].from);
    chartTo = formatDate(selectedCountries[0].to);
  }

  if (stats.loaded && stats.notAvailable.length > 0) {
    let list = stats.notAvailable
      .map((country) => countryNameFromSlug(country, countryList.countries))
      .toString()
      .replaceAll(',', ', ');
    notAvailableList = <div>No data currently available for: {list}</div>;
  }
  return (
    <div className='Chart'>
      {selectedCountries.length === 0 && (
        <div className='title'>
          <h1>Select countries to see Covid-19 data</h1>
          {notAvailableList && <div>{notAvailableList}</div>}
        </div>
      )}
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
            {/* Measure mode */}
            {/* <div className='modeButtons'>
              <ModeButton
                text={'cumulative'}
                position='first'
                mode={1}
                value={0}
              />
              <ModeButton text={'daily'} position='last' mode={1} value={1} />
            </div> */}
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
