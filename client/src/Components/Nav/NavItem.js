import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/currentUser';

const NavItem = ({ to, logout, name }) => {
  let link = to;
  let text = 'login/register';

  if (link === 'logout') {
    link = '';
    text = `logout ${name}`;
  }

  return (
    <NavLink
      exact
      onClick={logout}
      to={`/${link}`}
      className='navItem indent10'
      activeClassName='selected'
    >
      <div className='gap5'>{text}</div>
    </NavLink>
  );
};

NavItem.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.currentUser.name,
});

export default connect(mapStateToProps, { logout })(NavItem);
