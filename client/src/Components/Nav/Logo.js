import React from 'react';
import LogoImage from '../../images/logo/covid19Tracker_LogoSML.png';
import { NavLink } from 'react-router-dom';
import '../../styles/Logo.scss';

const Logo = () => {

  return(
    <div className='Logo'>
      <NavLink to='/' activeClassName='selected'>
        <div className='flexRow center'>
          <img className='LogoImage' src={LogoImage} alt='Covid19 Tracker App logo'/>
          <div className='LogoText'>Covid19 Tracker</div>
        </div>
      </NavLink>
    </div> 
  )
}


export default Logo;