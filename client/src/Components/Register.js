import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './Nav/Nav';
import { getCountries } from '../actions/countryList';
import { setAlert } from '../actions/alerts';
import { register, loginGuest } from '../actions/currentUser';

import '../styles/Login.scss';

const Register = ({
  setAlert,
  register,
  isAuthenticated,
  countriesLoaded,
  getCountries,
  loginGuest,
}) => {
  const history = useHistory();
  //Get country list if not loaded already
  useEffect(() => {
    if (!countriesLoaded) {
      console.log('Getting countries');
      getCountries();
    }
  }, [getCountries, countriesLoaded]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = formData;

  const fieldChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    //check passwords are the same
    if (password !== password2) {
      setAlert('Passwords do not match!', 'warning');
    } else {
      register({ name: username, email, password });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/countries' />;
  }

  return (
    <Fragment>
      <Nav isHome='true' />
      <div className='pageWrapper'>
        <section className='Register'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='title'>
              <h1>Register new user</h1>
            </div>
            <div className='field username'>
              <input
                id='username'
                name='username'
                value={username}
                onChange={(e) => fieldChange(e)}
                type='text'
                placeholder='user name'
              />
            </div>
            <div className='field email'>
              <input
                id='email'
                name='email'
                value={email}
                onChange={(e) => fieldChange(e)}
                type='email'
                placeholder='email address'
              />
            </div>
            <div className='field password'>
              <input
                id='password'
                name='password'
                value={password}
                onChange={(e) => fieldChange(e)}
                type='password'
                placeholder='password'
              />
            </div>
            <div className='field password2'>
              <input
                id='password2'
                name='password2'
                value={password2}
                onChange={(e) => fieldChange(e)}
                type='password'
                placeholder='password confirmation'
              />
            </div>
            <div className='buttonWrapper'>
              <button type='submit' className='register'>
                Register
              </button>
              <button
                type='button'
                onClick={() => history.push('/login')}
                className='login faint'
              >
                Login
              </button>
              <button
                type='button'
                onClick={() => {
                  loginGuest();
                  history.push('/main');
                }}
                className='register faint'
              >
                Guest
              </button>
            </div>
          </form>
        </section>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  countriesLoaded: state.countryList.loaded,
});

// connect needs any state and actions
export default connect(mapStateToProps, {
  setAlert,
  register,
  getCountries,
  loginGuest,
})(Register);
