import React from 'react';
import { connect } from 'react-redux';
import { setDataField } from '../../actions/stats';
import '../../styles/Chart.scss';

const DataButton = ({ dataField, text, position, field, setDataField }) => {
  const changeField = (newField) => {
    setDataField(newField);
  };

  let isSelected = '';

  if (dataField === field) {
    isSelected = 'selected';
  }

  return (
    <div
      className={`DataButton ${position} ${isSelected}`}
      onClick={() => {
        changeField(field);
      }}
    >
      {text}
    </div>
  );
};

const mapStateToProps = (state) => ({
  dataField: state.stats.dataField,
});

export default connect(mapStateToProps, { setDataField })(DataButton);
