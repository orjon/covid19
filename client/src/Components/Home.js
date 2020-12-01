import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Nav from './Nav/Nav';
import { getCountries } from '../actions/countryList';
import { loginGuest } from '../actions/currentUser';
import '../styles/Home.scss';

const Home = ({ countriesLoaded, getCountries, loginGuest }) => {
  const history = useHistory();

  useEffect(() => {
    if (!countriesLoaded) {
      console.log('Getting countries');
      getCountries();
    }
  }, [getCountries, countriesLoaded]);

  return (
    <Fragment>
      <Nav isHome='true' />
      <div className='pageWrapper'>
        <div className='Home'>
          <div className='buttons'>
            <button
              onClick={() => {
                loginGuest();
                history.push('/main');
              }}
              className='guest'
            >
              Guest
            </button>
            <button
              onClick={() => history.push('/register')}
              className='register'
            >
              Register/Login
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  countriesLoaded: state.countryList.loaded,
});

export default connect(mapStateToProps, { getCountries, loginGuest })(Home);
