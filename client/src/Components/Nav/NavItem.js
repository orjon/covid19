import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/currentUser';

const NavItem = ({ to, logout }) => {
  let link = to;

  if (link === 'home') {
    link = '';
  }

  if (link === 'logout') {
    return (
      <NavLink
        to='#!'
        className='navItem indent10'
        activeClassName='selected'
        onClick={logout}
      >
        <div className='gap5'>{to}</div>
      </NavLink>
    );
  }

  return (
    <NavLink
      exact
      to={`/${link}`}
      className='navItem indent10'
      activeClassName='selected'
    >
      <div className='gap5'>{to}</div>
    </NavLink>
  );
};

NavItem.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(NavItem);

// About NavLink:  https://medium.com/swlh/using-react-router-navlink-to-specify-the-active-element-in-a-navigation-bar-38700ffd4900
