import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { default as IconClose } from '@material-ui/icons/Close';
import { closeAlert } from '../actions/alert';
import '../styles/Alert.scss';

const Alert = ({ alerts, closeAlert }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className='alertWrapper'>
      <div
        className={`alert ${alert.color}`}
        onClick={() => closeAlert(alert.id)}
      >
        <div>{alert.message}</div>
        {/* <div className='close'>
          <IconClose />
        </div> */}
      </div>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { closeAlert })(Alert);
