import React, { useState } from 'react';
import { connect } from 'react-redux';
import LineChart from './LineChart';
import ModeButton from './ModeButton';
import '../../styles/Chart.scss';

const ChartBlock = ({ chartData }) => {
  return (
    <div className='Chart'>
      <div className='title'>
        <h1>{chartData.data.title}</h1>
        {chartData.data.from} - {chartData.data.to}
      </div>
      {/* <div className='modeButtons'>
        <ModeButton text={'active'} position='first' field={0} />
        <ModeButton text={'confirmed'} position='center' field={1} />
        <ModeButton text={'recovered'} position='center' field={2} />
        <ModeButton text={'deaths'} position='last' field={3} />
      </div>
      <div className='modeButtons'>
        <ModeButton text={'total'} position='first' mode={0} />
        <ModeButton text={'100k'} position='center' mode={1} />
        <ModeButton text={'%'} position='last' mode={2} />
      </div> */}

      {chartData && <LineChart chartData={chartData} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  countries: state.countryList.countries,
});

export default connect(mapStateToProps, {})(ChartBlock);
