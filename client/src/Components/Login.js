import React, { Fragment, useState }  from 'react';
import '../styles/Login.scss';


const Login = () => {
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData

  const fieldChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value})

  const onSubmit = async (e) => {
    e.preventDefault();
    //check passwords are the same
  }

  return(
    <Fragment>
      <section className='Login'>
        <form onSubmit={e => onSubmit(e)}>
          <div className='title'>
            <h1>Login</h1>
          </div>
          <div className='field email'>
            <input
              id='email'
              name='email'
              value={email}
              onChange={e => fieldChange(e)}
              type='email'
              placeholder='email address'
              required
            />
          </div>
          <div className='field password'>
            <input
              id='password'
              name='password'
              value={password}
              onChange={e => fieldChange(e)}
              type='password'
              placeholder='password'
              minLength='6'
              required
            />
          </div>
          <div className='field'>
            <button>
              Login
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  )
}

export default Login;