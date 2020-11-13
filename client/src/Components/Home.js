import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Nav from './Nav/Nav';
import { getCountries } from '../actions/countryList';
import '../styles/Home.scss';

const Home = ({ countriesLoaded, getCountries }) => {
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
            <button onClick={() => history.push('/login')} className='login'>
              Login
            </button>
            <button
              onClick={() => history.push('/register')}
              className='register'
            >
              Register
            </button>
            {/* <button onClick={() => history.push('/guest')} className='guest'>
              Guest
            </button> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  countriesLoaded: state.countryList.loaded,
});

export default connect(mapStateToProps, { getCountries })(Home);
