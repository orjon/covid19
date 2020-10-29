import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';
import '../styles/Login.scss';

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const fieldChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Fragment>
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
          <div className='field'>
            <button>Login</button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
