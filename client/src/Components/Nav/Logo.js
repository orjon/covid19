import React from 'react';
import LogoImage from '../../images/logo/covid19Tracker_LogoSML.png';
import { logout } from '../../actions/currentUser';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/Logo.scss';

const Logo = ({ logout }) => {
  return (
    <div className='Logo'>
      <NavLink onClick={logout} to='/' activeClassName='selected'>
        <div className='flexRow center'>
          <img
            className='LogoImage'
            src={LogoImage}
            alt='Covid19 Tracker App logo'
          />
          <div className='LogoText'>Covid19 Tracker</div>
        </div>
      </NavLink>
    </div>
  );
};

Logo.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Logo);
