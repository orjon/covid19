import React, {useState} from 'react';
import { default as IconNavBurger } from '@material-ui/icons/MenuRounded';
import { default as IconClose } from '@material-ui/icons/Close';
import NavItem from './NavItem';


const NavBurgerMenu = ({navLocations}) => {

  const [menuOpen, setMenuOpen] = useState(false)


  const toggleBrugerMenu = () => {
    setMenuOpen(currentState => !currentState)
  }


  let navItems = navLocations.map(location => 
      <NavItem key={location} to={location} />
  )
    return (
      <div className='burgerMenu' >
        {menuOpen? 
          <div className='navIcon gap10'><IconClose onClick={toggleBrugerMenu}/></div>
           :
           <div className='navIcon gap10'><IconNavBurger onClick={toggleBrugerMenu}/></div>}
        {menuOpen? 
          <div className='burgerMenuList gap20' onClick={toggleBrugerMenu}>
            <div className='navIcon indent10'><IconClose/></div>
            <div className='navItem indent40'>
              {navItems}
            </div>
          </div> : null }
        
      </div>
    );
}

export default NavBurgerMenu;

