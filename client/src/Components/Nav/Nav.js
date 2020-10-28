import React  from 'react';
import Logo from './Logo';
import NavItem from './NavItem';
import '../../styles/Nav.scss';
import NavBurgerMenu from './NavBurgerMenu';

const Nav = () => {

  let navLocations = ['home','register','login']

  let navItems = navLocations.map(location => 
    <NavItem key={location} to={location}/>
  )

  return(
    <nav className='Nav w100 indent10 gap10'>
      <Logo />
      <div className='navItems'>
        {navItems}
      </div>
      <div className='navBurger'>
        <NavBurgerMenu navLocations={navLocations}/>
      </div>
    </nav>
  )

}
export default Nav;