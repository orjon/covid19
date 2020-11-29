import React from 'react';
import LogoImage from '../../images/logo/covid19Tracker_LogoSML.png';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/currentUser';
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

export default connect(null, { logout })(Logo);
