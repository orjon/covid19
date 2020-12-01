import React from 'react';
import { connect } from 'react-redux';
import { setMeasure, setData, setScale } from '../../actions/stats';
import '../../styles/Chart.scss';

const ModeButton = ({
  mode,
  value,
  text,
  position,
  chartModeMeasure,
  chartModeData,
  chartModeScale,
  setMeasure,
  setData,
  setScale,
}) => {
  const changeMode = () => {
    switch (mode) {
      case 0:
        setData(value);
        break;
      case 1:
        setMeasure(value);
        break;
      case 2:
        setScale(value);
        break;
      default:
        setData(value);
    }
  };

  let isSelected = '';

  switch (mode) {
    case 0:
      if (value === chartModeData) {
        isSelected = 'selected';
      }
      break;
    case 1:
      if (value === chartModeMeasure) {
        isSelected = 'selected';
      }
      break;
    case 2:
      if (value === chartModeScale) {
        isSelected = 'selected';
      }
      break;
    default:
      isSelected = '';
      return;
  }

  return (
    <div
      className={`ModeButton ${position} ${isSelected}`}
      onClick={() => {
        changeMode();
      }}
    >
      {text}
    </div>
  );
};

const mapStateToProps = (state) => ({
  chartModeData: state.stats.chartModeData,
  chartModeMeasure: state.stats.chartModeMeasure,
  chartModeScale: state.stats.chartModeScale,
});

export default connect(mapStateToProps, { setMeasure, setData, setScale })(
  ModeButton
);
