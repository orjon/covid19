import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setMode } from '../../actions/stats';
import '../../styles/Chart.scss';

const ModeButton = ({ text, position, mode, setMode }) => {
  const history = useHistory();
  const changeDataMode = (newMode) => {
    setMode(newMode);
    history.push('/stats');
  };

  return (
    <div
      className={`ModeButton ${position}`}
      onClick={() => {
        changeDataMode(mode);
      }}
    >
      {text}
    </div>
  );
};

export default connect(null, { setMode })(ModeButton);
