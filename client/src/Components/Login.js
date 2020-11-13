import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './Nav/Nav';
import { getCountries } from '../actions/countryList';
import { login } from '../actions/currentUser';
import { setAlert } from '../actions/alerts';
import '../styles/Login.scss';

const Login = ({
  login,
  isAuthenticated,
  countriesLoaded,
  getCountries,
  setAlert,
  isLoaded,
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
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const fieldChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === '' && password === '') {
      setAlert('Please enter email and password!', 'warning');
    } else if (email === '') {
      setAlert('Please enter email!', 'warning');
    } else if (password === '') {
      setAlert('Please enter password!', 'warning');
    } else {
      login(email, password);
    }
  };

  // Redirect if logged in
  if (isLoaded) {
    return <Redirect to='/stats' />;
  }

  return (
    <Fragment>
      <Nav isHome='true' />
      <div className='pageWrapper'>
        <section className='Login'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='title'>
              <h1>Login</h1>
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
            <div className='buttonWrapper'>
              <button className='login'>Login</button>
              <button
                onClick={() => history.push('/register')}
                className='register faint'
              >
                or Register?
              </button>
            </div>
          </form>
        </section>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoaded: state.currentUser.loaded,
  isAuthenticated: state.auth.isAuthenticated,
  countriesLoaded: state.countryList.loaded,
});

export default connect(mapStateToProps, { setAlert, login, getCountries })(
  Login
);
