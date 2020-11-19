import React from 'react';
import { connect } from 'react-redux';
import { setMeasurementMode } from '../../actions/stats';
import '../../styles/Chart.scss';

const ModeButton = ({
  chartMode,
  text,
  position,
  mode,
  setMeasurementMode,
}) => {
  const changeMode = (newMode) => {
    setMeasurementMode(newMode);
  };

  let isSelected = '';

  if (chartMode === mode) {
    isSelected = 'selected';
  }

  return (
    <div
      className={`ModeButton ${position} ${isSelected}`}
      onClick={() => {
        changeMode(mode);
      }}
    >
      {text}
    </div>
  );
};

const mapStateToProps = (state) => ({
  chartMode: state.stats.chartMode,
});

export default connect(mapStateToProps, { setMeasurementMode })(ModeButton);
