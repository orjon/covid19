import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from './Logo';
import NavItem from './NavItem';
import NavBurgerMenu from './NavBurgerMenu';
import '../../styles/Nav.scss';

const Nav = ({ auth: { isAuthenticated, loading } }) => {
  let guestLocations = ['home', 'stats', 'register', 'login'];
  let authLocations = ['home', 'countries', 'logout'];

  let locations = guestLocations;
  if (isAuthenticated) {
    locations = authLocations;
  }

  let navItems = locations.map((location) => (
    <NavItem key={location} to={location} />
  ));

  return (
    <nav className='Nav w100 indent10 gap10'>
      <Logo />
      <div className='navItems'>{navItems}</div>
      <div className='navBurger'>
        <NavBurgerMenu locations={locations} />
      </div>
    </nav>
  );
};

Nav.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Nav);
